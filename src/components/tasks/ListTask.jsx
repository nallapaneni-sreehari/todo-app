import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function ListTask({ setShowToast, setToastProps, props }) {
  const [todoList, setTodoList] = useState([]);
  const listFetched = useRef(false);

  const fetchTodoList = async () => {
    const data = await fetch(
      "https://656c51e3e1e03bfd572e307d.mockapi.io/api/v1/tasks"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTodoList(data);
      })
      .catch((e) => {
        console.log("Error while fetching data :: ", e);
        setTodoList(data);
      });
  };
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
        <div className="w-3/5 flex gap-10 items-center">
          <input
            className="w-1/2 px-6 py-4 border border-gray-400 rounded-xl"
            type="text"
            name="search"
            id="search"
            placeholder="Search for task"
          />
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
            <button className="flex gap-3 justify-between items-center hover:bg-gray-700 ease-in duration-300 hover:text-white rounded-xl border border-gray-400 px-6 py-4">
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
            <button className="hover:bg-indigo-700 ease-in duration-300 hover:text-white rounded-xl border border-gray-400 px-6 py-4">
              All
            </button>
            <button className="hover:bg-indigo-700 ease-in duration-300 hover:text-white rounded-xl border border-gray-400 px-6 py-4">
              Pending
            </button>
            <button className="hover:bg-indigo-700 ease-in duration-300 hover:text-white rounded-xl border border-gray-400 px-6 py-4">
              Completed
            </button>
          </div>
        </div>
        {/* Each task list */}
        <div className="mt-5 gap-12 grid grid-cols-4">
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
