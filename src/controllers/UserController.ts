import { Request, Response } from 'express';
import { UserRepository } from '../repositories/UserRepository';

const userRepository = new UserRepository();

export class UserController {

  async getUser(id : string) {
    try {
      const user = await userRepository.getUser(id);
      return user;
    } catch (error : any) {
      return null;
    }
  }

  async createUser(profile : any) {
    try {
      const user = await userRepository.createUser(profile);
      return user;
    } catch (error : any) {
      return null;
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await userRepository.deleteUser(id);
      res.status(204).json(user);
    } catch (error : any) {
      res.status(500).json({ message: error.message });
    }
  }
}