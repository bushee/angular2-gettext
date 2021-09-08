import { Component, Input } from '@angular/core';
import { GettextService } from '../../services/gettext.service';

@Component({
    selector: 'gettext-translate',
    template: '<div [outerHTML]="translatedText"></div>'
})
export class TranslateComponent {
    @Input() public key: string;
    @Input() public interpolations?: Record<string, unknown>;

    public constructor(private gettextService: GettextService) {}

    public get translatedText(): string {
        return this.gettextService.getString(this.key, this.interpolations);
    }
}
