import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from '../../shared/footer/footer.component';
import { SoftwareServiceSettingsIconsComponent } from '../../shared/software-service-canvas/software-service.component';

@Component({
  selector: 'app-software-service',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    SoftwareServiceSettingsIconsComponent,
    FooterComponent,
  ],
  templateUrl: './software-service.component.html',
  styleUrls: ['./software-service.component.css'],
})
export class SoftwareServiceComponent {}
