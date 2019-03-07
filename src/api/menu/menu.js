import axios from '@/libs/api.request'

/**
 * @description 查询菜单列表
 */
export const selectSysMenuListAPI = (params) => {
    return axios.request({
        url: '/menu/list',
        method: 'get',
        params: params
    });
}


/**
 * @description 查询菜单详情
 */
export const selectSysMenuDetailAPI = (params) => {
    return axios.request({
        url: '/menu/detail',
        method: 'get',
        params: params
    });
}