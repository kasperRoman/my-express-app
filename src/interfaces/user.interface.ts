export interface IUser {
  _id: string;
  name: string;
  email: string;
  age: Number;
  password: string
  role: string;
  phone?: string;
  isDeleted: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type IUserDto = Pick<IUser, "name" | "email" | "password">;