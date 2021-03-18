import React from "react";
import Link from "next/link";
import { Icon } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../store/user";
import router from "next/router";
import toast from "react-hot-toast";

const Header = () => {
  const { isAuth } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <header>
      <nav className="ui menu">
        <p className="header item">
          <Icon name="connectdevelop"></Icon>ZASOCIAL
        </p>

        <li className="item ml-auto">
          <Icon name="feed"></Icon>
          <Link href="/">FEED</Link>
        </li>
        {!isAuth && (
          <li className="item">
            <Icon name="sign-in"></Icon>
            <Link href="/auth">AUTH</Link>
          </li>
        )}
        {isAuth && (
          <>
            <li className="item">
              <Icon name="user"></Icon>
              <Link href="/profile">PROFILE</Link>
            </li>
            <li className="item" style={{ cursor: "pointer" }}>
              <Icon name="log out"></Icon>
              <a
                onClick={() => {
                  localStorage.removeItem("token");
                  dispatch(logoutUser(null));
                  router.push("/");
                  toast("GoodBye");
                }}
              >
                logout
              </a>
            </li>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
