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
      await prisma.city.create({
        data: {
          name: 'London',
          country: 'United Kingdom',
          lat: 51.5074,
          lon: 0.1278,
          userId: user.id
        }
      });
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await prisma.city.deleteMany({ where: { userId: id } });
      await prisma.user.delete({ where: { id } });
    } catch (error) {
      console.log(error);
    }
  }

  async updateUserUnit(id: string, unit: string): Promise<User | null> {
    try {
      const user = await prisma.user.update({
        where: { id },
        data: {
          unit
        }
      });
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getUserUnit(id: string): Promise<string | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
        select: {
          unit: true
        }
      });
      if(user) {
        return user.unit;
      } else return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}