import { Component } from '@angular/core';
import { ClientService } from '../services/client.service';
import { client } from '../model/client.model';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
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
  constructor(private clientService: ClientService,private router :Router, public authservice: AuthService) {}
    ngOnInit(): void {
    //this./*all*/clients = this.clientService.listeclients();
    console.log(this.allclients); 
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
  
onKeyUp(filterText : string){
  this.clients = this.allclients.filter(item =>
  item.nomclient!.toLowerCase().includes(filterText));
  }

}