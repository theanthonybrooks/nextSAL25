"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { useUser } from "@clerk/nextjs"
import { motion } from "framer-motion"
import { CheckCircle2, DollarSign } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

type PricingSwitchProps = {
    onSwitch: (value: string) => void
}

type PricingCardProps = {
    user: any
    isYearly?: boolean
    title: string
    monthlyPrice?: number
    yearlyPrice?: number
    description: string
    features: string[]
    actionLabel: string
    popular?: boolean
    exclusive?: boolean
}

const PricingHeader = ({
    title,
    subtitle,
}: {
    title: string
    subtitle: string
}) => (
    <div className="text-center mb-10">
        <div className="mx-auto w-fit rounded-full border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/30 px-4 py-1 mb-6">
            <div className="flex items-center gap-2 text-sm font-medium text-blue-900 dark:text-blue-200">
                <DollarSign className="h-4 w-4" />
                <span>Pricing</span>
            </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-300 dark:to-white pb-2">
            {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            {subtitle}
        </p>
    </div>
)

const PricingSwitch = ({ onSwitch }: PricingSwitchProps) => (
    <div className="flex justify-center items-center gap-3">
        <Tabs defaultValue="0" className="w-[400px]" onValueChange={onSwitch}>
            <TabsList className="w-full">
                <TabsTrigger value="0" className="w-full">
                    Monthly
                </TabsTrigger>
                <TabsTrigger value="1" className="w-full">
                    Yearly
                </TabsTrigger>
            </TabsList>
        </Tabs>
    </div>
)

const PricingCard = ({
    user,
    isYearly,
    title,
    monthlyPrice,
    yearlyPrice,
    description,
    features,
    actionLabel,
    popular,
    exclusive,
}: PricingCardProps) => {
    const router = useRouter()

    // Instead of useAction from Convex, use our helper function
    const handleCheckout = async (
        interval: "month" | "year",
        plan: "basic" | "pro" | "ultraballs",
    ) => {
        async function getProCheckoutUrl(
            plan: "basic" | "pro" | "ultraballs",
            interval: "month" | "year",
        ): Promise<string | null> {
            try {
                const res = await fetch("/api/subscription/checkout", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        plan,
                        interval,
                        email: user?.primaryEmailAddress?.emailAddress,
                    }),
                })

                if (!res.ok) {
                    const errorData = await res.text()
                    console.error("API Error Response:", errorData)
                    throw new Error("Network response was not ok")
                }
                const data = await res.json()
                return data.checkoutUrl // { checkoutUrl: string }
            } catch (error) {
                console.error("Error in getProCheckoutUrl:", error)
                return null
            }
        }

        try {
            // IMPORTANT: pass plan AND interval
            const checkoutUrl = await getProCheckoutUrl(plan, interval)
            if (checkoutUrl) {
                window.location.href = checkoutUrl
            }
        } catch (error) {
            console.error("Failed to get checkout URL:", error)
        }
    }

    return (
        <Card
            className={cn(
                "w-full max-w-sm flex flex-col justify-between px-2 py-1",
                {
                    "relative border-2 border-blue-500 dark:border-blue-400":
                        popular,
                    "shadow-2xl bg-gradient-to-b from-gray-900 to-gray-800 text-white":
                        exclusive,
                },
            )}
        >
            {popular && (
                <div className="absolute -top-3 left-0 right-0 mx-auto w-fit rounded-full bg-blue-500 dark:bg-blue-400 px-3 py-1">
                    <p className="text-sm font-medium text-white">
                        Most Popular
                    </p>
                </div>
            )}

            <div>
                <CardHeader className="space-y-2 pb-4">
                    <CardTitle className="text-xl">{title}</CardTitle>
                    <CardDescription
                        className={cn("", {
                            "text-gray-300": exclusive,
                        })}
                    >
                        {description}
                    </CardDescription>
                </CardHeader>

                <CardContent className="pb-4">
                    <div className="flex items-baseline gap-1">
                        <span
                            className={cn("text-4xl font-bold", {
                                "text-white": exclusive,
                            })}
                        >
                            ${isYearly ? yearlyPrice : monthlyPrice}
                        </span>
                        <span
                            className={cn("text-muted-foreground", {
                                "text-gray-300": exclusive,
                            })}
                        >
                            {isYearly ? "/yr" : "/mo"}
                        </span>
                    </div>

                    <div className="mt-6 space-y-2">
                        {features.map((feature) => (
                            <div key={feature} className="flex gap-2">
                                <CheckCircle2
                                    className={cn("h-5 w-5 text-blue-500", {
                                        "text-blue-400": exclusive,
                                    })}
                                />
                                <p
                                    className={cn("text-muted-foreground", {
                                        "text-gray-300": exclusive,
                                    })}
                                >
                                    {feature}
                                </p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </div>

            <CardFooter>
                <Button
                    onClick={() => {
                        if (!user) {
                            router.push("/sign-in")
                            return
                        }
                        const plan = title.toLowerCase() as
                            | "basic"
                            | "pro"
                            | "ultraballs" // Convert "Basic" to "basic", etc.
                        handleCheckout(isYearly ? "year" : "month", plan)
                    }}
                    className={cn("w-full", {
                        "bg-blue-500 hover:bg-blue-400": popular,
                        "bg-white text-gray-900 hover:bg-gray-100": exclusive,
                    })}
                >
                    {actionLabel}
                </Button>
            </CardFooter>
        </Card>
    )
}

export default function Pricing() {
    const [isYearly, setIsYearly] = useState<boolean>(false)
    const togglePricingPeriod = (value: string) =>
        setIsYearly(parseInt(value) === 1)
    const { user } = useUser()

    const plans = [
        {
            title: "Basic",
            monthlyPrice: 3,
            yearlyPrice: 30,
            description: "Advanced features for growing teams and businesses.",
            features: [
                "All Basic features",
                "Up to 20 team members",
                "50GB storage",
                "Priority support",
                "Advanced analytics",
            ],
            actionLabel: "Get Pro",
            popular: false,
        },
        {
            title: "Pro",
            monthlyPrice: 5,
            yearlyPrice: 50,
            description: "Advanced features for growing teams and businesses.",
            features: [
                "All Basic features",
                "Up to 20 team members",
                "50GB storage",
                "Priority support",
                "Advanced analytics",
            ],
            actionLabel: "Get Pro",
            popular: true,
        },
        {
            title: "Ultraballs",
            monthlyPrice: 10,
            yearlyPrice: 100,
            description: "Advanced features for growing teams and businesses.",
            features: [
                "All Basic features",
                "Up to 20 team members",
                "50GB storage",
                "Priority support",
                "Advanced analytics",
            ],
            actionLabel: "Get Pro",
            popular: false,
        },
    ]

    return (
        <section className="px-4">
            <div className="max-w-7xl mx-auto">
                <PricingHeader
                    title="Choose Your Plan"
                    subtitle="Select the perfect plan for your needs. All plans include a 14-day free trial."
                />
                <PricingSwitch onSwitch={togglePricingPeriod} />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex justify-center mt-10 gap-5"
                >
                    {plans.map((plan) => (
                        <PricingCard
                            key={plan.title}
                            user={user}
                            {...plan}
                            isYearly={isYearly}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
