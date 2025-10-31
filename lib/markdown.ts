import { remark } from 'remark';
import html from 'remark-html';

// Cache for parsed markdown (development optimization)
const markdownCache = new Map<string, string>();

export async function markdownToHtml(markdown: string): Promise<string> {
  // Check cache first
  const cacheKey = markdown.slice(0, 100); // Use first 100 chars as key
  if (markdownCache.has(cacheKey)) {
    return markdownCache.get(cacheKey)!;
  }

  // Parse markdown
  const processed = await remark().use(html).process(markdown);
  const result = processed.toString();

  // Cache the result
  markdownCache.set(cacheKey, result);

  // Limit cache size to prevent memory issues
  if (markdownCache.size > 100) {
    const firstKey = markdownCache.keys().next().value;
    if (firstKey) markdownCache.delete(firstKey);
  }

  return result;
}
