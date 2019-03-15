<template>
  <div class="browser">
    <div style="margin-bottom:20px;">
      <el-button @click="dialogFormVisible=true">新建信息</el-button>
    </div>
    <el-table
      :data="browserList.list"
      border
      style="width: 100%">
      <el-table-column
        prop="maxDifficult"
        label="最大难度">
      </el-table-column>

      <el-table-column
        prop="minDifficult"
        label="最小难度">
      </el-table-column>
      <el-table-column
        prop="maxTransaction"
        label="最大交易笔数">
      </el-table-column>
      <el-table-column
        prop="minTransaction"
        label="最小交易笔数">
      </el-table-column>
      <el-table-column
        prop="startBlock"
        label="有效开始区块">
      </el-table-column>
      <el-table-column
        prop="total"
        label="发行总量">
      </el-table-column>
      <el-table-column
        prop="version"
        label="当前版本">
      </el-table-column>
      <el-table-column
        width="300"
        label="操作">
        <template slot-scope="scope">
          <el-button  size="small" @click="editShop(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top:30px; text-align:center;">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="20"
        layout="prev, pager, next"
        :total="browserList.total">
      </el-pagination>
    </div>
    <el-dialog @closed="dialogClose" width="500px" :title="dialogTitle?'新建渠道商':'编辑渠道商'" :visible.sync="dialogFormVisible" center>
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button :loading="subFlag" type="primary" @click="addDetail('browserForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'browser',
    computed: {
      ...mapGetters({
        browserList: 'browserList'
      })
    },
    data() {
      return {
        pageNum: 1,
        dialogFormVisible: false,
        copyForm: {},
        subFlag: false,
        formLabelWidth: '120px',
        dialogTitle: true,
        browserForm: {
          maxDifficult: '',
          maxTransaction: '',
          minDifficult: '',
          id: '',
          minTransaction: '',
          startBlock: '',
          total: '',
          version: ''
        },
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
      this.copyForm = Object.assign({}, this.browserForm);
    },
    methods: {
      addDetail(form) {
        this.subFlag = true;
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.$store.dispatch('postBrowserList', this.browserForm).then(() => {
              this.subFlag = false;
              [this.dialogFormVisible, this.dialogTitle] = [false, true];
              this.$refs[form].resetFields();
              this.$message.success('提交成功');
              this.getList()
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
      editShop(row) {
        this.browserForm = Object.assign({}, row);
        [this.dialogFormVisible, this.dialogTitle] = [true, false];
      },
      getList() {
        this.$store.dispatch('getBrowserList', `?orderBy=created_at desc&pageNum=${this.pageNum}&pageSize=20`);
      },
      handleCurrentChange(v) {
        this.pageNum = v
        this.getList()
      },
      dialogClose() {
        this.browserForm = Object.assign({}, this.copyForm)
        this.dialogTitle = true;
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .browser{
    padding:20px;
  }
</style>
