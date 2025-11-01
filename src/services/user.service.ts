import { ApiError } from "../errors/api-error";
import { IUser, IUserDto } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";



class UserService {
  public async getList(): Promise<IUser[]> {
    return await userRepository.getList();
  }

  public async create(dto: IUserDto): Promise<IUser> {
    return await userRepository.create(dto);
  }

  public async getById(id: string): Promise<IUser> {
    const user = await userRepository.getById(id);
    if (!user) {
      throw new ApiError("User not found", 404)
    }
    return user
  }

  public async update(id: string, updatedData: IUserDto): Promise<IUser> {
    const updatedUser = await userRepository.update(id, updatedData)
    if (!updatedUser) {
      throw new ApiError("User not found ,", 404)
    }
    return updatedUser

  }

  public async delete(id: string): Promise<IUser> {
    const deletedUser = await userRepository.delete(id);
    if (!deletedUser) {
      throw new ApiError("User not found", 404)
    }
    return deletedUser
  }

}

export const userService = new UserService();



