import { useSelector } from "react-redux";
import { ConnecitonCard } from "./ConnectionCard";
import { Await, useLoaderData, useParams } from "react-router";
import { Suspense, useMemo } from "react";
import { ConnectionsSkeleton } from "@/skeletons/ConnectionsSkeleton";
import { Chat } from "./chat/Chat";
import { ChatPlaceholder } from "./chat/ChatPlaceholder";

const lastMessageTime = (conversation) =>
  conversation?.lastMessage ? new Date(conversation.lastMessage.createdAt).getTime() : 0

export const Connections = () => {
  const { connectionsData } = useSelector(state => state.connections)
  const { conversations } = useSelector(state => state.chat)
  const { connectionPromise } = useLoaderData() || {}
  const { connectionId } = useParams()

  const activeConnection = connectionsData.find((conn) => conn.connectionId === connectionId)

  // latest conversation first, connections without messages keep their order at the bottom
  const sortedConnections = useMemo(
    () =>
      connectionsData
        .map((conn, index) => ({ conn, index, time: lastMessageTime(conversations[conn.user._id]) }))
        .sort((a, b) => b.time - a.time || a.index - b.index)
        .map(({ conn }) => conn),
    [connectionsData, conversations]
  )

  return (
    <Suspense fallback={<ConnectionsSkeleton />}>
      <Await resolve={connectionPromise}>
        {() => {
          return connectionsData.length > 0 ?
            <section className="flex-1 min-h-0 w-full grid grid-cols-1 md:grid-cols-[4fr_8fr] md:gap-3 py-3">
              {/* mobile shows either the list or the open chat, desktop shows both */}
              <div className={`${activeConnection ? "hidden md:flex" : "flex"} flex-col gap-3 rounded-xl overflow-y-scroll no-scrollbar min-h-0`}>
                {sortedConnections.map((conn) => {
                  return <ConnecitonCard connection={conn} key={conn.connectionId} />;
                })}
              </div>

              <div className={`${activeConnection ? "flex" : "hidden md:flex"} min-h-0 card border border-white/10 rounded-xl overflow-hidden`}>
                {activeConnection ?
                  <Chat key={activeConnection.user._id} connection={activeConnection} />
                  :
                  <ChatPlaceholder />
                }
              </div>
            </section>
            :
            <section className="flex-1 w-full flex justify-center items-center">
              <h2 className="text-muted-foreground text-3xl leading-10">
                You haven't made any connections right now!
              </h2>

            </section>
        }}
      </Await>
    </Suspense>
  );
};
