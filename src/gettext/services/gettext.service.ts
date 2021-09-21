import { Injectable } from '@angular/core';
import { TranslationsCache } from '../translations-cache';

@Injectable()
export class GettextService {
    private translations: Record<string, Record<string, string>> = {};
    private currentLanguage: string;
    private currentLanguageTranslations: Record<string, string> = {};

    private interpolationPrefix = '[[';
    private interpolationSuffix = ']]';

    private debugMode = false;
    private debugPrefix = '[MISSING] ';
    private debugSuffix = '';

    public setDebugMode(enable: boolean, prefix?: string, suffix?: string): void {
        this.debugMode = enable;
        if (prefix) {
            this.debugPrefix = prefix;
        }
        if (suffix) {
            this.debugSuffix = suffix;
        }
    }

    public setInterpolationMarkers(prefix: string, suffix: string): void {
        this.interpolationPrefix = prefix;
        this.interpolationSuffix = suffix;
    }

    public getString(key: string, interpolations?: Record<string, unknown>): string {
        let translatedString = this.currentLanguageTranslations[key];
        if (translatedString === undefined) {
            translatedString = key;
            if (this.debugMode) {
                translatedString = `${this.debugPrefix}${translatedString}${this.debugSuffix}`;
            }
        }

        if (interpolations) {
            return Object.keys(interpolations).reduce(
                (translation: string, replacement: string) =>
                    translation.replace(
                        `${this.interpolationPrefix}${replacement}${this.interpolationSuffix}`,
                        interpolations[replacement] as string
                    ),
                translatedString
            );
        }
        return translatedString;
    }

    public getCurrentLanguage(): string {
        return this.currentLanguage;
    }

    public setCurrentLanguage(language: string): void {
        this.currentLanguage = language;
        this.currentLanguageTranslations = this.translations[language] || {};
    }

    public setTranslations(translationsCache: TranslationsCache): void;
    public setTranslations(language: string, translations: Record<string, string>): void;
    public setTranslations(
        languageOrTranslationsCache: string | TranslationsCache,
        translations?: Record<string, string>
    ): void {
        if (typeof languageOrTranslationsCache === 'string') {
            this.translations[languageOrTranslationsCache] = {
                ...this.translations[languageOrTranslationsCache],
                ...translations
            };
            if (languageOrTranslationsCache === this.currentLanguage) {
                this.currentLanguageTranslations = this.translations[languageOrTranslationsCache] || {};
            }
        } else {
            languageOrTranslationsCache.forEach(({ language, strings }) => this.setTranslations(language, strings));
        }
    }
}
