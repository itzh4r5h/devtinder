import { RequestsCard } from "@/components/RequestsCard";
import { motion } from "motion/react";
import { AnimatePresence, LayoutGroup } from "motion/react";
import { useEffect, useState } from "react";

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
          <motion.div
            layout
            layoutId={`card-${user._id}`}
            onClick={() => setSelectedUser(user)}
            key={user._id}
            className="max-w-40 sm:max-w-60 md:max-w-50 lg:max-w-70 w-full cursor-pointer"
            transition={{
              layout: {
                type: "spring",
                stiffness: 150,
                damping: 24,
                mass: 1,
              },
            }}
          >
            <RequestsCard expanded={false} user={user} />
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="popLayout">
        {selectedUser && (
          <motion.div
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedUser(null)}
          >
            <motion.div
              layout
              layoutId={`card-${selectedUser._id}`}
              className="relative"
              onClick={(e) => e.stopPropagation()}
              transition={{
                layout: {
                  type: "spring",
                  stiffness: 180,
                  damping: 24,
                  mass: 1,
                },
              }}
            >
              <RequestsCard expanded={true} user={selectedUser} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
};
