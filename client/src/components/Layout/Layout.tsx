import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import {ReactNode} from "react";

const Layout = ({children}: {children: ReactNode}) => {

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Header/>
      <main className="grow">{children}</main>
      <Footer/>
    </div>
  );
}

export default Layout;
