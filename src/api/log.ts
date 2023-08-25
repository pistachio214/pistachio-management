import request from "@/axios/request";

export const getOperLogList = () => {
    return '/developer-oper-log/list';
}

export const findOperLog = (id: number) => {
    return request({url: `/developer-oper-log/${id}`, method: 'GET'})
}

export const getExceptionLoginList = () => {
    return '/developer-exception-log/list'
}

export const findExceptionLog = (id: number) => {
    return request({url: `/developer-exception-log/${id}`, method: 'GET'})
}