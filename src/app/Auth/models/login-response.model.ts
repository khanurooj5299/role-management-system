import { User } from "../../Shared/models/user.model";

export interface LoginResponseModel {
    user: User,
    token: string
}