import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../errors/api-error';
import { IUserCreateDto  } from '../interfaces/user.interface';
import { isObjectIdOrHexString } from "mongoose"

class CommonMiddleware {
    public isIdValid(key: string) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const id: string = req.params[key];
                if (!isObjectIdOrHexString(id)) {
                    throw new ApiError(`Invalid id [${key}]`, 400)
                }
                next();
            } catch (e) {
                next(e);
            }

        }
    }
    public validateUserData(req: Request, res: Response, next: NextFunction) {
        try {
            const dto: IUserCreateDto  = req.body;
            if (!dto.name || dto.name.length < 3) {
                throw new ApiError("Name is required and should be minimum 3 symbols", 400)
            }
            if (!dto.email || !dto.email.includes("@")) {
                throw new ApiError("Email is required ", 400)
            }
            if (!dto.password || dto.password.length < 8) {
                throw new ApiError("Password is required and should be minimum 8 symbols", 400)
            }
            req.body = dto;
            next();
        } catch (e) {
            next(e)
        }
    }


}

export const commonMiddleware = new CommonMiddleware();