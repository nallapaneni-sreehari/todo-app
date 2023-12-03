import React from "react";

function ListTask() {
  return (
    <div className="w-full">
      <div className="p-5 flex justify-center items-center">
        <h1 className="text-3xl font-[600]">Your Tasks</h1>
      </div>
      <div className="w-full flex flex-col justify-center items-center">
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
        <div className="mt-5 gap-12 grid grid-cols-4">
          <Task />
          <Task />
          <Task />
          <Task />
          <Task />
          <Task />
          <Task />
        </div>
      </div>
    </div>
  );
}

function Task(task) {
  return (
    <div class="max-w-sm p-6 border border-gray-200 rounded-lg shadow">
      <div className="relative flex flex-col justify-center pb-5 items-start px-5">
        <a href="#">
          <h5 class="mb-2 text-2xl font-bold tracking-tight">
            Buy a tooth brush
          </h5>
        </a>
        <p class="mb-3 font-normal text-gray-400">
          Need to go to super market and buy items
        </p>
        <div className="absolute top-0 right-0 badge badge-success badge-lg">
          Completed
        </div>
      </div>
      {/* Actions */}
      <div className="flex justify-between items-center">
        <div className="flex justify-end gap-5 items-center">
          <select
            className="px-4 py-2 rounded-xl outline-none border-none"
            name="status"
            id="status"
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
