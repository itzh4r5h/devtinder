import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { Logo } from "./Logo";
import { Button } from "./ui/button";

export const Footer = () => {
  const username = "itzh4r5h";

  return (
    <footer className="border-t border-white/10 container mx-auto px-5 flex flex-col items-center md:flex-row justify-between gap-6 py-8 mt-10">
      <Logo />

      {/* Copyright */}
      <p className="text-md text-muted-foreground text-center">
        Made for developers with ❤️ by{" "}
        <span className="font-medium text-foreground">Harsh</span>
      </p>

      {/* Socials */}
      <div className="flex items-center gap-5">
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            variant="outline"
            className="button-bg cursor-pointer rounded-full size-10"
          >
            <FaGithub className="size-5" />
          </Button>
        </a>

        <a
          href={`https://linkedin.com/in/${username}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            variant="outline"
            className="button-bg cursor-pointer rounded-full size-10"
          >
            <FaLinkedin className="size-5" />
          </Button>
        </a>

        <a
          href={`https://x.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            variant="outline"
            className="button-bg cursor-pointer rounded-full size-10"
          >
            <FaXTwitter className="size-5" />
          </Button>
        </a>
      </div>
    </footer>
  );
};
