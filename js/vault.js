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
  const pass = document.getElementById('vault-passphrase').value || 'prompt-builder-local-vault';
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

function buildSystemInstructionForPlatform(studio, targetApp, goal, outputLang) {
  const platformRules = {
    google_flow: `TARGET PLATFORM: Google Flow (powered by Veo 3.1).
STRICT RULES:
1. Output ONLY the clean visual/auditory prompt to paste into Google Flow. NEVER include meta-tags like "[Target I2V Platform]" or "Motion Bucket 40".
2. BAN NEGATIVE "DO NOT" LISTS: Replace any negative constraints with positive stillness locks tailored to the scene.
3. Enforce the 6-Layer Flow structure: (1) Single-axis camera movement & focal length, (2) Scene anchor & positive geometry lock, (3) Primary foreground micro-motion physics, (4) Slow background depth motion, (5) Consistent lighting & 8-second pacing, (6) Explicit "Audio:" restraint cue at the very end.`,

    hailuo: `TARGET PLATFORM: Hailuo AI (MiniMax Video / Director).
STRICT RULES:
1. Begin camera movements with explicit Hailuo bracketed commands such as [Push in], [Pull out], [Pan right], [Tilt up], or [Static shot].
2. Emphasize fluid dynamics, chronological action beats, and 100% structural preservation of any starting frame.`,

    kling: `TARGET PLATFORM: Kling AI (1.6 / 2.0).
STRICT RULES:
1. Structure cleanly into Start Frame/Subject Anchor -> Foreground Motion Trajectory -> Background Environment Physics -> Camera & Lens Specs -> Structural Consistency Lock.`,

    runway: `TARGET PLATFORM: Runway Gen-3 Alpha / Gen-4.
STRICT RULES:
1. Lead immediately with continuous camera movement terminology followed by single-scene subject motion and positive 3D geometry locks.`,

    nano_banana: `TARGET PLATFORM: Google Nano Banana (Image Generation).
STRICT RULES:
1. Write in rich, natural descriptive prose with clear foreground/midground/background hierarchy, physical material accuracy, and any exact text enclosed in double quotes ("..."). Do not use --ar or --no flags.`,

    midjourney: `TARGET PLATFORM: Midjourney v6.1 / v7.
STRICT RULES:
1. Craft high-density photographic/artistic phrases specifying camera body, lens focal length, f-stop, lighting physics, and surface materials, ending with --ar, --stylize 250, and --no parameters.`
  };

  const selectedRule = platformRules[targetApp] ||
    `TARGET PLATFORM: ${targetApp.toUpperCase()} (${studio.toUpperCase()} Studio).
STRICT RULES:
1. Substantially upgrade and expand the user's draft into an executive-grade, production-ready master prompt.
2. If the user is asking to build an Agentic / Agile / Scrum workflow or interactive consultation, explicitly define: (a) The Agent Squad Topology (e.g., Product Owner, Research Agent, Content/Script Agent, Visual Media Agent, QA/Publishing Agent), (b) Interactive Discovery Questions grouped by category to consolidate scope before execution, (c) Sprint ceremonies, handoff schemas, and Human-in-the-Loop approval gates.`;

  const goalInstructions = {
    platform_master: 'Substantially enrich structure, domain specificity, and native platform syntax so the output is dramatically more effective than the rough draft.',
    cinematic_detail: 'Enrich sensory, optical lens, lighting falloff, surface micro-texture, or architectural workflow depth.',
    strict_lock: 'Prioritize maximum structural stability, explicit guardrails, and zero hallucination.',
    token_compact: 'Compress into high-signal directives that preserve 100% of constraints in 25% fewer words.'
  }[goal] || 'Substantially upgrade the prompt for maximum quality.';

  const langRule = outputLang === 'zh'
    ? 'Output the final optimized prompt in Simplified Chinese.'
    : 'Output the final optimized prompt in English.';

  return `You are a Principal AI Prompt Architect. Rewrite and significantly upgrade the user's draft prompt below.\nCRITICAL: Never return the exact same text as the input draft.\n${selectedRule}\nOptimization Goal: ${goalInstructions}\n${langRule}\nReturn ONLY the final upgraded prompt text with no introductory commentary or code fences.`;
}

function buildDeepPlatformOptimization(studio, targetApp, d, goal, outLang) {
  if (studio === 'text') {
    return `# ROLE & EXECUTIVE AUTHORITY
${d.role}

# MISSION OBJECTIVE
${d.objective}

# OPERATIONAL CONTEXT & DOMAIN SCOPE
${d.context}

# INTERACTIVE EXECUTION PROTOCOL (PHASED WORKFLOW)
- **Phase 1 — Scope Consolidation & Discovery Questions:** Before generating final production assets, ask 5–7 targeted, high-leverage clarifying questions grouped by:
  1. Target Audience, Brand Voice & Channel Priorities
  2. Multi-Agent Squad Roles (Topic Research Agent, Content Strategy Agent, Scriptwriting Agent, Image/Video Prompt Agent, Social Publishing & QA Agent)
  3. Agile Scrum Cadence (Sprint length, backlog grooming rules, Definition of Done, and Human-in-the-Loop approval gates)
- **Phase 2 — Agile Multi-Agent Architecture Blueprint:** Once scope is confirmed (or as an initial Sprint 0 proposal), provide a structured table mapping each Agent Role -> Input Artifact -> Core Task -> Output Schema -> Handoff Trigger.

# TONE & COMMUNICATION STYLE
${d.tone}

# REQUIRED OUTPUT SCHEMA
${d.format}

# STRICT GUARDRAILS
${d.constraints}
- Pause after presenting the structured Discovery Questions + Sprint 0 Blueprint so the Team Leader can confirm scope.`;
  }

  if (studio === 'i2v') {
    if (targetApp === 'google_flow') {
      return `Camera: ${sanitizeForFlow(d.cameraPath)}, shot on a stabilized 35mm rectilinear architectural cinema lens with a locked horizon and zero barrel distortion.\n\nScene & Positive Geometry Lock: ${d.anchor} anchored directly to the starting frame. ${sanitizeForFlow(d.consistency)}. Every wall edge, cabinet seam, marble vein, and furniture silhouette maintains 100% rigid spatial permanence without warping or perspective drift.\n\nLayered Micro-Motion Physics: In the foreground and midground, ${d.subjectMotion} with realistic fluid and fabric inertia. In the exterior background, ${d.bgMotion} at an imperceptibly slow, tranquil pace.\n\nLighting & Temporal Fidelity: Continuous soft natural daylight with consistent specular reflections across polished surfaces; 8-second luxury architectural pacing.\n\nAudio: ${d.audio || 'Quiet luxury indoor room tone with a barely audible gentle breeze; no background music, no voices, no sudden sound effects'}.`;
    }
  }

  if (studio === 'video') {
    return `${sanitizeForFlow(d.cameraMotion)}, captured on a 24mm ARRI Alexa Mini LF rectilinear cinema lens with smooth gimbal stabilization. ${d.scene}. Motion & Physics: ${sanitizeForFlow(d.pacing)}, maintaining strict object permanence, natural fluid/fabric physics, and consistent spatial perspective throughout the continuous shot. Lighting & Color Grade: ${d.atmosphere} with natural highlight roll-off. Specs: ${d.specs}. Audio: ${d.audio || 'Quiet, realistic environmental ambience matched to the visual scene; no random music, no voices'}.`;
  }

  if (studio === 'image') {
    return `Generate a master-grade ${d.ratio} visual composition: ${d.subject}.\n\nSpatial Hierarchy & Materials: ${d.style}, featuring physically accurate surface micro-textures, crisp geometric edges, and balanced foreground-to-background separation.\nLighting & Optical Physics: ${d.lighting}, captured with ${d.camera} for edge-to-edge optical clarity and natural shadow falloff.\nQuality & Purity Lock: Render all structural lines and any quoted typography with razor-sharp precision, completely free from ${d.negative}.`;
  }

  return document.getElementById('compiled-prompt-output').value;
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
  const rawInputKey = document.getElementById('vault-api-key')?.value?.trim();
  const apiKey = rawInputKey || (await loadDecryptedKey(provider, pass));

  const originalPrompt = outputEl.value.trim();
  let candidatePrompt = '';
  let modeLabel = 'Platform Deep Optimizer (Built-in Engine)';

  const systemInstruction = buildSystemInstructionForPlatform(studio, targetApp, goal, window.appState.outLang);

  if (apiKey) {
    const originalBtnText = btnLabel.textContent;
    btnLabel.textContent = 'Optimizing...';
    try {
      // 1. Direct Browser Call to Google Gemini API (Fastest, works on both GitHub Pages & Vercel)
      if (provider === 'gemini') {
        const geminiResp = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: `${systemInstruction}\n\nUSER DRAFT PROMPT TO UPGRADE:\n${originalPrompt}` }] }],
              generationConfig: { temperature: 0.45 }
            })
          }
        );
        if (geminiResp.ok) {
          const geminiData = await geminiResp.json();
          const text = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
          if (text && text !== originalPrompt) {
            candidatePrompt = text;
            modeLabel = `Live Gemini 2.5 Flash Optimizer (${targetApp.toUpperCase()})`;
          }
        }
      }

      // 2. Fallback to Vercel Serverless /api/enhance if needed
      if (!candidatePrompt) {
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
        if (res.ok) {
          const data = await res.json();
          if (data.enhancedPrompt && data.enhancedPrompt.trim() !== originalPrompt) {
            candidatePrompt = data.enhancedPrompt.trim();
            modeLabel = `Live AI Optimizer (${provider.toUpperCase()} • ${targetApp.toUpperCase()})`;
          }
        }
      }
    } catch (err) {
      console.warn('Live API optimization fell back to built-in deep optimizer:', err);
    } finally {
      btnLabel.textContent = originalBtnText;
    }
  }

  // Ensure we ALWAYS deliver a genuinely upgraded prompt (never Before === After)
  if (!candidatePrompt || candidatePrompt.trim() === originalPrompt) {
    candidatePrompt = buildDeepPlatformOptimization(studio, targetApp, d, goal, window.appState.outLang);
  }

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
