import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import {ReactNode} from "react";

const Layout = ({children}: {children: ReactNode}) => {

  return (
    <div className="p-5 min-h-screen flex flex-col text-dark-blue bg-soft-cream">
      <Header/>
      <main className="grow">{children}</main>
      <Footer/>
    </div>
  );
}

export default Layout;
