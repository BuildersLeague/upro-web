"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
const plans = [
  {
    title: "Training Mat",
    price: "$199",
    button: "Buy Mat",
    image: "/price1.png",
    features: [
      { icon: "🛠️", label: "Material", desc: "Durable and comfortable" },
      { icon: "👤", label: "Player Access", desc: "Single player" },
      { icon: "👥", label: "Player Access", desc: "Multiple players" },
      { icon: "🛠️", label: "Material", desc: "Durable and comfortable" },
      { icon: "👤", label: "Player Access", desc: "Single player" },
      { icon: "👥", label: "Player Access", desc: "Multiple players" },
      { icon: "🛠️", label: "Material", desc: "Durable and comfortable" },
    ],
  },
  {
    title: "Monthly Subscription",
    price: "$9.99",
    button: "Subscribe",
    image: "/price2.png",
    features: [
      { icon: "", label: "", desc: "" },
      { icon: "👥", label: "Family Pack", desc: "3 players" },
      { icon: "", label: "Monthly Subscription", desc: "Unlimited" },
      { icon: "", label: "", desc: "" },
      { icon: "👥", label: "Family Pack", desc: "3 players" },
      { icon: "📶", label: "Monthly Subscription", desc: "Unlimited" },
      { icon: "", label: "", desc: "" },
    ],
  },
  {
    title: "Family Pack",
    price: "$19.99",
    button: "Subscribe",
    image: "/price3.png",
    features: [
      { icon: "🎯", label: "Free Trial", desc: "1 drill" },
      { icon: "", label: "", desc: "" },
      { icon: "🏅", label: "Free Trial", desc: "Try your first drill free" },
      { icon: "🎯", label: "Free Trial", desc: "1 drill" },
      { icon: "", label: "", desc: "" },
      { icon: "🎯", label: "Free Trial", desc: "1 drill" },
      { icon: "", label: "", desc: "" },
    ],
  },
];

export default function PricingTable() {
  return (
    <section className="bg-black text-white py-16 px-4">
      <h2 className="text-4xl font-bold text-center mb-12">Pricing & Access</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 max-w-7xl  ">
        {plans.map((plan, i) => (
          <Card
            key={i}
            className=" bg-black border border-[#182718] rounded-none  text-white flex flex-col"
          >
            <CardContent className="p-1 flex flex-col h-full">
              <div className="mb-6 size-50 flex justify-center w-full ">
                <Image
                  src={plan.image}
                  alt={plan.title}
                  width={300}
                  height={200}
                  className="mx-auto"
                />
              </div>

              <h3 className="text-sm font-semibold text-center">
                {plan.title}
              </h3>
              <p className="text-2xl font-bold my-2 text-center">
                {plan.price}
              </p>
              <div className="flex justify-center">
                <Button className="bg-green-500 hover:bg-green-600 text-black font-semibold w-3/4  rounded-3xl mb-6">
                  {plan.button}
                </Button>
              </div>

              <div className="flex justify-center flex-col   ">
                {plan.features.map((feature, j) =>
                  feature.label ? (
                    <div key={j}>
                      <div
                        key={j}
                        className=" flex flex-col items-center text-center  p-10 "
                      >
                        <span className="text-xl h-10">{feature.icon}</span>
                        <div>
                          <p className="font-bold text-sm text-[#657366]">
                            {feature.label}
                          </p>
                          <p className="text-xs text-[#bccabd]">
                            {feature.desc}
                          </p>
                        </div>
                      </div>
                      <Separator className="bg-[#182718]" />
                    </div>
                  ) : (
                    <div key={j}>no</div>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
