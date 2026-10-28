import { useSelector } from "react-redux";
import { ConnecitonCard } from "./ConnectionCard";

export const Connections = () => {
  const { connectionsData } = useSelector(state => state.connections)
  return (
    <>
      {connectionsData.length > 0 ?
        <section className="h-dvh w-full grid grid-cols-1 md:grid-cols-[4fr_8fr] md:gap-3 py-3">
          <div className="flex flex-col gap-3 rounded-xl overflow-y-scroll scrollbar-none min-h-0">
            {connectionsData.map((conn) => {
              return <ConnecitonCard connection={conn} key={conn.connectionId} />;
            })}
          </div>

          <div className="hidden md:block bg-card rounded-xl"></div>
        </section>
        :
        <section className="flex-1 w-full flex justify-center items-center">
          <h2 className="text-muted-foreground text-3xl leading-10">
            You haven't made any connections right now!
          </h2>

        </section>}
    </>
  );
};
