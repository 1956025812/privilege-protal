<template>
  <div class="demo-split">
    <Split v-model="initSplitRatio" min="300px">
      <div slot="left" class="demo-split-pane">
        <Tree :data="menuData"></Tree>
      </div>
      <div slot="right" class="demo-split-pane"></div>
    </Split>
  </div>
</template>
<script>
import { selectSysMenuListAPI } from "@/api/menu/menu";

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
  },

  created() {

    // 查询左侧菜单列表
    let params = new Object();
    params.type = 1;
    selectSysMenuListAPI(params).then(res => {
      if (res.data.code == 1) {
        let sysMenuVOList = res.data.data;
        console.log(JSON.stringify(sysMenuVOList)); 
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
