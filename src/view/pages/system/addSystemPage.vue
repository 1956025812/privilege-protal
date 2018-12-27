<template>
  <div id="systemAddModalDiv" ref="SystemAddModalPage">
    <Button type="primary" @click="modal1 = true">Display dialog box</Button>
    <Modal v-model="modal1" title="新增系统" @on-ok="saveSystem" @on-cancel="cancel">
      <p>Content of dialog</p>
      <p>Content of dialog</p>
      <p>Content of dialog</p>
    </Modal>
  </div>
</template>



<script>
import { getToken } from "@/libs/util";

export default {
  name: "SystemAddModalPage",
  data() {
    return {
      modal1: false
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
