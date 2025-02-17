
import "./globals.css";
import {HeroUIProvider} from "@heroui/system";
import { exctractServerSideUserCookie } from "./_utills/serverSideUttils";
import StoreProvider from "./_components/storeProvider";
import UserStore from "./_components/userStore";
import { userCookieData } from "./_types/types";


export default function RootLayout({
  children,
}: {
  children : React.ReactNode , 
}) {
 
  const userData : userCookieData | null = exctractServerSideUserCookie()
  
  return (
    <html lang="en">
      <body
      >
        <StoreProvider >
          <UserStore user = {userData}>
            <HeroUIProvider>
              {children}
            </HeroUIProvider>
          </UserStore>

        </StoreProvider>

        </body>
    </html>
  );
}
