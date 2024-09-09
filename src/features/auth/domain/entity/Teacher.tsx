import { DEPARTMENT } from "../../../../core/utils/DEPARTMENT";
import { ROLE } from "../../../../core/utils/ROLE";
import { SROLE } from "../../../../core/utils/SROLE";

export default class Teacher{
     name : string;
     email : string;
     department : DEPARTMENT;
     role : ROLE;
     jwt : string;
     securityRole : SROLE;
    constructor(values : Teacher){
        this.name = values.name;
        this.email = values.email;
        this.department = values.department;
        this.role = values.role;
        this.jwt = values.jwt;
        this.securityRole = values.securityRole;

    }
}