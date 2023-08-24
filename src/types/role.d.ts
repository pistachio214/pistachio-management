interface SysRole {
    id: number
    name: string
    menuIds: number[]
    code: string
    createdAt: string
    remark: string
    status: number
    updatedAt: string
}

interface RolesListParams {
    current?: number
    username?: string
    size?: number
    status?: number
}

export type {
    SysRole,
    RolesListParams,
}