<template>
  <div class="demo-split">
    <Split v-model="initSplitRatio" min="300px">
      <div slot="left" class="demo-split-pane">
        <Tree :data="menuData" @on-select-change="queryMenuDetail"></Tree>
      </div>
      <div slot="right" class="demo-split-pane">
        <!-- 0 刚开始未点击左侧节点的时候显示为空 -->
        <div v-if="rightContent=='0'">请点击左侧树节点显示详细信息</div>

        <!-- 右侧上半部分 -->
        <div v-if="rightContent!='0'">
          <!-- 1 左侧点击系统时右侧上半部分显示系统信息 -->
          <div v-if="rightContent=='1'">
            <Card :bordered="false" title="系统信息">
              <Form :label-width="80">
                <Row>
                  <Col span="10" style="float: left">
                    <FormItem label="系统名称">
                      <Input readonly v-model="systemName"/>
                    </FormItem>
                  </Col>
                  <Col span="10" style="float: right">
                    <FormItem label="系统标识">
                      <Input readonly v-model="systemKey"/>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="10" style="float: left">
                    <FormItem label="创建人">
                      <Input readonly v-model="systemCreateName"/>
                    </FormItem>
                  </Col>
                  <Col span="10" style="float: right">
                    <FormItem label="创建时间">
                      <Input readonly v-model="systemCreateTime"/>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="10" style="float: left">
                    <FormItem label="修改人">
                      <Input readonly v-model="systemUpdateName"/>
                    </FormItem>
                  </Col>
                  <Col span="10" style="float: right">
                    <FormItem label="修改时间">
                      <Input readonly v-model="systemUpdateTime"/>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <FormItem label="描述">
                    <Input type="textarea" :autosize="true" style="width: 100%" readonly v-model="systemDescription"/>
                  </FormItem>
                </Row>
              </Form>
            </Card>
          </div>

          <!-- 2 左侧点击菜单时右侧上半部分显示菜单列表信息 -->
          <div v-if="rightContent=='2'">
            <Card :bordered="false" title="菜单信息">
              <Form :label-width="80">
                <Row>
                  <Col span="10" style="float: left">
                    <FormItem label="菜单名称">
                      <Input readonly/>
                    </FormItem>
                  </Col>
                  <Col span="10" style="float: right">
                    <FormItem label="系统链接">
                      <Input readonly/>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="10" style="float: left">
                    <FormItem label="所属系统">
                      <Input readonly/>
                    </FormItem>
                  </Col>
                  <Col span="10" style="float: right">
                    <FormItem label="上级菜单">
                      <Input readonly/>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="10" style="float: left">
                    <FormItem label="创建人">
                      <Input readonly/>
                    </FormItem>
                  </Col>
                  <Col span="10" style="float: right">
                    <FormItem label="创建时间">
                      <Input readonly/>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="10" style="float: left">
                    <FormItem label="修改人">
                      <Input readonly/>
                    </FormItem>
                  </Col>
                  <Col span="10" style="float: right">
                    <FormItem label="修改时间">
                      <Input readonly/>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <FormItem label="描述">
                    <Input type="textarea" :autosize="true" style="width: 100%" readonly/>
                  </FormItem>
                </Row>
              </Form>
            </Card>
          </div>
        </div>

        <!-- 右侧下半部分 -->
        <div v-if="rightContent!='0'"></div>
      </div>
    </Split>
  </div>
</template>
<script>
import { getToken } from "@/libs/util";
import { selectSysMenuListAPI } from "@/api/menu/menu";
import { selectSystemListAPI } from "@/api/system/system";
import { selectSystemDetailAPI } from "@/api/system/system";

export default {
  data() {
    return {
      initSplitRatio: 0.2,
      menuData: [],
      rightContent: 0,
      systemName: "",
      systemKey: "",
      systemCreateName: "",
      systemCreateTime: "",
      systemUpdateName: "",
      systemUpdateTime: "",
      systemDescription: ""
    };
  },

  methods: {
    // 查询菜单详情
    queryMenuDetail(nodes, node) {
      if (node.type == "system") {
        this.rightContent = 1;

        let params = new Object();
        params.loginUid = getToken();
        params.systemKey = node.systemKey;
        selectSystemDetailAPI(params).then(res => {
          if (res.data.code == 1) {
            this.systemName = res.data.data.systemName;
            this.systemKey = res.data.data.systemKey;
            this.systemCreateName = res.data.data.createName;
            this.systemCreateTime = res.data.data.createTime;
            this.systemUpdateName = res.data.data.updateName;
            this.systemUpdateTime = res.data.data.updateTime;
            this.systemDescription = res.data.data.description;  
          } else if (res.data.code == 0) {
            this.$Notice.error({
              desc: res.data.msg
            });
          }
        });
      } else if (node.type == "menu") {
        alert("菜单信息" + JSON.stringify(node));
        this.rightContent = 2;
      }
    }
  },

  created() {
    // 查询左侧系统列表
    let systemParams = new Object();
    selectSystemListAPI(systemParams).then(res => {
      if (res.data.code == 1) {
        let sysSystemVOList = res.data.data;

        // 拼接树状结构
        let treeData = new Array();
        if (null != sysSystemVOList && sysSystemVOList.length > 0) {
          sysSystemVOList.forEach(eachSysSystemVO => {
            let systemTreeNode = new Object();
            systemTreeNode.title = eachSysSystemVO.systemName;
            systemTreeNode.type = "system";
            systemTreeNode.systemKey = eachSysSystemVO.systemKey;
            systemTreeNode.children = [];

            // 拼接菜单
            let menuParams = new Object();
            menuParams.systemKey = eachSysSystemVO.systemKey;
            selectSysMenuListAPI(menuParams).then(res => {
              if (res.data.code == 1) {
                let sysMenuVOList = res.data.data;

                // TODO 拼接菜单  暂时只做俩级  待用递归完善多级
                if (null != sysMenuVOList && sysMenuVOList.length > 0) {
                  sysMenuVOList.forEach(eachFirstLevelSysMenuVO => {
                    if (
                      eachFirstLevelSysMenuVO.level == 1 &&
                      eachFirstLevelSysMenuVO.type == 1
                    ) {
                      let firstLevelMenu = new Object();
                      firstLevelMenu.title = eachFirstLevelSysMenuVO.menuName;
                      firstLevelMenu.mid = eachFirstLevelSysMenuVO.mid;
                      firstLevelMenu.type = "menu";
                      systemTreeNode.children.push(firstLevelMenu);

                      firstLevelMenu.children = [];
                      sysMenuVOList.forEach(eachSecondLevelSysMenuVO => {
                        if (
                          eachSecondLevelSysMenuVO.parentMid ==
                            eachFirstLevelSysMenuVO.mid &&
                          eachSecondLevelSysMenuVO.type == 1
                        ) {
                          let secondLevelMenu = new Object();
                          secondLevelMenu.title =
                            eachSecondLevelSysMenuVO.menuName;
                          secondLevelMenu.mid = eachSecondLevelSysMenuVO.mid;
                          secondLevelMenu.type = "menu";
                          firstLevelMenu.children.push(secondLevelMenu);
                        }
                      });
                    }
                  });
                }
              } else if (res.data.code == 0) {
                this.$Notice.error({
                  desc: res.data.msg
                });
              }
            });

            treeData.push(systemTreeNode);
            this.menuData = treeData;
          });
        }
      } else if (res.data.code == 0) {
        this.$Notice.error({
          desc: res.data.msg
        });
      }
    });
  }
};
</script>
<style>
.demo-split {
  height: 100%;
  border: 1px solid #dcdee2;
}
.demo-split-pane {
  padding: 10px;
}
</style>
