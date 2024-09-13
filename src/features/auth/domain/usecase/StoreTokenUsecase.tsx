import Usecase from "../../../../core/utils/Usecase";
import AuthRepository from "../repository/AuthRepository";

export default class StoreTokenUsecase implements Usecase<void, StoreTokenParams> {
  authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }
    execute(params: StoreTokenParams): void {
        return this.authRepository.storeToken(params.token);
    }

  
}

export class StoreTokenParams{
    token : string;
    constructor(values : StoreTokenParams){
        this.token = values.token;
    }
}