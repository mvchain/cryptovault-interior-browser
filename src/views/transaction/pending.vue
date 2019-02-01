<template>
  <div class="pending">
    <el-row>
      <el-col :span="18">
        <el-select @change="txListData" v-model="orderStatus" placeholder="请选择">
          <el-option
            v-for="item in statusList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <el-select @change="txListData" v-model="pairStatus" placeholder="请选择">
          <el-option
            v-for="item in tokenPairList"
            :key="item.pairId"
            :label="item.pairName"
            :value="item.pairId">
          </el-option>
        </el-select>
        <el-select @change="txListData" v-model="typeStatus" placeholder="请选择">
          <el-option
            v-for="item in typeList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <el-date-picker
          v-model="rechargeTime"
          type="daterange"
          align="right"
          @change="txListData"
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
        <el-input clearable placeholder="输入订单号、手机号" v-model="searchText" class="input-with-select">
          <el-button @click="searchHandler" slot="append" icon="el-icon-search">搜索</el-button>
        </el-input>
      </el-col>
    </el-row>
    <div style="margin-top:20px;">
      <el-table
        :data="txList.list"
        border
        style="width: 100%">
        <el-table-column
          label="挂单时间">
          <template slot-scope="scope">{{new Date(scope.row.createdAt).toLocaleString()}}</template>
        </el-table-column>
        <el-table-column
          prop="orderNumber"
          label="订单号">
        </el-table-column>
        <el-table-column
          prop="email"
          label="用户邮箱">
        </el-table-column>
        <el-table-column
          label="交易类型">
          <template slot-scope="scope">
            {{scope.row.transactionType === 1 ? '购买'  : '出售'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="pairName"
          label="交易对">
        </el-table-column>
        <el-table-column
          prop="value"
          label="挂单数量">
        </el-table-column>
        <el-table-column
          prop="deal"
          label="已成交数量">
        </el-table-column>
        <el-table-column
          prop="surplus"
          label="待成交数量">
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
          <template slot-scope="scope">
            {{scope.row.status | pendingStatusFilter}}
          </template>
        </el-table-column>
        <el-table-column
          v-if="permission.includes('5')"
          label="操作">
          <template slot-scope="scope">
            <el-button size="small" v-show="scope.row.status === 0" @click="cancelHandler(scope.row.id)">撤销</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:30px; text-align:center;">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="20"
          layout="prev, pager, next"
          :total="txList.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  export default {
    name: 'pending',
    props: {
      manage: Object
    },
    computed: {
      ...mapGetters({
        txList: 'txList',
        tokenPairList: 'tokenPairList',
        permission: 'permission',
        adminType: 'adminType'
      })
    },
    mounted() {
      this.txListData()
      this.$store.dispatch('getTokenPair').then(() => {
        this.tokenPairList.unshift({pairId: '', pairName: '所有交易对'})
      }).catch()
    },
    data() {
      return {
        typeList: [
          {
            id: '',
            name: '所有交易类型'
          },
          {
            id: 1,
            name: '购买'
          },
          {
            id: 2,
            name: '出售'
          }
        ],
        statusList: [

          {
            id: '',
            name: '所有状态'
          },
          {
            id: '0',
            name: '挂单中'
          },
          {
            id: '1',
            name: '交易完成'
          },
          {
            id: '4',
            name: '已撤销'
          }
        ],
        orderStatus: '',
        pairStatus: '',
        typeStatus: '',
        email: '',
        rechargeTime: '',
        searchText: '',
        orderNumber: '',
        pageNum: 1,
        exportFlag: false
      }
    },
    methods: {
      searchHandler() {
        if(!(/^1[345789]\d{9}$/.test(this.searchText))){
          this.email = '';
          this.orderNumber = this.searchText;
        } else {
          this.email = this.searchText;
          this.orderNumber = '';
        }
        this.txListData()
      },
      exportTable() {
        this.exportFlag = true;
        this.$store.dispatch('getSign').then((s) => {
          window.open(`${window.urlData.url}/transaction/excel?email=${this.email}&createdStartAt=${this.rechargeTime ? this.rechargeTime[0] : 1}&createdStopAt=${this.rechargeTime ? this.rechargeTime[1] : new Date().getTime()}&orderNumber=${this.orderNumber}&pageNum=1&pageSize=${this.txList.total}&pairId=${this.pairStatus}&status=${this.orderStatus}&transactionType=${this.typeStatus}&sign=${s}`)
          this.exportFlag = false
        }).catch(() => {
          this.exportFlag = false
        })
      },
      txListData() {
        this.$store.dispatch('getTxList', `?email=${this.email}&orderBy=created_at desc&createdStartAt=${this.rechargeTime ? this.rechargeTime[0] : 1}&createdStopAt=${this.rechargeTime ? this.rechargeTime[1] : new Date().getTime()}&orderNumber=${this.orderNumber}&pageNum=${this.pageNum}&pageSize=20&pairId=${this.pairStatus}&status=${this.orderStatus}&transactionType=${this.typeStatus}`)
      },
      handleCurrentChange(v) {
        this.pageNum = v;
        this.txListData()
      },
      cancelHandler(id) {
        this.$confirm('确认撤销挂单?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this.$store.dispatch('deletePending', id).then(() => {
            this.$message.success('撤销成功');
            this.txListData('?orderBy=created_at&pageNum=1&pageSize=20');
          }).catch(() => { return false })
        }).catch(() => { return false })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .pending {
    padding: 20px;
  }
</style>
