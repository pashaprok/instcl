import { DeleteResult, getRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity'
import { UserID } from '../types/user.types';

export const getAll = async (): Promise<User[]> => {
  const userRepository: Repository<User> = getRepository(User);
  return userRepository.find();
};

export const getById = async (id: UserID): Promise<User> => {
  const userRepository: Repository<User> = getRepository(User);
  const userFound: User = await userRepository.findOne({
    where: {
      id
    }
  })

  return userFound ? userFound : null;
};

export const getByEmail = async (email: string): Promise<User> => {
  const userRepository: Repository<User> = getRepository(User);
  return await userRepository.findOne({
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

export const updateUser = async (id: UserID, upd: Partial<User>): Promise<User> => {
  const userRepository: Repository<User> = getRepository(User);
  await userRepository.update(id, upd);
  return await getById(id);
}

export const deleteUser = async (id: UserID): Promise<DeleteResult> => {
  const userRepository: Repository<User> = getRepository(User);
  return await userRepository.delete(id);
};