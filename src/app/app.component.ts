import { Component, OnInit } from '@angular/core';
import { Calculator } from './calculator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'testing-services';

  ngOnInit() {
    const calculator = new Calculator();
    const response = calculator.multiply(3, 5);
    const response2 = calculator.divide(3, 0);
    const response3 = calculator.divide(10, 2);

    console.log('response 1', response);
    console.log('response 2', response2);
    console.log('response 3', response3);
  }
}
