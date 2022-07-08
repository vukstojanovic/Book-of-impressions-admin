import i18next from 'i18next'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

import contentSerbian from '../../locales/sr/translations.json'
import contentEnglish from '../../locales/en/translations.json'

i18next
  .use(Backend)
  .use(initReactI18next)
  .init({
    interpolation: { escapeValue: false }, // React already does escaping
    lng: 'en', // language to use,
    fallbackLng: 'sr',
    // debug: true,
    resources: {
      en: contentEnglish,
      sr: contentSerbian,
    },
  })

export default i18next
