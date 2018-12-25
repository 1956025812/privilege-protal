<template>

    <div id="sysuserPageDiv">

        <!-- 查询条件 -->
        <Card :bordered="false" title="系统列表">
            <Row>
                <div class="div-supplieid" style="display: inline;" >
                    系统名称：<Input style="width: 200px" v-model="systemName"/>
                </div>
                <div class="div-supplieid" style="display: inline;  margin-left:50px;" >
                    系统标识：<Input style="width: 200px" v-model="systemKey"/>
                </div>
                <div class="div-supplieid" style="display: inline; margin-left:50px;">
                    <Button class="search-btn" @click="querySystemPage" type="primary" ><Icon type="search"/>查询</Button>
                    <Button class="search-btn"  type="primary" style="margin-left:10px;"><Icon type="add"/>新增</Button>
                    <Button class="reset-btn" @click="reset" type="primary" style="margin-left:10px;" ><Icon type="search"/>重置</Button>
                </div>
            </Row>
        </Card>
        <br>

        <!-- 操作按钮 -->
        <div>
            <Tooltip placement="top" content="导出">
                <Button class="export-btn" style="border: none; appearance:none; margin-bottom: 5px;"><Icon type="md-download" size='25'/></Button>
            </Tooltip>
            <Tooltip placement="top" content="刷新">
                <Button class="update-btn" style="border: none; margin-bottom: 5px;"><Icon type="md-sync" size='25'/></Button>
            </Tooltip>
            <Tooltip placement="top" content="列">
                <Button class="colums-btn" style="border: none; margin-bottom: 5px;"><Icon type="ios-list-box" size='25'/></Button>
            </Tooltip>      
        </div>
        <br>

        <!-- 表格 -->
        <div>
            <Table id="id_table_system" border :columns="columns" :data="systemTableData"></Table>
        </div>
        <br>
        
        <!-- 分页 -->
        <div style="float: right;">
            <Page :total="totalCount" :current="currentPage" :page-size="pageSize" show-total show-elevator show-sizer 
                @on-change="changePage" @on-page-size-change="changePageSize"></Page>
        </div>

    </div>

</template>



<script>

    import { setToken, getToken } from '@/libs/util'
    import { selectSystemPage } from '@/api/system/system'

    export default {

        data () {
            return {

                // 初始化变量
                systemName: '',
                systemKey: '',
                totalCount: 0,
                currentPage: 1,
                pageSize: 10,

                columns: [
                    {
                        type: 'selection',
                        key: 'uid',
                        width: 50,
                        align: 'center'
                    },
                    {
                        type: 'index',
                        width: 80,
                        align: 'center'
                    },
                    {
                        title: '系统名称',
                        key: 'systemName'
                    },
                    {
                        title: '系统标识',
                        key: 'systemKey'
                    },
                    {
                        title: '创建人',
                        key: 'createName'
                    },
                    {
                        title: '创建时间',
                        key: 'createTime'
                    }
                ],
                systemTableData: [],
            }
        },

        methods: {

            // 重置查询条件
            reset() {
                // 必须再次单独声明下this,不能直接使用this
                let vm = this;  
                vm.systemName = '';
                vm.systemKey = '';
            },


            // 查询系统分页列表
            querySystemPage() {

                let vm = this;  
                let currentPage = vm.currentPage;
                let pageSize = vm.pageSize;   
                let loginUid = getToken(); 
                let systemName = vm.systemName; 
                let systemKey = vm.systemKey;
                let params = {currentPage:currentPage, pageSize:pageSize, loginUid:loginUid, systemName:systemName, systemKey:systemKey}; 

                selectSystemPage(params).then(res => {
                    if(res.data.code == 1) {
                        vm.totalCount = res.data.data.totalCount; 
                        vm.currentPage = res.data.data.currentPage;
                        vm.pageSize = res.data.data.pageSize; 
                        vm.systemTableData = res.data.data.items;  
                    }else if(res.data.code == 0) {
                        vm.$Notice.error({
                            desc: res.data.msg
                        });
                    }
                });
            },



            // 换页 index为当前页码
            changePage (index) {
                
                let vm = this;  
                let currentPage = index;
                let pageSize = vm.pageSize;   
                let loginUid = getToken(); 
                let systemName = vm.systemName; 
                let systemKey = vm.systemKey;
                let params = {currentPage:currentPage, pageSize:pageSize, loginUid:loginUid, systemName:systemName, systemKey:systemKey}; 

                selectSystemPage(params).then(res => {
                    if(res.data.code == 1) {
                        vm.totalCount = res.data.data.totalCount; 
                        vm.currentPage = res.data.data.currentPage;
                        vm.pageSize = res.data.data.pageSize; 
                        vm.systemTableData = res.data.data.items;  
                    }else if(res.data.code == 0) {
                        vm.$Notice.error({
                            desc: res.data.msg
                        });
                    }
                });
            },


            // 更换每页显示数据量
            changePageSize (size) {

                let vm = this;  
                let currentPage = vm.currentPage;
                let pageSize = size;   
                let loginUid = getToken(); 
                let systemName = vm.systemName; 
                let systemKey = vm.systemKey;
                let params = {currentPage:currentPage, pageSize:pageSize, loginUid:loginUid, systemName:systemName, systemKey:systemKey}; 

                selectSystemPage(params).then(res => {
                    if(res.data.code == 1) {
                        vm.totalCount = res.data.data.totalCount; 
                        vm.currentPage = res.data.data.currentPage;
                        vm.pageSize = res.data.data.pageSize; 
                        vm.systemTableData = res.data.data.items;  
                    }else if(res.data.code == 0) {
                        vm.$Notice.error({
                            desc: res.data.msg
                        });
                    }
                });

            }

        },


        // 初始化页面 页面加载的时候执行 
        created(){
            
            // 初始化表格 
            let vm = this;  
            let currentPage = vm.currentPage;
            let pageSize = vm.pageSize;   
            let loginUid = getToken(); 
            let systemName = vm.systemName; 
            let systemKey = vm.systemKey;
            let params = {currentPage:currentPage, pageSize:pageSize, loginUid:loginUid, systemName:systemName, systemKey:systemKey}; 

            selectSystemPage(params).then(res => {
                if(res.data.code == 1) {
                    vm.totalCount = res.data.data.totalCount; 
                    vm.currentPage = res.data.data.currentPage;
                    vm.pageSize = res.data.data.pageSize; 
                    vm.systemTableData = res.data.data.items;  
                }else if(res.data.code == 0) {
                    vm.$Notice.error({
                        desc: res.data.msg
                    });
                }
            });
        }
    }
 

    

</script>
