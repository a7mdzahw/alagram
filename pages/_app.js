import React from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import store from "../store";

import Header from "../components/Header";
import "../styles/globals.css";
import { Loader } from "semantic-ui-react";
import ProgressBar from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";
import { recieveUser, logoutUser } from "../store/user";
import axios from "axios";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <Root Component={Component} pageProps={pageProps} />
      </Provider>
    </>
  );
}

const Root = ({ Component, pageProps }) => {
  const { isAuth, loading, current } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const get_user = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const { data: user } = await axios.get("api/auth", {
          headers: {
            "auth-token": token,
          },
        });
        dispatch(recieveUser(user));
      } catch (ex) {
        dispatch(logoutUser(ex.message));
      }
    } else {
      dispatch(logoutUser("Logged Out"));
    }
  };

  React.useEffect(() => {
    get_user();
  }, []);

  if (loading)
    return (
      <div
        style={{ display: "flex", justifyContent: "center", height: "75vh", alignItems: "center" }}
      >
        <Loader active size="massive" />
      </div>
    );

  return (
    <>
      <ProgressBar options={{ showSpinner: false }} />
      <Toaster />
      <Header />
      <Component {...pageProps} user={{ current, isAuth }} />
    </>
  );
};

export default MyApp;
