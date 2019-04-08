import axios from '@/libs/api.request'

/**
 * @description 查询角色分页列表
 */
export const selectRolePageAPI = (params) => {
    return axios.request({
        url: '/role/page',
        method: 'get',
        params: params
    });
}


export const selectRoleListAPI = (params) => {
    return axios.request({
        url: '/role/list',
        method: 'get',
        params: params
    });
}

