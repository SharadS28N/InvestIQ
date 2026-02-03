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
} from "lucide-react"
import { getUserData } from './getUsers'
import { LandingHeroButtons } from '@/components/landing-hero-buttons'
import DynamicPortfolioPreview from "@/components/landing/dynamic-portfolio-preview"
import { cookies } from "next/headers"


export default async function LandingPage() {
  const { userCount, profileImages } = await getUserData()
  const cookieStore = await cookies()
  const token = cookieStore.get("firebaseToken")?.value
  const isSignedIn = Boolean(token)
  return (
    <div className="flex flex-col min-h-svh">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-background z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 dark:from-primary/20 dark:to-accent/20 z-0"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5 z-0"></div>

        <div className="relative z-10 w-full px-4 md:px-6 max-w-none">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                Invest Smarter, <span className="text-primary dark:text-primary-foreground">Grow Better</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-lg dark:text-gray-300">
                InvestIQ combines artificial intelligence with deep market knowledge to help you make data-driven
                investment decisions in the Nepal Stock Exchange.
              </p>
              <LandingHeroButtons />
              <div className="flex items-center gap-2 pt-4">
                <div className="flex -space-x-2">
                  {/* Map through profile images */}
                  {(profileImages || []).map((image, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 overflow-hidden"
                    >
                      <img
                        src={`/api/proxy-image?url=${encodeURIComponent(image)}`}
                        alt={`User ${index + 1}`}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-medium">{userCount.toLocaleString()}</span> investors already using InvestIQ
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl dark:bg-primary/20"></div>
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-brand-accent1/10 rounded-full blur-3xl dark:bg-brand-accent1/20"></div>

              <div className="relative bg-white border rounded-2xl shadow-xl overflow-hidden dark:bg-gray-900 dark:border-gray-800">
                <div className="p-4 border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded-md bg-primary p-1">
                      <LineChart className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div className="font-semibold text-lg dark:text-white">Market Snapshot</div>
                  </div>
                  <div className="text-xs text-muted-foreground">NEPSE • Live</div>
                </div>
                <div className="p-4 md:p-6">
                  <div className="relative w-full h-56 md:h-72">
                    <svg viewBox="0 0 800 320" className="w-full h-full">
                      <defs>
                        <linearGradient id="fillGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="currentColor" stopOpacity="0.18" />
                          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <g className="text-primary dark:text-primary-300">
                        <path d="M0 220 L40 210 L80 230 L120 200 L160 210 L200 190 L240 220 L280 200 L320 210 L360 180 L400 210 L440 200 L480 230 L520 210 L560 240 L600 220 L640 250 L680 240 L720 270 L760 260 L800 280" fill="none" stroke="currentColor" strokeWidth="3" style={{strokeDasharray: "1200 1200", strokeDashoffset: 1200, animation: "dash 2400ms ease-out forwards"}} />
                        <path d="M0 220 L40 210 L80 230 L120 200 L160 210 L200 190 L240 220 L280 200 L320 210 L360 180 L400 210 L440 200 L480 230 L520 210 L560 240 L600 220 L640 250 L680 240 L720 270 L760 260 L800 280" fill="url(#fillGradient)" />
                      </g>
                      <g className="text-muted-foreground">
                        <line x1="0" y1="280" x2="800" y2="280" stroke="currentColor" strokeOpacity="0.25" />
                        <line x1="0" y1="240" x2="800" y2="240" stroke="currentColor" strokeOpacity="0.15" />
                        <line x1="0" y1="200" x2="800" y2="200" stroke="currentColor" strokeOpacity="0.1" />
                      </g>
                    </svg>
                    <div className="absolute top-2 right-2 flex items-center gap-2 px-2 py-1 rounded-md bg-white/80 backdrop-blur dark:bg-gray-800/80">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-xs text-muted-foreground">Updating</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="bg-gray-50 p-3 rounded-lg dark:bg-gray-800">
                      <div className="text-sm text-gray-500 dark:text-gray-300">NEPSE Index</div>
                      <div className="text-xl md:text-2xl font-bold dark:text-white">2,345.21</div>
                      <div className="text-xs text-green-600 dark:text-green-400">+1.12%</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg dark:bg-gray-800">
                      <div className="text-sm text-gray-500 dark:text-gray-300">Top Gainer</div>
                      <div className="text-lg font-semibold dark:text-white">NABIL</div>
                      <div className="text-xs text-green-600 dark:text-green-400">+3.8%</div>
                    </div>
                  </div>
                </div>
              </div>
              <style>{`@keyframes dash { to { stroke-dashoffset: 0; } }`}</style>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="w-full px-4 md:px-6 max-w-none">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <Badge className="bg-primary/10 text-primary border-primary/20 py-1 px-3 dark:bg-primary/20 dark:text-primary-foreground dark:border-primary/40">Powerful Features</Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl dark:text-white">
              Everything you need to succeed in NEPSE
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-300">
              Our platform combines AI intelligence with powerful tools to help you make better investment decisions.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12">
            <Card className="bg-white border-2 border-muted dark:bg-gray-900 dark:border-gray-800 transition-transform duration-300 hover:scale-[1.01] hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="rounded-full bg-primary/10 p-3 dark:bg-primary/20">
                    <Brain className="h-6 w-6 text-primary dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-bold dark:text-white">AI-Powered Insights</h3>
                  <p className="text-gray-500 dark:text-gray-300">
                    Get intelligent stock recommendations from multiple AI models with confidence scores.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white border-2 border-muted dark:bg-gray-900 dark:border-gray-800 transition-transform duration-300 hover:scale-[1.01] hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="rounded-full bg-primary/10 p-3 dark:bg-primary/20">
                    <BarChart3 className="h-6 w-6 text-primary dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-bold dark:text-white">Portfolio Management</h3>
                  <p className="text-gray-500 dark:text-gray-300">
                    Track your investments, analyze performance, and manage your portfolio in one place.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white border-2 border-muted dark:bg-gray-900 dark:border-gray-800 transition-transform duration-300 hover:scale-[1.01] hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="rounded-full bg-primary/10 p-3 dark:bg-primary/20">
                    <TrendingUp className="h-6 w-6 text-primary dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-bold dark:text-white">Auto Trading</h3>
                  <p className="text-gray-500 dark:text-gray-300">
                    Set up automated trading based on AI recommendations with customizable risk controls.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Freemium Section */}
      {!isSignedIn && (
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <Badge className="bg-primary/10 text-primary border-primary/20 py-1 px-3 dark:bg-primary/20 dark:text-primary-foreground dark:border-primary/40">Pricing Plans</Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl dark:text-white">
              Start for free, upgrade when you need
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-300">
              Our freemium model lets you explore the platform before committing to a paid plan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-none">
            {/* Basic Plan */}
            <Card className="bg-white border-2 dark:bg-gray-800 dark:border-gray-700 transition-transform duration-300 hover:scale-[1.01] hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <div>
                    <h3 className="text-xl font-bold mb-2 dark:text-white">Basic</h3>
                    <p className="text-gray-500 mb-4 dark:text-gray-300">Essential features for new investors</p>
                    <div className="flex items-baseline mb-6">
                      <span className="text-4xl font-bold dark:text-white">NPR 499</span>
                      <span className="text-gray-500 ml-2 dark:text-gray-300">/month</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6 flex-grow">
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 dark:text-green-400" />
                      <span className="dark:text-white">Portfolio tracking</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 dark:text-green-400" />
                      <span className="dark:text-white">Basic AI insights</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 dark:text-green-400" />
                      <span className="dark:text-white">Market data access</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 dark:text-green-400" />
                      <span className="dark:text-white">Educational resources</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 dark:text-green-400" />
                      <span className="dark:text-white">Email Support</span>
                    </div>
                    <div className="flex items-center text-gray-400 dark:text-gray-600">
                      <Lock className="h-5 w-5 mr-2 flex-shrink-0" />
                      <span className="dark:text-white">Auto-trading features</span>
                    </div>
                    <div className="flex items-center text-gray-400 dark:text-gray-600">
                      <Lock className="h-5 w-5 mr-2 flex-shrink-0" />
                      <span className="dark:text-white">Advanced AI recommendations</span>
                    </div>
                    <div className="flex items-center text-gray-400 dark:text-gray-600">
                      <Lock className="h-5 w-5 mr-2 flex-shrink-0" />
                      <span className="dark:text-white">Real-time alert</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full dark:bg-primary dark:text-primary-foreground" asChild>
                    <Link href="/auth/register">Sign Up Free</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="bg-white border-2 border-primary relative dark:bg-gray-800 dark:border-primary transition-transform duration-300 hover:scale-[1.01] hover:shadow-lg">
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                <Badge className="bg-primary dark:bg-primary-700">Most Popular</Badge>
              </div>
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <div>
                    <h3 className="text-xl font-bold mb-2 dark:text-white">Pro</h3>
                    <p className="text-gray-500 mb-4 dark:text-gray-300">For Serious Investors</p>
                    <div className="flex items-baseline mb-6">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">NPR 1,999</span>
                      <span className="text-gray-500 ml-2 dark:text-gray-400">/month</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6 flex-grow">
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 dark:text-green-400" />
                      <span className="dark:text-white">Everything in Free</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 dark:text-green-400" />
                      <span className="dark:text-white">Full portfolio management</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 dark:text-green-400" />
                      <span className="dark:text-white">Real-time market data</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 dark:text-green-400" />
                      <span className="dark:text-white">Unlimited AI insights</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 dark:text-green-400" />
                      <span className="dark:text-white">Auto-trading capabilities</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 dark:text-green-400" />
                      <span className="dark:text-white">Priority support</span>
                    </div>
                  </div>

                  <Button className="w-full dark:bg-primary dark:text-primary-foreground" asChild>
                    <Link href="/auth/register">Start 14-Day Free Trial</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="bg-white border-2 dark:bg-gray-800 dark:border-gray-700 transition-transform duration-300 hover:scale-[1.01] hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <div>
                    <h3 className="text-xl font-bold mb-2 dark:text-white">Enterprise</h3>
                    <p className="text-gray-500 mb-4 dark:text-gray-300">For institutions & firms</p>
                    <div className="flex items-baseline mb-6">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">Custom</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6 flex-grow">
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 dark:text-green-400" />
                      <span className="dark:text-white">Everything in Pro</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 dark:text-green-400" />
                      <span className="dark:text-white">Custom AI model training</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 dark:text-green-400" />
                      <span className="dark:text-white">Dedicated account manager</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 dark:text-green-400" />
                      <span className="dark:text-white">API access</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 dark:text-green-400" />
                      <span className="dark:text-white">Custom reporting</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 dark:text-green-400" />
                      <span className="dark:text-white">SLA guarantees</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full dark:bg-primary dark:text-primary-foreground" asChild>
                    <Link href="/contact">Contact Sales</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      )}

      {/* Why Choose Us */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="w-full px-4 md:px-6 max-w-none">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 py-1 px-3 dark:bg-primary/20 dark:text-primary-foreground dark:border-primary/40">Why Choose InvestIQ</Badge>
              <h2 className="text-3xl font-bold tracking-tight mb-6 dark:text-white">
                The smartest way to invest in the Nepal Stock Exchange
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="rounded-full bg-primary/10 p-2 h-fit dark:bg-primary/20">
                    <Sparkles className="h-5 w-5 text-primary dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 dark:text-white">AI-Powered Analysis</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Our platform aggregates insights from multiple AI models to provide the most accurate predictions
                      for NEPSE stocks.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="rounded-full bg-primary/10 p-2 h-fit dark:bg-primary/20">
                    <Shield className="h-5 w-5 text-primary dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 dark:text-white">Risk Management</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Sophisticated risk assessment tools help you build a balanced portfolio aligned with your
                      investment goals.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="rounded-full bg-primary/10 p-2 h-fit dark:bg-primary/20">
                    <Zap className="h-5 w-5 text-primary dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 dark:text-white">Real-time Data</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Get instant access to market movements, company announcements, and economic indicators that affect
                      your investments.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -z-10 -top-10 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl dark:bg-primary/20"></div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-6 shadow-sm dark:bg-gray-800">
                  <div className="text-4xl font-bold text-primary mb-2 dark:text-primary-400">78%</div>
                  <div className="text-gray-600 dark:text-gray-300">Accuracy in buy recommendations</div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 shadow-sm dark:bg-gray-800">
                  <div className="text-4xl font-bold text-primary mb-2 dark:text-primary-400">1,000+</div>
                  <div className="text-gray-600 dark:text-gray-300">Active investors using our platform</div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 shadow-sm dark:bg-gray-800">
                  <div className="text-4xl font-bold text-primary mb-2 dark:text-primary-400">15+</div>
                  <div className="text-gray-600 dark:text-gray-300">Years of combined market experience</div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 shadow-sm dark:bg-gray-800">
                  <div className="text-4xl font-bold text-primary mb-2 dark:text-primary-400">24/7</div>
                  <div className="text-gray-600 dark:text-gray-300">AI-powered monitoring of your portfolio</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isSignedIn && (
     <section className="py-12 md:py-16 bg-primary text-primary-foreground">
        <div className="w-full px-4 md:px-6 max-w-none">
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
      )}
    </div>
  )
}
