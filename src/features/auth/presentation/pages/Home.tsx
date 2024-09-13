import { useNavigate } from "react-router-dom";

function Home() {


    const navigate = useNavigate();
    try{
    }catch(e){
        navigate('/');
    }

  return (
    <>
    <div>Home Page</div>
    {/* <div>{user?.name}</div> */}
    </>
  )
}

export default Home