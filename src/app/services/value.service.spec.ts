import { TestBed } from '@angular/core/testing';
import { ValueService } from './value.service';

describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValueService],
    });
    service = TestBed.inject(ValueService);
  });

  describe('Tests for getValue', () => {
    it('should return "myValue"', () => {
      expect(service.getValue()).toBe('myValue');
    });
  });

  describe('Tests for setValue', () => {
    it('should change the value', () => {
      expect(service.getValue()).toBe('myValue');
      service.setValue('new value');
      expect(service.getValue()).toBe('new value');
    });
  });

  describe('Tests for getPromiseValue', () => {
    it('should return "promise value" from promise with then', (doneFn) => {
      service.getPromiseValue().then((value) => {
        expect(value).toBe('promise value');
        doneFn();
      });
    });

    it('should return "promise value" from promise using async', async () => {
      const response = await service.getPromiseValue();
      expect(response).toBe('promise value');
    });
  });

  describe('Tests for getObservableValue', () => {
    it('should return "observable value" from observable', () => {
      service.getObservableValue().subscribe((value) => {
        expect(value).toBe('observable value');
      });
    });
  });
});
