import request from "@/axios/request";
import {SysDict, SysDictItem} from "@/types/dict";

export const getDictList = (): string => {
    return `/developer-dict/list`;
}


export const findDict = (id: number) => {
    return request({url: `/developer-dict/${id}`, method: "GET"})
}

export const saveDict = (data: SysDict) => {
    return request({url: `/developer-dict/save`, method: "POST", data})
}

export const editDict = (data: SysDict) => {
    return request({url: `/developer-dict/edit`, method: "PUT", data})
}

export const delDict = (id: number) => {
    return request({url: `/developer-dict/${id}`, method: "DELETE"})
}

export const getDictByKey = (key: string) => {
    return request({url: `/developer-dict/findByKey/${key}`, method: "GET"})
}

export const dictItemList = (id: number) => {
    return `/developer-dict-item/list/${id}`;
}

export const dictItemDelete = (id: number) => {
    return request({url: `/developer-dict-item/${id}`, method: "DELETE"});
}

export const dictItemInfo = (id: number) => {
    return request({url: `/developer-dict-item/${id}`, method: "GET"});
}

export const dictItemSave = (data: SysDictItem) => {
    return request({url: `/developer-dict-item/save`, method: "POST", data});
}

export const dictItemEdit = (data: SysDictItem) => {
    return request({url: `/developer-dict-item/edit`, method: "PUT", data});
}

