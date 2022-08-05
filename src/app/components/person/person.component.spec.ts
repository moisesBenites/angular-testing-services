import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Person } from 'src/app/models/person.model';

import { PersonComponent } from './person.component';

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    component.person = new Person('Maria', 'Paz', 21, 90, 1.9);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should the name "Maria"', () => {
    expect(component.person.name).toEqual('Maria');
  });

  it('should have <h3> with "Hola, { person.name }"', () => {
    // Assert
    component.person = new Person('Pedro', 'Paz', 21, 80, 1.7);
    const expectMessage = `Hola, ${component.person.name}`;
    const personDebug = fixture.debugElement;
    const h3Debug: DebugElement = personDebug.query(By.css('h3'));
    const h3Element = h3Debug.nativeElement;
    // Act
    fixture.detectChanges();
    // Assert
    expect(h3Element?.textContent).toEqual(expectMessage);
  });

  it('should have <p> with "Mi altura es { person.height }"', () => {
    // Arrange
    component.person = new Person('Pedro', 'Paz', 21, 80, 1.7);
    const expectMessage = `Mi altura es ${component.person.height}`;
    const personDebug = fixture.debugElement;
    const pDebug: DebugElement = personDebug.query(By.css('p'));
    const pElement = pDebug.nativeElement;
    // Act
    fixture.detectChanges();
    // Assert
    expect(pElement?.textContent).toEqual(expectMessage);
  });

  it('should display a text with IMC when do called calcIMC', () => {
    // Arrange
    const expectedMessage = 'down';
    component.person = new Person('Pedro', 'Paz', 54, 80, 191);
    const button = fixture.debugElement.query(
      By.css('button.btn-imc')
    ).nativeElement;
    // Act
    component.calcIMC();
    fixture.detectChanges();
    // Assert
    expect(button.textContent).toContain(expectedMessage);
  });

  it('should display a text with IMC when do click', () => {
    // Arrange
    const expectedMessage = 'down';
    component.person = new Person('Pedro', 'Paz', 54, 80, 191);
    const debugButton = fixture.debugElement.query(By.css('button.btn-imc'));
    const buttonElement = debugButton.nativeElement;
    // Act
    debugButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    // Assert
    expect(buttonElement.textContent).toContain(expectedMessage);
  });

  it('should raise selected event when do click', () => {
    // Arrange
    const expectedPerson = new Person('Pedro', 'Paz', 54, 80, 191);
    component.person = expectedPerson;
    const debugButton = fixture.debugElement.query(By.css('button.btn-choose'));

    let selectedPerson: Person | undefined;
    component.onSelected.subscribe((response) => {
      selectedPerson = response;
    });
    // Act
    debugButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    // Assert
    expect(selectedPerson).toEqual(component.person);
  });
});

@Component({
  template: `<app-person [person]="person" (onSelected)="onSelected($event)">
  </app-person>`,
})
class HostComponent {
  person = new Person('Maria', 'Paz', 54, 80, 191);
  selectedPerson: Person | undefined;

  onSelected(person: Person) {
    this.selectedPerson = person;
  }
}

describe('PersonComponent from HostComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, PersonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    component.person = new Person('Maria', 'Paz', 21, 90, 1.9);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display person name', () => {
    // Arrange
    const expectedName = component.person.name;
    const h3Debug = fixture.debugElement.query(By.css('app-person h3'));
    const h3Element = h3Debug.nativeElement;
    // Act
    fixture.detectChanges();
    // Assert
    expect(h3Element.textContent).toContain(expectedName);
  });

  it('should raise selected event when clicked', () => {
    // Arrange
    const buttonDebug = fixture.debugElement.query(
      By.css('app-person .btn-choose')
    );
    // Act
    buttonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    // Assert
    expect(component.selectedPerson).toEqual(component.person);
  });
});
