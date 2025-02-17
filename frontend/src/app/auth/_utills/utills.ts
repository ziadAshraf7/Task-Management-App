
import { updateUserInfo } from "@/app/_redux/userSlice";
import { userCookieData } from "@/app/_types/types";
import Cookies from "js-cookie";
import { Dispatch } from "react";


export const logOut = (dispatch : Dispatch<{ payload: userCookieData | undefined; type: "user/updateUserInfo" }>) => {
    Cookies.remove('user')
    dispatch(updateUserInfo(undefined));  

}

