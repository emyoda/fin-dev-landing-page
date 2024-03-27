import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from '../enum/language-enum';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [MatButtonToggleModule, CommonModule],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.css'
})
export class LanguageSelectorComponent {
  selectedLanguage: string | any; // Default language.

  LanguageEnum = LanguageEnum; // Expose enum to template

  constructor(private translate: TranslateService) {
  
  }

  ngOnInit() {
    this.languageHandler();
  }

  languageHandler() {
    if (typeof localStorage !== 'undefined') {
      const savedLanguage: string | null = localStorage.getItem('Language');
      if (savedLanguage) {
        this.translate.use(savedLanguage);
        this.selectedLanguage = savedLanguage
      } else {
        this.selectedLanguage = LanguageEnum.EN
      }
    }
  }

  changeLanguage(event: any) {
    this.selectedLanguage = event.value;
    this.translate.use(this.selectedLanguage);
    localStorage.setItem('Language', event.value); // Save selected language to local storage
  }

  isSelected(language: string): boolean {
    return this.selectedLanguage === language;
  }
}
