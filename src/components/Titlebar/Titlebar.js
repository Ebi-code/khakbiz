import React from "react";

import titlebarImg from "../../assets/images/titlebar.jpg";

const Titlebar = ({ titleTop, titleBottom, description, image }) => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="relative isolate justify-between overflow-hidden bg-gray-900 pt-16 shadow-2xl sm:rounded-3xl md:pt-24 lg:flex lg:gap-x-20 lg:pl-24 lg:pt-0">
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            aria-hidden="true"
          >
            <circle
              cx={512}
              cy={512}
              r={512}
              fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
          <div className="w-3/4 relative mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="text-3xl capitalize font-bold tracking-tight text-white sm:text-4xl">
              {titleTop}
              <br />
              <span className="block pt-2 uppercase text-2xl">
                {titleBottom}
              </span>
            </h2>
            <p className="mt-6 text-lg capitalize leading-8 text-gray-300">
              {description}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <a
                href="/"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get Home
              </a>
              {/* <a
                href="/petrochemicals"
                className="text-sm font-semibold leading-6 text-white"
              >
                Learn more <span aria-hidden="true">→</span>
              </a> */}
            </div>
          </div>
          <div className="w-1/2 relative mt-16 lg:mt-8">
            <img
              className="absolute right-0 top-0 w-full h-full object-cover max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
              src={image ? image : titlebarImg}
              alt="App screenshot"
              width={1824}
              height={1080}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Titlebar;
