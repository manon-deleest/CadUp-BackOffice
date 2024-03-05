import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Column } from 'src/app/models/column';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit {
  @Input() columns: Column[] = []; 
  @Input() data : any[] = []; 
  @Input() linkForForm : string = '' ;
  @Input() titleAjouter : string = 'Ajouter';
  @Output() elementSupprimer = new EventEmitter<Set<any>>(); 

  tabSelected: Set<string> = new Set(); 

  constructor() { }

  ngOnInit(): void {
    // this.data = this.data.filter(e => e.description != "" ); 
  }

  onChecked(e:Event, ligne: string){
    e.stopPropagation();
    if(this.tabSelected.has(ligne)){
      this.tabSelected.delete(ligne); 
    }else{
      this.tabSelected.add(ligne); 
    }
  }

  onDelete() {
    this.elementSupprimer.emit(this.tabSelected);
    this.tabSelected.clear(); 
  }

}
