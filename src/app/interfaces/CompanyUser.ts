export class CompanyUser{
    id:string;
    name: string; 
    email: string; 
    phone:string;
    aboutAs:string;






    constructor(id:string,name:string,email:string,phone:string, aboutAs:string){
        this.id =id;
        this.name=name;
        this.email=email;
        this.phone=phone;
        this.aboutAs=aboutAs;
    }

}