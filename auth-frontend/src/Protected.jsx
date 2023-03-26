import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Protected = ({ children }) => {
  const location = useLocation();
  const token = cookies.get("TOKEN");

  if(!token) {
    return <Navigate to="/" replace state={{from: location}}/>
  }
  return children ? children : <Outlet />;
};
export default Protected;
