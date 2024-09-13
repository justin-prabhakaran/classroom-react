import { useNavigate } from "react-router-dom";
import { useUserProvider } from "../../../../UserProvider"

function Home() {


    const navigate = useNavigate();
    let user
    try{
        user = useUserProvider();
    }catch(e){
        navigate('/');
    }

  return (
    <>
    <div>Home Page</div>
    <div>{user?.name}</div>
    </>
  )
}

export default Home