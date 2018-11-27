import { settings } from '../config/variables'
export default async () => {
  if (!navigator.serviceWorker) return null
  try {
    const registration = await navigator.serviceWorker.register(settings.SERVICE_WORKER_SCRIPT)
    const subscription = await registration.pushManager.getSubscription()
    return subscription ? subscription.endpoint : null
  } catch (e) {
    return null
  }
}
