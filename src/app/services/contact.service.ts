import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Contact} from '../models/contact';

import {ContactComponent} from '../components/contact/contact.component';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  selectedContact:Contact;
  contacts:Contact[];
  readonly URL_API='http://localhost:3000/api/contact/';

  constructor(private http:HttpClient) {
    this.selectedContact=new Contact();
    
   }
   getContact(){
     return this.http.get(this.URL_API);
   }
   getContactByID(unid:string){
    return this.http.get(this.URL_API + `${unid}`);
  }
   postContact(Contact:Contact){
     return this.http.post(this.URL_API,Contact);
   }
   putContact(Contact:Contact){
     return this.http.put(this.URL_API,Contact);
   }
   deleteContact(Contact:Contact){
     return this.http.delete(this.URL_API + `${Contact["@unid"]}`);
   }

}
