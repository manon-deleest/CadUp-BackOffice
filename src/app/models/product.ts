export class Product {
    id:string; 
    name:string;
    description:string;
    price:number;
    barcode: string;
    idDepartment: string;
    image: string = '';
    nutriscore: string = '';
    unitPrice: string = '';


    constructor(id:string, name:string, description:string, price:number, barcode:string, idDepartment:string, nutriscore:string = '', image:string = '', unitPrice:string = ''){
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.barcode = barcode;
        this.idDepartment = idDepartment;
        this.image = image;
        this.nutriscore = nutriscore;
        this.unitPrice = unitPrice;
    }

    static fromFirebase(doc:any){
        let data = doc.data();
        return new Product(doc.id, data.name, data.description, data.price, data.barcode, data.idDepartment, data.nutriscore, data.image, data.unitPrice);
    }

    static transformToMap(product : Product){
        return {
            name : product.name,
            description : product.description,
            price : product.price,
            barcode : product.barcode,
            idDepartment : product.idDepartment,
            image : product.image,
            nutriscore : product.nutriscore,
            unitPrice : product.unitPrice,
        }
    }
}
