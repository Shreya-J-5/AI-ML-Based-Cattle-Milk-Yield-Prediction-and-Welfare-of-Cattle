"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MilkYieldPrediction } from "@/components/milk-yield-prediction"
import { DiseaseDetection } from "@/components/disease-detection"
import { ReportsInsights } from "@/components/reports-insights"
import { Cog as Cow, TrendingUp, Shield, BarChart3 } from "lucide-react"

export default function HomePage() {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <div className="min-h-screen animate-fadeIn">
      {/* Home Page */}
      {!showDashboard && (
        <div className="flex flex-col items-center justify-center h-screen bg-blue-100 transition-all duration-1000 ease-in-out">
          <div className="text-center">
            <h1 className="text-8xl sm:text-10xl text-gray-600 mb-2 opacity-20">Welcome</h1>
            <h2 className="text-4xl sm:text-6xl font-bold mb-4">
              Cattle.<span className="text-blue-300">AI</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-700 mb-8">
              Your assistant for the Welfare of Your Cattle
            </p>
            <button
              onClick={() => setShowDashboard(true)}
              className="px-6 py-3 bg-primary text-white font-semibold rounded-xl shadow-lg hover:bg-primary/90 transition">
              Get Started
            </button>
          </div>
        </div>
      )}
      {/* Dashboard Page */}
      {showDashboard && (
      <div
        className={`animate-fadeIn transition-opacity duration-1000 ease-in-out ${
          showDashboard ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <header className="relative bg-gradient-to-r from-primary via-secondary to-accent text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative container mx-auto px-4 sm:px-6 py-6 sm:py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              {/* Left side: logo + title */}
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 shadow-xl">
                  <Cow className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="text-center sm:text-left">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 text-white drop-shadow-lg">
                    Cattle.AI
                  </h1>
                  <p className="text-white/90 text-base sm:text-lg lg:text-xl font-medium">
                    AI-Powered Dairy Management Dashboard
                  </p>
                </div>
              </div>

              {/* Right side: contact link */}
              <a
                href="#contact"
                className="mt-4 sm:mt-0 text-white font-medium hover:opacity-50 transition"
              >
                Contact Us
              </a>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-4 sm:h-6 bg-gradient-to-r from-blue-50 via-purple-50 to-orange-50"></div>
        </header>

        <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-12">
          <div className="grid gap-4 sm:gap-6 lg:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <Card className="vibrant-card hover-lift border-0 shadow-2xl">
                <CardHeader className="pb-4 sm:pb-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-t-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary rounded-lg shadow-lg">
                      <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl sm:text-2xl gradient-text">Milk Yield Prediction</CardTitle>
                      <CardDescription className="text-sm sm:text-base lg:text-lg text-muted-foreground">
                        AI-powered predictions for optimal dairy production
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <MilkYieldPrediction />
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="vibrant-card hover-lift border-0 shadow-2xl h-full">
                <CardHeader className="pb-4 sm:pb-6 bg-gradient-to-r from-destructive/10 to-accent/10 rounded-t-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-destructive rounded-lg shadow-lg">
                      <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl sm:text-2xl gradient-text">Health Monitoring</CardTitle>
                      <CardDescription className="text-sm sm:text-base lg:text-lg text-muted-foreground">
                        Early disease detection & health insights
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <DiseaseDetection />
                </CardContent>
              </Card>
            </div>

            <div className="xl:col-span-3">
              <Card className="vibrant-card border-0 shadow-2xl">
                <CardHeader className="pb-4 sm:pb-6 bg-gradient-to-r from-secondary/10 to-accent/10 rounded-t-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-secondary rounded-lg shadow-lg">
                      <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl sm:text-2xl gradient-text">Reports & Analytics</CardTitle>
                      <CardDescription className="text-sm sm:text-base lg:text-lg text-muted-foreground">
                        Comprehensive insights and performance tracking
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <ReportsInsights />
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        {/* Contact Section */}
        <section
          id="contact"
          className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 py-12 sm:py-16"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 gradient-text">Contact Us</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Have questions or need support? Get in touch with us and we'll respond as soon as possible.
            </p>

            <form className="max-w-xl mx-auto grid gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-primary/20"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-primary/20"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-primary/20"
              />
              <button
                type="submit"
                className="w-full bg-primary text-white font-semibold py-3 rounded-xl shadow-lg hover:bg-primary/90 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>
      </div>
      )}  
    </div>
  )
}
