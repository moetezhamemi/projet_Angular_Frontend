import { AuthService } from './../services/auth.service';
import { Type } from './../model/type.model';
import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-listetype',
  templateUrl: './listetype.component.html',
  styles: [],
})
export class ListetypeComponent implements OnInit {
  t: Type[] = [];  
  ajout:boolean=true;
  updatedtype: Type = { idtype: 0, nomtype: '' };
  constructor(private clientservice: ClientService) {}
  ngOnInit(): void {
    this.chargertype();  
  }
  ajoutertype(nouveautype : Type): void
    {
      //this.clientservice.ajoutertype(nouveautype);
      this.chargertype();
    }
  typeUpdated(tt: Type):void {
    if(this.ajout)
    {
      //this.clientservice.ajoutertype(tt);
    }
    else{
      const index = this.t.findIndex((type) => type.idtype === tt.idtype);
      if (index !== -1) {
        this.t[index] = tt;
    }
    this.ajout = true;
  }
  this.chargertype();
  this.updatedtype = { idtype: 0, nomtype: '' };

}
  chargertype():void{
    //this.t = this.clientservice.listetype();
    console.log(this.t);  
  }
  updatetype(tt : Type)
  {
    this.updatedtype = tt;
    this.ajout = false;
  }

}
