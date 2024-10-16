import { Component } from '@angular/core';
import { client } from '../model/client.model';
import { ClientService } from '../services/client.service';
import { Router } from '@angular/router';
import { Type } from '../model/type.model';
@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.css'
})
export class AddClientComponent {
  newclient = new client();
  types! : Type[];
  newidtype! : number;
  newtype! : Type;
  constructor(private clientService : ClientService,
    private router :Router,
  ) { }
  ngOnInit() {
    this.types = this.clientService.listetype();
    }
    
    addclient() {
      this.newtype =
      this.clientService.consultertype(this.newidtype);
      this.newclient.type = this.newtype;
      this.clientService.ajouterclient(this.newclient);
      this.router.navigate(['clients']);
      }
}
