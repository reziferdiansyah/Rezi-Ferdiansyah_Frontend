import React, { useState } from "react";
import request from "actions/connect";
import logologin from "assets/images/image.png";
import { Box, Text, Flex, Image } from "@chakra-ui/react";

export default function List() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstname] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastName, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState("");

  const onregister = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    if (password !== rePassword) return setError("Password doesn't match");
    request
      .post("/user/register", {
        email,
        firstName,
        lastName,
        username,
        password,
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data.data);
          window.location.href = "/login";
        }
      })
      .catch((err) => {
        const errRespon = err?.response?.data?.msg
        setError( errRespon|| "Network Error");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Flex>
      <Image
        style={{
          width: "50%",
          height: "100%",
          marginRight: "100px",
        }}
        src={logologin}
      />
      <Box>
        <form onSubmit={onregister} style={{ marginTop: "15%" }}>
          <Text style={{ marginRight: "100px" }}>Get’s Started</Text>
          <h6 className="display-6 text-black">Create your account</h6>
          {error && (
            <div className="error-field">
              <span className="display-9">{error}</span>
            </div>
          )}
          <br />
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="exampleInputFirstname" className="form-label">
                First name
              </label>
              <input
                type="text"
                className="form-control"
                aria-label="First name"
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div className="col">
              <label htmlFor="exampleInputLastname" className="form-label">
                Last name
              </label>
              <input
                type="text"
                className="form-control"
                aria-label="Last name"
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
          </div>
          <br />
          <div className="mb-3">
            <label htmlFor="exampleInputUsername" className="form-label">
              Username
            </label>
            <input
              type="Username"
              className="form-control"
              id="exampleInputUsername"
              aria-describedby="emailHelp"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword2" className="form-label">
              Confirm password
            </label>
            ``
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword2"
              onChange={(e) => setRePassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <button
              disabled={isLoading}
              type="submit"
              onSubmit={onregister}
              className="btn btn-success w-100"
            >
              {isLoading ? "Loading..." : "Register now"}
            </button>
          </div>
          <div className="mb-3 text-center">
            Already have account ?{" "}
            <a className="text-info" href="/login">
              Login
            </a>
          </div>
        </form>
      </Box>
    </Flex>
  );
}
