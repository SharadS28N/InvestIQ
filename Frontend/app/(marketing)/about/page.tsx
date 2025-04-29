'use client'

import { Card, CardContent } from "@/components/ui/card"
import { LineChart } from "lucide-react"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Sharad Bhandari",
      position: "CEO & Founder",
      bio: "Former investment banker with 15 years of experience in financial markets. Founded InvestIQ to democratize AI-powered investing for Nepali investors.",
      image: "/about-us/sharad-bhandari.jpg",  // Ensure correct path
    },
    {
      name: "Mohit",
      position: "Chief Technology Officer",
      bio: "AI specialist with a background in machine learning and financial technology. Leads the development of our AI recommendation engine.",
      image: "/about-us/mohit-bikram-shahi.jpg", // Ensure correct path
    },
    {
      name: "Prashan Yakkha Rai",
      position: "Financial Analyst",
      bio: "Certified financial analyst with expertise in Nepali markets. Provides human oversight for our AI recommendations.",
      image: "/about-us/prashan-yakkha-rai.jpg", // Ensure correct path
    },
    {
      name: "Abhishek Magar",
      position: "Lead Designer",
      bio: "Creative professional with a passion for creating intuitive and engaging user experiences. Responsible for the visual identity of InvestIQ.",
      image: "/about-us/abhishek-magar.jpg", // Ensure correct path
    },
    {
      name: "Aryan Tamang",
      position: "Head of Customer Success",
      bio: "Passionate about helping investors achieve their financial goals. Leads our customer support and education initiatives.",
      image: "/about-us/aryan-tamang.jpg", // Ensure correct path
    },
  ]

  return (
    <div className="container py-12 md:py-24">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About InvestIQ</h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
            Our mission is to empower Nepali investors with AI-driven insights and tools.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="text-gray-600 mb-4">
            InvestIQ was founded in 2023 with a simple mission: to make sophisticated investment tools accessible to
            every Nepali investor. We recognized that while the Nepal Stock Exchange (NEPSE) offers tremendous
            opportunities, many investors lack the tools, data, and insights needed to make informed decisions.
          </p>
          <p className="text-gray-600 mb-4">
            Our team of financial experts and AI specialists came together to build a platform that combines
            cutting-edge artificial intelligence with deep market knowledge. We believe that by democratizing access to
            advanced investment technology, we can help investors of all experience levels achieve better results.
          </p>
          <p className="text-gray-600">
            Today, InvestIQ serves thousands of investors across Nepal, from individual retail traders to large
            institutional clients. We continue to innovate and improve our platform, always with our core mission in
            mind: Invest Smarter, Grow Better.
          </p>
        </div>
        <div className="bg-gray-100 p-8 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="mx-auto rounded-full bg-primary p-3 w-16 h-16 flex items-center justify-center mb-4">
              <LineChart className="h-8 w-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">Our Vision</h3>
            <p className="text-gray-600">
              To become the most trusted AI-powered investment platform in Nepal, helping investors make data-driven
              decisions and achieve their financial goals.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-2">Transparency</h3>
              <p className="text-gray-600">
                We believe in complete transparency in how our AI models work, how we use data, and how we charge for
                our services.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-2">Innovation</h3>
              <p className="text-gray-600">
                We continuously push the boundaries of what's possible with AI and financial technology to deliver the
                best possible tools for our users.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-2">Education</h3>
              <p className="text-gray-600">
                We're committed to helping our users become more knowledgeable investors through comprehensive
                educational resources.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex flex-col items-center mb-4">
                  <img
                    src={member.image || "/about-us/placeholder.svg"}  // Use full path for images
                    alt={`${member.name} - ${member.position}`}
                    className="h-32 w-32 rounded-full object-cover mb-4"
                    onError={(e) => {
                      // Fallback to a placeholder if image fails to load
                      console.log("Image failed:", e.currentTarget.src);
                      e.currentTarget.src = "/about-us/placeholder.svg";  // Correct fallback
                    }}
                  />
                  <h3 className="font-bold text-lg text-center">{member.name}</h3>
                  <p className="text-primary font-medium mb-2 text-center">{member.position}</p>
                </div>
                <p className="text-gray-600">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
