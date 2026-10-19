async function deriveKey(passphrase) {
  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    enc.encode(passphrase),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );
  return window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: enc.encode('prompt-builder-salt'),
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

async function saveEncryptedKey() {
  const provider = document.getElementById('vault-provider').value;
  const apiKey = document.getElementById('vault-api-key').value.trim();
  const pass = document.getElementById('vault-passphrase').value;
  if (!apiKey) return;

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
  badge.textContent = `${provider.toUpperCase()} Ready`;
  badge.className = 'px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
  document.getElementById('vault-api-key').value = '';
  toggleModal('vault-modal');
}

async function loadDecryptedKey(provider, passphrase) {
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
    return null;
  }
}

function clearVaultKeys() {
  ['gemini', 'openai', 'anthropic', 'openrouter', 'groq'].forEach(p =>
    localStorage.removeItem(`pb_vault_${p}`)
  );
  localStorage.removeItem('pb_active_provider');
  const badge = document.getElementById('vault-status-badge');
  badge.textContent = 'Local Mode';
  badge.className = 'px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-400';
}

async function polishWithBYOK() {
  const outputEl = document.getElementById('compiled-prompt-output');
  const btnLabel = document.getElementById('lbl-ai-enhance');
  const provider = localStorage.getItem('pb_active_provider') || document.getElementById('vault-provider').value;
  const pass = document.getElementById('vault-passphrase').value || 'prompt-builder-local-vault';
  const apiKey = await loadDecryptedKey(provider, pass);

  // If no key is saved yet, use instant local architectural polish
  if (!apiKey) {
    outputEl.value =
      outputEl.value +
      '\n\n[Execution Directive]: Prioritize high signal-to-noise ratio, concrete specificity, and immediate structural compliance.';
    updateTokenTelemetry(outputEl.value);
    return;
  }

  // Live call to Vercel /api/enhance endpoint
  const originalText = btnLabel.textContent;
  btnLabel.textContent = 'Enhancing...';
  try {
    const res = await fetch('/api/enhance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        provider,
        apiKey,
        prompt: outputEl.value,
        outputLang: window.appState.outLang
      })
    });
    const data = await res.json();
    if (data.enhancedPrompt) {
      outputEl.value = data.enhancedPrompt;
      updateTokenTelemetry(outputEl.value);
    }
  } catch (err) {
    console.warn('Fallback to local polish:', err);
  } finally {
    btnLabel.textContent = originalText;
  }
}