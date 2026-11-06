import { useState } from "react"
import { RequestsCard } from "./RequestsCard"
import { useDispatch } from "react-redux"
import { cancelSentReq } from "@/store/thunks/requestsThunk"

export const Sent = ({ users }) => {
  const [cards, setCards] = useState(users)
  const dispatch = useDispatch()
  const cancelReq = (connectionId, id) => {
    dispatch(cancelSentReq(connectionId))
    setCards(prev => prev.filter(({ user }) => user._id !== id))
  }

  return (
    <div className="flex flex-1 flex-wrap justify-center items-center gap-4 sm:gap-5 lg:gap-6 mt-10">
      {cards.length > 0 ? cards.map(({ user, connectionId }) => (
        <div
          key={user._id}
          className="max-w-40 sm:max-w-60 md:max-w-50 lg:max-w-70 w-full"
        >
          <RequestsCard
            user={user}
            cancelReq={() => cancelReq(connectionId, user._id)}
            sentReq={true}
          />
        </div>
      )) :
        <h2 className="text-muted-foreground text-3xl leading-10 -mt-10">
          You haven't sent any request right now!
        </h2>
      }
    </div>
  )
}
