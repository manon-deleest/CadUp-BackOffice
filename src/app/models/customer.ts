export class Customer {
    id: string;
    firstName: string;
    name: string; 
    numBarCode: string;

    constructor(id:string, firstName: string, name: string, numBarCode: string) {
        this.id = id;
        this.firstName = firstName;
        this.name = name;
        this.numBarCode = numBarCode;
    }

    static fromFirebase(doc:any): Customer {
        let data = doc.data();
        return new Customer(doc.id, data.firstName, data.name, data.numBarCode);
    }

    static transformToMap(customer : Customer){

        return {
            id: customer.id, 
            firstName: customer.firstName,
            name: customer.name,
            numBarCode: customer.numBarCode
          }
    }

    

}