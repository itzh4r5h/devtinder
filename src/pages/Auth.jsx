import { useLocation } from "react-router"


export const Auth = () => {
  const location = useLocation()


  return (
    <div>
      <h1 className="text-5xl">{location.pathname.replace("/","")}</h1>
    </div>
  )
}
