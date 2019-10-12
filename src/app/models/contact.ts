export class Contact {
    constructor(_unid='',FirstName='',LastName='',City='',State=''){
        this["@unid"]=_unid;
        this.FirstName=FirstName;
        this.LastName=LastName;
        this.City=City;
        this.State=State;
    }
    "@unid":string;
    FirstName: string;
    LastName: string;
    City: string;
    State: string
}
