import React from "react";
import { useSelector } from "react-redux";

import ReactHtmlParser from "react-html-parser";

export const TaskLeftInforComponent = () => {
  const { taskDetail } = useSelector((state) => state.taskSlice);
  return (
    <div className="task-information">
      <div>
        <p className="text-2xl font-semibold text-blue-900">
          {taskDetail.taskName}
        </p>
        <div className="description">
          <p className="font-semibold">Description</p>
          <p>
            {ReactHtmlParser(taskDetail.description)}
            Before you start work on an issue, you can set a time or other type
            of estimate to calculate how much work you believe it'll take to
            resolve it. Once you've started to work on a specific issue, log
            time to keep a record of it. Open the issue and select Time tracking
            Fill in the Time Spent field Fill in the Time Remaining field and
            click Save
          </p>
        </div>
      </div>
    </div>
  );
};
