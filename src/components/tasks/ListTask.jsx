import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useUser } from "@clerk/clerk-react";

function ListTask({ setShowToast, setToastProps, props }) {
  const [todoList, setTodoList] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [todoListMain, setTodoListMain] = useState([]);
  const [task, setTask] = useState({});
  const { isLoaded, isSignedIn, user } = useUser();

  const listFetched = useRef(false);

  const fetchTodoList = async () => {
    const data = await fetch(
      "https://656c51e3e1e03bfd572e307d.mockapi.io/api/v1/tasks"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTodoList(data);
        setTodoListMain(data);
      })
      .catch((e) => {
        console.log("Error while fetching data :: ", e);

        setTodoList(data);
        setTodoListMain(data);
      });
  };

  const handleTaskChange = (key, val) => {
    let obj = {};
    obj[key] = val;
    setTask((prev) => ({ ...prev, ...obj }));
    console.log("Task :: ", task);
  };

  const createTask = async () => {
    console.log("creating task :: ", task);
    if (!task.title || !task.description) {
      return;
    }
    let payload = { ...task, status: "pending", email: user };
    const data = await fetch(
      "https://656c51e3e1e03bfd572e307d.mockapi.io/api/v1/tasks",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("created :: ", data);
        // setTodoList(data);
        setToastProps({ msg: "Task created" });
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      })
      .catch((e) => {
        console.log("Error while fetching data :: ", e);
        // setTodoList(data);
      });
  };

  function handleFilters(action, value) {
    let data = [];
    console.log("todoListMain :::: ", todoListMain);
    switch (action) {
      case "search":
        setSearchString(value);
        //search for string
        console.log("value ::: ", value);
        if (!value) {
          setTodoList(todoListMain);
          return;
        }
        data = todoListMain.filter((a) =>
          a?.title?.toLowerCase().includes(value.toLowerCase())
        );
        setTodoList(data);
        break;
      case "reset":
        //search for string
        setTodoList(todoListMain);
        break;
      case "all":
        //search for string
        setTodoList(todoListMain);
        break;
      case "completed":
        //search for string
        data = todoListMain.filter((a) => a.status == "completed");
        console.log("data ::: ", data);
        setTodoList(data);
        break;
      case "pending":
        //search for string
        data = todoListMain.filter((a) => a.status == "pending");
        setTodoList(data);
        break;
    }
  }

  useEffect(() => {
    AOS.init();
    if (!listFetched.current) {
      fetchTodoList();
      listFetched.current = true;
    }
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-center items-center mb-5">
        <h1 className="text-3xl font-[600]">Your Tasks</h1>
      </div>
      {/* Search & Filters */}
      <div className="mb-5 w-full flex flex-col justify-center items-center">
        <div className="w-full flex gap-10 items-center">
          <div className="w-full flex justify-between items-center gap-5">
            <button
              onClick={() => document.getElementById("my_modal_3").showModal()}
              className="w-48 text-normal flex px-2 py-2 gap-2 justify-center items-center rounded-xl bg-green-200 hover:bg-green-600 text-green-700 hover:text-white ease-in duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Create a task</span>
            </button>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <h3 className="font-bold text-lg">Create a new task</h3>
                <div className="p-5 flex flex-col gap-5 justify-center items-center">
                  <input
                    className="w-full px-4 py-2 border border-gray-400 rounded-xl"
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Task title"
                    onChange={(e) => {
                      handleTaskChange("title", e.target.value);
                    }}
                  />
                  <textarea
                    className=" w-full px-4 py-2 border border-gray-400 rounded-xl"
                    type="text"
                    name="description"
                    id="description"
                    placeholder="Task description"
                    rows={5}
                    onChange={(e) => {
                      handleTaskChange("description", e.target.value);
                    }}
                  />
                </div>
                <div className="flex justify-end items-center">
                  <button
                    className="mt-5 px-4 py-2 bg-indigo-400 hover:bg-indigo-600 text-white ease-in duration-300 rounded-xl"
                    onClick={createTask}
                  >
                    Create
                  </button>
                </div>
              </div>
            </dialog>

            <div className="flex w-full items-center relative">
              <input
                className="w-full px-4 py-2 border border-gray-400 rounded-xl"
                type="text"
                name="search"
                id="search"
                value={searchString}
                placeholder="Search for a task by name"
                onChange={(e) => {
                  handleFilters("search", e.target.value);
                }}
              />
              {searchString && (
                <button
                  className="flex items-center justify-center btn btn-xs btn-circle btn-outline absolute right-0 mx-2"
                  onClick={(e) => {
                    setSearchString("");
                    handleFilters("all");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
          {/* <select
            className="px-6 py-4 rounded-xl border border-gray-400"
            name="filters"
            id="filters"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select> */}
          <div className="flex items-center gap-2">
            <button
              className="hover:bg-indigo-700 ease-in duration-300 hover:text-white rounded-xl border border-gray-400 px-4 py-2"
              onClick={(e) => {
                handleFilters("pending", "");
              }}
            >
              Pending
            </button>
            <button
              className="hover:bg-indigo-700 ease-in duration-300 hover:text-white rounded-xl border border-gray-400 px-4 py-2"
              onClick={(e) => {
                handleFilters("completed", "");
              }}
            >
              Completed
            </button>
            <button
              className="flex gap-1 justify-between items-center hover:bg-gray-700 ease-in duration-300 hover:text-white rounded-xl border border-gray-400 px-4 py-2"
              onClick={(e) => {
                handleFilters("reset", "");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Reset</span>
            </button>
            <button
              className="hover:bg-indigo-700 ease-in duration-300 hover:text-white rounded-xl border border-gray-400 px-4 py-2"
              onClick={(e) => {
                handleFilters("all", "");
              }}
            >
              All
            </button>
          </div>
        </div>
        {/* Each task list */}
        <div className="w-full mt-5 gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {todoList.length ? (
            todoList.map((task) => {
              return (
                <Task setShowToast={setShowToast} key={task.id} task={task} />
              );
            })
          ) : (
            <>No tasks found !</>
          )}
        </div>
      </div>
    </div>
  );
}

function Task({ task, setShowToast }) {
  console.log("task :: ", task);

  function handleStatusChange(event) {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  }

  let badgeColor =
    task.status == "completed"
      ? "bg-green-200 text-green-600"
      : "bg-orange-200 text-orange-600";
  return (
    <div
      data-aos="zoom-in"
      className="h-64S relative max-w-sm pt-8 pb-5 border border-gray-200 rounded-lg shadow"
    >
      <div
        className={`${badgeColor} flex justify-between items-center gap-1 absolute top-5 right-5 px-1 py-0.5 rounded-xl`}
      >
        {task.status == "completed" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}

        <span className="capitalize">{task.status}</span>
      </div>
      <div className="mt-5 flex flex-col justify-center pb-5 items-start px-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight">
            {task.title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-400">{task.description}</p>
      </div>
      {/* Actions */}
      <div className="px-5 flex justify-between items-center">
        <div className="flex justify-end gap-5 items-center">
          <select
            className="px-4 py-2 rounded-xl outline-none border-none"
            name="status"
            id="status"
            value={task.status}
            onChange={handleStatusChange}
          >
            Status
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="flex justify-end gap-5 items-center">
          {/* <button className="text-indigo-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </button> */}
          <button className="rounded-xl px-4 py-2 hover:bg-indigo-600 bg-indigo-200 text-indigo-600 hover:text-indigo-200 ease-in duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </button>
          <button className="rounded-xl px-4 py-2 hover:bg-rose-600 bg-rose-200 text-rose-600 hover:text-rose-200 ease-in duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ListTask;
