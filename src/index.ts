import express, { Application, Request, Response } from 'express'
import colors from 'colors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import container from './containers/container'
import { UserController } from './controllers/userController'
const app: Application = express()
const port: number = parseInt(process.env.PORT) || 4000
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens['remote-addr'](req, res),
      tokens['remote-user'](req, res),
      tokens['http-version'](req, res),
      tokens['user-agent'](req, res),
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      '-',
      tokens['total-time'](req, res),
      'ms',
    ].join(' ')
  }),
)
// eslint-disable-next-line @typescript-eslint/typedef
const userController = container.resolve<UserController>('userController')
app.post('/api/users', userController.createUser.bind(userController))
app.get('/api/users/:id', userController.getUser.bind(userController))
app.get('/api/users', userController.getAllUsers.bind(userController))

app.get('/', (req: Request, res: Response) => {
  return res.status(200).json({ message: 'Welcome to the server' })
})
app.listen(port, () => {
  console.log(colors.green(`Server listening on http://localhost:${port}`))
})
