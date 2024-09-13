import { createContext, useContext, useEffect, useState } from "react";
import Student from "./features/auth/domain/entity/Student";
import Teacher from "./features/auth/domain/entity/Teacher";
import { useDependencyProvider } from "./DependencyProvider";
import { NoParams } from "./core/utils/Usecase";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { GetCurrentUSerParams } from "./features/auth/domain/usecase/GetCurrentUserUsecase";

const userContext = createContext<Student | Teacher | null>(null);


function UserProvider({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const dependencyContext = useDependencyProvider();

    const [user, setUser] = useState<Student | Teacher>();

    function updateUser(user : Student | Teacher){
        setUser(user);
    }

    function getUser(){
        return user;
    }

    useEffect( () => {
        async function getStudent() {
            try {
                let token: string = dependencyContext.getTokenUsecase.execute(
                    new NoParams()
                );
                if (!token) {
                    console.log("Token not Found !!!");
                    // navigate("/");
                }
    
                let user : Student | Teacher = await dependencyContext.getCurrentUserUsecase.execute(new GetCurrentUSerParams(token));
    
                console.log(jwtDecode(token));
    
                
                // const user : Teacher | Student = jwtDecode(token);

                setUser(user);
                
            } catch (e) {
                console.log(e);
            }
        }

        getStudent();
    }, []);

    return <userContext.Provider value={{user,updateUser}}>{children}</userContext.Provider>;
}

export default UserProvider;

export function useUserProvider() : Student | Teacher{
    
    const context = useContext(userContext);
    if(!context){
        throw new Error("User Context is Null !!!");
    }
    return context;
}