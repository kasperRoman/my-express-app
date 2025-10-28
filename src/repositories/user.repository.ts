
import { IUser } from "../interfaces/user.interface";
import { read, write } from "../services/fs.service";
interface CreateUserDto {
  name: string;
  phone: string;
  password: string;
}

class UserRepository {
    public async getList():Promise<IUser[]>{
        return await read();
    }
    public async create(dto:CreateUserDto):Promise<IUser>{
           const users = await read();
    const newUser = {
      id: users.length ? users[users.length - 1].id + 1 : 1,
      name: dto.name,
      phone: dto.phone,
      password: dto.password
    };
    users.push(newUser);
    await write(users)
    return newUser
    }
}

export const userRepository = new UserRepository();