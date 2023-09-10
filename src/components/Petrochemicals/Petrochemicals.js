import React, { useState } from "react";
import { allPetrochemicalsData } from "../../loadJson";
import LoadMoreButton from "../LoadMoreButton/LoadMoreButton";

const Petrochemicals = () => {
  const [showItems, setShowItems] = useState(6);
  const petrochemicalsLength = allPetrochemicalsData.length;
  const slicePetrochemicals = allPetrochemicalsData.slice(0, showItems);

  const showAllHandler = () => {
    setShowItems(petrochemicalsLength);
  };
  const moreHandler = () => {
    setShowItems(showItems + 6);
  };
  const lessHandler = () => {
    setShowItems(3);
  };

  return (
    <section className="relativ petrochemicals-com">
      <div className="container">
        <div className="py-24 sm:py-32">
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Petrochemicals
              </h2>
              <p className="mt-2 text-lg leading-8 text-gray-600">
                All of petrochemicals List
              </p>
            </div>
            <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-10 sm:pt-16 md:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {slicePetrochemicals.map((pc) => (
                <article
                  key={pc.id}
                  className="relative flex max-w-xl flex-col items-start justify-between"
                >
                  <div className="relative aspect-h-1 aspect-w-1 w-full h-72 mb-4 overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                      src={pc.imageSrc}
                      alt={pc.name}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                    <p className="absolute top-2 left-2 z-10 rounded-full bg-gray-50 px-2 py-1 text-xs leading-3 capitalize font-medium text-gray-800 hover:bg-gray-100">
                      {pc.ownership}
                    </p>
                  </div>
                  <div className="w-full flex flex-wrap items-center justify-between gap-x-4 text-xs">
                    <p className="text-gray-500">{pc.phone}</p>
                    <a
                      href="/"
                      className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 capitalize font-medium text-gray-600 hover:bg-gray-100"
                    >
                      {pc.city}
                    </a>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg capitalize font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <a href={pc.website} target="_blank" rel="noreferrer">
                        <span className="absolute inset-0" />
                        Petrocemical: {pc.name}
                      </a>
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                      Email: {pc.email}
                    </p>
                  </div>
                  <div className="w-full relative mt-4 flex items-center gap-x-4">
                    <div className="w-full flex flex-wrap items-center justify-between text-sm leading-6">
                      <p className="font-semibold text-gray-900">
                        <span className="absolute inset-0" />
                        Country:
                        <span className="pl-2 uppercase text-gray-500">
                          {pc.country}
                        </span>
                      </p>
                      <p className="font-semibold text-gray-900">
                        <span className="absolute inset-0" />
                        City:
                        <span className="pl-2 capitalize text-gray-500">
                          {pc.location}
                        </span>
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <LoadMoreButton
              showAllHandler={showAllHandler}
              moreHandler={moreHandler}
              lessHandler={lessHandler}
              showItems={showItems}
              arrLength={petrochemicalsLength}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Petrochemicals;
