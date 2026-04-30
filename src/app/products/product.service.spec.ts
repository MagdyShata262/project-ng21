import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
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

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch a single product from the API', async () => {
    const productPromise = firstValueFrom(service.getProductById(1));

    const req = httpMock.expectOne('https://dummyjson.com/products/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts[0]);

    const product = await productPromise;
    expect(product).toEqual(mockProducts[0]);
  });
});
