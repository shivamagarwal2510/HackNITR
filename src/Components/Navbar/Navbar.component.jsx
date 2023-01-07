import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
const Navbar = () => {
  const {currentUser, setCurrentUser} = useContext(UserContext);

  const signOutHandler = async ()=>{
    await signOutUser();
    setCurrentUser(null);
    
  }
  return (
    <>
      <nav className="flex shadow-md items-center justify-between">
        <Link to="/">
          <strong className="mx-16 text-xl">AcadBoost</strong>
        </Link>

        <ul className=" px-2 py-4 flex space-x-8 justify-center items-center">
          <li className="hover:underline underline-offset-8 hover:font-bold ">
            
            <Link to="/">Home</Link>
          </li>
          <li className="hover:underline underline-offset-8 hover:font-bold">
            
            <Link to="/courses">Courses</Link>
          </li>
          
          <li className="hover:underline underline-offset-8 hover:font-bold">
            <Link to="/my-courses">My Courses</Link>
            
          </li>
        </ul>
        <ul className="flex items-center">
          <li>
            {
              
              currentUser?
                (<Link to="/" onClick={signOutHandler} className="mx-5">
                SIGN OUT
              </Link>
                ):
                (<Link to="/sign-in" className="mx-5">
              SIGN IN
            </Link>)
              
            }
            
          </li>
          <li>
            <button className="order-2 bg-purple-500 hover:bg-purple-400 text-white text-sm rounded-2xl px-4 py-2 mx-16 my-2">
              CONTACT US
            </button>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};
export default Navbar;
