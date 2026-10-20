function compilePrompt() {
  const s = state.activeStudio;
  const d = state.studios[s];
  const isZh = state.outLang === 'zh';
  let compiled = '';

  if (s === 'text') {
    // ENFORCES YOUR REQUESTED CONTEXT-FIRST AGENTIC / EXECUTIVE FORMAT FOR TEXT STUDIO
    compiled = isZh
      ? `# 角色与执行 authority (ROLE & EXECUTIVE AUTHORITY)\n${d.role}\n\n# 运营背景与领域范围 (OPERATIONAL CONTEXT & DOMAIN SCOPE)\n${d.context}\n\n# 核心任务目标 (CORE MISSION OBJECTIVE)\n${d.objective}\n\n# 执行协议与输出架构 (EXECUTION PROTOCOL & OUTPUT SCHEMA)\n${d.format}\n\n# 严格约束与 guardrails (STRICT GUARDRAILS)\n${d.constraints}`
      : `# ROLE & EXECUTIVE AUTHORITY\n${d.role}\n\n# OPERATIONAL CONTEXT & DOMAIN SCOPE\n${d.context}\n\n# CORE MISSION OBJECTIVE\n${d.objective}\n\n# EXECUTION PROTOCOL & OUTPUT SCHEMA\n${d.format}\n\n# STRICT GUARDRAILS\n${d.constraints}`;
  } else if (s === 'image') {
    compiled = isZh
      ? `[主体与场景]: ${d.subject}\n[艺术风格与渲染]: ${d.style}\n[光影与色彩]: ${d.lighting}\n[镜头与机位]: ${d.camera}\n[画幅比例]: --ar ${d.ratio}\n[反向排除项]: --no ${d.negative}`
      : `[Subject]: ${d.subject}\n[Style & Medium]: ${d.style}\n[Lighting & Atmosphere]: ${d.lighting}\n[Camera & Lens]: ${d.camera}\n[Aspect Ratio]: --ar ${d.ratio}\n[Negative Prompt]: --no ${d.negative}`;
  } else if (s === 'video') {
    compiled = isZh
      ? `[场景与主体动态]: ${d.scene}\n[摄影机运镜轨迹]: ${d.cameraMotion}\n[运动节奏]: ${d.pacing}\n[光影氛围与调色]: ${d.atmosphere}\n[声音与音效]: ${d.audio}\n[技术规格]: ${d.specs}`
      : `[Scene & Action]: ${d.scene}\n[Camera Trajectory]: ${d.cameraMotion}\n[Motion Pacing]: ${d.pacing}\n[Visual Atmosphere]: ${d.atmosphere}\n[Audio / SFX]: ${d.audio}\n[Technical Specs]: ${d.specs}`;
  } else if (s === 'i2v') {
    // INCLUDES MANDATORY GUARDRAIL TO PRESERVE UPLOADED SOURCE IMAGES
    compiled = isZh
      ? `[参考图锚点]: ${d.anchor}\n[主体运动向量]: ${d.subjectMotion}\n[环境背景微动]: ${d.bgMotion}\n[镜头路径]: ${d.cameraPath}\n[一致性与幅度锁定]: ${d.consistency}\n\n[强制安全锁 / GUARDRAIL]: 严格保留原始参考图像。不得更改、编辑、添加或删除上传图像中的任何核心结构元素、人脸、布局或物体；仅应用动画与运动向量。`
      : `[Source Image Anchor]: ${d.anchor}\n[Subject Motion Vector]: ${d.subjectMotion}\n[Background Motion]: ${d.bgMotion}\n[Camera Path]: ${d.cameraPath}\n[Consistency Lock]: ${d.consistency}\n\n[Mandatory Guardrail]: Preserve the source reference image strictly. Do not alter, edit, add, or remove any core structural elements, faces, layout, or objects from the uploaded image. Apply animation and motion vectors only.`;
  }

  if (state.detectiveFixes.length > 0) {
    compiled += `\n\n# SURGICAL QUALITY GUARDS\n- ` + state.detectiveFixes.join('\n- ');
  }

  document.getElementById('compiled-prompt-output').value = compiled;
  updateTokenTelemetry(compiled);
  runPreflightDiagnostics();
}
