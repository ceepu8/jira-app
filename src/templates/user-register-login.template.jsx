import React from "react";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

export const UserRegisterLoginTemplate = (props) => {
  return (
    <div>
      <ToastContainer />
      <div className="grid grid-cols-3 h-screen">
        <div className="col-span-2">
          <img
            src="/images/bg-jira.jpg"
            alt="..."
            className="w-full h-full object-cover"
          />
        </div>
        <Outlet />
      </div>
    </div>
  );
};
