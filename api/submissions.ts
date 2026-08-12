async function redisCommand(command: unknown[]) {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) throw new Error('Missing KV_REST_API_URL or KV_REST_API_TOKEN');

  const response = await fetch(url.replace(/\/$/, ''), {
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
  if (req.method !== 'GET') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  try {
    const ids: string[] = (await redisCommand(['LRANGE', 'pediapro:submissions', '0', '999'])) || [];
    if (ids.length === 0) {
      res.status(200).json({ ok: true, submissions: [] });
      return;
    }

    const values = await Promise.all(
      ids.map((id) => redisCommand(['GET', `pediapro:submission:${id}`]))
    );

    const submissions = values
      .filter(Boolean)
      .map((value: string) => {
        try { return JSON.parse(value); } catch { return null; }
      })
      .filter(Boolean);

    res.status(200).json({ ok: true, submissions });
  } catch (error: any) {
    console.error('PediaPro Redis read error:', error);
    res.status(500).json({
      ok: false,
      error: error?.message || 'Failed to read submissions',
    });
  }
}
