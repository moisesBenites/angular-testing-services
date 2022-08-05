import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Person } from 'src/app/models/person.model';
import { PersonComponent } from '../person/person.component';

import { PeopleComponent } from './people.component';

describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;
  let personComponent: PersonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeopleComponent, PersonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list app-person component', () => {
    // Arrange
    component.people = [
      new Person('Maria', 'Garcia', 25, 56, 1.81),
      new Person('Pedro', 'Paz', 25, 85, 1.81),
      new Person('Karla', 'Paz', 25, 85, 1.81),
      new Person('Juanita', 'Paz', 25, 85, 1.81),
    ];
    // Act
    fixture.detectChanges();
    const debugElement = fixture.debugElement.queryAll(By.css('app-person'));
    // Assert
    expect(debugElement.length).toEqual(4);
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
    expect(component.selectedPerson).toEqual(component.people[0]);
  });

  it('should render the selected person', () => {
    // Arrange
    const buttonDebug = fixture.debugElement.query(
      By.css('app-person .btn-choose')
    );

    // Act
    buttonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    const liDebugElement = fixture.debugElement.query(
      By.css('.selected-person ul > li')
    );
    // Assert
    expect(component.selectedPerson).toEqual(component.people[0]);
    expect(liDebugElement.nativeElement.textContent).toEqual(
      `Name: ${component.selectedPerson?.name}`
    );
  });
});
