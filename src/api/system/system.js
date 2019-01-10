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
    return axios.request({
        url: '/system/save',
        method: 'post',
        data: JSON.stringify(params),
        headers: { 'Content-Type': 'application/json' }
    });
}


/**
 * 查询系统详情   
 */
export const selectSystemDetailAPI = (params) => {
    return axios.request({
        url: '/system/detail',
        method: 'get',
        params: params
    });
}



/**
 * 修改系统
 */
export const editSystemAPI = (params) => {
    return axios.request({
        url: '/system/update',
        method: 'post',
        data: JSON.stringify(params),
        headers: { 'Content-Type': 'application/json' }
    });
}


