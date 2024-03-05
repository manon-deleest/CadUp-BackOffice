import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Add } from 'src/app/models/add';
import { AddService } from 'src/app/services/add.service';
import { Location } from '@angular/common';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent implements OnInit {
  form: FormGroup | undefined;
  isSubmited: boolean = false;
  private storage: Storage = inject(Storage);

  constructor(
    private _activatedRouter: ActivatedRoute,
    private _addService: AddService,
    private fb: FormBuilder,
    private _location: Location
  ) {}

  async ngOnInit(): Promise<void> {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      id: [''],
      image: ['', Validators.required]
    });
  }

  onSend() {
    this.isSubmited = true;
    if (this.form?.valid) {
        let add = new Add(
          '',
          this.form?.value.image
        );
        this._addService.create_add(add);
        
      this._location.back();

      this.isSubmited = false;
    }
  }

  async onFileChange(event: any) {
    if (event.target.files.length > 0) {
      let files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        if (file) {
          const storageRef = ref(this.storage, file.name);
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
