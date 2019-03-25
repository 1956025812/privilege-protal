<template>
  <div id="oneLevelMenuTableDiv">
    <Card>
      <p slot="title">一级菜单列表</p>
      <Button slot="extra" type="primary" @click="openAddMenuModal(systemKey, systemName)">新增</Button>

      <!-- 一级菜单列表 -->
      <div>
        <Table id="id_table_oneLevelMenu" border :columns="columns" :data="oneLevelMenuTableData"></Table>
      </div>
    </Card>

    <!-- 菜单详情弹窗组件 -->
    <MenuDetailModalPageComponent ref="menuDetailModalRef" style="display:none"></MenuDetailModalPageComponent>
    <!-- 新增菜单弹窗子组件 -->
    <MenuAddModalPageComponent ref="menuAddModalRef" style="display:none"></MenuAddModalPageComponent>
    <!-- 修改菜单弹窗子组件 -->
    <MenuEditModalPageComponent ref="menuEditModalRef" style="display:none"></MenuEditModalPageComponent>
  </div>
</template>



<script>
import { getToken } from "@/libs/util";
import { selectSysMenuListAPI, selectSysMenuDetailAPI } from "@/api/menu/menu";
import MenuDetailModalPageComponent from "_p/menu/detailMenuPage";
import MenuAddModalPageComponent from "_p/menu/addMenuPage";
import MenuEditModalPageComponent from "_p/menu/editMenuPage";

export default {
  name: "OneLevelMenuTableComponent",
  components: {
    MenuDetailModalPageComponent,
    MenuAddModalPageComponent,
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
      oneLevelMenuTableData: [],
      systemKey: ""
    };
  },

  methods: {
    // 查询一级菜单列表
    queryOneLevelMenuList(systemKey, systemName) {
      // 向新增菜单方法传参
      this.systemKey = systemKey;
      this.systemName = systemName;

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
    },

    // 开启新增菜单弹窗
    openAddMenuModal(systemKey, systemName) {
      this.$refs.menuAddModalRef.openMenuAddModal(
        systemKey,
        systemName,
        null,
        null,
        "0" // 系统节点的parentMenuLevel是0
      );
    }
  },

  created() {}
};
</script>











