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
import { cn } from "@/lib/utils"
import { TypingAnimation } from "@/components/magicui/text-animation"
import Image from "next/image"
import MessengerIcon from "@/components/icons/messenger-icon"


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

type Message = {
  role: "assistant" | "user";
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])

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

    const newMessage = {
      role: "user" as const,
      content: inputValue,
    }

    setMessages((prev) => [...prev, newMessage])
    setInputValue("")
    setIsTyping(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/prompt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: inputValue, currentPage: "chat" }),
      });
      const data = await response.json();
      const formattedBotResponse = {
        role: "assistant" as const,
        content:
          data.data.response,
      }

      setMessages((prev) => [...prev, formattedBotResponse])
      setIsTyping(false)
    } catch (err) {
      setIsTyping(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col">

      {/* Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <ScrollArea className="flex-1 px-4" ref={scrollAreaRef}>
          <div className="md:max-w-4xl mx-auto pt-16 md:pt-20 pb-48 py-6 space-y-6">
            {/* Welcome Message */}
            {messages.length === 0 &&
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 md:mt-32"
              >
                <div className="size-20 bg-background rounded-3xl  [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] flex items-center justify-center mx-auto mb-4">
                <MessengerIcon/>
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold mb-2">Welcome to Doris AI</h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  I'm here to help you navigate life in the Netherlands. Ask me anything about housing, jobs, government
                  services, or integration.
                </p>

                {/* Sample Questions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl  mx-auto">
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
              </motion.div>}

            {/* Messages */}

            <div className="space-y-4 pb-32 pt-16">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
                >
                  <Card
                    className={cn(
                      "max-w-[80%] p-4 shadow-md rounded-[35px] font-semibold",
                      message.role === "user"
                        ? "bg-gradient-to-br from-blue-500 rounded-tr-none to-purple-600 text-white border-0"
                        : "bg-background rounded-tl-none [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
                    )}
                  >
                    {(index === messages.length - 1 && message.role === "assistant") ?
                      <TypingAnimation duration={20} className="text-sm leading-relaxed">{message.content}</TypingAnimation> :
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    }
                  </Card>
                </motion.div>
              ))}

              {/* Enhanced Typing Indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex justify-start"
                  >
                    <Card className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 border border-gray-200 dark:border-gray-600 px-4 py-3 shadow-md">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-200"></div>
                          <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce delay-300"></div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
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
