import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
const cookies = new Cookies();
const token = cookies.get("TOKEN")

const AuthComponent = () => {
  const [message, setMessage] = useState();
  const navigate = useNavigate();
  const logout = () => {
    cookies.remove("TOKEN", { path: "/" });
    navigate("/");
  }

  useEffect(()=>{
    const configuration = {
      method: "get",
      url: "http://localhost:3000/auth-endpoint",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };

    axios(configuration)
    .then((result) => {
      setMessage(result.data.message)
    })
    .catch((error) => {
      error = new Error();
    })
  },[])

  return (
      <div className="text-center">
          <h1>Auth Component</h1>
          <h3>{message}</h3>
          <Button type="submit" variant="danger" onClick={()=> logout()}>Logout</Button>
      </div>
  );
}
export default AuthComponent