import { RequestsCard } from "./RequestsCard"


export const Sent = ({ users }) => {
  return (
    <div className="flex flex-1 flex-wrap justify-center items-center gap-4 sm:gap-5 lg:gap-6 mt-10">
      {users.length > 0 ? users.map(({ user }) => (
        <div
          key={user._id}
          className="max-w-40 sm:max-w-60 md:max-w-50 lg:max-w-70 w-full cursor-pointer"
        >
          <RequestsCard
            user={user}
            sentReq={true}
          />
        </div>
      )) :
        <h2 className="text-muted-foreground text-3xl leading-10">
          You haven't sent any request right now!
        </h2>
      }
    </div>
  )
}
