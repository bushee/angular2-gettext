export abstract class TranslationsCache {}

export type SingleTranslationsCache = Array<{
    language: string;
    strings: Record<string, string>;
}>;
