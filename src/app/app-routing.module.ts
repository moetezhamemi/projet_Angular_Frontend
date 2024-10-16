import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './clients/clients.component';
import { AddClientComponent } from './add-client/add-client.component';
import { UpdateClientComponent } from './update-client/update-client.component';
import { RecherchepartypeComponent } from './recherchepartype/recherchepartype.component';
import { RechercheparnomComponent } from './rechercheparnom/rechercheparnom.component';
const routes: Routes = [{path: "clients", component : ClientsComponent},
  {path: "add-client", component :AddClientComponent},
  {path : "", redirectTo:"clients", pathMatch:"full"},
  {path: "updateclient/:id", component: UpdateClientComponent},
  {path: "recherchepartype",component: RecherchepartypeComponent},
  {path: "rechercheparnom", component : RechercheparnomComponent},

 ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
