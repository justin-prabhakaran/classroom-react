import Student from "../domain/entity/Student"
import Teacher from "../domain/entity/Teacher"


export enum AuthActions {
    LOGIN_STUDENT = "login_student",
    LOGIN_TEACHER = "login_teacher",
    GET_CURRENT_USER = "get_current_user"
}


export interface StudentLoginAction {
    type: AuthActions.LOGIN_STUDENT,
    payload: {
        email: string,
        password: string,
        registerNumber: number;
    }
}


export interface TeacherLoginAction {
    type: AuthActions.LOGIN_TEACHER,
    payload: {
        email: string,
        password: string,
    }
}


export type AuthAction = StudentLoginAction | TeacherLoginAction;


export function authReducer(state: Teacher | Student | null = null, action: AuthAction) {

    switch (action.type) {
        case AuthActions.LOGIN_STUDENT: {
            //TODO : implement
        } break;

        case AuthActions.LOGIN_TEACHER: {
            //TODO : implement
        } break;

        default: return state;
    }

}
