"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Check, X, HelpCircle, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

// Plan feature type
type PlanFeature = {
  name: string
  included: boolean | string
  tooltip?: string
}

// Plan type
type Plan = {
  id: string
  name: string
  description: string
  price: {
    monthly: number
    yearly: number
  }
  features: PlanFeature[]
  popular?: boolean
  badge?: string
  gradient: string
  buttonGradient: string
}

// Plans data
const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    description: "Basic features for individuals getting started",
    price: {
      monthly: 0,
      yearly: 0,
    },
    features: [
      { name: "Up to 3 listings", included: true },
      { name: "Basic analytics", included: true },
      { name: "Email support", included: true },
      { name: "Community access", included: true },
      { name: "AI assistant", included: "Limited" },
      { name: "Custom branding", included: false },
      { name: "Advanced analytics", included: false },
      { name: "Priority support", included: false },
    ],
    gradient: "from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900",
    buttonGradient: "from-gray-500 to-gray-700",
  },
  {
    id: "pro",
    name: "Pro",
    description: "Everything you need for a growing business",
    price: {
      monthly: 29,
      yearly: 290,
    },
    popular: true,
    badge: "Most Popular",
    features: [
      { name: "Up to 25 listings", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Priority email support", included: true },
      { name: "Community access", included: true },
      { name: "AI assistant", included: true },
      { name: "Custom branding", included: true },
      { name: "API access", included: true, tooltip: "Access our API to build custom integrations" },
      { name: "Dedicated account manager", included: false },
    ],
    gradient: "from-purple-500 to-blue-600",
    buttonGradient: "from-purple-600 to-blue-700",
  },
  {
    id: "business",
    name: "Business",
    description: "Advanced features for businesses at scale",
    price: {
      monthly: 99,
      yearly: 990,
    },
    features: [
      { name: "Unlimited listings", included: true },
      { name: "Enterprise analytics", included: true },
      { name: "24/7 phone & email support", included: true },
      { name: "Community access", included: true },
      { name: "AI assistant", included: "Advanced" },
      { name: "Custom branding", included: true },
      { name: "API access", included: true },
      { name: "Dedicated account manager", included: true },
    ],
    gradient: "from-pink-500 to-orange-500",
    buttonGradient: "from-pink-600 to-orange-600",
  },
]

export default function PricingPage() {
  const [yearlyBilling, setYearlyBilling] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br pt-24 from-background via-background to-muted/20 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Plan</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Select the perfect plan for your needs. Upgrade or downgrade at any time.
            </p>
          </motion.div>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center justify-center mt-8 space-x-4"
          >
            <span className={cn("text-sm", !yearlyBilling && "font-medium")}>Monthly</span>
            <div className="relative">
              <Switch
                checked={yearlyBilling}
                onCheckedChange={setYearlyBilling}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-600 data-[state=checked]:to-blue-600"
              />
              {yearlyBilling && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute -top-8 -right-12 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs px-2 py-1 rounded-full"
                >
                  Save 20%
                </motion.div>
              )}
            </div>
            <span className={cn("text-sm", yearlyBilling && "font-medium")}>Yearly</span>
          </motion.div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
              className="flex"
            >
              <Card
                className={cn(
                  "relative w-full backdrop-blur-sm border-border/50 p-5 shadow-lg overflow-hidden",
                  plan.popular ? "shadow-lg shadow-purple-500/10 scale-105 z-10" : "bg-card/50",
                )}
              >
                {/* Gradient Border Effect for Popular Plan */}
                {plan.popular && (
                  <div className="absolute inset-0 p-0.5 rounded-lg bg-gradient-to-r from-purple-500 to-blue-600">
                    <div className="absolute inset-0 bg-card rounded-[7px]" />
                  </div>
                )}

                {/* Badge */}
                {plan.badge && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-medium px-3 py-1 rounded-bl-lg rounded-tr-lg flex items-center">
                      <Sparkles className="w-3 h-3 mr-1" />
                      {plan.badge}
                    </div>
                  </div>
                )}

                <div className="relative">
                  <CardHeader>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Price */}
                    <div className="flex items-baseline">
                      <span className="text-3xl md:text-4xl font-bold">
                        {plan.price[yearlyBilling ? "yearly" : "monthly"] === 0
                          ? "Free"
                          : `€${plan.price[yearlyBilling ? "yearly" : "monthly"]}`}
                      </span>
                      {plan.price[yearlyBilling ? "yearly" : "monthly"] > 0 && (
                        <span className="text-muted-foreground ml-2">/{yearlyBilling ? "year" : "month"}</span>
                      )}
                    </div>

                    {/* Features */}
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <div className="flex-shrink-0 mt-0.5">
                            {feature.included === true ? (
                              <div className="rounded-full p-1 bg-green-500/20 text-green-600">
                                <Check className="w-3 h-3" />
                              </div>
                            ) : feature.included === false ? (
                              <div className="rounded-full p-1 bg-gray-200/50 dark:bg-gray-800/50 text-muted-foreground">
                                <X className="w-3 h-3" />
                              </div>
                            ) : (
                              <div className="rounded-full p-1 bg-blue-500/20 text-blue-600">
                                <Check className="w-3 h-3" />
                              </div>
                            )}
                          </div>
                          <div className="ml-3 flex items-center">
                            <span className="text-sm">
                              {feature.name}
                              {feature.included !== true && feature.included !== false && (
                                <span className="ml-1 text-xs text-muted-foreground">({feature.included})</span>
                              )}
                            </span>
                            {feature.tooltip && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <HelpCircle className="w-3 h-3 ml-1 text-muted-foreground" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="text-xs max-w-[200px]">{feature.tooltip}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className={cn(
                        "w-full group relative overflow-hidden",
                        plan.popular
                          ? `bg-gradient-to-r ${plan.buttonGradient} hover:brightness-110 text-white shadow-lg shadow-purple-500/20`
                          : plan.id === "free"
                            ? "bg-gradient-to-r from-gray-500 to-gray-700 hover:brightness-110 text-white"
                            : `bg-gradient-to-r ${plan.buttonGradient} hover:brightness-110 text-white`,
                      )}
                    >
                      <span className="relative z-10 flex items-center">
                        Get Started
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </span>
                      <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                    </Button>
                  </CardFooter>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-24 max-w-3xl mx-auto text-center"
        >
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 text-left">
              <CardHeader>
                <CardTitle className="text-lg">Can I change plans later?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 text-left">
              <CardHeader>
                <CardTitle className="text-lg">What payment methods do you accept?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We accept all major credit cards, PayPal, and bank transfers for yearly plans.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 text-left">
              <CardHeader>
                <CardTitle className="text-lg">Do you offer refunds?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Yes, we offer a 14-day money-back guarantee for all paid plans.</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 text-left">
              <CardHeader>
                <CardTitle className="text-lg">Do you offer custom plans?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes, contact our sales team for custom enterprise solutions tailored to your needs.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-4">Still have questions? Contact our support team for assistance.</p>
          <Button variant="outline">Contact Support</Button>
        </motion.div>
      </div>
    </div>
  )
}
