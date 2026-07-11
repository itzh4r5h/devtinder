import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { Logo } from "./Logo";

export const Footer = () => {
  const username = 'itzh4r5h'

  return (
    <footer className="border-t border-white/10 container mx-auto px-5 flex flex-col items-center md:flex-row justify-between gap-6 py-8 mt-10">
      <Logo />

      {/* Copyright */}
      <p className="text-md text-muted-foreground text-center">
        Made for developers with ❤️ by{" "}
        <span className="font-medium text-foreground">Harsh</span>
      </p>

      {/* Socials */}
      <div className="flex items-center gap-3">
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-white/10 p-2 text-muted-foreground transition-all hover:border-primary/40 hover:text-primary"
        >
          <FaGithub className="size-5" />
        </a>

        <a
          href={`https://linkedin.com/in/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-white/10 p-2 text-muted-foreground transition-all hover:border-primary/40 hover:text-primary"
        >
          <FaLinkedin className="size-5" />
        </a>

        <a
          href={`https://x.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-white/10 p-2 text-muted-foreground transition-all hover:border-primary/40 hover:text-primary"
        >
          <FaXTwitter className="size-5" />
        </a>
      </div>
    </footer>
  );
};
