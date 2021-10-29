import { useContext } from "react";
import { UserContext } from "../../context/user.provider";
import appwrite from "./../../service/appwrite";

import "./home.css";

const Home = () => {
  const { logOut } = appwrite;
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <div className="home">
      <header>
        {/* <img src={user?.image} alt="User" /> */}
        <p>Welcome, {user?.name}</p>
        <button onClick={logOut}>SIGN OUT</button>
      </header>
    </div>
  );
};

export default Home;
