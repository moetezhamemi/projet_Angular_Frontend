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
  newidtype! : number;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //this.types = this.clientService.listetype();*
    this.clientService.listetype().
    subscribe(types => {this.types = types._embedded.types;
      console.log(types);
    });
    this.clientForm = this.fb.group({
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
      this.newclient = this.clientForm.value;
      console.log('newidtype:', this.newidtype);
      this.newclient.type = this.types.find(type => type.idtype == this.newidtype)!;
      this.clientService.ajouterclient(this.newclient).subscribe(
        cl => {
          console.log('Client ajouté avec succès:', cl); 
          this.router.navigate(['clients']); 
        }
      );
    }
  }
  
  
  
}
