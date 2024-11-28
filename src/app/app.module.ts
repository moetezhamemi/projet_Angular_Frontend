import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientsComponent } from './clients/clients.component';
import { AddClientComponent } from './add-client/add-client.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateClientComponent } from './update-client/update-client.component';
import { RecherchepartypeComponent } from './recherchepartype/recherchepartype.component';
import { RouterModule } from '@angular/router';
import { RechercheparnomComponent } from './rechercheparnom/rechercheparnom.component';
import { SearchfilterPipe } from './searchfilter.pipe';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ListetypeComponent } from './listetype/listetype.component';
import { UpdateTypeComponent } from './update-type/update-type.component'
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    AddClientComponent,
    UpdateClientComponent,
    RecherchepartypeComponent,
    RechercheparnomComponent,
    SearchfilterPipe,
    LoginComponent,
    ForbiddenComponent,
    ListetypeComponent,
    UpdateTypeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
