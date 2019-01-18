<template>
  <div class="project">
    <div v-if="permission.includes('4')">
      <el-button @click="dialogFlag = true;createFlag = true;" type="success">新建项目</el-button>
    </div>
    <div style="margin-top:20px;">
      <el-table
        :data="projectList.list"
        border
        style="width: 100%">
        <el-table-column
          prop="projectName"
          label="项目名称">
        </el-table-column>
        <el-table-column
          prop="tokenName"
          label="项目币种">
        </el-table-column>
        <el-table-column
          prop="projectTotal"
          label="众筹数量">
        </el-table-column>
        <el-table-column
          prop="ratio"
          label="兑换比例">
        </el-table-column>
        <el-table-column
          label="预约开始时间">
          <template slot-scope="scope">{{new Date(scope.row.startedAt).toLocaleString()}}</template>
        </el-table-column>
        <el-table-column
          label="结束时间">
          <template slot-scope="scope">{{new Date(scope.row.stopAt).toLocaleString()}}</template>
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope" >
            <span>{{scope.row.status | projectStatusFliter}}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="permission.includes('4')"
          label="操作">
          <template slot-scope="scope">
            <el-button  @click="editProjectFun(scope.row.id)" size="small">编辑</el-button>
            <el-button  @click="deleteProjectFun(scope.row.id)" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:30px; text-align:center;">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="20"
          layout="prev, pager, next"
          :total="projectList.total">
        </el-pagination>
      </div>
    </div>
    <el-dialog @closed="dialogClose" width="600px" :title="createFlag?'新建项目':'编辑项目'" :visible.sync="dialogFlag" center>
      <el-form :rules="projectRule" :model="projectForm" ref="projectForm">
        <el-form-item prop="projectImage" label="项目图标" :label-width="formLabelWidth" >
          <pro-oss @set-img-url="getImg" :imgName="imgName" :payload="'image/jpeg/image/png/image/jpg'" :limit="1"></pro-oss>
        </el-form-item>
        <el-form-item prop="projectName" label="项目名称" :label-width="formLabelWidth" >
          <el-input v-model="projectForm.projectName"></el-input>
        </el-form-item>
        <el-form-item prop="tokenId" class="project-form-item"  label="对应币种"  :label-width="formLabelWidth">
          <el-select @change="baseTokenNameHandler" v-model="projectForm.tokenId" placeholder="请选择">
            <el-option
              v-for="item in tokenList"
              :key="item.tokenId"
              :label="item.tokenName"
              :value="item.tokenId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="baseTokenId" class="project-form-item" label="接受币种"  :label-width="formLabelWidth">
          <el-select  v-model="projectForm.baseTokenId" placeholder="请选择">
            <el-option
              v-for="item in tokenList"
              :key="item.tokenId"
              :label="item.tokenName"
              :value="item.tokenId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="projectLimit" class="project-form-item" label="最大购买量"  :label-width="formLabelWidth">
          <el-input v-model="projectForm.projectLimit"></el-input>
        </el-form-item>

        <el-form-item prop="projectMin" class="project-form-item" label="最小购买量"  :label-width="formLabelWidth">
          <el-input v-model="projectForm.projectMin"></el-input>
        </el-form-item>
        <el-form-item prop="ratio" class="project-form-item" label="兑换比例"  :label-width="formLabelWidth">
          <el-input v-model="projectForm.ratio"></el-input>
        </el-form-item>
        <el-form-item prop="projectTotal" class="project-form-item" label="众筹总量"  :label-width="formLabelWidth">
          <el-input v-model="projectForm.projectTotal"></el-input>
        </el-form-item>
        <el-form-item prop="startedAt" class="project-form-inline" label="开始时间"  :label-width="formLabelWidth">
          <el-date-picker
            type="datetime"
            v-model="projectForm.startedAt"
            value-format="timestamp"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item prop="stopAt" class="project-form-inline" label="结束时间"  :label-width="formLabelWidth">
          <el-date-picker
            type="datetime"
            v-model="projectForm.stopAt"
            value-format="timestamp"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="publishAt" class="project-form-inline" label="发币时间"  :label-width="formLabelWidth">
          <el-date-picker
            type="datetime"
            v-model="projectForm.publishAt"
            value-format="timestamp"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="releaseValue" class="project-form-item" label="每日释放比例"  :label-width="formLabelWidth">
          <el-input v-model="projectForm.releaseValue"></el-input>
        </el-form-item>
        <el-form-item class="project-form-item" label="前端展示"  :label-width="formLabelWidth">
          <el-switch v-model="projectForm.visiable" :active-value="1" :inactive-value="0" ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFlag = false">取 消</el-button>
        <el-button size="small" :loading="subFlag" type="primary" @click="subForm('projectForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import oss from '../../components/ossload'
  export default {
    name: 'project',

    computed: {
      ...mapGetters({
        projectList: 'projectList',
        tokenList: 'tokenList',
        permission: 'permission',
        adminType: 'adminType'
      })
    },
    components: {
      'pro-oss': oss
    },
    data() {
      const publishVali = (rule, value, callback) => {
        if (value <= this.projectForm.stopAt) {
          callback(new Error('发币时间应晚于项目结束时间'));
        } else {
          callback();
        }
      };
      return {
        formLabelWidth: '110px',
        projectForm: {
          baseTokenId: '',
          tokenId: '',
          baseTokenName: "",
          id: '',
          projectImage: "",
          projectMin: '',
          projectLimit: '',
          projectName: "",
          projectTotal: '',
          ratio: '',
          releaseValue: '',
          startedAt: '',
          publishAt: '',
          stopAt: '',
          visiable: ''
        },
        projectRule: {
          baseTokenId: [
            { required: true, message: '请选择接受币种', trigger: 'blur' }
          ],
          tokenId: [
            { required: true, message: '请选择对应币种', trigger: 'blur' }
          ],
          projectImage: [
            { required: true, message: '请输入项目图标', trigger: 'blur' }
          ],
          projectMin: [
            { required: true, message: '请输入最小购买数', trigger: 'blur' }
          ],
          projectLimit: [
            { required: true, message: '请输入最大购买数', trigger: 'blur' }
          ],
          projectName: [
            { required: true, message: '请输入项目名称', trigger: 'blur' }
          ],
          projectTotal: [
            { required: true, message: '请输入众筹总量', trigger: 'blur' }
          ],
          ratio: [
            { required: true, message: '请输入兑换比例', trigger: 'blur' }
          ],
          releaseValue: [
            { required: true, message: '请输入释放比例', trigger: 'blur' }
          ],
          publishAt: [
            {validator: publishVali, trigger: 'blur' }
          ],
        },
        dialogFlag: false,
        createFlag: false,
        subFlag: false,
       /* receiveList: [
          {
            id: 1,
            name: 'VRT交易'
          },
          {
            id: 2,
            name: '余额交易'
          }
        ],*/
        pageNum: 1,
        imgName: '',
        copyForm: {}
      }
    },
    mounted() {
      this.projectData()
      this.copyForm = Object.assign({}, this.projectForm);
    },
    methods: {
      getImg(v) {
        this.projectForm.projectImage = v;
      },
      subForm(form) {
        this.subFlag = true;
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.$store.dispatch(this.createFlag ? 'postProjectList' : 'putProjectList', this.projectForm).then(() => {
              this.subFlag = false;
              this.dialogFlag = false;
              this.$refs[form].resetFields();
              this.projectData()
              this.$message.success('提交成功');
            }).catch(() => {
              this.subFlag = false
            })
          } else {
            this.subFlag = false;
            this.$message({
              type: 'error',
              message: '请输入正确信息'
            });
            return false
          }
        })
      },
      editProjectFun(id) {
        this.$store.dispatch('getProjectInfo', `/${id}`).then((res) => {
          this.dialogFlag = true;
          this.createFlag = false;
          this.projectForm = Object.assign({}, res);
          this.imgName = res.projectImage;
        }).catch()
      },
      deleteProjectFun(id) {
        this.$confirm('确认删除该项目?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this.$store.dispatch('deleteProjectList', `/${id}`).then(() => {
            this.projectData()
          }).catch(() => { return false })
        }).catch(() => { return false })
      },
      baseTokenNameHandler(v) {
        this.tokenList.map((obj) => {
          if (v === obj.tokenId) {
            this.projectForm.baseTokenName = obj.tokenName
          }
        })
      },
      projectData() {
        this.$store.dispatch('getProjectList', `?pageNum=${this.pageNum}&pageSize=20&orderBy=created_at desc`)
      },
      handleCurrentChange(v) {
        this.pageNum = v;
        this.projectData()
      },
      dialogClose() {
        this.projectForm = Object.assign({}, this.copyForm)
        this.imgName = ''
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .project {
    padding: 20px;
    .project-form-item{
      width:45%;
      display: inline-block;
    }
    .project-form-inline{
      & .el-date-editor{
        width:100%;
      }
    }
  }
</style>
