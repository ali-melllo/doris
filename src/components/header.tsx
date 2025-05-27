import { List, Sparkles } from 'lucide-react'
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {
    return (
        <header className='h-16 shadow-xl bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] flex justify-between items-center px-5'>
            <h2 className='font-semibold text-xl flex justify-center gap-3 items-center'>
                <Sparkles className='stroke-primary' />
                <p>Doris<span className='text-primary font-bold'> AI</span></p>
            </h2>

            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger className='border border-primary p-2 rounded-xl outline-none'>
                        <List className='stroke-primary'/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='mr-5 mt-3'>
                        <DropdownMenuLabel>Profile</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Upgrade to Premium</DropdownMenuItem>
                        <DropdownMenuItem>Saved Items</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Change Language</DropdownMenuItem>
                        <DropdownMenuItem>AI Chat</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
