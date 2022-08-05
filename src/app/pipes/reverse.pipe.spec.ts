import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ReversePipe } from './reverse.pipe';

fdescribe('ReversePipe', () => {
  it('create an instance', () => {
    const pipe = new ReversePipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform "Guatemala" to "alametauG"', () => {
    const pipe = new ReversePipe();
    const response = pipe.transform('Guatemala');
    expect(response).toEqual('alametauG');
  });

  it('should transform "123" to "321"', () => {
    const pipe = new ReversePipe();
    const response = pipe.transform('123');
    expect(response).toEqual('321');
  });
});

@Component({
  template: `
    <h5>{{ 'roma' | reverse }}</h5>
    <input [(ngModel)]="textReverse" />
    <p>{{ textReverse | reverse }}</p>
  `,
})
class HostComponent {
  textReverse = 'blue';
}

fdescribe('ReversePipe from HostComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, ReversePipe],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should the h5 be "amor"', () => {
    const h5Debug = fixture.debugElement.query(By.css('h5'));
    const h5Element = h5Debug.nativeElement;

    expect(h5Element.textContent).toEqual('amor');
  });

  it('should apply reverse pipe when typing in the input', () => {
    const inputDebug = fixture.debugElement.query(By.css('input'));
    const pDebug = fixture.debugElement.query(By.css('p'));
    const inputElement: HTMLInputElement = inputDebug.nativeElement;
    const pElement = pDebug.nativeElement;

    expect(pElement.textContent).toEqual('eulb');

    inputElement.value = 'Jonto';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(pElement.textContent).toEqual('otnoJ');
  });
});
