import Usecase, { NoParams } from "../../../../core/utils/Usecase";
import AuthRepository from "../repository/AuthRepository";

export default class DeleteTokenUseCase implements Usecase<void, NoParams> {
  authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  execute(_params: NoParams): void {
    return this.authRepository.deleteToken();
  }
}
