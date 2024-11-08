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
  clients : client[];
  constructor(private clientService: ClientService,
    private router :Router, public authservice: AuthService) {
    this.clients = clientService.listeclients();
    }
  supprimerclient(c: client) {
   //console.log(p);
   let conf = confirm("Etes-vous sûr ?");
   if (conf){
        this.clientService.supprimerclient(c);}
}

}
