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
  types: Type[] = [];
  cc!: client;
  updatedtypeid!: number;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    // Charger les types disponibles
    this.clientService.listetype().subscribe(types => {
      this.types = types._embedded.types;
    });

    // Charger les données du client
    this.clientService.consulterclient(this.activatedRoute.snapshot.params['id']).subscribe(
      cls => {
        this.cc = cls;
        if (this.cc) {
          this.updatedtypeid = this.cc.type?.idtype || 0;
          this.initForm();
        }
      },
      error => {
        console.error('Erreur lors du chargement du client', error);
        // Ajouter une gestion des erreurs si nécessaire
      }
    );
  }

  initForm() {
    this.clientForm = this.fb.group({
      idclient: [{ value: this.cc?.idclient, disabled: true }],
      nomclient: [this.cc?.nomclient, [Validators.required, Validators.minLength(3), this.noNumbersValidator()]],
      emailclient: [this.cc?.emailclient, [Validators.required, Validators.email]],
      dateinscription: [this.cc?.dateinscription, Validators.required],
      adresseclient: [this.cc?.adresseclient, Validators.required],
      idtype: [this.cc?.type?.idtype || '', Validators.required]
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
      // Mettre à jour les valeurs de 'cc' avec celles du formulaire
      this.cc = { ...this.cc, ...this.clientForm.value };
      this.cc.type = this.types.find(type => type.idtype == this.clientForm.value.idtype)!;

      this.clientService.updateclient(this.cc).subscribe(
        type => {
          this.router.navigate(['clients']);
        },
        error => {
          console.error('Erreur lors de la mise à jour du client', error);
          // Afficher un message d'erreur ou une notification
        }
      );
    }
  }
}
