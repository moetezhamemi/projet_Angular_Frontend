import { client } from './../model/client.model';
import { Injectable } from '@angular/core';
import { Type } from '../model/type.model';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { TypeWrapper } from '../model/typeWrapped.model';
const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
  };
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clients : client[] = [];
  client! : client;
  types! : Type[];
  clientrecherche! : client[];
  apiUrl : string = 'http://localhost:8082/client/api';
  apiUrltype: string = 'http://localhost:8082/client/types';

  constructor(private  http : HttpClient) {
    //this.types = [ {idtype : 1, nomtype : "premium"},
      //{idtype : 2, nomtype : "Normal"}]; 
      /*this.clients = [
        { idclient : 1, nomclient : "tez", emailclient : "tez1@gmail.com",
        dateinscription : new Date("01/10/2021"),adresseclient : "nabeul", type : {idtype : 1, nomtype : "Premium"}},
        { idclient : 2, nomclient : "ali", emailclient : "ali1@gmail.com",
          dateinscription : new Date("01/8/2022"),adresseclient : "tunis", type : {idtype : 2, nomtype : "Normal"}},
          { idclient : 3, nomclient : "salah", emailclient : "salah1@gmail.com",
            dateinscription : new Date("11/8/2022"),adresseclient : "kelibia", type : {idtype : 2, nomtype : "Normal"}},
        ];*/
        
   }
   listeclients():Observable<client[]>{
    return this.http.get<client[]>(this.apiUrl);
   }
   /*ajouterclient(client : client){
    this.clients.push(client);
    this.trierclients();

   }*/
  ajouterclient(cl : client):Observable<client>{
    return this.http.post<client>(this.apiUrl,cl,httpOptions);
  }
  supprimerclient(id: number) {
    const url = `${this.apiUrl}/${id}`;  // Utilisez les backticks ici, pas les guillemets simples
    return this.http.delete(url, httpOptions);
  } 
    consulterclient(id:number): Observable<client> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.get<client>(url);   }
      trierclients() {
        this.clients = this.clients.sort((n1, n2) => {
          if (n1.idclient! > n2.idclient!) {
            return 1;
          }
          if (n1.idclient! < n2.idclient!) {
            return -1;
          }
          return 0;
        });
      }
      updateclient(c: client):Observable<client> {
        return this.http.put<client>(this.apiUrl,c,httpOptions);
      }
      listetype():Observable<TypeWrapper>{
        return this.http.get<TypeWrapper>(this.apiUrltype);
       }
      /*consultertype(id:number): Type{
        return this.types.find(cat => cat.idtype == id)!;
        }*/
    recherchepartype(idtype:number): client[] {
      this.clientrecherche = [];
      this.clients.forEach((cur,index)=>{
        if(idtype == cur.type.idtype){
          this.clientrecherche.push(cur);
        }
    });
    return this.clientrecherche;
      
    }
    public idExists(idclient: string): boolean {
      const idAsNumber = Number(idclient);
      return this.clients.some(client => client.idclient === idAsNumber); 
  }
  /*ajoutertype(tt : Type): Type
  {
    const id = this.types.length > 0?Math.max(...this.types.map(Type => Type.idtype ?? 0)) + 1 : 1 ;
    tt.idtype = id;
    this.types.push(tt);
    return tt;

  }*/
}
