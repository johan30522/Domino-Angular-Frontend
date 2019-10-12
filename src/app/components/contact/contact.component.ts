import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { NgForm } from '@angular/forms';
import { Contact } from 'src/app/models/contact';

declare var M: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [ContactService]
})
export class ContactComponent implements OnInit {

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    //this.getContactByID('18DE2038CC5CF3238825841F0079CD0D');
    this.getContacts();
  }
  resetForm(form?: NgForm) {
    console.log("reset");
    if (form) {
      this.contactService.selectedContact = new Contact();
      form.reset();
      
    }
  }
  addContact(form: NgForm) {
    if (form) {
      console.log(form.controls['@unid'].value);
      if (form.controls['@unid'].value != "" && form.controls['@unid'].value !=null) {
        console.log("Editando");
        this.contactService.putContact(form.value)
          .subscribe(res => {
            console.log(res);
            this.resetForm(form);
            M.toast({ html: 'Actualizado Correctamente' });
            this.getContacts();
          })
      } else {
        this.contactService.postContact(form.value)
          .subscribe(res => {
            console.log(res);
            this.resetForm(form);
            M.toast({ html: 'Guardado Correctamente' });
            this.getContacts();
          })
      }
      /**/
    }
  }
  getContacts() {
    this.contactService.getContact()
      .subscribe((res) => {
        let response = JSON.stringify(res);
        let objectValue = JSON.parse(response);
        this.contactService.contacts = objectValue['docs'] as Contact[];
        console.log(this.contactService.contacts);
      })
  }
  getContactByID(id: string) {
    this.contactService.getContactByID(id)
      .subscribe(res => {
        let response = JSON.stringify(res);
        let objectValue = JSON.parse(response);
        this.contactService.selectedContact = objectValue['document'] as Contact;
        console.log(this.contactService.selectedContact["@unid"]);
      })
  }
  editContact(contact:Contact) {
    this.contactService.selectedContact = contact;
  }
  deleteContact(contact:Contact) {
    this.contactService.deleteContact(contact)
      .subscribe(res => {
        console.log(res);
        M.toast({ html: 'Eliminado Correctamente' });
        this.getContacts();
      })
  }
}
