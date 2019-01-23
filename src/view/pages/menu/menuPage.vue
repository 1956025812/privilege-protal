<template>
  <div class="demo-split">
    <Split v-model="initSplitRatio" min="300px">
      <div slot="left" class="demo-split-pane">
        <Tree :data="menuData"></Tree>
      </div>
      <div slot="right" class="demo-split-pane">
        
      </div>
    </Split>
  </div>
</template>
<script>
export default {
  data() {
    return {
      initSplitRatio: 0.2,
      split4: 0.5,
      menuData: [
        {
          title: "商品系统",
          expand: false,
          children: [
            {
              title: "商品管理",
              expand: false,
              children: [
                {
                  title: "商品列表"
                }
              ]
            },
            {
              title: "分类管理",
              expand: false,
              children: [
                {
                  title: "分类列表"
                }
              ]
            }
          ]
        },
        {
          title: "订单系统",
          expand: false,
          children: [
            {
              title: "订单管理",
              expand: false,
              children: [
                {
                  title: "订单列表"
                }
              ]
            }
          ]
        }
      ]
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
