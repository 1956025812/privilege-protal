<template>
  <div>
    <div>
      <Card :bordered="false" title="角色信息">
        <Form :label-width="80">
          <Row>
            <Col span="10" style="float: left">
              <FormItem label="角色名称">
                <Input readonly v-model="roleName"/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="10" style="float: left">
              <FormItem label="所属系统">
                <Input readonly v-model="systemName"/>
              </FormItem>
            </Col>
            <Col span="10" style="float: right">
              <FormItem label="上级角色">
                <Input readonly v-model="parentRoleName"/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="10" style="float: left">
              <FormItem label="创建人">
                <Input readonly v-model="createName"/>
              </FormItem>
            </Col>
            <Col span="10" style="float: right">
              <FormItem label="创建时间">
                <Input readonly v-model="createTime"/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="10" style="float: left">
              <FormItem label="修改人">
                <Input readonly v-model="updateName"/>
              </FormItem>
            </Col>
            <Col span="10" style="float: right">
              <FormItem label="修改时间">
                <Input readonly v-model="updateTime"/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <FormItem label="描述">
              <Input
                type="textarea"
                :autosize="true"
                style="width: 100%"
                readonly
                v-model="description"
              />
            </FormItem>
          </Row>
        </Form>
      </Card>
    </div>
    <br>
    <div>
      <Card :bordered="false" title="菜单列表信息"></Card>
    </div>
  </div>
</template>



<script>
import { getToken } from "@/libs/util";
import { selectRoleDetailAPI } from "@/api/role/role";

export default {
  name: "RoleDetailModalPageComponent",
  data() {
    return {
      roleName: "",
      systemName: "",
      parentRoleName: "",
      createName: "",
      createTime: "",
      updateName: "",
      updateTime: "",
      description: ""
    };
  },

  methods: {
    selectRoleDetail() {
      var rid = this.$route.params.rid; 
      let params = new Object();
      params.loginUid = getToken();
      params.rid = rid;
      selectRoleDetailAPI(params).then(res => {
        if (res.data.code == 1) {
          this.roleName = res.data.data.roleName;
          this.systemName = res.data.data.systemName;
          this.parentRoleName = res.data.data.parentRoleName;
          this.createName = res.data.data.createName;
          this.createTime = res.data.data.createTime;
          this.updateName = res.data.data.updateName;
          this.updateTime = res.data.data.updateTime;
          this.description = res.data.data.description;
        } else if (res.data.code == 0) {
          this.$Notice.error({
            desc: res.data.msg
          });
        }
      });
    }
  },

  created() {
    this.$options.methods.selectRoleDetail.bind(this)();
  }
};
</script>
