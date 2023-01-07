import { data } from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../contexts/user.context";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import CardList3 from "../CardList3/CardList3.component";
import { DeleteContext } from "../../contexts/delete.context";

const MyCourses =  ()=>{
    const [myCourses, setMyCourses] = useState([]);
    const { currentUser } = useContext(UserContext);
    const { deletePressed } = useContext(DeleteContext); 
useEffect(()=>{
   if(currentUser){
        data(currentUser).then((mycourses)=>{
        console.log(mycourses);
        setMyCourses(mycourses);
        console.log("render3")
        });
    }
    
},[deletePressed]) ;
console.log(deletePressed)
console.log(myCourses, "useState")
    
    
    return(
        <>
        
        <div>
        {
          currentUser?
          ((myCourses!==[])?
          (<CardList3 myCourses={myCourses}/>):(
           <strong>Add courses to see here</strong>
          )
          )
          :(<strong> Please Login to see your courses.</strong>)
        }
        </div>
        </>
    )
}

export default MyCourses;