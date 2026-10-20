export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { provider, apiKey, prompt, studio = 'text', targetApp = 'universal', goal = 'platform_master', outputLang = 'en' } = req.body;
  if (!apiKey || !prompt) {
    return res.status(400).json({ error: 'Missing API key or prompt' });
  }

  const platformRules = {
    google_flow: `TARGET PLATFORM: Google Flow (powered by Veo 3.1).
STRICT RULES:
1. Output ONLY the clean visual/auditory prompt to paste into Google Flow. NEVER include meta-tags like "[Target I2V Platform]", "[Execution Directive]", or "Motion Bucket 40".
2. BAN NEGATIVE "DO NOT" LISTS: Never write "DO NOT edit facial features, clothing, text". Instead, write positive stillness constraints tailored to the scene (e.g., "All architectural geometry, walls, marble cabinetry, and furniture remain completely stationary, rigid, and locked to the starting frame").
3. Enforce the 6-Layer Flow structure: (1) Single-axis camera movement & focal length, (2) Scene anchor & positive geometry lock, (3) Primary foreground micro-motion physics, (4) Slow background depth motion, (5) Consistent lighting & 8-second pacing, (6) Explicit "Audio:" restraint cue at the very end (e.g., "Audio: quiet indoor room tone, faint soft breeze, no music, no dialogue").`,

    hailuo: `TARGET PLATFORM: Hailuo AI (MiniMax Video / I2V-01-Live / Director).
STRICT RULES:
1. Begin camera movements with explicit Hailuo bracketed commands such as [Push in], [Pull out], [Pan right], [Tilt up], [Pedestal up], or [Static shot].
2. Focus on chronological action beats, fluid dynamics, and subtle micro-expressions while maintaining 100% structural consistency with any starting frame.`,

    kling: `TARGET PLATFORM: Kling AI (1.6 / 2.0).
STRICT RULES:
1. Structure cleanly into Subject/Start Frame Anchor -> Foreground Motion Trajectory -> Background Environment Physics -> Camera & Lens Specs -> Structural Consistency Lock.
2. Emphasize realistic physical inertia, constant camera speed, and zero morphing.`,

    runway: `TARGET PLATFORM: Runway Gen-3 Alpha / Gen-4.
STRICT RULES:
1. Lead immediately with continuous camera movement terminology.
2. For Image-to-Video (I2V), focus strictly on the motion vectors and camera trajectory without over-describing static image details, and state positively that static structures remain locked in 3D space. Never use numerical flags.`,

    nano_banana: `TARGET PLATFORM: Google Nano Banana (Image Generation).
STRICT RULES:
1. Write in rich, natural descriptive prose with crystal-clear spatial hierarchy (foreground, midground, background).
2. If text/typography appears in the image, enclose the exact text in double quotes ("...") and specify font style and placement.
3. Do NOT use Midjourney "--ar" or "--no" flags; weave aspect ratio and purity exclusions naturally into the final sentence.`,

    midjourney: `TARGET PLATFORM: Midjourney v6.1 / v7.
STRICT RULES:
1. Craft high-density photographic/artistic phrases separated by commas, specifying camera body, lens focal length, f-stop, lighting physics, and surface materials.
2. Keep native parameters (--ar, --stylize, --v 6.1, --no) cleanly at the very end of the prompt.`
  };

  const selectedPlatformRule = platformRules[targetApp] || `TARGET PLATFORM: ${targetApp.toUpperCase()}. Optimize for maximum constraint clarity, domain specificity, and high-fidelity generation.`;

  const goalInstructions = {
    platform_master: 'Maximize compatibility and output quality for the target platform using native camera/visual grammar and positive structural locks.',
    cinematic_detail: 'Enrich sensory, optical lens, lighting falloff, surface micro-texture, and physical motion realism without changing the user’s core subject.',
    strict_lock: 'Prioritize maximum geometric stability, zero hallucination, and strict adherence to structural boundaries.',
    token_compact: 'Compress into ultra-dense, high-signal directives that preserve 100% of constraints in 30% fewer words.'
  }[goal] || 'Optimize for maximum platform quality.';

  const langRule = outputLang === 'zh'
    ? 'Output the final optimized prompt in Simplified Chinese (keep native technical syntax like "Audio:" or "--ar" where required by the platform).'
    : 'Output the final optimized prompt in English.';

  const systemInstruction = `You are a Principal AI Prompt Architect specializing in ${studio.toUpperCase()} prompts.\n${selectedPlatformRule}\nOptimization Goal: ${goalInstructions}\n${langRule}\nReturn ONLY the final optimized prompt text with no introductory commentary or markdown code fences.`;

  try {
    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `${systemInstruction}\n\nUSER DRAFT PROMPT TO OPTIMIZE:\n${prompt}` }] }],
          generationConfig: { temperature: 0.35 }
        })
      }
    );
    const data = await resp.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || prompt;
    return res.status(200).json({ enhancedPrompt: text.trim() });
  } catch (err) {
    return res.status(500).json({ error: 'Provider request failed' });
  }
}
