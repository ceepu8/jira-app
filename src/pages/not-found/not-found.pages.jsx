import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="font-semibold text-5xl">404</h1>
        <p className="text-2xl">Oops! Not Found Page</p>
        <button
          className="bg-black text-white p-2 rounded hover:bg-gray-800"
          onClick={() => navigate(-1)}
        >
          Quay về trang cũ
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
