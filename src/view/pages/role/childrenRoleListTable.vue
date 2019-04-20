<template>
  <div>
    <div v-if="show">
      <Card>
        <p slot="title">子角色列表</p>
        <Button slot="extra" type="primary" @click="openAddRoleModal()">新增</Button>

        <!-- 子角色列表 -->
        <div>
          <Table border :columns="columns" :data="childrenRoleListTableData"></Table>
        </div>
      </Card>
    </div>

    <!-- 角色详情弹窗组件 -->
    <RoleDetailModalPageComponent ref="RoleDetailModalPageComponentRef" style="display: none"></RoleDetailModalPageComponent>
    <!-- 修改角色详情弹窗组件 -->
    <RoleEditModalPageComponent ref="RoleEditModalPageComponentRef" style="display: none"></RoleEditModalPageComponent>
  </div>
</template>



<script>
import { getToken } from "@/libs/util";
import { selectRolePageAPI, delRoleAPI } from "@/api/role/role";
import RoleDetailModalPageComponent from "_p/role/detailRolePage";
import RoleEditModalPageComponent from "_p/role/editRolePage";

export default {
  name: "ChildrenRoleListTableComponent",
  components: {
    RoleDetailModalPageComponent,
    RoleEditModalPageComponent
  },
  data() {
    return {
      show: false,
      node: Object,
      columns: [
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
          title: "父角色名称",
          key: "parentRoleName",
          align: "center"
        },
        {
          title: "角色级别",
          key: "level",
          align: "center"
        },
        {
          title: "状态",
          key: "roleStateName",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 300,
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
                      // 在父组件中通过ref调用子组件的方法
                      this.$refs.RoleDetailModalPageComponentRef.openRoleDetailModal(
                        params.row.rid
                      );
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
                    click: () => {
                      // 在父组件中通过ref调用子组件的方法
                      this.node.source = "childrenRoleListTablePage";
                      this.node.row = params.row;
                      this.$refs.RoleEditModalPageComponentRef.openRoleEditModal(
                        this.node
                      );
                    }
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
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {}
                  }
                },
                "分配权限"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.openDelRoleSingleModal(params.row);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      childrenRoleListTableData: []
    };
  },

  methods: {
    /**
     * 查询子角色列表
     */
    selectChildrenRoleList(node) {
      this.show = true;
      this.node = node;

      let params = new Object();
      params.loginUid = getToken();
      params.currentPage = 1;
      params.pageSize = 20;
      params.systemKey = node.systemKey;
      if (node.type == "system") {
        params.level = 1;
      } else if (node.type == "role") {
        params.parentRid = node.rid;
      }
      selectRolePageAPI(params).then(res => {
        if (res.data.code == 1) {
          this.childrenRoleListTableData = res.data.data.items;
        } else if (res.data.code == 0) {
          this.$Notice.error({
            desc: res.data.msg
          });
        }
      });
    },

    /**
     * 删除单条角色
     */
    openDelRoleSingleModal(row) {
      this.$Modal.confirm({
        title: "删除角色",
        content: "确认要批量删除菜单[" + row.roleName + "]么？",
        onOk: () => {
          let params = new Object();
          params.loginUid = getToken();
          params.rid = row.rid;
          delRoleAPI(params).then(res => {
            if (res.data.code == 1) {
              this.$Notice.success({
                desc: res.data.msg
              });
              // TODO 刷新列表
              alert("刷新子角色列表TODO");

              alert("刷新左侧树列表TODO");
            } else if (res.data.code == 0) {
              this.$Notice.error({
                desc: res.data.msg
              });
            }
          });
        }
      });
    },


    /**
     * 打开新增子角色Modal弹窗
     */
    openAddRoleModal() {
      alert("新增角色TODO" + JSON.stringify(this.node)); 
    }
  },

  created() {}
};
</script>











