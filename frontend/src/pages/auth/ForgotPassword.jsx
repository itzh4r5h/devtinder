import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { ArrowLeft, KeyRound, Mail, RefreshCw, Send, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useDispatch, useSelector } from "react-redux";
import { emailFormValidator, resetPasswordFormValidator } from "@/joi-validators/authFormValidator";
import { useValidationErrorToast } from "@/hooks/useValidationErrorToast";
import { useCountdown } from "@/hooks/useCountdown";
import { resetPassword, sendForgotPasswordOtp } from "@/store/thunks/authThunk";
import { clearResetEmail } from "@/store/slices/authSlice";
import { PasswordInput } from "@/components/PasswordInput";
import { AuthCardLayout } from "./AuthCardLayout";

const buttonClass =
  "button-bg font-bold text-lg cursor-pointer capitalize rounded-full py-4 w-full text-foreground tabular-nums";
const linkClass =
  "text-secondary capitalize cursor-pointer font-medium text-sm leading-5 tracking-wide flex items-center gap-1";

// step 1: ask for the email and send the otp
const EmailStep = ({ secondsLeft }) => {
  const dispatch = useDispatch();
  const [isSending, setIsSending] = useState(false);

  const schema = useMemo(() => emailFormValidator(), []);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: joiResolver(schema),
    reValidateMode: "onSubmit",
  });

  useValidationErrorToast(errors);

  // on success the slice stores the email, which switches the page to the otp step
  const submitForm = async ({ email }) => {
    setIsSending(true);
    await dispatch(sendForgotPasswordOtp(email.trim().toLowerCase()));
    setIsSending(false);
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email" className="text-foreground text-base">
            Email
          </FieldLabel>
          <div className="relative">
            <Mail className="top-1/2 -translate-y-1/2 size-4 text-foreground absolute left-3" />
            <Input
              {...register("email", { required: true })}
              id="email"
              type="email"
              placeholder="harsh@gmail.com"
              autoComplete="email"
              className="border-white/10 border-0 border-solid pl-9 text-foreground font-medium tracking-wide lowercase"
            />
          </div>
        </Field>

        <Button
          type="submit"
          variant="outline"
          size="lg"
          disabled={isSending || secondsLeft > 0}
          className={buttonClass}
        >
          <Send className="size-5" />
          {isSending ? "sending..." : secondsLeft > 0 ? `send code in ${secondsLeft}s` : "send code"}
        </Button>

        <Link to="/signin" className={`${linkClass} self-center`}>
          <ArrowLeft className="size-4" /> back to sign in
        </Link>
      </FieldGroup>
    </form>
  );
};

// step 2: enter the otp from the email and the new password
const ResetStep = ({ email, secondsLeft }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isResetting, setIsResetting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const schema = useMemo(() => resetPasswordFormValidator(), []);
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    resolver: joiResolver(schema),
    reValidateMode: "onSubmit",
    defaultValues: { otp: "", password: "", confirmPassword: "" },
  });

  useValidationErrorToast(errors);

  const submitForm = async ({ otp, password }) => {
    setIsResetting(true);
    const result = await dispatch(resetPassword({ email, otp, password }));
    setIsResetting(false);

    if (resetPassword.fulfilled.match(result)) {
      navigate("/signin");
    }
  };

  const resendCode = async () => {
    setIsResending(true);
    await dispatch(sendForgotPasswordOtp(email));
    setIsResending(false);
  };

  const slotClass = "data-[active=true]:ring-secondary uppercase";
  const groupClass =
    "*:data-[slot=input-otp-slot]:h-10 *:data-[slot=input-otp-slot]:w-full *:data-[slot=input-otp-slot]:text-xl flex-1";

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <FieldGroup>
        <Field>
          <div className="flex items-center justify-between gap-2">
            <FieldLabel htmlFor="otp" className="text-foreground text-base">
              Reset code
            </FieldLabel>
            <Button
              type="button"
              variant="outline"
              size="xs"
              onClick={resendCode}
              disabled={isResending || secondsLeft > 0}
              className="active-bar font-bold text-sm cursor-pointer capitalize rounded-full py-4 text-foreground tabular-nums"
            >
              <RefreshCw className="size-4" />
              {isResending ? "sending..." : secondsLeft > 0 ? `resend in ${secondsLeft}s` : "resend code"}
            </Button>
          </div>
          <Controller
            name="otp"
            control={control}
            render={({ field }) => (
              <InputOTP
                id="otp"
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                value={field.value}
                // the code is case insensitive, show it the way it looks in the email
                onChange={(value) => field.onChange(value.toUpperCase())}
                onBlur={field.onBlur}
                containerClassName="w-full"
              >
                <InputOTPGroup className={groupClass}>
                  <InputOTPSlot index={0} className={slotClass} />
                  <InputOTPSlot index={1} className={slotClass} />
                  <InputOTPSlot index={2} className={slotClass} />
                </InputOTPGroup>
                {/* same color as the otp box outlines */}
                <InputOTPSeparator className="flex items-center mx-1 text-input" />
                <InputOTPGroup className={groupClass}>
                  <InputOTPSlot index={3} className={slotClass} />
                  <InputOTPSlot index={4} className={slotClass} />
                  <InputOTPSlot index={5} className={slotClass} />
                </InputOTPGroup>
              </InputOTP>
            )}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="password" className="text-foreground text-base">
            New Password
          </FieldLabel>
          <PasswordInput {...register("password")} id="password" autoComplete="new-password" />
        </Field>

        <Field>
          <FieldLabel htmlFor="confirmPassword" className="text-foreground text-base">
            Confirm New Password
          </FieldLabel>
          <PasswordInput {...register("confirmPassword")} id="confirmPassword" autoComplete="new-password" />
        </Field>

        <Button type="submit" variant="outline" size="lg" disabled={isResetting} className={buttonClass}>
          <ShieldCheck className="size-5" />
          {isResetting ? "resetting..." : "reset password"}
        </Button>

        <div className="flex justify-between flex-wrap gap-2">
          <Link to="/signin" className={linkClass}>
            <ArrowLeft className="size-4" /> back to sign in
          </Link>
          <button type="button" onClick={() => dispatch(clearResetEmail())} className={linkClass}>
            use a different email
          </button>
        </div>
      </FieldGroup>
    </form>
  );
};

export const ForgotPassword = () => {
  const { resetEmail, resetOtpAvailableAt } = useSelector((state) => state.auth);
  const secondsLeft = useCountdown(resetOtpAvailableAt);

  return (
    <AuthCardLayout
      // the left hero is shorter on this page, so nudge these icons off the text
      iconPositions={{
        atom: "top-[12%] left-[30%]",
        terminal: "bottom-[3%] left-[24%]",
      }}
      Icon={resetEmail ? ShieldCheck : KeyRound}
      title={resetEmail ? "Enter your reset code 🔐" : "Forgot your password?"}
      description={
        resetEmail ? (
          <span className="flex flex-col items-center">
            <span>We sent a 6 character code to</span>
            <span className="text-foreground font-medium break-all">{resetEmail}</span>
            <span>It expires in 10 minutes.</span>
          </span>
        ) : (
          "Enter your email and we'll send you a code to reset your password."
        )
      }
    >
      {resetEmail ? (
        <ResetStep email={resetEmail} secondsLeft={secondsLeft} />
      ) : (
        <EmailStep secondsLeft={secondsLeft} />
      )}
    </AuthCardLayout>
  );
};
