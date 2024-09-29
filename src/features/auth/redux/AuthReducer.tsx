
import Student from "../domain/entity/Student"
import Teacher from "../domain/entity/Teacher"


export enum AuthActions {
    // LOGIN_STUDENT = "login_student",
    // LOGIN_TEACHER = "login_teacher",
    GET_CURRENT_USER = "get_current_user",
    LOADING_STATE = "loading_state",
    SUCCESS_STATE = "success_state",
    FAILURE_STATE = "failure_state"
}

// export interface StudentLoginAction {
//     type: AuthActions.LOGIN_STUDENT,
//     payload: {
//         email: string,
//         password: string,
//         registerNumber: number;
//     }
// }


// export interface TeacherLoginAction {
//     type: AuthActions.LOGIN_TEACHER,
//     payload: {
//         email: string,
//         password: string,
//     }
// }

export interface LoadingAction {
    type: AuthActions.LOADING_STATE
}

export interface SuccessAction {
    type: AuthActions.SUCCESS_STATE,
    payload: Teacher | Student,
}

export interface ErrorAction {
    type: AuthActions.FAILURE_STATE
    payload: ErrorPayload
}


export interface ErrorPayload{
    code : string,
    data : string 
}
export interface AuthState {
    isLoading: boolean,
    data: Teacher | Student | null,
    error: ErrorPayload | null
}


const initialState: AuthState = {
    isLoading: false,
    data: null,
    error: null,
}



export type AuthAction = LoadingAction | SuccessAction | ErrorAction;


export function authReducer(state: AuthState = initialState, action: AuthAction): AuthState {

    if (!action.type.startsWith('@@redux')) {
        console.log(action.type + " called  !!");
    }
    switch (action.type) {
        case AuthActions.LOADING_STATE: {
            console.log("loading state.....");
            
            return {
                ...state,
                isLoading: true,
                error: null
            }
        }
        case AuthActions.SUCCESS_STATE: {
            console.log("success state.....");
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                error: null
            }
        }
        case AuthActions.FAILURE_STATE: {
            console.log("failure state.....");
            return {
                ...state,
                isLoading: false,
                error: {
                    code : "error",
                    data : action.payload.data
                }
            }
        }
        default:{
            console.log("--------->");
            
             return state;}
    }

}
