import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Brain,
  BarChart3,
  TrendingUp,
  LineChart,
  BookOpen,
  Shield,
  Bell,
  Zap,
  Smartphone,
  CloudOff,
  Users,
  FileText,
} from "lucide-react"

export default function FeaturesPage() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description:
        "Get intelligent stock recommendations from multiple AI models with confidence scores. Our system aggregates insights from ChatGPT, Claude, Gemini, and Grok to provide the most accurate predictions.",
    },
    {
      icon: BarChart3,
      title: "Portfolio Management",
      description:
        "Track your investments, analyze performance, and manage your portfolio in one place. View detailed breakdowns by sector, monitor gains and losses, and get a complete picture of your investment health.",
    },
    {
      icon: TrendingUp,
      title: "Auto Trading",
      description:
        "Set up automated trading based on AI recommendations with customizable risk controls. Define your risk tolerance and let our system execute trades at optimal times.",
    },
    {
      icon: LineChart,
      title: "Real-time Market Data",
      description:
        "Access live NEPSE data, company information, and market trends as they happen. Stay informed with up-to-the-minute information on stock prices, indices, and market movements.",
    },
    {
      icon: BookOpen,
      title: "Investor Education",
      description:
        "Learn investment strategies with our comprehensive educational resources for all levels. From beginner concepts to advanced techniques, our platform helps you become a more knowledgeable investor.",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description:
        "Your data is protected with enterprise-grade security and our platform is built for reliability. We use industry-standard encryption and security practices to keep your information safe.",
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description:
        "Receive timely alerts about market movements, AI recommendations, and portfolio changes. Customize your notification preferences to get only the information that matters to you.",
    },
    {
      icon: Zap,
      title: "Fast Performance",
      description:
        "Experience lightning-fast loading times and responsive interactions throughout the platform. Our optimized architecture ensures you can make quick decisions without waiting.",
    },
    {
      icon: Smartphone,
      title: "Mobile Responsive",
      description:
        "Access InvestIQ from any device with our fully responsive design. Whether you're on desktop, tablet, or mobile, you'll get the same powerful features and intuitive interface.",
    },
    {
      icon: CloudOff,
      title: "Offline Support",
      description:
        "Continue working even when your internet connection is unstable. Our platform caches key data so you can view your portfolio and recent insights even offline.",
    },
    {
      icon: Users,
      title: "Multi-User Roles",
      description:
        "Different access levels for administrators, analysts, educators, and regular users. Each role has tailored permissions and views to match their specific needs.",
    },
    {
      icon: FileText,
      title: "Document Analysis",
      description:
        "Upload and analyze financial documents with our OCR and AI processing. Extract key information from annual reports, financial statements, and other documents automatically.",
    },
  ]

  return (
    <div className="container py-12 md:py-24">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Powerful features for smarter investing
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
            Discover all the tools and capabilities that make InvestIQ the leading AI-powered platform for NEPSE
            investors.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-primary/10 p-2">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
