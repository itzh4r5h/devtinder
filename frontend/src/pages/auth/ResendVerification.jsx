import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, MailOpen, Send } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useDispatch, useSelector } from "react-redux";
import { emailFormValidator } from "@/joi-validators/authFormValidator";
import { useValidationErrorToast } from "@/hooks/useValidationErrorToast";
import { useCountdown } from "@/hooks/useCountdown";
import { resendVerification } from "@/store/thunks/authThunk";
import { AuthCardLayout } from "./AuthCardLayout";

// reached from the email ("link expired?"), from a failed verification,
// or right after signup with the email in router state ("check your inbox")
export const ResendVerification = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { resendAvailableAt } = useSelector((state) => state.auth);
  const secondsLeft = useCountdown(resendAvailableAt);

  // email the latest link was sent to, shows the "check your inbox" message
  const [sentTo, setSentTo] = useState(location.state?.email ?? null);
  const [isSending, setIsSending] = useState(false);

  const schema = useMemo(() => emailFormValidator(), []);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: joiResolver(schema),
    reValidateMode: "onSubmit",
    defaultValues: { email: location.state?.email ?? "" },
  });

  useValidationErrorToast(errors);

  const submitForm = async ({ email }) => {
    setIsSending(true);
    const result = await dispatch(resendVerification(email));
    setIsSending(false);

    if (resendVerification.fulfilled.match(result)) {
      setSentTo(email);
    }
  };

  const isDisabled = isSending || secondsLeft > 0;

  return (
    <AuthCardLayout
      // the left hero is shorter on this page, so nudge these icons off the text
      iconPositions={{
        atom: "top-[12%] left-[30%]",
        terminal: "bottom-[3%] left-[24%]",
      }}
      Icon={sentTo ? MailOpen : Send}
      title={sentTo ? "Check your inbox 📬" : "Resend verification link"}
      description={
        sentTo ? (
          <span className="flex flex-col items-center">
            <span>We sent a verification link to</span>
            <span className="text-foreground font-medium break-all">{sentTo}</span>
            <span>It expires in 15 minutes.</span>
          </span>
        ) : (
          "Enter your email and we'll send you a fresh verification link."
        )
      }
    >
      <form onSubmit={handleSubmit(submitForm)}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email" className="text-foreground text-base">
              {sentTo ? "Didn't get it? Resend to" : "Email"}
            </FieldLabel>
            <div className="relative">
              <Mail className="top-1/2 -translate-y-1/2 size-4 text-foreground absolute left-3" />
              <Input
                {...register("email", { required: true })}
                id="email"
                type="email"
                placeholder="harsh@gmail.com"
                autoComplete="off"
                className="border-white/10 border-0 border-solid pl-9 text-foreground font-medium tracking-wide lowercase"
              />
            </div>
          </Field>

          <Button
            type="submit"
            variant="outline"
            size="lg"
            disabled={isDisabled}
            className="button-bg font-bold text-lg cursor-pointer capitalize rounded-full py-4 w-full text-foreground tabular-nums"
          >
            <Send className="size-5" />
            {isSending
              ? "sending..."
              : secondsLeft > 0
                ? `resend in ${secondsLeft}s`
                : sentTo ? "resend link" : "send link"}
          </Button>

          <Link
            to="/signin"
            className="text-secondary capitalize cursor-pointer font-medium text-sm leading-5 self-center tracking-wide flex items-center gap-1"
          >
            <ArrowLeft className="size-4" /> back to sign in
          </Link>
        </FieldGroup>
      </form>
    </AuthCardLayout>
  );
};
