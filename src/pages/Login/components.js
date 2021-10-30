import React, { useState } from "react";
import logologin from "assets/images/image.png";
import request from "actions/connect";
import { Box, Text, Flex, Image } from "@chakra-ui/react";

export default function List() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onlogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    request
      .post("/user/login", { username, password })
      .then((res) => {
        if (res.data) {
          const { token } = res.data;
          localStorage.setItem("token", token);
          window.location.href = "/home";
        }
      })
      .catch((err) => {
        const errRespon = err?.response?.data?.msg;
        setError(errRespon || "Network Error");
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
        <form onSubmit={onlogin} style={{ marginTop: "30%" }}>
          <Text>Welcome back</Text>
          <h6 className="display-6 text-black">Login to your account</h6>
          {error && (
            <div className="error-field">
              <span className="display-9">{error}</span>
            </div>
          )}
          <br />
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="Username"
              className="form-control"
              id="usename"
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
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="gridCheck"
            />
            <label className="form-check-label" htmlFor="gridCheck">
              Remember me{" "}
              <a
                href="/login"
                style={{ marginLeft: "110px" }}
                className="text-info"
              >
                {" "}
                Forgot password?
              </a>
            </label>
          </div>
          <br />
          <div className="mb-3">
            <button
              disabled={isLoading}
              type="submit"
              className="btn btn-success w-100"
            >
              {isLoading ? "Loading..." : "Login now"}
            </button>
          </div>
          <div className="mb-3 text-center">
            Dont have an account?{" "}
            <a className="text-info" href="/">
              {" "}
              Register
            </a>
          </div>
        </form>
      </Box>
    </Flex>
  );
}
