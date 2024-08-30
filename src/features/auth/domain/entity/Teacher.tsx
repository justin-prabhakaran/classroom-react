import { DEPARTMENT } from "../../../../core/utils/DEPARTMENT";
import { ROLE } from "../../../../core/utils/ROLE";

export default class Teacher{
     name : string;
     email : string;
     department : DEPARTMENT;
     role : ROLE;
    constructor(values : Teacher){
        this.name = values.name;
        this.email = values.email;
        this.department = values.department;
        this.role = values.role;
    }
}