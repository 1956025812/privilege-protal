import axios from '@/libs/api.request'

/**
 * 查询系统分页列表
 */
export const selectSystemPage = (params) => {
    return axios.request({
        url: '/system/page',
        method: 'get',
        params: params
    });
}