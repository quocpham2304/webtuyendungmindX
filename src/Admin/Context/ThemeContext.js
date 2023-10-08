import { createContext, useState } from "react";

export const ThemeContext = createContext()
    
export default function ThemeContextProvider(props) {
    const [isLogin, setIsLogin] = useState(sessionStorage.getItem('isLogin')?sessionStorage.getItem('isLogin'):false)
    const [userName, setUserName] = useState(sessionStorage.getItem('username')?sessionStorage.getItem('username'):false)

    return (
        <ThemeContext.Provider value={{isLogin, setIsLogin, userName, setUserName}}>
            {props.children}
        </ThemeContext.Provider>
    )
}