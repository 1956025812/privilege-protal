<template>
  <div id="oneDownLevelMenuTableDiv">
    <Card>
      <p slot="title">子菜单或按钮列表</p>
      <Button slot="extra" type="primary">新增</Button>

      <!-- 子菜单列表或按钮列表 -->
      <div>
        <Table
          id="id_table_oneDownLevelMenu"
          border
          :columns="columns"
          :data="oneDownLevelMenuTableData"
        ></Table>
      </div>
    </Card>
  </div>
</template>



<script>
import { getToken } from "@/libs/util";
import { selectSysMenuListAPI, selectSysMenuDetailAPI } from "@/api/menu/menu";

export default {
  name: "OneDownLevelMenuTableComponent",
  data() {
    return {
      columns: [
        {
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "菜单名称",
          key: "menuName",
          align: "center"
        },
        {
          title: "类型",
          key: "type",
          align: "center",
          render: (h, params) => {
            let typeName = null;
            if (params.row.type == 1) {
              typeName = "菜单";
            } else if (params.row.type == 2) {
              typeName = "按钮";
            }
            return h("div", typeName);
          }
        },
        {
          title: "菜单链接",
          key: "url",
          align: "center"
        },
        {
          title: "排序",
          key: "sort",
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
      oneDownLevelMenuTableData: []
    };
  },

  methods: {
    // 查询子菜单列表或按钮列表
    queryOneDownLevelMenuList(parentMid) {
      let params = new Object();
      params.loginUid = getToken();
      params.parentMid = parentMid;
      selectSysMenuListAPI(params).then(res => {
        if (res.data.code == 1) {
          this.oneDownLevelMenuTableData = res.data.data;
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











