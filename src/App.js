import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Loader from "./components/utils/loader.component";
import Home from "./components/home/home.component";
import Login from "./components/login/login.component";
import appwrite from "./service/appwrite";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/user.provider";

function App() {
  const { user, setCurrentUser } = useContext(UserContext);
  const { getAccount } = appwrite;

  const setUser = async () => {
    let user;
    try {
      user = await getAccount();
    } catch (e) {
      console.log(e);
      setCurrentUser(null);
    }
    if (user) setCurrentUser(user);
  };

  useEffect(() => {
    setUser();
  }, []);

  const isLoading = false;
  const isAuthenticated = !!user;
  const PublicRoute = ({ exact, path, children }) =>
    isLoading ? (
      <Loader />
    ) : isAuthenticated ? (
      <Redirect to="/" />
    ) : (
      <Route exact={exact ? true : false} path={path} children={children} />
    );

  const PrivateRoute = ({ exact, path, children }) =>
    isLoading ? (
      <Loader />
    ) : !user ? (
      <Redirect to="/login" />
    ) : (
      <Route exact={exact ? true : false} path={path} children={children} />
    );

  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" children={<Home />} />
        <PublicRoute path="/login" children={<Login />} />
      </Switch>
    </Router>
  );
}

export default App;
