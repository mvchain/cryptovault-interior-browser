<template>
  <div class="browser">
    <div style="width:800px">
      <el-form :rules="browserRule" :model="browserForm" ref="browserForm">
        <el-form-item prop="maxDifficult" label="最大难度：" :label-width="formLabelWidth" >
          <el-input v-model="browserForm.maxDifficult"></el-input>
        </el-form-item>
        <el-form-item prop="minDifficult" label="最小难度：" :label-width="formLabelWidth" >
          <el-input v-model="browserForm.minDifficult"></el-input>
        </el-form-item>
        <el-form-item  prop="maxTransaction" label="最大交易笔数：" :label-width="formLabelWidth" >
          <el-input  v-model="browserForm.maxTransaction"></el-input>
        </el-form-item>
        <el-form-item prop="minTransaction" label="最小交易笔数：" :label-width="formLabelWidth" >
          <el-input v-model="browserForm.minTransaction"></el-input>
        </el-form-item>
        <el-form-item prop="startBlock" label="有效开始区块：" :label-width="formLabelWidth" >
          <el-input v-model="browserForm.startBlock"></el-input>
        </el-form-item>
        <el-form-item prop="total" label="发行总量：" :label-width="formLabelWidth" >
          <el-input v-model="browserForm.total"></el-input>
        </el-form-item>
        <el-form-item prop="version" label="当前版本：" :label-width="formLabelWidth" >
          <el-input v-model="browserForm.version"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button :loading="subFlag" type="primary" @click="addDetail('browserForm')">确 定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'browser',
    computed: {
      ...mapGetters({
        browserForm: 'browserList'
      })
    },
    data() {
      return {
        subFlag: false,
        formLabelWidth: '180px',

        browserRule: {
          maxDifficult: [
            { required: true, message: '请输入最大难度', trigger: 'blur' }
          ],
          maxTransaction: [
            { required: true, message: '请输入最大交易笔数，100以下', trigger: 'blur' }
          ],
          minDifficult: [
            { required: true, message: '请输入最小难度', trigger: 'blur' }
          ],
          minTransaction: [
            { required: true, message: '最小交易笔数，10以上', trigger: 'blur' }
          ],
          startBlock: [
            { required: true, message: '请输入有效开始区块', trigger: 'blur' }
          ],
          total: [
            { required: true, message: '请输入发行总量', trigger: 'blur' }
          ],
          version: [
            { required: true, message: '请输入当前版本', trigger: 'blur' }
          ]
        }
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      addDetail(form) {
        this.subFlag = true;
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.$store.dispatch('postBrowserList', this.browserForm).then(() => {
              this.subFlag = false;
              this.$message.success('提交成功');
            }).catch();
          } else {
            this.subFlag = false;
            this.$message({
              type: 'error',
              message: '请输入正确信息'
            });
          }
        })
      },
      getList() {
        this.$store.dispatch('getBrowserList');
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .browser{
    padding:20px;
  }
</style>
