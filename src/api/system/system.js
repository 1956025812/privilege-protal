import axios from '@/libs/api.request'

/**
 * 查询系统分页列表
 */
export const selectSystemPageAPI = (params) => {
    return axios.request({
        url: '/system/page',
        method: 'get',
        params: params
    });
}

/**
 * 新增系统
 */
export const saveSystemAPI = (params) => {
    alert(JSON.stringify(params));
    return axios.request({
        url: '/system/save',
        method: 'post',
        params: JSON.stringify(params)
    });
}
