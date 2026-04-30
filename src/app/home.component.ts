import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThemeShowcaseComponent } from './theme-showcase.component';
import { ProductListComponent } from './products/product-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ThemeShowcaseComponent, ProductListComponent],
  template: `
    <app-theme-showcase></app-theme-showcase>
    <app-product-list></app-product-list>
  `,
})
export class HomeComponent {}
