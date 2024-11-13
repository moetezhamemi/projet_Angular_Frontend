import { Type } from '../model/type.model';
import { Component,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-update-type',
  templateUrl: './update-type.component.html',
  styles: ``
})
export class UpdateTypeComponent {
  @Input() type!: Type;
  @Input()
  ajout! : boolean;
  data! : string;
  @Output() typeUpdated = new EventEmitter<Type>();

  ngOnInit(): void {
    console.log("ngOnInit du composant UpdateCategorie ",this.type);
    }
    savetype(){
      this.typeUpdated.emit(this.type);
      }
      
    
}
