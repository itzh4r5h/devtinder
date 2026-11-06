import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Trash } from "lucide-react";

export const DeleteAccount = () => {
  return (
    <Card className="card border border-red-500/50 text-foreground rounded-3xl p-5 flex-1 md:col-span-2 lg:col-span-1">
      <CardHeader>
        <h1 className="text-2xl text-center tracking-wider font-semibold capitalize text-red-500">
          Delete Account
        </h1>
      </CardHeader>
      <CardContent className="p-0 flex flex-col gap-3 text-muted-foreground">
        <p className="text-2xl tracking-wide text-center">Permanently delete your account and all associated data.</p>
        <p className="text-2xl tracking-wide text-center">And you will lose access to your profile, connections and chats.</p>
        <p className="text-2xl tracking-wide text-red-500 text-center">This action cannot be undone.</p>

        <Separator />

        <Button
          variant="destructive"
          size="lg"
          className="font-bold text-lg cursor-pointer capitalize rounded-full py-4 w-full text-foreground"
        >
          <Trash className="size-5" /> delete account
        </Button>
      </CardContent>
    </Card>
  );
};
