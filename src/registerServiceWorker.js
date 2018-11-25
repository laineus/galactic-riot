import axios from 'axios'
import { settings } from './config/variables'

const SERVICE_WORKER_SCRIPT = '/js/serviceWorker.js'

const sendSubscription = subscription => {
  axios.post(settings.HTTP_SERVER, subscription.toJSON())
}

const urlBase64ToUint8Array = base64String => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i)
  return outputArray
}

const subscribe = registration => {
  axios.get(settings.HTTP_SERVER).then(response => {
    const publicKey = response.data.publicKey
    registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicKey)
    }).then(sendSubscription)
  })
}

export default () => {
  if (!navigator.serviceWorker) return
  Notification.requestPermission(permission => {
    if (permission !== 'granted') return
    navigator.serviceWorker.register(SERVICE_WORKER_SCRIPT).then(registration => {
      registration.pushManager.getSubscription().then(subscription => subscription ? sendSubscription(subscription) : subscribe(registration))
    })
  })
}
