<template>
  <div>
    <!-- 查询条件 -->
    <Card :bordered="false" title="角色列表">
      <Row>
        <div style="display: inline; margin-left:50px;">
          所属系统：
          <Select v-model="systemKey" style="width:200px">
            <Option
              v-for="eachSystem in systemList"
              :value="eachSystem.systemKey"
              :key="eachSystem.systemKey"
            >{{ eachSystem.systemName }}</Option>
          </Select>
        </div>
        <div style="display: inline; margin-left:50px;">
          上级角色：
          <Select
            v-model="parentRid"
            filterable
            clearable
            remote
            :remote-method="selectRoleList"
            :loading="false"
            style="width: 200px"
          >
            <Option
              v-for="(eachRole, index) in roleList"
              :value="eachRole.rid"
              :key="index"
            >{{eachRole.roleName}}</Option>
          </Select>
        </div>
        <div style="display: inline; margin-left:50px;">
          角色名称：
          <Input v-model="roleName" style="width: 200px"/>
        </div>

        <div style="display: inline;  margin-left:50px;">
          状态：
          <Select v-model="roleState" placeholder="全部" clearable style="width: 120px">
            <Option value="1">启用</Option>
            <Option value="2">禁用</Option>
          </Select>
        </div>
      </Row>
      <br>
      <Row>
        <div style="display: inline;  margin-left:50px;">
          创建时间：
          <DatePicker
            v-model="createTimeRange"
            type="datetimerange"
            style="width: 300px"
            format="yyyy-MM-dd HH:mm:ss"
            @on-change="createTimeRange=$event"
          ></DatePicker>
        </div>
        <div style="display: inline; margin-left:50px;">
          <Button class="search-btn" @click="query()" type="primary">
            <Icon type="search"/>查询
          </Button>
          <Button class="reset-btn" @click="reset" type="primary" style="margin-left:10px;">
            <Icon type="search"/>重置
          </Button>
        </div>
      </Row>
    </Card>
    <br>

    <!-- 操作按钮 -->

    <br>

    <!-- 表格 -->
    <div>
      <Table
        border
        :columns="columns"
        :data="roleTableData"
        @on-select="selectRow"
        @on-select-cancel="cancelSelectRow"
      ></Table>
    </div>
    <br>

    <!-- 分页 -->
    <div style="float: right;">
      <Page
        :total="totalCount"
        :current="currentPage"
        :page-size="pageSize"
        show-total
        show-elevator
        show-sizer
        @on-change="changePage"
        @on-page-size-change="changePageSize"
      ></Page>
    </div>
  </div>
</template>


  

<script>
import { getToken, removeArrayElement } from "@/libs/util";
import { selectRolePageAPI, selectRoleListAPI } from "@/api/role/role";
import { selectSystemListAPI } from "@/api/system/system";

export default {
  data() {
    return {
      systemKey: "",
      roleName: "",
      roleState: "",
      parentRid: "",
      createTimeRange: "",
      totalCount: 0,
      currentPage: 1,
      pageSize: 10,
      selectRowSids: [],
      systemList: [],
      roleList: [],

      columns: [
        {
          type: "selection",
          key: "rid",
          width: 50,
          align: "center"
        },
        {
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "角色名称",
          key: "roleName",
          align: "center"
        },
        {
          title: "所属系统",
          key: "systemName",
          align: "center"
        },
        {
          title: "上级角色",
          key: "parentRoleName",
          align: "center"
        },
        {
          title: "状态",
          key: "roleStateName",
          align: "center"
        },
        {
          title: "创建人",
          key: "createName",
          align: "center"
        },
        {
          title: "创建时间",
          key: "createTime",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.toRoleDetailPage(params.row);
                    }
                  }
                },
                "详情"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {}
                  }
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  on: {
                    click: () => {}
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      roleTableData: []
    };
  },

  methods: {
    /**
     * 查询分页函数
     */
    queryRolePage(currentPage, pageSize) {
      let params = new Object();
      params.currentPage = currentPage;
      params.pageSize = pageSize;
      params.loginUid = getToken();
      params.systemKey = this.systemKey;
      params.parentRid = this.parentRid;
      params.roleName = this.roleName;
      params.state = this.roleState;
      if (this.createTimeRange != null && this.createTimeRange != "") {
        params.startTime = this.createTimeRange.toString().split(",")[0];
        params.endTime = this.createTimeRange.toString().split(",")[1];
      }

      selectRolePageAPI(params).then(res => {
        if (res.data.code == 1) {
          this.totalCount = res.data.data.totalCount;
          this.currentPage = res.data.data.currentPage;
          this.pageSize = res.data.data.pageSize;
          this.roleTableData = res.data.data.items;
        } else if (res.data.code == 0) {
          this.$Notice.error({
            desc: res.data.msg
          });
        }
      });
    },

    /**
     * 换页
     */
    changePage(currentPage) {
      this.$options.methods.queryRolePage.bind(this)(
        currentPage,
        this.pageSize
      );
    },

    /**
     * 更换每页显示数据量
     */
    changePageSize(pageSize) {
      this.$options.methods.queryRolePage.bind(this)(1, pageSize);
    },

    /**
     * 选中复选框
     */
    selectRow(selection, row) {
      if (this.selectRowSids.indexOf(row.sid) == -1) {
        this.selectRowSids.push(row.sid);
      }
    },

    /**
     * 取消选中复选框
     */
    cancelSelectRow(selection, row) {
      removeArrayElement(this.selectRowSids, row.sid);
    },

    /**
     * 查询按钮查询
     */
    query() {
      this.selectRowSids = [];
      this.$options.methods.queryRolePage.bind(this)(1, 10);
    },

    /**
     * 重置查询条件
     */
    reset() {
      this.systemKey = "";
      this.parentRid = "";
      this.roleName = "";
      this.roleState = "";
      this.createTimeRange = "";
      this.selectRowSids = [];
      this.$options.methods.queryRolePage.bind(this)(1, 10);
    },

    /**
     * 查询系统列表
     */
    selectSystemList() {
      let params = new Object();
      params.loginUid = getToken();
      selectSystemListAPI(params).then(res => {
        if (res.data.code == 1) {
          this.systemList = res.data.data;
        } else if (res.data.code == 0) {
          this.$Notice.error({
            desc: res.data.msg
          });
        }
      });
    },

    /**
     * 查询所有的角色列表
     */
    selectRoleList(roleName) {
      let params = new Object();
      params.loginUid = getToken();
      params.roleName = roleName;

      selectRoleListAPI(params).then(res => {
        if (res.data.code == 1) {
          this.roleList = res.data.data;
        } else if (res.data.code == 0) {
          this.$Notice.error({
            desc: res.data.msg
          });
        }
      });
    },

    /**
     * 跳转到角色详情页面
     */
    toRoleDetailPage(row) {
      this.$router.push({
        name: "roledetailpage",
        params: {
          rid: row.rid
        }
      });
    }
  },

  /**
   * 初始化页面 页面加载的时候执行
   */
  created() {
    // 加载系统列表
    this.$options.methods.selectSystemList.bind(this)();

    // 加载第一页数据
    this.$options.methods.queryRolePage.bind(this)(
      this.currentPage,
      this.pageSize
    );
  }
};
</script>
