<template>
  <div class="order">
    <el-row>
      <el-col :span="18">
        <el-select @change="orderData" v-model="orderStatus" placeholder="请选择">
          <el-option
            v-for="item in statusList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <el-date-picker
          v-model="rechargeTime"
          type="daterange"
          align="right"
          @change="orderData"
          :clearable="true"
          value-format="timestamp"
          :default-time="['00:00:00', '23:59:59']"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
        <el-button :loading="exportFlag" @click="exportTable">导出表格</el-button>
      </el-col>
      <el-col :span="6">
        <el-input clearable placeholder="输入项目名称、邮箱" v-model="searchText" class="input-with-select">
          <el-button @click="searchHandler" slot="append" icon="el-icon-search">搜索</el-button>
        </el-input>
      </el-col>
    </el-row>
    <div style="margin-top:20px;">
      <el-table
        :data="projectOrderList.list"
        border
        style="width: 100%">
        <el-table-column
          label="预约时间">
          <template slot-scope="scope">{{new Date(scope.row.createdAt).toLocaleString()}}</template>
        </el-table-column>
        <el-table-column
          prop="orderNumber"
          label="订单号">
        </el-table-column>
        <el-table-column
          prop="projectName"
          label="项目名称">
        </el-table-column>
        <el-table-column
          prop="email"
          label="用户邮箱">
        </el-table-column>
        <el-table-column
          label="成功数量/预约数量">
          <template slot-scope="scope">
            {{scope.row.successValue}}/{{scope.row.value}}
          </template>
        </el-table-column>
        <el-table-column
          label="最终支付金额/预约金额">
          <template slot-scope="scope">
            {{scope.row.successPayed}}/{{scope.row.payed}}
          </template>
        </el-table-column>
        <el-table-column
          label="订单状态">
          <template slot-scope="scope">
            {{scope.row.status | orderStatusFliter}}
          </template>
        </el-table-column>
        <el-table-column
          label="项目状态">
          <template slot-scope="scope">
            {{scope.row.projectStatus | projectStatusFliter}}
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:30px; text-align:center;">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="20"
          layout="prev, pager, next"
          :total="projectOrderList.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'order',
    computed: {
      ...mapGetters({
        projectOrderList: 'projectOrderList'
      })
    },
    mounted() {
      this.orderData()
    },
    data() {
      return {
        email: '',
        pageNum: 1,
        projectName: '',
        searchText: '',
        orderStatus: '',
        rechargeTime: '',
        statusList: [
          {
            id: '',
            name: '所有状态'
          },
          {
            id: 0,
            name: '等待结算'
          },
          {
            id: 1,
            name: '成功众筹'
          },
          {
            id: 9,
            name: '未成功众筹'
          }
        ],
        exportFlag: false
      }
    },
    methods: {
      orderData() {
        this.$store.dispatch('getProjectOrderList', `?email=${this.email}&orderBy=created_at desc&createdStartAt=${this.rechargeTime ? this.rechargeTime[0] : 1}&createdStopAt=${this.rechargeTime ? this.rechargeTime[1] : new Date().getTime()}&pageNum=${this.pageNum}&pageSize=20&projectName=${this.projectName}&status=${this.orderStatus}`)
      },
      searchHandler() {
        if(!(/^1[345789]\d{9}$/.test(this.searchText))){
          this.email = '';
          this.projectName = this.searchText;
        } else {
          this.email = this.searchText;
          this.projectName = '';
        }
        this.orderData()
      },
      exportTable() {
        this.exportFlag = true;
        this.$store.dispatch('getSign').then((s) => {
          window.open(`${window.urlData.url}/project/order/excel?email=${this.email}&createdStartAt=${this.rechargeTime ? this.rechargeTime[0] : 1}&createdStopAt=${this.rechargeTime ? this.rechargeTime[1] : new Date().getTime()}&pageNum=1&pageSize=${this.projectOrderList.total}&projectName=${this.projectName}&status=${this.orderStatus}&sign=${s}`)
          this.exportFlag = false
        }).catch(() => {
          this.exportFlag = false
        })
      },
      handleCurrentChange(v) {
        this.pageNum = v;
        this.orderData()
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .order{
    padding:20px;
  }
</style>
