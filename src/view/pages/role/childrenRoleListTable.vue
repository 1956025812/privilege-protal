<template>
  <div>
    <div v-if="show">
      <Card>
        <p slot="title">子角色列表</p>
        <Button slot="extra" type="primary">新增</Button>

        <!-- 子角色列表 -->
        <div>
          <Table border :columns="columns" :data="childrenRoleListTableData"></Table>
        </div>
      </Card>
    </div>

    <!-- 角色详情弹窗 -->
    <RoleDetailModalPageComponent ref="RoleDetailModalPageComponentRef" style="display: none"></RoleDetailModalPageComponent>
  </div>
</template>



<script>
import { getToken } from "@/libs/util";
import { selectRolePageAPI } from "@/api/role/role";
import RoleDetailModalPageComponent from "_p/role/detailRolePage";

export default {
  name: "ChildrenRoleListTableComponent",
  components: {
    RoleDetailModalPageComponent
  },
  data() {
    return {
      show: false,
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
                    click: () => {}
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

      let params = new Object();
      params.loginUid = getToken();
      params.currentPage = 1;
      params.pageSize = 20;
      params.systemKey = node.systemKey;
      if (node.type == "role") {
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
    }
  },

  created() {}
};
</script>











