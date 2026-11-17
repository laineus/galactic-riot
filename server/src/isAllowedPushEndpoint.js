import { URL } from 'url'

const HOSTS = ['fcm.googleapis.com', 'updates.push.services.mozilla.com', 'web.push.apple.com']

export default endpoint => {
  if (typeof endpoint !== 'string' || endpoint.length > 4096) return false
  try {
    const url = new URL(endpoint)
    return url.protocol === 'https:' && !url.username && !url.password &&
      !url.port && !url.hash && HOSTS.includes(url.hostname)
  } catch (error) {
    return false
  }
}
