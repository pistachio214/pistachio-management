import request from "@/axios/request";
import { UserCreateRequest } from "@/types/user";

export const getUserList = (): string => {
    return `/sys-user/list`;
}

export const permRole = (userId: number, roleIds: string[]) => {
    return request({url: `/sys-user/role/${userId}`, method: "POST", data: {roleIds}});
}

export const restPassword = (id: number) => {
    return request({url: `/sys-user/repass`, method: "POST", data: id});
}

export const createUser = (data: UserCreateRequest) => {
    return request({url: `/sys-user/save`, method: "POST", data: data});
}

export const delUser = (id: number) => {
    return request({url: `/sys-user/delete/${id}`, method: "DELETE"});
}

export const saveUserAvatar = (avatar: string) => {
    return request({url: `/sys-user/saveAvatar`, method: "POST", data: {avatar: avatar}});
}