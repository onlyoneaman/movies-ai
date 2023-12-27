import { useEffect, useState } from "react";
import api from "./helpers/api";
import MoviesDirectory from "./components/MoviesDirectory";
import Layout from "./components/Layout";

const App = () => {
  const [init, setInit] = useState(false);

  const mount = async () => {
    await api.init();
    setInit(true);
  }

  useEffect(() => {
    mount();
  }, [])

  if(!init) {
    return (
      <Layout>
        <div className="w-full text-center">
          <h1 className="text-3xl text-center font-bold underline">
            Loading...
          </h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="w-full h-full">
        <div>
          <MoviesDirectory />
        </div>
      </div>
    </Layout>
  );
}

export default App;
