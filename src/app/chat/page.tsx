"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Textarea } from "@/components/ui/text-area";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TypingAnimation } from "@/components/magicui/text-animation";

export default function ChatRoomPage() {
    const [input, setInput] = useState("");

    return (
        <div className="h-[100dvh] overflow-hidden bg-muted">
            <Card className="w-full h-full mx-auto">
                <CardContent className="flex flex-col gap-2 h-full">
                    {/* Messages */}
                    <ScrollArea className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
                        {/* Example messages */}
                        <div className="flex flex-col space-y-5">
                            <div className="self-start p-3 rounded-2xl rounded-tl-none text-sm max-w-sm bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] ">
                                Hello! How can I assist you today?
                            </div>

                            <div className="self-end bg-primary text-primary-foreground p-3 rounded-2xl rounded-tr-none text-sm max-w-sm">
                                What documents do I need to register at the municipality?
                            </div>
                            <div className="self-start p-3 pb-0 w-full rounded-2xl rounded-tl-none text-sm bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] ">
                            <TypingAnimation duration={50} className="text-sm">
                                To register, you typically need a valid passport, proof of address, and your residence permit. Visit your local Gemeente’s website for exact requirements.

                            </TypingAnimation>
                                <br />
                                
                            </div>

                            
                        </div>

                    </ScrollArea>

                    {/* Input */}
                    <form className="mt-4 bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] w-full p-2 fixed bottom-0 justify-between flex gap-2 items-center">
                        <Textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 resize-none min-h-[30px] w-full max-h-[150px]"
                        />
                        <Button type="submit" variant="default" size="icon">
                            <SendHorizonal className="h-5 w-5" />
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
