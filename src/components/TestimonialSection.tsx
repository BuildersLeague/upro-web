import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

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
];

export function TestimonialSection() {
  return (
    <section
      className="w-full bg-gray-900 text-white py-12 md:py-16 px-4"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          id="testimonials-heading"
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12"
        >
          What Parents and Kids Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {testimonials.map(testimonial => (
            <Card
              key={testimonial.id}
              className="bg-gray-800 border-gray-700 text-white p-4 md:p-6 rounded-lg hover:bg-gray-750 transition-colors duration-200"
            >
              <CardContent className="p-0 space-y-3 md:space-y-4">
                {/* Avatar and Info */}
                <div className="flex items-center space-x-3">
                  <Avatar className="size-10 md:size-12">
                    {testimonial.avatar && (
                      <AvatarImage
                        src={testimonial.avatar}
                        alt={`${testimonial.name} profile picture`}
                      />
                    )}
                    <AvatarFallback className="bg-gray-600 text-white text-sm font-medium">
                      {testimonial.name
                        .split(" ")
                        .map(n => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm md:text-base truncate">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-400 text-xs md:text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                {/* Testimonial Content */}
                <blockquote className="text-gray-200 text-sm md:text-base leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
