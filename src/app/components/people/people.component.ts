import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
})
export class PeopleComponent implements OnInit {
  // person: Person = new Person('Jiaver', 'Matute', 25, 56, 1.81);
  people: Person[] = [
    new Person('Maria', 'Garcia', 25, 56, 1.81),
    new Person('Pedro', 'Paz', 25, 85, 1.81),
  ];
  selectedPerson: Person | null = null;

  constructor() {}

  ngOnInit(): void {}

  choose(person: Person): void {
    this.selectedPerson = person;
  }
}
