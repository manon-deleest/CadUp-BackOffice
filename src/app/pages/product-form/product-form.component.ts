import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Location } from '@angular/common';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  idProduct: string | null = null;
  product: Product | undefined;
  form: FormGroup | undefined;
  isSubmited: boolean = false;
  private storage: Storage = inject(Storage);

  constructor(
    private _activatedRouter: ActivatedRoute,
    private _productService: ProductService,
    private fb: FormBuilder,
    private _location: Location
  ) {}

  async ngOnInit(): Promise<void> {
    this._activatedRouter.params.subscribe((params) => {
      this.idProduct = params['idProduct'];
    });
    this.initForm();

    if (this.idProduct != null) {
      this.product = await this._productService.get_product_by_id(
        this.idProduct
      );
      if (this.form && this.product) {
        this.form.patchValue({
          id: this.product.id,
          name: this.product.name,
          description: this.product.description,
          price: this.product.price,
          barcode: this.product.barcode,
          image: this.product.image,
          nutriscore: this.product.nutriscore,
          unitPrice: this.product.unitPrice,
        });
      }
    }
  }

  initForm() {
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      barcode: ['', Validators.required],
      image: ['', Validators.required],
      nutriscore: [''],
      unitPrice: [''],
    });
  }

  onSend() {
    this.isSubmited = true;
    if (this.form?.valid) {
      console.log(this.form?.value);
      let product = this.product;
      if (product) {
        product.barcode = this.form?.value.barcode;
        product.price = this.form?.value.price;
        product.image = this.form?.value.image;
        product.description = this.form?.value.description;
        product.name = this.form?.value.name;
        product.nutriscore = this.form?.value.nutriscore;
        product.unitPrice = this.form?.value.unitPrice;
        this._productService.update_product(product);
      } else {
        let product = new Product(
          '',
          this.form?.value.name,
          this.form?.value.description,
          this.form?.value.price,
          this.form?.value.barcode,
          '',
          this.form?.value.nutriscore,
          this.form?.value.image,
          this.form?.value.unitPrice
        );
        this._productService.create_product(product);
      }
      this._location.back();

      this.isSubmited = false;
    }
  }

  deleteProduct() {
    if (this.idProduct) {
      this._productService.delete_product(this.idProduct);
    }
    this._location.back();
  }

  async onFileChange(event: any) {
    if (event.target.files.length > 0) {
      let files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        if (file) {
          const storageRef = ref(this.storage, `${new Date().getTime()}_${file.name}`);
          let uploadTask = uploadBytesResumable(storageRef, file);
          await uploadTask;
          this.form?.get('image')?.setValue(await getDownloadURL(uploadTask.snapshot.ref));
          this.form!.value.image = await getDownloadURL(uploadTask.snapshot.ref);
        }
      }
    }
  }

  deleteImg() {
    this.form?.get('image')?.setValue('');
  }
}
