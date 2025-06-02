export async function GET() {
  const baseUrl = 'https://new-projects-dubai.com';

  const routes = [
    {
      loc: `${baseUrl}/`,
      lastmod: '2025-06-02T00:00:00+00:00',
      priority: '1.0',
    },
    {
      loc: `${baseUrl}/canada`,
      lastmod: '2025-06-02T00:00:00+00:00',
      priority: '0.9',
    },
    {
      loc: `${baseUrl}/uk`,
      lastmod: '2025-06-02T00:00:00+00:00',
      priority: '0.9',
    },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${route.loc}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
