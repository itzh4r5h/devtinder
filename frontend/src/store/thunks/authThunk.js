import { httpReq } from "@/api/httpReq";
import { asyncThunkHandler } from "../handlers";
import { setUser } from "../slices/userSlice";
import { setResendAvailableAt } from "../slices/authSlice";

// converts the backend's retryAfter (seconds) into a timestamp the countdown can use
const toAvailableAt = (retryAfterSecs) => Date.now() + Number(retryAfterSecs) * 1000

// on a 429 the backend sends a Retry-After header, store it so the countdown is right
const rememberCooldown = (error, dispatch) => {
  const retryAfter = error.response?.headers?.["retry-after"]
  if (error.response?.status === 429 && retryAfter) {
    dispatch(setResendAvailableAt(toAvailableAt(retryAfter)))
  }
}

// signup only sends the verification email, the user is logged in after verifying
export const signup = asyncThunkHandler('auth/signup', async (userInfo, dispatch) => {
  try {
    const res = await httpReq.post('/auth/signup', userInfo)
    const data = res.data
    return { message: data.message, data: { resendAvailableAt: toAvailableAt(data.retryAfter) } }
  } catch (error) {
    rememberCooldown(error, dispatch)
    throw error
  }
})

export const verifyEmail = asyncThunkHandler('auth/verify_email', async (token, dispatch) => {
  const res = await httpReq.post('/auth/verify-email', { token })
  const data = res.data
  dispatch(setUser(data.user))
  return { message: data.message, data: data.user }
})

export const resendVerification = asyncThunkHandler('auth/resend_verification', async (email, dispatch) => {
  try {
    const res = await httpReq.post('/auth/resend-verification', { email })
    const data = res.data
    return { message: data.message, data: { resendAvailableAt: toAvailableAt(data.retryAfter) } }
  } catch (error) {
    rememberCooldown(error, dispatch)
    throw error
  }
})

export const checkIsUserLoggedIn = asyncThunkHandler('auth/auth_check', async (_, dispatch) => {
  const res = await httpReq.get('/users/me')
  const user = res.data
  dispatch(setUser(user))
})

export const signin = asyncThunkHandler('auth/signin', async (userInfo, dispatch) => {
  const res = await httpReq.post('/auth/signin', userInfo)
  const data = res.data
  dispatch(setUser(data.user))
  return { message: data.message }
})

export const signout = asyncThunkHandler('auth/signout', async () => {
  const res = await httpReq.post('/auth/signout')
  const data = res.data
  return { message: data.message }
})
