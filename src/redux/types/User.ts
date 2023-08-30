import { AuthorNavsType } from "@/types/common";

interface UserBaseInfo {
    nickname: string
    avatar: string
}

interface UserState {
    data: UserBaseInfo
    nav: UserNavsType[]
    authoritys: string[]
}

interface UserNavsType extends AuthorNavsType {
}

export type {
    UserBaseInfo,
    UserState,
    UserNavsType,
}