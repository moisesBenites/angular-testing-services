import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { HighligthDirective } from './highligth.directive';

@Component({
  template: `
    <h5 class="title" highligth>Hay un valor</h5>
    <h5 highligth="yellow">yellow</h5>
    <p highligth="blue">parrafo</p>
    <p>otro parrafo</p>
    <input [(ngModel)]="color" [highligth]="color" />
  `,
})
class HostComponent {
  color = 'blue';
}

describe('HighligthDirective', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, HighligthDirective],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should have three highligth element', () => {
    // Arrange
    const elements = fixture.debugElement.queryAll(
      By.directive(HighligthDirective)
    );
    const elementsWhitOut = fixture.debugElement.queryAll(
      By.css('*:not([highligth])')
    );
    // Assert
    expect(elements.length).toEqual(4);
    expect(elementsWhitOut.length).toEqual(2);
  });

  it('should the elements be match with background dolor', () => {
    const elements = fixture.debugElement.queryAll(
      By.directive(HighligthDirective)
    );

    expect(elements[0].nativeElement.style.backgroundColor).toEqual('gray');
    expect(elements[1].nativeElement.style.backgroundColor).toEqual('yellow');
    expect(elements[2].nativeElement.style.backgroundColor).toEqual('blue');
  });

  it('should the the h5.title be default color', () => {
    const titleDebug = fixture.debugElement.query(By.css('.title'));
    const dir = titleDebug.injector.get(HighligthDirective);

    expect(titleDebug.nativeElement.style.backgroundColor).toEqual(
      dir.defaultColor
    );
  });

  it('should bind the <input> and change the backgroud color', () => {
    const inputDebug = fixture.debugElement.query(By.css('input'));
    const inputElement: HTMLInputElement = inputDebug.nativeElement;

    expect(inputElement.style.backgroundColor).toEqual('blue');

    inputElement.value = 'red';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(inputElement.style.backgroundColor).toEqual('red');
    expect(component.color).toEqual('red');
  });
});
