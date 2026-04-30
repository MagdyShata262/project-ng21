import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { describe, it, expect, beforeEach } from 'vitest';
import { ProductListComponent } from './product-list.component';
import { ProductService } from './product.service';
import { Product } from './product.model';

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Test Product',
    description: 'A sample product for tests.',
    price: 100,
    discountPercentage: 10,
    rating: 4.5,
    stock: 20,
    brand: 'TestBrand',
    category: 'test-category',
    thumbnail: 'https://example.com/image.png',
    images: ['https://example.com/image.png'],
  },
];

class MockProductService {
  getProducts() {
    return of(mockProducts);
  }
}

describe('ProductListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListComponent],
      providers: [{ provide: ProductService, useClass: MockProductService }],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ProductListComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render product title', () => {
    const fixture = TestBed.createComponent(ProductListComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Test Product');
  });
});
