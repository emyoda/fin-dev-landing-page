import { Component } from '@angular/core';
import { FooterComponent } from '../shared/footer/footer.component';
import { MatrixRainComponent } from '../shared/matrix-canvas/matrix-canvas.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    FooterComponent,
    MatrixRainComponent,
    MatIconModule
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent { }
