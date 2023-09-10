/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import LoadMoreButton from "../LoadMoreButton/LoadMoreButton";
import { buyersList } from "../../loadJson";

const Buyers = () => {
  const [showItems, setShowItems] = useState(1);
  const petrochemicalsLength = buyersList.length;
  const slicePetrochemicals = buyersList.slice(0, showItems);

  const showAllHandler = () => {
    setShowItems(petrochemicalsLength);
  };
  const moreHandler = () => {
    setShowItems(showItems + 1);
  };
  const lessHandler = () => {
    setShowItems(1);
  };
  return (
    <section className="relative buyers-com">
      <div className="container">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Buyers
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            All of Buyers List
          </p>
        </div>
        <ul
          role="list"
          className="divide-y divide-gray-100 mt-8 border-t border-gray-200 pt-10 sm:mt-10 sm:pt-16"
        >
          {slicePetrochemicals.map((person) => (
            <li
              key={person.email}
              className="flex flex-wrap justify-between gap-x-6 py-5"
            >
              <div className="flex min-w-0 gap-x-4">
                <img
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  src={person.imageSrc}
                  alt=""
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    <NavLink to="/buyers/buyer/buyerId">
                      {`${person.name} ${person.lastName}`}
                    </NavLink>
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {person.email}
                  </p>
                </div>
              </div>
              <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">
                  {person.country}
                </p>
                <p className="text-sm leading-6 text-gray-900">
                  {person.phone}
                </p>
                {person.connect === "connected" ? (
                  <div className="mt-1 flex items-center gap-x-1.5">
                    <p className="text-xs leading-5 text-gray-500">
                      Is Customer
                    </p>
                    <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </div>
                    {/* <p className="text-xs leading-5 text-gray-500">Online</p> */}
                  </div>
                ) : (
                  <div className="mt-1 flex items-center gap-x-1.5">
                    <p className="text-xs leading-5 text-gray-500">Buyer</p>
                    <div className="flex-none rounded-full bg-rose-500/20 p-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                    </div>
                  </div>
                  // <p className="mt-1 text-xs leading-5 text-gray-500">
                  //   Last seen{" "}
                  //   <time dateTime={person.lastSeenDateTime}>
                  //     {person.lastSeen}
                  //   </time>
                  // </p>
                )}
              </div>
            </li>
          ))}
        </ul>
        <LoadMoreButton
          showAllHandler={showAllHandler}
          moreHandler={moreHandler}
          lessHandler={lessHandler}
          showItems={showItems}
          arrLength={petrochemicalsLength}
        />
      </div>
    </section>
  );
};

export default Buyers;
