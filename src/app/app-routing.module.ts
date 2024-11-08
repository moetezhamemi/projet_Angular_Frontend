import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivateFn } from '@angular/router';
import { ClientsComponent } from './clients/clients.component';
import { AddClientComponent } from './add-client/add-client.component';
import { UpdateClientComponent } from './update-client/update-client.component';
import { RecherchepartypeComponent } from './recherchepartype/recherchepartype.component';
import { RechercheparnomComponent } from './rechercheparnom/rechercheparnom.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { clientGuard } from './client.guard';
const routes: Routes = [{path: "clients", component : ClientsComponent},
  { path: "add-client", component: AddClientComponent, canActivate: [clientGuard] },
  {path : "", redirectTo:"clients", pathMatch:"full"},
  {path: "updateclient/:id", component: UpdateClientComponent,canActivate: [clientGuard]},
  {path: "recherchepartype",component: RecherchepartypeComponent},
  {path: "rechercheparnom", component : RechercheparnomComponent},
  {path: 'login', component: LoginComponent},
  {path: 'forbidden', component: ForbiddenComponent},


 ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
