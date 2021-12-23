import { getRepository, Repository } from 'typeorm'
import { User } from '../entities/user.entity'

export const getAll = async (): Promise<User[]> => {
  const userRepository: Repository<User> = getRepository(User);
  return userRepository.find();
};

export const getById = async (id: number): Promise<User> => {
  const userRepository: Repository<User> = getRepository(User);
  return await userRepository.findOneOrFail({
    where: {
      id
    }
  })
};

export const getByEmail = async (email: string): Promise<User> => {
  const userRepository: Repository<User> = getRepository(User);
  return await userRepository.findOneOrFail({
    where: {
      email
    },
  });
};

export const createUser = async (payload: Partial<User>): Promise<User> => {
  const userRepository: Repository<User> = getRepository(User);
  const user: User = new User();
  return userRepository.save({
    ...user,
    ...payload,
  });
};