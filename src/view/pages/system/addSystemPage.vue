<template>
  <div id="systemAddModalDiv" ref="SystemAddModalPage">
    <Button
      class="export-btn"
      style="border: none; appearance:none; margin-bottom: 5px;"
      @click="systemAddModal = true"
    >
      <Icon type="md-add" size="25"/>
    </Button>
    <Modal
      v-model="systemAddModal"
      title="新增系统"
      ok-text="保存"
      @on-ok="saveSystem"
      @on-cancel="cancel"
      :mask-closable="false"
      :closable="false"
    >
      <Row>
        <div>系统名称：
          <Input v-model="systemName" style="width: 70%"/>
        </div>
      </Row>
      <br>
      <Row>
        <div>系统标识：
          <Input v-model="systemKey" style="width: 70%"/>
        </div>
      </Row>
      <br>
      <Row>
        <div>系统描述：
          <Input v-model="description" type="textarea" :autosize="true" style="width: 70%" />
        </div>
      </Row>
    </Modal>
  </div>
</template>



<script>
import { getToken } from "@/libs/util";

export default {
  name: "SystemAddModalPage",
  data() {
    return {
      systemAddModal: false,
      systemName : "",
      systemKey: "",
      description: ""
    };
  },

  methods: {
    saveSystem() {
      this.$Message.info("Clicked ok");
    },
    cancel() {
      this.$Message.info("Clicked cancel");
    }
  },

  created() {}
};
</script>
