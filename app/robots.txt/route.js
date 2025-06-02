export async function GET() {
  const baseUrl = 'https://new-projects-dubai.com';
  
  const robots = `User-agent: *
Allow: /

# Allow all country-specific pages
Allow: /uk
Allow: /uk/
Allow: /canada
Allow: /canada/

# Disallow admin, API, and private directories
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /private/

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay
Crawl-delay: 1`;

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}