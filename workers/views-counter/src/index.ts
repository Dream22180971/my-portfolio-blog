interface Env {
  VIEWS_KV: KVNamespace;
  ALLOWED_ORIGINS: string;
}

function corsHeaders(origin: string, allowedOrigins: string): Record<string, string> {
  const allowed = allowedOrigins.split(",").map((s) => s.trim());
  const allowOrigin = allowed.includes(origin) ? origin : allowed[0] || "*";
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

const viewsCounter = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin") || "";
    const headers = corsHeaders(origin, env.ALLOWED_ORIGINS);

    // CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers });
    }

    // GET /api/views/:slug
    const getMatch = url.pathname.match(/^\/api\/views\/([a-z0-9-]+)$/);
    if (getMatch && request.method === "GET") {
      const slug = getMatch[1];
      const key = `views:${slug}`;
      const count = parseInt((await env.VIEWS_KV.get(key)) || "0", 10);
      return Response.json({ slug, views: count }, { headers });
    }

    // POST /api/views/:slug (increment)
    const postMatch = url.pathname.match(/^\/api\/views\/([a-z0-9-]+)$/);
    if (postMatch && request.method === "POST") {
      const slug = postMatch[1];
      const key = `views:${slug}`;

      // 使用 KV 的原子操作：get → increment → put
      // KV 没有原生 increment，但个人博客并发低，get+put 足够
      const current = parseInt((await env.VIEWS_KV.get(key)) || "0", 10);
      const next = current + 1;
      await env.VIEWS_KV.put(key, String(next), { expirationTtl: 31536000 });
      return Response.json({ slug, views: next }, { headers });
    }

    // 404
    return Response.json({ error: "Not found" }, { status: 404, headers });
  },
};

export default viewsCounter;
