import axios from 'axios'
import { settings } from '../config/variables'

const apiEndpoint = `${settings.HTTP_SERVER}/api`

const sendSubscription = subscription => axios.post(apiEndpoint, subscription.toJSON())

const urlBase64ToUint8Array = base64String => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i)
  return outputArray
}

const subscribe = registration => {
  return axios.get(apiEndpoint).then(response => {
    const publicKey = response.data.publicKey
    registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicKey)
    }).then(sendSubscription)
  })
}

export default async () => {
  if (!navigator.serviceWorker) throw new Error('Not supported')
  const permission = await Notification.requestPermission()
  if (permission !== 'granted') throw new Error('Permit required')
  const registration = await navigator.serviceWorker.register(settings.SERVICE_WORKER_SCRIPT)
  const subscription = await registration.pushManager.getSubscription()
  return subscription ? sendSubscription(subscription) : subscribe(registration)
}
