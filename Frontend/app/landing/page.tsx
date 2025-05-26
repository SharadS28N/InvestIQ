import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  LineChart,
  BarChart3,
  TrendingUp,
  Brain,
  Shield,
  ArrowRight,
  CheckCircle2,
  Zap,
  Lock,
  Sparkles,
  Section,
  Divide,
} from "lucide-react"
import { getUserData } from './getUsers'


export default async function LandingPage() {
  const { userCount, profileImages } = await getUserData()
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-support2 via-white to-brand-support1 z-0"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5 z-0"></div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col space-y-6">
              <Badge className="w-fit bg-primary/10 text-primary border-primary/20 py-1.5 px-4 text-sm">
                AI-Powered Investment Platform
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                Invest Smarter, <span className="text-primary">Grow Better</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-lg">
                InvestIQ combines artificial intelligence with deep market knowledge to help you make data-driven
                investment decisions in the Nepal Stock Exchange.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="text-base px-8" asChild>
                  <Link href="/auth/register">Get Started Free</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-base px-8" asChild>
                  <Link href="/auth/login">Sign In</Link>
                </Button>
              </div>
              <div className="flex items-center gap-2 pt-4">
                <div className="flex -space-x-2">
                  {/* Map through profile images */}
                  {profileImages.map((image, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded-full border-2 border-white overflow-hidden"
                    >
                      <img
                        src={image}
                        alt={`User ${index + 1}`}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">{userCount.toLocaleString()}</span> investors already using InvestIQ
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-brand-accent1/5 rounded-full blur-3xl"></div>

              <div className="relative bg-white border rounded-2xl shadow-xl overflow-hidden">
                <div className="p-4 border-b bg-gray-50">
                  <div className="flex items-center gap-2">
                    <div className="rounded-md bg-primary p-1">
                      <LineChart className="h-5 w-5 text-white" />
                    </div>
                    <div className="font-semibold text-lg">Portfolio Overview</div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-500">Total Value</div>
                      <div className="text-2xl font-bold">NPR 1,245,678</div>
                      <div className="flex items-center text-green-600 text-sm mt-1">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        <span>+6.7%</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-500">AI Insights</div>
                      <div className="text-lg font-bold">3 New Recommendations</div>
                      <div className="text-primary text-sm mt-1">View all</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
                          N
                        </div>
                        <div>
                          <div className="font-medium">NABIL</div>
                          <div className="text-xs text-gray-500">Nabil Bank</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">NPR 1,250</div>
                        <div className="text-xs text-green-600">+2.5%</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-medium">
                          U
                        </div>
                        <div>
                          <div className="font-medium">UPPER</div>
                          <div className="text-xs text-gray-500">Upper Tamakoshi</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">NPR 340</div>
                        <div className="text-xs text-red-600">-0.8%</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-medium">
                          C
                        </div>
                        <div>
                          <div className="font-medium">CHCL</div>
                          <div className="text-xs text-gray-500">Chilime Hydropower</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">NPR 520</div>
                        <div className="text-xs text-red-600">-1.2%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <Badge className="bg-primary/10 text-primary border-primary/20 py-1 px-3">Powerful Features</Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Everything you need to succeed in NEPSE
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
              Our platform combines AI intelligence with powerful tools to help you make better investment decisions.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12">
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
          </div>
        </div>
      </section>

      {/* Freemium Section */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <Badge className="bg-primary/10 text-primary border-primary/20 py-1 px-3">Pricing Plans</Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Start for free, upgrade when you need
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
              Our freemium model lets you explore the platform before committing to a paid plan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <Card className="bg-white border-2">
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Free</h3>
                    <p className="text-gray-500 mb-4">Get started with basic features</p>
                    <div className="flex items-baseline mb-6">
                      <span className="text-4xl font-bold">NPR 0</span>
                      <span className="text-gray-500 ml-2">/month</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6 flex-grow">
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Basic portfolio tracking</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Limited market data</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Educational resources</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>2 AI insight per day</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Lock className="h-5 w-5 mr-2 flex-shrink-0" />
                      <span>Auto-trading features</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Lock className="h-5 w-5 mr-2 flex-shrink-0" />
                      <span>Advanced AI recommendations</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/auth/register">Sign Up Free</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="bg-white border-2 border-primary relative">
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                <Badge className="bg-primary">Most Popular</Badge>
              </div>
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Pro</h3>
                    <p className="text-gray-500 mb-4">For serious investors</p>
                    <div className="flex items-baseline mb-6">
                      <span className="text-4xl font-bold">NPR 1,999</span>
                      <span className="text-gray-500 ml-2">/month</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6 flex-grow">
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Everything in Free</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Full portfolio management</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Real-time market data</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Unlimited AI insights</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Auto-trading capabilities</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Priority support</span>
                    </div>
                  </div>

                  <Button className="w-full" asChild>
                    <Link href="/auth/register">Start 14-Day Free Trial</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="bg-white border-2">
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                    <p className="text-gray-500 mb-4">For institutions & firms</p>
                    <div className="flex items-baseline mb-6">
                      <span className="text-4xl font-bold">Custom</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6 flex-grow">
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Everything in Pro</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Custom AI model training</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Dedicated account manager</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>API access</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Custom reporting</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>SLA guarantees</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/contact">Contact Sales</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 py-1 px-3">Why Choose InvestIQ</Badge>
              <h2 className="text-3xl font-bold tracking-tight mb-6">
                The smartest way to invest in the Nepal Stock Exchange
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="rounded-full bg-primary/10 p-2 h-fit">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">AI-Powered Analysis</h3>
                    <p className="text-gray-600">
                      Our platform aggregates insights from multiple AI models to provide the most accurate predictions
                      for NEPSE stocks.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="rounded-full bg-primary/10 p-2 h-fit">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Risk Management</h3>
                    <p className="text-gray-600">
                      Sophisticated risk assessment tools help you build a balanced portfolio aligned with your
                      investment goals.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="rounded-full bg-primary/10 p-2 h-fit">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Real-time Data</h3>
                    <p className="text-gray-600">
                      Get instant access to market movements, company announcements, and economic indicators that affect
                      your investments.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -z-10 -top-10 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                  <div className="text-4xl font-bold text-primary mb-2">78%</div>
                  <div className="text-gray-600">Accuracy in buy recommendations</div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                  <div className="text-4xl font-bold text-primary mb-2">1,000+</div>
                  <div className="text-gray-600">Active investors using our platform</div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                  <div className="text-4xl font-bold text-primary mb-2">15+</div>
                  <div className="text-gray-600">Years of combined market experience</div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                  <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-gray-600">AI-powered monitoring of your portfolio</div>
                </div>
              </div>
            </div>
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
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" variant="secondary" className="text-primary" asChild>
                <Link href="/auth/register">
                  Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white/10"
                asChild
              >
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
