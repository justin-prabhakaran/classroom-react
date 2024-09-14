import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";
import AuthRepository from "../../features/auth/domain/repository/AuthRepository";
import { AuthDataSource, AuthDataSourceImpl } from "../../features/auth/data/datasource/AuthDataSource";
import AuthRepositoryImpl from "../../features/auth/data/repository/AuthRepositoryImpl";
import { TeacherLoginUsecase } from "../../features/auth/domain/usecase/TeacherLoginUsecase";
import { StudentLoginUsecase } from "../../features/auth/domain/usecase/StudentLoginUsecase";
import DeleteTokenUseCase from "../../features/auth/domain/usecase/DeleteTokenUsecase";
import StoreTokenUsecase from "../../features/auth/domain/usecase/StoreTokenUsecase";
import GetTokenUsecase from "../../features/auth/domain/usecase/GetTokenUsecase";
import { GetCurrentUserUsecase } from "../../features/auth/domain/usecase/GetCurrentUserUsecase";


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


export const store = configureStore(
    {
        reducer: reducers,
        middleware: (getMiddleware) => getMiddleware({
            thunk : {
                extraArgument : {
                    studentLoginUsecase,
                    teacherLoginUsecase,
                    deleteTokenUsecase,
                    storeTokenUsecase,
                    getTokenUsecase,
                    getCurrentUserUsecase
                }
            }
        }) 
    }
)

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;