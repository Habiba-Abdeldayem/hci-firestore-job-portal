export class User{
    id:string;
    name: string; 
    email: string; 
    age: number; 
    location:string;
    phone:string;
    department:string;
    interested:string;





    constructor(id:string,name:string, age:number, email:string, location:string,phone:string,department:string,interested:string){
        this.id =id;
        this.name=name;
        this.age=age;
        this.email=email;
        this.department=department;
        this.location=location;
        this.phone=phone;
        this.interested=interested;
    }

}