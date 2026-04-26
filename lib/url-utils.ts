export function detectUrlType(url: string): 'youtube' | 'article' | 'invalid' {
  try {
    const parsed = new URL(url)
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return 'invalid'
    if (parsed.hostname.includes('youtube.com') || parsed.hostname.includes('youtu.be')) {
      return 'youtube'
    }
    return 'article'
  } catch {
    return 'invalid'
  }
}

function isPrivateIP(hostname: string): boolean {
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1') return true
  if (hostname.startsWith('10.')) return true
  if (hostname.startsWith('172.')) {
    const secondOctet = parseInt(hostname.split('.')[1], 10)
    if (secondOctet >= 16 && secondOctet <= 31) return true
  }
  if (hostname.startsWith('192.168.')) return true
  if (hostname.startsWith('169.254.')) return true
  return false
}

export function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return false
    if (isPrivateIP(parsed.hostname)) return false
    return true
  } catch {
    return false
  }
}
