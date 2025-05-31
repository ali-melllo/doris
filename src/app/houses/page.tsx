"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Search,
    MapPin,
    Home,
    Bed,
    Bath,
    Maximize,
    Euro,
    Sparkles,
    Filter,
    X,
    Heart,
    SlidersHorizontal,
    Bot,
    Send,
    Calendar,
    Phone,
    Mail,
    Star,
    ChevronLeft,
    ChevronRight,
    Map,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ModeToggle } from "@/components/mode-toggle"
import Link from "next/link"

// Enhanced mock house data with more details
const housesData = [
    {
        id: 1,
        title: "Modern Studio near Vondelpark",
        images: [
            "/home-1.webp",
            "/home-2.webp",
            "/home-3.webp",
            "/home-4.webp",
        ],
        area: "Oud-West, Amsterdam",
        price: 950,
        beds: "Studio",
        baths: 1,
        size: 40,
        tags: ["Furnished", "Pet Friendly"],
        match: 91,
        available: "Immediately",
        description:
            "Beautiful modern studio apartment located just minutes from Vondelpark. This fully furnished space features high ceilings, large windows, and a modern kitchen. Perfect for young professionals or students.",
        features: ["High-speed WiFi", "Washing machine", "Dishwasher", "Central heating", "Balcony"],
        address: "Vondelstraat 123, 1054 GE Amsterdam",
        landlord: {
            name: "Emma van der Berg",
            phone: "+31 6 1234 5678",
            email: "emma@rentals.nl",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: 4.8,
        },
        energyLabel: "A",
        deposit: 1900,
        yearBuilt: 2018,
        floorLevel: 2,
        furnished: true,
        petsAllowed: true,
        smokingAllowed: false,
    },
    {
        id: 2,
        title: "Spacious 2-Bedroom Apartment",
        images: [
            "/home-2.webp",
            "/home-1.webp",
            "/home-3.webp",
            "/home-4.webp",
        ],
        area: "De Pijp, Amsterdam",
        price: 1450,
        beds: "2",
        baths: 1,
        size: 75,
        tags: ["Balcony", "Furnished"],
        match: 87,
        available: "1 Oct 2023",
        description:
            "Charming 2-bedroom apartment in the heart of De Pijp. Features a spacious living room, modern kitchen, and a lovely balcony overlooking the courtyard.",
        features: ["Balcony", "Modern kitchen", "Hardwood floors", "Storage room", "Bike storage"],
        address: "Albert Cuypstraat 45, 1072 CT Amsterdam",
        landlord: {
            name: "Marco Jansen",
            phone: "+31 6 9876 5432",
            email: "marco@housing.nl",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: 4.6,
        },
        energyLabel: "B",
        deposit: 2900,
        yearBuilt: 1920,
        floorLevel: 3,
        furnished: true,
        petsAllowed: false,
        smokingAllowed: false,
    },
    {
        id: 3,
        title: "Cozy 1-Bedroom with Canal View",
        images: [
            "/home-3.webp",
            "/home-2.webp",
            "/home-1.webp",
            "/home-4.webp",
        ],
        area: "Jordaan, Amsterdam",
        price: 1300,
        beds: "1",
        baths: 1,
        size: 55,
        tags: ["Canal View", "Furnished"],
        match: 78,
        available: "15 Sep 2023",
        description:
            "Stunning canal-side apartment with authentic Amsterdam charm. Features original wooden beams, large windows with canal views, and a cozy atmosphere.",
        features: ["Canal view", "Original features", "Wooden beams", "Large windows", "Historic building"],
        address: "Prinsengracht 234, 1016 HH Amsterdam",
        landlord: {
            name: "Sophie de Wit",
            phone: "+31 6 5555 1234",
            email: "sophie@canalrentals.nl",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: 4.9,
        },
        energyLabel: "C",
        deposit: 2600,
        yearBuilt: 1650,
        floorLevel: 1,
        furnished: true,
        petsAllowed: true,
        smokingAllowed: false,
    },
    {
        id: 4,
        title: "Luxury 3-Bedroom Penthouse",
        images: [
            "/home-4.webp",
            "/home-2.webp",
            "/home-3.webp",
            "/home-1.webp",
        ],
        area: "Zuidas, Amsterdam",
        price: 2800,
        beds: "3",
        baths: 2,
        size: 120,
        tags: ["Luxury", "Terrace", "Parking"],
        match: 65,
        available: "1 Nov 2023",
        description:
            "Luxurious penthouse with panoramic city views. Features high-end finishes, spacious terrace, and underground parking. Perfect for executives.",
        features: ["City views", "Terrace", "Parking", "Elevator", "Concierge", "Gym access"],
        address: "Zuidas Tower, 1082 MD Amsterdam",
        landlord: {
            name: "David Chen",
            phone: "+31 6 7777 8888",
            email: "david@luxuryrentals.nl",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: 4.7,
        },
        energyLabel: "A+",
        deposit: 5600,
        yearBuilt: 2020,
        floorLevel: 15,
        furnished: false,
        petsAllowed: false,
        smokingAllowed: false,
    },
    {
        id: 5,
        title: "Student-Friendly Studio",
        images: [
            "/home-5.webp",
            "/home-2.webp",
            "/home-3.webp",
            "/home-4.webp",
        ],
        area: "Oost, Amsterdam",
        price: 850,
        beds: "Studio",
        baths: 1,
        size: 35,
        tags: ["Student", "Furnished"],
        match: 94,
        available: "Immediately",
        description:
            "Perfect studio for students, located near universities and public transport. Fully furnished with everything you need for comfortable living.",
        features: ["Student housing", "Near university", "Public transport", "Shared facilities", "Study area"],
        address: "Linnaeusstraat 67, 1093 EK Amsterdam",
        landlord: {
            name: "Lisa Bakker",
            phone: "+31 6 3333 4444",
            email: "lisa@studenthousing.nl",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: 4.5,
        },
        energyLabel: "B",
        deposit: 1700,
        yearBuilt: 1960,
        floorLevel: 1,
        furnished: true,
        petsAllowed: false,
        smokingAllowed: false,
    },
    {
        id: 6,
        title: "Family Home with Garden",
        images: [
            "/home-6.webp",
            "/home-2.webp",
            "/home-3.webp",
            "/home-4.webp",
        ],
        area: "Amstelveen",
        price: 1950,
        beds: "4",
        baths: 2,
        size: 140,
        tags: ["Garden", "Family", "Parking"],
        match: 72,
        available: "1 Oct 2023",
        description:
            "Spacious family home with private garden and parking. Located in quiet residential area with excellent schools nearby.",
        features: ["Private garden", "Parking", "Near schools", "Quiet area", "Storage", "Fireplace"],
        address: "Boomkwekerij 12, 1181 XA Amstelveen",
        landlord: {
            name: "Robert van Dijk",
            phone: "+31 6 9999 0000",
            email: "robert@familyhomes.nl",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: 4.8,
        },
        energyLabel: "A",
        deposit: 3900,
        yearBuilt: 2015,
        floorLevel: 0,
        furnished: false,
        petsAllowed: true,
        smokingAllowed: false,
    },
    {
        id: 7,
        title: "Modern Loft in City Center",
        images: [
            "/home-7.webp",
            "/home-2.webp",
            "/home-3.webp",
            "/home-4.webp",
        ],
        area: "Centrum, Amsterdam",
        price: 1650,
        beds: "1",
        baths: 1,
        size: 65,
        tags: ["Loft", "City Center", "Furnished"],
        match: 83,
        available: "15 Sep 2023",
        description:
            "Industrial-style loft in the heart of Amsterdam. Features high ceilings, exposed brick walls, and modern amenities.",
        features: ["High ceilings", "Exposed brick", "Industrial style", "City center", "Modern kitchen"],
        address: "Nieuwmarkt 8, 1012 CR Amsterdam",
        landlord: {
            name: "Anna Visser",
            phone: "+31 6 1111 2222",
            email: "anna@loftrentals.nl",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: 4.6,
        },
        energyLabel: "B",
        deposit: 3300,
        yearBuilt: 1890,
        floorLevel: 2,
        furnished: true,
        petsAllowed: false,
        smokingAllowed: false,
    },
    {
        id: 8,
        title: "Renovated Apartment with Balcony",
        images: [
            "/home-8.webp",
            "/home-2.webp",
            "/home-3.webp",
            "/home-4.webp",
        ], area: "West, Amsterdam",
        price: 1250,
        beds: "1",
        baths: 1,
        size: 60,
        tags: ["Renovated", "Balcony"],
        match: 89,
        available: "Immediately",
        description:
            "Recently renovated apartment with modern finishes and a sunny balcony. Great location with easy access to public transport.",
        features: ["Recently renovated", "Sunny balcony", "Modern finishes", "Public transport", "Shopping nearby"],
        address: "Jan Pieter Heijestraat 89, 1054 MG Amsterdam",
        landlord: {
            name: "Tom de Vries",
            phone: "+31 6 4444 5555",
            email: "tom@renovatedrentals.nl",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: 4.7,
        },
        energyLabel: "A",
        deposit: 2500,
        yearBuilt: 1930,
        floorLevel: 3,
        furnished: false,
        petsAllowed: true,
        smokingAllowed: false,
    },
]

// Location options
const locations = [
    "All Locations",
    "Centrum, Amsterdam",
    "De Pijp, Amsterdam",
    "Jordaan, Amsterdam",
    "Oost, Amsterdam",
    "Oud-West, Amsterdam",
    "West, Amsterdam",
    "Zuidas, Amsterdam",
    "Amstelveen",
]

// Amenities
const amenities = ["Furnished", "Pet Friendly", "Balcony", "Garden", "Parking", "Terrace", "Canal View", "Renovated"]

// AI Chat Messages
interface ChatMessage {
    id: string
    content: string
    sender: "user" | "ai"
    timestamp: Date
}

export default function HousesPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedLocation, setSelectedLocation] = useState("All Locations")
    const [priceRange, setPriceRange] = useState([500, 3000])
    const [selectedBedrooms, setSelectedBedrooms] = useState<string[]>([])
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
    const [matchThreshold, setMatchThreshold] = useState(60)
    const [favoriteHouses, setFavoriteHouses] = useState<number[]>([])
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
    const [filteredHouses, setFilteredHouses] = useState(housesData)
    const [isLoading, setIsLoading] = useState(true)
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

    // AI Chat states
    const [isAiChatOpen, setIsAiChatOpen] = useState(false)
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
        {
            id: "1",
            content:
                "Hello! I'm your AI housing assistant. I can help you find the perfect home based on your preferences, budget, and lifestyle. What kind of housing are you looking for?",
            sender: "ai",
            timestamp: new Date(Date.now() - 300000),
        },
    ])
    const [chatInput, setChatInput] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const chatScrollRef = useRef<HTMLDivElement>(null)

    // House Detail Modal states
    const [selectedHouse, setSelectedHouse] = useState<(typeof housesData)[0] | null>(null)
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    // Simulate loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1500)
        return () => clearTimeout(timer)
    }, [])

    // Auto-scroll chat to bottom
    useEffect(() => {
        if (chatScrollRef.current) {
            chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight
        }
    }, [chatMessages])

    // Filter houses based on selected filters
    useEffect(() => {
        let filtered = housesData

        // Search term filter
        if (searchTerm) {
            filtered = filtered.filter(
                (house) =>
                    house.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    house.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    house.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
            )
        }

        // Location filter
        if (selectedLocation !== "All Locations") {
            filtered = filtered.filter((house) => house.area === selectedLocation)
        }

        // Price range filter
        filtered = filtered.filter((house) => house.price >= priceRange[0] && house.price <= priceRange[1])

        // Bedrooms filter
        if (selectedBedrooms.length > 0) {
            filtered = filtered.filter((house) => selectedBedrooms.includes(house.beds))
        }

        // Amenities filter
        if (selectedAmenities.length > 0) {
            filtered = filtered.filter((house) => selectedAmenities.every((amenity) => house.tags.includes(amenity)))
        }

        // Match threshold filter
        filtered = filtered.filter((house) => house.match >= matchThreshold)

        setFilteredHouses(filtered)
    }, [searchTerm, selectedLocation, priceRange, selectedBedrooms, selectedAmenities, matchThreshold])

    const toggleBedroom = (bedroom: string) => {
        setSelectedBedrooms((prev) => (prev.includes(bedroom) ? prev.filter((b) => b !== bedroom) : [...prev, bedroom]))
    }

    const toggleAmenity = (amenity: string) => {
        setSelectedAmenities((prev) => (prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]))
    }

    const toggleFavorite = (id: number) => {
        setFavoriteHouses((prev) => (prev.includes(id) ? prev.filter((houseId) => houseId !== id) : [...prev, id]))
    }

    const resetFilters = () => {
        setSearchTerm("")
        setSelectedLocation("All Locations")
        setPriceRange([500, 3000])
        setSelectedBedrooms([])
        setSelectedAmenities([])
        setMatchThreshold(60)
    }

    // AI Chat functions
    const handleSendMessage = async () => {
        if (!chatInput.trim()) return

        const newMessage: ChatMessage = {
            id: Date.now().toString(),
            content: chatInput,
            sender: "user",
            timestamp: new Date(),
        }

        setChatMessages((prev) => [...prev, newMessage])
        setChatInput("")
        setIsTyping(true)

        // Simulate AI response
        setTimeout(() => {
            const aiResponse: ChatMessage = {
                id: (Date.now() + 1).toString(),
                content: generateAiResponse(chatInput),
                sender: "ai",
                timestamp: new Date(),
            }
            setChatMessages((prev) => [...prev, aiResponse])
            setIsTyping(false)
        }, 2000)
    }

    const generateAiResponse = (userMessage: string): string => {
        const lowerMessage = userMessage.toLowerCase()

        if (lowerMessage.includes("budget") || lowerMessage.includes("price") || lowerMessage.includes("cost")) {
            return "I can help you find housing within your budget! Based on the current listings, we have options ranging from €850 to €2800 per month. What's your preferred price range? I can also help you understand additional costs like deposits and utilities."
        }

        if (lowerMessage.includes("location") || lowerMessage.includes("area") || lowerMessage.includes("neighborhood")) {
            return "Great question about location! We have properties in various Amsterdam neighborhoods including De Pijp (trendy, lots of cafes), Jordaan (historic, canal views), Centrum (city center), and Zuidas (business district). What kind of atmosphere are you looking for?"
        }

        if (lowerMessage.includes("furnished") || lowerMessage.includes("furniture")) {
            return "Many of our properties come furnished! This is especially convenient for international residents. Furnished apartments typically include bed, sofa, dining table, and kitchen appliances. Would you prefer a furnished or unfurnished place?"
        }

        if (lowerMessage.includes("pet") || lowerMessage.includes("dog") || lowerMessage.includes("cat")) {
            return "I see you're looking for pet-friendly housing! We have several pet-friendly options available. Keep in mind that some landlords may require an additional deposit for pets. Would you like me to filter the results to show only pet-friendly properties?"
        }

        if (lowerMessage.includes("student") || lowerMessage.includes("university") || lowerMessage.includes("study")) {
            return "Perfect! We have student-friendly accommodations, especially in areas like Oost which is close to universities. Student housing often comes furnished and may have shared facilities. Are you looking for a studio or would you consider shared housing?"
        }

        return "Thank you for your question! I'm here to help you find the perfect home. I can assist with budget planning, neighborhood recommendations, understanding Dutch rental processes, and matching you with properties that fit your lifestyle. What specific aspect of housing would you like to know more about?"
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    // House Detail Modal functions
    const openHouseDetail = (house: (typeof housesData)[0]) => {
        setSelectedHouse(house)
        setCurrentImageIndex(0)
        setIsDetailModalOpen(true)
    }

    const nextImage = () => {
        if (selectedHouse) {
            setCurrentImageIndex((prev) => (prev + 1) % selectedHouse.images.length)
        }
    }

    const prevImage = () => {
        if (selectedHouse) {
            setCurrentImageIndex((prev) => (prev - 1 + selectedHouse.images.length) % selectedHouse.images.length)
        }
    }

    // Format price for display
    const formatPrice = (price: number) => {
        return `€${price.toLocaleString()}/mo`
    }

    // Skeleton loader for house cards
    const HouseCardSkeleton = () => (
        <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 shadow-md hover:shadow-lg transition-all duration-300">
            <div className="aspect-[4/3] w-full bg-muted/70 animate-pulse"></div>
            <CardContent className="p-4">
                <div className="space-y-3">
                    <div className="flex justify-between items-start">
                        <div className="w-2/3 h-6 bg-muted/70 rounded animate-pulse"></div>
                        <div className="w-12 h-12 rounded-full bg-muted/70 animate-pulse"></div>
                    </div>
                    <div className="w-1/3 h-5 bg-muted/70 rounded animate-pulse"></div>
                    <div className="w-1/2 h-5 bg-muted/70 rounded animate-pulse"></div>
                    <div className="flex space-x-2">
                        <div className="w-16 h-6 bg-muted/70 rounded animate-pulse"></div>
                        <div className="w-16 h-6 bg-muted/70 rounded animate-pulse"></div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <div className="w-full h-10 bg-muted/70 rounded animate-pulse"></div>
            </CardFooter>
        </Card>
    )

    return (
        <div className="min-h-screen pt-20 md:pt-36 max-w-7xl mx-auto ">
            {/* Header */}
           
            {/* AI Chat Fixed Button */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="fixed bottom-6 right-6 z-40"
            >
                <div className="flex flex-col gap-3">
                    <Button className="size-14 shadow-2xl rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-200 group">
                        <Link href={'/map'}>
                            <Map className="stroke-white"/>
                        </Link>
                    </Button>

                    <Sheet open={isAiChatOpen} onOpenChange={setIsAiChatOpen}>
                        <SheetTrigger asChild>
                            <Button
                                className="size-14 shadow-2xl rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-200 group"
                            >
                                <Bot className="w-6 h-6 stroke-white group-hover:scale-110 transition-transform" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[90%] sm:w-[400px] p-0 flex flex-col">
                            {/* Chat Header */}
                            <div className="p-4 border-b border-border/50 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                        <Bot className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Housing AI Assistant</h3>
                                        <p className="text-sm text-muted-foreground">Ask me about housing options</p>
                                    </div>
                                </div>
                            </div>

                            {/* Chat Messages */}
                            <ScrollArea className="flex-1 p-4" ref={chatScrollRef}>
                                <div className="space-y-4">
                                    {chatMessages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                                        >
                                            <div
                                                className={`max-w-[80%] rounded-lg p-3 ${message.sender === "user"
                                                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                                                    : "bg-muted/50 backdrop-blur-sm"
                                                    }`}
                                            >
                                                <p className="text-sm leading-relaxed">{message.content}</p>
                                                <p className="text-xs opacity-70 mt-1">
                                                    {message.timestamp.toLocaleTimeString("en-US", {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Typing Indicator */}
                                    {isTyping && (
                                        <div className="flex justify-start">
                                            <div className="bg-muted/50 backdrop-blur-sm rounded-lg p-3">
                                                <div className="flex space-x-1">
                                                    <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"></div>
                                                    <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce delay-100"></div>
                                                    <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce delay-200"></div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </ScrollArea>

                            {/* Chat Input */}
                            <div className="p-4 border-t border-border/50">
                                <div className="flex items-center space-x-2">
                                    <Input
                                        value={chatInput}
                                        onChange={(e) => setChatInput(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Ask about housing options..."
                                        className="flex-1 outline-none"
                                    />
                                    <Button
                                        onClick={handleSendMessage}
                                        disabled={!chatInput.trim()}
                                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                                    >
                                        <Send className="size-5 stroke-white" />
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </motion.div>

            <div className=" mx-auto py-6 px-4 md:px-0">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Sidebar - Desktop */}
                    <div className="hidden md:block w-72 flex-shrink-0">
                        <Card className="sticky top-24 p-4 bg-card/50 backdrop-blur-sm border border-border/50">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold">Filters</h3>
                                    <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 text-xs">
                                        Reset
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Location Filter */}
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Location</Label>
                                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                                        <SelectTrigger className="bg-background/50">
                                            <SelectValue placeholder="Select location" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {locations.map((location) => (
                                                <SelectItem key={location} value={location}>
                                                    {location}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Price Range Filter */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-sm font-medium">Price Range</Label>
                                        <span className="text-xs text-muted-foreground">
                                            €{priceRange[0]} - €{priceRange[1]}
                                        </span>
                                    </div>
                                    <Slider
                                        defaultValue={priceRange}
                                        min={500}
                                        max={3000}
                                        step={50}
                                        value={priceRange}
                                        onValueChange={setPriceRange}
                                        className="mt-2"
                                    />
                                </div>

                                <Separator />

                                {/* Bedrooms Filter */}
                                <div className="space-y-3">
                                    <Label className="text-sm font-medium">Bedrooms</Label>
                                    <div className="flex flex-wrap gap-2">
                                        {["Studio", "1", "2", "3", "4+"].map((bedroom) => (
                                            <Button
                                                key={bedroom}
                                                variant={selectedBedrooms.includes(bedroom) ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => toggleBedroom(bedroom)}
                                                className={`rounded-full ${selectedBedrooms.includes(bedroom) ? "bg-blue-500 hover:bg-blue-600" : "bg-background"
                                                    }`}
                                            >
                                                {bedroom}
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                <Separator />

                                {/* Amenities Filter */}
                                <div className="space-y-3">
                                    <Label className="text-sm font-medium">Amenities</Label>
                                    <ScrollArea className="h-40">
                                        <div className="space-y-2">
                                            {amenities.map((amenity) => (
                                                <div key={amenity} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`amenity-${amenity}`}
                                                        checked={selectedAmenities.includes(amenity)}
                                                        onCheckedChange={() => toggleAmenity(amenity)}
                                                    />
                                                    <Label htmlFor={`amenity-${amenity}`} className="text-sm">
                                                        {amenity}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                </div>

                                <Separator />

                                {/* Match Threshold Filter */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-sm font-medium">AI Match Threshold</Label>
                                        <span className="text-xs text-muted-foreground">{matchThreshold}%+</span>
                                    </div>
                                    <Slider
                                        defaultValue={[matchThreshold]}
                                        min={60}
                                        max={95}
                                        step={5}
                                        value={[matchThreshold]}
                                        onValueChange={(value) => setMatchThreshold(value[0])}
                                        className="mt-2"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Search and View Controls */}
                        <div className="mb-6 space-y-4">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                    <Input
                                        placeholder="Search by location, features, or keywords..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 bg-card/50 backdrop-blur-sm border-border/50"
                                    />
                                </div>
                                <div className="hidden md:flex items-center space-x-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => setViewMode("grid")}
                                        className={`h-10 w-10 ${viewMode === "grid" ? "bg-muted" : ""}`}
                                    >
                                        <SlidersHorizontal className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => setViewMode("list")}
                                        className={`h-10 w-10 ${viewMode === "list" ? "bg-muted" : ""}`}
                                    >
                                        <Filter className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* Active Filters */}
                            {(selectedBedrooms.length > 0 ||
                                selectedAmenities.length > 0 ||
                                selectedLocation !== "All Locations" ||
                                matchThreshold > 60) && (
                                    <div className="flex flex-wrap gap-2">
                                        {selectedLocation !== "All Locations" && (
                                            <Badge variant="secondary" className="bg-muted/50 backdrop-blur-sm">
                                                {selectedLocation}
                                                <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setSelectedLocation("All Locations")} />
                                            </Badge>
                                        )}
                                        {selectedBedrooms.map((bedroom) => (
                                            <Badge key={bedroom} variant="secondary" className="bg-muted/50 backdrop-blur-sm">
                                                {bedroom} {bedroom === "1" ? "Bedroom" : "Bedrooms"}
                                                <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => toggleBedroom(bedroom)} />
                                            </Badge>
                                        ))}
                                        {selectedAmenities.map((amenity) => (
                                            <Badge key={amenity} variant="secondary" className="bg-muted/50 backdrop-blur-sm">
                                                {amenity}
                                                <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => toggleAmenity(amenity)} />
                                            </Badge>
                                        ))}
                                        {matchThreshold > 60 && (
                                            <Badge variant="secondary" className="bg-muted/50 backdrop-blur-sm">
                                                {matchThreshold}%+ Match
                                                <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setMatchThreshold(60)} />
                                            </Badge>
                                        )}
                                        <Button variant="ghost" size="sm" onClick={resetFilters} className="h-6 text-xs">
                                            Clear All
                                        </Button>
                                    </div>
                                )}
                        </div>

                        {/* Results Count */}
                        <div className="mb-4">
                            <p className="text-sm text-muted-foreground">
                                {filteredHouses.length} {filteredHouses.length === 1 ? "house" : "houses"} found
                            </p>
                        </div>

                        {/* House Cards */}
                        {isLoading ? (
                            <div
                                className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                                    }`}
                            >
                                {[...Array(6)].map((_, index) => (
                                    <HouseCardSkeleton key={index} />
                                ))}
                            </div>
                        ) : filteredHouses.length > 0 ? (
                            <div
                                className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                                    }`}
                            >
                                <AnimatePresence>
                                    {filteredHouses.map((house) => (
                                        <motion.div
                                            key={house.id}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 shadow-md hover:shadow-xl transition-all duration-300 group">
                                                <div className="relative aspect-[4/3] w-full overflow-hidden">
                                                    {/* House Image */}
                                                    <img
                                                        src={house.images[0]}
                                                        alt={house.title}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />

                                                    {/* Price Badge */}
                                                    <div className="absolute top-4 left-4">
                                                        <Badge className="bg-background/90 backdrop-blur-md text-foreground border-0 px-3 py-1.5 text-sm font-semibold shadow-lg">
                                                            <Euro className="w-3.5 h-3.5 mr-1" />
                                                            {formatPrice(house.price)}
                                                        </Badge>
                                                    </div>

                                                    {/* Favorite Button */}
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="absolute top-4 right-4 h-8 w-8 rounded-full bg-background/50 backdrop-blur-md hover:bg-background/80 transition-colors"
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            toggleFavorite(house.id)
                                                        }}
                                                    >
                                                        <Heart
                                                            className={`w-4 h-4 ${favoriteHouses.includes(house.id) ? "fill-red-500 text-red-500" : "text-foreground"
                                                                }`}
                                                        />
                                                    </Button>

                                                    {/* AI Match Circle */}
                                                    <div className="absolute bottom-3 right-3">
                                                        <div className="relative rounded-2xl flex items-center gap-2 border dark:text-purple-400 font-medium text-purple-500 bg-background text-sm px-4 py-2 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]">
                                                          <Sparkles size={15}/>
                                                           <p className="text-primary font-bold">%{house.match} </p>
                                                           
                                                           AI Matched
                                                           
                                                        </div>
                                                    </div>
                                                </div>

                                                <CardContent className="p-4">
                                                    <div className="space-y-3">
                                                        <div>
                                                            <h3 className="font-semibold text-lg line-clamp-1">{house.title}</h3>
                                                            <div className="flex items-center text-muted-foreground text-sm mt-1">
                                                                <MapPin className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                                                                <span>{house.area}</span>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center space-x-4 text-sm">
                                                            <div className="flex items-center">
                                                                <Bed className="w-4 h-4 mr-1 text-muted-foreground" />
                                                                <span>{house.beds}</span>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <Bath className="w-4 h-4 mr-1 text-muted-foreground" />
                                                                <span>{house.baths}</span>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <Maximize className="w-4 h-4 mr-1 text-muted-foreground" />
                                                                <span>{house.size}m²</span>
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-wrap gap-2">
                                                            {house.tags.map((tag) => (
                                                                <Badge key={tag} variant="outline" className="bg-muted/50">
                                                                    {tag}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </CardContent>

                                                <CardFooter className="p-4 pt-0">
                                                    <Button
                                                        className="w-full bg-gradient-to-r text-white from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                                                        onClick={() => openHouseDetail(house)}
                                                    >
                                                        View Details
                                                    </Button>
                                                </CardFooter>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Home className="w-8 h-8 text-muted-foreground" />
                                </div>
                                <h3 className="text-lg font-medium mb-2">No houses found</h3>
                                <p className="text-muted-foreground mb-6">
                                    Try adjusting your filters or search term to find more houses
                                </p>
                                <Button onClick={resetFilters}>Reset Filters</Button>
                            </div>
                        )}

                        {/* Pagination */}
                        {filteredHouses.length > 0 && (
                            <div className="mt-8 flex justify-center">
                                <Button variant="outline" className="w-full max-w-xs">
                                    Load More Houses
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* House Detail Modal */}
            <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    {selectedHouse && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold">{selectedHouse.title}</DialogTitle>
                            </DialogHeader>

                            <div className="space-y-6">
                                {/* Image Gallery */}
                                <div className="relative">
                                    <div className="aspect-[16/9] w-full overflow-hidden rounded-lg">
                                        <img
                                            src={selectedHouse.images[currentImageIndex] || "/placeholder.svg"}
                                            alt={selectedHouse.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {selectedHouse.images.length > 1 && (
                                        <>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                                                onClick={prevImage}
                                            >
                                                <ChevronLeft className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                                                onClick={nextImage}
                                            >
                                                <ChevronRight className="w-4 h-4" />
                                            </Button>

                                            {/* Image Indicators */}
                                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                                                {selectedHouse.images.map((_, index) => (
                                                    <button
                                                        key={index}
                                                        className={`w-2 h-2 rounded-full transition-colors ${index === currentImageIndex ? "bg-white" : "bg-white/50"
                                                            }`}
                                                        onClick={() => setCurrentImageIndex(index)}
                                                    />
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>

                                <Tabs defaultValue="overview" className="w-full">
                                    <TabsList className="grid w-full grid-cols-3">
                                        <TabsTrigger value="overview">Overview</TabsTrigger>
                                        <TabsTrigger value="details">Details</TabsTrigger>
                                        <TabsTrigger value="contact">Contact</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="overview" className="space-y-6">
                                        {/* Price and Match */}
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="text-3xl font-bold text-blue-600">{formatPrice(selectedHouse.price)}</div>
                                                <div className="text-sm text-muted-foreground">Available {selectedHouse.available}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-bold text-green-600">{selectedHouse.match}% Match</div>
                                                <div className="text-sm text-muted-foreground">AI Compatibility</div>
                                            </div>
                                        </div>

                                        {/* Basic Info */}
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="text-center p-4 bg-muted/50 rounded-lg">
                                                <Bed className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                                                <div className="font-semibold">{selectedHouse.beds}</div>
                                                <div className="text-sm text-muted-foreground">Bedrooms</div>
                                            </div>
                                            <div className="text-center p-4 bg-muted/50 rounded-lg">
                                                <Bath className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                                                <div className="font-semibold">{selectedHouse.baths}</div>
                                                <div className="text-sm text-muted-foreground">Bathrooms</div>
                                            </div>
                                            <div className="text-center p-4 bg-muted/50 rounded-lg">
                                                <Maximize className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                                                <div className="font-semibold">{selectedHouse.size}m²</div>
                                                <div className="text-sm text-muted-foreground">Size</div>
                                            </div>
                                            <div className="text-center p-4 bg-muted/50 rounded-lg">
                                                <Calendar className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                                                <div className="font-semibold">{selectedHouse.yearBuilt}</div>
                                                <div className="text-sm text-muted-foreground">Built</div>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <div>
                                            <h3 className="text-lg font-semibold mb-2">Description</h3>
                                            <p className="text-muted-foreground leading-relaxed">{selectedHouse.description}</p>
                                        </div>

                                        {/* Features */}
                                        <div>
                                            <h3 className="text-lg font-semibold mb-3">Features & Amenities</h3>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                                {selectedHouse.features.map((feature) => (
                                                    <div key={feature} className="flex items-center space-x-2">
                                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                        <span className="text-sm">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Tags */}
                                        <div>
                                            <h3 className="text-lg font-semibold mb-3">Tags</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedHouse.tags.map((tag) => (
                                                    <Badge key={tag} variant="outline" className="bg-muted/50">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="details" className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Property Details */}
                                            <div className="space-y-4">
                                                <h3 className="text-lg font-semibold">Property Details</h3>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">Address</span>
                                                        <span className="font-medium">{selectedHouse.address}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">Floor Level</span>
                                                        <span className="font-medium">{selectedHouse.floorLevel}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">Energy Label</span>
                                                        <Badge variant="outline">{selectedHouse.energyLabel}</Badge>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">Furnished</span>
                                                        <span className="font-medium">{selectedHouse.furnished ? "Yes" : "No"}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">Pets Allowed</span>
                                                        <span className="font-medium">{selectedHouse.petsAllowed ? "Yes" : "No"}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">Smoking Allowed</span>
                                                        <span className="font-medium">{selectedHouse.smokingAllowed ? "Yes" : "No"}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Financial Details */}
                                            <div className="space-y-4">
                                                <h3 className="text-lg font-semibold">Financial Details</h3>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">Monthly Rent</span>
                                                        <span className="font-medium text-blue-600">{formatPrice(selectedHouse.price)}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">Security Deposit</span>
                                                        <span className="font-medium">€{selectedHouse.deposit.toLocaleString()}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">Available From</span>
                                                        <span className="font-medium">{selectedHouse.available}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="contact" className="space-y-6">
                                        {/* Landlord Info */}
                                        <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
                                            <Avatar className="w-16 h-16">
                                                <AvatarImage
                                                    src={selectedHouse.landlord.avatar || "/placeholder.svg"}
                                                    alt={selectedHouse.landlord.name}
                                                />
                                                <AvatarFallback>
                                                    {selectedHouse.landlord.name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold">{selectedHouse.landlord.name}</h3>
                                                <div className="flex items-center space-x-1 mb-2">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`w-4 h-4 ${i < Math.floor(selectedHouse.landlord.rating)
                                                                ? "fill-yellow-400 text-yellow-400"
                                                                : "text-gray-300"
                                                                }`}
                                                        />
                                                    ))}
                                                    <span className="text-sm text-muted-foreground ml-1">{selectedHouse.landlord.rating}</span>
                                                </div>
                                                <div className="space-y-1">
                                                    <div className="flex items-center space-x-2 text-sm">
                                                        <Phone className="w-4 h-4 text-muted-foreground" />
                                                        <span>{selectedHouse.landlord.phone}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-2 text-sm">
                                                        <Mail className="w-4 h-4 text-muted-foreground" />
                                                        <span>{selectedHouse.landlord.email}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Contact Actions */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                                                <Phone className="w-4 h-4 mr-2" />
                                                Call Landlord
                                            </Button>
                                            <Button variant="outline">
                                                <Mail className="w-4 h-4 mr-2" />
                                                Send Message
                                            </Button>
                                        </div>

                                        {/* Schedule Viewing */}
                                        <div className="p-4 bg-muted/50 rounded-lg">
                                            <h3 className="text-lg font-semibold mb-3">Schedule a Viewing</h3>
                                            <p className="text-sm text-muted-foreground mb-4">
                                                Contact the landlord to arrange a viewing of this property.
                                            </p>
                                            <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                                                <Calendar className="w-4 h-4 mr-2" />
                                                Request Viewing
                                            </Button>
                                        </div>
                                    </TabsContent>
                                </Tabs>

                                {/* Action Buttons */}
                                <div className="flex space-x-4 pt-4 border-t">
                                    <Button variant="outline" className="flex-1" onClick={() => toggleFavorite(selectedHouse.id)}>
                                        <Heart
                                            className={`w-4 h-4 mr-2 ${favoriteHouses.includes(selectedHouse.id) ? "fill-red-500 text-red-500" : ""
                                                }`}
                                        />
                                        {favoriteHouses.includes(selectedHouse.id) ? "Remove from Favorites" : "Add to Favorites"}
                                    </Button>
                                    <Button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                                        Apply Now
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}
