<template>
  <div class="demo-split">
    <Split v-model="initSplitRatio" min="300px">
      <div slot="left" class="demo-split-pane">
        <Tree :data="menuData" @on-select-change="queryMenuDetail"></Tree>
      </div>
      <div slot="right" class="demo-split-pane"></div>
    </Split>
  </div>
</template>
<script>
import { selectSysMenuListAPI } from "@/api/menu/menu";
import { selectSystemListAPI } from "@/api/system/system";

export default {
  data() {
    return {
      initSplitRatio: 0.2,
      split4: 0.5,
      menuData: []
    };
  },

  methods: {
    // 查询菜单详情
    queryMenuDetail() {
      alert("TODO 点击菜单右侧展示详情");
    }
  },

  created() {
    // 查询左侧系统列表
    let systemParams = new Object();
    selectSystemListAPI(systemParams).then(res => {
      if (res.data.code == 1) {
        let sysSystemVOList = res.data.data;

        // 拼接树状结构
        let treeData = new Array();
        if (null != sysSystemVOList && sysSystemVOList.length > 0) {
          sysSystemVOList.forEach(eachSysSystemVO => {
            let systemTreeNode = new Object();
            systemTreeNode.title = eachSysSystemVO.systemName;
            systemTreeNode.children = [];

            // 拼接菜单
            let menuParams = new Object();
            menuParams.systemKey = eachSysSystemVO.systemKey;
            selectSysMenuListAPI(menuParams).then(res => {
              if (res.data.code == 1) {
                let sysMenuVOList = res.data.data;

                // TODO 拼接菜单  暂时只做俩级  待用递归完善多级
                if (null != sysMenuVOList && sysMenuVOList.length > 0) {
                  sysMenuVOList.forEach(eachFirstLevelSysMenuVO => {
                    if (eachFirstLevelSysMenuVO.level == 1 && eachFirstLevelSysMenuVO.type == 1) {
                      let firstLevelMenu = new Object();
                      firstLevelMenu.title = eachFirstLevelSysMenuVO.menuName;
                      firstLevelMenu.mid = eachFirstLevelSysMenuVO.mid; 
                      firstLevelMenu.render = function(h, {root, node, data}) {
                        return h("span", data.title); 
                      },
                      systemTreeNode.children.push(firstLevelMenu);

                      firstLevelMenu.children = [];
                      sysMenuVOList.forEach(eachSecondLevelSysMenuVO => {
                          
                          if(eachSecondLevelSysMenuVO.parentMid == eachFirstLevelSysMenuVO.mid && eachSecondLevelSysMenuVO.type == 1) {
                            let secondLevelMenu = new Object();
                            secondLevelMenu.title = eachSecondLevelSysMenuVO.menuName;
                            secondLevelMenu.mid = eachSecondLevelSysMenuVO.mid; 
                            secondLevelMenu.render = function(h, {root, node, data}) {
                              return h("span", data.title);
                            },
                            firstLevelMenu.children.push(secondLevelMenu);
                          }
                      });
                    }
                  });
                }
              } else if (res.data.code == 0) {
                this.$Notice.error({
                  desc: res.data.msg
                });
              }
            });

            treeData.push(systemTreeNode);
            this.menuData = treeData;
          });
        }
      } else if (res.data.code == 0) {
        this.$Notice.error({
          desc: res.data.msg
        });
      }
    });
  }
};
</script>
<style>
.demo-split {
  height: 100%;
  border: 1px solid #dcdee2;
}
.demo-split-pane {
  padding: 10px;
}
</style>
