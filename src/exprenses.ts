type Currency = 'ARG' | 'USD'; // especifico que el tipo currency es un string o otro

interface Price{
    number: number, //como tal del precio
    currency: Currency // el tipo de moneda
}


interface ExpenseItem{ //este tipó de dato espera 3 propiedades o 3 variables
    id?: number,
    title: string,
    cost: Price
}

// // arraylist es muy comun en otros lenguajes como c# o java
// // del cual este nos permite que podamos crear na list de elementos de sierto tipo
// //y con los signos le decimos q este obj generico es de este tipo

interface IExpenses{
    expenses: ArrayList<ExpenseItem>,
    finalCurrency:Currency,
    add(item:ExpenseItem):boolean,
    get(index:number):ExpenseItem|null,
    getTotal():string,
    remove(id:number):boolean
    //es una clase generica que espera un tipo de dato generico
 // asi se usa los genericos para poder trabajar con cualquier tipo de dato
}


// solo la usaremos para darle respuesta a mi index.ts

class Expenses implements IExpenses{

    expenses: ArrayList<ExpenseItem>;
    finalCurrency:Currency;
    private count:number = 0;

    constructor(currency:Currency){
        this.expenses = new ArrayList<ExpenseItem>();
        this.finalCurrency = currency;
    }

    
    add(item:ExpenseItem):boolean{
        item.id = this.count;
        this.count++;
        this.expenses.add(item);
        return true;
    }

    get(index:number):ExpenseItem|null{
        return this.expenses.get(index);
    }

    getItems():ExpenseItem[]{
        return this.expenses.getAll();
    }

    getTotal():string{
        const total:number = this.expenses.getAll().reduce( (acc:number, item:ExpenseItem) =>{
            return acc += this.convertCurrency(item, this.finalCurrency);
        }, 0);

        return `${this.finalCurrency} $${total.toFixed(2).toString()}`;
    }

    remove(id:number):boolean{
        const items:ExpenseItem[] = this.getItems().filter(item =>{
            return item.id != id
        });

        this.expenses.createFrom(items);
        return true;
    }

    private convertCurrency(item:ExpenseItem, currency:Currency):number{
        switch(item.cost.currency){
            case 'USD':
                switch(currency){
                    case 'ARG':
                    return item.cost.number * 98;
                    break;

                    default:
                    return item.cost.number;
                }
            break;

            case 'ARG':
                switch(currency){
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
class ArrayList<T>{

    private items:T[] = [];

    add(item:T){
        this.items.push(item);// si ponemos 4 salta error por que nos dice q no tendriamos q poner otro tipo que pueda no ser ese esperado
    }

    get(index:number):T|null{
        const item:T[] = this.items.filter( (x:T, i) =>{
            return i === index;
        });

        if(item.length === 0){
            return null;
        }else{
            return item[0];
        }
    }

    createFrom(value:T[]):void{
        this.items = [...value]; // para que nos permita crear un areglo vasado en otro.
    }

    getAll():T[]{
        return this.items;
    }

}