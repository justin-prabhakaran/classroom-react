import { createContext, useContext } from "react";
import {
  AuthDataSource,
  AuthDataSourceImpl,
} from "./features/auth/data/datasource/AuthDataSource";
import AuthRepository from "./features/auth/domain/repository/AuthRepository";
import AuthRepositoryImpl from "./features/auth/data/repository/AuthRepositoryImpl";
import { TeacherLoginUsecase } from "./features/auth/domain/usecase/TeacherLoginUsecase";
import { StudentLoginUsecase } from "./features/auth/domain/usecase/StudentLoginUsecase";
import DeleteTokenUseCase from "./features/auth/domain/usecase/DeleteTokenUsecase";
import StoreTokenUsecase from "./features/auth/domain/usecase/StoreTokenUsecase";
import GetTokenUsecase from "./features/auth/domain/usecase/GetTokenUsecase";
import { GetCurrentUserUsecase } from "./features/auth/domain/usecase/GetCurrentUserUsecase";

export interface DependencyType {
  studentLoginUsecase: StudentLoginUsecase;
  teacherLoginUsecase: TeacherLoginUsecase;
  deleteTokenUsecase : DeleteTokenUseCase;
  storeTokenUsecase : StoreTokenUsecase;
  getTokenUsecase : GetTokenUsecase;
  getCurrentUserUsecase : GetCurrentUserUsecase
}

const DependencyContext = createContext<DependencyType | null>(null);

function DependencyProvider({ children }: { children: React.ReactNode }) {
  const authDataSource: AuthDataSource = new AuthDataSourceImpl();
  const authRepository: AuthRepository = new AuthRepositoryImpl(authDataSource);
  const teacherLoginUsecase: TeacherLoginUsecase = new TeacherLoginUsecase(
    authRepository
  );
  const studentLoginUsecase: StudentLoginUsecase = new StudentLoginUsecase(
    authRepository
  );

  const deleteTokenUsecase : DeleteTokenUseCase = new DeleteTokenUseCase(authRepository);
  const storeTokenUsecase : StoreTokenUsecase = new StoreTokenUsecase(authRepository);
  const getTokenUsecase : GetTokenUsecase = new GetTokenUsecase(authRepository);


  const getCurrentUserUsecase : GetCurrentUserUsecase = new GetCurrentUserUsecase(authRepository); 
  return (
    <DependencyContext.Provider
      value={{ teacherLoginUsecase, studentLoginUsecase, deleteTokenUsecase, storeTokenUsecase, getTokenUsecase, getCurrentUserUsecase}}
    >
      {children}
    </DependencyContext.Provider>
  );
}
export function useDependencyProvider(): DependencyType {
  const context = useContext(DependencyContext);
  if (!context) {
    throw new Error("context is Null !!!");
  }

  return context;
}

export default DependencyProvider;
