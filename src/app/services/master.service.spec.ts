import { TestBed } from '@angular/core/testing';
import { MasterService } from './master.service';
import { ValueService } from './value.service';

describe('MasterService', () => {
  let masterService: MasterService;
  let spyValueService: jasmine.SpyObj<ValueService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ValueService', ['getValue']);

    TestBed.configureTestingModule({
      providers: [MasterService, { provide: ValueService, useValue: spy }],
    });

    masterService = TestBed.inject(MasterService);
    spyValueService = TestBed.inject(
      ValueService
    ) as jasmine.SpyObj<ValueService>;
  });

  it('should be created', () => {
    expect(masterService).toBeTruthy();
  });

  // it('should return "myValue" from the real service', () => {
  //   const valueService = new ValueService();
  //   let masterService = new MasterService(valueService);
  //   expect(masterService.getValue()).toBe('myValue');
  // });

  // it('should return "other value" from the fake service', () => {
  //   const fakeValueService = new FakeValueService();
  //   let masterService = new MasterService(
  //     fakeValueService as unknown as ValueService
  //   );
  //   expect(masterService.getValue()).toBe('fake value');
  // });

  // it('should return "other value" from the fake object', () => {
  //   const fake = { getValue: () => 'fake from object' };
  //   let masterService = new MasterService(fake as unknown as ValueService);
  //   expect(masterService.getValue()).toBe('fake from object');
  // });

  it('should call to getValue from MasterService', () => {
    spyValueService.getValue.and.returnValue('fake value');

    expect(masterService.getValue()).toBe('fake value');
    expect(spyValueService.getValue).toHaveBeenCalled();
    expect(spyValueService.getValue).toHaveBeenCalledTimes(1);
  });
});
