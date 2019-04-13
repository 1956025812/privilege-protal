<template>
  <div class="demo-split">
    <Split v-model="leftRightSplit" min="280px">
      <div slot="left" class="demo-split-pane">
        <!-- 左：角色树列表组件 -->
        <RoleTreePageComponent
          ref="RoleTreePageComponentRef"
          v-on:transmitClickedTreeNode="transmitClickedTreeNode"
        ></RoleTreePageComponent>
      </div>

      <div slot="right" class="demo-split-pane">
        <!-- 右上：系统或角色详情组件 -->
        <div>
          <DetailSystemOrRolePageComponent></DetailSystemOrRolePageComponent>
        </div>

        <br>

        <!-- 右下: 子角色列表组件  -->
        <div></div>
      </div>
    </Split>
  </div>
</template>



<script>
import RoleTreePageComponent from "_p/role/roleTreePage";
import DetailSystemOrRolePageComponent from "_p/role/detailSystemOrRolePage";

export default {
  components: {
    RoleTreePageComponent,
    DetailSystemOrRolePageComponent
  },
  data() {
    return {
      leftRightSplit: 0.2
    };
  },

  methods: {
    // 角色树列表子组件点击传递过来的选中节点
    transmitClickedTreeNode(node) {
      alert(JSON.stringify(node));
    }
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