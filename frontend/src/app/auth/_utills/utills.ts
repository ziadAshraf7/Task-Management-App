
import Cookies from "js-cookie";


export const logOut = () => {
    Cookies.remove('user')
}

