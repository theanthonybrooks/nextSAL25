"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/convex/_generated/api";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { LogOut, Settings, Sparkles, User } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export function UserProfile() {
  const { user } = useUser();
  const subscription = useQuery(api.subscriptions.getUserSubscription)?.status;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9 rounded-full ring-1 ring-border">
            <AvatarImage
              src={user?.imageUrl}
              alt={user?.fullName || "User Profile"}
            />
            <AvatarFallback className="bg-blue-50 text-blue-900 dark:bg-blue-950 dark:text-blue-200">
              {user?.firstName?.[0]}
              {user?.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.fullName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.emailAddresses[0].emailAddress}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/user-profile">
            <DropdownMenuItem className="focus:bg-blue-50 dark:focus:bg-blue-950">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>
          {subscription && (
            <>
              <Link href="/dashboard/settings">
                <DropdownMenuItem className="focus:bg-blue-50 dark:focus:bg-blue-950">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
              </Link>

              <Link href="/dashboard/account">
                <DropdownMenuItem className="focus:bg-blue-50 dark:focus:bg-blue-950">
                  <Sparkles className="mr-2 h-4 w-4" />
                  <span>Manage Subscription</span>
                </DropdownMenuItem>
              </Link>
            </>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <SignOutButton>
          <DropdownMenuItem className="focus:bg-blue-50 dark:focus:bg-blue-950">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </SignOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
