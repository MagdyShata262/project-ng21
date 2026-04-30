import {
  Component,
  ChangeDetectionStrategy,
  inject,
  input,
  resource,
  computed,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { switchMap } from 'rxjs';
import { ProductService } from './product.service';
import { Product } from './product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent {
  private readonly productService = inject(ProductService);

  // Signal input for the product ID from the route parameter
  // withComponentInputBinding() automatically binds route params to component inputs
  readonly id = input.required<string>();

  // Use resource to handle loading and error states reactively
  // The resource will reload whenever the id changes due to signal reactivity
  readonly product = resource({
    loader: async () => {
      const id = +this.id(); // Convert string to number
      return this.productService.fetchProductById(id);
    },
  });
}
