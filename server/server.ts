import * as express from 'express'
// import * as path from 'path'
import * as cors from 'cors'
import { userRouter } from './routes/user.routes'

const app = express()
const PORT = process.env.PORT || 3001

// express middleware, used to be bodyparser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

//   COME BACK AND ChaNGE THIS TO MATCH VUE
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/dist/test-project/browser')))
// }

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/dist/test-project/browser/index.html'))
// })

app.use('/api/', userRouter)

app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT http://localhost:${PORT} !`)
)
