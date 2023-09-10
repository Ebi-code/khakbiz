/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";
import { useParams, NavLink } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Titlebar from "../../../components/Titlebar/Titlebar";
import { buyersList } from "../../../loadJson";

const Buyer = () => {
  const { buyerId } = useParams();
  const buyer = buyersList.find((buyer) => buyer.id === buyerId);

  return (
    <React.StrictMode>
      <Header />
      <Titlebar
        titleTop={buyer.lastName}
        titleBottom={buyer.name}
        description={buyer.country}
        image={`../${buyer.imageSrc}`}
      />
      <section id={buyerId} className="peoduct-Page-single pb-24">
        <div className="container">
          <div className="flex flex-wrap items-center justify-between px-4 sm:px-0">
            <div className="flex flex-col">
              <h3 className="text-base font-semibold leading-7 text-gray-900">
                Applicant Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                Buyer details and application.
              </p>
            </div>
            <div className="flex -space-x-2 overflow-hidden">
              <img
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                src={`../${buyer.imageSrc}`}
                alt={buyer.lastName}
              />
            </div>
          </div>
          <div className="mt-6 mb-10 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm uppercase font-medium leading-6 text-gray-900">
                  Full name
                </dt>
                <dd className="mt-1 text-sm capitalize bold leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {`${buyer.name} ${buyer.lastName}`}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm uppercase font-medium leading-6 text-gray-900">
                  Country
                </dt>
                <dd className="mt-1 text-sm capitalize leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {buyer.country}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm uppercase font-medium leading-6 text-gray-900">
                  Email address
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {buyer.email}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm uppercase font-medium leading-6 text-gray-900">
                  Phone
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {buyer.phone}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm uppercase font-medium leading-6 text-gray-900">
                  About
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {buyer.about}
                </dd>
              </div>
              {buyer.contracts.length > 0 && (
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm uppercase font-medium leading-6 text-gray-900">
                    contract list
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <ol className="list-inside list-decimal">
                      {buyer.contracts.map((contract, index) => (
                        <li key={index}>{contract}</li>
                      ))}
                    </ol>
                  </dd>
                </div>
              )}
            </dl>
          </div>
          {buyer.invoice.length > 0 && (
            <>
              <h3 className="mb-10 pb-5 text-3xl border-b">Invoice list:</h3>
              <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:gap-8">
                {buyer.invoice.map((image, index) => (
                  <img
                    key={index}
                    src={`../${image}`}
                    alt={buyer.buyer}
                    className="rounded-lg bg-gray-100"
                  />
                ))}
              </div>
            </>
          )}
          <div className="mt-5 flex items-center justify-start gap-x-6">
            <NavLink
              to="/buyers"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Back to Buyers List
            </NavLink>
          </div>
        </div>
      </section>
    </React.StrictMode>
  );
};

export default Buyer;
