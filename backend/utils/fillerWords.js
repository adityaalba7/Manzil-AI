const FILLER_WORDS = [
  'you know',
  'sort of',
  'um',
  'uh',
  'like',
  'basically',
  'right',
  'actually',
  'literally',
];

export const detectFillerWords = (text) => {
  if (!text || typeof text !== 'string') {
    return { total_count: 0, breakdown: {} };
  }

  const normalised = text.toLowerCase();
  const breakdown = {};

  for (const word of FILLER_WORDS) {
    const pattern = new RegExp(`\\b${word.replace(' ', '\\s+')}\\b`, 'gi');
    const matches = normalised.match(pattern);
    if (matches && matches.length > 0) {
      breakdown[word] = matches.length;
    }
  }

  const total_count = Object.values(breakdown).reduce((sum, n) => sum + n, 0);

  return { total_count, breakdown };
};
