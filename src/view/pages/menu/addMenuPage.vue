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
      :mask-closable="false"
      :closable="false"
    >
      <Form label-position="right" :label-width="100">
        <FormItem label="系统名称：">
          <Input v-model="systemName" disabled/>
        </FormItem>
        <FormItem label="上级菜单名称：" v-show="menuLevel == 'oneDownLevel'">
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

export default {
  name: "MenuAddModalPageComponent",
  data() {
    return {
      menuAddModal: false,
      systemKey: "",
      menuLevel: "",
      parentMid: "",
      systemName: "",
      parentMenuName: "",
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
     * @augments menuLevel 菜单级别 oneLevel 一级菜单   oneDownLevel 二级及以下级
     * @augments parentMid 父菜单ID 当menuLevel值为oneDownLevel的时候需要传递该参数
     * @augments parentMenuName 父菜单名称 当menuLevel值为oneDownLevel的时候需要传递该参数
     */
    openMenuAddModal(
      systemKey,
      systemName,
      menuLevel,
      parentMid,
      parentMenuName
    ) {
      this.menuAddModal = true;
      this.systemKey = systemKey;
      this.systemName = systemName;
      this.menuLevel = menuLevel;
      this.parentMid = parentMid;
      this.parentMenuName = parentMenuName;
    }
  },

  created() {}
};
</script>











