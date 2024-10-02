import Usecase from "../../../../core/utils/Usecase";
import AuthRepository from "../repository/AuthRepository";
import {Student} from "../entity/Student.tsx";
import {Teacher} from "../entity/Teacher.tsx";

export class GetCurrentUserUsecase implements Usecase< Promise<Student | Teacher>  ,GetCurrentUSerParams >{
    
    private authRepository : AuthRepository;

    constructor(authRepository : AuthRepository){
        this.authRepository = authRepository;
    }
    
    async execute(params: GetCurrentUSerParams): Promise<Student | Teacher> {
        return await this.authRepository.getCurrentUser(params.token);

    }

}

export class GetCurrentUSerParams{
    token : string;

    constructor(token : string){
        this.token = token;
    }
}