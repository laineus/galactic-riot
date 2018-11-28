export default async () => {
  if (!navigator.serviceWorker) return null
  try {
    const registration = await navigator.serviceWorker.getRegistration(location.href)
    const subscription = await registration.pushManager.getSubscription()
    return subscription ? subscription.endpoint : null
  } catch (e) {
    return null
  }
}
