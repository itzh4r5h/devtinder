import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { EyeOff, Lock,  Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const UpdatePassword = () => {
  return (
    <Card className="card border border-white/10 text-foreground rounded-3xl p-5 flex-1">
      <CardHeader>
        <h1 className="text-2xl text-center tracking-wider font-semibold capitalize">
          Change Password
        </h1>
      </CardHeader>
      <CardContent className="p-0">
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel
                htmlFor="current_password"
                className="text-foreground text-base"
              >
                Current Password
              </FieldLabel>
              <div className="relative">
                <Lock className="top-1/2 -translate-y-1/2 size-4 text-foreground absolute left-3" />
                <Input
                  id="current_password"
                  type="password"
                  placeholder="••••••••"
                  className="border-white/10 border-0 border-solid px-9 text-foreground"
                />
                <EyeOff className="top-1/2 -translate-y-1/2 size-4 text-muted-foreground absolute right-3" />
              </div>
            </Field>
            <Field>
              <FieldLabel
                htmlFor="new_password"
                className="text-foreground text-base"
              >
                New Password
              </FieldLabel>
              <div className="relative">
                <Lock className="top-1/2 -translate-y-1/2 size-4 text-foreground absolute left-3" />
                <Input
                  id="new_password"
                  type="password"
                  placeholder="••••••••"
                  className="border-white/10 border-0 border-solid px-9 text-foreground"
                />
                <EyeOff className="top-1/2 -translate-y-1/2 size-4 text-muted-foreground absolute right-3" />
              </div>
            </Field>
            <Field>
              <FieldLabel
                htmlFor="confirm_new_password"
                className="text-foreground text-base"
              >
                Confirm New Password
              </FieldLabel>
              <div className="relative">
                <Lock className="top-1/2 -translate-y-1/2 size-4 text-foreground absolute left-3" />
                <Input
                  id="confirm_new_password"
                  type="password"
                  placeholder="••••••••"
                  className="border-white/10 border-0 border-solid px-9 text-foreground"
                />
                <EyeOff className="top-1/2 -translate-y-1/2 size-4 text-muted-foreground absolute right-3" />
              </div>
            </Field>

            <Button
              variant="outline"
              size="lg"
              className="button-bg font-bold text-lg cursor-pointer capitalize rounded-full py-4 w-full text-foreground"
            >
              <Save className="size-5" /> Update
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};
