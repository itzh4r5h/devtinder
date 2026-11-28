// limits shared with the backend chat contract
export const MAX_MESSAGE_LENGTH = 2000
export const MESSAGES_PAGE_SIZE = 30
// how long "typing..." stays without a new chat:typing event
export const TYPING_TIMEOUT_MS = 3000
// min gap between two chat:typing emits
export const TYPING_THROTTLE_MS = 2000
// messages from the same sender closer than this are grouped together
const GROUP_GAP_MS = 5 * 60 * 1000

const DAY_MS = 24 * 60 * 60 * 1000

const startOfDay = (date) => {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d.getTime()
}

export const isSameDay = (a, b) => startOfDay(a) === startOfDay(b)

// "14:05"
export const formatTime = (date) =>
  new Date(date).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })

// time shown in the conversation list: today -> time, yesterday, this week -> weekday, else date
export const formatListTime = (date) => {
  const diffDays = Math.round((startOfDay(Date.now()) - startOfDay(date)) / DAY_MS)
  if (diffDays === 0) return formatTime(date)
  if (diffDays === 1) return "yesterday"
  if (diffDays < 7) return new Date(date).toLocaleDateString("en-GB", { weekday: "short" })
  return new Date(date).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "2-digit" })
}

// label for the date separator inside a thread
export const formatDayLabel = (date) => {
  const diffDays = Math.round((startOfDay(Date.now()) - startOfDay(date)) / DAY_MS)
  if (diffDays === 0) return "today"
  if (diffDays === 1) return "yesterday"
  return new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
}

// turns a flat, oldest-first message list into render rows:
// a day separator before each new day, and messages grouped by sender
export const buildThreadRows = (messages) => {
  const rows = []
  let group = null

  messages.forEach((message, index) => {
    const prev = messages[index - 1]

    if (!prev || !isSameDay(prev.createdAt, message.createdAt)) {
      rows.push({ type: "day", key: `day-${message.createdAt}`, date: message.createdAt })
      group = null
    }

    const continuesGroup =
      group &&
      prev.sender === message.sender &&
      new Date(message.createdAt) - new Date(prev.createdAt) < GROUP_GAP_MS

    if (continuesGroup) {
      group.messages.push(message)
    } else {
      group = { type: "group", key: `group-${message._id}`, sender: message.sender, messages: [message] }
      rows.push(group)
    }
  })

  return rows
}

// "john doe" -> "jd"
export const getInitials = (name = "") => (name.match(/\b\w/g) || []).join("").slice(0, 2)
