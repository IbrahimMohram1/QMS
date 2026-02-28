import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";


export let AuthContext=createContext();

export default function AuthContextProvider({children}){
  const [loginData,setLoginData]=useState(null);

  let saveLoginData=()=>{
    let encodedToken=localStorage.getItem("accessToken");
    let decodedToken=jwtDecode(encodedToken);
    console.log(decodedToken);
    setLoginData(decodedToken);
  }


  useEffect(()=>{
    if(localStorage.getItem("accessToken")){
      saveLoginData();
    }
  },[]);


    return(
        <AuthContext.Provider value={{saveLoginData,loginData}}>
            {children}
        </AuthContext.Provider>
    )
}