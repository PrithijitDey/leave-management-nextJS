import type { NextPage } from "next";

import Header from "../shared/components/layout/Header/Header";
import Dashboard from "./Dashboard";

import "../firebase.config";
import { useAuth } from "../shared/context/AuthContext";

const Home: NextPage = () => {
  const { isLoggedIn } = useAuth();

  return (
    <>
      {isLoggedIn && <Header />}

      <main className="main">
        <Dashboard />
      </main>
    </>
  );
};

export default Home;
