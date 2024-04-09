import React from "react";

const Footer = () => {
  return (
    <div className="w-full bg-[#E7ECFF] py-24 flex flex-col lg:px-[100px] ">
      <div className="flex justify-between h-1/3 w-full ">
        <p>@Devinsight2024</p>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[250px]">
          Get for Your Oganization
        </button>
      </div>

      <div className="flex w-full h-1/3 p-5">
        <hr className="w-full bg-gray-600 h-[2px]" />
      </div>
      <div className="flex w-full h-1/3">
        <div className="flex justify-between w-1/3">
            <p>
                Home
            </p>
            <p>
                About Us
            </p>
            <p>
                Contact Us
            </p>


        </div>
        <div className="flex">

        </div>
      </div>
    </div>
  );
};

export default Footer;
