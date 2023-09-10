import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import LoadMoreButton from "../LoadMoreButton/LoadMoreButton";
import { products } from "../../loadJson";

const Products = () => {
  const [showItems, setShowItems] = useState(3);
  const petrochemicalsLength = products.length;
  const slicePetrochemicals = products.slice(0, showItems);

  const showAllHandler = () => {
    setShowItems(petrochemicalsLength);
  };
  const moreHandler = () => {
    setShowItems(showItems + 3);
  };
  const lessHandler = () => {
    setShowItems(3);
  };

  return (
    <section className="relative products-com">
      <div className="container">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Products
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              All of Products List
            </p>
          </div>
          <div className="relative mt-8 border-t border-gray-200 pt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 sm:mt-10 sm:pt-16">
            {slicePetrochemicals.map((product) => (
              <div key={product.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.imageSrc[0]}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h2 className="text-md bold text-gray-700">
                      <NavLink to={`/products/product/${product.id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.product}
                      </NavLink>
                    </h2>
                    <p className="mt-1 text-sm capitalize text-gray-900">
                      Trade Name:
                      <span className="pl-2 uppercase text-gray-600">
                        {product.tradeName}
                      </span>
                    </p>
                  </div>
                  <p className="text-sm capitalize font-medium text-gray-900">
                    Garde:
                    <span className="pl-2 uppercase text-gray-600">
                      {product.grade}
                    </span>
                  </p>
                </div>
              </div>
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
    </section>
  );
};

export default Products;
