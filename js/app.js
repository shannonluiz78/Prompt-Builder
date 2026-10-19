function renderStudio() {
  const state = window.appState;
  const schema = window.studioSchemas[state.activeStudio];
  const data = state.studios[state.activeStudio];
  const lang = state.uiLang;

  document.getElementById('active-studio-heading').textContent = schema.heading[lang];
  document.getElementById('active-studio-sub').textContent = schema.sub[lang];

  const container = document.getElementById('studio-form-fields');
  container.innerHTML = '';

  schema.fields.forEach(f => {
    const wrapper = document.createElement('div');
    wrapper.className = f.span === 2 ? 'sm:col-span-2' : 'col-span-1';

    const label = document.createElement('label');
    label.className = 'block text-xs font-semibold text-slate-300 mb-1.5';
    label.textContent = f.label[lang];

    let input;
    if (f.textarea) {
      input = document.createElement('textarea');
      input.rows = 2;
    } else {
      input = document.createElement('input');
      input.type = 'text';
    }
    input.value = data[f.key] || '';
    input.className =
      'w-full bg-slate-950/90 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none transition';
    input.oninput = e => {
      state.studios[state.activeStudio][f.key] = e.target.value;
      compilePrompt();
    };

    wrapper.appendChild(label);
    wrapper.appendChild(input);
    container.appendChild(wrapper);
  });

  const boosterBox = document.getElementById('studio-boosters');
  boosterBox.innerHTML = '';
  schema.boosters.forEach(b => {
    const btn = document.createElement('button');
    btn.className =
      'px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-indigo-950/80 text-slate-300 hover:text-indigo-300 border border-slate-800 hover:border-indigo-500/40 text-xs transition';
    btn.textContent = b.label;
    btn.onclick = () => {
      const curr = state.studios[state.activeStudio][b.field] || '';
      if (!curr.includes(b.val.trim())) {
        state.studios[state.activeStudio][b.field] = (curr + b.val).trim();
        renderStudio();
        compilePrompt();
      }
    };
    boosterBox.appendChild(btn);
  });

  compilePrompt();
}

function switchStudio(studioKey) {
  const state = window.appState;
  state.activeStudio = studioKey;
  state.detectiveFixes = [];
  document.querySelectorAll('.studio-btn').forEach(btn => {
    if (btn.dataset.studio === studioKey) {
      btn.className =
        'studio-btn w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition bg-indigo-600/25 text-indigo-300 border border-indigo-500/50 shadow-sm';
    } else {
      btn.className =
        'studio-btn w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 border border-transparent';
    }
  });
  renderStudio();
}

function runSmartStart() {
  const state = window.appState;
  const raw = document.getElementById('smart-start-input').value.trim();
  if (!raw) return;

  const lower = raw.toLowerCase();
  let detectedStudio = 'text';

  if (
    lower.includes('animate') ||
    lower.includes('photo to video') ||
    lower.includes('image to video') ||
    lower.includes('图生视频')
  ) {
    detectedStudio = 'i2v';
  } else if (
    (lower.includes('video') || lower.includes('drone') || lower.includes('footage') || lower.includes('视频')) &&
    !lower.includes('script') &&
    !lower.includes('脚本')
  ) {
    detectedStudio = 'video';
  } else if (
    lower.includes('image') ||
    lower.includes('photo') ||
    lower.includes('floorplan') ||
    lower.includes('render') ||
    lower.includes('图片')
  ) {
    detectedStudio = 'image';
  }

  if (detectedStudio === 'text') {
    state.studios.text.objective = raw;
    state.studios.text.role = lower.includes('script')
      ? 'Viral Short-Form Video Copywriter & Strategist'
      : 'Senior Domain Consultant';
  } else if (detectedStudio === 'image') {
    state.studios.image.subject = raw;
  } else if (detectedStudio === 'video') {
    state.studios.video.scene = raw;
  } else if (detectedStudio === 'i2v') {
    state.studios.i2v.anchor = raw;
  }

  switchStudio(detectedStudio);
  renderGuidedQuestions(detectedStudio);
}

function renderGuidedQuestions(studio) {
  const state = window.appState;
  const bar = document.getElementById('guided-questions-bar');
  const list = document.getElementById('guided-questions-list');
  bar.classList.remove('hidden');
  list.innerHTML = '';

  const questions = {
    text: [
      { q: 'Under 150 words?', apply: () => { state.studios.text.constraints += ' Keep under 150 words.'; } },
      { q: 'Add Strong CTA?', apply: () => { state.studios.text.format += ' End with a clear Call-To-Action.'; } }
    ],
    image: [
      { q: 'Vertical 9:16?', apply: () => { state.studios.image.ratio = '9:16'; } },
      { q: 'Golden Hour Sun?', apply: () => { state.studios.image.lighting = 'Warm golden hour sunlight'; } }
    ],
    video: [
      { q: 'Vertical 9:16 Reels?', apply: () => { state.studios.video.specs = '9:16 vertical, 5s, 60fps'; } }
    ],
    i2v: [
      { q: 'Lock Camera Tripod?', apply: () => { state.studios.i2v.cameraPath = 'Static locked tripod frame'; } }
    ]
  };

  (questions[studio] || []).forEach(item => {
    const pill = document.createElement('button');
    pill.className =
      'px-2.5 py-1 rounded-full bg-indigo-500/20 hover:bg-indigo-500/40 text-indigo-200 border border-indigo-500/30 text-xs transition';
    pill.textContent = item.q;
    pill.onclick = () => {
      item.apply();
      pill.classList.add('bg-emerald-600/30', 'text-emerald-200');
      renderStudio();
    };
    list.appendChild(pill);
  });
}

function loadSampleIdea(type) {
  const samples = {
    text: 'Create a 60-second short video script explaining why the 5-year MOP is a springboard for young couples upgrading their home.',
    image: '3D architectural cutaway floorplan of a 3-bedroom luxury condo with warm wood interiors and balcony greenery',
    video: 'Cinematic twilight drone shot gliding over an infinity pool toward the Singapore Marina Bay skyline',
    i2v: 'Animate this interior showroom photo so the sheer curtains sway gently and warm sunlight shifts across the marble floor'
  };
  document.getElementById('smart-start-input').value = samples[type];
  runSmartStart();
}

function compilePrompt() {
  const state = window.appState;
  const s = state.activeStudio;
  const d = state.studios[s];
  const isZh = state.outLang === 'zh';
  let compiled = '';

  if (s === 'text') {
    compiled = isZh
      ? `# 角色设定 (ROLE)\n${d.role}\n\n# 核心任务 (OBJECTIVE)\n${d.objective}\n\n# 受众与背景 (CONTEXT)\n${d.context}\n\n# 语气风格 (TONE)\n${d.tone}\n\n# 输出结构 (FORMAT)\n${d.format}\n\n# 严格约束 (CONSTRAINTS)\n${d.constraints}`
      : `# ROLE\n${d.role}\n\n# OBJECTIVE\n${d.objective}\n\n# CONTEXT & AUDIENCE\n${d.context}\n\n# TONE & STYLE\n${d.tone}\n\n# OUTPUT FORMAT\n${d.format}\n\n# CONSTRAINTS\n${d.constraints}`;
  } else if (s === 'image') {
    compiled = isZh
      ? `[主体与场景 Subject]: ${d.subject}\n[艺术风格 Style]: ${d.style}\n[光影与色彩 Lighting]: ${d.lighting}\n[镜头参数 Camera]: ${d.camera}\n[画幅比例 Aspect Ratio]: --ar ${d.ratio}\n[反向排除项 Negative]: --no ${d.negative}`
      : `[Subject]: ${d.subject}\n[Style & Medium]: ${d.style}\n[Lighting & Atmosphere]: ${d.lighting}\n[Camera & Lens]: ${d.camera}\n[Aspect Ratio]: --ar ${d.ratio}\n[Negative Prompt]: --no ${d.negative}`;
  } else if (s === 'video') {
    compiled = isZh
      ? `[场景与动作 Scene]: ${d.scene}\n[运镜轨迹 Camera Motion]: ${d.cameraMotion}\n[运动节奏 Pacing]: ${d.pacing}\n[光影调色 Atmosphere]: ${d.atmosphere}\n[音效提示 Audio/SFX]: ${d.audio}\n[技术规格 Specs]: ${d.specs}`
      : `[Scene & Action]: ${d.scene}\n[Camera Trajectory]: ${d.cameraMotion}\n[Motion Pacing]: ${d.pacing}\n[Visual Atmosphere]: ${d.atmosphere}\n[Audio / SFX]: ${d.audio}\n[Technical Specs]: ${d.specs}`;
  } else if (s === 'i2v') {
    // Automated Image-to-Video Preservation Guardrail (Item 1 requested fix)
    const preservationGuardrail = isZh
      ? `[强制安全锁 Mandatory Guardrail]: 严格保留原始参考图像。不得更改、编辑、添加或删除上传图像中的任何核心结构元素、人脸、布局或物体；仅应用指定的动画与运动向量。`
      : `[Mandatory Guardrail]: Preserve the source reference image strictly. Do not alter, edit, add, or remove any core structural elements, faces, layout, or objects from the uploaded image. Apply animation and motion vectors only.`;

    compiled = isZh
      ? `[参考图锚点 Anchor]: ${d.anchor}\n[主体运动向量 Subject Motion]: ${d.subjectMotion}\n[环境微动 Background Motion]: ${d.bgMotion}\n[镜头路径 Camera Path]: ${d.cameraPath}\n[一致性锁定 Consistency Lock]: ${d.consistency}\n\n${preservationGuardrail}`
      : `[Source Image Anchor]: ${d.anchor}\n[Subject Motion Vector]: ${d.subjectMotion}\n[Background Motion]: ${d.bgMotion}\n[Camera Path]: ${d.cameraPath}\n[Consistency Lock]: ${d.consistency}\n\n${preservationGuardrail}`;
  }

  if (state.detectiveFixes.length > 0) {
    compiled += isZh ? `\n\n# 专项修复指令 (SURGICAL GUARDS)\n- ` : `\n\n# SURGICAL QUALITY GUARDS\n- ` + state.detectiveFixes.join('\n- ');
  }

  document.getElementById('compiled-prompt-output').value = compiled;
  updateTokenTelemetry(compiled);
  runPreflightDiagnostics();
}

function updateTokenTelemetry(text) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const estTokens = Math.max(1, Math.round(words * 1.3));
  document.getElementById('token-counter').textContent = `~${estTokens} tokens`;
}

function runPreflightDiagnostics() {
  const d = window.appState.studios[window.appState.activeStudio];
  const issuesEl = document.getElementById('preflight-issues');
  issuesEl.innerHTML = '';
  const issues = [];
  let score = 96;

  Object.entries(d).forEach(([k, val]) => {
    if (!val || val.trim().length < 4) {
      score -= 15;
      issues.push({ msg: `Field "${k}" is empty or too short.` });
    }
  });

  if (issues.length === 0) {
    issuesEl.innerHTML = `<li class="flex items-center gap-2 text-emerald-400"><i data-lucide="check-circle-2" class="w-4 h-4"></i><span>All structural anchors verified. Ready to use!</span></li>`;
  } else {
    issues.forEach(iss => {
      const li = document.createElement('li');
      li.className = 'flex items-center gap-2 text-amber-300';
      li.innerHTML = `<i data-lucide="alert-triangle" class="w-4 h-4 shrink-0"></i><span>${iss.msg}</span>`;
      issuesEl.appendChild(li);
    });
  }

  document.getElementById('quality-score-badge').textContent = `Score: ${Math.max(40, score)}/100`;
  lucide.createIcons();
}

function runAutoRepair() {
  const d = window.appState.studios[window.appState.activeStudio];
  Object.keys(d).forEach(k => {
    if (!d[k] || d[k].trim().length < 4) {
      d[k] = 'High-clarity professional standard with zero ambiguity';
    }
  });
  renderStudio();
}

function runSmartTokenSaver() {
  const state = window.appState;
  const outputEl = document.getElementById('compiled-prompt-output');
  const original = outputEl.value;
  state.previousPromptBackup = original;

  let compressed = original
    .replace(/could you please kindly|i would like you to|please help me write a/gi, '')
    .replace(/# CONTEXT & AUDIENCE\n/g, '[Context]: ')
    .replace(/# TONE & STYLE\n/g, '[Tone]: ')
    .replace(/# OUTPUT FORMAT\n/g, '[Format]: ')
    .replace(/# CONSTRAINTS\n/g, '[Guardrails]: ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  outputEl.value = compressed;
  document.getElementById('token-saver-banner').classList.remove('hidden');
  updateTokenTelemetry(compressed);
}

function undoTokenSaver() {
  const state = window.appState;
  if (state.previousPromptBackup) {
    document.getElementById('compiled-prompt-output').value = state.previousPromptBackup;
    document.getElementById('token-saver-banner').classList.add('hidden');
    updateTokenTelemetry(state.previousPromptBackup);
  }
}

function applyDetectiveFix(symptom) {
  const fixes = {
    generic: 'Ban generic AI clichés ("delve", "tapestry"). Use concrete examples and numbers.',
    hallucination: 'Epistemic Guardrail: Use verified facts only. State uncertainty explicitly instead of guessing.',
    visual_artifacts: 'Visual Lock: Maintain natural hand/limb proportions and strict frame-to-frame consistency.',
    format_ignored: 'Schema Lock: Follow the exact headings requested with zero intro or outro chatter.'
  };
  if (!window.appState.detectiveFixes.includes(fixes[symptom])) {
    window.appState.detectiveFixes.push(fixes[symptom]);
  }
  compilePrompt();
  toggleModal('detective-modal');
}

function setUILang(lang) {
  window.appState.uiLang = lang;
  document.getElementById('btn-ui-en').className = lang === 'en' ? 'px-2.5 py-1 rounded-md text-xs font-medium bg-indigo-600 text-white transition' : 'px-2.5 py-1 rounded-md text-xs font-medium text-slate-400 hover:text-white transition';
  document.getElementById('btn-ui-zh').className = lang === 'zh' ? 'px-2.5 py-1 rounded-md text-xs font-medium bg-indigo-600 text-white transition' : 'px-2.5 py-1 rounded-md text-xs font-medium text-slate-400 hover:text-white transition';

  const t = window.i18n[lang];
  document.getElementById('ui-subtitle').textContent = t.subtitle;
  document.getElementById('lbl-ui-lang').textContent = t.uiLang;
  document.getElementById('lbl-out-lang').textContent = t.outLang;
  document.getElementById('lbl-studios').textContent = t.studios;
  document.getElementById('lbl-vault-btn').textContent = t.vaultBtn;
  document.getElementById('lbl-detective-btn').textContent = t.detectiveBtn;
  document.getElementById('lbl-smart-start-title').textContent = t.smartStartTitle;
  document.getElementById('lbl-smart-start-desc').textContent = t.smartStartDesc;
  document.getElementById('lbl-smart-btn').textContent = t.smartBtn;
  document.getElementById('lbl-preflight-title').textContent = t.preflightTitle;
  document.getElementById('lbl-auto-repair').textContent = t.autoRepair;
  document.getElementById('lbl-compiled-title').textContent = t.compiledTitle;
  document.getElementById('lbl-token-saver').textContent = t.tokenSaver;
  document.getElementById('lbl-copy-btn').textContent = t.copyBtn;
  document.getElementById('lbl-ai-enhance').textContent = t.aiEnhance;
  document.getElementById('lbl-export-btn').textContent = t.exportBtn;
  document.getElementById('creator-compact-copy').textContent = t.creatorCompact;
  document.getElementById('creator-main-copy').textContent = t.creatorMain;

  document.querySelectorAll('.studio-title').forEach(el => {
    el.textContent = t[el.dataset.key];
  });
  renderStudio();
}

function setOutLang(lang) {
  window.appState.outLang = lang;
  document.getElementById('btn-out-en').className = lang === 'en' ? 'px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-600 text-white transition' : 'px-2.5 py-1 rounded-md text-xs font-medium text-slate-400 hover:text-white transition';
  document.getElementById('btn-out-zh').className = lang === 'zh' ? 'px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-600 text-white transition' : 'px-2.5 py-1 rounded-md text-xs font-medium text-slate-400 hover:text-white transition';
  compilePrompt();
}

function toggleModal(id) {
  document.getElementById(id).classList.toggle('hidden');
}

function resetCurrentStudio() {
  const s = window.appState.activeStudio;
  Object.keys(window.appState.studios[s]).forEach(k => {
    window.appState.studios[s][k] = '';
  });
  window.appState.detectiveFixes = [];
  renderStudio();
}

function copyCompiledPrompt() {
  const text = document.getElementById('compiled-prompt-output').value;
  navigator.clipboard.writeText(text);
  const btn = document.getElementById('lbl-copy-btn');
  const old = btn.textContent;
  btn.textContent = window.appState.uiLang === 'zh' ? '已复制 ✓' : 'Copied ✓';
  setTimeout(() => {
    btn.textContent = old;
  }, 1500);
}

function exportPromptJSON() {
  const s = window.appState.activeStudio;
  const payload = {
    studio: s,
    outputLanguage: window.appState.outLang,
    parameters: window.appState.studios[s],
    compiledPrompt: document.getElementById('compiled-prompt-output').value,
    timestamp: new Date().toISOString()
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `prompt-builder-${s}.json`;
  a.click();
}

window.addEventListener('DOMContentLoaded', () => {
  renderStudio();
  lucide.createIcons();
});