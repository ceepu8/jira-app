import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getAllUserActionService } from "../../redux/slices/userSlice";

export const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUserActionService());
  });

  return (
    <div>
      <span className="text-[24px] font-medium px-[20px]">Home Page</span>
    </div>
  );
};
