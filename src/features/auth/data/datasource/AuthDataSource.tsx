import axios from "axios";
import {API_URL, TOKEN_KEY} from "../../../../core/utils/Constants";
import {Student} from "../../domain/entity/Student.tsx";
import {Teacher} from "../../domain/entity/Teacher.tsx";

export interface AuthDataSource {
  getStudentWithEmail(email: string, pass: string): Promise<Student>;

  getStudentWithRegisterNumber(
    registerNumber: number,
    pass: string
  ): Promise<Student>;

  getTeacherWithEmail(email: string, pass: string): Promise<Teacher>;

  storeToken(token: string): void;

  getToken(): string;

  removeToken(): void;


  getCurrentUser(token : string) : Promise<Student | Teacher> ;
  
}

export class AuthDataSourceImpl implements AuthDataSource {
  async getCurrentUser(token: string): Promise<Student | Teacher> {
    const result =  await axios.get(API_URL + "/me", {
      headers: {
        Authorization: "Bearer " + token
      }
    });

    if(result.status){
      const data = result.data;

      if(data.securityRole === "STUDENT"){
        return {
          registerNumber: data.registerNumber,
          name: data.name,
          email: data.email,
          year: data.year,
          department: data.department,
          section: data.section,
          securityRole: data.securityRole,
          jwt: data.jwt
        };
      }
      else if(data.securityRole === "TEACHER"){
        return {
          name : data.name,
          email : data.email,
          department : data.department,
          role : data.role,
          securityRole : data.securityRole,
          jwt : data.jwt
        };
      }
      else throw new Error("Unknown Security Role !!" + data.securityRole);
    }else throw new Error("Failed to sign in!");
    
  }
  removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  getToken(): string {
    const res: string | null = localStorage.getItem(TOKEN_KEY);
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
  ): Promise<Student> {
    const result = await axios.post(API_URL + "/login/student", {
      email: email,
      pass: pass,
    });
    if (result.status == 200) {
      return {
        registerNumber: result.data.registerNumber,
        name: result.data.name,
        email: result.data.email,
        year: result.data.year,
        department: result.data.department,
        section: result.data.section,
        jwt: result.data.jwt,
        securityRole: result.data.securityRole,
      };
    } else throw new Error("Login Failed !!");
  }

  async getStudentWithRegisterNumber(
    registerNumber: number,
    pass: string
  ): Promise<Student> {
    const result = await axios.post(API_URL + "/login/student", {
      regno: registerNumber,
      pass: pass,
    });

    if (result.status == 200) {
      return {
        registerNumber: result.data.registerNumber,
        name: result.data.name,
        email: result.data.email,
        year: result.data.year,
        department: result.data.department,
        section: result.data.section,
        jwt: result.data.jwt,
        securityRole: result.data.securityRole,
      }
    } else throw new Error("Login Failed !!");
  }

  async getTeacherWithEmail(
    email: string,
    pass: string
  ): Promise<Teacher> {
    const result = await axios.post(API_URL + "/login/teacher", {
      email: email,
      pass: pass,
    });

    if (result.status == 200) {
      return {
        name: result.data.name,
        email: result.data.email,
          department: result.data.department,
          role: result.data.role,
          jwt: result.data.jwt,
          securityRole: result.data.securtiyRole,
      }
    } else throw new Error("Login Failed !!");
  }
}
