import { Dispatch } from "redux";
import { AuthActions } from "./AuthReducer";
import { useDependencyProvider } from "../../../DependencyProvider";
import { StudentLoginParams, StudentLoginUsecase } from "../domain/usecase/StudentLoginUsecase";
import { TeacherLoginParams } from "../domain/usecase/TeacherLoginUsecase";
import { AppState } from "../../../core/redux/store";



export function loginStudent(email: string, password: string, registerNumber: number) {

    return async function (dispatch: Dispatch, _getState : () => AppState, {studentLoginUsecase} : {studentLoginUsecase : StudentLoginUsecase}) {

       
        try{
            dispatch({
                type : AuthActions.LOADING_STATE
            })

           const result =  await studentLoginUsecase.execute(new StudentLoginParams({
                registerNumber : registerNumber,
                email : email,
                password : password
            }));

            dispatch({
                type : AuthActions.SUCCESS_STATE,
                payload : result
            });
       }catch(e ){
            dispatch({
                type : AuthActions.FAILURE_STATE,
                payload : String(e)
            })
       }
    }
}

export function loginTeacher(email: string, password: string) {
    return async function (dispatch: Dispatch) {
        const {teacherLoginUsecase} = useDependencyProvider();

        try{
            dispatch({
                type : AuthActions.LOADING_STATE
            });

            const result = await teacherLoginUsecase.execute(new TeacherLoginParams({
                email : email,
                password : password
            }));


            dispatch({
                type : AuthActions.SUCCESS_STATE,
                payload : result
            })

        }catch(e){
            dispatch({
                type : AuthActions.FAILURE_STATE,
                payload : String(e)
            })
        }
    }
}
