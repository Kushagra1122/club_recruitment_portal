import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="bigfoot">
        <div className=" bg-gray-300 foot z-50 shadow-xl border-t border-black   ">
          <div className="flex justify-between px-10 py-6 text-xl  ">
            <div className="flex gap-3 ">
              <p>&copy; 2024 NITK Clubs Recruitment. All rights reserved.</p>
            </div>
            <div className="flex gap-10 text-xl pr-10 ">
              <div className='hover:underline"'>About us</div>
              <div className='hover:underline"'>Contact us</div>
              <div className='hover:underline"'>FAQs</div>
            </div>
          </div>
        </div>
      </div>
      <div className="smallfoot">
        <div className=" bg-gray-300 foot z-50 shadow-xl border-t border-black   ">
          <div className="flex flex-col items-center gap-5  py-6 text-md  ">
            <div className="flex gap-5 ">
              <p>&copy; 2024 NITK Clubs . All rights reserved.</p>
            </div>
            <div className="flex gap-10 text-md pr-10 ">
              <div className='hover:underline"'>About us</div>
              <div className='hover:underline"'>Contact us</div>
              <div className='hover:underline"'>FAQs</div>
            </div>
          </div>
        </div>
      </div>
    
    </div>
  );
};

export default Footer;
