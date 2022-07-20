import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import { getDetailProject } from "apis/project.management.apis";
import { SpinnerComponent } from "components/spinner/spinner.component";
import { setProjectDetail } from "redux/slices/projectSlice";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { SearchBarComponent } from "./search-bar/search-bar.component";
import { TrayListComponentTest } from "./tray-list/tray-list-test.component";
import { TrayListComponent } from "./tray-list/tray-list.component";
import { fetchProjectDetail } from "../../redux/slices/projectSlice";

export const ProjectDetailPage = () => {
  const dispatch = useDispatch();
  const { projectDetail, isLoading } = useSelector(
    (state) => state.projectSlice
  );
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    dispatch(fetchProjectDetail(id));
  }, []);

  if (isLoading) {
    return <SpinnerComponent />;
  }

  return (
    <div className="p-[10px]">
      <BreadcrumbComponent projectName={projectDetail.projectName} />
      <SearchBarComponent />
      {/* <TrayListComponent projectDetail={projectDetail} /> */}
      <TrayListComponentTest projectDetail={projectDetail} />
    </div>
  );
};
