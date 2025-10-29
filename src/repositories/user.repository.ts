
import { CreateUserDto } from "../interfaces/createUserDto.interface";
import { IUser } from "../interfaces/user.interface";
import { read, write } from "../services/fs.service";

class UserRepository {
  public async getList(): Promise<IUser[]> {
    return await read();
  }

  public async create(dto: CreateUserDto): Promise<IUser> {
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

  public async getById(id: number): Promise<IUser | null> {
    const users = await read();
    const user = users.find(u => u.id === id);
    return user ?? null

  }

  public async delete(id: number): Promise<IUser | null> {
    const users = await read();
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return null;
    const [deletedUser] = users.splice(index, 1);
    await write(users);
    return deletedUser;

  }



}

export const userRepository = new UserRepository();