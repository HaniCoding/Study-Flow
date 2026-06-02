interface AIProvider {
  name: 'groq' | 'gemini' | 'openrouter';
  apiKey: string;
}

function getProviders(): AIProvider[] {
  return [
    { name: 'groq', apiKey: process.env.GROQ_API_KEY || '' },
    { name: 'gemini', apiKey: process.env.GEMINI_API_KEY || '' },
    { name: 'openrouter', apiKey: process.env.OPENROUTER_API_KEY || '' },
  ];
}

const SYSTEM_PROMPT = `You are StudyFlow AI, an advanced AI learning assistant. You help students and professionals by:
- Explaining complex concepts in simple terms
- Generating summaries and notes
- Creating quizzes and practice questions
- Translating content to Hindi
- Answering questions accurately and concisely
- Providing follow-up suggestions

Always be helpful, accurate, and encouraging. Use markdown formatting in your responses.`;

export class AIService {
  private static async generateWithGroq(
    messages: Array<{ role: string; content: string }>
  ) {
    const response = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages,
          ],
          stream: false,
          temperature: 0.7,
          max_tokens: 2048,
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text().catch(() => 'Unknown error');
      throw new Error(`Groq API error: ${err}`);
    }
    const data = await response.json();
    return data.choices?.[0]?.message?.content || '';
  }

  private static async generateWithGemini(
    messages: Array<{ role: string; content: string }>
  ) {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: messages.map((m) => m.content).join('\n') }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
          },
        }),
      }
    );

    if (!response.ok) throw new Error('Gemini API error');
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  }

  private static async generateWithOpenRouter(
    messages: Array<{ role: string; content: string }>
  ) {
    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer':
            process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
          'X-Title': 'StudyFlow AI',
        },
        body: JSON.stringify({
          model: 'anthropic/claude-3.5-sonnet',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages,
          ],
          temperature: 0.7,
          max_tokens: 2048,
        }),
      }
    );

    if (!response.ok) throw new Error('OpenRouter API error');
    const data = await response.json();
    return data.choices?.[0]?.message?.content || '';
  }

  static async generateResponse(
    messages: Array<{ role: string; content: string }>,
    preferredProvider: 'groq' | 'gemini' | 'openrouter' = 'groq'
  ): Promise<string> {
    const providers = getProviders();
    const providerOrder = [
      providers.find((p) => p.name === preferredProvider),
      ...providers.filter((p) => p.name !== preferredProvider),
    ].filter((p) => p && p.apiKey) as AIProvider[];

    let lastError: Error | null = null;

    for (const provider of providerOrder) {
      try {
        switch (provider.name) {
          case 'groq':
            return await this.generateWithGroq(messages);
          case 'gemini':
            return await this.generateWithGemini(messages);
          case 'openrouter':
            return await this.generateWithOpenRouter(messages);
        }
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error');
        continue;
      }
    }

    throw lastError || new Error('All AI providers failed');
  }

  static async streamResponse(
    messages: Array<{ role: string; content: string }>,
    onChunk: (chunk: string) => void,
    onDone: () => void,
    preferredProvider: 'groq' | 'gemini' | 'openrouter' = 'groq'
  ) {
    try {
      const response = await fetch(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [
              { role: 'system', content: SYSTEM_PROMPT },
              ...messages,
            ],
            stream: true,
            temperature: 0.7,
            max_tokens: 2048,
          }),
        }
      );

      if (!response.ok) {
        const err = await response.text().catch(() => 'Unknown error');
        throw new Error(`Stream error: ${err}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      if (!reader) {
        throw new Error('No response body');
      }

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          onDone();
          return;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith('data: ')) continue;

          const data = trimmed.slice(6);
          if (data === '[DONE]') {
            onDone();
            return;
          }

          try {
            const parsed = JSON.parse(data);
            const token = parsed.choices?.[0]?.delta?.content;
            if (token) onChunk(token);
          } catch {
            // Skip malformed JSON lines
          }
        }
      }
    } catch (error) {
      throw error;
    }
  }
}