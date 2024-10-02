import {useSelector} from "react-redux";

import {AppState} from "../../../../core/redux/store.tsx";
import {Navigate, Outlet} from "react-router-dom";

function ProtectedRoute () {

    const auth = useSelector((state : AppState) => state.auth);

    if(auth.isLoading){
        return <div>Loading...</div>;
    }

    if(!auth.data){
        return <Navigate to="/" replace />
    }

    return <Outlet />
}

export default ProtectedRoute
