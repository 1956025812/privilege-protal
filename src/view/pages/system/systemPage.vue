<template>
  <div id="systemPageDiv">
    <!-- 查询条件 -->
    <Card :bordered="false" title="系统列表">
      <Row>
        <div style="display: inline;">系统名称：
          <Input v-model="systemName" style="width: 200px"/>
        </div>
        <div style="display: inline;  margin-left:50px;">系统标识：
          <Input v-model="systemKey" style="width: 200px"/>
        </div>
        <div style="display: inline;  margin-left:50px;">创建时间：
          <DatePicker
            v-model="createTimeRange"
            type="datetimerange"
            style="width: 300px"
            format="yyyy-MM-dd HH:mm:ss"
            @on-change="createTimeRange=$event"
          ></DatePicker>
        </div>
        <div style="display: inline; margin-left:50px;">
          <Button class="search-btn" @click="querySystemPage(1,10)" type="primary">
            <Icon type="search"/>查询
          </Button>
          <Button class="reset-btn" @click="reset" type="primary" style="margin-left:10px;">
            <Icon type="search"/>重置
          </Button>
        </div>
      </Row>
    </Card>
    <br>

    <!-- 操作按钮 -->
    <div>
      <Tooltip placement="top" content="新增">
        <system-add-modal-page @parentReset="reset"></system-add-modal-page>
      </Tooltip>
      <Tooltip placement="top" content="删除">
        <Button class="export-btn" style="border: none; appearance:none; margin-bottom: 5px;">
          <Icon type="md-close" size="25"/>
        </Button>
      </Tooltip>
      <Tooltip placement="top" content="导入">
        <Button class="export-btn" style="border: none; appearance:none; margin-bottom: 5px;">
          <Icon type="md-arrow-round-forward" size="25"/>
        </Button>
      </Tooltip>
      <Tooltip placement="top" content="导出">
        <Button class="export-btn" style="border: none; appearance:none; margin-bottom: 5px;">
          <Icon type="md-download" size="25"/>
        </Button>
      </Tooltip>
      <Tooltip placement="top" content="刷新">
        <Button class="update-btn" style="border: none; margin-bottom: 5px;">
          <Icon type="md-sync" size="25"/>
        </Button>
      </Tooltip>
      <Tooltip placement="top" content="列">
        <Button class="colums-btn" style="border: none; margin-bottom: 5px;">
          <Icon type="ios-list-box" size="25"/>
        </Button>
      </Tooltip>
    </div>
    <br>

    <!-- 表格 -->
    <div>
      <Table id="id_table_system" border :columns="columns" :data="systemTableData"></Table>
    </div>
    <br>

    <!-- 分页 -->
    <div style="float: right;">
      <Page
        :total="totalCount"
        :current="currentPage"
        :page-size="pageSize"
        show-total
        show-elevator
        show-sizer
        @on-change="changePage"
        @on-page-size-change="changePageSize"
      ></Page>
    </div>
  </div>
</template>
  

<script>
import SystemAddModalPage from "_p/system/addSystemPage";
import { setToken, getToken } from "@/libs/util";
import { selectSystemPageAPI } from "@/api/system/system";

export default {
  components: {
    SystemAddModalPage
  },
  data() {
    return {
      // 初始化变量
      systemName: "",
      systemKey: "",
      createTimeRange: "",
      totalCount: 0,
      currentPage: 1,
      pageSize: 10,

      columns: [
        {
          type: "selection",
          key: "uid",
          width: 50,
          align: "center"
        },
        {
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "系统名称",
          key: "systemName",
          align: "center"
        },
        {
          title: "系统标识",
          key: "systemKey",
          align: "center"
        },
        {
          title: "创建人",
          key: "createName",
          align: "center"
        },
        {
          title: "创建时间",
          key: "createTime",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {}
                  }
                },
                "详情"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {}
                  }
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  on: {
                    click: () => {}
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      systemTableData: []
    };
  },

  methods: {
    /**
     * 查询分页函数
     */
    querySystemPage(currentPage, pageSize) {
      let params = new Object();
      params.currentPage = currentPage;
      params.pageSize = pageSize;
      params.loginUid = getToken();
      params.systemName = this.systemName;
      params.systemKey = this.systemKey;
      if (this.createTimeRange != null && this.createTimeRange != "") {
        params.startTime = this.createTimeRange.toString().split(",")[0];
        params.endTime = this.createTimeRange.toString().split(",")[1];
      }

      selectSystemPageAPI(params).then(res => {
        if (res.data.code == 1) {
          this.totalCount = res.data.data.totalCount;
          this.currentPage = res.data.data.currentPage;
          this.pageSize = res.data.data.pageSize;
          this.systemTableData = res.data.data.items;
        } else if (res.data.code == 0) {
          this.$Notice.error({
            desc: res.data.msg
          });
        }
      });
    },

    /**
     * 换页
     */
    changePage(currentPage) {
      this.$options.methods.querySystemPage.bind(this)(
        currentPage,
        this.pageSize
      );
    },

    /**
     * 更换每页显示数据量
     */
    changePageSize(pageSize) {
      this.$options.methods.querySystemPage.bind(this)(
        this.currentPage,
        pageSize
      );
    },

    /**
     * 重置查询条件
     */
    reset() {
      this.systemName = "";
      this.systemKey = "";
      this.createTimeRange = "";
      this.$options.methods.querySystemPage.bind(this)(1, 10);
    }
  },

  /**
   * 初始化页面 页面加载的时候执行
   */
  created() {
    this.$options.methods.querySystemPage.bind(this)(
      this.currentPage,
      this.pageSize
    );
  }
};
</script>
