import 'dotenv/config'
import express from 'express'
import { clerkClient, requireAuth, getAuth } from '@clerk/express'
import path from 'node:path'

// const __dirname = import.meta.dirname;

const app = express()
const PORT = 8080

// app.use(clerkMiddleware())

app.use(express.static('static'));

  // app.get('/', async(req, res) => {
  //   res.send("foo")
  // })

app.get('/protected', requireAuth(), async (req, res) => {
  // Use `getAuth()` to get the user's `userId`
  const auth = getAuth(req)

  if(auth.userId === null) {
    throw new Error('Boo')
  }

  // Use Clerk's JavaScript Backend SDK to get the user's User object
  const user = await clerkClient.users.getUser(auth.userId)

  return res.json({ user })
})

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
