"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LineChart, BarChart3, TrendingUp, Brain, Shield, BookOpen, ArrowRight, CheckCircle2 } from "lucide-react"
import { ClientAuthCheck } from "@/components/client-auth-check"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-brand-support2 via-white to-brand-support1">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                Introducing InvestIQ
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Invest Smarter, <span className="text-primary">Grow Better</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                AI-powered stock market platform for the Nepal Stock Exchange (NEPSE) that helps you make data-driven
                investment decisions.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/auth/register">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/auth/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Everything you need to succeed in NEPSE
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                Our platform combines AI intelligence with powerful tools to help you make better investment decisions.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
            <Card className="bg-white border-2 border-muted">
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">AI-Powered Insights</h3>
                  <p className="text-gray-500">
                    Get intelligent stock recommendations from multiple AI models with confidence scores.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white border-2 border-muted">
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="rounded-full bg-primary/10 p-3">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Portfolio Management</h3>
                  <p className="text-gray-500">
                    Track your investments, analyze performance, and manage your portfolio in one place.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white border-2 border-muted">
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="rounded-full bg-primary/10 p-3">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Auto Trading</h3>
                  <p className="text-gray-500">
                    Set up automated trading based on AI recommendations with customizable risk controls.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white border-2 border-muted">
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="rounded-full bg-primary/10 p-3">
                    <LineChart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Real-time Market Data</h3>
                  <p className="text-gray-500">
                    Access live NEPSE data, company information, and market trends as they happen.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white border-2 border-muted">
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="rounded-full bg-primary/10 p-3">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Investor Education</h3>
                  <p className="text-gray-500">
                    Learn investment strategies with our comprehensive educational resources for all levels.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white border-2 border-muted">
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Secure & Reliable</h3>
                  <p className="text-gray-500">
                    Your data is protected with enterprise-grade security and our platform is built for reliability.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">How It Works</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Start investing intelligently in 3 simple steps
              </h2>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 mt-12">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold">Create an account</h3>
              <p className="text-gray-500">
                Sign up and complete your profile with your investment preferences and risk tolerance.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold">Connect your portfolio</h3>
              <p className="text-gray-500">Link your MeroShare account or manually add your holdings to get started.</p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold">Get AI recommendations</h3>
              <p className="text-gray-500">
                Receive personalized investment insights and trade with confidence using our AI-powered platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Pricing</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Choose the plan that's right for you
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                Flexible pricing options to meet your investment needs.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8 mt-12">
            {/* Basic Plan */}
            <Card className="flex flex-col border-2">
              <CardContent className="flex flex-1 flex-col p-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Basic</h3>
                  <p className="text-gray-500">Essential features for new investors</p>
                </div>
                <div className="mt-4 flex items-baseline text-gray-900">
                  <span className="text-4xl font-bold tracking-tight">NPR 999</span>
                  <span className="ml-1 text-xl font-semibold">/month</span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    <span>Portfolio tracking</span>
                  </li>
                  <li className="flex">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    <span>Basic AI insights</span>
                  </li>
                  <li className="flex">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    <span>Market data access</span>
                  </li>
                  <li className="flex">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    <span>Educational resources</span>
                  </li>
                </ul>
                <div className="mt-auto pt-6">
                  <Button className="w-full" variant="outline" asChild>
                    <Link href="/auth/register">Get Started</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="flex flex-col border-2 border-primary relative">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">Most Popular</Badge>
              <CardContent className="flex flex-1 flex-col p-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Pro</h3>
                  <p className="text-gray-500">Advanced features for serious investors</p>
                </div>
                <div className="mt-4 flex items-baseline text-gray-900">
                  <span className="text-4xl font-bold tracking-tight">NPR 1,999</span>
                  <span className="ml-1 text-xl font-semibold">/month</span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    <span>Everything in Basic</span>
                  </li>
                  <li className="flex">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    <span>Advanced AI recommendations</span>
                  </li>
                  <li className="flex">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    <span>Auto-trading capabilities</span>
                  </li>
                  <li className="flex">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    <span>Real-time alerts</span>
                  </li>
                  <li className="flex">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <div className="mt-auto pt-6">
                  <Button className="w-full" asChild>
                    <Link href="/auth/register">Get Started</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="flex flex-col border-2">
              <CardContent className="flex flex-1 flex-col p-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Enterprise</h3>
                  <p className="text-gray-500">Custom solutions for institutions</p>
                </div>
                <div className="mt-4 flex items-baseline text-gray-900">
                  <span className="text-4xl font-bold tracking-tight">Custom</span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    <span>Everything in Pro</span>
                  </li>
                  <li className="flex">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    <span>Custom AI model training</span>
                  </li>
                  <li className="flex">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    <span>API access</span>
                  </li>
                  <li className="flex">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    <span>Custom reporting</span>
                  </li>
                </ul>
                <div className="mt-auto pt-6">
                  <Button className="w-full" variant="outline" asChild>
                    <Link href="/contact">Contact Sales</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Testimonials</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What our users are saying</h2>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-12">
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-gray-200 h-12 w-12"></div>
                    <div>
                      <h4 className="font-bold">Rajesh Sharma</h4>
                      <p className="text-sm text-gray-500">Individual Investor</p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    "InvestIQ has transformed how I invest in NEPSE. The AI recommendations have been spot on, and I've
                    seen a significant improvement in my returns."
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-gray-200 h-12 w-12"></div>
                    <div>
                      <h4 className="font-bold">Sunita Thapa</h4>
                      <p className="text-sm text-gray-500">Financial Advisor</p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    "As a financial advisor, I rely on InvestIQ to provide data-driven insights for my clients. The
                    platform's AI capabilities are truly impressive."
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-gray-200 h-12 w-12"></div>
                    <div>
                      <h4 className="font-bold">Binod Poudel</h4>
                      <p className="text-sm text-gray-500">Institutional Investor</p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    "The auto-trading feature has saved us countless hours. We can set our parameters and let InvestIQ
                    handle the execution while we focus on strategy."
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to transform your investment strategy?
              </h2>
              <p className="mx-auto max-w-[700px] md:text-xl">
                Join thousands of investors who are already using InvestIQ to make smarter investment decisions.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/auth/register">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent" asChild>
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <div className="sr-only">
        <ClientAuthCheck />
      </div>
    </div>
  )
}
