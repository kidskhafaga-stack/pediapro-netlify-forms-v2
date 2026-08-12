type Submission = {
  id: string;
  timestamp: string;
  state: Record<string, any>;
};

function getRedisConfig() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) throw new Error('Missing KV_REST_API_URL or KV_REST_API_TOKEN');
  return { url: url.replace(/\/$/, ''), token };
}

async function redisCommand(command: unknown[]) {
  const { url, token } = getRedisConfig();
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
  });
  const data = await response.json().catch(() => null);
  if (!response.ok || data?.error) {
    throw new Error(data?.error || `Redis request failed (${response.status})`);
  }
  return data?.result;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    if (!body?.id || !body?.timestamp || !body?.state) {
      res.status(400).json({ ok: false, error: 'Invalid submission payload' });
      return;
    }

    const submission: Submission = {
      id: String(body.id),
      timestamp: String(body.timestamp),
      state: body.state,
    };

    // One Redis key per submission + an index containing submission IDs.
    // SET NX prevents duplicate records when the browser retries the same submission.
    const key = `pediapro:submission:${submission.id}`;
    const result = await redisCommand(['SET', key, JSON.stringify(submission), 'NX']);

    if (result === 'OK') {
      await redisCommand(['LPUSH', 'pediapro:submissions', submission.id]);
    }

    res.status(200).json({
      ok: true,
      saved: result === 'OK',
      id: submission.id,
    });
  } catch (error: any) {
    console.error('PediaPro Redis submit error:', error);
    res.status(500).json({
      ok: false,
      error: error?.message || 'Failed to save submission',
    });
  }
}
