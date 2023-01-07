import { createContext, useState } from "react";

export const PlayedContext = createContext({
    played:0,
    setPlayed: ()=>0,
});

export const PlayedProvider = ({children})=>{
    const [played, setPlayed] = useState(0);
    const value =  {played, setPlayed}
    return(<PlayedContext.Provider value={value}>{children}</PlayedContext.Provider>)
}   