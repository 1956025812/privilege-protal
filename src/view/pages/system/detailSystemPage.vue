<template>
  <div id="systemDetailModalDiv">
    <Button
      class="export-btn"
      style="border: none; appearance:none; margin-bottom: 5px;"
      @click="openSystemDetailModal"
    >
      <Icon type="md-Detail" size="25"/>
    </Button>
    <Modal
      v-model="systemDetailModal"
      title="系统详情"
      footer-hide="false"
    >
      <Input v-model="hidden_sid" style="display:none" />
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
          <Input v-model="description" type="textarea" :autosize="true" style="width: 70%"/>
        </div>
      </Row>
    </Modal>
  </div>
</template>



<script>
import { getToken } from "@/libs/util";
import { selectSystemDetailAPI } from "@/api/system/system";

export default {
  name: "SystemDetailModalPageComponent",
  data() {
    return {
      systemDetailModal: false,
      systemName: "",
      systemKey: "",
      description: ""
    };
  },

  methods: {
    openSystemDetailModal(sid) {
      this.systemDetailModal = true;

      let params = new Object();
      params.loginUid = getToken();
      params.sid = sid;

      selectSystemDetailAPI(params).then(res => {
        if(res.data.code == 1) {
            this.hidden_sid = res.data.data.sid;
            this.systemName = res.data.data.systemName;
            this.systemKey = res.data.data.systemKey;
            this.description = res.data.data.description;
        } else if(res.data.code == 0) {
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
