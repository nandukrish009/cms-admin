import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authService: AuthService
  ) {
    this.isAuthenticated = false;
  }

  public ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((success: boolean) => {
      this.isAuthenticated = success;
    });
  }

  public signOut(): void {
    this.authService.logout({
      logoutParams: {
        returnTo: this.document.location.origin,
      },
    });
  }
}
