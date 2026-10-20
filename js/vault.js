async function callGeminiDirectWithFallback(apiKey, fullPrompt) {
  let candidateModels = [];
  const errors = [];

  // Step 1: Dynamically ask Google which active models THIS key can actually call (CAT-04)
  try {
    const listResp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    if (listResp.ok) {
      const listData = await listResp.json();
      const available = (listData.models || [])
        .filter(m =>
          Array.isArray(m.supportedGenerationMethods) &&
          m.supportedGenerationMethods.includes('generateContent') &&
          /gemini/i.test(m.name) &&
          !/embedding|imagen|veo|audio|tts|vision|aqa|2\.0-flash/i.test(m.name)
        )
        .map(m => m.name.replace(/^models\//, ''));

      // Prioritize active flash-lite / flash models (including 3.x / 2.5 series) for speed & free-tier quota
      const preferredOrder = [
        ...available.filter(n => /flash-lite/i.test(n)),
        ...available.filter(n => /flash/i.test(n) && !/flash-lite/i.test(n)),
        ...available.filter(n => /pro/i.test(n))
      ];
      candidateModels = [...new Set([...preferredOrder, ...available])];
    }
  } catch (e) {
    console.warn('Model list auto-discovery skipped, using default active list:', e);
  }

  // Fallback list if model listing failed
  if (candidateModels.length === 0) {
    candidateModels = ['gemini-2.5-flash-lite', 'gemini-2.5-flash'];
  }

  // Step 2: Try the verified models on your key in order
  for (const modelName of candidateModels.slice(0, 4)) {
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
        const msg = errJson?.error?.message || `HTTP ${resp.status}`;
        errors.push(`${modelName}: ${msg}`);
      }
    } catch (netErr) {
      errors.push(`${modelName}: ${netErr.message || 'Network error'}`);
    }
  }

  return { success: false, error: errors[0] || 'No active text generation model responded.' };
}
