import { Dispatch } from "redux";
import { AuthAction, AuthActions } from "./AuthReducer";


export function loginStudent(email: string, password: string, registerNumber: number) {

    return function (dispatch: Dispatch<AuthAction>) {
        dispatch({
            type: AuthActions.LOGIN_STUDENT,
            payload: {
                email,
                password,
                registerNumber
            }
        });
    }
}

export function loginTeacher(email: string, password: string) {
    return function (dispatch: Dispatch<AuthAction>) {
        dispatch({
            type: AuthActions.LOGIN_TEACHER,
            payload: {
                email,
                password
            }
        })
    }
}
