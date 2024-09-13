import StudentModel from "../model/StudentModel";

import axios from "axios";
import { API_URL, TOKEN_KEY } from "../../../../core/utils/Constants";
import Student from "../../domain/entity/Student";
import TeacherModel from "../model/TeacherModel";
import Teacher from "../../domain/entity/Teacher";

export interface AuthDataSource {
  getStudentWithEmail(email: string, pass: string): Promise<StudentModel>;

  getStudentWithRegisterNumber(
    registerNumber: number,
    pass: string
  ): Promise<StudentModel>;

  getTeacherWithEmail(email: string, pass: string): Promise<TeacherModel>;

  storeToken(token: string): void;

  getToken(): string;

  removeToken(): void;


  getCurrentUser(token : string) : Promise<Student | Teacher> ;
  
}

export class AuthDataSourceImpl implements AuthDataSource {
  async getCurrentUser(token: string): Promise<StudentModel | TeacherModel> {
    let result : StudentModel | TeacherModel = await axios.get(API_URL + "/me",{
        headers : {
            Authorization : "Bearer " + token 
        }
    });
    
    return result;
    
  }
  removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  getToken(): string {
    let res: string | null = localStorage.getItem(TOKEN_KEY);
    if (!res) {
      throw new Error("TOKEN NOT FOUND !!");
    }

    return res;
  }

  storeToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  async getStudentWithEmail(
    email: string,
    pass: string
  ): Promise<StudentModel> {
    let result = await axios.post(API_URL + "/login/student", {
      email: email,
      pass: pass,
    });
    if (result.status == 200) {
      let student: Student = {
        registerNumber: result.data.registerNumber,
        name: result.data.name,
        email: result.data.email,
        year: result.data.year,
        department: result.data.department,
        section: result.data.section,
        jwt: result.data.jwt,
        securityRole: result.data.securityRole,
      };

      return new StudentModel(student);
    } else throw new Error("Login Failed !!");
  }

  async getStudentWithRegisterNumber(
    registerNumber: number,
    pass: string
  ): Promise<StudentModel> {
    let result = await axios.post(API_URL + "/login/student", {
      regno: registerNumber,
      pass: pass,
    });

    if (result.status == 200) {
      let student: Student = {
        registerNumber: result.data.registerNumber,
        name: result.data.name,
        email: result.data.email,
        year: result.data.year,
        department: result.data.department,
        section: result.data.section,
        jwt: result.data.jwt,
        securityRole: result.data.securityRole,
      };

      return new StudentModel(student);
    } else throw new Error("Login Failed !!");
  }

  async getTeacherWithEmail(
    email: string,
    pass: string
  ): Promise<TeacherModel> {
    let result = await axios.post(API_URL + "/login/teacher", {
      email: email,
      pass: pass,
    });

    if (result.status == 200) {
      let teacher: Teacher = {
        name: result.data.name,
        email: result.data.email,
        department: result.data.department,
        role: result.data.role,
        jwt: result.data.jwt,
        securityRole: result.data.securtiyRole,
      };

      return new TeacherModel(teacher);
    } else throw new Error("Login Failed !!");
  }
}
