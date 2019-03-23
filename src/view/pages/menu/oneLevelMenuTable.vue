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

    <!-- 菜单详情弹窗组件 -->
    <MenuDetailModalPageComponent ref="menuDetailModalRef" style="display:none"></MenuDetailModalPageComponent>
    <!-- 修改菜单弹窗子组件 -->
    <MenuEditModalPageComponent ref="menuEditModalRef" style="display:none"></MenuEditModalPageComponent>
  </div>
</template>



<script>
import { getToken } from "@/libs/util";
import { selectSysMenuListAPI, selectSysMenuDetailAPI } from "@/api/menu/menu";
import MenuDetailModalPageComponent from "_p/menu/detailMenuPage";
import MenuEditModalPageComponent from "_p/menu/editMenuPage";

export default {
  name: "OneLevelMenuTableComponent",
  components: {
    MenuDetailModalPageComponent,
    MenuEditModalPageComponent
  },
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
          key: "menuTypeName",
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
                    click: () => {
                      // 在父组件中通过ref调用子组件的方法
                      this.$refs.menuDetailModalRef.openMenuDetailModal(
                        params.row.mid
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
                      this.$refs.menuEditModalRef.openMenuEditModal(
                        params.row.mid
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
    queryOneLevelMenuList(systemKey) {
      let params = new Object();
      params.loginUid = getToken();
      params.type = 1;
      params.systemKey = systemKey;
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

  created() {}
};
</script>











