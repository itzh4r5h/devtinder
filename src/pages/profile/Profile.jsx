import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TAG_COLORS, TAG_LABELS } from "@/constants/tag";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { EditProfile } from "./EditProfile";
import { ChooseFile } from "@/components/ChooseFile";
import { ProfileCompletionProgress } from "./ProfileCompletionProgress";
import { useSelector } from "react-redux";
import { formatDate } from "@/lib/utils";

export const Profile = () => {
  const { user } = useSelector(state => state.user)

  return (
    <section className="flex-1 flex flex-col items-center justify-center gap-5 py-5">

      <ProfileCompletionProgress completionRate={user.profileCompletionCount} />

      <div className="flex flex-wrap md:grid md:grid-cols-[4fr_8fr] items-center justify-center gap-5 w-full h-full flex-1">
        <Card className="card border border-white/10 rounded-3xl p-4 w-full h-full">
          <CardContent className="flex flex-col gap-5 p-0 justify-center items-center h-full">
            <h1 className="text-foreground text-3xl tracking-wide line-clamp-1 text-ellipsis">
              {user.name}
            </h1>

            <Avatar className="size-80 relative">
              <AvatarImage src={user.profilePic.url} alt="LR" />
              <AvatarFallback className="text-9xl font-bold">{user.name[0].toUpperCase()}</AvatarFallback>
              <span className="absolute right-2 bottom-0"><ChooseFile /></span>
            </Avatar>

          </CardContent>
        </Card>
        <Card className="card border border-white/10 rounded-3xl p-4 w-full h-full relative">
          <div className="absolute right-5">
            <EditProfile />
          </div>
          <CardContent className="flex justify-center flex-col h-full gap-6">
            <div className="flex flex-col gap-4 justify-center md:px-5 pt-4 md:pt-0">
              <div className="flex gap-5 md:gap-10 items-center flex-wrap">
                <Info title="role" desc={user?.role || "---"} />
                <Info title="experience" desc={user?.experience || "---"} />
                <Info title="connections" desc={user.connections} />
              </div>

              <div className="flex-1 space-y-1">
                <h4 className="text-muted-foreground capitalize text-base">
                  description
                </h4>
                <p className="text-foreground text-xl lowercase tracking-wide text-center">
                  {user?.description || "------"}
                </p>
              </div>

              <div className="flex-1 space-y-1">
                <h4 className="text-muted-foreground capitalize text-base">
                  tags
                </h4>

                <div className="flex flex-wrap gap-2">
                  {user.tags.length > 0 ? user.tags.map((tag, index) => {
                    return (
                      <Badge
                        key={tag.toLowerCase() + index}
                        className={`text-foreground ${TAG_COLORS[tag.toLowerCase()] ?? "bg-neutral-500 text-foreground"} leading-4 sm:text-sm h-7 px-3`}
                      >
                        {TAG_LABELS[tag.toLowerCase()] ?? tag}
                      </Badge>
                    );
                  }) :
                    <p className="text-foreground text-xl capitalize tracking-wide text-center">
                      ----
                    </p>
                  }
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 md:flex md:gap-10 md:items-center">
                <Info title="age" desc={user?.age || "---"} />
                <Info title="gender" desc={user?.gender || "---"} />
                <span className="col-span-2">
                  <Info title="joined on" desc={formatDate(user.createdAt)} />
                </span>
              </div>

              {/* Socials */}
              <div className="flex-1 space-y-2">
                <h4 className="text-muted-foreground capitalize text-base">
                  socials
                </h4>
                {user?.socials ?
                  <div className="flex items-center gap-6 text-foreground">
                    <a href={`https://github.com/${user.socials.github}`} target="_blank" rel="noopener noreferrer">
                      <Button
                        variant="outline"
                        className="button-bg cursor-pointer rounded-full size-10"
                      >
                        <FaGithub className="size-5" />
                      </Button>
                    </a>

                    <a href={`https://linkedin.com/in/${user.socials.linkedin}`} target="_blank" rel="noopener noreferrer">
                      <Button
                        variant="outline"
                        className="button-bg cursor-pointer rounded-full size-10"
                      >
                        <FaLinkedin className="size-5" />
                      </Button>
                    </a>

                    <a href={`https://x.com/${user.socials.x}`} target="_blank" rel="noopener noreferrer">
                      <Button
                        variant="outline"
                        className="button-bg cursor-pointer rounded-full size-10"
                      >
                        <FaXTwitter className="size-5" />
                      </Button>
                    </a>
                  </div>
                  : <p className="text-foreground text-2xl">---</p>}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

const Info = ({ title, desc }) => {
  return (
    <div className="flex-1 space-y-1">
      <h4 className="text-muted-foreground capitalize text-base">{title}</h4>
      <p className="text-foreground text-2xl capitalize">
        {desc}
      </p>
    </div>
  );
};
