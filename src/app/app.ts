import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeShowcaseComponent } from './theme-showcase.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ThemeShowcaseComponent],
  template: `
    <app-theme-showcase></app-theme-showcase>
    <router-outlet></router-outlet>
  `,
  styleUrl: './app.scss',
})
export class App {}
