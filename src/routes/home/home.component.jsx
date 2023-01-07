import Img from "../../background.jpg"
import { Link } from "react-router-dom";
const Home = ()=>{
    return(
        <>
        
            <img src={Img} className="h-[90vh] w-[100vw] -z-1 absolute"/>
            <div className="relative h-[60vh] w-[70vw]  top-[45px] left-[200px] font-['Lobster'] ">
              <p className="text-4xl text-center p-6 ">Only you have to know one thing:
              </p>  
              <p className="text-7xl text-center text-white">You can learn anything</p>
              <p className="text-white text-center">For Free. For Everyone. For Forever
              </p>
              
            <Link to="courses">
             <div className="w-[150px] mt-5 rounded  m-auto bg-purple-600"> 
              <p className="text-white p-2">Start learning now</p></div></Link>
             
            </div>
            

        </>
       
        
    )
}
export default Home;