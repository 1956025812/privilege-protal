import axios from '@/libs/api.request'

/**
 * 查询系统分页列表
 * @param {*} currentPage 
 * @param {*} pageSize 
 * @param {*} systemName 
 * @param {*} systemKey 
 */
export const selectSystemPage = (currentPage, pageSize, systemName, systemKey) => {
    return axios.request({
        url: '/system/page',
        method: 'get',
        params: {
            currentPage,
            pageSize,
            systemName,
            systemKey
        }
    });
}