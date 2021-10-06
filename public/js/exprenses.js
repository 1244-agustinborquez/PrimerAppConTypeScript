"use strict";
// solo la usaremos para darle respuesta a mi index.ts
class Expenses {
    constructor(currency) {
        this.count = 0;
        this.expenses = new ArrayList();
        this.finalCurrency = currency;
    }
    add(item) {
        item.id = this.count;
        this.count++;
        this.expenses.add(item);
        return true;
    }
    get(index) {
        return this.expenses.get(index);
    }
    getItems() {
        return this.expenses.getAll();
    }
    getTotal() {
        const total = this.expenses.getAll().reduce((acc, item) => {
            return acc += this.convertCurrency(item, this.finalCurrency);
        }, 0);
        return `${this.finalCurrency} $${total.toFixed(2).toString()}`;
    }
    remove(id) {
        const items = this.getItems().filter(item => {
            return item.id != id;
        });
        this.expenses.createFrom(items);
        return true;
    }
    convertCurrency(item, currency) {
        switch (item.cost.currency) {
            case 'USD':
                switch (currency) {
                    case 'ARG':
                        return item.cost.number * 98;
                        break;
                    default:
                        return item.cost.number;
                }
                break;
            case 'ARG':
                switch (currency) {
                    case 'USD':
                        return item.cost.number / 98;
                        break;
                    default:
                        return item.cost.number;
                }
                break;
            default:
                return 0;
        }
    }
}
// es un generico y espera un valor cuadno declaremos esta clase
class ArrayList {
    constructor() {
        this.items = [];
    }
    add(item) {
        this.items.push(item); // si ponemos 4 salta error por que nos dice q no tendriamos q poner otro tipo que pueda no ser ese esperado
    }
    get(index) {
        const item = this.items.filter((x, i) => {
            return i === index;
        });
        if (item.length === 0) {
            return null;
        }
        else {
            return item[0];
        }
    }
    createFrom(value) {
        this.items = [...value]; // para que nos permita crear un areglo vasado en otro.
    }
    getAll() {
        return this.items;
    }
}
