'use strict';

// supported operators for calculator
const operators = ['*', '/'];

class Calculator {
    constructor(numbers = []) {
        const validNumbers = this.checkValidation(numbers);
        this._numbers = validNumbers;
    }

    checkValidation(numbers = []) {
        if (typeof numbers == 'string') {
            numbers = this.convertStringToArray(numbers);
        }
        let validNumbers = [];
        for (let i = 0; i < numbers.length; i++) {
            const number = numbers[i];
            if (i % 2 === 0) {  // should be number
                if (this.isValidNumber(number)) {
                    validNumbers.push(Number(number));
                } else {
                    break;
                }        
            } else {    // should be operator
                if (this.isValidOperator(number)) {
                    validNumbers.push(number);
                } else {
                    break;
                }
            }
        }
        return validNumbers;
    }

    convertStringToArray(str) {
        let temp = [];
        let number = '';
        for (let i = 0; i < str.length; i++) {
            const char = str.charAt(i);
            if (this.isValidOperator(char)) {
                temp.push(number);
                number = '';
                temp.push(char);
            } else {
                if (this.isValidNumber(char)) {
                    number += char;
                }
            }
        }
        if (number) {
            temp.push(number);
        }
        return temp;
    }

    isValidOperator(number) {
        if (operators.includes(number)) {
            return true;
        }
        return false;
    }

    isValidNumber(number) {
        const result = Number(number);
        if (isNaN(result)) {
            return false;
        }
        return true;
    }

    getNumber(index) {
        return this._numbers[index];
    }

    setNumber(number) {
        this._numbers.push(number);
    }

    get numbers() {
        return this._numbers;
    }

    set numbers(numbers = []) {
        const validNumbers = this.checkValidation(numbers);
        this._numbers = validNumbers;
    }

    async calc() {
        let result = null;
        try {
            result = await this.calcPromise();
        } catch (err) {
            result = err;
        }
        return result;
    }

    calcPromise() {
        return new Promise((resolve, reject) => {
            const temp = Array.from(this._numbers);
            let result = temp.shift();  // assuming the first element will be number
            if (result == undefined) {
                resolve(0);
            }
            let operator = null;    // use as a flag to make the calc more valid
            for (const number of temp) {
                if (this.isValidNumber(number)) {
                    if (operator) {
                        if (operator == "/" && number === 0) {
                            reject("Cannot divide by zero");
                            break;
                        } else {
                            result = eval(`${result} ${operator} ${number}`);
                            operator = null;
                        }
                    }
                } else if (this.isValidOperator(number)) {
                    if (!operator) {
                        operator = number;
                    }
                }
            }
            resolve(result);
        });
    }
}

module.exports = {
    Calculator
};