import { IUser, IUserDto } from "../interfaces/user.interface";
import { User } from "../models/user.module";


class UserRepository {
  public async getList(): Promise<IUser[]> {
    return await User.find();
  }

  public async create(dto: IUserDto): Promise<IUser> {
    return await User.create(dto)
  }

  public async getById(id: string): Promise<IUser | null> {
    return await User.findById(id)
  }
  public async update(id: string, updatedData: IUserDto): Promise<IUser | null> {
    return await User.findByIdAndUpdate(id, updatedData, { new: true })
  }

  public async delete(id: string): Promise<IUser | null> {
    return await User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  }

}

export const userRepository = new UserRepository();