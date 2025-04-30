import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle } from "lucide-react"

export default function PricingPage() {
  const plans = [
    {
      name: "Basic",
      description: "Essential features for new investors",
      price: "NPR 499",
      period: "/month",
      features: [
        { name: "Portfolio tracking", included: true },
        { name: "Basic AI insights", included: true },
        { name: "Market data access", included: true },
        { name: "Educational resources", included: true },
        { name: "Email support", included: true },
        { name: "Auto-trading capabilities", included: false },
        { name: "Advanced AI recommendations", included: false },
        { name: "Real-time alerts", included: false },
      ],
      popular: false,
      buttonText: "Get Started",
      buttonVariant: "outline",
    },
    {
      name: "Pro",
      description: "Advanced features for serious investors",
      price: "NPR 1,999",
      period: "/month",
      features: [
        { name: "Everything in Basic", included: true },
        { name: "Advanced AI recommendations", included: true },
        { name: "Auto-trading capabilities", included: true },
        { name: "Real-time alerts", included: true },
        { name: "Priority support", included: true },
        { name: "Custom risk profiles", included: true },
        { name: "API access", included: false },
        { name: "Custom reporting", included: false },
      ],
      popular: true,
      buttonText: "Get Started",
      buttonVariant: "default",
    },
    {
      name: "Enterprise",
      description: "Custom solutions for institutions",
      price: "Custom",
      period: "",
      features: [
        { name: "Everything in Pro", included: true },
        { name: "Custom AI model training", included: true },
        { name: "Dedicated account manager", included: true },
        { name: "API access", included: true },
        { name: "Custom reporting", included: true },
        { name: "White-label options", included: true },
        { name: "On-premise deployment", included: true },
        { name: "SLA guarantees", included: true },
      ],
      popular: false,
      buttonText: "Contact Sales",
      buttonVariant: "outline",
    },
  ]

  return (
    <div className="container py-12 md:py-24">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Simple, transparent pricing</h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
            Choose the plan that's right for your investment needs. All plans include a 10-day free trial.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card key={plan.name} className={`flex flex-col ${plan.popular ? "border-2 border-primary" : ""} relative`}>
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">Most Popular</Badge>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4 flex items-baseline text-gray-900">
                <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
                <span className="ml-1 text-xl font-semibold">{plan.period}</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature.name} className="flex items-center">
                    {feature.included ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    ) : (
                      <XCircle className="h-5 w-5 text-gray-300 mr-2" />
                    )}
                    <span className={feature.included ? "" : "text-gray-500"}>{feature.name}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={plan.buttonVariant as "default" | "outline"} asChild>
                <Link href={plan.name === "Enterprise" ? "/contact" : "/auth/register"}>{plan.buttonText}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-6 text-left">
          <div>
            <h3 className="font-bold mb-2">Can I change plans later?</h3>
            <p className="text-gray-500">
              Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next
              billing cycle.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Is there a free trial?</h3>
            <p className="text-gray-500">
              Yes, all plans come with a 10-day free trial. No credit card required to start.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">What payment methods do you accept?</h3>
            <p className="text-gray-500">
              We accept all major credit cards, eSewa, Khalti, and bank transfers for annual plans.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Can I cancel my subscription?</h3>
            <p className="text-gray-500">
              Yes, you can cancel your subscription at any time from your account settings. You'll continue to have
              access until the end of your current billing period.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
