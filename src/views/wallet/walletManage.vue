<template>
  <div class="wallet-manage">
    <div class="wallet-title">
      <import-component v-if="adminType === '0'" :action="action" :labelTxt="'导入地址'"></import-component>
      <el-button @click="summaryFun" style="margin-right:20px;">汇总导出</el-button>
      <import-component :action="action1" :labelTxt="'签名文件导入'"></import-component>
    </div>
    <div class="token-item"></div>
    <el-row :gutter="20" class="wallet-card">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="wallet-card-item">
        <div class="wallet-card-item-summary">
          <p>USDT待汇总金额：</p>
          <p>USDT地址剩余库存：{{addrList.usdtAddressCount}}</p>
        </div>
        <div class="wallet-card-item-img">
          <img :src="tokenAddr[0]">
        </div>
        <div class="wallet-card-item-info">
          <h3>USDT冷钱包地址</h3>
          <p>地址余额：</p>
          <p>{{addrList.usdtCold}}</p>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="wallet-card-item">
        <div class="wallet-card-item-summary">
          <p>USDT待汇总金额：</p>
          <p>USDT地址剩余库存：</p>
        </div>
        <div class="wallet-card-item-img">
          <img :src="tokenAddr[0]">
        </div>
        <div class="wallet-card-item-info">
          <h3>USDT热钱包地址</h3>
          <p>地址余额：</p>
          <p>{{addrList.usdtHot}}</p>
        </div>
      </el-col>
    </el-row>
    <!--<el-row :gutter="20" class="wallet-card">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="wallet-card-item">
        <div><img :src="tokenAddr[0]" alt=""></div>
        <h3>ETH冷钱包地址</h3>
        <p>
          <a target="_blank" :href="`https://etherscan.io/address/${addrList.ethCold}`">{{addrList.ethCold}}</a>
        </p>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="wallet-card-item">
        <div><img :src="tokenAddr[1]" alt=""></div>
        <h3>ETH热钱包</h3>
        <p>
          <a target="_blank" :href="`https://etherscan.io/address/${addrList.ethHot}`">{{addrList.ethHot}}</a>
        </p>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="wallet-card-item">
        <div><img :src="tokenAddr[2]" alt=""></div>
        <h3>USDT冷钱包地址</h3>
        <p>
          <span target="_blank" >{{addrList.usdtCold}}</span>
        </p>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="wallet-card-item">
        <div><img :src="tokenAddr[2]" alt=""></div>
        <h3>USDT热钱包地址</h3>
        <p>
          <span target="_blank" >{{addrList.usdtHot}}</span>
        </p>
      </el-col>
    </el-row>-->
  </div>
</template>

<script>//getAddrInfo
import QRCode from 'qrcode';
import {mapGetters} from 'vuex';
import importComponents from '../../components/import-component'

export default {
  name: "wallet-manage",
  components: {
    'import-component': importComponents
  },
  computed: {
    ...mapGetters({
      adminType: 'adminType'
    })
  },
  data() {
    return {
      tokenAddr: [],
      addrList: {},
      action: window.urlData.url + '/block/account/import',
      action1: window.urlData.url + '/block/sign/import',
      exportFlag: false,
    }
  },
  mounted() {
    this.$store.dispatch('getAddrInfo').then((res) => {
      this.addrList = res;
      let i1 = QRCode.toDataURL(res.ethCold, {width: 200});
      let i2 = QRCode.toDataURL(res.ethHot, {width: 200});
      let i3 = QRCode.toDataURL(res.usdtCold, {width: 200});
      let i4 = QRCode.toDataURL(res.usdtHot, {width: 200});
      Promise.all([i1, i2, i3, i4]).then((result) => {
        this.tokenAddr = result;
      })
    }).catch()
  },
  methods: {
    summaryFun() {
      this.exportFlag = true;
      this.$store.dispatch('getSign').then((s) => {
        window.open(`${window.urlData.url}/block/collect/export?sign=${s}`)
        this.exportFlag = false
      }).catch(() => {
        this.exportFlag = false
      })
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .wallet-manage {
    padding: 20px;
    .wallet-card {
      .wallet-card-item {
        & .wallet-card-item-summary {
          line-height: 30px;
          text-indent: 21px;
        }
        & .wallet-card-item-img {
          float:left;
        }
        & .wallet-card-item-info {
          float:left;
          & h3{
            margin:80px 0 20px 0;
          }
          & p{
            margin-top:20px;
          }
        }
      }
    }
    .wallet-title {
      margin-bottom: 20px;
      & span {
        padding-right: 30px;
        font-size: 18px;
      }
    }
  }
</style>
