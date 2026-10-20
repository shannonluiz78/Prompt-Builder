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

  // Also keep a session copy in memory so it works immediately without passphrase mismatch
  window._sessionApiKey = apiKey;
  window._sessionProvider = provider;

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

  updateVaultBadgeUI(provider, true);
  document.getElementById('vault-api-key').value = '';
  toggleModal('vault-modal');
}

function updateVaultBadgeUI(provider, isReady) {
  const badge = document.getElementById('vault-status-badge');
  if (!badge) return;
  if (isReady) {
    badge.textContent = `${provider.toUpperCase()} Ready`;
    badge.className = 'px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
  } else {
    badge.textContent = 'Local Mode';
    badge.className = 'px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-400';
  }
}

async function loadDecryptedKey(provider, passphrase) {
  if (window._sessionApiKey && (!window._sessionProvider || window._sessionProvider === provider)) {
    return window._sessionApiKey;
  }
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
    console.warn('Vault decryption failed (passphrase mismatch):', e);
    return null;
  }
}

function clearVaultKeys() {
  window._sessionApiKey = null;
  ['gemini', 'openai', 'anthropic', 'openrouter', 'groq'].forEach(p =>
    localStorage.removeItem(`pb_vault_${p}`)
  );
  localStorage.removeItem('pb_active_provider');
  updateVaultBadgeUI('gemini', false);
}

// Restore badge on page reload if a key is stored in localStorage
window.addEventListener('DOMContentLoaded', () => {
  const savedProvider = localStorage.getItem('pb_active_provider');
  if (savedProvider && localStorage.getItem(`pb_vault_${savedProvider}`)) {
    updateVaultBadgeUI(savedProvider, true);
  }
});

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
1. Rewrite the user's rough objective into polished, executive-grade English (fix any grammar/lowercase notes in # MISSION OBJECTIVE).
2. Eliminate any repeated sentences across sections.
3. If the user is building an Agentic / Agile / Scrum workflow, organize into:
   - # OPERATIONAL CONTEXT & SQUAD TOPOLOGY (Research Agent, Content Strategy Agent, Scriptwriting Agent, Image/Video Prompt Agent, QA/Publishing Agent)
   - # CORE MISSION OBJECTIVE (Polished executive statement)
   - # PHASE 1: HIGH-LEVERAGE DISCOVERY QUESTIONS (5-7 specific questions grouped by Brand/Channels, Autonomy/HITL Gates, and Tool Stack)
   - # PHASE 2: SPRINT 0 MULTI-AGENT RACI & HANDOFF TABLE
   - # STRICT EXECUTION GUARDRAILS`;

  const goalInstructions = {
    platform_master: 'Rewrite rough user notes into polished, authoritative instructions optimized for the selected platform.',
    cinematic_detail: 'Enrich sensory, optical lens, lighting falloff, surface micro-texture, or multi-agent architectural depth.',
    strict_lock: 'Prioritize maximum structural stability, explicit guardrails, and zero hallucination.',
    token_compact: 'Compress into high-signal directives that preserve 100% of constraints in 25% fewer words.'
  }[goal] || 'Substantially upgrade the prompt for maximum quality.';

  const langRule = outputLang === 'zh'
    ? 'Output the final optimized prompt in Simplified Chinese.'
    : 'Output the final optimized prompt in English.';

  return `You are a Principal AI Prompt Architect. Rewrite and significantly upgrade the user's draft prompt below.\nCRITICAL: You MUST rewrite any raw lowercase user notes into polished professional prose and NEVER return the exact same text as the input.\n${selectedRule}\nOptimization Goal: ${goalInstructions}\n${langRule}\nReturn ONLY the final upgraded prompt text with no introductory commentary or markdown code fences.`;
}

function buildDeepPlatformOptimization(studio, targetApp, d, goal, outLang, currentDraft = '') {
  if (studio === 'text') {
    // Polish raw lowercase objective so it never looks like an unedited copy-paste
    const polishedObjective = d.objective
      ? d.objective.charAt(0).toUpperCase() + d.objective.slice(1).replace(/\bi\b/g, 'I')
      : 'Design and deploy a structured, high-performing workflow tailored to the operational context.';

    // Context-First ordering when Google Gemini is selected
    return `# ROLE & EXECUTIVE AUTHORITY
${d.role}

# OPERATIONAL CONTEXT & DOMAIN SCOPE
${d.context}

# CORE MISSION OBJECTIVE
Act as the strategic lead to fulfill this primary mandate: "${polishedObjective}"

# INTERACTIVE EXECUTION PROTOCOL (AGILE MULTI-AGENT WORKFLOW)
1. **Stage 1 — Scope Consolidation (Ask First):**
   Before generating final campaign assets, present **6 targeted Discovery Questions** grouped under:
   - **A. Channel Mix & Content Velocity:** (Target platforms, weekly posting cadence, brand tone guardrails)
   - **B. Multi-Agent Handoffs & Tooling:** (Preferred LLM/image/video generators such as Google Flow, Nano Banana, Hailuo, Kling, and scheduling APIs)
   - **C. Human-in-the-Loop (HITL) Governance:** (Which sprint checkpoints require Team Leader sign-off before publishing)

2. **Stage 2 — Sprint 0 Agentic Squad Blueprint (Markdown Table):**
   Alongside your discovery questions, propose an initial **Agile Agent Topology Table** with columns:
   \`Agent Role\` | \`Core Scrum Responsibility\` | \`Input Artifact\` | \`Output Deliverable (DoD)\` | \`Approval Gate\`
   covering:
   - **Agent 1: Trend & Topic Research Specialist**
   - **Agent 2: Content Strategy & Copywriting Lead**
   - **Agent 3: Retention Scriptwriter (Short & Long Form)**
   - **Agent 4: Visual & Video Prompt Director (Image & I2V/T2V)**
   - **Agent 5: QA, Brand Compliance & Social Publisher**

# TONE & OUTPUT RULES
- **Tone:** ${d.tone}
- **Strict Guardrail:** Lead directly with Stage 1 and Stage 2. Do NOT generate generic filler introductions, and pause after Stage 2 for the Team Leader's responses.`;
  }

  if (studio === 'i2v' && targetApp === 'google_flow') {
    return `Camera: ${sanitizeForFlow(d.cameraPath)}, shot on a stabilized 35mm rectilinear architectural cinema lens with a locked horizon and zero barrel distortion.\n\nScene & Positive Geometry Lock: ${d.anchor} anchored directly to the starting frame. ${sanitizeForFlow(d.consistency)}. Every wall edge, cabinet seam, marble vein, and furniture silhouette maintains 100% rigid spatial permanence without warping or perspective drift.\n\nLayered Micro-Motion Physics: In the foreground and midground, ${d.subjectMotion} with realistic fluid and fabric inertia. In the exterior background, ${d.bgMotion} at an imperceptibly slow, tranquil pace.\n\nLighting & Temporal Fidelity: Continuous soft natural daylight with consistent specular reflections across polished surfaces; 8-second luxury architectural pacing.\n\nAudio: ${d.audio || 'Quiet luxury indoor room tone with a barely audible gentle breeze; no background music, no voices, no sudden sound effects'}.`;
  }

  return currentDraft + '\n\n[Quality Verification Gate]: Enforce strict domain accuracy, zero structural drift, and complete adherence to all specified parameters.';
}

async function callGeminiDirectWithFallback(apiKey, fullPrompt) {
  // Try gemini-2.5-flash-lite first (verified working on your key), then gemini-2.5-flash, then gemini-2.0-flash
  const candidateModels = ['gemini-2.5-flash-lite', 'gemini-2.5-flash', 'gemini-2.0-flash'];
  let lastErrorMsg = '';

  for (const modelName of candidateModels) {
    try {
      const resp = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: fullPrompt }] }],
            generationConfig: { temperature: 0.4 }
          })
        }
      );

      if (resp.ok) {
        const data = await resp.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        if (text) {
          return { success: true, text, modelUsed: modelName };
        }
      } else {
        const errJson = await resp.json().catch(() => ({}));
        lastErrorMsg = errJson?.error?.message || `HTTP ${resp.status}`;
      }
    } catch (netErr) {
      lastErrorMsg = netErr.message || 'Network/CORS error';
    }
  }

  return { success: false, error: lastErrorMsg };
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
  let modeLabel = '';

  const systemInstruction = buildSystemInstructionForPlatform(studio, targetApp, goal, window.appState.outLang);

  if (apiKey) {
    const originalBtnText = btnLabel.textContent;
    btnLabel.textContent = 'Calling Gemini AI...';
    try {
      if (provider === 'gemini') {
        const result = await callGeminiDirectWithFallback(
          apiKey,
          `${systemInstruction}\n\nUSER DRAFT PROMPT TO UPGRADE:\n${originalPrompt}`
        );
        if (result.success && result.text !== originalPrompt) {
          candidatePrompt = result.text;
          modeLabel = `✓ Live Gemini API Connected (${result.modelUsed} • ${targetApp.toUpperCase()})`;
        } else if (!result.success) {
          modeLabel = `Built-in Deep Optimizer (Gemini API note: ${result.error})`;
        }
      }
    } finally {
      btnLabel.textContent = originalBtnText;
    }
  } else {
    modeLabel = 'Built-in Deep Optimizer (No decrypted key in memory — re-save key in BYOK Vault)';
  }

  if (!candidatePrompt || candidatePrompt.trim() === originalPrompt) {
    candidatePrompt = buildDeepPlatformOptimization(studio, targetApp, d, goal, window.appState.outLang, originalPrompt);
    if (!modeLabel) {
      modeLabel = 'Built-in Deep Optimizer (Offline Engine)';
    }
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
