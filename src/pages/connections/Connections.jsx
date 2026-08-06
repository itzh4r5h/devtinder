import { useRef } from "react";
import { ConnecitonCard } from "./ConnectionCard";
import { MOCK_USERS } from "@/mock/user-data";

export const Connections = () => {
  const modified_mock_users = MOCK_USERS.map((user) => {
    const firstName = user.name.split(" ")[0].toLowerCase();
    return { ...user, imageUrl: `/images/${firstName}.webp` };
  });

  return (
    <section className="h-dvh w-full grid grid-cols-1 md:grid-cols-[4fr_8fr] md:gap-3 py-3">
      <div className="flex flex-col gap-3 rounded-xl overflow-y-scroll scrollbar-none min-h-0">
        {modified_mock_users.map((user) => {
          return <ConnecitonCard user={user} key={user._id} />;
        })}
      </div>

      <div className="hidden md:block bg-card rounded-xl"></div>
    </section>
  );
};
