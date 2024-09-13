import Usecase from "../../../../core/utils/Usecase";
import Student from "../entity/Student";
import Teacher from "../entity/Teacher";
import AuthRepository from "../repository/AuthRepository";

export class GetCurrentUserUsecase implements Usecase< Promise<Student | Teacher>  ,GetCurrentUSerParams >{
    
    private authRepository : AuthRepository;

    constructor(authRepository : AuthRepository){
        this.authRepository = authRepository;
    }
    
    async execute(params: GetCurrentUSerParams): Promise<Student | Teacher> {
        let result : Student | Teacher = await this.authRepository.getCurrentUser(params.token);
        return result;

    }

}

export class GetCurrentUSerParams{
    token : string;

    constructor(token : string){
        this.token = token;
    }
}