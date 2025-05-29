"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import dynamic from "next/dynamic"
import { MapPin, Star, Navigation, Phone, Clock, ChevronLeft, Menu, ChevronRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Map as LeafletMap } from "leaflet"
import "leaflet/dist/leaflet.css"
import { ModeToggle } from "@/components/mode-toggle"
import Link from "next/link"

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false })
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false })

// Mock location data
const locations = [
  {
    id: 1,
    title: "Amsterdam Immigration Center",
    address: "Stadhouderskade 85, 1073 AX Amsterdam",
    category: "Government",
    distance: "1.2 km",
    rating: 4.2,
    phone: "+31 20 624 1111",
    hours: "Mon-Fri 9:00-17:00",
    coordinates: [52.3602, 4.8891] as [number, number],
    description: "Official immigration services and documentation",
  },
  {
    id: 2,
    title: "Job Support Hub",
    address: "Nieuwezijds Voorburgwal 67, 1012 RE Amsterdam",
    category: "Employment",
    distance: "0.8 km",
    rating: 4.5,
    phone: "+31 20 555 0123",
    hours: "Mon-Fri 8:30-18:00",
    coordinates: [52.3738, 4.8909] as [number, number],
    description: "Career guidance and job placement services",
  },
  {
    id: 3,
    title: "Affordable Housing Desk",
    address: "Haarlemmerweg 10, 1014 BE Amsterdam",
    category: "Housing",
    distance: "2.1 km",
    rating: 3.8,
    phone: "+31 20 555 0456",
    hours: "Tue-Thu 10:00-16:00",
    coordinates: [52.389, 4.8729] as [number, number],
    description: "Social housing applications and support",
  },
  {
    id: 4,
    title: "Social Services Point",
    address: "Oostelijke Handelskade 12, 1019 BN Amsterdam",
    category: "Support",
    distance: "3.5 km",
    rating: 4.1,
    phone: "+31 20 555 0789",
    hours: "Mon-Wed 9:00-15:00",
    coordinates: [52.3731, 4.9214] as [number, number],
    description: "General social support and benefits information",
  },
  {
    id: 5,
    title: "Medical Assistance Office",
    address: "Weteringschans 32, 1017 SG Amsterdam",
    category: "Healthcare",
    distance: "1.8 km",
    rating: 4.7,
    phone: "+31 20 555 0321",
    hours: "Mon-Fri 8:00-17:00",
    coordinates: [52.3615, 4.8847] as [number, number],
    description: "Healthcare registration and medical support",
  },
  {
    id: 6,
    title: "Language Learning Center",
    address: "Rokin 75 Rokin st, 1012 KL Amsterdam",
    category: "Education",
    distance: "0.5 km",
    rating: 4.6,
    phone: "+31 20 555 0654",
    hours: "Mon-Sat 9:00-21:00",
    coordinates: [52.3702, 4.8952] as [number, number],
    description: "Dutch language courses and integration programs for migrants and new travelers",
  },
]

// Category colors and icons
const categoryConfig = {
  Government: { color: "from-blue-500 to-blue-600", icon: "🏛️" },
  Employment: { color: "from-purple-500 to-purple-600", icon: "💼" },
  Housing: { color: "from-teal-500 to-teal-600", icon: "🏠" },
  Support: { color: "from-green-500 to-green-600", icon: "🤝" },
  Healthcare: { color: "from-red-500 to-red-600", icon: "🏥" },
  Education: { color: "from-orange-500 to-orange-600", icon: "📚" },
}

export default function MapPage() {
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [leafletLoaded, setLeafletLoaded] = useState(false)
  const mapRef = useRef<LeafletMap | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Amsterdam center coordinates
  const amsterdamCenter: [number, number] = [52.3676, 4.9041]

  useEffect(() => {
    // Import Leaflet CSS and fix marker icons
    const loadLeaflet = async () => {

      const L = await import("leaflet")

      // Fix marker icon issue
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      })

      setLeafletLoaded(true)
      setMapLoaded(true)
    }

    loadLeaflet()
  }, [])

  const handleLocationClick = (locationId: number) => {
    setSelectedLocation(locationId)
    const location = locations.find((loc) => loc.id === locationId)
    if (location && mapRef.current) {
      mapRef.current.setView(location.coordinates, 15, { animate: true })
    }

    // Scroll to selected card in mobile carousel
    if (carouselRef.current) {
      const selectedIndex = locations.findIndex((loc) => loc.id === locationId)
      const cardWidth = 280 // Approximate card width + gap
      carouselRef.current.scrollTo({
        left: selectedIndex * cardWidth,
        behavior: "smooth",
      })
    }
  }

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    const stars = []

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-3 h-3 fill-yellow-400/50 text-yellow-400" />)
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-3 h-3 text-gray-300" />)
    }

    return stars
  }

  // Desktop Location Card
  const DesktopLocationCard = ({ location, isSelected }: { location: (typeof locations)[0]; isSelected: boolean }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className={`cursor-pointer p-3 transition-all duration-300 backdrop-blur-xl bg-card/90 border-border/50 hover:shadow-xl hover:shadow-blue-500/10 ${
          isSelected ? "ring-2 ring-blue-500 shadow-xl shadow-blue-500/20 bg-card" : ""
        }`}
        onClick={() => handleLocationClick(location.id)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="w-12 h-12 shadow-lg">
                <AvatarFallback
                  className={`bg-gradient-to-br ${
                    categoryConfig[location.category as keyof typeof categoryConfig]?.color
                  } text-white text-lg shadow-inner`}
                >
                  {categoryConfig[location.category as keyof typeof categoryConfig]?.icon}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg font-semibold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                  {location.title}
                </CardTitle>
                <Badge
                  variant="secondary"
                  className={`mt-1 bg-gradient-to-r ${
                    categoryConfig[location.category as keyof typeof categoryConfig]?.color
                  } text-white border-0 shadow-sm`}
                >
                  {location.category}
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1 mb-1">
                {renderStars(location.rating)}
                <span className="text-sm text-muted-foreground ml-1 font-medium">{location.rating}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Navigation className="w-3 h-3 mr-1" />
                {location.distance}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <span className="text-sm text-muted-foreground leading-relaxed">{location.address}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{location.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{location.hours}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{location.description}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  // Mobile Carousel Card
  const MobileCarouselCard = ({ location, isSelected }: { location: (typeof locations)[0]; isSelected: boolean }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="flex-shrink-0 w-64"
    >
      <Card
        className={`cursor-pointer p-3 transition-all duration-300 backdrop-blur-xl bg-card/95 border-border/50 hover:shadow-lg hover:shadow-blue-500/10 h-full ${
          isSelected ? "ring-2 ring-blue-500 shadow-lg shadow-blue-500/20 bg-card" : ""
        }`}
        onClick={() => handleLocationClick(location.id)}
      >
        <CardHeader className="pb-2">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10 shadow-md">
              <AvatarFallback
                className={`bg-gradient-to-br ${
                  categoryConfig[location.category as keyof typeof categoryConfig]?.color
                } text-white text-base shadow-inner`}
              >
                {categoryConfig[location.category as keyof typeof categoryConfig]?.icon}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base font-semibold truncate">{location.title}</CardTitle>
              <Badge
                variant="secondary"
                className={`mt-1 bg-gradient-to-r ${
                  categoryConfig[location.category as keyof typeof categoryConfig]?.color
                } text-white border-0 shadow-sm text-xs`}
              >
                {location.category}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              {renderStars(location.rating)}
              <span className="text-xs text-muted-foreground ml-1">{location.rating}</span>
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Navigation className="w-3 h-3 mr-1" />
              {location.distance}
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <MapPin className="w-3 h-3 text-muted-foreground mt-0.5 flex-shrink-0" />
            <span className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{location.address}</span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-1 leading-relaxed">{location.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )

  const DesktopLocationsList = () => (
    <ScrollArea className="h-full rounded-none">
      <div className="space-y-4 p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Nearby Locations
          </h2>
          <p className="text-sm text-muted-foreground">{locations.length} locations found in Amsterdam</p>
        </div>
        <AnimatePresence>
          {locations.map((location) => (
            <DesktopLocationCard key={location.id} location={location} isSelected={selectedLocation === location.id} />
          ))}
        </AnimatePresence>
      </div>
    </ScrollArea>
  )

  if (!mapLoaded || !leafletLoaded) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6 shadow-lg"></div>
          <div className="space-y-2">
            <p className="text-lg font-medium">Loading map...</p>
            <p className="text-sm text-muted-foreground">Preparing your location experience</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-[100dvh] relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/10">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-teal-500/5 rounded-full blur-3xl animate-pulse-slow delay-2000"></div>
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-0 left-0 right-0 z-[1000] backdrop-blur-xl bg-background/90 border-b border-border/50 shadow-lg"
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Link href={"/"} className="md:hidden hover:bg-muted/50">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                Doris AI
              </h1>
              <p className="text-sm text-muted-foreground hidden sm:block">Find services and support in Amsterdam</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <ModeToggle />
            <Button variant="outline" size="icon" className="hidden md:flex hover:bg-muted/50">
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Desktop Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="hidden md:block absolute left-0 top-20 bottom-0 w-96 z-[1000]"
      >
        <Card className="h-full rounded-none backdrop-blur-xl bg-card/95 border-border/50 shadow-2xl shadow-black/5">
          <DesktopLocationsList />
        </Card>
      </motion.div>

      {/* Map Container */}
      <div className="h-full w-full">
        {leafletLoaded && (
          <MapContainer
            center={amsterdamCenter}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
            ref={mapRef}
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {locations.map((location) => (
              <Marker
                key={location.id}
                position={location.coordinates}
                eventHandlers={{
                  click: () => handleLocationClick(location.id),
                }}
              >
                <Popup>
                  <div className="p-3 min-w-[220px]">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-lg">
                        {categoryConfig[location.category as keyof typeof categoryConfig]?.icon}
                      </span>
                      <h3 className="font-semibold text-sm">{location.title}</h3>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{location.address}</p>
                    <div className="flex items-center space-x-1 mb-2">
                      {renderStars(location.rating).slice(0, 5)}
                      <span className="text-xs text-gray-600 ml-1">{location.rating}</span>
                    </div>
                    <Badge
                      variant="secondary"
                      className={`text-xs bg-gradient-to-r ${
                        categoryConfig[location.category as keyof typeof categoryConfig]?.color
                      } text-white border-0`}
                    >
                      {location.category}
                    </Badge>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>

      {/* Mobile Horizontal Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="md:hidden absolute bottom-0 left-0 right-0 z-[1000]"
      >
        <div className="bg-transparent shadow-2xl">
          <div className="pb-6">
            <div className="flex items-center justify-between mb-4">
              {/* <div>
                <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Locations
                </h3>
                <p className="text-xs text-muted-foreground">{locations.length} places nearby</p>
              </div> */}
              <Button variant="ghost" size="sm" className="text-xs">
                View All
                <ChevronRight className="w-3 h-3 ml-1" />
              </Button>
            </div>

            <div
              ref={carouselRef}
              className="flex space-x-3 pl-4 last:pr-4 overflow-x-auto scrollbar-hide pb-2"
              style={{
                scrollSnapType: "x mandatory",
                scrollBehavior: "smooth",
              }}
            >
              {locations.map((location) => (
                <div key={location.id} style={{ scrollSnapAlign: "start" }}>
                  <MobileCarouselCard location={location} isSelected={selectedLocation === location.id} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Zoom Controls */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute bottom-[30%] right-4 z-[1000] flex flex-col space-y-2 md:bottom-4"
      >
        <Button
          variant="outline"
          size="icon"
          className="backdrop-blur-xl bg-primary hover:bg-background border-border/50 shadow-lg hover:shadow-xl transition-all duration-200"
          onClick={() => mapRef.current?.zoomIn()}
        >
          <span className="text-lg font-bold">+</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="backdrop-blur-xl bg-primary hover:bg-background border-border/50 shadow-lg hover:shadow-xl transition-all duration-200"
          onClick={() => mapRef.current?.zoomOut()}
        >
          <span className="text-lg font-bold">−</span>
        </Button>
      </motion.div>

      {/* Floating Action Button for Mobile */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="md:hidden absolute flex flex-col top-20 right-4 z-[1000]"
      >
        <Button
          size="icon"
          className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <MapPin className="w-5 h-5 stroke-white" />
        </Button>

        <Link
          href="/chat"
          className="w-12 h-12 mt-3 flex justify-center items-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Sparkles className="w-5 h-5 stroke-white" />
        </Link>

      </motion.div>
    </div>
  )
}
