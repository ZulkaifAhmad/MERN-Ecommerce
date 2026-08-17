import React from 'react'
import { assets } from '../assets/frontend_assets/assets.js'

export default function HeroBanner() {
  return (
    <section className="w-full mt-12 sm:mt-4 border border-gray-500 relative overflow-hidden">
      <div className="grid gap-2  grid-cols-1 md:grid-cols-2 min-h-[320px] md:min-h-[420px] ">
        <div className="flex py-10 items-center bg-white px-8 sm:px-10 ">
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-gray-400" />
              <span className="text-xs md:text-sm font-semibold tracking-[0.15em] text-gray-700">
                OUR BESTSELLERS
              </span>
            </div>

            {/* Title */}
            <h1 className="prata-regular text-3xl sm:text-5xl md:text-6xl text-gray-800 leading-tight mb-6">
              Latest Arrivals
            </h1>

            {/* CTA */}
            <button className="flex items-center gap-3 text-xs md:text-sm font-semibold tracking-[0.15em] text-gray-800 hover:text-gray-500 transition-colors">
              <span>SHOP NOW</span>
              <span className="h-px w-8 bg-gray-800" />
            </button>
          </div>
        </div>

        {/* Right: image panel */}
        <div className="relative bg-[#f7d9d9] md:overflow-hidden">
          <img
            src={assets.hero_img}
            alt="Latest arrivals model"
            className="md:h-80 inset-0 w-full md:h-fit object-left object-cover "
          />
        </div>
      </div>
    </section>
  );
}