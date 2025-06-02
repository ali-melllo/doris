"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Send,
  Mic,
  Bot,
  User,
  Smile,
  Paperclip,
  MoreVertical,
  Home,
  Building2,
  Briefcase,
  Users,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ModeToggle } from "@/components/mode-toggle"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  isTyping?: boolean
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
}

const slideIn = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.4 },
}

const slideInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.4 },
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI assistant for life in the Netherlands. I can help you with housing, jobs, government services, and integration questions. What would you like to know?",
      sender: "bot",
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: "2",
      content: "Hi! I'm a refugee from Syria and I need help finding housing in Amsterdam. Can you guide me?",
      sender: "user",
      timestamp: new Date(Date.now() - 240000),
    },
    {
      id: "3",
      content:
        "I'd be happy to help you find housing in Amsterdam! As a refugee, you have several options:\n\n1. **Social Housing (Sociale Huur)**: Contact your local municipality (gemeente) for social housing registration\n2. **Refugee Housing**: COA (Central Agency for the Reception of Asylum Seekers) can provide temporary housing\n3. **Housing Allowance**: You may be eligible for huurtoeslag (rent subsidy)\n\nWould you like me to explain any of these options in more detail? I can also help you in Arabic if that's more comfortable.",
      sender: "bot",
      timestamp: new Date(Date.now() - 180000),
    },
    {
      id: "4",
      content: "Yes, please explain the social housing process in more detail. How do I register?",
      sender: "user",
      timestamp: new Date(Date.now() - 120000),
    },
  ])

  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const sampleQuestions = [
    "How do I apply for housing benefit?",
    "Where can I find a job in the Netherlands?",
    "What documents do I need for BSN registration?",
    "How do I open a Dutch bank account?",
  ]

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "Thank you for your question! I'm processing your request and will provide you with accurate information based on the latest Dutch government data. This is a simulated response for demonstration purposes.",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  }

  const TypingIndicator = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-center space-x-2 p-4"
    >
      <Avatar className="w-8 h-8">
        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
          <Bot className="w-4 h-4" />
        </AvatarFallback>
      </Avatar>
      <Card className="bg-muted/50 backdrop-blur-sm border-border/50">
        <CardContent className="p-3">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce delay-200"></div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col">
      
      {/* Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <ScrollArea className="flex-1 px-4" ref={scrollAreaRef}>
          <div className="md:max-w-3xl mx-auto pt-16 md:pt-20 pb-48 py-6 space-y-6">
            {/* Welcome Message */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl md:text-2xl font-semibold mb-2">Welcome to GlobalHelp</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                I'm here to help you navigate life in the Netherlands. Ask me anything about housing, jobs, government
                services, or integration.
              </p>

              {/* Sample Questions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
                {sampleQuestions.map((question, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setInputValue(question)}
                    className="p-3 text-left bg-muted/50 hover:bg-muted/80 rounded-lg border border-border/50 hover:border-border transition-all duration-200 text-sm"
                  >
                    {question}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <Separator className="my-8" />

            {/* Messages */}
            <div className="space-y-4">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={message.sender === "user" ? slideIn.initial : slideInLeft.initial}
                    animate={message.sender === "user" ? slideIn.animate : slideInLeft.animate}
                    transition={{ ...slideIn.transition, delay: index * 0.1 }}
                    className={`flex items-start space-x-3 ${
                      message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                    }`}
                  >
                    {/* Avatar */}
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarFallback
                        className={
                          message.sender === "user"
                            ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white"
                            : "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                        }
                      >
                        {message.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </AvatarFallback>
                    </Avatar>

                    {/* Message Content */}
                    <div className={`flex-1 max-w-[80%] ${message.sender === "user" ? "text-right" : ""}`}>
                      <Card
                        className={`${
                          message.sender === "user"
                            ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0"
                            : "bg-muted/50 backdrop-blur-sm border-border/50"
                        } shadow-lg`}
                      >
                        <CardContent className="p-4">
                          <div className={`${
                          message.sender === "user"
                            ? "text-white"
                            : "text-gray-500"
                        } whitespace-pre-wrap text-left text-sm md:text-base leading-relaxed`}>
                            {message.content}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Timestamp */}
                      <div
                        className={`flex items-center mt-2 text-xs text-muted-foreground ${
                          message.sender === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <Clock className="w-3 h-3 mr-1" />
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              <AnimatePresence>{isTyping && <TypingIndicator />}</AnimatePresence>
            </div>
          </div>
        </ScrollArea>

        {/* Input Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-x-2 md:inset-x-1/4 bottom-2 md:bottom-4 backdrop-blur-md rounded-3xl pl-0 md:pl-4 bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] flex p-4"
        >
          <div className=" mx-auto w-full">
            <div className="flex items-start space-x-3">
              {/* Quick Actions */}
              <div className="hidden md:flex flex-col space-y-2">
                <Button variant="ghost" size="sm" className="w-10 h-10 p-0">
                  <Paperclip className="w-4 h-4" />
                </Button>
              </div>

              {/* Input Field */}
              <div className="flex-1 relative">
                <div className="relative">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask me anything about life in the Netherlands..."
                    className="pr-20 w-full py-6 text-base rounded-2xl border-border/50 bg-background backdrop-blur-sm !outline-none focus:bg-background transition-all duration-200"
                  />

                  {/* Input Actions */}
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                      <Smile className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                      <Mic className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Quick Service Buttons */}
                <div className="md:flex hidden flex-wrap gap-2 mt-3">
                  {[
                    { icon: Home, label: "Housing", color: "from-teal-500 to-teal-600" },
                    { icon: Building2, label: "Government", color: "from-blue-500 to-blue-600" },
                    { icon: Briefcase, label: "Jobs", color: "from-purple-500 to-purple-600" },
                    { icon: Users, label: "Social", color: "from-indigo-500 to-indigo-600" },
                  ].map((service, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="cursor-pointer hover:scale-105 transition-transform duration-200 bg-muted/50 hover:bg-muted/80"
                      onClick={() => setInputValue(`Tell me about ${service.label.toLowerCase()} services`)}
                    >
                      <service.icon className="w-3 h-3 mr-1" />
                      {service.label}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Send Button */}
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="size-6 stroke-white" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
