import { NgModule } from '@angular/core';
import { TranslateComponent } from './components/translate/translate.component';
import { TranslatePipe } from './pipes/translate.pipe';
import { GettextService } from './services/gettext.service';

@NgModule({
    declarations: [TranslateComponent, TranslatePipe],
    exports: [TranslateComponent, TranslatePipe],
    providers: [GettextService, TranslatePipe]
})
export class GettextModule {}
