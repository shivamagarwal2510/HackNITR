import React from "react";
import Card3 from "../Card3/Card3.component";

const CardList3 = ({myCourses})=>{
    
    return(
        <>
        
        <div className="cardList flex flex-col flex-wrap ">
        
            <div className="cards flex flex-wrap m-auto w-[95vw]">
            {
                myCourses.map(myCourse=>{
                    
                    return(
                        <Card3 playlist={myCourse}/>
                    )
                })
            }
            </div>
        </div>
        </>
    )
}

export default CardList3;