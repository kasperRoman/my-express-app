
import { ApiError } from "../errors/api-error";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

interface CreateUserDto {
  name: string;
  phone: string;
  password: string;
}

class UserService {
    public async getList():Promise<IUser[]>{
        return await userRepository.getList();
    }
    public async create(dto: CreateUserDto): Promise<IUser> {
    // 🔍 Валідація
    if (!dto.name || dto.name.trim().length < 3) {
      throw new ApiError("Name is required and must be at least 3 characters", 400);
    }

    if (!dto.phone || dto.phone.trim().length < 10) {
      throw new ApiError("Phone number is required and must be at least 10 digits", 400);
    }

    if (!/^(\+?38)?0\d{9}$/.test(dto.phone)) {
      throw new ApiError("Phone number must be a valid Ukrainian format", 400);
    }

    if (!dto.password || dto.password.length < 8) {
      throw new ApiError("Password is required and must be at least 8 characters", 400);
    }

    // 🔍 Перевірка унікальності телефону
    const existingUsers = await userRepository.getList();
    const phoneExists = existingUsers.some(user => user.phone === dto.phone);
    if (phoneExists) {
      throw new ApiError("Phone number already exists", 409);
    }

    // ✅ Створення нового користувача
    const newUser: IUser = {
      id: existingUsers.length ? existingUsers[existingUsers.length - 1].id + 1 : 1,
      name: dto.name,
      phone: dto.phone,
      password: dto.password // Тут можна додати хешування
    };

    return await userRepository.create(newUser);
  }
}

export const userService = new UserService();
//     public async create(dto:CreateUserDto):Promise<IUser>{
//         return await userRepository.create(dto);
//     }
// }

// export const userService =new UserService();


