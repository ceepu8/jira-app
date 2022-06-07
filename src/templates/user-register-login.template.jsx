import React from "react";

export const UserRegisterLoginTemplate = (propsRoute) => {
  let { Element } = propsRoute;

  return (
    <div>
      <div className="grid grid-cols-3 h-screen">
        <div className="col-span-2">
          <img
            src="./images/bg-jira.jpg"
            alt="..."
            className="w-full h-full object-cover"
          />
        </div>
        <Element />
      </div>
    </div>
  );
};
