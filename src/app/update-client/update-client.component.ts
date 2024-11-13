import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../services/client.service';
import { client } from '../model/client.model';
import { Type } from '../model/type.model'; 

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styles: []
})
export class UpdateClientComponent implements OnInit {
  clientForm!: FormGroup;
  types!: Type[];
  cc!: client;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.types = this.clientService.listetype();
    this.cc = this.clientService.consulterclient(this.activatedRoute.snapshot.params['id']);

    this.clientForm = this.fb.group({
      idclient: [{ value: this.cc.idclient, disabled: true }],
      nomclient: [this.cc.nomclient, [Validators.required, Validators.minLength(3), this.noNumbersValidator()]],
      emailclient: [this.cc.emailclient, [Validators.required, Validators.email]],
      dateinscription: [this.cc.dateinscription, Validators.required],
      adresseclient: [this.cc.adresseclient, Validators.required],
      idtype: [this.cc.type?.idtype, Validators.required]
    });
  }
  noNumbersValidator() {
    return (control: any) => {
      const hasNumber = /\d/.test(control.value);
      return hasNumber ? { hasNumber: true } : null;
    };
  }
  updateclient() {
    if (this.clientForm.valid) {
      const updatedClient = { ...this.cc, ...this.clientForm.value };
      updatedClient.type = this.clientService.consultertype(this.clientForm.value.idtype);
      this.clientService.updateclient(updatedClient);
      this.router.navigate(['clients']);
    }
  }
}
