
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  constructor(private translate: TranslateService) {}

  T(key: string): string {
    return this.translate.instant(key);
  }
}
