import { DEPARTMENT } from "../../../../core/utils/DEPARTMENT";
import { YEAR } from "../../../../core/utils/YEAR";


export default class Student{
    registerNumber : number;
    name : string;
    email : string;
    department : DEPARTMENT;
    year : YEAR;
    section : string;

    constructor(values : Student){
        this.registerNumber = values.registerNumber;
        this.name = values.name;
        this.email = values.email;
        this.department = values.department;
        this.year = values.year;
        this.section = values.section;
    }
} 