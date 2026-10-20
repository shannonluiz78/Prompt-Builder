async function deriveKey(passphrase) {
  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw', enc.encode(passphrase), { name: 'PBKDF2' }, false, ['deriveKey']
  );
  return window.crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: enc.encode('prompt-builder-salt'), iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

async function saveEncryptedKey() {
  const provider = document.getElementById('vault-provider').value;
  const apiKey = document.getElementById('vault-api-key').value.trim();
  const pass = document.getElementById('vault-passphrase').value || 'prompt-builder-local-vault';
  if (!apiKey) {
    alert('Please enter a valid API key.');
    return;
  }

  // Store in session memory for immediate use
  window._sessionApiKey = apiKey;
  window._sessionProvider = provider;

  try {
    const key = await deriveKey(pass);
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encoded = new TextEncoder().encode(apiKey);
    const cipher = await window.crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded);

    const payload = {
      iv: Array.from(iv),
      data: Array.from(new Uint8Array(cipher))
    };
    localStorage.setItem(`pb_vault_${provider}`, JSON.stringify(payload));
    localStorage.setItem('pb_active_provider', provider);

    const badge = document.getElementById('vault-status-badge');
    if (badge) {
      badge.textContent = `${provider.toUpperCase()} Ready`;
      badge.className = 'px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/25 text-emerald-300 border border-emerald-500/40';
    }
    document.getElementById('vault-api-key').value = '';
    toggleModal('vault-modal');
  } catch (err) {
    console.error('Vault encryption error:', err);
    alert('Failed to encrypt key securely.');
  }
}

async function loadDecryptedKey(provider, passphrase) {
  if (window._sessionApiKey) return window._sessionApiKey;
  const raw = localStorage.getItem(`pb_vault_${provider}`);
  if (!raw) return null;
  try {
    const payload = JSON.parse(raw);
    const key = await deriveKey(passphrase);
    const decrypted = await window.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: new Uint8Array(payload.iv) },
      key,
      new Uint8Array(payload.data)
    );
    return new TextDecoder().decode(decrypted);
  } catch (e) {
    console.warn('Vault decryption failed:', e);
    return null;
  }
}

function clearVaultKeys() {
  window._sessionApiKey = null;
  ['gemini', 'openai', 'anthropic', 'openrouter', 'groq'].forEach(p => localStorage.removeItem(`pb_vault_${p}`));
  localStorage.removeItem('pb_active_provider');
  const badge = document.getElementById('vault-status-badge');
  if (badge) {
    badge.textContent = 'Local Mode';
    badge.className = 'px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-400';
  }
}

// Restore status badge on load if key exists
window.addEventListener('DOMContentLoaded', () => {
  const savedProvider = localStorage.getItem('pb_active_provider');
  if (savedProvider && localStorage.getItem(`pb_vault_${savedProvider}`)) {
    const badge = document.getElementById('vault-status-badge');
    if (badge) {
      badge.textContent = `${savedProvider.toUpperCase()} Ready`;
      badge.className = 'px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/25 text-emerald-300 border border-emerald-500/40';
    }
  }
});

async function polishWithBYOK() {
  const outputEl = document.getElementById('compiled-prompt-output');
  const studio = window.appState.activeStudio;
  const d = window.appState.studios[studio];
  const originalPrompt = outputEl.value.trim();

  const provider = localStorage.getItem('pb_active_provider') || 'gemini';
  const pass = document.getElementById('vault-passphrase')?.value || 'prompt-builder-local-vault';
  const apiKey = await loadDecryptedKey(provider, pass);

  let enhanced = '';
  if (apiKey && provider === 'gemini') {
    try {
      const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `You are a Senior Prompt Architect. Refine and polish this prompt for maximum clarity and professional structure. Return only the enhanced prompt:\n\n${originalPrompt}` }] }]
        })
      });
      const data = await resp.json();
      enhanced = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    } catch (e) {
      console.warn('Gemini API enhance failed, using built-in structure:', e);
    }
  }

  if (!enhanced) {
    enhanced = originalPrompt + '\n\n[Execution Directive]: Prioritize high signal-to-noise ratio, concrete specificity, and immediate structural compliance.';
  }

  window.appState.pendingOptimizedPrompt = enhanced;
  document.getElementById('diff-before-text').value = originalPrompt;
  document.getElementById('diff-after-text').value = enhanced;
  toggleModal('optimize-diff-modal');
}

function acceptOptimizedPrompt() {
  const afterEl = document.getElementById('diff-after-text');
  const outputEl = document.getElementById('compiled-prompt-output');
  if (afterEl && outputEl) {
    outputEl.value = afterEl.value;
  }
  toggleModal('optimize-diff-modal');
}
