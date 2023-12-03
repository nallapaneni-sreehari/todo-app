import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import CreateTask from "./components/tasks/CreateTask";
import ListTask from "./components/tasks/ListTask";
import NotFound from "./components/NotFound";
import Task from "./components/tasks/Task";
import Login from "./components/user/Login";

function Layout({ setShowToast, setToastProps, props }) {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>

      <Route path="/login" Component={Login}></Route>
      <Route path="/tasks">
        <Route
          path=""
          element={
            <ListTask
              setShowToast={setShowToast}
              setToastProps={setToastProps}
              props={props}
            />
          }
        ></Route>
        <Route path="list">
          <Route
            path=""
            element={
              <ListTask
                setShowToast={setShowToast}
                setToastProps={setToastProps}
                props={props}
              />
            }
          ></Route>
          <Route
            path=":id"
            element={
              <Task
                setShowToast={setShowToast}
                setToastProps={setToastProps}
                props={props}
              />
            }
          ></Route>
        </Route>
        <Route
          path="create"
          element={
            <CreateTask
              setShowToast={setShowToast}
              setToastProps={setToastProps}
              props={props}
            />
          }
        ></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Route>
    </Routes>
  );
}

export default Layout;
