import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import{client} from '../model/client.model'
import { ClientService } from '../services/client.service';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent {
  clients : client[] = [];
  constructor(private clientService: ClientService,
    private router :Router, public authservice: AuthService) {
    //this.clients = clientService.listeclients();
    }
    ngOnInit():void{
      this.chargerclients();  
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
 
}
