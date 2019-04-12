<template>
  <div class="demo-split">
    <Split v-model="leftRightSplit" min="280px">
      <div slot="left" class="demo-split-pane">
        <!-- 左：角色树列表组件 -->
        <RoleTreePageComponent></RoleTreePageComponent>
      </div>

      <div slot="right" class="demo-split-pane">
        <!-- 右上：角色详情组件 -->
        <div></div>

        <br>

        <!-- 右下: 子角色列表组件  -->
        <div></div>
      </div>
    </Split>
  </div>
</template>



<script>
import RoleTreePageComponent from "_p/role/roleTreePage";

export default {
  components: {
    RoleTreePageComponent
  },
  data() {
    return {
      leftRightSplit: 0.2
    };
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