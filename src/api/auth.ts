import request from "@/axios/request";
import { LoginParams } from "@/types/auth"

export const getCaptcha = () => {
    return request({
        url: '/sys-auth/getCaptcha',
        method: "GET"
    });
}

export const login = (data: LoginParams) => {
    return request({
        url: `/sys-auth/admin/doLogin`,
        method: "POST",
        data: data
    });
}