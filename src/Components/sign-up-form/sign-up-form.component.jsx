import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserDocumentFromAuth, createAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../contexts/user.context";
const SignUpForm = ()=>{
    const navigate = useNavigate();
    const {setCurrentUser} = useContext(UserContext);
    const defaultFormFields = {
        displayName : "",
        email : "",
        password : "",
        confirmPassword : "",
    }
    const [formFields, setFormFields] = useState(defaultFormFields);
    const{displayName, email, password, confirmPassword} = formFields;
    
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
        if(confirmPassword!==password){
            console.log("Password and confirm password should be same.");
            return;
        }
        try {
            const response  = await createAuthUserWithEmailAndPassword(email, password);
            const UserDocRef = createUserDocumentFromAuth(response.user, {displayName});
            
            setCurrentUser(response.user);
            setTimeout(() => navigate("/"), 1000);
            resetForm();
        } catch (error) {
            console.log("caught an error while user creation.", error);
        }

        
    }
    return(
        <div>
        <h2 className="text-4xl font-bold my-6 text-center">Sign Up</h2>
        <div className="w-96 h-80 my-6 m-auto rounded-md shadow-xl">
            <form onSubmit={handleSubmit} >
                <input className="border border-gray-400 rounded block m-auto my-3 p-2 w-80" type = "text" placeholder="Name" name="displayName" value={displayName} onChange={handleChange} required/>
                <input className="border border-gray-400 rounded block m-auto my-3 p-2 w-80" type = "email" placeholder="Email address" name="email" value={email} onChange={handleChange} required/>
                <input className="border border-gray-400 rounded block m-auto my-3 p-2 w-80" type = "password" placeholder="Password" name="password" value={password} onChange={handleChange} required/>
                <input className="border border-gray-400 rounded block m-auto my-3 p-2 w-80" type = "text" placeholder="Confirm Password" name="confirmPassword" value={confirmPassword} onChange={handleChange} required/>
                <button type="submit" className="bg-purple-500 hover:bg-purple-400 text-white rounded block m-auto my-3 p-2 w-80">Sign Up</button>
            </form> 
            <div className="text-center m-3">
            <Link to="/sign-in">Already have an account? <span  className="underline " >Sign In</span></Link>
            </div>   
            
            
        </div>
        </div>
    )
}
export default SignUpForm;
