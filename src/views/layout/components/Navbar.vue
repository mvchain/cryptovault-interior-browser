<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb></breadcrumb>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <span>{{avatar}}</span>
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <el-dropdown-item >
          <span @click="dialogFormVisible = true">手续费设置</span>
        </el-dropdown-item>
        <el-dropdown-item>
          <span @click="dialogBalance = true">汇总保留金额</span>
        </el-dropdown-item>

        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog v-if="fee.length&&reserved.length" :close-on-click-modal="false"  width="600px"  title="汇总保留金额" :visible.sync="dialogBalance">
      <div v-for="(v, k) in reserved" :key="k">
        <span>{{v.tokenName}}保留：</span>
        <span>{{v.value}}</span>
        <el-slider
          v-model="v.value"
          :min="fee[k].value"
          :max="10"
          :step="0.001"
        >
        </el-slider>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogBalance = false">取 消</el-button>
        <el-button type="primary" @click="setReserve">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog v-if="fee.length&&reserved.length" :close-on-click-modal="false"  width="600px"  title="转账手续费设置" :visible.sync="dialogFormVisible">
      <div>
        <span>{{fee[0].tokenName}}手续费：</span>
        <span>{{fee[0].value}}</span>
        <el-slider
          v-model="fee[0].value"
          :min="0.0001"
          :max="0.001"
          :step="0.00001"
        >
        </el-slider>
      </div>
      <div>
        <span>{{fee[1].tokenName}}</span>
        <span>{{fee[1].value}}</span>
        <el-slider
          v-model="fee[1].value"
          :min="0.000210"
          :max="0.002100"
          :step="0.0000021"
        >
        </el-slider>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="setFee">确 定</el-button>
      </div>
    </el-dialog>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  props: {
    fee: Array,
    reserved: Array,
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  data() {
    return {
      avatar: '',
      dialogFormVisible: false,
      dialogBalance: false,
    }
  },
  mounted() {
    const un = window.localStorage.getItem('user')
    if (un) {
      this.avatar = JSON.parse(un).username
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    setFee() {
      this.$store.dispatch('putBlockFeeFun', this.fee).then(() => {
        this.$message.success('修改成功')
      }).catch()
    },
    setReserve() {
      this.$store.dispatch('putBlockHoldFun', this.reserved).then(() => {
        this.$message.success('修改成功')
      }).catch()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .balance{
    float:right;
    & span {
      cursor:pointer;
      display: inline-block;
      margin-right:150px;
    }
  }
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 19px;
        font-size: 12px;
      }
    }
  }
}
</style>

