import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputOTPForm } from "@/components/InputOTPForm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const UpdateEmail = () => {
  return (
    <Card className="card border border-white/10 text-foreground rounded-3xl p-5 flex-1">
      <CardHeader>
        <h1 className="text-2xl text-center tracking-wider font-semibold capitalize">
          Change Email
        </h1>
      </CardHeader>
      <CardContent className="p-0">
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email" className="text-foreground text-base">
                Email
              </FieldLabel>
              <div className="flex items-center gap-2">
                <Mail className="size-5 text-foreground" />
                <div className="text-foreground font-medium tracking-wider lowercase text-lg text-ellipsis line-clamp-1">
                  harsh@gmail.com
                </div>
              </div>
            </Field>
            <Field>
              <FieldLabel
                htmlFor="new_email"
                className="text-foreground text-base"
              >
                New Email
              </FieldLabel>
              <div className="relative">
                <Mail className="top-1/2 -translate-y-1/2 size-4 text-foreground absolute left-3" />
                <Input
                  id="new_email"
                  type="email"
                  placeholder="harshnew@gmail.com"
                  autoComplete="off"
                  className="border-white/10 border-0 border-solid pl-9 text-foreground font-medium tracking-wide lowercase"
                />
              </div>
            </Field>

            {/* <Button
          variant="outline"
          size="lg"
          className="button-bg font-bold text-lg cursor-pointer capitalize rounded-full py-4 w-full text-foreground"
        >
          <Send className="size-5" /> send code
        </Button> */}

            <InputOTPForm />
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};
