
import { updateUserInfo } from "@/app/_redux/userSlice";
import Cookies from "js-cookie";
import { Dispatch } from "react";


export const logOut = (dispatch : Dispatch<any> ) => {
    Cookies.remove('user')
    dispatch(updateUserInfo(null));  

}

