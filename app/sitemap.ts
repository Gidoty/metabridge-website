import type { MetadataRoute } from 'next'

const BASE = 'https://metabridgeacademy.com'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE,                                   lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/courses`,                      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/about`,                        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/books`,                        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/faq`,                          lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/contact`,                      lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.6 },
    { url: `${BASE}/gallery`,                      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/refer`,                        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/corporate`,                    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/verify/lookup`,                lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.5 },
    { url: `${BASE}/privacy-policy`,               lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.4 },
    { url: `${BASE}/refund-policy`,                lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.4 },
    { url: `${BASE}/terms`,                        lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.4 },
  ]
}
