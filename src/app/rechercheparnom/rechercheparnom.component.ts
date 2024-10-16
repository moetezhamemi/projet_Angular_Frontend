import { Component } from '@angular/core';
import { ClientService } from '../services/client.service';
import { client } from '../model/client.model';
@Component({
  selector: 'app-rechercheparnom',
  templateUrl: './rechercheparnom.component.html',
  styles: ``
})
export class RechercheparnomComponent {
  nomclient! : String;
  allclients! : client[];
  clients! : client[];
  searchTerm! : string;
  constructor(private clientService: ClientService) {}
    ngOnInit(): void {
    this./*all*/clients = this.clientService.listeclients();
    console.log(this.allclients); 
  }
  supprimerclient(c: client) {
    //console.log(p);
    let conf = confirm("Etes-vous sûr ?");
    if (conf){
         this.clientService.supprimerclient(c);
 }
}
onKeyUp(filterText : string){
  this.clients = this.allclients.filter(item =>
  item.nomclient!.toLowerCase().includes(filterText));
  }

}