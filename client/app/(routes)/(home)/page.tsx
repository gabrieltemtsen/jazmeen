"use client";

import { ReactElement } from "react";
import HelloWorld from "../../_components/HelloWorld";
import TelegramUser from "../../_components/TelegramUser";
import { TwitterLogin } from "../../_components/TwitterLogin";
import { DiscordLogin } from "../../_components/DiscordLogin";
import { GithubLogin } from "../../_components/GithubLogin";
import Navbar from "@/app/_components/navbar/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { IoMdBulb } from "react-icons/io";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import HomeCard from "@/app/_components/card/HomeCard";

export default function Home(): ReactElement {
  return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 overflow-hidden px-4">
        <HomeCard />
        <HomeCard />
        <HomeCard />
        <HomeCard />
        <HomeCard />
        <HomeCard />
        <HomeCard />
        <HomeCard />
        <HomeCard />
        <HomeCard />
        <HomeCard />
        <HomeCard />
      </div>
  );
}
