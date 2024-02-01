export class Product {
    id:string; 
    name:string;
    description:string;
    price:number;
    barcode: string;
    idDepartment: string;
    image: string = '';

    constructor(id:string, name:string, description:string, price:number, barcode:string, idDepartment:string, image:string = ''){
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.barcode = barcode;
        this.idDepartment = idDepartment;
        this.image = image;
    }

    static fromFirebase(doc:any){
        let data = doc.data();
        return new Product(doc.id, data.name, data.description, data.price, data.barcode, data.idDepartment, data.image);
    }

    static transformToMap(product : Product){
        return {
            name : product.name,
            description : product.description,
            price : product.price,
            barcode : product.barcode,
            idDepartment : product.idDepartment,
            image : product.image,
        }
    }
}
