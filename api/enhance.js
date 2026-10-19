export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { provider, apiKey, prompt, outputLang } = req.body;
  if (!apiKey || !prompt) {
    return res.status(400).json({ error: 'Missing API key or prompt' });
  }

  const systemInstruction =
    outputLang === 'zh'
      ? '你是一位资深提示词架构师。请在不改变核心意图的前提下，优化以下提示词的结构清晰度与指令密度，直接输出优化后的提示词。'
      : 'You are a Senior Prompt Architect. Refine the following prompt for maximum clarity, constraint precision, and token efficiency. Return only the optimized prompt.';

  try {
    // 1. Google Gemini (Latest efficient production model: gemini-2.5-flash)[cite: 6]
    if (provider === 'gemini') {
      const resp = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `${systemInstruction}\n\n${prompt}` }] }]
          })
        }
      );
      const data = await resp.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || prompt;
      return res.status(200).json({ enhancedPrompt: text });
    }

    // 2. Anthropic Claude (Latest efficient model: claude-3-5-sonnet-latest)
    if (provider === 'anthropic') {
      const resp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-latest',
          max_tokens: 1024,
          system: systemInstruction,
          messages: [{ role: 'user', content: prompt }]
        })
      });
      const data = await resp.json();
      const text = data?.content?.[0]?.text || prompt;
      return res.status(200).json({ enhancedPrompt: text });
    }

    // 3. OpenAI, Groq, and OpenRouter (Latest efficient production models)
    const endpoints = {
      openai: 'https://api.openai.com/v1/chat/completions',
      groq: 'https://api.groq.com/openai/v1/chat/completions',
      openrouter: 'https://openrouter.ai/api/v1/chat/completions'
    };
    const models = {
      openai: 'gpt-4o-mini',
      groq: 'llama-3.3-70b-versatile',
      openrouter: 'openai/gpt-4o-mini'
    };

    const resp = await fetch(endpoints[provider] || endpoints.openai, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: models[provider] || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemInstruction },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3
      })
    });
    const data = await resp.json();
    return res.status(200).json({
      enhancedPrompt: data?.choices?.[0]?.message?.content || prompt
    });
  } catch (err) {
    return res.status(500).json({ error: 'Provider request failed' });
  }
}