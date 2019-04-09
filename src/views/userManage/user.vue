<template>
  <div class="user">
    <el-row style="margin-bottom:20px;">
      <el-col :span="18">
        <el-select @change="userListData" v-model="userStatus" placeholder="请选择">
          <el-option
            v-for="item in userTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-input clearable placeholder="输入手机号" v-model="searchText" class="input-with-select">
          <el-button @click="userListData" slot="append" icon="el-icon-search">搜索</el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-table
      :data="userList.list"
      border
      style="width: 100%">
      <el-table-column
        prop="email"
        label="邮箱">
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
        prop="financialBalance"
        label="理财资产">
      </el-table-column>
      <el-table-column
        prop="inviteNum"
        label="邀请人数">
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scope">
          {{scope.row.status === 1 ? '启用' : '禁用'}}
        </template>
      </el-table-column>
      <el-table-column
        width="350"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="$router.push({path: 'assets', query: {id: scope.row.id, nickname: scope.row.nickname, cellphone: scope.row.cellphone}})" size="small">资产列表</el-button>
          <el-button @click="$router.push({path: 'operating', query: {id: scope.row.id, nickname: scope.row.nickname, cellphone: scope.row.cellphone}})" size="small">操作记录</el-button>
          <el-button @click="editGoogle(scope.row)" size="small">编辑</el-button>
          <el-button @click="enableDisable({id: scope.row.id, status: scope.row.status})" v-if="permission.includes('2')" size="small">{{scope.row.status === 1 ? '禁用' : '启用'}}</el-button>
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
    <el-dialog
      title="编辑"
      :visible.sync="editdialog"
      width="30%"
      >
      <el-button @click="unGoogleCode" :disabled="userInfo.googleCheck === 0">解绑谷歌验证器</el-button>
      <span slot="footer" class="dialog-footer">
    <el-button @click="editdialog = false">取 消</el-button>
    <!--<el-button type="primary" @click="editdialog = false">确 定</el-button>-->
  </span>
    </el-dialog>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'user',
    props: {
      manage: Object
    },
    data() {
      return {
        pageNum: 1,
        userStatus: '',
        userInfo: {},
        searchText: '',
        editdialog: false,
        userTypeList: [
          {
            id: '',
            name: '所有状态'
          },
          {
            id: 1,
            name: '正常'
          },
          {
            id: 0,
            name: '禁用'
          }
        ]
      }
    },
    computed: {
      ...mapGetters({
        userList: 'userList',
        permission: 'permission',
        adminType: 'adminType'
      })
    },
    mounted() {
      this.userListData()
    },
    methods: {
      unGoogleCode() {
        this.$confirm('是否确认解除绑定?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this.$store.dispatch('putGoogleCode', {id: this.userInfo.id, status: 0}).then(() => {
            this.$message({
              type: 'success',
              message: '解除成功!'
            });
            this.userInfo.googleCheck = 0;
          })

        }).catch(() => {})
      },
      editGoogle(r) {
        this.editdialog = true;
        Object.assign(this.userInfo, r)
      },
      handleCurrentChange(v) {
        this.pageNum = v;
        this.userListData()
      },
      userListData() {
        this.$store.dispatch('getUserList', `?pageNum=${this.pageNum}&pageSize=20&cellphone=${this.searchText}&status=${this.userStatus}`);
      },
      enableDisable(opt) {
        this.$confirm(`是否${opt.status === 1 ? '禁用' : '启用'}此用户?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          opt.status = opt.status === 1 ? 0 : 1;
          this.$store.dispatch('putUserStatus', opt).then(() => {
            this.$message.success('修改成功');
            this.userListData();
          }).catch()
        }).catch(() => {});
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .user{
    padding:20px;
  }
</style>
