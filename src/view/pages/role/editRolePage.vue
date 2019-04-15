<template>
  <div>
    <Button
      class="export-btn"
      style="border: none; appearance:none; margin-bottom: 5px;"
      @click="openRoleEditModal"
    >
      <Icon type="md-Edit" size="25"/>
    </Button>
    <Modal
      v-model="roleEditModal"
      title="修改角色详情"
      ok-text="保存"
      @on-ok="editrole"
      :mask-closable="false"
      :closable="false"
    >
      <Input v-model="hidden_sid" style="display:none"/>
      <Form label-position="right" :label-width="100">
        <FormItem label="角色名称：">
          <Input v-model="roleName"/>
        </FormItem>
        <FormItem label="角色描述：">
          <Input v-model="description" type="textarea" :autosize="{minRows: 2,maxRows: 5}"/>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>


 
<script>
import { getToken } from "@/libs/util";
import { selectRoleDetailAPI, editRoleAPI } from "@/api/role/role";

export default {
  name: "RoleEditModalPageComponent",
  data() {
    return {
      roleEditModal: false,
      roleName: "",
      description: ""
    };
  },

  methods: {
    openRoleEditModal(rid) {
      this.roleEditModal = true;

      let params = new Object();
      params.loginUid = getToken();
      params.rid = rid;

      selectRoleDetailAPI(params).then(res => {
        if (res.data.code == 1) {
          this.roleName = res.data.data.roleName;
          this.description = res.data.data.description;
        } else if (res.data.code == 0) {
          this.$Notice.error({
            desc: res.data.msg
          });
        }
      });
    },

    editRole() {
      let params = new Object();
      params.loginUid = getToken();
      params.sid = this.hidden_sid;
      params.roleName = this.roleName;
      params.description = this.description;

      editRoleAPI(params).then(res => {
        if (res.data.code == 1) {
          this.$Notice.success({
            desc: res.data.msg
          });
          // 通过自定义事件调用父窗口的重置按钮刷新分页列表
          this.$emit("parentReset");
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











