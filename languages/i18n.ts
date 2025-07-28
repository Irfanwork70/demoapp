import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ar from './locales/ar.json';
import en from './locales/en.json';
import ur from './locales/ur.json';

i18n
    .use(initReactI18next)
    .init({//@ts-ignore
        compatibilityJSON: 'v3',
        resources: {
            en: { translation: en },
            ar: { translation: ar },
            ur: { translation: ur },
        },
        lng: Localization.locale?.split('-')[0], // e.g., "en", "fr"
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
