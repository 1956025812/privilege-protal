<template>
  <Tree :data="systemTreeData" @on-select-change="clickTreeNode"></Tree>
</template>
<script>
import { getToken } from "@/libs/util";
import { selectSystemListAPI } from "@/api/system/system";
import { selectRoleListAPI } from "@/api/role/role";

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
              this.systemTreeData.push(systemTreeNode);
            });
          }
        } else if (res.data.code == 0) {
          this.$Notice.error({
            desc: res.data.msg
          });
        }
      });
    },

    /**
     * 点击树节点
     */
    clickTreeNode(nodes, node) {
      let params = new Object();
      params.loginUid = getToken();
      if (node.type == "system") {
        params.systemKey = node.systemKey;
        params.level = 1;

        alert("调用角色详情组件查询点击节点的系统详情");
      } else if (node.type == "role") {
        alert("调用角色详情组件查询点击节点的角色详情");
      }

      // 查询角色列表并进行拼接
      selectRoleListAPI(params).then(res => {
        if (res.data.code == 1) {
          let roleList = res.data.data;
          alert("拼接下一级字列表");
          // 清空下级子角色列表并拼接
          node.children = [];
          if (roleList.length > 0) {
            roleList.forEach(eachRole => {
              let roleTreeNode = new Object();
              roleTreeNode.type = "role";
              roleTreeNode.expand = "false";
              roleTreeNode.rid = eachRole.rid;
              roleTreeNode.title = eachRole.roleName;
              roleTreeNode.systemKey = eachRole.systemKey;
              alert(JSON.stringify(node));
              node.children.push(roleTreeNode);
              alert(JSON.stringify(node));
            });
          }
        } else if (res.data.code == 0) {
          this.$Notice.error({
            desc: res.data.msg
          });
        }
      });

      alert("拼接下级角色列表并进行拼接");
    }
  },

  created() {
    // 初始化左侧系统树数据
    this.$options.methods.initSysSystemTreeData.bind(this)();
  }
};
</script>