# ng-gettext

This library utilizes gettext mechanism in angular.

It is strongly inspired by [`angular-gettext`](https://www.npmjs.com/package/angular-gettext) angularjs implementation and utilises .po file parser created by its author, [Ruben Vermeersch](https://www.npmjs.com/~rubenv).

## Limitations
For now, pluralization and contexts are not implemented.

## Usage

### Module
You may simply import `GettextModule` into your angular application.

If you wish to initialize translations cache before any unit uses it, provide `TranslationsCache` **multi** value in your dependency injection container:

```typescript
import { GettextModule, TranslationsCache } from 'ng-gettext';
import translationsCache from './translations-cache';

@NgModule({
    imports: [GettextModule],
    providers: [
        { provide: TranslationsCache, useValue: translationsCache, multi: true }
    ]
})
export class MyModule {}
```
                               `
#### Preparing translations cache
Use `node_modules/.bin/gettext-build-translations` script to compile cache from your `.po` files.

Arguments:
- `--input directory` - path (cwd-relative or absolute) to directory containing `.po` files. May be passed multiple times.
- `--output file` - path to file to be generated. This will be a `.ts` file containing a default export of type `SingleTranslationsCache` (single entry of multi `TranslationsCache` provider).

### Component
`<gettext-translate>` component is provided. It has following arguments:
- `key` - translation key
- `interpolations` - _(optional)_ key-value map of values to replace interpolated parts of translation with; by default, `[[variable]]` marks a part of translation to be interpolated by `interpolations.variable` value

#### Example
```html
<!-- no interpolation -->
<gettext-translate key="You've got a message"></gettext-translate> <!-- simply translates "You've got a message" -->
<gettext-translate [key]="'Message text ' + id"></gettext-translate> <!-- takes resolved string, e.g. "Message text 1" as translation key -->

<!-- interpolation -->
<gettext-translate key="You've got [[number]] messages" [interpolations]="{number: 3}"></gettext-translate> <!-- interpolates "3" into translated "You've got [[number]] messages" text -->
```

### Pipe
`gettextTranslate` pipe is provided. It uses input string as translation key. It has the same optional arguments as component.

#### Example
```html
{{ 'You\'ve got a message' | gettextTranslate }} <!-- simply translates "You've got a message" -->
{{ 'You've got [[number]] messages' | gettextTranslate:{number: 3} }} <!-- interpolates "3" into translated "You've got [[number]] messages" text -->
```

### Service
`GettextService` service is provided. It includes some all translation as well as configuration routines:

- `setDebugMode(enable: boolean, prefix?: string, suffix?: string): void`

    Allows to enable/disable debug mode in which missing translation keys are surrounded by prefix and suffix. Default prefix is `[MISSING] `; default suffix is empty.

    This is helpful to notice missing translations while running application in development mode - especially when enabled during its bootstrap phase.

- `setInterpolationMarkers(prefix: string, suffix: string): void`

    Allows to change default `[[`/`]]` interpolation markers for your convenience.

- `getString(key: string, interpolations?: Record<string, any>): string`

    Allows to translate passed key in non-template scope. Optional interpolations key-value map may be passed - see component documentation for more details.

- `getCurrentLanguage(): string`

    Returns current language setting.

- `setCurrentLanguage(language: string): void`

    Changes current language setting.

- `setTranslations(language: string, translations: Record<string, string>): void`

    Adds translations to given language. `translations` is key-translation map.

    Any translations passed are **appended** to current translations cache, so there's no problem to run this method multiple times to feed from different sources. If key collision occurs, the newest value is used.

## Requirements
- angular ^8.0.0
