import Usecase, { NoParams } from "../../../../core/utils/Usecase";
import AuthRepository from "../repository/AuthRepository";

export default class GetTokenUsecase implements Usecase<string, NoParams> {
  authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  execute(_params: NoParams): string {
    return this.authRepository.getToken();
  }
}
