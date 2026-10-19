window.starterTemplates = [
  {
    id: 't1',
    studio: 'text',
    category: 'text',
    title: 'Short-Form Video Script',
    description: 'Hook viewers in 5 seconds and deliver high-retention storytelling for TikTok, Reels, or Shorts.',
    payload: {
      role: 'Viral Short-Form Video Copywriter & Content Strategist',
      objective: 'Write a high-converting 60-second video script explaining a complex topic simply.',
      context: 'Target audience: Digital natives with short attention spans looking for actionable insights.',
      tone: 'Energetic, authoritative, conversational, punchy',
      format: 'Hook (0-5s) -> Core Insight (5-40s) -> Proof (40-50s) -> CTA (50-60s)',
      constraints: 'Avoid corporate jargon; keep sentences under 12 words for smooth spoken delivery.'
    }
  },
  {
    id: 't2',
    studio: 'text',
    category: 'text',
    title: 'Executive Strategic Brief',
    description: 'Synthesize market research and financial data into an executive-ready decision memo.',
    payload: {
      role: 'Principal Business Strategy Consultant',
      objective: 'Analyze market trends and provide a structured go-to-market recommendation memo.',
      context: 'Audience: C-suite executives evaluating risk-adjusted return on investment.',
      tone: 'Objective, analytical, data-grounded, professional',
      format: 'Executive Summary -> Market Overview -> Key Risks -> Strategic Recommendation',
      constraints: 'Lead directly with conclusions; use bullet points; omit conversational filler.'
    }
  },
  {
    id: 't3',
    studio: 'text',
    category: 'text',
    title: 'Customer FAQ & Objection Handler',
    description: 'Address customer pain points and dismantle purchase hesitation with empathy and logic.',
    payload: {
      role: 'Customer Success & Conversion Optimization Lead',
      objective: 'Draft top 5 objections and persuasive counter-responses for buyers.',
      context: 'Audience: Hesitant prospective clients evaluating long-term commitments.',
      tone: 'Empathetic, reassuring, transparent, authoritative',
      format: 'Objection Title -> Root Cause -> Reassurance Strategy -> Actionable Next Step',
      constraints: 'Acknowledge concerns immediately without sounding defensive or dismissive.'
    }
  },
  {
    id: 't4',
    studio: 'text',
    category: 'text',
    title: 'Code Review & Refactoring Architect',
    description: 'Audit messy source code for performance bottlenecks, security flaws, and clean architecture.',
    payload: {
      role: 'Senior Staff Software Architect & Code Reviewer',
      objective: 'Review provided code snippet, identify anti-patterns, and provide refactored clean code.',
      context: 'Audience: Software engineers looking for production-grade best practices.',
      tone: 'Precise, technical, constructive, concise',
      format: 'Critical Bottlenecks -> Security Risks -> Refactored Code -> Performance Delta',
      constraints: 'Provide exact code blocks with inline comments explaining design patterns.'
    }
  },
  {
    id: 't5',
    studio: 'image',
    category: 'image',
    title: '3D Isometric Cutaway Floorplan',
    description: 'Create miniature diorama architectural renderings with warm wood textures and natural light.',
    payload: {
      subject: '3D isometric architectural cutaway of a modern luxury 3-bedroom condominium with warm wood interiors',
      style: 'Miniature diorama aesthetic, Octane Render, unreal engine 5 architecture visualization',
      lighting: 'Warm golden hour sunlight streaming through floor-to-ceiling glass, soft global illumination',
      camera: '45-degree isometric tilt-shift lens, crisp depth of field, 8k resolution',
      ratio: '16:9',
      negative: 'blurry text, warped walls, cluttered furniture, oversaturated neon, watermark'
    }
  },
  {
    id: 't6',
    studio: 'image',
    category: 'image',
    title: 'Cinematic Editorial Portrait',
    description: 'Capture moody, high-end commercial fashion and corporate headshots with exquisite lighting.',
    payload: {
      subject: 'Close-up editorial portrait of a confident professional in smart casual attire',
      style: 'High-end commercial photography, Fujifilm GFX 100 style, ultra-detailed skin texture',
      lighting: 'Soft Rembrandt studio lighting with subtle rim light and warm amber glow',
      camera: '85mm f/1.4 prime lens, shallow depth of field, cinematic color grading',
      ratio: '9:16',
      negative: 'deformed hands, extra fingers, cartoon, plastic skin, distorted eyes, watermark'
    }
  },
  {
    id: 't7',
    studio: 'image',
    category: 'image',
    title: 'Sleek Minimalist Product Mockup',
    description: 'Display tech gadgets and luxury consumer goods against minimalist podium backgrounds.',
    payload: {
      subject: 'Sleek matte black smart device resting on a travertine stone podium with floating mist',
      style: 'Commercial product photography, minimalist studio setup, clean geometry',
      lighting: 'Diffused overhead softbox lighting with crisp edge highlights',
      camera: 'Macro lens 100mm, f/8 aperture, hyper-focused sharp details',
      ratio: '1:1',
      negative: 'scratches, dust spots, uneven lighting, reflections, low resolution'
    }
  },
  {
    id: 't8',
    studio: 'image',
    category: 'image',
    title: 'Futuristic Cyberpunk Skyline',
    description: 'Render neon-lit nocturnal megacities with flying vehicles and atmospheric rain reflections.',
    payload: {
      subject: 'Vast cyberpunk megacity intersection at night with glowing holographic billboards and flying cars',
      style: 'Sci-fi concept art, Blade Runner aesthetic, highly intricate urban density',
      lighting: 'Vibrant neon cyan and magenta glow reflecting on wet asphalt puddles',
      camera: 'Wide-angle cinematic shot, 24mm anamorphic lens, dramatic perspective',
      ratio: '16:9',
      negative: 'daytime, quiet town, low detail, blurry haze, cartoon sketch'
    }
  },
  {
    id: 't9',
    studio: 'video',
    category: 'video',
    title: 'Cinematic FPV Drone Reveal',
    description: 'Smooth, breathtaking aerial fly-throughs over luxury developments and scenic landscapes.',
    payload: {
      scene: 'Aerial FPV drone glide swooping past lush vertical sky gardens toward an infinity pool at dusk',
      cameraMotion: 'Seamless high-speed forward push-in with smooth banking curve',
      pacing: 'Fluid cinematic slow-motion (60fps optical flow)',
      atmosphere: 'Warm twilight amber interior glow contrasting with deep sapphire evening sky',
      audio: 'Subtle ambient breeze, gentle water ripples, warm minimalist piano swell',
      specs: '16:9, 5 seconds, 24fps cinematic shutter'
    }
  },
  {
    id: 't10',
    studio: 'video',
    category: 'video',
    title: 'Slow-Motion Macro Product Orbit',
    description: 'Smooth 360-degree orbital camera rotation highlighting intricate product craftsmanship.',
    payload: {
      scene: 'Smooth 360-degree orbital rotation around a luxury mechanical watch showcasing spinning gears',
      cameraMotion: 'Steady circular dolly tracking shot at constant speed',
      pacing: 'Smooth buttery 60fps macro motion',
      atmosphere: 'Moody dark studio ambient light with polished metallic reflections',
      audio: 'Subtle mechanical ticking, smooth bass drone swell',
      specs: '9:16 vertical, 5 seconds, high dynamic range'
    }
  },
  {
    id: 't11',
    studio: 'i2v',
    category: 'i2v',
    title: 'Billowing Curtains & Sunlight Shift',
    description: 'Animate static interior photos with gentle wind movement and natural lighting transitions.',
    payload: {
      anchor: 'High-resolution interior showroom photo of an open-concept living room and balcony',
      subjectMotion: 'Sheer white curtains gently billowing in a soft breeze; sunlight slowly shifting across the marble floor',
      bgMotion: 'Clouds moving slowly across the city skyline outside the window',
      cameraPath: 'Slow, steady dolly push-in along the room axis',
      consistency: 'Strict structural lock on walls, cabinetry, and furniture geometry (Motion Bucket 40)'
    }
  },
  {
    id: 't12',
    studio: 'i2v',
    category: 'i2v',
    title: 'Cinematic Water Ripple & Steam',
    description: 'Bring dining tables and nature photography to life with subtle fluid and atmospheric motion.',
    payload: {
      anchor: 'Close-up photo of a steaming ceramic coffee cup resting on a wooden table beside a serene pond',
      subjectMotion: 'Delicate aromatic steam rising steadily from the hot coffee cup',
      bgMotion: 'Gentle concentric water ripples expanding softly across the pond surface',
      cameraPath: 'Static locked tripod frame with zero camera shake',
      consistency: 'High fidelity preservation of cup and tabletop textures (Motion Bucket 30)'
    }
  }
];

function renderTemplatesGrid(category = 'all') {
  const grid = document.getElementById('templates-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const filtered = category === 'all' 
    ? window.starterTemplates 
    : window.starterTemplates.filter(t => t.category === category);

  // Update category tab styles
  ['all', 'text', 'image', 'video', 'i2v'].forEach(cat => {
    const btn = document.getElementById(`btn-cat-${cat}`);
    if (btn) {
      if (cat === category) {
        btn.className = 'px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-600 text-white transition shrink-0';
      } else {
        btn.className = 'px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition shrink-0';
      }
    }
  });

  filtered.forEach(t => {
    const card = document.createElement('div');
    card.className = 'p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/50 transition flex flex-col justify-between space-y-3 group';
    
    const badgeColor = {
      text: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      image: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      video: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      i2v: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
    }[t.studio] || 'bg-slate-800 text-slate-300';

    card.innerHTML = `
      <div class="space-y-1.5">
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${badgeColor}">${t.studio.toUpperCase()}</span>
          <i data-lucide="sparkles" class="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 transition"></i>
        </div>
        <h4 class="font-semibold text-sm text-white">${t.title}</h4>
        <p class="text-xs text-slate-400 leading-relaxed">${t.description}</p>
      </div>
      <button onclick="loadTemplate('${t.id}')" class="w-full py-2 px-3 rounded-lg bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition">
        <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
        <span>Load Template</span>
      </button>
    `;
    grid.appendChild(card);
  });

  if (window.lucide) lucide.createIcons();
}

function filterTemplates(cat) {
  renderTemplatesGrid(cat);
}

function loadTemplate(id) {
  const template = window.starterTemplates.find(t => t.id === id);
  if (!template) return;

  window.appState.activeStudio = template.studio;
  window.appState.studios[template.studio] = { ...template.payload };
  window.appState.detectiveFixes = [];

  // Update sidebar active button
  document.querySelectorAll('.studio-btn').forEach(btn => {
    if (btn.dataset.studio === template.studio) {
      btn.className = 'studio-btn w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition bg-indigo-600/20 text-indigo-300 border border-indigo-500/40';
    } else {
      btn.className = 'studio-btn w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 border border-transparent';
    }
  });

  renderStudio();
  toggleModal('templates-modal');
}

window.addEventListener('DOMContentLoaded', () => {
  renderTemplatesGrid('all');
});