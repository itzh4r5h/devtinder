import { RequestsCard } from "@/pages/requests/RequestsCard";
import { motion } from "motion/react";
import { AnimatePresence, LayoutGroup } from "motion/react";
import { useEffect, useState } from "react";
import { RequestsCardModal } from "./RequestsCardModal";

export const Received = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    document.body.style.overflow = selectedUser ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedUser]);

  return (
    <LayoutGroup>
      <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-5 lg:gap-6 mt-10">
        {users.map((user) => (
          <div
            onClick={() => setSelectedUser(user)}
            key={user._id}
            className="max-w-40 sm:max-w-60 md:max-w-50 lg:max-w-70 w-full cursor-pointer"
          >
            <RequestsCard
              user={user}
              isSelected={selectedUser?._id === user._id}
            />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedUser && (
          <>
            <motion.div
              className="fixed inset-0 z-100 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.2,
                delay: 0.05,
              }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedUser(null)}
            />
            <div className="fixed inset-0 z-150 flex items-center justify-center pointer-events-none">
              <RequestsCardModal user={selectedUser} />
            </div>
          </>
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
};
