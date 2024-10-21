import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../services/client.service';
import { client } from '../model/client.model';
import { Type } from '../model/type.model';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function noNumbersValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const hasNumber = /\d/.test(control.value);
    return hasNumber ? { 'hasNumber': true } : null;
  };
}

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: []
})
export class AddClientComponent implements OnInit {
  clientForm!: FormGroup;
  types!: Type[];
  newclient = new client();
  idError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.types = this.clientService.listetype();
    this.clientForm = this.fb.group({
      idclient: ['', Validators.required],
      nomclient: ['', [Validators.required, noNumbersValidator()]], 
      emailclient: ['', [Validators.required, Validators.email]],
      dateinscription: ['', Validators.required],
      adresseclient: ['', Validators.required],
      idtype: ['', Validators.required],
    });

    this.clientForm.get('idclient')?.valueChanges.subscribe(value => {
      this.idError = false; 
    });
  }

  addclient() {
    if (this.clientForm.valid) {
      const idclient = this.clientForm.value.idclient;
      if (this.clientService.idExists(idclient)) {
        this.idError = true;
        return;
      }
      this.idError = false;

      this.newclient = this.clientForm.value;
      this.newclient.type = this.clientService.consultertype(this.clientForm.value.idtype);
      this.clientService.ajouterclient(this.newclient);
      this.router.navigate(['clients']);
    }
  }
}
