<template>
  <div>
    <Button
      class="export-btn"
      style="border: none; appearance:none; margin-bottom: 5px;"
      @click="openMenuDetailModal"
    >
      <Icon type="md-Detail" size="25"/>
    </Button>
    <Modal v-model="menuDetailModal" title="菜单详情" :footer-hide="true">
      <Input v-model="hidden_mid" style="display:none"/>
      <Form label-position="right" :label-width="100">
        <FormItem label="菜单名称：">
          <Input v-model="menuName" readonly/>
        </FormItem>
        <FormItem label="菜单链接：">
          <Input v-model="menuUrl" readonly/>
        </FormItem>
        <FormItem label="所属系统：">
          <Input v-model="systemName" readonly/>
        </FormItem>
        <FormItem label="上级菜单：">
          <Input v-model="parentMenuName" readonly/>
        </FormItem>
        <FormItem label="排序：">
          <Input v-model="menuSort" readonly/>
        </FormItem>
        <FormItem label="菜单描述：">
          <Input
            v-model="description"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            readonly
          />
        </FormItem>
        <FormItem label="创建人：">
          <Input v-model="createName" readonly/>
        </FormItem>
        <FormItem label="创建时间：">
          <Input v-model="createTime" readonly/>
        </FormItem>
        <FormItem label="修改人：">
          <Input v-model="updateName" readonly/>
        </FormItem>
        <FormItem label="修改时间：">
          <Input v-model="updateTime" readonly/>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>



<script>
import { getToken } from "@/libs/util";
import { selectSysMenuDetailAPI } from "@/api/menu/menu";

export default {
  name: "MenuDetailModalPageComponent",
  data() {
    return {
      menuDetailModal: false,
      hidden_mid: "",
      menuName: "",
      menuUrl: "",
      systemName: "",
      parentMenuName: "",
      menuSort: "",
      description: "",
      createName: "",
      createTime: "",
      updateName: "",
      updateTime: ""
    };
  },

  methods: {
    openMenuDetailModal(mid) {
      this.menuDetailModal = true;

      let params = new Object();
      params.loginUid = getToken();
      params.mid = mid;

      selectSysMenuDetailAPI(params).then(res => {
        if (res.data.code == 1) {
          this.hidden_mid = res.data.data.mid;
          this.menuName = res.data.data.menuName;
          this.menuUrl = res.data.data.url;
          this.systemName = res.data.data.systemName;
          this.parentMenuName = res.data.data.parentMenuName;
          this.menuSort = res.data.data.sort;
          this.description = res.data.data.description;
          this.createName = res.data.data.createName;
          this.createTime = res.data.data.createTime;
          this.updateName = res.data.data.updateName;
          this.updateTime = res.data.data.updateTime;
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
