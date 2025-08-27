import React from "react";

const CaresuranceHero = () => {
  return (
    <section className="text-gray-600 body-font bg-white">
      <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        <div className="lg:w-2/6 md:w-3/6 w-5/6 mb-10">
          <img
            className="rounded-lg shadow-lg object-cover object-center w-full h-auto"
            alt="hero"
            src="https://mirajsankdecha.github.io/Portfolio/build/static/media/profile.4ea17b28ce1d74fa220c.jpg"
          />
        </div>
        <div className="text-center lg:w-2/3 w-full">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Welcome to mediSync Health Insurance
          </h1>
          <p className="mb-8 text-lg leading-relaxed">
            Get comprehensive health insurance coverage that fits your needs and
            provides peace of mind. Our tailored plans ensure you and your loved
            ones have access to quality healthcare.
          </p>
          
        </div>
      </div>
    </section>
  );
};

export default CaresuranceHero;
