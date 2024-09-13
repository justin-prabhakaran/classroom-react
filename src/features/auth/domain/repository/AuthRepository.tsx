import StudentModel from "../../data/model/StudentModel";
import TeacherModel from "../../data/model/TeacherModel";
import Student from "../entity/Student";
import Teacher from "../entity/Teacher";

export default abstract class AuthRepository{
    abstract loginStudentWithEmail(email : string, pass : string ) : Promise<Student>;
    abstract loginStudentWithRegister(registerNumber : number, pass : string) : Promise<Student>
    abstract loginTeacher(email : string, pass : string) : Promise<Teacher>;

    abstract getToken() : string;
    abstract storeToken(token : string ) : void;
    abstract deleteToken() : void;


    abstract getCurrentUser(token : string) : Promise< StudentModel | TeacherModel >;
}