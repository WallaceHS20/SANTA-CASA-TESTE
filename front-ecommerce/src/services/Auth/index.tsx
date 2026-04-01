import { ServiceApi } from "../../api";
import type { IAuthParams, IAuthResponse } from "../../Interfaces/Auth";
import { BaseService } from "../BaseService";

export class AuthService extends BaseService {
    static {
        this.setPrefix("/auth")
    }

    public static authLogin = async (data: IAuthParams) => {
        try {
            const response = await ServiceApi.post<IAuthResponse>(this.endpoint('/login'), data);
            
            return response.data
        } catch (error) {
            throw error
        }
    }
}