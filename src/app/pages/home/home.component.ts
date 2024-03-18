import { Component, HostBinding } from '@angular/core';
import { FooterComponent } from '../shared/footer/footer.component';
import { MatrixRainComponent } from '../shared/matrix-canvas/matrix-canvas.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FooterComponent,
    MatrixRainComponent,
    RouterModule,
    MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  @HostBinding('attr.ngSkipHydration') shouldSkipHydration = true;
}
