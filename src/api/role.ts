import request from "@/axios/request";
import {RolesListParams, SysRole} from "@/types/role";

export const getRoleList = (): string => {
    return `/sys-role/list`;
}

export const getRoleAll = (params?: RolesListParams) => {
    return request({url: getRoleList(), method: "GET", params: params});
}

export const findRoleById = (id: number) => {
    return request({url: `/sys-role/info/${id}`, method: "GET"});
}

export const editRole = (body: SysRole) => {
    return request({url: `/sys-role/update`, method: "PUT", data: body});
}

export const createRole = (body: SysRole) => {
    return request({url: `/sys-role/save`, method: "POST", data: body});
}

export const deleteRole = (id: number) => {
    return request({url: `/sys-role/delete/${id}`, method: "DELETE"});
}

export const permRole = (roleId: number, menuIds: number[]) => {
    return request({url: `/sys-role/perm/${roleId}`, method: "POST", data: {menuIds: menuIds}});
}