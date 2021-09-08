import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateComponent } from './components/translate/translate.component';
import { TranslatePipe } from './pipes/translate.pipe';
import { GettextService } from './services/gettext.service';
import { TranslationsCache } from './translations-cache';

@NgModule({
    declarations: [TranslateComponent, TranslatePipe],
    exports: [TranslateComponent, TranslatePipe],
    providers: [GettextService, TranslatePipe]
})
export class GettextModule {
    public static withTranslationsCache(translationsCache: TranslationsCache): ModuleWithProviders {
        return {
            ngModule: GettextModule,
            providers: [
                {
                    provide: TranslationsCache,
                    useValue: translationsCache
                }
            ]
        };
    }
}
