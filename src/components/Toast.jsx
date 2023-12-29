import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useState } from "react";

function Toast({ msg, status }) {
  useState(() => {
    AOS.init();
  }, []);

  return (
    <div
      // data-aos="fade-in"
      className="z-[999] toast toast-end toast-bottom text-xl font-[500]"
    >
      <div className="bg-green-300 flex justify-between items-center alert alert-success">
        <div className="text-green-600 flex gap-2 justify-center items-center">
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
          <span>Task updated</span>
        </div>
        <div className="bg-green-200 w-full h-full rounded-[5px] cursor-pointer">
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Toast;
