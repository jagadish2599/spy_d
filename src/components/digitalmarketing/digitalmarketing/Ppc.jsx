import React from "react";
import ppc from "../../../assets/digitalmarketing/ppc.png";
import { Link } from "react-router-dom";
function Ppc() {
  return (
    <>
      <div className="lg:mx-4 mt-4">
        <div className=" flex lg:flex-row flex-col justify-around items-center">
          <div className="">
            <img className="float-end w-96 h-96" src={ppc} />
          </div>
          <div className="lg:w-1/2 w-full p-2 h-auto">
            <p className="lg:text-3xl text-xl mb-6 bg-gradient-to-r from-[#00ceff] to-[#0072ff] inline-block text-transparent bg-clip-text">
              Pay Per Click (PPC) Marketing
            </p>
            <p className="">
              Paid search marketing, also known as PPC, offers a fast and
              controllable way to ensure your website appears at the top of
              search results for relevant searches. We apply our deep expertise
              in PPC best practices to find creative strategies that can assist
              in the growth of your business.
            </p>
            <Link to="/digitalmarketing/Ppc">
              <button className="mt-6 px-6 py-3 bg-gradient-to-r from-[#38bdf8] to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg ">
                Read More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Ppc;
