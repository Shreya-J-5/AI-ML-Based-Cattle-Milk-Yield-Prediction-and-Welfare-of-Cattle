"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { MilkYieldPrediction } from "@/src/components/milk-yield-prediction"
import { DiseaseDetection } from "@/src/components/disease-detection"
import { ReportsInsights } from "@/src/components/reports-insights"
import { Cog as Cow, TrendingUp, Shield, BarChart3 } from "lucide-react"

const translations: any = {
  english: {
    welcome: "Welcome",
    tagline: "Your assistant for the Welfare of Your Cattle",
    getStarted: "Get Started",
    brand: "Cattle.AI",
    headerDesc: "AI-Powered Dairy Management Dashboard",
    contactLink: "Contact Us",

    milkTitle: "Milk Yield Prediction",
    milkDesc: "AI-powered predictions for optimal dairy production",

    healthTitle: "Health Monitoring",
    healthDesc: "Early disease detection & health insights",

    reportsTitle: "Reports & Analytics",
    reportsDesc: "Comprehensive insights and performance tracking",

    contactTitle: "Contact Us",
    contactDesc: "Have questions or need support? Get in touch with us and we'll respond as soon as possible.",
    name: "Your Name",
    email: "Your Email",
    message: "Your Message",
    send: "Send Message",
  },
  hindi: {
    welcome: "स्वागत है",
    tagline: "आपकी गायों के कल्याण के लिए आपका सहायक",
    getStarted: "शुरू करें",
    brand: "Cattle.AI",
    headerDesc: "एआई-संचालित डेयरी प्रबंधन डैशबोर्ड",
    contactLink: "संपर्क करें",

    milkTitle: "दूध उत्पादन पूर्वानुमान",
    milkDesc: "सर्वोत्तम दुग्ध उत्पादन के लिए एआई-संचालित भविष्यवाणी",

    healthTitle: "स्वास्थ्य निगरानी",
    healthDesc: "बीमारी का शीघ्र पता लगाना और स्वास्थ्य जानकारी",

    reportsTitle: "रिपोर्ट और विश्लेषण",
    reportsDesc: "व्यापक अंतर्दृष्टि और प्रदर्शन ट्रैकिंग",

    contactTitle: "संपर्क करें",
    contactDesc: "कोई प्रश्न है या सहायता चाहिए? हमसे संपर्क करें और हम जल्द से जल्द उत्तर देंगे।",
    name: "आपका नाम",
    email: "आपका ईमेल",
    message: "आपका संदेश",
    send: "संदेश भेजें",
  },
  gujarati: {
    welcome: "સ્વાગત છે",
    tagline: "તમારા પશુઓના કલ્યાણ માટે તમારો સહાયક",
    getStarted: "શરૂ કરો",
    brand: "Cattle.AI",
    headerDesc: "એઆઇ-સંચાલિત ડેરી મેનેજમેન્ટ ડેશબોર્ડ",
    contactLink: "અમારો સંપર્ક કરો",

    milkTitle: "દૂધ ઉત્પાદન આગાહી",
    milkDesc: "ઉત્તમ દૂધ ઉત્પાદન માટે એઆઇ આધારિત આગાહી",

    healthTitle: "આરોગ્ય મોનીટરીંગ",
    healthDesc: "વહેલી તકે રોગની ઓળખ અને આરોગ્યની માહિતી",

    reportsTitle: "અહેવાલ અને વિશ્લેષણ",
    reportsDesc: "વ્યાપક દૃષ્ટિકોણ અને કામગીરી ટ્રેકિંગ",

    contactTitle: "અમારો સંપર્ક કરો",
    contactDesc: "તમને કોઈ પ્રશ્ન છે કે મદદ જોઈએ છે? અમારો સંપર્ક કરો અને અમે શક્ય તેટલી વહેલી તકે જવાબ આપીશું.",
    name: "તમારું નામ",
    email: "તમારો ઈમેલ",
    message: "તમારો સંદેશ",
    send: "સંદેશ મોકલો",
  },
};

export default function HomePage() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [language, setLanguage] = useState<"english" | "hindi" | "gujarati">("english");

  const t = translations[language];

  return (
    <div className="min-h-screen animate-fadeIn">
      {/* Home Page */}
      {!showDashboard && (
        <div className="flex flex-col items-center justify-center h-screen bg-blue-100 transition-all duration-1000 ease-in-out">
          <div className="text-center">
            <h1 className="text-8xl sm:text-10xl text-gray-600 mb-2 opacity-20">
              {t.welcome}
            </h1>
            <h2 className="text-4xl sm:text-6xl font-bold mb-4">
              {t.brand.split(".")[0]}.<span className="text-blue-300">{t.brand.split(".")[1]}</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-700 mb-8">
              {t.tagline}
            </p>

            {/* Language Selector */}
            <div className="mb-6">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as "english" | "hindi" | "gujarati")}
                className="px-4 py-2 rounded-xl border border-border focus:border-primary focus:ring-primary/20"
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी</option>
                <option value="gu">ગુજરાતી</option>
              </select>
            </div>

            <button
              onClick={() => setShowDashboard(true)}
              className="px-6 py-3 bg-primary text-white font-semibold rounded-xl shadow-lg hover:bg-primary/90 transition"
            >
              {t.getStarted}
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
          {/* Header */}
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
                      {t.brand}
                    </h1>
                    <p className="text-white/90 text-base sm:text-lg lg:text-xl font-medium">
                      {t.headerDesc}
                    </p>
                  </div>
                </div>

                {/* Right side: contact link + language selector */}
                <div className="flex items-center gap-4">
                  <a
                    href="#contact"
                    className="mt-4 sm:mt-0 text-white font-medium hover:opacity-50 transition"
                  >
                    {t.contactLink}
                  </a>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as "english" | "hindi" | "gujarati")}
                    className="px-3 py-2 rounded-md border bg-white text-black"
                  >
                    <option value="english">English</option>
                    <option value="hindi">हिंदी</option>
                    <option value="gujarati">ગુજરાતી</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-4 sm:h-6 bg-gradient-to-r from-blue-50 via-purple-50 to-orange-50"></div>
          </header>

          {/* Main Dashboard */}
          <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-12">
            <div className="grid gap-4 sm:gap-6 lg:gap-8 lg:grid-cols-2 xl:grid-cols-3">
              {/* Milk Yield Prediction */}
              <div className="xl:col-span-2">
                <Card className="vibrant-card hover-lift border-0 shadow-2xl">
                  <CardHeader className="pb-4 sm:pb-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-t-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary rounded-lg shadow-lg">
                        <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl sm:text-2xl gradient-text">
                          {t.milkTitle}
                        </CardTitle>
                        <CardDescription className="text-sm sm:text-base lg:text-lg text-muted-foreground">
                          {t.milkDesc}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <MilkYieldPrediction />
                  </CardContent>
                </Card>
              </div>

              {/* Health Monitoring */}
              <div>
                <Card className="vibrant-card hover-lift border-0 shadow-2xl h-full">
                  <CardHeader className="pb-4 sm:pb-6 bg-gradient-to-r from-destructive/10 to-accent/10 rounded-t-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-destructive rounded-lg shadow-lg">
                        <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl sm:text-2xl gradient-text">
                          {t.healthTitle}
                        </CardTitle>
                        <CardDescription className="text-sm sm:text-base lg:text-lg text-muted-foreground">
                          {t.healthDesc}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <DiseaseDetection />
                  </CardContent>
                </Card>
              </div>

              {/* Reports & Analytics */}
              <div className="xl:col-span-3">
                <Card className="vibrant-card border-0 shadow-2xl">
                  <CardHeader className="pb-4 sm:pb-6 bg-gradient-to-r from-secondary/10 to-accent/10 rounded-t-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-secondary rounded-lg shadow-lg">
                        <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl sm:text-2xl gradient-text">
                          {t.reportsTitle}
                        </CardTitle>
                        <CardDescription className="text-sm sm:text-base lg:text-lg text-muted-foreground">
                          {t.reportsDesc}
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
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 gradient-text">
                {t.contactTitle}
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                {t.contactDesc}
              </p>
              <form className="max-w-xl mx-auto grid gap-4">
                <input
                  type="text"
                  placeholder={t.name}
                  className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-primary/20"
                />
                <input
                  type="email"
                  placeholder={t.email}
                  className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-primary/20"
                />
                <textarea
                  placeholder={t.message}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-primary/20"
                />
                <button
                  type="submit"
                  className="w-full bg-primary text-white font-semibold py-3 rounded-xl shadow-lg hover:bg-primary/90 transition"
                >
                  {t.send}
                </button>
              </form>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
