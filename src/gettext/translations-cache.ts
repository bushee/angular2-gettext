export abstract class TranslationsCache {
    public cache: Array<{
        language: string;
        strings: Record<string, string>;
    }>;
}
