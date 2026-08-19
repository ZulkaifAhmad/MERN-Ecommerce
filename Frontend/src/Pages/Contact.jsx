import React from "react";
import {assets} from '../assets/frontend_assets/assets.js'
import Title from '../Components/Title.jsx'
import Subscribe from '../Components/Subscribe.jsx'

export default function Contact() {
  return (
    <div className="w-full bg-white px-6 py-10 md:px-16">
      <div className="flex justify-center items-center mb-10">
      <Title title1="Contact" title2='Us'/>
      </div>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
        {/* Left: image */}
        <div className="overflow-hidden">
          <img
            src={assets.contact_img}
            alt="Desk with laptop, phone, coffee and a succulent plant"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right: content */}
        <div className="flex flex-col justify-center gap-8 text-gray-600">
          <div>
            <h2 className="mb-6 text-2xl font-semibold text-gray-700 md:text-3xl">
              Our Store
            </h2>
            <p className="leading-7">
              54709 Willms Station
              <br />
              Suite 350, Washington, USA
            </p>
          </div>

          <div>
            <p className="leading-7">Tel: (415) 555-0132</p>
            <p className="leading-7">Email: admin@forever.com</p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-semibold text-gray-700 md:text-2xl">
              Careers at Forever
            </h3>
            <p className="leading-7">
              Learn more about our teams and job openings.
            </p>
          </div>

          <button className="w-fit border border-gray-800 px-8 py-4 text-sm font-medium text-gray-800 cursor-pointer transition-colors duration-300 hover:bg-gray-800 hover:text-white">
            Explore Jobs
          </button>
        </div>
      </div>
      <div className="mt-35">
      <Subscribe />
      </div>
    </div>
  );
}