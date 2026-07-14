import { Terminal } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useLocation } from "react-router";
import { LeftContent } from "./LeftContent";
import { Tabs } from "./Tabs";
import { Form } from "./Form";
import { motion } from "motion/react";

export const Auth = () => {
  const location = useLocation();
  const activeRoute = location.pathname;

  return (
    <section className="flex flex-wrap h-full">
      <LeftContent />

      <div className="flex p-12 justify-center items-center flex-1">
        <Card className="max-w-md card rounded-2xl border border-white/10 p-6 gap-5 w-full">
          <Tabs activeRoute={activeRoute} />
          <CardHeader className="text-center p-0 items-center gap-2">
            <div className="size-12 rounded-xl bg-neutral-800 border-white/10 border border-solid flex justify-center items-center">
              <Terminal strokeWidth={2.5} className="size-6 active-icon" />
            </div>
            <CardTitle className="font-bold text-2xl text-foreground leading-5">
              Welcome Back, Dev 👋
            </CardTitle>
            <CardDescription className="text-muted-foreground text-base">
              {activeRoute === "/signin"
                ? "Sign in to continue"
                : "Sign up to start"}{" "}
              swiping
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <motion.div
              layout
              transition={{
                layout: {
                  duration: 0.35,
                  ease: "easeInOut",
                },
              }}
            >
              <Form activeRoute={activeRoute} />
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
