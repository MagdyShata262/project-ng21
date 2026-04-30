import { Routes } from '@angular/router';
import { ProductDetailComponent } from './products/product-detail.component';
import { HomeComponent } from './home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent,
  },
];
