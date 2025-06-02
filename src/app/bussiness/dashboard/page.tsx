"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import {
  BarChart3,
  Edit3,
  Eye,
  Home,
  MessageSquare,
  Plus,
  Search,
  Settings,
  TrendingUp,
  Upload,
  MoreHorizontal,
  Download,
  ArrowUp,
  ArrowDown,
  DollarSign,
  Users,
  Calendar,
  Bell,
  Shield,
  Palette,
  CreditCard,
  User,
  Building,
  Menu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

// Mock data
const businessData = {
  name: "Amsterdam Properties",
  type: "Property Management",
  logo: "/placeholder.svg?height=60&width=60",
  coverImage: "/placeholder.svg?height=200&width=800",
  description: "Premium property management services in Amsterdam and surrounding areas.",
  stats: {
    totalListings: 24,
    activeListings: 18,
    totalViews: 12450,
    totalInquiries: 342,
    averageRating: 4.8,
    responseRate: 95,
    revenue: 24680,
    applicants: 156,
    impressions: 28750,
  },
  recentActivity: [
    { id: 1, type: "inquiry", message: "New inquiry for Canal View Apartment", time: "2 hours ago" },
    { id: 2, type: "listing", message: "Apartment listing approved", time: "4 hours ago" },
    { id: 3, type: "review", message: "New 5-star review received", time: "1 day ago" },
  ],
  analytics: {
    monthly: [
      { month: "Jan", listings: 12, views: 5200, inquiries: 120, revenue: 12500 },
      { month: "Feb", listings: 14, views: 6100, inquiries: 145, revenue: 14200 },
      { month: "Mar", listings: 16, views: 7300, inquiries: 168, revenue: 16800 },
      { month: "Apr", listings: 18, views: 8500, inquiries: 210, revenue: 18900 },
      { month: "May", listings: 20, views: 9800, inquiries: 245, revenue: 21500 },
      { month: "Jun", listings: 24, views: 12450, inquiries: 342, revenue: 24680 },
    ],
  },
}

const listings = [
  {
    id: 1,
    title: "Modern Canal View Apartment",
    type: "Apartment",
    price: "€1,800/month",
    location: "Jordaan, Amsterdam",
    status: "active",
    views: 245,
    inquiries: 12,
    image: "/placeholder.svg?height=100&width=150",
    datePosted: "2024-01-10",
  },
  {
    id: 2,
    title: "Cozy Studio in City Center",
    type: "Studio",
    price: "€1,200/month",
    location: "Centrum, Amsterdam",
    status: "active",
    views: 189,
    inquiries: 8,
    image: "/placeholder.svg?height=100&width=150",
    datePosted: "2024-01-08",
  },
  {
    id: 3,
    title: "Spacious Family House",
    type: "House",
    price: "€2,500/month",
    location: "Amstelveen",
    status: "pending",
    views: 156,
    inquiries: 15,
    image: "/placeholder.svg?height=100&width=150",
    datePosted: "2024-01-05",
  },
]

const sidebarItems = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "listings", label: "Listings", icon: Home },
  { id: "inquiries", label: "Inquiries", icon: MessageSquare },
  { id: "analytics", label: "Analytics", icon: TrendingUp },
  { id: "settings", label: "Settings", icon: Settings },
]

// Animated Counter Component
const AnimatedCounter = ({
  value,
  duration = 2,
  decimals = 0,
}: { value: number; duration?: number; decimals?: number }) => {
  const [count, setCount] = useState(0)
  const countRef = useRef(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)

      const currentCount = Math.floor(progress * value)
      if (currentCount !== countRef.current) {
        countRef.current = currentCount
        setCount(currentCount)
      }

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount)
      } else {
        setCount(value)
      }
    }

    animationFrame = requestAnimationFrame(updateCount)
    return () => cancelAnimationFrame(animationFrame)
  }, [value, duration])

  return (
    <span>
      {decimals > 0
        ? count.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
        : count.toLocaleString()}
    </span>
  )
}

// Enhanced Chart Component
const AnalyticsChart = ({ data, type }: { data: any[]; type: string }) => {
  const maxValue = Math.max(...data.map((item) => item[type]))

  return (
    <div className="w-full h-[250px] md:h-[300px] relative p-4">
      {/* Y-axis labels */}
      <div className="absolute left-0 top-4 bottom-4 flex flex-col justify-between text-xs text-muted-foreground w-12">
        <span>{maxValue.toLocaleString()}</span>
        <span>{Math.floor(maxValue * 0.75).toLocaleString()}</span>
        <span>{Math.floor(maxValue * 0.5).toLocaleString()}</span>
        <span>{Math.floor(maxValue * 0.25).toLocaleString()}</span>
        <span>0</span>
      </div>

      {/* Chart area */}
      <div className="ml-14 mr-4 h-full flex items-end border-l border-b border-border/50">
        {data.map((item, index) => {
          const height = (item[type] / maxValue) * 100
          const gradientClass =
            type === "revenue"
              ? "from-blue-500 to-purple-600"
              : type === "views"
                ? "from-pink-500 to-orange-500"
                : type === "inquiries"
                  ? "from-emerald-500 to-teal-600"
                  : "from-violet-500 to-indigo-600"

          return (
            <div
              key={index}
              className="group relative flex-1 flex flex-col items-center justify-end h-[220px] md:h-[260px] px-1"
            >
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 1, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`w-full max-w-[40px] rounded-t-md bg-gradient-to-t ${gradientClass} shadow-lg`}
              />
              <div className="mt-2 text-xs text-muted-foreground font-medium">{item.month}</div>

              {/* Tooltip */}
              <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-popover text-popover-foreground text-xs p-3 rounded-md shadow-lg pointer-events-none z-10 min-w-[120px]">
                <div className="font-medium">{item.month}</div>
                <div className="text-muted-foreground">
                  {type.charAt(0).toUpperCase() + type.slice(1)}: {item[type].toLocaleString()}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Trend Indicator Component
const TrendIndicator = ({ value, previousValue }: { value: number; previousValue: number }) => {
  const percentChange = previousValue ? ((value - previousValue) / previousValue) * 100 : 0
  const isPositive = percentChange >= 0

  return (
    <div className={`flex items-center text-xs font-medium ${isPositive ? "text-green-500" : "text-red-500"}`}>
      {isPositive ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
      <span>{Math.abs(percentChange).toFixed(1)}%</span>
    </div>
  )
}

// Mobile Sidebar Component
const MobileSidebar = ({ activeTab, setActiveTab, businessData }: any) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0 pt-20">
        <div className="p-6">
          {/* Business Info */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={businessData.logo || "/placeholder.svg"} alt={businessData.name} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">AP</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">{businessData.name}</h2>
                <p className="text-sm text-muted-foreground">{businessData.type}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors",
                  activeTab === item.id
                    ? "bg-blue-500/20 text-blue-700 border border-blue-500/30"
                    : "hover:bg-muted/50 text-muted-foreground hover:text-foreground",
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default function BusinessDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [chartType, setChartType] = useState("revenue")
  const [timeRange, setTimeRange] = useState("monthly")

  const filteredListings = listings.filter((listing) => {
    const matchesSearch =
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || listing.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-700 border-green-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-700 border-yellow-500/30"
      case "inactive":
        return "bg-gray-500/20 text-gray-700 border-gray-500/30"
      default:
        return "bg-gray-500/20 text-gray-700 border-gray-500/30"
    }
  }

  // Get previous month's data for trend calculation
  const currentMonthData = businessData.analytics.monthly[businessData.analytics.monthly.length - 1]
  const previousMonthData = businessData.analytics.monthly[businessData.analytics.monthly.length - 2]

  return (
    <div className="min-h-screen bg-gradient-to-br pt-20 from-background via-background to-muted/20">
      <div className="flex">
        {/* Desktop Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:block w-64 min-h-screen bg-card/50 backdrop-blur-sm border-r border-border/50 p-6"
        >
          {/* Business Info */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={businessData.logo || "/placeholder.svg"} alt={businessData.name} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">AP</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">{businessData.name}</h2>
                <p className="text-sm text-muted-foreground">{businessData.type}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors",
                  activeTab === item.id
                    ? "bg-blue-500/20 text-blue-700 border border-blue-500/30"
                    : "hover:bg-muted/50 text-muted-foreground hover:text-foreground",
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 lg:space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <MobileSidebar activeTab={activeTab} setActiveTab={setActiveTab} businessData={businessData} />
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold">Business Dashboard</h1>
                  <p className="text-muted-foreground">Manage your listings and track performance</p>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                New Listing
              </Button>
            </div>

            {activeTab === "overview" && (
              <div className="space-y-6 lg:space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-xl transition-shadow overflow-hidden group">
                    <CardContent className="p-4 lg:p-6">
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full flex items-center justify-center">
                          <DollarSign className="w-5 h-5 lg:w-6 lg:h-6 text-blue-500" />
                        </div>
                        <TrendIndicator value={currentMonthData.revenue} previousValue={previousMonthData.revenue} />
                      </div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Revenue</h3>
                      <div className="flex items-baseline">
                        <span className="text-xl lg:text-2xl font-bold">€</span>
                        <span className="text-2xl lg:text-3xl font-bold ml-1">
                          <AnimatedCounter value={businessData.stats.revenue} />
                        </span>
                      </div>
                      <div className="mt-4 h-1 w-full bg-muted overflow-hidden rounded-full">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "85%" }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-xl transition-shadow overflow-hidden group">
                    <CardContent className="p-4 lg:p-6">
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-pink-500/20 to-orange-500/20 rounded-full flex items-center justify-center">
                          <Eye className="w-5 h-5 lg:w-6 lg:h-6 text-pink-500" />
                        </div>
                        <TrendIndicator value={currentMonthData.views} previousValue={previousMonthData.views} />
                      </div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Impressions</h3>
                      <div className="text-2xl lg:text-3xl font-bold">
                        <AnimatedCounter value={businessData.stats.impressions} />
                      </div>
                      <div className="mt-4 h-1 w-full bg-muted overflow-hidden rounded-full">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "72%" }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-pink-500 to-orange-500"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-xl transition-shadow overflow-hidden group">
                    <CardContent className="p-4 lg:p-6">
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 lg:w-6 lg:h-6 text-emerald-500" />
                        </div>
                        <TrendIndicator
                          value={currentMonthData.inquiries}
                          previousValue={previousMonthData.inquiries}
                        />
                      </div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Applicants</h3>
                      <div className="text-2xl lg:text-3xl font-bold">
                        <AnimatedCounter value={businessData.stats.applicants} />
                      </div>
                      <div className="mt-4 h-1 w-full bg-muted overflow-hidden rounded-full">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "65%" }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-600"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-xl transition-shadow overflow-hidden group">
                    <CardContent className="p-4 lg:p-6">
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-violet-500/20 to-indigo-600/20 rounded-full flex items-center justify-center">
                          <Home className="w-5 h-5 lg:w-6 lg:h-6 text-violet-500" />
                        </div>
                        <TrendIndicator value={currentMonthData.listings} previousValue={previousMonthData.listings} />
                      </div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Active Listings</h3>
                      <div className="text-2xl lg:text-3xl font-bold">
                        <AnimatedCounter value={businessData.stats.activeListings} />
                      </div>
                      <div className="mt-4 h-1 w-full bg-muted overflow-hidden rounded-full">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "90%" }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-violet-500 to-indigo-600"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Business Summary */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
                    <CardHeader>
                      <CardTitle>Business Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="relative h-32 border mt-5 border-dashed rounded-lg overflow-hidden">
                        {/* <img
                          src={businessData.coverImage || "/placeholder.svg"}
                          alt="Business cover"
                          className="w-full h-full object-cover"
                        /> */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <Button
                          size="sm"
                          variant="outline"
                          className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Change Cover
                        </Button>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{businessData.name}</h3>
                        <p className="text-muted-foreground">{businessData.description}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{businessData.type}</Badge>
                        <Button variant="ghost" size="sm">
                          <Edit3 className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 mt-5">
                        {businessData.recentActivity.map((activity) => (
                          <div key={activity.id} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                            <div className="flex-1">
                              <p className="text-sm">{activity.message}</p>
                              <p className="text-xs text-muted-foreground">{activity.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === "analytics" && (
              <div className="space-y-6 lg:space-y-8">
                {/* Enhanced Analytics Section */}
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg overflow-hidden">
                  <CardHeader className="pb-0">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl">Business Analytics</CardTitle>
                        <CardDescription>Performance metrics and trends</CardDescription>
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                        <Select value={timeRange} onValueChange={setTimeRange}>
                          <SelectTrigger className="w-full sm:w-[120px]">
                            <Calendar className="w-4 h-4 mr-2" />
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="yearly">Yearly</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="outline" size="icon">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {/* Chart Section */}
                    <div className="bg-card/30 backdrop-blur-sm rounded-lg p-4 border border-border/50">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                        <h3 className="font-medium">Performance Trends</h3>
                        <div className="flex flex-wrap items-center gap-2">
                          <Button
                            variant={chartType === "revenue" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setChartType("revenue")}
                            className={chartType === "revenue" ? "bg-gradient-to-r from-blue-500 to-purple-600" : ""}
                          >
                            Revenue
                          </Button>
                          <Button
                            variant={chartType === "views" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setChartType("views")}
                            className={chartType === "views" ? "bg-gradient-to-r from-pink-500 to-orange-500" : ""}
                          >
                            Views
                          </Button>
                          <Button
                            variant={chartType === "inquiries" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setChartType("inquiries")}
                            className={chartType === "inquiries" ? "bg-gradient-to-r from-emerald-500 to-teal-600" : ""}
                          >
                            Inquiries
                          </Button>
                          <Button
                            variant={chartType === "listings" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setChartType("listings")}
                            className={chartType === "listings" ? "bg-gradient-to-r from-violet-500 to-indigo-600" : ""}
                          >
                            Listings
                          </Button>
                        </div>
                      </div>
                      <AnalyticsChart data={businessData.analytics.monthly} type={chartType} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6 lg:space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                  {/* Settings Navigation */}
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg lg:col-span-1">
                    <CardHeader>
                      <CardTitle className="text-lg">Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <nav className="space-y-1">
                        {[
                          { id: "profile", label: "Business Profile", icon: Building },
                          { id: "account", label: "Account Settings", icon: User },
                          { id: "notifications", label: "Notifications", icon: Bell },
                          { id: "security", label: "Security", icon: Shield },
                          { id: "billing", label: "Billing", icon: CreditCard },
                          { id: "appearance", label: "Appearance", icon: Palette },
                        ].map((item) => (
                          <button
                            key={item.id}
                            className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-muted/50 transition-colors"
                          >
                            <item.icon className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{item.label}</span>
                          </button>
                        ))}
                      </nav>
                    </CardContent>
                  </Card>

                  {/* Settings Content */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Business Profile */}
                    <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
                      <CardHeader>
                        <CardTitle>Business Profile</CardTitle>
                        <CardDescription>Manage your business information and branding</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="business-name">Business Name</Label>
                            <Input id="business-name" defaultValue={businessData.name} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="business-type">Business Type</Label>
                            <Select defaultValue="property">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="property">Property Management</SelectItem>
                                <SelectItem value="real-estate">Real Estate</SelectItem>
                                <SelectItem value="rental">Rental Services</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea id="description" defaultValue={businessData.description} rows={3} />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue="info@amsterdamproperties.com" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" type="tel" defaultValue="+31 20 123 4567" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <Input id="address" defaultValue="Prinsengracht 123, 1015 LM Amsterdam" />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Notifications */}
                    <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
                      <CardHeader>
                        <CardTitle>Notification Preferences</CardTitle>
                        <CardDescription>Choose how you want to be notified</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label>Email Notifications</Label>
                              <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label>New Inquiries</Label>
                              <p className="text-sm text-muted-foreground">
                                Get notified when someone inquires about your listings
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label>Weekly Reports</Label>
                              <p className="text-sm text-muted-foreground">Receive weekly performance reports</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label>Marketing Updates</Label>
                              <p className="text-sm text-muted-foreground">
                                Get updates about new features and promotions
                              </p>
                            </div>
                            <Switch />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Security */}
                    <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
                      <CardHeader>
                        <CardTitle>Security Settings</CardTitle>
                        <CardDescription>Manage your account security</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label>Two-Factor Authentication</Label>
                              <p className="text-sm text-muted-foreground">
                                Add an extra layer of security to your account
                              </p>
                            </div>
                            <Button variant="outline" size="sm">
                              Enable
                            </Button>
                          </div>
                          <Separator />
                          <div className="space-y-2">
                            <Label>Change Password</Label>
                            <div className="space-y-2">
                              <Input type="password" placeholder="Current password" />
                              <Input type="password" placeholder="New password" />
                              <Input type="password" placeholder="Confirm new password" />
                            </div>
                            <Button size="sm">Update Password</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "listings" && (
              <div className="space-y-6">
                {/* Filters and Search */}
                <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full lg:w-auto">
                    <div className="relative w-full sm:w-64">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        placeholder="Search listings..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-full sm:w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full lg:w-auto">
                    <Button variant="outline" size="sm" className="w-full sm:w-auto">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 w-full sm:w-auto">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Listing
                    </Button>
                  </div>
                </div>

                {/* Listings Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                  {filteredListings.map((listing, index) => (
                    <motion.div
                      key={listing.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
                        <div className="relative">
                          <img
                            src={listing.image || "/placeholder.svg"}
                            alt={listing.title}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                          <Badge className={cn("absolute top-2 left-2", getStatusColor(listing.status))}>
                            {listing.status}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit3 className="w-4 h-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Eye className="w-4 h-4 mr-2" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div>
                              <h3 className="font-semibold line-clamp-1">{listing.title}</h3>
                              <p className="text-sm text-muted-foreground">{listing.location}</p>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-lg text-blue-600">{listing.price}</span>
                              <Badge variant="outline">{listing.type}</Badge>
                            </div>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1">
                                  <Eye className="w-4 h-4" />
                                  <span>{listing.views}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <MessageSquare className="w-4 h-4" />
                                  <span>{listing.inquiries}</span>
                                </div>
                              </div>
                              <span>{new Date(listing.datePosted).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {filteredListings.length === 0 && (
                  <div className="text-center py-12">
                    <Home className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No listings found</h3>
                    <p className="text-muted-foreground mb-6">
                      {searchTerm || filterStatus !== "all"
                        ? "Try adjusting your search or filters"
                        : "Create your first listing to get started"}
                    </p>
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Listing
                    </Button>
                  </div>
                )}
              </div>
            )}

            {activeTab === "inquiries" && (
              <div className="space-y-6">
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
                  <CardHeader>
                    <CardTitle>Recent Inquiries</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No inquiries yet</h3>
                      <p className="text-muted-foreground">Inquiries from potential customers will appear here</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
