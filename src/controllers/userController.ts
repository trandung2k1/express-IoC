/* eslint-disable @typescript-eslint/typedef */
import { Request, Response } from 'express'
import { UserService } from '../services/userService'
import { User } from '@/models/userModel'

export class UserController {
  constructor(private userService: UserService) {}

  createUser(req: Request, res: Response): void {
    const newUser: User = req.body
    const createdUser = this.userService.createUser(newUser)
    res.status(201).json(createdUser)
  }

  getUser(req: Request, res: Response): void {
    const userId = parseInt(req.params.id, 10)
    const user = this.userService.getUserById(userId)

    if (user) {
      res.json(user)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  }

  getAllUsers(req: Request, res: Response): void {
    const allUsers = this.userService.getAllUsers()
    res.json(allUsers)
  }
}
