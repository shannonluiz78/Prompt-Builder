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
  if (badge) {
    badge.textContent = `${provider.toUpperCase()} Ready`;
    badge.className = 'px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
  }
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
  if (badge) {
    badge.textContent = 'Local Mode';
    badge.className = 'px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-400';
  }
}

// Deep deterministic platform optimizer (works 100% free & offline, or as fallback)
function buildDeepPlatformOptimization(studio, targetApp, d, goal, outLang) {
  if (studio === 'i2v') {
    if (targetApp === 'google_flow') {
      return `Camera: ${sanitizeForFlow(d.cameraPath)}, shot on a stabilized 35mm rectilinear architectural cinema lens with a locked horizon and zero barrel distortion.\n\nScene & Positive Geometry Lock: ${d.anchor} anchored directly to the starting frame. ${sanitizeForFlow(d.consistency)}. Every wall edge, cabinet seam, marble vein, and furniture silhouette maintains 100% rigid spatial permanence without warping or perspective drift.\n\nLayered Micro-Motion Physics: In the foreground and midground, ${d.subjectMotion} with realistic fluid and fabric inertia. In the exterior background, ${d.bgMotion} at an imperceptibly slow, tranquil pace.\n\nLighting & Temporal Fidelity: Continuous soft natural daylight with consistent specular reflections across polished surfaces; 8-second luxury architectural pacing.\n\nAudio: ${d.audio || 'Quiet luxury indoor room tone with a barely audible gentle breeze; no background music, no voices, no sudden sound effects'}.`;
    }
    if (targetApp === 'hailuo') {
      const cam = d.cameraPath.includes('[') ? d.cameraPath : `[Push in] ${d.cameraPath}`;
      return `${cam}, stabilized cinema gimbal with smooth optical flow. Starting from the uploaded reference frame (${d.anchor}), ${d.subjectMotion} with natural physical weight and fluid micro-dynamics, while ${d.bgMotion} in the background. Structural Lock: ${sanitizeForFlow(d.consistency)}—maintain 100% identity and architectural fidelity from the first frame to the final frame.`;
    }
    if (targetApp === 'kling') {
      return `Start Frame Reference: ${d.anchor}.\n1. Primary Foreground Motion: ${d.subjectMotion} (natural inertia, realistic micro-physics).\n2. Secondary Background Motion: ${d.bgMotion}.\n3. Camera Trajectory: ${sanitizeForFlow(d.cameraPath)}, constant speed, zero focal breathing.\n4. Geometry & Texture Lock: ${sanitizeForFlow(d.consistency)}. Preserve all original proportions, surface textures, and lighting continuity across the entire 5s/10s sequence.`;
    }
    if (targetApp === 'runway') {
      return `Continuous ${sanitizeForFlow(d.cameraPath)} with zero horizon shift. ${d.subjectMotion} with smooth, natural physical momentum, while ${d.bgMotion}. All static architectural lines, furniture, and background geometry remain strictly locked in 3D space.`;
    }
  }

  if (studio === 'video') {
    if (targetApp === 'google_flow') {
      return `${sanitizeForFlow(d.cameraMotion)}, captured on a 24mm ARRI Alexa Mini LF rectilinear cinema lens with smooth gimbal stabilization. ${d.scene}. Motion & Physics: ${sanitizeForFlow(d.pacing)}, maintaining strict object permanence, natural fluid/fabric physics, and consistent spatial perspective throughout the 8-second continuous shot. Lighting & Color Grade: ${d.atmosphere} with natural highlight roll-off. Audio: ${d.audio || 'Quiet, realistic environmental ambience matched to the visual scene; no random music, no voices'}.`;
    }
    if (targetApp === 'hailuo') {
      const cam = d.cameraMotion.includes('[') ? d.cameraMotion : `[Push in] ${d.cameraMotion}`;
      return `${cam}. ${d.scene}. High-frame-rate fluid kinematics (${d.pacing}) with realistic surface reflections and zero temporal morphing. Atmospheric Grade: ${d.atmosphere}. Specs: ${d.specs}.`;
    }
  }

  if (studio === 'image') {
    if (targetApp === 'nano_banana') {
      return `Generate a master-grade ${d.ratio} visual composition: ${d.subject}.\n\nSpatial Hierarchy & Materials: ${d.style}, featuring physically accurate surface micro-textures, crisp geometric edges, and balanced foreground-to-background separation.\nLighting & Optical Physics: ${d.lighting}, captured with ${d.camera} for edge-to-edge optical clarity and natural shadow falloff.\nQuality & Purity Lock: Render all structural lines and any quoted typography with razor-sharp precision, completely free from ${d.negative}.`;
    }
    if (targetApp === 'midjourney') {
      const cleanRatio = (d.ratio || '16:9').replace(/[^0-9:]/g, '') || '16:9';
      return `${d.subject}, ${d.style}, physically accurate textures, ${d.lighting}, volumetric depth, ${d.camera}, ultra-crisp optical focus --ar ${cleanRatio} --stylize 300 --v 6.1 --no ${d.negative}`;
    }
  }

  // Fallback / Text Studio enrichment
  return document.getElementById('compiled-prompt-output').value +
    `\n\n# EXECUTION QUALITY GATES\n1. Verify every constraint before generating output.\n2. Use concrete specifics, exact metrics, and domain-accurate terminology.\n3. Eliminate conversational filler and meta-introductions.`;
}

async function polishWithBYOK() {
  const outputEl = document.getElementById('compiled-prompt-output');
  const btnLabel = document.getElementById('lbl-ai-enhance');
  const studio = window.appState.activeStudio;
  const targetApp = window.appState.targetApps[studio];
  const d = window.appState.studios[studio];
  const goal = document.getElementById('optimize-goal-select')?.value || 'platform_master';

  const provider = localStorage.getItem('pb_active_provider') || 'gemini';
  const pass = document.getElementById('vault-passphrase')?.value || 'prompt-builder-local-vault';
  const apiKey = await loadDecryptedKey(provider, pass);

  const originalPrompt = outputEl.value;
  let candidatePrompt = '';
  let modeLabel = 'Platform Deep Compiler (Offline Mode)';

  if (apiKey) {
    const originalBtnText = btnLabel.textContent;
    btnLabel.textContent = 'Optimizing for ' + targetApp.toUpperCase() + '...';
    try {
      const res = await fetch('/api/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider,
          apiKey,
          prompt: originalPrompt,
          studio,
          targetApp,
          goal,
          outputLang: window.appState.outLang
        })
      });
      const data = await res.json();
      if (data.enhancedPrompt) {
        candidatePrompt = data.enhancedPrompt.trim();
        modeLabel = `Live AI Optimizer (${provider.toUpperCase()} • ${targetApp.toUpperCase()})`;
      }
    } catch (err) {
      console.warn('Live API call failed, using Deep Platform Optimizer:', err);
    } finally {
      btnLabel.textContent = originalBtnText;
    }
  }

  if (!candidatePrompt) {
    candidatePrompt = buildDeepPlatformOptimization(studio, targetApp, d, goal, window.appState.outLang);
  }

  // Open Before vs. After Review Modal (Never overwrite without user acceptance)
  window.appState.pendingOptimizedPrompt = candidatePrompt;
  const beforeEl = document.getElementById('diff-before-text');
  const afterEl = document.getElementById('diff-after-text');
  const badgeEl = document.getElementById('diff-mode-badge');

  if (beforeEl && afterEl) {
    beforeEl.value = originalPrompt;
    afterEl.value = candidatePrompt;
    if (badgeEl) badgeEl.textContent = modeLabel;
    toggleModal('optimize-diff-modal');
  } else {
    outputEl.value = candidatePrompt;
    updateTokenTelemetry(candidatePrompt);
  }
}

function acceptOptimizedPrompt() {
  const afterEl = document.getElementById('diff-after-text');
  const outputEl = document.getElementById('compiled-prompt-output');
  if (afterEl && outputEl) {
    window.appState.previousPromptBackup = outputEl.value;
    outputEl.value = afterEl.value;
    updateTokenTelemetry(outputEl.value);
    runPreflightCheck(outputEl.value);
  }
  toggleModal('optimize-diff-modal');
}
