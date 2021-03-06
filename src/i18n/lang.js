import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './en/all'
import de from './de/all'
import loader from '@/support/loader'

Vue.use(VueI18n)

const i18n = {
  locale: 'en', // set locale
  messages: {
    en: en,
    de: de
  },
  fallbackLocale: 'en'
}

// load and get all EN messages from components *i18n.en.js default export using custom loader
const enComponentMessages = loader.load(require.context('@/pages/', true, /\.i18n\.en\.js$/), true)
addComponentKeys('en', enComponentMessages)

// load and get all EN messages from core *i18n.en.js default export using custom loader
const enCoreMessages = loader.load(require.context('@/crud/', true, /\.i18n\.en\.js$/), true)
addComponentKeys('en', enCoreMessages)

// load and get all EN messages from shared parts *i18n.en.js default export using custom loader
const enSharedPartsMessages = loader.load(require.context('@/fragments/', true, /\.i18n\.en\.js$/), true)
addComponentKeys('en', enSharedPartsMessages)

// load and get all DE messages from components *i18n.de.js default export using custom loader
const deComponentMessages = loader.load(require.context('@/pages/', true, /\.i18n\.de\.js$/), true)
addComponentKeys('de', deComponentMessages)

// load and get all EN messages from core *i18n.en.js default export using custom loader
const deCoreMessages = loader.load(require.context('@/crud/', true, /\.i18n\.de\.js$/), true)
addComponentKeys('en', deCoreMessages)

// load and get all EN messages from shared parts *i18n.en.js default export using custom loader
const deSharedPartsMessages = loader.load(require.context('@/fragments/', true, /\.i18n\.de\.js$/), true)
addComponentKeys('en', deSharedPartsMessages)

export default new VueI18n(i18n)

function addComponentKeys (languageKey, i18nObject) {
  for (const messages in i18nObject) {
    const translations = i18nObject[messages]
    for (const key in translations) {
      // skip loop if the property is from prototype
      if (!Object.prototype.hasOwnProperty.call(translations, key)) continue
      i18n.messages[languageKey][key] = translations[key]
    }
  }
}
