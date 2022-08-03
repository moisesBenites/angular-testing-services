import { HttpStatusCode, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { TokenInterceptor } from '../interceptors/token.interceptor';
import {
  generateManyProducts,
  generateOneProduct,
} from '../models/product.mock';
import {
  CreateProductDTO,
  Product,
  UpdateProductDTO,
} from '../models/product.model';

import { ProductsService } from './products.service';
import { TokenService } from './token.service';

describe('ProductsService', () => {
  let productService: ProductsService;
  let httpController: HttpTestingController;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductsService,
        TokenService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true,
        },
      ],
    });
    productService = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });

  describe('Tests for getAllSimple', () => {
    it('should return a product list', (doneFn) => {
      // Arrange
      const mockData: Product[] = generateManyProducts(2);
      spyOn(tokenService, 'getToken').and.returnValue('123');
      // Act
      productService.getAllSimple().subscribe((response) => {
        // Assert
        expect(response.length).toEqual(mockData.length);
        expect(response).toEqual(mockData);
        doneFn();
      });

      // http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      const headers = req.request.headers;
      expect(headers.get('Authorization')).toEqual('Bearer 123');
      req.flush(mockData);
    });
  });

  describe('Tests for getAll', () => {
    it('should return a product list', (doneFn) => {
      // Arrange
      const mockData: Product[] = generateManyProducts(2);

      // Act
      productService.getAll().subscribe((response) => {
        // Assert
        expect(response.length).toEqual(mockData.length);
        // expect(response).toEqual(mockData);
        doneFn();
      });

      // http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
    });

    it('should return product list with taxes', (doneFn) => {
      // Arrange
      const mockData: Product[] = [
        {
          ...generateOneProduct(),
          price: 100, // 100 * .19 = 19
        },
        {
          ...generateOneProduct(),
          price: 200, // 200 * .19 = 38
        },
        {
          ...generateOneProduct(),
          price: 0, // probar con dato erroneo
        },
        {
          ...generateOneProduct(),
          price: -10, // probar con dato erroneo
        },
      ];

      // Act
      productService.getAll().subscribe((response) => {
        // Assert
        expect(response.length).toEqual(mockData.length);
        expect(response[0].taxes).toEqual(19);
        expect(response[1].taxes).toEqual(38);
        expect(response[2].taxes).toEqual(0);
        expect(response[3].taxes).toEqual(0);
        doneFn();
      });

      // http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
    });

    it('should send query params with limit 10 and offset 3', (doneFn) => {
      // Arrange
      const mockData: Product[] = [
        {
          ...generateOneProduct(),
          price: 100, // 100 * .19 = 19
        },
        {
          ...generateOneProduct(),
          price: 200, // 200 * .19 = 38
        },
        {
          ...generateOneProduct(),
          price: 0, // probar con dato erroneo
        },
        {
          ...generateOneProduct(),
          price: -10, // probar con dato erroneo
        },
      ];

      const limit = 10;
      const offset = 3;

      // Act
      productService.getAll(limit, offset).subscribe((response) => {
        // Assert
        expect(response.length).toEqual(mockData.length);
        expect(response[0].taxes).toEqual(19);
        expect(response[1].taxes).toEqual(38);
        expect(response[2].taxes).toEqual(0);
        expect(response[3].taxes).toEqual(0);
        doneFn();
      });

      // http config
      const url = `${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      const params = req.request.params;

      expect(params.get('limit')).toEqual(`${limit}`);
      expect(params.get('offset')).toEqual(`${offset}`);
    });
  });

  describe('Test for create', () => {
    it('should return a new product', (doneFn) => {
      // Arrange
      const mockData = generateOneProduct();
      const dto: CreateProductDTO = {
        title: 'new product',
        price: 10,
        images: ['', ''],
        description: 'esta es la descripción del producto',
        categoryId: 12,
      };
      // Act
      productService.create({ ...dto }).subscribe((response) => {
        // Assert
        expect(response).toEqual(mockData);
        doneFn();
      });

      // http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.body).toEqual(dto);
      expect(req.request.method).toEqual('POST');
    });
  });

  describe('Test for update', () => {
    it('should update product', (doneFn) => {
      // Arrange
      const mockData = generateOneProduct();
      const id = 'product-id';
      const dto: UpdateProductDTO = {
        title: 'new product',
        price: 10,
        images: ['', ''],
        description: 'esta es la descripción del producto',
        categoryId: 12,
      };
      // Act
      productService.update(id, { ...dto }).subscribe((response) => {
        // Assert
        expect(response).toEqual(mockData);
        doneFn();
      });

      // http config
      const url = `${environment.API_URL}/api/v1/products/${id}`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.body).toEqual(dto);
      expect(req.request.method).toEqual('PUT');
    });
  });

  describe('Test for delete', () => {
    it('should delete product', (doneFn) => {
      // Arrange
      const mockData = true;
      const id = '1';
      // Act
      productService.delete(id).subscribe((response) => {
        // Assert
        expect(response).toEqual(mockData);
        doneFn();
      });

      // http config
      const url = `${environment.API_URL}/api/v1/products/${id}`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.method).toEqual('DELETE');
    });
  });

  describe('Test for getOne', () => {
    it('should return a product', (doneFn) => {
      // Arrange
      const mockData = generateOneProduct();
      const productId = '1';
      // Act
      productService.getOne(productId).subscribe((response) => {
        // Assert
        expect(response).toEqual(mockData);
        doneFn();
      });

      // http config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.method).toEqual('GET');
    });

    it('should return the rigth message when status code is 404', (doneFn) => {
      // Arrange
      const productId = '1';
      const messageError = '404 message';
      const mockError = {
        status: HttpStatusCode.NotFound,
        statusText: messageError,
      };
      // Act
      productService.getOne(productId).subscribe({
        error: (error) => {
          // Assert
          expect(error).toEqual('El producto no existe');
          doneFn();
        },
      });

      // http config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(url);
      req.flush(messageError, mockError);
      expect(req.request.method).toEqual('GET');
    });
  });
});
