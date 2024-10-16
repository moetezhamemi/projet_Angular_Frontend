import { Component } from '@angular/core';
import { client } from '../model/client.model';
import { ClientService } from '../services/client.service';
import { Type } from '../model/type.model';
@Component({
  selector: 'app-recherchepartype',
  templateUrl: './recherchepartype.component.html',
  styles: ``
})
export class RecherchepartypeComponent {
  clients! : client[];
  types! : Type[];
  Idtype! : number;
  constructor(private clientService: ClientService ){}
  ngOnInit():void{
    this.clients = [];
    this.types = this.clientService.listetype();
  }
  supprimerclient(c: client) {
    //console.log(p);
    let conf = confirm("Etes-vous sûr ?");
    if (conf){
         this.clientService.supprimerclient(c);
         this.clients = this.clientService.recherchepartype(this.Idtype);
 }
}
 onchange()
 {
  console.log(this.Idtype);
  this.clients = this.clientService.recherchepartype(this.Idtype);
 }
}
