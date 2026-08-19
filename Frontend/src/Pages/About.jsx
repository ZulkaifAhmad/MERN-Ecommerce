import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../Components/Title.jsx";
import Subscribe from "../Components/Subscribe.jsx";

export default function About() {
  return (
    <div className="w-full bg-white px-6 py-16 md:px-16">
      <div className="flex justify-center items-center mb-10">
        <Title title1="Contact" title2="Us" />
      </div>
      <div className="mx-auto max-w-6xl">
        {/* Top: image + story */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          <div className="overflow-hidden">
            <img
              src={assets.about_img}
              alt="Flat lay of jeans, sweater, ankle boots, mug and tea packet"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center gap-4 text-sm leading-7 text-gray-600 md:text-base">
            <p>
              Forever was born out of a passion for innovation and a desire to
              revolutionize the way people shop online. Our journey began with a
              simple idea: to provide a platform where customers can easily
              discover, explore, and purchase a wide range of products from the
              comfort of their homes.
            </p>

            <p>
              Since our inception, we've worked tirelessly to curate a diverse
              selection of high-quality products that cater to every taste and
              preference. From fashion and beauty to electronics and home
              essentials, we offer an extensive collection sourced from trusted
              brands and suppliers.
            </p>

            <h3 className="mt-2 font-semibold text-gray-800">Our Mission</h3>

            <p>
              Our mission at Forever is to empower customers with choice,
              convenience, and confidence. We're dedicated to providing a
              seamless shopping experience that exceeds expectations, from
              browsing and ordering to delivery and beyond.
            </p>
          </div>
        </div>

        {/* Why choose us heading */}
        <div className="mb-8 mt-24 flex items-center gap-3 text-xl">
          <span className="text-gray-500">WHY</span>
          <span className="font-semibold text-gray-800">CHOOSE US</span>
          <span className="h-px w-10 bg-gray-700" />
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 border border-gray-200 md:grid-cols-3">
          <FeatureCard
            title="Quality Assurance:"
            description="We meticulously select and vet each product to ensure it meets our stringent quality standards."
          />
          <FeatureCard
            title="Convenience:"
            description="With our user-friendly interface and hassle-free ordering process, shopping has never been easier."
            borderX
          />
          <FeatureCard
            title="Exceptional Customer Service:"
            description="Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority."
          />
        </div>
      </div>
      <div className="mt-35">
      <Subscribe />
      </div>
    </div>
  );
}

function FeatureCard({ title, description, borderX = false }) {
  return (
    <div
      className={`flex flex-col gap-4 p-10 md:p-14 ${
        borderX ? "md:border-x md:border-gray-200" : ""
      } border-t border-gray-200 md:border-t-0`}
    >
      <p className="text-sm font-semibold text-gray-800">{title}</p>
      <p className="text-sm leading-6 text-gray-600">{description}</p>
    </div>
  );
}
