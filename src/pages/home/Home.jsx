import { MOCK_USERS } from "@/mock/user-data"
import { FeedPreview } from "./FeedPreview"
import { Hero } from "./Hero"
import { HowItWorks } from "./HowItWorks"


export const Home = () => {
  return (
    <div className="space-y-20 mt-15">
    <Hero user={MOCK_USERS[8]}/>
    <HowItWorks/>
    <FeedPreview mock_users={MOCK_USERS}/>
    </div>
  )
}
