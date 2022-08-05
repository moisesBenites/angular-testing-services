import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { generateManyProducts } from 'src/app/models/product.mock';
import { ProductsService } from 'src/app/services/products.service';
import { ProductComponent } from '../product/product.component';
import { of, defer } from 'rxjs';

import { ProductsComponent } from './products.component';
import { ValueService } from 'src/app/services/value.service';
import { By } from '@angular/platform-browser';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: jasmine.SpyObj<ProductsService>;
  let valueService: jasmine.SpyObj<ValueService>;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', [
      'getAll',
    ]);
    const valueServiceSpy = jasmine.createSpyObj('ValueService', [
      'getPromiseValue',
    ]);

    await TestBed.configureTestingModule({
      declarations: [ProductsComponent, ProductComponent],
      providers: [
        { provide: ProductsService, useValue: productServiceSpy },
        { provide: ValueService, useValue: valueServiceSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(
      ProductsService
    ) as jasmine.SpyObj<ProductsService>;
    valueService = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
    const productMock = generateManyProducts(4);
    productService.getAll.and.returnValue(of(productMock));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(productService.getAll).toHaveBeenCalled();
  });

  describe('Tets for getAlProducts', () => {
    it('should return product list from service', () => {
      // Arrange
      const productsMock = generateManyProducts(10);
      productService.getAll.and.returnValue(of(productsMock));
      const productsCount = component.products.length;
      // Act
      component.getAllProducts();
      fixture.detectChanges();
      // Assert
      expect(component.products.length).toEqual(
        productsMock.length + productsCount
      );
    });

    it('should change the status "loading" => "success"', fakeAsync(() => {
      // Arrange
      const productsMock = generateManyProducts(10);
      productService.getAll.and.returnValue(
        defer(() => Promise.resolve(productsMock))
      );
      // Act
      component.getAllProducts();
      fixture.detectChanges();
      const prevStatus = component.status;

      tick();
      // Assert
      expect(prevStatus).toEqual('loading');
      expect(component.status).toEqual('success');
    }));

    it('should change the status "loading" => "error"', fakeAsync(() => {
      // Arrange
      productService.getAll.and.returnValue(
        defer(() => Promise.reject('error'))
      );
      // Act
      component.getAllProducts();
      fixture.detectChanges();
      const prevStatus = component.status;

      tick(4000);
      // Assert
      expect(prevStatus).toEqual('loading');
      expect(component.status).toEqual('error');
    }));
  });

  describe('Test for callPromise', () => {
    it('should call to promise', async () => {
      // Arrange
      const mockMessage = 'my mock';
      valueService.getPromiseValue.and.returnValue(
        Promise.resolve(mockMessage)
      );
      // Act
      await component.callPromise();
      fixture.detectChanges();
      // Assert
      expect(component.promiseReponse).toEqual(mockMessage);
      expect(valueService.getPromiseValue).toHaveBeenCalled();
    });

    it('should show "my mock" in <p> when button is clicked', fakeAsync(() => {
      // Arrange
      const mockMessage = 'my mock';
      valueService.getPromiseValue.and.returnValue(
        Promise.resolve(mockMessage)
      );
      const buttonDebug = fixture.debugElement.query(
        By.css('button.btn-promise')
      );
      // Act
      buttonDebug.triggerEventHandler('click', null);
      tick();
      fixture.detectChanges();
      const pDebug = fixture.debugElement.query(By.css('p.promise-message'));
      // Assert
      expect(component.promiseReponse).toEqual(mockMessage);
      expect(valueService.getPromiseValue).toHaveBeenCalled();
      expect(pDebug.nativeElement.textContent).toEqual(mockMessage);
    }));
  });
});
