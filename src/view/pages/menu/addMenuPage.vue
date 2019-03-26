<template>
  <div id="menuAddModalDiv">
    <Button
      class="export-btn"
      style="border: none; appearance:none; margin-bottom: 5px;"
      @click="openMenuAddModal"
    >
      <Icon type="md-Add" size="25"/>
    </Button>
    <Modal
      v-model="menuAddModal"
      title="新增菜单"
      ok-text="保存"
      @on-ok="saveMenu"
      :mask-closable="false"
      :closable="false"
    >
      <Form label-position="right" :label-width="100">
        <FormItem label="系统名称：">
          <Input v-model="systemName" disabled/>
        </FormItem>
        <FormItem label="上级菜单名称：" v-show="parentMenuLevel > 0">
          <Input v-model="parentMenuName" disabled/>
        </FormItem>
        <FormItem label="菜单名称：">
          <Input v-model="menuName"/>
        </FormItem>
        <FormItem label="菜单类型：">
          <Select v-model="menuType" placeholder="请选择菜单类型" clearable>
            <Option value="1">菜单</Option>
            <Option value="2">按钮</Option>
          </Select>
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
import { saveMenuAPI } from "@/api/menu/menu";

export default {
  name: "MenuAddModalPageComponent",
  data() {
    return {
      menuAddModal: false,
      systemKey: "",
      systemName: "",
      parentMid: "",
      parentMenuName: "",
      parentMenuLevel: "",
      menuName: "",
      menuType: "",
      menuUrl: "",
      sort: "",
      description: ""
    };
  },

  methods: {
    /**
     * @description 打开新增菜单弹窗
     * @augments systemKey 系统标识
     * @augments systemName 系统名称
     * @augments parentMid 父菜单ID 当menuLevel值为oneDownLevel的时候需要传递该参数
     * @augments parentMenuName 父菜单名称 当menuLevel值大于0的时候需要传递该参数
     * @augments parentMenuLevel 父菜单级别 1,2,3,4 一级二级三级四级以此类推
     */
    openMenuAddModal(
      systemKey,
      systemName,
      parentMid,
      parentMenuName,
      parentMenuLevel
    ) {
      this.menuAddModal = true;
      this.systemKey = systemKey;
      this.systemName = systemName;
      this.parentMid = parentMid;
      this.parentMenuName = parentMenuName;
      this.parentMenuLevel = parentMenuLevel;
    },

    // 新增菜单
    saveMenu() {
      let params = new Object();
      params.loginUid = getToken();
      params.systemKey = this.systemKey;
      params.menuName = this.menuName;
      params.type = this.menuType;
      if (this.parentMenuLevel > 0) {
        params.parentMid = this.parentMid;
      }
      params.url = this.menuUrl;
      params.sort = this.sort;
      params.systemKey = this.systemKey;
      params.description = this.description;
      params.level = parseInt(this.parentMenuLevel) + 1;

      saveMenuAPI(params).then(res => {
        if (res.data.code == 1) {
          this.$Notice.success({
            desc: res.data.msg
          });
          // 刷新左侧树列表 TODO

          // 刷新子菜单列表
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











