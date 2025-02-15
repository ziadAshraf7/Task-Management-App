import { cookies } from "next/headers";
import { userCookieData } from "../_types/types";
import { userCookieKey } from "./utills";


export const exctractServerSideUserCookie = () : userCookieData | null => {
    const cookieStore = cookies();
       
       const userCookieData = cookieStore.get(userCookieKey)?.value ;
       
       const parsedToken = userCookieData && JSON.parse(userCookieData)
    
       return parsedToken
    }