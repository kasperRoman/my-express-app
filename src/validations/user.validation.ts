import { ApiError } from "../errors/api-error";
import { CreateUserDto } from "../interfaces/createUserDto.interface";
import { UpdateUserDto } from "../interfaces/updateUserDto";


export class UserValidator {
  static validateCreateDto(dto: CreateUserDto): void {
    if (!dto.name || dto.name.trim().length < 3) {
      throw new ApiError("Name is required and must be at least 3 characters", 400);
    }

    if (!dto.phone || dto.phone.trim().length < 10) {
      throw new ApiError("Phone number is required and must be at least 10 digits", 400);
    }

    this.validatePhone(dto.phone);

    if (!dto.password || dto.password.length < 8) {
      throw new ApiError("Password is required and must be at least 8 characters", 400);
    }
  }

  static validateUpdateDto(dto: UpdateUserDto): void {
    if (dto.name && dto.name.trim().length < 3) {
      throw new ApiError("Name must be at least 3 characters", 400);
    }

    if (dto.phone) {
      if (dto.phone.trim().length < 10) {
        throw new ApiError("Phone number must be at least 10 digits", 400);
      }
      this.validatePhone(dto.phone);
    }

    if (dto.password && dto.password.length < 8) {
      throw new ApiError("Password must be at least 8 characters", 400);
    }
  }

  private static validatePhone(phone: string): void {
    const pattern = /^(\+?38)?0\d{9}$/;
    if (!pattern.test(phone)) {
      throw new ApiError("Phone number must be a valid Ukrainian format", 400);
    }
  }
}