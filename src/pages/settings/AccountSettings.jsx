import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UpdateEmail } from "./UpdateEmail";
import { UpdatePassword } from "./UpdatePassword";
import { DeleteAccount } from "./DeleteAccount";
import { Settings } from "lucide-react";

export const AccountSettings = () => {
  return (
    <section className="flex-1 py-5 w-full flex flex-col items-center justify-center gap-5">
      <h1 className="text-3xl font-bold tracking-wider text-center flex items-center gap-2">
        <Settings className="size-7"/>
        <span>Account Settings</span>
      </h1>

      <div className="grid grid-cols-1 grid-rows-3 gap-5 md:grid-cols-2 md:grid-rows-2 lg:grid-rows-1 lg:grid-cols-3 w-full">
        <UpdateEmail />

        <UpdatePassword />

        <DeleteAccount />
      </div>
    </section>
  );
};
