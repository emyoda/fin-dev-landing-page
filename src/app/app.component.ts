import { Component, OnInit, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RegisterIconService } from './pages/shared/services/register-icons.service';
import { appIcons } from './app-icons';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationService } from './pages/shared/services/notification-service';
import { tap } from 'rxjs';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

interface Tab {
  path: string;
  title: string;
  hidden?: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatMenuModule,
    RouterModule,
    CommonModule,
    MatListModule,
    MatIconModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger | undefined;
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isMenuOpen = signal(false);
  isSideNavOpen = false;
  showServiceTabs = false;
  tabs: Tab[] = [
    { path: 'home', title: 'Home' },
    { path: 'about', title: 'About us' },
    { path: 'services', title: 'Service', hidden: true },
    { path: 'contact', title: 'Contact us' },
  ];

  serviceTabs: Tab[] = [
    { path: 'consultancy-service', title: 'Consultancy service' },
    { path: 'software-service', title: 'Software service' },
    { path: 'cloud-service', title: 'Cloud service' },
    { path: 'ai-service', title: 'AI service' },
  ];
  constructor(
    private regIcon: RegisterIconService,
    private notification: NotificationService,
    private snackBar: MatSnackBar,
  ) {
    this.regIcon.registerIcons(appIcons);
  }
  ngOnInit(): void {
    this.showSuccessMessage();
    this.showErrorMessage();
  }

  showSuccessMessage() {
    this.notification.normalMessage$
      .pipe(
        tap((message) =>
          this.snackBar.open(message, '', {
            duration: 5000,
            panelClass: ['success-message'],
          }),
        ),
      )
      .subscribe();
  }

  showErrorMessage() {
    this.notification.errorMessage$
      .pipe(
        tap((message) =>
          this.snackBar.open(message, '', {
            duration: 5000,
            panelClass: ['error-message'],
          }),
        ),
      )
      .subscribe();
  }

  isOpened() {
    this.isMenuOpen.set(true);
  }

  isClosed() {
    this.isMenuOpen.set(false);
  }

  openMenu() {
    this.isMenuOpen.set(true);
    this.menuTrigger?.openMenu();
  }

  closeMenu() {
    this.isMenuOpen.set(false);
    this.menuTrigger?.closeMenu();
  }

  toggleMenu() {
    if (this.sidenav.opened) {
      this.sidenav.close();
      this.isSideNavOpen = false;
    } else {
      this.sidenav.open();
      this.isSideNavOpen = true;
    }
  }

  tabClicked() {
    this.sidenav.close();
    this.isSideNavOpen = false;
  }

  toggleServiceTabs() {
    this.showServiceTabs = !this.showServiceTabs;
  }
}
