import Usecase from "../../../../core/utils/Usecase";
import Teacher from "../entity/Teacher";
import AuthRepository from "../repository/AuthRepository";

export class TeacherLoginParams{
    email : string;
    password : string;

    constructor(values : TeacherLoginParams){
        this.email = values.email;
        this.password = values.password;
    }
}

export class TeacherLoginUsecase implements Usecase<Promise<Teacher>,TeacherLoginParams>{
    private authRepository : AuthRepository;


    constructor(authRepository : AuthRepository){
        this.authRepository = authRepository;
    }

    async execute(params: TeacherLoginParams): Promise<Teacher> {
        if(params.email && params.password){
           return await this.authRepository.loginTeacher(params.email,params.password);
        }
        throw new Error("Parameters not found !!");
    }
    
} 