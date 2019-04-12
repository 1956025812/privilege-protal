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
              <FormItem label="系统标识">
                <Input readonly v-model="systemKey"/>
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

export default {
  name: "RoleDetailModalPageComponent",
  data() {
    return {
      roleName: "",
      systemKey: "",
      parentRoleName: "",
      createName: "",
      createTime: "",
      updateName: "",
      updateTime: "",
      description: ""
    };
  },

  methods: {},

  created() {}
};
</script>
