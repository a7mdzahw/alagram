import router from "next/router";
import React from "react";
import Auth from "../components/Auth";
import { Loader } from "semantic-ui-react";

const signUp = ({ user }) => {
  React.useEffect(() => {
    if (user.isAuth) router.push("/");
  }, [user]);
  if (user.isAuth)
    return (
      <div
        style={{ display: "flex", justifyContent: "center", height: "75vh", alignItems: "center" }}
      >
        <Loader active size="massive" />
      </div>
    );
  return (
    <div className="ui container">
      <Auth />
    </div>
  );
};

export default signUp;
