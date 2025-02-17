import { userCookieData } from "../_types/types";
import Cookies from "js-cookie";



export const extractUserData = (): userCookieData | null => {
    try {
        const userCookie = Cookies.get("user");
        if (!userCookie) return null;
        
        return JSON.parse(userCookie) as userCookieData;
    } catch (error) {
        console.error("Failed to parse user cookie:", error);
        return null;
    }
};3


export const getDefaultHeaders = () => {
    
    const headers : {"Content-Type" : string} = {
        "Content-Type": "application/json",
    }
    
    return headers
}



export const userCookieKey = 'user'