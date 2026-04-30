import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { describe, it, expect, beforeEach } from 'vitest';
import { ProductDetailComponent } from './product-detail.component';
import { ProductService } from './product.service';
import { Product } from './product.model';

const mockProduct: Product = {
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
};

class MockProductService {
  getProduct(id: number) {
    return of(mockProduct);
  }

  async fetchProductById(id: number): Promise<Product> {
    return mockProduct;
  }
}

describe('ProductDetailComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailComponent],
      providers: [{ provide: ProductService, useClass: MockProductService }],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ProductDetailComponent);
    fixture.componentRef.setInput('id', '1'); // Set the required input
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render product title', async () => {
    const fixture = TestBed.createComponent(ProductDetailComponent);
    fixture.componentRef.setInput('id', '1');
    fixture.detectChanges();
    await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for promises
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Test Product');
  });
});
