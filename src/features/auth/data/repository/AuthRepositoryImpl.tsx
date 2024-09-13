
import Student from "../../domain/entity/Student";
import Teacher from "../../domain/entity/Teacher";
import AuthRepository from "../../domain/repository/AuthRepository";
import { AuthDataSource } from "../datasource/AuthDataSource";
import StudentModel from "../model/StudentModel";
import TeacherModel from "../model/TeacherModel";

export default class AuthRepositoryImpl extends AuthRepository{
   async getCurrentUser(token : string) :Promise< StudentModel | TeacherModel >{
        return await this.authDataSource.getCurrentUser(token);
    }
    
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
   

    getToken(): string {
        return this.authDataSource.getToken();
    }
    storeToken(token: string): void {
        return this.authDataSource.storeToken(token);
    }
    deleteToken(): void {
        return this.authDataSource.removeToken();
    }
   

}