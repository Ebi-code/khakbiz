/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";
import { useParams, NavLink } from "react-router-dom";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import Header from "../../../components/Header/Header";
import Titlebar from "../../../components/Titlebar/Titlebar";
import { products } from "../../../loadJson";

const Product = () => {
  const { productId } = useParams();
  const product = products.find((product) => product.id === productId);

  const features = [
    { name: "Trade Name", description: product.tradeName },
    {
      name: "Grade",
      description: product.grade,
    },
    { name: "Petrochemical", description: product.petrochemical },
    {
      name: "Country",
      description: product.country,
    },
  ];

  return (
    <React.StrictMode>
      <Header />
      <Titlebar
        titleTop={product.product}
        titleBottom={`${product.tradeName} - ${product.grade}`}
        image={`../${product.imageSrc[0]}`}
      />
      <section id={productId} className="peoduct-Page-single">
        <div className="container">
          <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
            <div>
              <h2 className="text-3xl uppercase font-bold tracking-tight text-gray-900 sm:text-4xl">
                {product.product}
              </h2>

              <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:gap-y-16 lg:gap-x-8">
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-medium text-gray-900">Application</h4>
                  <ul className="mt-4 ml-5 text-gray-500 list-disc pr-5">
                    {product.application.map((app, index) => (
                      <li key={index} className="mb-5">
                        {app}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                {features.map((feature) => (
                  <div
                    key={feature.name}
                    className="border-t border-gray-200 pt-4"
                  >
                    <dt className="font-medium text-gray-900">
                      {feature.name}
                    </dt>
                    <dd className="uppercase mt-2 text-sm text-gray-500">
                      {feature.description}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:gap-y-16 lg:gap-x-8">
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-medium text-gray-900">Packing</h4>
                  <ul className="mt-4 ml-5 text-gray-500 list-disc pr-5">
                    {product.packing.map((pack, index) => (
                      <li key={index} className="mb-5">
                        {pack}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex items-center border-t border-gray-200 pt-6 mt-8">
                <ul
                  role="list"
                  className="w-full divide-y divide-gray-100 rounded-md border border-gray-200"
                >
                  <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                    <div className="flex w-0 flex-1 items-center">
                      <PaperClipIcon
                        className="h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <div className="ml-4 flex min-w-0 flex-1 gap-2">
                        <span className="truncate font-medium">Datasheet</span>
                        <span className="flex-shrink-0 text-gray-400">
                          view
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <a
                        href={product.datasheet}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Download
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
              {product.imageSrc.map((image, index) => (
                <img
                  key={index}
                  src={`../${image}`}
                  alt={product.product}
                  className="rounded-lg bg-gray-100"
                />
              ))}
            </div>
            <div className="mt-5 flex items-center justify-start gap-x-6">
              <NavLink
                to="/Products"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Back to Products
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </React.StrictMode>
  );
};

export default Product;
