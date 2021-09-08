import { Pipe, PipeTransform } from '@angular/core';
import { GettextService } from '../services/gettext.service';

@Pipe({
    name: 'gettextTranslate'
})
export class TranslatePipe implements PipeTransform {
    public constructor(private gettextService: GettextService) {}

    public transform(key: string, interpolations?: Record<string, unknown>): string {
        return this.gettextService.getString(key, interpolations);
    }
}
