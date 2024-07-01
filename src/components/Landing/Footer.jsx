// import React from "react";
// import { Link } from "react-router-dom";

// const Footer = () => {
//   return (
//     <div className="w-full bg-[#E7ECFF] py-24 flex flex-col lg:px-[100px] ">
//       <div className="flex justify-between h-1/3 w-full ">
//         <p>@Devinsight2024</p>
//         <Link to="/co3">
//           <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[250px]">
//             Get for Your Organization
//           </button>
//         </Link>
//       </div>

//       <div className="flex w-full h-1/3 p-5">
//         <hr className="w-full bg-gray-600 h-[2px]" />
//       </div>
//       <div className="flex w-full h-1/3">
//         <div className="flex justify-between w-1/3">
//           <a href="#home">Home</a>
//           <a href="#about-us">About Us</a>
//           <Link to ="/cu">
//           <a>Contact Us</a>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Footer;

import React from "react";
import { Link } from "react-router-dom";
import Devinsight from '../../assets/Devinsight.png';

const Footer = () => {
  return (
    
    <footer className="p-4 bg-gray-50 sm:p-6 dark:bg-gray-800">
      <div className="mx-auto max-w-screen-3xl">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="#home" className="flex items-center">
              <img
                src={Devinsight}
                className="mr-3 h-8"
                alt="FlowBite Logo"
              />
              
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-4">
            <div>
              
              <ul className="text-gray-600 dark:text-gray-400">
                
                <li>
                  <a href="#" className="hover:underline">
                    Home
                  </a>
                </li>
              </ul>
            </div>
            <div>
              
              <ul className="text-gray-600 dark:text-gray-400">
                
                <li>
                  <a href="#" className="hover:underline">
                   Features
                  </a>
                </li>
              </ul>
            </div>
            <div>
              
              <ul className="text-gray-600 dark:text-gray-400">
                
                <li>
                  <a href="#" className="hover:underline">
                   About us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              
              <ul className="text-gray-600 dark:text-gray-400">
                
                <li>
                  <a href="#" className="hover:underline">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024{' '}
            <a href="#" className="hover:underline">
              DevInsight
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M24 4.556v14.888A4.56 4.56 0 0119.444 24H4.556A4.56 4.56 0 010 19.444V4.556A4.56 4.56 0 014.556 0h14.888A4.56 4.56 0 0124 4.556zM9.365 19.125v-8.286h-2.6v8.286h2.6zm-1.3-9.506c.852 0 1.54-.688 1.54-1.54 0-.853-.688-1.541-1.54-1.541-.853 0-1.541.688-1.541 1.54 0 .853.688 1.541 1.54 1.541zm11.507 9.506v-4.485c0-1.08-.387-1.818-1.347-1.818-.735 0-1.17.5-1.362 1.003-.07.17-.09.403-.09.636v4.664h2.6v-4.665c0-.406-.014-.785-.027-1.159-.093-.375-.337-.667-.68-.8-.433-.18-1.023-.224-1.323-.198v7.822h2.6zm-2.812-6.047c0-1.427-.473-2.575-1.36-2.575-.693 0-1.16.513-1.356.978-.05.116-.071.246-.071.377v4.214h-2.6v-8.285h2.6v1.137c.447-.657 1.174-1.384 2.23-1.384 1.517 0 2.68 1.07 2.68 3.373v5.159h-2.6v-4.214zm0 0h-.001z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
