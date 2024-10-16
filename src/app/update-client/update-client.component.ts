import { Component} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ClientService } from '../services/client.service';
import {client}from '../model/client.model';
import { Type } from '../model/type.model'; 
@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styles: ``
})
export class UpdateClientComponent {
  cc = new client();
  types! : Type[];
  updatedtypeid! : number;
  constructor(private activatedRoute: ActivatedRoute,
    private router :Router,
    private clientService : ClientService,
    
  ){}
  ngOnInit(): void {
    this.types = this.clientService.listetype();
    this.cc =
    this.clientService.consulterclient(this.activatedRoute.snapshot.params['id']);
    this.updatedtypeid=this.cc.type.idtype;
    }
    
    updateclient() {
      this.cc.type=this.clientService.consultertype(this.updatedtypeid);
      this.clientService.updateclient(this.cc);
      this.router.navigate(['clients']);
      }

}
