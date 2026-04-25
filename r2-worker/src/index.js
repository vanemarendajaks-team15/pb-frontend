export default {
    async fetch(request, env) {
  
      // 1. Handle preflight
      if (request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: corsHeaders() });
      }
  
      const url = new URL(request.url);
      const key = url.pathname.slice(1); // strip leading "/"
  
      // 2. Handle PUT (upload)
      if (request.method === "PUT") {
        await env.R2_BUCKET.put(key, request.body, {
          httpMetadata: { contentType: request.headers.get("Content-Type") },
        });

        return new Response(`Put ${key} successfully!`, {
          status: 200,
          headers: corsHeaders(),   // ← CORS headers on success response too
        });
      }
  
      // 3. Handle GET (optional)
      if (request.method === "GET") {
        const object = await env.R2_BUCKET.get(key);

        if (!object) {
          return new Response("Not Found", { status: 404, headers: corsHeaders() });
        }

        return new Response(object.body, {
          headers: {
            "Content-Type": object.httpMetadata?.contentType ?? "application/octet-stream",
            ...corsHeaders(),
          },
        });
      }
  
      return new Response("Method Not Allowed", { status: 405, headers: corsHeaders() });
    },
  };
  
  function corsHeaders() {
    return {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400",
    };
  };