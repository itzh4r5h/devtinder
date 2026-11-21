import { clearMessage } from "@/store/slices/reqStatusSlice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"

export const useShowMessage = () => {
  const dispatch = useDispatch()
  const { message, isError } = useSelector((state) => state.req_status)

  useEffect(() => {
    if (message) {
      if (isError) {
        toast.error(message)
      } else {
        toast.success(message)
      }

      dispatch(clearMessage())
    }
  }, [message, isError, dispatch])
}
