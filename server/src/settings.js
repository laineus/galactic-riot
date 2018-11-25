require('dotenv').config()
export const PORT = Number(process.env.PORT) || 8091
export const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN
export const DB_HOST = process.env.DB_HOST
export const DB_USER = process.env.DB_USER
export const DB_PASS = process.env.DB_PASS
export const DB_NAME = process.env.DB_NAME
export const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY
export const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY
