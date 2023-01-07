import { useState, useContext, useEffect,  } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import { getRedirectResult } from "firebase/auth";
import {
    auth,
    signInAuthUserWithEmailAndPassword,
    singnInWithGooglePopup, 
    createUserDocumentFromAuth, 
    singnInWithGoogleRedirect,
 } from '../../utils/firebase/firebase.utils'


const SignInForm = ()=>{
    const navigate = useNavigate();
    const {setCurrentUser} = useContext(UserContext);
    useEffect(()=>async ()=>{
        const response = await getRedirectResult(auth);
        
        
        if(response){
            const UserDocRef = createUserDocumentFromAuth(response.user);
            setCurrentUser(response.user);
            setTimeout(() => navigate("/"), 1000);
        }    
    }, []);
    const logGoogleUser = async ()=>{
        const response = await singnInWithGooglePopup();
        
        const {user}=response;
       
        const UserDocRef = createUserDocumentFromAuth(user);
        setCurrentUser(user);
        setTimeout(() => navigate("/"), 1000);
    }
    const defaultFormFields = {
        email : "",
        password : "",
    }
    const [formFields, setFormFields] = useState(defaultFormFields);
    const{email, password} = formFields;
    const handleChange = (event)=>{
        const{value, name} = event.target;
        setFormFields({...formFields, [name]: value});
       
    }
    const resetForm = ()=>{
        setFormFields(defaultFormFields);
    }
    const handleSubmit = async (event)=>{
        console.log("handleSubmit trigerred");
        event.preventDefault();
        
        try {
            const response  = await signInAuthUserWithEmailAndPassword(email, password);
            setCurrentUser(response.user);
            setTimeout(() => navigate("/"),1000);
            resetForm();
        } catch (error) {
            console.log("caught an error while user creation.", error);
        }

        
    }
    return(
        <>
        <div >
        <h2 className="text-4xl font-bold my-6 text-center">Sign In</h2>
        <div className="w-96 h-96 m-auto my-6 rounded-md shadow-xl">
            <form onSubmit={handleSubmit}>
                <input className="border border-gray-400 rounded block m-auto my-3 p-2 w-80" type = "email" placeholder="Email address" name="email" value={email} onChange={handleChange} required/>
                <input className="border border-gray-400 rounded block m-auto my-3 p-2 w-80" type = "password" placeholder="Password" name="password" value={password} onChange={handleChange} required/>
                <button type="submit" className="bg-purple-500 hover:bg-purple-400 text-white rounded block m-auto my-3 p-2 w-80">Sign In</button>                
            </form>    
            <div className="text-center m-3" >
            <Link className="text-center m-3" to="/sign-up">Create new account? <span  className="underline " >Sign Up</span></Link>
            </div>
            
            <hr />
            <p className="text-center my-2">or</p>
            <button onClick={
                logGoogleUser 
            } className="bg-blue-500 hover:bg-blue-400 text-white rounded block m-auto my-3 p-2 w-80">Sign In with Google PopUp</button>
            <button onClick={singnInWithGoogleRedirect} className="bg-red-500 hover:bg-red-400 text-white rounded block m-auto my-3 p-2 w-80">Sign In with Google Redirect</button>
            
        </div>
        </div>
        
        
        </>
        
    )
}
export default SignInForm;