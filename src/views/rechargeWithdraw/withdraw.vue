<template>
  <div class="company-withdraw">
    <el-row>
      <el-col :span="18">
        <el-button style="margin-right:20px;">同意已勾选</el-button>
        <el-button style="margin-right:20px;">导出</el-button>
        <el-button style="margin-right:20px;">导入</el-button>
        <el-select @change="statusChange" v-model="companyStatus" placeholder="请选择">
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
          @change="timeChangeFun"
          :clearable="true"
          value-format="timestamp"
          :default-time="['00:00:00', '23:59:59']"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
        <el-button @click="exportTable">导出表格</el-button>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="输入单号、目标地址" v-model="searchText" class="input-with-select">
          <el-button @click="searchHandler" slot="append" icon="el-icon-search">搜索</el-button>
        </el-input>
      </el-col>
    </el-row>
    <div style="margin-top:20px;">
      <el-table
        :data="blockTxList.list"
        border
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="时间">
          <template slot-scope="scope" >
            <span>{{new Date(scope.row.createdAt).toLocaleString()}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="orderNumber"
          label="单号">
        </el-table-column>
        <el-table-column
          prop="cellphone"
          label="用户手机号">
        </el-table-column>
        <el-table-column
          label="提币金额">
          <template slot-scope="scope" >
            <span>{{scope.row.value}}{{scope.row.tokenName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="toAddress"
          label="目标地址">
        </el-table-column>
        <el-table-column
          prop="hash"
          label="交易哈希">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope" >
            <span>{{scope.row.status | statusFliter}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:30px; text-align:center;">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="20"
          layout="prev, pager, next"
          :total="blockTxList.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'withdraw',
    data() {
      return {
        statusList: [
          {
            name: '全部状态',
            id: ''
          },
          {
            name: '待审核',
            id: '1'
          },
          {
            name: '待签名',
            id: '2'
          },
          {
            name: '拒绝',
            id: '3'
          },
          {
            name: '正在提币',
            id: '4'
          },
          {
            name: '提币成功',
            id: '5'
          },
          {
            name: '失败',
            id: '6'
          }
        ],
        companyStatus: '',
        rechargeTime: '',
        searchText: '',
        pageNum: 1,

      }
    },
    computed: {
      ...mapGetters({
        blockTxList: 'blockTxList'
      })
    },

    mounted() {
      // ?createdStartAt=1&createdStopAt=2&orderBy=3&orderNumber=4&pageNum=5&pageSize=6&status=7&toAddress=8&updatedStartAt=9&updatedStopAt=10
      this.withdrawData(`?orderBy=created_at&orderNumber=${this.searchText}&pageNum=${this.pageNum}&pageSize=20&status=7&toAddress=8&updatedStartAt=9&updatedStopAt=10`)
    },
    methods: {
      statusChange() {},
      exportTable() {
        console.log(this.rechargeTime)
      },
      searchHandler() {},
      timeChangeFun() {
        console.log(this.rechargeTime)
      },
      handleCurrentChange() {},
      withdrawData(str) {
        this.$store.dispatch('getBlockTxList', str).then().catch()
      }
    }
  }
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
  .company-withdraw{
    padding:20px;
  }
</style>
