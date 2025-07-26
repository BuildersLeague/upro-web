import React from "react";
import Image from "next/image";

type SectionProp = {
  title: string;
  desc: string;
  imgSrc: string;
};

function PartnerSection({ title, desc, imgSrc }: SectionProp) {
  return (
    <section className="py-8 bg-white">
      <div
        className={`max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 }`}
      >
        {/* Image */}
        <div className="w-full md:w-1/2">
          <Image
            src={imgSrc}
            alt={title}
            width={600}
            height={400}
            className="rounded-xl shadow-md object-cover w-full h-auto"
          />
        </div>

        {/* Text */}
        <div className="w-full md:w-1/2 text-left">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground mb-6">{desc}</p>
        </div>
      </div>
    </section>
  );
}

export default PartnerSection;
