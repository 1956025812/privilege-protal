<template>
  <div class="demo-split">
    <Split v-model="initSplitRatio" min="300px">
      <div slot="left" class="demo-split-pane">
        <Tree :data="menuData" :load-data="queryMenu"></Tree>
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
    queryMenu() {
      alert("TODO 异步加载方式处理点击系统节点的时候展开菜单子节点");
    }
  },

  created() {
    // 查询左侧菜单列表
    let params = new Object();
    params.type = 1;
    selectSystemListAPI(params).then(res => {
      if (res.data.code == 1) {
        let sysSystemVOList = res.data.data;

        // 拼接树状结构
        let treeData = new Array();
        if (null != sysSystemVOList && sysSystemVOList.length > 0) {
          sysSystemVOList.forEach(eachSysSystemVO => {
            let systemTreeNode = new Object();
            systemTreeNode.title = eachSysSystemVO.systemName;
            systemTreeNode.loading = false;
            systemTreeNode.children = [];
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
