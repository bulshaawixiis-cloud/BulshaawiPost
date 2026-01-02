
import React from 'react';
import Logo from './Logo';

const Poster: React.FC = () => {
  const values = ["Compassion", "Strength", "Leadership", "Hope"];

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-2xl overflow-hidden rounded-xl border border-blue-100 my-8">
      {/* Top Header Bar */}
      <div className="bg-blue-800 p-6 md:p-8 flex items-center relative">
        <div className="z-10 mr-6">
          <Logo className="w-12 h-12 md:w-16 md:h-16" />
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight uppercase">
          Women Social Workers
        </h1>
        {/* Abstract design elements */}
        <div className="absolute top-0 right-0 w-32 h-full bg-blue-700/30 skew-x-12 transform translate-x-16"></div>
      </div>

      <div className="p-8 md:p-12 space-y-12">
        {/* Mission Statement */}
        <div className="max-w-3xl">
          <p className="text-xl md:text-2xl text-blue-400 font-medium leading-relaxed italic border-l-4 border-blue-100 pl-6">
            “Women Social Workers support, protect, and empower individuals, families, and communities. They stand for care, justice, and human dignity.”
          </p>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y border-blue-50">
          {values.map((value) => (
            <div key={value} className="text-center group">
              <span className="block text-2xl md:text-3xl font-bold text-blue-900 transition-transform group-hover:scale-110 duration-300">
                {value}
              </span>
              <div className="h-1 w-12 bg-blue-600 mx-auto mt-2 rounded-full"></div>
            </div>
          ))}
        </div>

        {/* Vision & Mission Info Boxes */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          <div className="bg-blue-50 p-8 rounded-lg border-l-8 border-blue-700 shadow-sm flex flex-col">
            <h3 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
              <i className="fa-solid fa-eye mr-3 text-blue-600"></i>
              Our Vision
            </h3>
            <p className="text-blue-900 leading-relaxed text-lg flex-grow">
              We envision a world where every person is treated with unwavering dignity and respect. Our commitment is to cultivate a society rooted in social justice, where empowerment is not a privilege but a fundamental right for all. We strive to be the catalyst for lasting systemic change, fostering communities that are inclusive, equitable, and vibrant.
            </p>
          </div>

          <div className="bg-blue-50 p-8 rounded-lg border-l-8 border-blue-700 shadow-sm flex flex-col">
            <h3 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
              <i className="fa-solid fa-bullseye mr-3 text-blue-600"></i>
              Our Mission
            </h3>
            <p className="text-blue-900 leading-relaxed text-lg flex-grow">
              Our mission is to provide proactive protection and fierce advocacy for vulnerable populations. Through resilient and compassionate leadership, we empower individuals to overcome adversity. We lead with integrity, ensuring that the voices of the marginalized are heard and that our actions build a foundation of hope and strength for future generations.
            </p>
          </div>
        </div>

        {/* Footer branding */}
        <div className="flex justify-between items-center pt-8 text-blue-300 text-sm font-semibold tracking-widest uppercase">
          <span>Social Justice & Care</span>
          <span>Community Connection</span>
          <span>Human Dignity</span>
        </div>
      </div>
    </div>
  );
};

export default Poster;
