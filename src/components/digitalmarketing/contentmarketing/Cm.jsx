import React, { useEffect } from "react";
import AOS from "aos"; // Import AOS here
import "aos/dist/aos.css";

function Cm() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  return (
    <>
      <div 
      data-aos="fade-right"
      className="lg:mt-10 my-4 mx-1 lg:mx-4">
        <div 
        
        className="text-center">
          <p 
           data-aos="flip-up"
          className="lg:text-3xl text-2xl bg-gradient-to-r from-[#00ceff] to-[#0072ff] inline-block text-transparent bg-clip-text">
            CONTENT MARKETING
          </p>
        </div>

        <div 
         data-aos="fade-right"
        className="text-sm lg:text-xl mt-6 mx-2 lg:mx-6">
          <p>
            Our content writers excel at turning complicated concepts into
            compelling, practical content that aligns with your broader
            marketing objectives. Our experience in market research enables us
            to communicate effectively with your target audience and engage with
            key business leaders and decision-makers. We conduct research, speak
            with experts from your team, conduct further research, and identify
            the special perspective that will make your content distinct.
          </p>
        </div>
      </div>
    </>
  );
}

export default Cm;
