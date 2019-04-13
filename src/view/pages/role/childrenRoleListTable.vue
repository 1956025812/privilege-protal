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
  </div>
</template>



<script>
import { getToken } from "@/libs/util";

export default {
  name: "ChildrenRoleListTableComponent",
  components: {},
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
          key: "stateName",
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
                    click: () => {}
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
    }
  },

  created() {}
};
</script>











