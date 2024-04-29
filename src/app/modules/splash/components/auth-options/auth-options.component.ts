import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { jamGithub, jamGoogle } from '@ng-icons/jam-icons';

@Component({
  selector: 'app-auth-options',
  standalone: true,
  imports: [MatButtonModule, NgIconComponent, RouterLink, RouterLinkActive],
  templateUrl: './auth-options.component.html',
  styleUrl: './auth-options.component.css',
  viewProviders: [provideIcons({ jamGithub, jamGoogle })],
})
export class AuthOptionsComponent {}
