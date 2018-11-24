<template>
  <div class="user">
    <el-table
      :data="userList.list"
      border
      style="width: 100%">
      <el-table-column
        prop="cellphone"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="用户昵称">
      </el-table-column>
      <el-table-column
        prop="balance"
        label="总资产">
      </el-table-column>
      <el-table-column
        with="600"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="$router.push({path: 'assets', query: {id: scope.row.id, nickname: scope.row.nickname, cellphone: scope.row.cellphone}})" size="small">资产列表</el-button>
          <el-button @click="$router.push({path: 'operating', query: {id: scope.row.id, nickname: scope.row.nickname, cellphone: scope.row.cellphone}})" size="small">操作记录</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top:30px; text-align:center;">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="20"
        layout="prev, pager, next"
        :total="userList.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'user',
    data() {
      return {
        pageNum: 1
      }
    },
    computed: {
      ...mapGetters({
        userList: 'userList'
      })
    },
    mounted() {
      // ?cellphone=1&createdStartAt=2&createdStopAt=3&orderBy=4&pageNum=5&pageSize=6&updatedStartAt=7&updatedStopAt=8
      this.userListData('?orderBy=created_at&pageNum=1&pageSize=20')
    },
    methods: {
      handleCurrentChange(v) {
        this.pageNum = v
        this.userListData(`?orderBy=created_at&pageNum=${this.pageNum}&pageSize=20`)
      },
      userListData(str) {
        this.$store.dispatch('getUserList', str).then().catch()
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .user{
    padding:20px;
  }
</style>
