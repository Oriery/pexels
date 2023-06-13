function getNTrends(n: number): string[] {
  const result: Set<string> = new Set()
  if (n > trends.length) {
    throw new Error('Too many trends requested')
  }
  while (result.size < n) {
    result.add(trends[Math.floor(Math.random() * trends.length)])
  }
  return Array.from(result)
}

export {
  getNTrends
}

const trends = [
  'sunset',
  'office',
  'nature',
  'travel',
  'landscape',
  'sea',
  'mountains',
  'beach',
  'village',
  'city',
  'house',
  'road',
  'park',
  'forest',
  'winter',
  'summer',
  'spring',
  'autumn',
  'business',
  'space',
  'abstract',
  'food',
  'technology',
  'flowers',
  'macro',
  'music',
  'people',
  'fashion',
  'health',
  'sport',
  'holiday',
  'jungle',
  'sky',
  'sun',
  'stars',
  'car',
  'bike',
  'dark',
  'light',
  'beautiful'
]