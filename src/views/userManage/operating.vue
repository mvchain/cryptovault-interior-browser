<template>
  <div class="operating">
    <el-row class="operating-title">
      <el-col :span="12" style="line-height: 40px">
        <span style="padding-right:20px;">手机号：{{$route.query.cellphone}}</span>
        <span>用户昵称：{{$route.query.nickname}}</span>
      </el-col>
      <el-col :span="12" style="text-align: right">
        <template>
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
        </template>
        <el-button @click="exportTable">导出表格</el-button>
      </el-col>
    </el-row>
    <div style="margin-top:20px;">
      <el-table
        :data="userLogList.list"
        border
        style="width: 100%">
        <el-table-column
          prop="createdAt"
          label="时间">
        </el-table-column>
        <el-table-column
          prop="message"
          label="描述">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "operating",
    data() {
      return {
        rechargeTime: '',
      }
    },
    computed: {
      ...mapGetters({
        userLogList: 'userLogList'
      })
    },
    mounted() {
      this.$store.dispatch('getUserLogList', this.$route.query.id)
    },
    methods: {
      exportTable() {
        console.log(this.rechargeTime)
      },
      timeChangeFun() {
        console.log(this.rechargeTime)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .operating {
    padding: 20px;
  }
</style>
