/**
 * smartSearch — Natural language video search
 * Supports: keywords, "under X min" / "over X min", category/mood
 */
export function smartSearch(query, videos) {
  if (!query.trim()) return videos;
  const q = query.toLowerCase();

  // Parse duration hints
  let maxDuration = Infinity;
  let minDuration = 0;
  const underMatch = q.match(/under\s+(\d+)\s*min/);
  const overMatch = q.match(/over\s+(\d+)\s*min/);
  if (underMatch) maxDuration = parseInt(underMatch[1]) * 60;
  if (overMatch) minDuration = parseInt(overMatch[1]) * 60;

  // Strip duration hints from query for keyword extraction
  const cleanQ = q
    .replace(/under\s+\d+\s*min(utes?)?/g, '')
    .replace(/over\s+\d+\s*min(utes?)?/g, '')
    .trim();

  // Category synonyms
  const categoryMap = {
    cook: 'Comedy', food: 'Comedy', gaming: 'Gaming', game: 'Gaming',
    music: 'Music', song: 'Music', beat: 'Music', jazz: 'Music',
    code: 'Education', python: 'Education', programming: 'Education', learn: 'Education',
    travel: 'Travel', vr: 'Travel', hike: 'Travel',
    sport: 'Sports', parkour: 'Sports', run: 'Sports',
    relax: 'Health', sleep: 'Health', meditation: 'Health', calm: 'Health',
  };

  const keywords = cleanQ.split(/\s+/).filter(Boolean);

  return videos.filter(video => {
    // Duration filter
    const secs = video.durationSecs || 0;
    if (secs > 0 && (secs > maxDuration || secs < minDuration)) return false;

    // Keyword matching: title, tags, channel, category
    const haystack = [
      video.title,
      video.channel,
      video.category,
      ...(video.tags || []),
    ].join(' ').toLowerCase();

    // Category keyword matching
    let categoryBoost = false;
    for (const [kw, cat] of Object.entries(categoryMap)) {
      if (cleanQ.includes(kw) && video.category === cat) { categoryBoost = true; break; }
    }

    if (categoryBoost) return true;

    // General keyword match
    if (!keywords.length) return true;
    return keywords.some(kw => haystack.includes(kw));
  });
}

// Search suggestions based on query prefix
export const SUGGESTIONS = [
  'lo-fi beats',
  'python tutorial',
  'cooking funny',
  'gaming speedrun',
  'meditation sleep',
  'travel vr 360',
  'music live',
  'parkour extreme under 15 min',
  'education programming over 1 hour',
  'jazz chill',
];

export function getSuggestions(query) {
  if (!query.trim()) return SUGGESTIONS.slice(0, 5);
  const q = query.toLowerCase();
  return SUGGESTIONS.filter(s => s.includes(q)).slice(0, 5);
}
