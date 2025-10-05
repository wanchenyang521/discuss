"use client"
import React from 'react';
import { useSession } from "next-auth/react"
import {Avatar, Button, NavbarItem, Popover, PopoverContent, PopoverTrigger} from "@heroui/react";
import * as action from "@/action";

const Header0Auth = ():React.ReactNode => {
    const { data: session } = useSession()
    let authContent: React.ReactNode = null
    if (session?.user) {
        authContent =
            <Popover placement="bottom">
                <PopoverTrigger>
                    <Avatar src={session.user.image || ''}/>
                </PopoverTrigger>
                <PopoverContent>
                    <div className="px-1 py-2">
                        <form
                            action={() => action.signOut()}
                        >
                            <Button type="submit" color="secondary">Sign Out</Button>
                        </form>
                    </div>
                </PopoverContent>
            </Popover>


    } else {
        authContent = <NavbarItem className="flex gap-4">
            <form
                action={() => action.signIn()}
            >
                <Button color="secondary"  variant="bordered" type="submit">Sign in</Button>
            </form>
            <Button  color="secondary">Sign Up</Button>
        </NavbarItem>
    }

    return authContent;
};

export default Header0Auth;