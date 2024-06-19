import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
type User = Prisma.UserGetPayload<null>;

export class UserRepository {
  async getUser(id: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique(
        { 
          where: { 
            id 
          },
          include: {
            cities: true,
          }
        });
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async createUser(data: User): Promise<User | null> {
    try {
      const user = await prisma.user.create({ data });
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await prisma.user.delete({ where: { id } });
    } catch (error) {
      console.log(error);
    }
  }
}