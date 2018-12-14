<template>
  <div class="wallet-manage">
    <div class="wallet-title">
      <import-component v-if="adminType === '0'" :action="action" :labelTxt="'签名文件导入'"></import-component>
      <span>USDT地址库存：{{addrList.usdtAddressCount}}</span>
      <span>ETH地址库存：{{addrList.ethAddressCount}}</span>
    </div>
    <el-row :gutter="20" class="wallet-card">
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
          <a target="_blank" :href="`https://etherscan.io/address/${addrList.usdtCold}`">{{addrList.usdtCold}}</a>
        </p>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="wallet-card-item">
        <div><img :src="tokenAddr[2]" alt=""></div>
        <h3>USDT热钱包地址</h3>
        <p>
          <a target="_blank" :href="`https://etherscan.io/address/${addrList.usdtHot}`">{{addrList.usdtHot}}</a>
        </p>
      </el-col>
    </el-row>
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
      action: window.urlData.url + '/block/sign/import',
    }
  },
  mounted() {
    this.$store.dispatch('getAddrInfo').then((res) => {
      this.addrList = res;
      let i1 = QRCode.toDataURL(res.ethCold, {width: 200});
      let i2 = QRCode.toDataURL(res.ethHot, {width: 200});
      let i3 = QRCode.toDataURL(res.usdtCold, {width: 200});
      Promise.all([i1, i2, i3]).then((result) => {
        this.tokenAddr = result;
      })
    }).catch()
  },
  methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .wallet-manage {
    padding: 20px;
    .wallet-card {
      .wallet-card-item {
        text-align: center;
        & h3 {
          font-size: 16px;
          font-weight: 900;
        }
        & p {
          font-size: 16px;
          margin-top: 10px;
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
