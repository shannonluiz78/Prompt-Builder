window.starterTemplates = [
  // ==================== IMAGE-TO-VIDEO (I2V) TEMPLATES ====================
  {
    id: 'i2v_flow_interior',
    studio: 'i2v',
    category: 'i2v',
    targetApp: 'google_flow',
    appBadge: 'Google Flow (Veo 3.1)',
    title: 'Luxury Interior: Curtains & Coffee Steam',
    description: 'Optimized for Google Flow Starting Frame mode. Animates sheer curtains and coffee steam while locking marble kitchen geometry 100% rigid.',
    payload: {
      anchor: 'High-resolution interior photo of an open-concept luxury marble kitchen and living area',
      subjectMotion: 'Sheer white floor-to-ceiling balcony curtains billow gently inward with realistic fabric physics in a light breeze; delicate translucent wisps of steam rise slowly from the ceramic coffee cup on the marble island',
      bgMotion: 'Soft clouds drift imperceptibly across the distant city skyline outside the glass windows',
      cameraPath: 'Slow, ultra-steady gimbal dolly push-in moving smoothly forward along the central axis of the marble kitchen island, level horizon, zero lens distortion',
      consistency: 'All architectural geometry, walls, cabinetry, marble waterfall countertops, island edges, and furniture remain completely stationary, rigid, and structurally unchanged from the starting frame',
      audio: 'Quiet luxury indoor room tone with a barely audible gentle breeze near the balcony; no background music, no voices, no sudden sound effects'
    }
  },
  {
    id: 'i2v_hailuo_portrait',
    studio: 'i2v',
    category: 'i2v',
    targetApp: 'hailuo',
    appBadge: 'Hailuo AI (MiniMax)',
    title: 'Living Portrait: Subtle Gaze & Hair Breeze',
    description: 'Optimized for Hailuo I2V-01-Live. Uses bracketed camera syntax and micro-expression physics while preserving facial identity.',
    payload: {
      anchor: 'Editorial close-up portrait photo of a confident professional in smart casual attire standing by a sunlit window',
      subjectMotion: 'Subject maintains natural eye contact, blinks softly once, and gives a subtle, warm micro-smile as a gentle breeze moves a few loose strands of hair',
      bgMotion: 'Warm dappled sunlight shifts softly across the blurred background wall',
      cameraPath: '[Push in] Imperceptibly slow dolly push-in on an 85mm prime lens with shallow depth of field',
      consistency: 'Facial structure, eye color, skin texture, eyeglasses, and clothing collar remain 100% consistent with the starting reference frame',
      audio: 'Soft quiet room ambience, no dialogue, no background music'
    }
  },
  {
    id: 'i2v_kling_product',
    studio: 'i2v',
    category: 'i2v',
    targetApp: 'kling',
    appBadge: 'Kling AI 1.6 / 2.0',
    title: 'Hero Product: Water Ripples & Mist Drift',
    description: 'Optimized for Kling AI Start Frame mode. Animates surrounding water ripples and cool mist while keeping product logos razor-sharp.',
    payload: {
      anchor: 'Commercial studio photo of a glass perfume bottle resting on a wet black slate stone podium',
      subjectMotion: 'Delicate cool white mist swirls and glides slowly around the base of the glass bottle; golden light caustics shimmer gently inside the liquid',
      bgMotion: 'Concentric micro-ripples expand softly across the shallow dark water surface surrounding the stone podium',
      cameraPath: 'Slow, smooth orbital arc pan (10 degrees) maintaining crisp macro focus on the bottle center',
      consistency: 'Bottle silhouette, glass typography, cap geometry, and stone podium remain completely solid, rigid, and unwarped',
      audio: 'Subtle crystalline water chime and quiet studio ambience, no speech'
    }
  },
  {
    id: 'i2v_runway_architecture',
    studio: 'i2v',
    category: 'i2v',
    targetApp: 'runway',
    appBadge: 'Runway Gen-3 / Gen-4',
    title: 'Architectural Exterior: Dusk Water & Clouds',
    description: 'Optimized for Runway I2V motion-first rules. Focuses purely on camera trajectory and water reflections without re-describing static walls.',
    payload: {
      anchor: 'Architectural exterior photo of a modern condominium facade beside a reflective lap pool at twilight',
      subjectMotion: 'Gentle ripples shimmer across the infinity pool surface, reflecting the warm interior lights naturally',
      bgMotion: 'Twilight clouds glide slowly across the deep blue evening sky; palm fronds sway gently in the breeze',
      cameraPath: 'Continuous, steady low-angle crane pedestal up combined with a slow forward dolly push',
      consistency: 'Building facade, balcony glass railings, columns, and structural lines remain strictly locked in perspective',
      audio: 'Gentle evening breeze and soft water lapping, no music'
    }
  },

  // ==================== TEXT-TO-VIDEO TEMPLATES ====================
  {
    id: 'vid_flow_drone',
    studio: 'video',
    category: 'video',
    targetApp: 'google_flow',
    appBadge: 'Google Flow (Veo 3.1)',
    title: 'Cinematic Aerial Sky-Garden Reveal',
    description: 'Full 6-layer Google Flow prompt with camera trajectory, optical fidelity, and synchronized native audio ambience.',
    payload: {
      scene: 'Aerial drone shot gliding smoothly past lush vertical sky gardens toward a cantilevered infinity pool overlooking the Singapore city skyline at golden hour dusk',
      cameraMotion: 'Smooth stabilized gimbal forward push-in with a gradual upward tilt reveal, fixed 24mm wide cinema lens, zero horizon roll',
      pacing: 'Fluid, unhurried luxury real estate pacing over an 8-second continuous take with realistic water physics',
      atmosphere: 'Warm twilight amber interior architectural glow contrasting with a deep sapphire evening sky and soft reflections',
      audio: 'Subtle high-altitude evening breeze, gentle infinity pool water ripples, warm minimalist ambient soundscape, no voices',
      specs: '16:9 widescreen, 8 seconds, 24fps photorealistic architectural cinematography'
    }
  },
  {
    id: 'vid_hailuo_macro',
    studio: 'video',
    category: 'video',
    targetApp: 'hailuo',
    appBadge: 'Hailuo AI (Director)',
    title: 'Culinary / Product Slow-Motion Pour',
    description: 'Built for Hailuo Director mode using bracketed camera cues and high-frame-rate fluid physics.',
    payload: {
      scene: 'Rich, velvety espresso pouring in ultra-slow motion into a crystal glass filled with clear ice cubes and cold milk on a dark walnut counter, creating swirling caramel marble patterns',
      cameraMotion: '[Push in] Slow macro dolly push-in combined with [Track right] subtle 15-degree orbital movement',
      pacing: '120fps high-speed phantom camera slow-motion fluid dynamics, crisp droplet physics',
      atmosphere: 'Warm morning café backlight streaming through a window, dramatic rim lighting on glass condensation',
      audio: 'Crisp ice clink, rich espresso pour sound, warm quiet café room tone',
      specs: '9:16 vertical, 6 seconds, 100mm f/2.8 macro cinema lens'
    }
  },
  {
    id: 'vid_kling_lifestyle',
    studio: 'video',
    category: 'video',
    targetApp: 'kling',
    appBadge: 'Kling AI 2.0',
    title: 'Property Tour Walk-Through POV',
    description: 'Optimized for Kling AI chronological spatial continuity—ideal for virtual showroom walk-throughs.',
    payload: {
      scene: 'First-person stabilized walkthrough emerging from a sleek private elevator foyer into a sunlit double-height penthouse living room with panoramic floor-to-ceiling city views',
      cameraMotion: '3-axis Steadicam forward glide at eye level, panning smoothly 20 degrees right toward the balcony',
      pacing: 'Natural human walking speed transitioning into a slow, awe-inspiring pause near the glass window',
      atmosphere: 'Bright natural morning sunlight casting crisp geometric shadows across herringbone oak floors',
      audio: 'Soft footsteps on wood floor, quiet luxury penthouse acoustics',
      specs: '16:9, 10 seconds, 18mm rectilinear architectural lens, zero edge warping'
    }
  },

  // ==================== IMAGE STUDIO TEMPLATES ====================
  {
    id: 'img_nano_cutaway',
    studio: 'image',
    category: 'image',
    targetApp: 'nano_banana',
    appBadge: 'Google Nano Banana',
    title: '3D Isometric Cutaway Floorplan',
    description: 'Tailored for Google Nano Banana natural spatial prose. Produces razor-sharp room layouts, textures, and optional clean room labels.',
    payload: {
      subject: '3D isometric architectural cutaway floorplan of a modern luxury 3-bedroom condominium unit. Clearly defined open-concept marble kitchen island, warm oak living room with L-shaped sofa, landscaped balcony, and master suite with walk-in wardrobe, floating on a clean studio plinth',
      style: 'High-precision architectural visualization, miniature diorama aesthetic, physically based rendering (PBR) materials, clean museum-grade presentation',
      lighting: 'Warm golden hour sunlight streaming diagonally through the balcony glass, soft global illumination, gentle ambient occlusion shadows',
      camera: 'True 45-degree isometric orthographic projection, tilt-shift miniature lens feel, f/8 edge-to-edge sharpness, 8k detail',
      ratio: '16:9',
      negative: 'warped walls, non-parallel architectural lines, cluttered mess, unreadable gibberish text, oversaturated neon, watermarks'
    }
  },
  {
    id: 'img_nano_infographic',
    studio: 'image',
    category: 'image',
    targetApp: 'nano_banana',
    appBadge: 'Google Nano Banana',
    title: 'Social Media Visual Card with Exact Text',
    description: 'Leverages Nano Banana’s industry-leading typography rendering to create a clean visual poster with exact quoted headline text.',
    payload: {
      subject: 'Modern minimalist real estate wealth strategy poster featuring a sleek 3D glass bar chart ascending toward a luxury skyline. At the top center, display the exact bold headline text "5-YEAR MOP STRATEGY" in clean white geometric sans-serif typography',
      style: 'Apple-inspired editorial fintech graphic design, frosted glassmorphism cards, brushed titanium and emerald accents',
      lighting: 'Soft studio rim lighting with subtle emerald and indigo volumetric glow behind the glass chart',
      camera: 'Straight-on front orthographic composition, ultra-sharp vector-level typography clarity',
      ratio: '4:5',
      negative: 'misspelled words, extra letters, blurry typography, cluttered background, crooked layout'
    }
  },
  {
    id: 'img_mj_editorial',
    studio: 'image',
    category: 'image',
    targetApp: 'midjourney',
    appBadge: 'Midjourney v6.1 / v7',
    title: 'Executive Brand Portrait',
    description: 'Formatted with Midjourney optical descriptors and native --ar / --stylize / --no parameters.',
    payload: {
      subject: 'Editorial half-body portrait of an approachable modern Asian entrepreneur in a tailored navy smart-casual blazer standing in a sunlit architectural lounge',
      style: 'High-end commercial magazine photography, shot on Hasselblad H6D-100c, natural skin micro-texture, timeless color palette',
      lighting: 'Soft directional window key light with warm golden rim light and natural catchlights in the eyes',
      camera: '85mm f/1.4 prime lens, creamy bokeh background separation, eye-level composition',
      ratio: '4:5',
      negative: 'plastic skin, airbrushed face, deformed fingers, asymmetrical eyes, cartoon, watermark'
    }
  },

  // ==================== TEXT STUDIO TEMPLATES ====================
  {
    id: 'txt_viral_script',
    studio: 'text',
    category: 'text',
    targetApp: 'universal_text',
    appBadge: 'Universal LLM',
    title: '60s Short-Form Property / Business Script',
    description: 'Hook viewers in 3 seconds and explain complex financial or property concepts with zero jargon.',
    payload: {
      role: 'Viral Short-Form Video Producer & Financial Storyteller',
      objective: 'Write a high-retention 60-second vertical video script (Reels/TikTok/Shorts) breaking down why waiting 5 years for MOP can build a stronger upgrade cushion.',
      context: 'Target audience: Young couples and first-time homeowners in Singapore comparing BTO/EC vs resale options.',
      tone: 'Warm, candid, data-backed, conversational peer-to-peer advice',
      format: '1. Visual + Spoken Hook (0-4s) -> 2. Common Myth (4-15s) -> 3. Simple Math Breakdown (15-45s) -> 4. Low-Pressure Question CTA (45-60s)',
      constraints: 'Keep spoken sentences under 12 words; include [Visual B-Roll Cues] in brackets; avoid pushy sales language; total spoken word count 135-150 words.'
    }
  },
  {
    id: 'txt_claude_strategy',
    studio: 'text',
    category: 'text',
    targetApp: 'claude',
    appBadge: 'Anthropic Claude',
    title: 'Client Objection & Decision Matrix',
    description: 'Uses Claude XML structuring to build an empathetic, numbers-first client consultation guide.',
    payload: {
      role: 'Senior Wealth & Asset Progression Advisor',
      objective: 'Create a structured client consultation guide addressing the top 4 hesitations upgraders face during high-interest or high-price market cycles.',
      context: 'Used during 1-on-1 discovery calls with cautious family upgraders.',
      tone: 'Empathetic, analytical, transparent, zero-pressure',
      format: 'Markdown Table (Objection | Root Fear | Empathetic Reframe | Prudent Stress-Test Question)',
      constraints: 'Never promise guaranteed capital appreciation; emphasize holding power, reserve buffers, and realistic downside protection.'
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

  ['all', 'text', 'image', 'video', 'i2v'].forEach(cat => {
    const btn = document.getElementById(`btn-cat-${cat}`);
    if (btn) {
      btn.className = cat === category
        ? 'px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white transition shrink-0'
        : 'px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition shrink-0';
    }
  });

  filtered.forEach(t => {
    const card = document.createElement('div');
    card.className = 'p-4 rounded-xl bg-slate-950/90 border border-slate-800 hover:border-indigo-500/60 transition flex flex-col justify-between space-y-3 group';

    const studioBadgeColor = {
      text: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      image: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      video: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      i2v: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
    }[t.studio] || 'bg-slate-800 text-slate-300';

    card.innerHTML = `
      <div class="space-y-2">
        <div class="flex items-center justify-between gap-2 flex-wrap">
          <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${studioBadgeColor}">${t.studio.toUpperCase()}</span>
          <span class="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
            <i data-lucide="cpu" class="w-3 h-3"></i>
            ${t.appBadge}
          </span>
        </div>
        <h4 class="font-bold text-sm text-white group-hover:text-indigo-300 transition">${t.title}</h4>
        <p class="text-xs text-slate-400 leading-relaxed">${t.description}</p>
      </div>
      <button onclick="loadTemplate('${t.id}')" class="w-full py-2 px-3 rounded-lg bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition">
        <i data-lucide="check-circle-2" class="w-3.5 h-3.5"></i>
        <span>Load Platform-Optimized Template</span>
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
  if (template.targetApp) {
    window.appState.targetApps[template.studio] = template.targetApp;
  }
  window.appState.studios[template.studio] = { ...template.payload };
  window.appState.detectiveFixes = [];

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
