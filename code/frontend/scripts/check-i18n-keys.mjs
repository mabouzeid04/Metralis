import fs from 'node:fs'
import path from 'node:path'

const namespaces = [
  'common',
  'nav',
  'auth',
  'dashboard',
  'settings',
  'parts',
  'machines',
  'workOrders',
  'documents',
  'users',
  'ai',
  'notFound',
]

const baseDir = path.join(process.cwd(), 'public', 'locales')
const locales = ['en', 'ar']

const flattenKeys = (obj, prefix = '') => {
  return Object.entries(obj).flatMap(([key, value]) => {
    const nextKey = prefix ? `${prefix}.${key}` : key
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      return flattenKeys(value, nextKey)
    }
    return nextKey
  })
}

const compare = (ns) => {
  const localeData = locales.map((lng) => {
    const filePath = path.join(baseDir, lng, `${ns}.json`)
    const raw = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(raw)
  })

  const [enData, arData] = localeData
  const enKeys = new Set(flattenKeys(enData))
  const arKeys = new Set(flattenKeys(arData))

  const missingInAr = [...enKeys].filter((key) => !arKeys.has(key))
  const missingInEn = [...arKeys].filter((key) => !enKeys.has(key))

  return { missingInAr, missingInEn }
}

let hasDiff = false
namespaces.forEach((ns) => {
  const { missingInAr, missingInEn } = compare(ns)
  if (missingInAr.length || missingInEn.length) {
    hasDiff = true
    console.log(`Namespace "${ns}" mismatch:`)
    if (missingInAr.length) {
      console.log(`  Missing in ar: ${missingInAr.join(', ')}`)
    }
    if (missingInEn.length) {
      console.log(`  Missing in en: ${missingInEn.join(', ')}`)
    }
  }
})

if (hasDiff) {
  process.exitCode = 1
} else {
  console.log('Locale keys are aligned between en and ar.')
}
