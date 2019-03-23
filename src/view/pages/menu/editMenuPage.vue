<template>
  <div id="menuEditModalDiv">
    <Button
      class="export-btn"
      style="border: none; appearance:none; margin-bottom: 5px;"
      @click="openMenuEditModal"
    >
      <Icon type="md-Edit" size="25"/>
    </Button>
    <Modal
      v-model="menuEditModal"
      title="修改菜单"
      ok-text="保存"
      @on-ok="editMenu"
      :mask-closable="false"
      :closable="false"
    >
      <Input v-model="hidden_mid" style="display:none"/>
      <Form label-position="right" :label-width="100">
        <FormItem label="菜单名称：">
          <Input v-model="menuName"/>
        </FormItem>
        <FormItem label="菜单类型：">
          <Input v-model="menuTypeName" disabled/>
        </FormItem>
        <FormItem label="菜单链接：">
          <Input v-model="menuUrl"/>
        </FormItem>
        <FormItem label="排序：">
          <Input v-model="sort"/>
        </FormItem>
        <FormItem label="菜单描述：">
          <Input v-model="description" type="textarea" :autosize="{minRows: 2,maxRows: 5}"/>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>



<script>
import { getToken } from "@/libs/util";
import { selectSysMenuDetailAPI, editMenuAPI } from "@/api/menu/menu";

export default {
  name: "MenuEditModalPageComponent",
  data() {
    return {
      menuEditModal: false,
      hidden_mid: "",
      menuName: "",
      menuTypeName: "",
      menuUrl: "",
      sort: "",
      description: ""
    };
  },

  methods: {
    openMenuEditModal(mid) {
      this.menuEditModal = true;
      this.hidden_mid = mid;

      let params = new Object();
      params.loginUid = getToken();
      params.mid = mid;
      selectSysMenuDetailAPI(params).then(res => {
        if (res.data.code == 1) {
          this.menuName = res.data.data.menuName;
          this.menuTypeName = res.data.data.menuTypeName;
          this.menuUrl = res.data.data.url;
          this.sort = res.data.data.sort;
          this.description = res.data.data.description;
        } else if (res.data.code == 0) {
          this.$Notice.error({
            desc: res.data.msg
          });
        }
      });
    },

    editMenu() {
      let params = new Object();
      params.loginUid = getToken();
      params.mid = this.hidden_mid;
      params.menuName = this.menuName;
      params.url = this.menuUrl;
      params.sort = this.sort;
      params.description = this.description;

      editMenuAPI(params).then(res => {
        if (res.data.code == 1) {
          this.$Notice.success({
            desc: res.data.msg
          });
          // 回调修改菜单信息
          this.$parent.menuName = this.menuName;
          this.$parent.menuUrl = this.menuUrl;
          this.$parent.menuDetailSort = this.sort;
          this.$parent.menuDetailDescription = this.description;
          // 回调修改左侧的选中的树节点的信息 TODO
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











