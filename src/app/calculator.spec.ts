import { Calculator } from './calculator';

describe('Test for Calculator', () => {
  it('#multiply should return a 15', () => {
    // AAA

    //Arrange
    const calculator = new Calculator();
    //Act
    const response = calculator.multiply(3, 5);
    //Assert
    expect(response).toEqual(15);
  });

  it('#multiply should return a 30', () => {
    // AAA

    //Arrange
    const calculator = new Calculator();
    //Act
    const response = calculator.multiply(3, 10);
    //Assert
    expect(response).toEqual(30);
  });

  it('#divide should return a some numbers', () => {
    const calculator = new Calculator();

    const response = calculator.divide(10, 2);
    const response2 = calculator.divide(100, 10);

    expect(response).toEqual(5);
    expect(response2).toEqual(10);
  });

  it('#divide for zero', () => {
    const calculator = new Calculator();

    const response = calculator.divide(10, 0);

    expect(response).toBeNull();
  });

  it('test matchers', () => {
    const name = 'pedro';
    let name2;

    expect(name).toBeDefined();
    expect(name2).toBeUndefined();
  });
});
