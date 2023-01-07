import { createContext, useState } from "react";

export const DeleteContext = createContext({
    deletePressed:1,
    setDeletePressed: ()=>1,
});

export const DeleteProvider = ({children})=>{
    const [deletePressed, setDeletePressed] = useState(1);
    const value =  {deletePressed, setDeletePressed}
    return(<DeleteContext.Provider value={value}>{children}</DeleteContext.Provider>)
}   