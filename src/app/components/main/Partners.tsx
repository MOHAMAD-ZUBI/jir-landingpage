"use client";
import Image from "next/image";

const partners = [
  {
    name: "Statsig",
    logo: (
      <svg
        viewBox="0 0 75 20"
        focusable="false"
        className="chakra-icon chakra-icon css-1lg6exx"
      >
        <g fill="currentColor">
          <path d="M5.19 6.76c-1.79 0-2.667 1.576-2.667 3.681v5.275H0V4.585h2.478v2.888h.043c.53-1.776 1.585-3.21 3.212-3.21 1.144 0 1.627.399 1.627.399L6.22 6.955c0-.002-.363-.195-1.031-.195Zm30.496 1.528v7.427h-2.458V9.192c0-1.872-.587-2.864-2.088-2.864-1.553 0-2.305 1.254-2.305 3.66v5.726H26.4V9.192c0-1.8-.58-2.864-2.066-2.864-1.695 0-2.348 1.486-2.348 3.66v5.726h-2.478V4.584h2.478v2.521h.022c.386-1.744 1.44-2.82 3.218-2.82 1.764 0 2.913.947 3.349 2.627.415-1.617 1.52-2.628 3.218-2.628 2.37 0 3.893 1.486 3.893 4.004ZM12.318 4.262c-2.28 0-3.773 1.071-4.453 3.005l2.099.763c.382-1.166 1.18-1.83 2.398-1.83 1.37 0 2.175.603 2.175 1.528 0 .947-.64 1.145-2.088 1.379-1.61.259-5.437.344-5.437 3.573 0 1.892 1.582 3.315 3.958 3.315 1.786 0 3.003-.73 3.566-2.089h.022v1.81h2.457V8.868c0-2.995-1.508-4.607-4.697-4.607Zm2.283 6.214c0 2.334-1.155 3.833-3 3.833-1.306 0-2.088-.732-2.088-1.788 0-.99.804-1.678 2.348-1.961 1.58-.29 2.375-.648 2.74-1.507v1.423Zm29.826-6.192c-1.88 0-3.121 1.033-3.653 2.585V4.585h-2.61V20h2.588v-6.568h.022c.576 1.681 1.775 2.606 3.653 2.606 2.979 0 5.11-2.454 5.11-5.921 0-3.443-2.131-5.833-5.11-5.833Zm-.642 9.688c-2.063 0-3.207-1.497-3.207-3.822s1.28-3.822 3.207-3.822c1.926 0 3.208 1.57 3.208 3.822 0 2.253-1.28 3.822-3.208 3.822ZM75.172 15.665v.07l-10.1.003v-.073c1.457-.823 2.462-1.66 3.367-2.536h4.147l2.586 2.536ZM72.67 2.51 70.11 0h-.075s.043 4.68-4.255 8.936c-4.206 4.166-9.152 4.175-9.152 4.175v.073l2.608 2.555s4.874.048 9.18-4.175c4.29-4.21 4.254-9.053 4.254-9.053Z"></path>
        </g>
      </svg>
    ),
  },
];

export default function Partners() {
  return (
    <section className="py-16 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-2xl font-medium text-gray-700 mb-12">
          Loved by <span className="text-blue-500 font-bold">100,000s</span> of
          data professionals
        </h2>

        <div className="relative">
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10" />

          {/* Partners container */}
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 relative">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="w-[120px] h-[40px] relative grayscale hover:grayscale-0 transition-all duration-200"
              >
                {typeof partner.logo === "string" ? (
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={120}
                    height={40}
                  />
                ) : (
                  partner.logo
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
