import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full bg-[#E7ECFF] py-24 flex flex-col lg:px-[100px] ">
      <div className="flex justify-between h-1/3 w-full ">
        <p>@Devinsight2024</p>
        <Link to="/co3">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[250px]">
            Get for Your Organization
          </button>
        </Link>
      </div>

      <div className="flex w-full h-1/3 p-5">
        <hr className="w-full bg-gray-600 h-[2px]" />
      </div>
      <div className="flex w-full h-1/3">
        <div className="flex justify-between w-1/3">
          <a href="#home">Home</a>
          <a href="#about-us">About Us</a>
          <Link to ="/cu">
          <a>Contact Us</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
