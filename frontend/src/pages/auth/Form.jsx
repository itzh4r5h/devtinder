import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { EyeOff, Flame, Lock, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import { useEffect, useMemo } from "react";
import { authFormValidator } from "@/joi-validators/authFormValidator";
import { useForm } from "react-hook-form";
import { joiResolver } from '@hookform/resolvers/joi'
import { useValidationErrorToast } from "@/hooks/useValidationErrorToast";
import { useDispatch } from "react-redux";
import { signin, signup } from "@/store/thunks/authThunk";

export const Form = ({ activeRoute }) => {
  const schema = useMemo(() => {
    return authFormValidator(activeRoute)
  }, [activeRoute])

  const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: joiResolver(schema), reValidateMode: 'onSubmit' })
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitForm = async (data) => {
    switch (activeRoute) {
      case '/signup': {
        const result = await dispatch(signup(data))
        // verification link was sent, show the "check your inbox" page
        if (signup.fulfilled.match(result)) {
          navigate('/resend-verification', { state: { email: data.email } })
        }
        break;
      }
      case '/signin':
        dispatch(signin(data))
        break;
    }
  }

  useValidationErrorToast(errors)

  useEffect(() => {
    reset()
  }, [activeRoute, reset])

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <FieldGroup>
        {activeRoute === "/signup" && (
          <>
            <Field>
              <FieldLabel htmlFor="name" className="text-foreground text-base">
                Name
              </FieldLabel>
              <div className="relative">
                <User className="top-1/2 -translate-y-1/2 size-4 text-foreground absolute left-3" />
                <Input
                  {...register("name", { required: true })}
                  id="name"
                  type="text"
                  placeholder="harsh"
                  autoComplete="off"
                  className="border-white/10 border-0 border-solid pl-9 text-foreground font-medium tracking-wide lowercase"
                />
              </div>
            </Field>
          </>
        )}
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
              autoComplete="off"
              className="border-white/10 border-0 border-solid pl-9 text-foreground font-medium tracking-wide lowercase"
            />
          </div>
        </Field>
        <Field>
          <FieldLabel htmlFor="password" className="text-foreground text-base">
            Password
          </FieldLabel>
          <div className="relative">
            <Lock className="top-1/2 -translate-y-1/2 size-4 text-foreground absolute left-3" />
            <Input
              {...register("password", { required: true })}
              id="password"
              type="password"
              placeholder="••••••••"
              className="border-white/10 border-0 border-solid px-9 text-foreground"
            />
            <EyeOff className="top-1/2 -translate-y-1/2 size-4 text-muted-foreground absolute right-3" />
          </div>
        </Field>
        {activeRoute === "/signin" && (
          <div className="flex items-center justify-between gap-4">
            <Link
              to="/resend-verification"
              className="text-secondary capitalize cursor-pointer font-medium text-sm leading-5 tracking-wide"
            >
              verify email
            </Link>
            <Link
              to="/forgot-password"
              className="text-secondary capitalize cursor-pointer font-medium text-sm leading-5 tracking-wide"
            >
              forgot password ?
            </Link>
          </div>
        )}
        <Button
          type="submit"
          variant="outline"
          size="lg"
          className={`${activeRoute === "/signup" && 'mt-2'} button-bg font-bold text-lg cursor-pointer capitalize rounded-full py-4 w-full text-foreground`}
        >
          <Flame className="size-6" /> sign
          {activeRoute === "/signin" ? " in" : " up"}
        </Button>
        <div className="flex items-center gap-4">
          <Separator className="bg-white/10 flex-1" />
          <span className="whitespace-nowrap text-muted-foreground text-sm leading-4">
            Or continue with
          </span>
          <Separator className="bg-white/10 flex-1" />
        </div>
        <div className="grid grid-cols-2 gap-8">
          <Button
            variant="outline"
            className="active-bar text-foreground border-white/10 cursor-pointer border border-solid gap-2"
          >
            GitHub
          </Button>
          <Button
            variant="outline"
            className="active-bar text-foreground border-white/10 cursor-pointer border border-solid gap-2"
          >
            Google
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
};
