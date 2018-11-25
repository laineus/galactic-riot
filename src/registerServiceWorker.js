const PUBLIC_KEY = ''
const SERVICE_WORKER_SCRIPT = '/js/serviceWorker.js'

const setSubscription = subscription => {
  console.log(subscription.toJSON())
  // register to server
}

const urlBase64ToUint8Array = base64String => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i)
  return outputArray
}

export default () => {
  if (!navigator.serviceWorker) return
  Notification.requestPermission(permission => {
    if (permission !== 'granted') return
    navigator.serviceWorker.register(SERVICE_WORKER_SCRIPT).then(registration => {
      registration.pushManager.getSubscription().then(subscription => {
        if (subscription) return setSubscription(subscription)
        registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(PUBLIC_KEY)
        }).then(setSubscription)
      })
    })
  })
}
