import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import request from "actions/connect";
import {
  Spinner,
  Center,
  Stack,
  Box,
  Menu,
  MenuButton,
  MenuItem,
  Portal,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import Navbar from "../Navbar";
import "./Home.css";
import moment from "moment";
import Form from "./form";
import { toastObj } from "utils";

export default function Card() {
  const [username, setUsername] = useState("");
  const [data, setData] = useState([]);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isPost, setIsPost] = useState(false);
  const toast = useToast();
  const handlePost = (e) => {
    setError("");
    e.preventDefault();
    if (!content) return setError("Content cannot be empty");
    setIsLoading(true);
    request
      .post("/post/create", { content })
      .then(() => toast(toastObj("Create post success")))
      .then(() => toast(toastObj("Network Error", "error")))
      .finally(() => {
        setContent("");
        setIsLoading(false);
        setError("");
        setIsPost(!isPost);
      });
  };
  const handleDelete = (id) => {
    setIsLoadingDelete(true);
    request
      .delete(`/post/delete/${id}`)
      .then(() => toast(toastObj("Delete post success", "success")))
      .catch(() => toast(toastObj("Delete post failed", "error")))
      .finally(() => {
        setContent("");
        setIsLoadingDelete(false);
        setIsPost(!isPost);
      });
  };
  useEffect(() => {
    setIsLoading(true);
    let isMounted = true;
    request
      .get("/post/get")
      .then((res) => {
        setError("");
        if (isMounted) setData(res.data.data);
      })
      .catch((err) => setError(err.message))
      .finally(() => {
        setIsLoading(false);
      });
    request.get("/user/get").then((res) => {
      setUsername(res.data.data.username);
      localStorage.setItem("username", res.data.data.username);
    });
    return () => {
      isMounted = false;
    };
  }, [isPost]);
  if (!localStorage.getItem("token")) return <Redirect to="/login" />;
  return (
    <div className="bg">
      <Navbar />
      <br />
      <div className="container">
        {error && (
          <div className="error-field">
            <span className="display-9">{error}</span>
          </div>
        )}
        {isLoading ? (
          <Center mt="30px">
            <Spinner size="xl" />
          </Center>
        ) : (
          <>
            <h6 className="display-6 text-black">Update your activity</h6>
            <br />
            <Form
              handleCancel={() => setContent("")}
              setContent={setContent}
              content={content}
              handlePost={handlePost}
            />
            <br />
            {data.map((item, i) => (
              <Box key={item._id} opacity={isLoadingDelete ? 0.5 : 1}>
                <div className="card">
                  <div className="card-body">
                    <Stack direction="row" justifyContent="space-between">
                      <h5 className="card-title">{item.author}</h5>
                      <Menu>
                        <MenuButton>...</MenuButton>
                        <Portal position="absolute" rigth="-50px">
                          <MenuList
                            zIndex="999"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <MenuItem
                              onClick={() => handleDelete(item._id)}
                              color="red"
                            >
                              Delete
                            </MenuItem>
                          </MenuList>
                        </Portal>
                      </Menu>
                    </Stack>
                    <h5>{username}</h5>
                    <p className="card-text">{item.content}</p>
                  </div>
                  <div className="card-header">
                    {moment(item.created_at).format("lll")}
                  </div>
                </div>
                <br />
              </Box>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
