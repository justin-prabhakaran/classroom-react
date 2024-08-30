
import Student from "../../domain/entity/Student";
import Teacher from "../../domain/entity/Teacher";
import AuthRepository from "../../domain/repository/AuthRepository";
import { AuthDataSource } from "../datasource/AuthDataSource";

export default class AuthRepositoryImpl extends AuthRepository{
    private authDataSource : AuthDataSource;
    
    constructor(authDataSource : AuthDataSource){
        super();
        this.authDataSource = authDataSource;
    }

    async loginStudentWithEmail(email: string, pass: string): Promise<Student> {
        return await this.authDataSource.getStudentWithEmail(email,pass);
    }
    async loginStudentWithRegister(registerNumber: number, pass: string): Promise<Student> {
        return await this.authDataSource.getStudentWithRegisterNumber(registerNumber,pass);
    }
    async loginTeacher(email: string, pass: string): Promise<Teacher> {
        return await this.authDataSource.getTeacherWithEmail(email,pass);
    }
   


   

}