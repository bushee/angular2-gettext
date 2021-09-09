export abstract class TranslationsCache extends Array<SingleTranslationsCache> {}

export type SingleTranslationsCache = Array<{
    language: string;
    strings: Record<string, string>;
}>;
