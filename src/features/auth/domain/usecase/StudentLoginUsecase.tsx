import Usecase from "../../../../core/utils/Usecase";
import Student from "../entity/Student";
import AuthRepository from "../repository/AuthRepository";

export class StudentLoginParams{
    email? : string;
    registerNumber? : number;
    password : string;

    constructor(values : StudentLoginParams){
        this.email = values.email;
        this.password = values.password;
        this.registerNumber = values.registerNumber;
    }
}


export class StudentLoginUsecase implements Usecase<Promise<Student>,StudentLoginParams>{
    private authRepository : AuthRepository;

    constructor(authRepository : AuthRepository){
        this.authRepository = authRepository;
    }

   async execute(params: StudentLoginParams): Promise<Student> {
       if(params.email && params.password){
            return await this.authRepository.loginStudentWithEmail(params.email,params.password);
       }
       else if(params.registerNumber && params.password){
            return await this.authRepository.loginStudentWithRegister(params.registerNumber,params.password);
       }

       throw new Error("Login Failed");
       
    }
}