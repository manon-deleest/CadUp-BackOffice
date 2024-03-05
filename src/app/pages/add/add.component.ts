import { Component, OnInit } from '@angular/core';
import { Add } from 'src/app/models/add';
import { AddService } from 'src/app/services/add.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  adds : Add[] = []; 

  constructor(
    private _addService: AddService
  ) { }

  ngOnInit(): void {
    this.adds = this._addService.get_add_all();
  }

  delete(id: string){
    console.log('ccc'); 
    console.log(id);
    this._addService.delete_add(id);
    this.adds = this._addService.get_add_all();
  }

}
