<template>
  <div id="oneLevelMenuTableDiv">
    <Card>
      <p slot="title">一级菜单列表</p>
      <Button slot="extra" type="primary">新增</Button>

      <!-- 一级菜单列表 -->
      <div>
        <Table id="id_table_oneLevelMenu" border :columns="columns" :data="oneLevelMenuTableData"></Table>
      </div>
    </Card>
  </div>
</template>



<script>
import { getToken } from "@/libs/util";
import { selectSysMenuListAPI, selectSysMenuDetailAPI } from "@/api/menu/menu";

export default {
  name: "OneLevelMenuTableComponent",
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
      oneLevelMenuTableData: []
    };
  },

  methods: {
    // 查询一级菜单列表
    queryOneLevelMenuList() {
      let params = new Object();
      params.loginUid = getToken();
      params.type = 1;
      params.systemKey = "system_goods";
      params.level = 1;
      selectSysMenuListAPI(params).then(res => {
        if (res.data.code == 1) {
          this.oneLevelMenuTableData = res.data.data;
        } else if (res.data.code == 0) {
          this.$Notice.error({
            desc: res.data.msg
          });
        }
      });
    }
  },

  created() {
    // 初始化一级菜单列表
    this.$options.methods.queryOneLevelMenuList.bind(this)();
  }
};
</script>











