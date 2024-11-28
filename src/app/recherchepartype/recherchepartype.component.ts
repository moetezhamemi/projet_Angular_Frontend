import { Component } from '@angular/core';
import { client } from '../model/client.model';
import { ClientService } from '../services/client.service';
import { Type } from '../model/type.model';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ClientsComponent } from '../clients/clients.component';
@Component({
  selector: 'app-recherchepartype',
  templateUrl: './recherchepartype.component.html',
  styles: ``
})
export class RecherchepartypeComponent {
  clients! : client[];
  types! : Type[];
  Idtype! : number;
  constructor(private clientService: ClientService,
    private router :Router, public authservice: AuthService){}
  ngOnInit():void{
    this.clients = [];
    //this.types = this.clientService.listetype();
  }
  supprimerclient(c: client) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf) {
      if (c.idclient !== undefined && !isNaN(c.idclient)) {
        this.clientService.supprimerclient(c.idclient).subscribe(() => {
          console.log('Client supprimé');
          this.chargerclients();
        });
      } else {
        console.error('ID du client invalide');
      }
    }
  }
  chargerclients()
  {
    this.clientService.listeclients().subscribe(cls => {
      console.log(cls);
      this.clients = cls;
    });
  }
  
 onchange()
 {
  console.log(this.Idtype);
  this.clients = this.clientService.recherchepartype(this.Idtype);
 }
}
