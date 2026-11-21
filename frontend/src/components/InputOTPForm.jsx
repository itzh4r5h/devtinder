import { RefreshCwIcon, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp"

export function InputOTPForm() {
  return (
    <div className="text-foreground flex flex-col gap-5">
     
        <p className="text-foreground text-base">
          Enter the verification code we sent to your email address:{" "}
          <span className="font-medium">m@example.com</span>.
        </p>
  
      <div>
        <Field>
          <div className="flex items-center justify-between mb-2">
            <FieldLabel htmlFor="otp-verification" className="text-foreground text-base">
              Verification code
            </FieldLabel>
            <Button variant="outline"
            size="xs"
            className="active-bar font-bold text-sm cursor-pointer capitalize rounded-full py-4 text-foreground">
              <RefreshCwIcon className="size-4"/>
              Resend Code
            </Button>
          </div>
          <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} id="otp-verification" required className="w-full">
            <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-10 *:data-[slot=input-otp-slot]:w-full *:data-[slot=input-otp-slot]:text-xl flex-1">
              <InputOTPSlot index={0} className="data-[active=true]:ring-secondary"/>
              <InputOTPSlot index={1} className="data-[active=true]:ring-secondary"/>
              <InputOTPSlot index={2} className="data-[active=true]:ring-secondary"/>
            </InputOTPGroup>
            <InputOTPSeparator className="mx-1" />
            <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-10 *:data-[slot=input-otp-slot]:w-full *:data-[slot=input-otp-slot]:text-xl flex-1">
              <InputOTPSlot index={3} className="data-[active=true]:ring-secondary"/>
              <InputOTPSlot index={4} className="data-[active=true]:ring-secondary"/>
              <InputOTPSlot index={5} className="data-[active=true]:ring-secondary"/>
            </InputOTPGroup>
          </InputOTP>
        </Field>
      </div>
    
        
          <Button
            variant="outline"
            size="lg"
            className="button-bg font-bold text-lg cursor-pointer capitalize rounded-full py-4 w-full text-foreground mt-3"
          >
            <Save className="size-5" /> Update
          </Button>
        
     
    </div>
  );
}
