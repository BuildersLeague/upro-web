"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useRef } from "react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar?: string; // Optional image URL
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Emily Hawthorne",
    role: "Parent of 10-year-old",
    content:
      "Our son's footwork and confidence have soared. He loves leveling up!",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face", // Professional woman
  },
  {
    id: "2",
    name: "Oliver Kingston",
    role: "Junior player",
    content: "I feel like I have a coach with me everywhere.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face", // Young man
  },
  {
    id: "3",
    name: "Sophia Lin",
    role: "Soccer Enthusiast",
    content: "The app makes training easy and fun. Our family loves it!",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face", // Woman
  },
  {
    id: "4",
    name: "Lucas Rivera",
    role: "Parent of 8-year-old",
    content: "U-Pro has transformed our living room into a soccer field.",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face", // Man
  },
  {
    id: "5",
    name: "Maria Santos",
    role: "Parent of 12-year-old",
    content: "Amazing progress in just weeks! My daughter is now team captain.",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face", // Woman
  },
  {
    id: "6",
    name: "James Wilson",
    role: "Youth Coach",
    content: "I recommend this app to all my players. Great training tool!",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face", // Man
  },
  {
    id: "7",
    name: "Sarah Chen",
    role: "Teen Player",
    content: "Love the personalized training plans. Made it to varsity team!",
    avatar:
      "https://images.unsplash.com/photo-1594736797933-d0d9ba7e1c8d?w=150&h=150&fit=crop&crop=face", // Young woman
  },
];

export function TestimonialSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      className="w-full py-16 md:py-20"
      style={{ backgroundColor: "#020d02" }}
      aria-labelledby="testimonials-heading"
      role="region"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="testimonials-heading"
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16 text-white"
        >
          What Parents and Kids Say
        </h2>

        {/* Horizontal Scrollable Container */}
        <div className="relative">
          {/* Left Fade Shadow */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#020d02] via-[#020d02]/50 to-transparent z-10 pointer-events-none"></div>

          {/* Right Fade Shadow */}
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#020d02] via-[#020d02]/50 to-transparent z-10 pointer-events-none"></div>

          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide"
          >
            <div
              className="flex gap-6 pb-4 px-16"
              style={{ width: "max-content" }}
            >
              {testimonials.map(testimonial => (
                <Card
                  key={testimonial.id}
                  className="text-white p-6 rounded-xl border-0 flex-shrink-0 w-80 shadow-lg backdrop-blur-sm"
                  style={{ backgroundColor: "#182618" }}
                >
                  <CardContent className="p-0 space-y-4">
                    {/* Avatar and Info */}
                    <div className="flex items-center space-x-4">
                      <Avatar className="size-12 ring-2 ring-white/20">
                        {testimonial.avatar && (
                          <AvatarImage
                            src={testimonial.avatar}
                            alt={`${testimonial.name} profile picture`}
                          />
                        )}
                        <AvatarFallback className="bg-gray-700 text-white text-sm font-medium">
                          {testimonial.name
                            .split(" ")
                            .map(n => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-sm">
                          {testimonial.name}
                        </h3>
                        <p className="text-gray-300 text-xs">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>

                    {/* Content section with vertical line */}
                    <div className="flex space-x-4">
                      {/* Vertical line positioned below avatar */}
                      <div className="w-12 flex justify-center">
                        <div className="border-l border-white/20 h-full"></div>
                      </div>

                      {/* Testimonial Content */}
                      <blockquote className="flex-1 text-gray-200 text-sm leading-relaxed">
                        &ldquo;{testimonial.content}&rdquo;
                      </blockquote>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
