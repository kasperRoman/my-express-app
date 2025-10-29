import { ApiError } from "../errors/api-error";
import { CreateUserDto } from "../interfaces/createUserDto.interface";

export function validateCreateUser(dto: CreateUserDto) {
  // Ім'я
  if (!dto.name || dto.name.trim().length < 3) {
    throw new ApiError("Name is required and must be at least 3 characters", 400);
  }

  // Телефон
  if (!dto.phone || dto.phone.trim().length < 10) {
    throw new ApiError("Phone number is required and must be at least 10 digits", 400);
  }

  if (!/^(\+?38)?0\d{9}$/.test(dto.phone)) {
    throw new ApiError("Phone number must be a valid Ukrainian format", 400);
  }

  // Пароль
  if (!dto.password || dto.password.length < 8) {
    throw new ApiError("Password is required and must be at least 8 characters", 400);
  }
}