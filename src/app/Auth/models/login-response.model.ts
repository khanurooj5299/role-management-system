import { UserModel } from "../../Shared/models/user.model";

export interface LoginResponseModel {
    user: UserModel,
    token: string
}