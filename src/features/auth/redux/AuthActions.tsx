import { Dispatch } from "redux";
import {AuthActions} from "./AuthReducer";
// import { useDependencyProvider } from "../../../DependencyProvider";
import { StudentLoginParams, StudentLoginUsecase } from "../domain/usecase/StudentLoginUsecase";
import { TeacherLoginParams, TeacherLoginUsecase } from "../domain/usecase/TeacherLoginUsecase";
import { AppState } from "../../../core/redux/store";
import { GetCurrentUserUsecase } from "../domain/usecase/GetCurrentUserUsecase";
import { NoParams } from "../../../core/utils/Usecase";
import GetTokenUsecase from "../domain/usecase/GetTokenUsecase";
import Student from "../domain/entity/Student.tsx";
import Teacher from "../domain/entity/Teacher.tsx";
import StoreTokenUsecase from "../domain/usecase/StoreTokenUsecase.tsx";


export function loginStudent(email: string, password: string, registerNumber: number) {

    return async function (dispatch: Dispatch, _getState: () => AppState, { studentLoginUsecase, storeTokenUsecase }: { studentLoginUsecase: StudentLoginUsecase ,storeTokenUsecase : StoreTokenUsecase}) {



        try {
            dispatch({
                type: AuthActions.LOADING_STATE
            });

            const result = await studentLoginUsecase.execute(new StudentLoginParams({
                registerNumber: registerNumber,
                email: email,
                password: password
            }));

            storeTokenUsecase.execute({
                token : result.jwt
            });

            dispatch({
                type: AuthActions.SUCCESS_STATE,
                payload: result
            });


        }
        catch (e) {

            dispatch({
                type: AuthActions.FAILURE_STATE,
                payload: {
                    code: "error",
                    data: String(e)
                }
            });
        }


    }
}

export function loginTeacher(email: string, password: string) {
    return async function (dispatch: Dispatch, _getState: () => AppState, { teacherLoginUsecase, storeTokenUsecase  }: { teacherLoginUsecase: TeacherLoginUsecase , storeTokenUsecase : StoreTokenUsecase}) {


        try {
            dispatch({
                type: AuthActions.LOADING_STATE
            });

            const result = await teacherLoginUsecase.execute(new TeacherLoginParams({
                email: email,
                password: password
            }));

            storeTokenUsecase.execute({
                token : result.jwt
            });

            dispatch({
                type: AuthActions.SUCCESS_STATE,
                payload: result
            });

        } catch (e) {
            dispatch({
                type: AuthActions.FAILURE_STATE,
                payload: {
                    code: "error",
                    data: String(e)
                }
            });
        }
    }
}


export function getCurrentUser() {
    return async function (dispatch: Dispatch, _getState: () => AppState, { getCurrentUserUsecase, getTokenUsecase }: { getCurrentUserUsecase: GetCurrentUserUsecase, getTokenUsecase: GetTokenUsecase }) {

        try {

            dispatch({
                type: AuthActions.LOADING_STATE
            });

            const token = getTokenUsecase.execute(new NoParams());
            const user :  Student | Teacher = await getCurrentUserUsecase.execute({
                token: token
            });

            dispatch({
                type: AuthActions.SUCCESS_STATE,
                payload: user
            });

        } catch (e) {
            console.log(e);
            dispatch({
                type: AuthActions.FAILURE_STATE,
                payload: {
                    code: "error",
                    data: String(e)
                }
            });
        }
    }
}