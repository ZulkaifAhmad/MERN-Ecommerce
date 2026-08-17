import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

function OurPolicy() {
  const policies = [
    {
      icon: assets.exchange_icon,
      title: "Easy Exchange Policy",
      desc: "We offer hassle-free exchange policy",
    },
    {
      icon: assets.quality_icon,
      title: "7 Days Return Policy",
      desc: "We provide 7 days free return policy",
    },
    {
      icon: assets.support_img,
      title: "Best Customer Support",
      desc: "We provide 24/7 customer support",
    },
  ];

  return (
    <div className='my-20 px-4 sm:px-8'>
      <div className='flex flex-col sm:flex-row justify-center gap-6 sm:gap-8'>
        {policies.map((item, index) => (
          <div
            key={index}
            className='flex-1  sm:mx-0 flex flex-col items-center text-center gap-2 py-8 px-8 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300'
          >
            <div className='w-12 h-12 flex items-center justify-center rounded-full bg-gray-50'>
              <img
                src={item.icon}
                className='w-6 h-6 object-contain'
                alt={item.title}
              />
            </div>
            <p className='font-semibold text-gray-800 text-sm sm:text-base'>
              {item.title}
            </p>
            <p className='text-gray-500 text-xs sm:text-sm leading-relaxed'>
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OurPolicy