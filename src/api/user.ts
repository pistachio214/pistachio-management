import request from "@/axios/request";
import { UserCreateRequest, UserInfoEditRequest } from "@/types/user";

export const getUserList = (): string => {
    return `/sys-user/list`;
}

export const permRole = (userId: number, roleIds: string[]) => {
    return request({url: `/sys-user/role/${userId}`, method: "POST", data: {roleIds}});
}

export const restPassword = (id: number) => {
    return request({url: `/sys-user/repass`, method: "POST", data: {userId: id}});
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

export const currentUser = () => {
    return request({url: `/sys-user/info`, method: "GET"});
}

export const currentUserSave = (data: UserInfoEditRequest) => {
    return request({url: `/sys-user/info/save`, method: "POST", data: data})
}