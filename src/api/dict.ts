import request from "@/axios/request";
import {SysDict, SysDictItem} from "@/types/dict";

export const getDictList = (): string => {
    return `/sys-dict/list`;
}


export const findDict = (id: number) => {
    return request({url: `/sys-dict/${id}`, method: "GET"})
}

export const saveDict = (data: SysDict) => {
    return request({url: `/sys-dict/save`, method: "POST", data})
}

export const editDict = (data: SysDict) => {
    return request({url: `/sys-dict/edit`, method: "PUT", data})
}

export const delDict = (id: number) => {
    return request({url: `/sys-dict/${id}`, method: "DELETE"})
}

export const getDictByKey = (key: string) => {
    return request({url: `/sys-dict/findByKey/${key}`, method: "GET"})
}

export const dictItemList = (id: number) => {
    return `/sys-dict-item/list/${id}`;
}

export const dictItemDelete = (id: number) => {
    return request({url: `/sys-dict-item/${id}`, method: "DELETE"});
}

export const dictItemInfo = (id: number) => {
    return request({url: `/sys-dict-item/${id}`, method: "GET"});
}

export const dictItemSave = (data: SysDictItem) => {
    return request({url: `/sys-dict-item/save`, method: "POST", data});
}

export const dictItemEdit = (data: SysDictItem) => {
    return request({url: `/sys-dict-item/edit`, method: "PUT", data});
}

