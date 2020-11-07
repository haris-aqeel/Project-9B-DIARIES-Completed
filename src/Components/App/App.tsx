import React, { FC, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import rootReducer from "../../Store/rootReducer";
import Simpleloader from "../HelpfulComp/Loader_1";

const Login = lazy(() => import("../Auth/Login"));
const SignUp = lazy(() => import("../Auth/SignUp"));
const Home = lazy(() => import("../Home/Home"));
const Entries = lazy(() => import("../Entries/Entries"));
const Page404 = lazy(() => import("../Error/Error"));

const App: FC = () => {
  const isLoggedIn = useSelector(
    (state: ReturnType<typeof rootReducer>) => state.auth.isAuthenticated
  );

  console.log(isLoggedIn)
  return (
    <div>
      <Router>
        <Switch>
        <Suspense fallback={<Simpleloader />}>
          {isLoggedIn ? (
            <>
              <Route path="/">
                <Home />
              </Route>
              <Route path="/diary/:id/*">
                <Entries />
              </Route>
            </>
          ) : (
            <>
              <Route path="/">
                <Login />
              </Route>
              <Route path="/signup">
                <SignUp />
              </Route>
            </>
          )}

          <Route path="/*">
          {/* <Page404 /> */}
          </Route>
        </Suspense>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
