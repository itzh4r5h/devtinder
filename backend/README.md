# DevTinder Backend

## API's List

### Auth - prefix (/api/v1/auth)
- POST /signup
- POST /signin
- POST /signout


### Users - prefix (/api/v1/auth)
- GET /me
- PATCH /edit


### Connections - prefix (/api/v1/connection)
- POST /req - for sending connection request
- GET /req - for viewing all the sent request which are in pending state i.e. not accepted or rejected yet
- POST /review - for accepting or rejecting receieved requests
- GET /review - for viewing received requests
- GET /view - for viewing all the connections
- GET /feed - for getting all users who are not connected to each other




### Chat - prefix (/api/v1/chat)
Only for logged in users with a completed profile and at least 1 connection. Chat works only between accepted connections.
- GET /conversations - all conversations with the other user, last message and unread count
- GET /:userId/messages?before=<messageId>&limit=30 - messages with a connection (oldest -> newest, use `nextCursor` as `before` for older ones)

#### Socket.IO events (same origin as the API, auth via the `token` cookie)
- emit `chat:send` `{ toUserId, text }` -> ack `{ success, message }`
- emit `chat:typing` `{ toUserId }`
- emit `chat:read` `{ userId }` -> ack `{ success, conversationId, readAt }`
- listen `chat:message`, `chat:typing` `{ userId }`, `chat:read` `{ conversationId, userId, readAt }`

#### Encryption
Messages are encrypted with AES-256-GCM before being stored. Each conversation has its own key derived (HKDF-SHA256) from `CHAT_ENCRYPTION_KEY`.
Generate the key with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` and add it to `.env` - the server won't start without it, and losing/changing it makes existing messages unreadable.



## 🚀 Tech Stack

![MongoDB](https://img.shields.io/badge/MongoDB-%2347A248.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Express](https://img.shields.io/badge/Express-%23000000.svg?style=for-the-badge&logo=express&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-%23339933.svg?style=for-the-badge&logo=node.js&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-%23000000.svg?style=for-the-badge&logo=jsonwebtokens&logoColor=white)