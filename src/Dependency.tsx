import { createContext, useContext } from 'react'
import { AuthDataSource, AuthDataSourceImpl } from './features/auth/data/datasource/AuthDataSource'
import AuthRepository from './features/auth/domain/repository/AuthRepository';
import AuthRepositoryImpl from './features/auth/data/repository/AuthRepositoryImpl';
import { TeacherLoginUsecase } from './features/auth/domain/usecase/TeacherLoginUsecase';
import { StudentLoginUsecase } from './features/auth/domain/usecase/StudentLoginUsecase';


export interface DependencyType {
    studentLoginUsecase : StudentLoginUsecase;
    teacherLoginUsecase : TeacherLoginUsecase;
}

const DependencyContext = createContext<DependencyType | null>(null);

function DependencyProvider({children} : any) {
  
  const authDataSource : AuthDataSource = new AuthDataSourceImpl();
  const authRepository : AuthRepository = new AuthRepositoryImpl(authDataSource);
  const teacherLoginUsecase : TeacherLoginUsecase = new TeacherLoginUsecase(authRepository);
  const studentLoginUsecase : StudentLoginUsecase = new StudentLoginUsecase(authRepository);


    return (
        <DependencyContext.Provider value={{teacherLoginUsecase,studentLoginUsecase}} >
            {children}
        </DependencyContext.Provider>
    );
}
export function useDependency() : DependencyType{

    const context = useContext(DependencyContext);
    if(!context){
        throw new Error('context is Null !!!');
    }
    return context;
}


export default DependencyProvider