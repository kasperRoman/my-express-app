import { ApiError } from "../errors/api-error";
import { IUser, IUserCreateDto, IUserUpdateDto  } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";



class UserService {
  public async getList(): Promise<IUser[]> {
    return await userRepository.getList();
  }

  public async create(dto: IUserCreateDto ): Promise<IUser> {
    await this.isEmailUnique(dto.email);
    return await userRepository.create(dto);
  }

  public async getById(id: string): Promise<IUser> {
    const user = await userRepository.getById(id);
    if (!user) {
      throw new ApiError("User not found", 404)
    }
    return user
  }

  public async update(id: string, updatedData: IUserUpdateDto): Promise<IUser> {
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

  private async isEmailUnique(email:string):Promise<void>{
    const user = await userRepository.getByEmail(email);
    if(user){
      throw new ApiError("Email is already in use",409)
    }
  }



}

export const userService = new UserService();



