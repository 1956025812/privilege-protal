<template>
  <Tree :data="systemTreeData"></Tree>
</template>
<script>
import { getToken } from "@/libs/util";
import { selectSystemListAPI } from "@/api/system/system";

export default {
  name: "RoleTreePageComponent",
  data() {
    return {
      systemTreeData: []
    };
  },

  methods: {
    /**
     * 初始化系统树数据
     */
    initSysSystemTreeData() {
      let systemParams = new Object();
      systemParams.loginUid = getToken();
      selectSystemListAPI(systemParams).then(res => {
        if (res.data.code == 1) {
          // 拼接系统树结构
          let sysSystemVOList = res.data.data;
          if (null != sysSystemVOList && sysSystemVOList.length > 0) {
            sysSystemVOList.forEach(eachSysSystemVO => {
              let systemTreeNode = new Object();
              systemTreeNode.type = "system";
              systemTreeNode.expand = "false";
              systemTreeNode.title = eachSysSystemVO.systemName;
              systemTreeNode.systemKey = eachSysSystemVO.systemKey;
              systemTreeNode.systemName = eachSysSystemVO.systemName;
              systemTreeNode.children = [];
              this.systemTreeData.push(systemTreeNode);
            });
          }
        } else if (res.data.code == 0) {
          this.$Notice.error({
            desc: res.data.msg
          });
        }
      });
    }
  },

  created() {
    // 初始化左侧系统树数据
    this.$options.methods.initSysSystemTreeData.bind(this)();
  }
};
</script>