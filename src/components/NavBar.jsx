import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function NavBar() {
  const [light, setLight] = useState(true);
  const { isLoaded, isSignedIn, user } = useUser();
  const [currentTheme, setCurrentTheme] = useState("dark");

  console.log(user);

  const handleThemeChange = (event) => {
    const el = document.querySelector("html");

    const theme = el.getAttribute("data-theme") == "light" ? "dark" : "light";

    setCurrentTheme(theme);
    el.setAttribute("data-theme", theme);
  };

  return (
    <nav
      className={`${
        currentTheme == "light" ? "bg-white" : "bg-[#1f2937]"
      } mb-5 fixed top-0 z-[999] w-full h-[70px] shadow-lg px-5 flex justify-between items-center`}
    >
      <div className="">
        <a className="flex gap-1 justify-center items-center" href="/">
          <img
            className="w-10 h-10"
            src="https://cdn3d.iconscout.com/3d/premium/thumb/project-task-management-5374060-4496029.png"
            alt=""
          />
          <span className="text-xl font-[700]">Todor</span>
        </a>
      </div>

      {/* <div className='mb-2 w-full flex gap-5 justify-center items-center'>
                <ul className='menu menu-horizontal font-bold gap-2'>
                    <li>
                        <Link to={'/'}>Home</Link>
                    </li>
                    <li>
                        <Link to={'/tasks'}>Tasks</Link>
                    </li>
                    <li>
                        <Link to={'/about'}>About</Link>
                    </li>
                </ul>
            </div> */}
      <div className="flex gap-5 justify-end items-center">
        <label className="btn swap swap-rotate">
          {/* this hidden checkbox controls the state */}
          <input onClick={handleThemeChange} type="checkbox" />

          {/* sun icon */}
          <svg
            className="swap-on fill-current w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          {/* moon icon */}
          <svg
            className="swap-off fill-current w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
        {isLoaded && isSignedIn ? (
          <div className="btn flex justify-center items-center w-12 h-12">
            <UserButton className="btn"></UserButton>
          </div>
        ) : (
          <div className="w-full">
            <SignInButton
              children={
                <button className="w-28 btn px-4 py-2 rounded-xl flex justify-between items-center">
                  <span className="text-[16px]">Login</span>
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
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                    />
                  </svg>
                </button>
              }
            ></SignInButton>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
