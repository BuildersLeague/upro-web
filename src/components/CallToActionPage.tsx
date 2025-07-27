"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Smartphone, Download } from "lucide-react";

const CallToActionPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Content Card */}
        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
          <CardContent className="p-12 md:p-16">
            {/* Icon */}
            <div className="mb-8">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                <Smartphone className="w-10 h-10 text-white" />
              </div>
            </div>

            {/* Headline */}
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent mb-6 leading-tight">
              Ready to Start the Journey?
            </h2>

            {/* Subtext */}
            <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Download the app and start your free training experience today. No
              equipment needed — just a phone, a ball, and a love for the game.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-black hover:bg-gray-800 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 min-w-[200px]"
                onClick={() => window.open("https://apps.apple.com", "_blank")}
              >
                <div className="flex items-center gap-3">
                  <Download className="w-5 h-5" />
                  <div className="text-left">
                    <div className="text-xs text-gray-300">Download on the</div>
                    <div className="text-sm font-bold">App Store</div>
                  </div>
                </div>
              </Button>

              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 min-w-[200px]"
                onClick={() => window.open("https://play.google.com", "_blank")}
              >
                <div className="flex items-center gap-3">
                  <Download className="w-5 h-5" />
                  <div className="text-left">
                    <div className="text-xs text-green-100">Get it on</div>
                    <div className="text-sm font-bold">Google Play</div>
                  </div>
                </div>
              </Button>
            </div>

            {/* Additional Features */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Smartphone className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Mobile First
                </h3>
                <p className="text-sm text-gray-600">
                  Train anywhere with just your phone
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Just a Ball
                </h3>
                <p className="text-sm text-gray-600">
                  No expensive equipment required
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <div className="w-6 h-6 text-purple-600">❤</div>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Love for Game
                </h3>
                <p className="text-sm text-gray-600">
                  Passion is all you need to start
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-green-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse delay-500"></div>
        </div>
      </div>
    </div>
  );
};

export default CallToActionPage;
