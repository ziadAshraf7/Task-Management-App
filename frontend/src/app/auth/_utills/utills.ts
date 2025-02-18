
import { util } from "@/app/_redux/apiSlice";
import { updateUserInfo } from "@/app/_redux/userSlice";
import { AppDispatch } from "@/app/_types/types";
import Cookies from "js-cookie";


export const logOut = (dispatch : AppDispatch) => {
    Cookies.remove('user')
    dispatch(updateUserInfo(undefined));  
    dispatch(util.resetApiState());
}

