
import { ApiError } from "../errors/api-error";
import { CreateUserDto } from "../interfaces/createUserDto.interface";
import { UpdateUserDto } from "../interfaces/updateUserDto";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";
import { UserValidator } from "../validations/user.validation";




class UserService {
    public async getList():Promise<IUser[]>{
        return await userRepository.getList();
    }
    public async create(dto: CreateUserDto): Promise<IUser> {

     UserValidator.validateCreateDto(dto) 

    //  Перевірка унікальності телефону
    const existingUsers = await userRepository.getList();
    const phoneExists = existingUsers.some(user => user.phone === dto.phone);
    if (phoneExists) {
      throw new ApiError("Phone number already exists", 409);
    }

    //  Створення нового користувача
    const newUser: IUser = {
      id: existingUsers.length ? existingUsers[existingUsers.length - 1].id + 1 : 1,
      name: dto.name,
      phone: dto.phone,
      password: dto.password // Тут можна додати хешування
    };

    return await userRepository.create(newUser);
  }
  public async getById(id:number):Promise<IUser>{
    const user =await userRepository.getById(id);
    if(!user){
      throw new ApiError("User not found",404)
    }
    return user
  }
  public async delete (id:number):Promise<IUser>{
    const user =  await userRepository.delete(id);
    if (!user){
      throw new ApiError("User not found",404)
    }
    return user
  }
    public async update (id:number,updateData:UpdateUserDto):Promise<void>{
 
      UserValidator.validateUpdateDto(updateData)

     const users = await userRepository.getList();
     const index = users.findIndex(u=>u.id === id);
     if(index === -1){
      throw new ApiError("User not found",404)
     }
     const user =users[index];
         const updatedUser: IUser = {
      ...user,
      name: updateData.name ?? user.name,
      phone: updateData.phone ?? user.phone,
      password: updateData.password ?? user.password
    };
     await  userRepository.update(updatedUser)

    }

}

export const userService = new UserService();



