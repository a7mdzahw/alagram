import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { Form, FormInput, Button } from "semantic-ui-react";
import { recieveUser } from "../store/user";

const initial_state = {
  name: "",
  email: "",
  password: "",
  avatar: "",
};

const Auth = () => {
  const [status, setStatus] = React.useState("login");
  const [data, setData] = React.useState(initial_state);
  const dispatch = useDispatch();
  const handleChange = ({ target }) => {
    setData({ ...data, [target.id]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    if (status === "register") {
      const { data: token } = await axios.post("api/users", data);
      console.log(token);
      localStorage.setItem("token", token);
      const { data: user } = await axios.get("api/auth", { headers: { "auth-token": token } });
      dispatch(recieveUser(user));
    } else {
      const { data: token } = await axios.post("api/auth", {
        email: data.email,
        password: data.password,
      });
      console.log(token);
      localStorage.setItem("token", token);
      const { data: user } = await axios.get("api/auth", { headers: { "auth-token": token } });
      dispatch(recieveUser(user));
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="ui header negative">{status == "login" ? "Sign IN" : "Sign UP"}</h2>
      {status === "register" && (
        <Form.Field>
          <label htmlFor="name">Name</label>
          <FormInput id="name" type="text" value={data.name} onChange={handleChange} />
        </Form.Field>
      )}
      <Form.Field>
        <label htmlFor="email">Email</label>
        <FormInput id="email" type="email" value={data.email} onChange={handleChange} />
      </Form.Field>
      {status === "register" && (
        <Form.Field>
          <label htmlFor="avatar">Avatar</label>
          <FormInput id="avatar" type="text" value={data.avatar} onChange={handleChange} />
        </Form.Field>
      )}
      <Form.Field>
        <label htmlFor="password">Password</label>
        <FormInput id="password" type="password" value={data.password} onChange={handleChange} />
      </Form.Field>
      <Button content="Submit" icon="signup" type="submit" fluid primary />
      {status === "login" ? (
        <p>
          New User <a onClick={() => setStatus("register")}>Sign Up</a> Now
        </p>
      ) : (
        <p>
          Already User <a onClick={() => setStatus("login")}>Sign In</a> Now
        </p>
      )}
    </Form>
  );
};

export default Auth;
