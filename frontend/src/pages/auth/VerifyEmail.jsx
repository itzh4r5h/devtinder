import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, MailCheck, MailX, RotateCw, UserIcon } from "lucide-react";
import { Suspense, useEffect } from "react";
import { Await, Link, useAsyncError, useLoaderData, useNavigate } from "react-router";
import { AuthCardLayout } from "./AuthCardLayout";

const REDIRECT_DELAY = 2000;

export const VerifyEmail = () => {
  const { verifyPromise } = useLoaderData();

  // no token in the url at all
  if (!verifyPromise) {
    return <VerifyFailed message="this verification link is invalid, request a new one below." />;
  }

  return (
    <Suspense fallback={<Verifying />}>
      <Await resolve={verifyPromise} errorElement={<VerifyFailedFromLoader />}>
        {() => <Verified />}
      </Await>
    </Suspense>
  );
};

const Verifying = () => {
  return (
    <AuthCardLayout
      Icon={Loader2}
      iconClassName="animate-spin"
      title="Verifying your email"
      description="Hang tight, this only takes a second..."
    />
  );
};

const Verified = () => {
  const navigate = useNavigate();

  // user is logged in now, move on to completing the profile
  useEffect(() => {
    const id = setTimeout(() => navigate("/profile", { replace: true }), REDIRECT_DELAY);
    return () => clearTimeout(id);
  }, [navigate]);

  return (
    <AuthCardLayout
      Icon={MailCheck}
      title="Email verified 🎉"
      description="You're all set! Taking you to your profile..."
    >
      <Link to="/profile" replace>
        <Button
          variant="outline"
          size="lg"
          className="button-bg font-bold text-lg cursor-pointer capitalize rounded-full py-4 w-full text-foreground"
        >
          <UserIcon className="size-5" /> complete your profile
        </Button>
      </Link>
    </AuthCardLayout>
  );
};

// the verify request failed, the error is the message from the backend
const VerifyFailedFromLoader = () => {
  const error = useAsyncError();
  return <VerifyFailed message={typeof error === "string" ? error : undefined} />;
};

const VerifyFailed = ({ message = "something went wrong, please try again." }) => {
  return (
    <AuthCardLayout
      Icon={MailX}
      iconClassName="text-red-500 drop-shadow-[0_0_10px_var(--color-red-500)]"
      title="Verification failed"
      description={message}
    >
      <div className="flex flex-col gap-4">
        <Link to="/resend-verification">
          <Button
            variant="outline"
            size="lg"
            className="button-bg font-bold text-lg cursor-pointer capitalize rounded-full py-4 w-full text-foreground"
          >
            <RotateCw className="size-5" /> send a new link
          </Button>
        </Link>
        <Link
          to="/signin"
          className="text-secondary capitalize cursor-pointer font-medium text-sm leading-5 self-center tracking-wide flex items-center gap-1"
        >
          <ArrowLeft className="size-4" /> back to sign in
        </Link>
      </div>
    </AuthCardLayout>
  );
};
