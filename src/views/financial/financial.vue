<template>
  <div class="financial">
    <el-row style="margin-bottom:20px;">
      <el-col :span="18">
        <el-button  v-if="permission.includes('6')"  type="success" @click="dialogFormVisible = true; dialogTitle = true;" >新建项目</el-button>
      </el-col>
      <el-col :span="6">
        <el-input clearable placeholder="输入项目" v-model="searchText">
          <el-button @click="projectData" slot="append" icon="el-icon-search">搜索</el-button>
        </el-input>
      </el-col>
    </el-row>
    <div style="margin-top:20px;">
      <el-table
        border
        :data="financialList.list"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="项目名称">
        </el-table-column>
        <el-table-column
          label="开始时间">
          <template slot-scope="scope">
            {{new Date(scope.row.startAt).toLocaleString()}}
          </template>
        </el-table-column>
        <el-table-column
          label="结束时间">
          <template slot-scope="scope">
            {{new Date(scope.row.stopAt).toLocaleString()}}
          </template>
        </el-table-column>
        <el-table-column
          prop="baseTokenName"
          label="理财币种">
        </el-table-column>
        <el-table-column
          prop="tokenName"
          label="收益币种">
        </el-table-column>
        <el-table-column
          label="年化收益率">
          <template slot-scope="scope">
            {{scope.row.incomeMin}}%—{{scope.row.incomeMax}}%
          </template>
        </el-table-column>
        <el-table-column
          label="额度减少比例">
          <template slot-scope="scope">
            {{scope.row.addSold}}%
          </template>
        </el-table-column>
        <el-table-column
          prop="times"
          label="次数/天数">
        </el-table-column>
        <el-table-column
          prop="limitValue"
          label="总额度">
        </el-table-column>
        <el-table-column
          prop="depth"
          label="提成层级">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            {{scope.row.status === 2 ? '已结束' : '进行中'}}
          </template>
        </el-table-column>
        <el-table-column
          width="150"
          label="操作">
          <template slot-scope="scope">
            <el-button v-if="permission.includes('6')" @click="editManage(scope.row.id)" size="small">编辑</el-button>
            <el-button @click="$router.push({path: 'financialOrder', query: {id: scope.row.id}})" size="small" >订单</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:30px; text-align:center;">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="20"
          layout="prev, pager, next"
          :total="financialList.total">
        </el-pagination>
      </div>
    </div>
    <el-dialog @closed="dialogClose" width="700px" :title="dialogTitle?'新建项目':'编辑项目'" :visible.sync="dialogFormVisible" center>
      <el-form :rules="financialRule" :model="financialForm" ref="financialForm">
        <el-form-item prop="baseTokenId" class="financial-form-item" label="项目类型" :label-width="formLabelWidth" >
          <el-select v-model="financialForm.needSign" placeholder="请选择">
            <el-option
              v-for="item in checkInType"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="name" class="financial-form-item" label="项目名称" :label-width="formLabelWidth" >
          <el-input v-model="financialForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="times" class="financial-form-item" label="天数/次数" :label-width="formLabelWidth" >
          <el-input v-model="financialForm.times"></el-input>
        </el-form-item>
        <el-form-item prop="baseTokenId" class="financial-form-item" label="理财币种" :label-width="formLabelWidth" >
          <el-select @change="tokenFun($event, 'baseTokenName')" v-model="financialForm.baseTokenId" placeholder="请选择">
            <el-option
              v-for="item in tokenList"
              :key="item.tokenId"
              :label="item.tokenName"
              :value="item.tokenId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="limitValue" class="financial-form-item" label="总额度上限" :label-width="formLabelWidth" >
          <el-input v-model="financialForm.limitValue"></el-input>
        </el-form-item>
        <el-form-item prop="tokenId" class="financial-form-item" label="收益币种" :label-width="formLabelWidth" >
          <el-select @change="tokenFun($event, 'tokenName')" v-model="financialForm.tokenId" placeholder="请选择">
            <el-option
              v-for="item in tokenList"
              :key="item.tokenId"
              :label="item.tokenName"
              :value="item.tokenId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="userLimit" class="financial-form-item" label="每个用户限额" :label-width="formLabelWidth" >
          <el-input v-model="financialForm.userLimit"></el-input>
        </el-form-item>

        <el-form-item class="financial-form-item" label="提成层级" :label-width="formLabelWidth" >
          <el-button size="small" @click="depthDialog = true">设置</el-button><i :class="depthFlag ? 'el-icon-success financial-icon financial-icon-succ':'el-icon-error financial-icon financial-icon-err'"></i>
        </el-form-item>
        <el-form-item prop="ratio" class="financial-form-item" label="收益比例" :label-width="formLabelWidth" >
          <el-input v-model="financialForm.ratio"></el-input>
        </el-form-item>
        <el-form-item class="financial-form-item" label="介绍规则" :label-width="formLabelWidth" >
          <el-button size="small" @click="ruleDialog = true">设置</el-button><i :class="ruleFlag ? 'el-icon-success financial-icon financial-icon-succ':'el-icon-error financial-icon financial-icon-err'"></i>
        </el-form-item>

        <el-form-item prop="minValue" class="financial-form-inline" label="起投金额"  :label-width="formLabelWidth">
          <el-input v-model="financialForm.minValue"></el-input>
        </el-form-item>
        <el-form-item  label="年化收益率" :label-width="formLabelWidth" >
          <el-input v-model="financialForm.incomeMin" class="financial-input"></el-input>
          ——
          <el-input v-model="financialForm.incomeMax" class="financial-input"></el-input>
        </el-form-item>
        <el-form-item prop="stopAt" class="financial-form-inline" label="结束时间" :label-width="formLabelWidth" >
          <el-date-picker
            type="datetime"
            v-model="financialForm.stopAt"
            value-format="timestamp"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="显示年化收益率" :label-width="formLabelWidth" >
          <el-input v-model="financialForm.showIncomeMin" class="financial-input"></el-input>
          ——
          <el-input v-model="financialForm.showIncomeMax" class="financial-input"></el-input>
        </el-form-item>
        <el-form-item class="financial-form-item" label="额度减少比例" :label-width="formLabelWidth" >
          <el-input v-model="financialForm.addSold"></el-input>
        </el-form-item>
        <el-form-item class="financial-form-item" label="单次收益" :label-width="formLabelWidth" >
          <el-input v-model="financialForm.nextIncome"></el-input>
        </el-form-item>
        <el-form-item  class="financial-form-item" label="是否前端展示"  :label-width="formLabelWidth">
          <el-switch :active-value="1" :inactive-value="0" v-model="financialForm.visible"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button :loading="subFlag" type="primary" @click="subForm('financialForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :show-close="false" :visible="ruleDialog" center >
      <el-form :model="financialForm.content">
        <el-form-item label="产品介绍" :label-width="formLabelWidth">
          <div class="edit_container">
            <el-upload
              class="avatar-uploader"
              :action="imgBase"
              :data="imgObj"
              :show-file-list="false"
              :on-success="uploadSuccess"
              :on-error="uploadError"
              :before-upload="beforeUpload">
            </el-upload>
            <el-row v-loading="quillUpdateImg">
              <quill-editor
                v-model="financialForm.content.content"
                ref="myQuillEditor"
                :options="editorOption"

              >
              </quill-editor>
            </el-row>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ruleDialog = false">取 消</el-button>
        <el-button :loading="subFlag" type="primary" @click="subRuleDialog">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :show-close="false" :visible="depthDialog" center >
      <el-input  type="number" max="20" min="0" placeholder="请输入内容" v-model.name="financialForm.depth">
        <template slot="prepend">提成层级：</template>
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="depthDialog = false">取 消</el-button>
        <el-button :loading="subFlag" type="primary" @click="subDepthDialog">确 定</el-button>
      </div>
      <el-table
        :data="financialForm.details"
        border
        height="500"
        style="margin-top:20px;width: 100%;height:500px; overflow-y: auto;">
        <el-table-column
          prop="depth"
          label="层级">
        </el-table-column>
        <el-table-column
          label="提成比例">
          <template slot-scope="scope">
            <el-input style="width:100px;" type="number" min="0" max="100" v-model="financialForm.details[scope.$index].ratio"></el-input> %
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import { quillEditor } from "vue-quill-editor"; //调用编辑器
  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.snow.css';
  import 'quill/dist/quill.bubble.css';
  //window.urlData.url + '/block/sign/import'
  export default {
    name: 'financial',
    components: {
      quillEditor,
    },
    data() {
      const validatorIncome = (rule, value, callback) => {
        if (!this.financialForm.incomeMax || !this.financialForm.incomeMin) {
          callback(new Error('请输入年化收益率'));
        } else {
          callback();
        }
      };
      let that = this;
      return {
        quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
        serverUrl: window.urlData.ossObj.host,  // 这里写你要上传的图片服务器地址
        detailContent: '', // 富文本内容
        editorOption: {
          placeholder: '请输入介绍内容',
          theme: 'snow',  // or 'bubble'
          type: 'file',
          modules: {
            toolbar: {
              container: window.urlData.toolbarOptions,  // 工具栏
              handlers: {
                'image': function (value) {
                  if (value) {
                    // 触发input框选择图片文件
                    document.querySelector('.avatar-uploader input').click()
                    that.$store.dispatch('getOssObj').then((res) => {
                      that.ossObj = res;
                      that.imgObj.policy = res.policy;
                      that.imgObj.signature = res.signature
                    }).catch((err) => {
                      that.$message.error(err)
                    })
                  } else {
                    this.quill.format('image', false);
                  }
                }
              }
            }
          }
        },  // 富文本编辑器配置
        imgObj: {
          name: '',
          key: '',
          policy: '',
          OSSAccessKeyId: window.urlData.ossObj.accessid,
          success_action_status: '200',
          signature: ''
        },
        imgBase: window.urlData.ossObj.host,
        limit: 1,






        dialogFormVisible: false,
        searchText: '',
        dialogTitle: true,
        depthFlag: false,
        ruleFlag: false,
        ruleDialog: false,
        depthDialog: false,
        financialRule: {
          name: [
            { required: true, message: '请输入项目名称', trigger: 'blur' }
          ],
          baseTokenId: [
            { required: true, message: '请输入理财币种', trigger: 'blur' }
          ],
          depth: [
            { required: true, message: '请输入提成层级', trigger: 'blur' }
          ],
          incomeMax: [
            { required: true, message: '请输入收益率上限', trigger: 'blur' }
          ],
          incomeMin: [
            { required: true, message: '请输入收益率下限', trigger: 'blur' }
          ],
          limitValue: [
            { required: true, message: '请输入总额度上限', trigger: 'blur' }
          ],
          minValue: [
            { required: true, message: '请输入起投金额', trigger: 'blur' }
          ],
          ratio: [
            { required: true, message: '请输入收益比例', trigger: 'blur' }
          ],
          stopAt: [
            { required: true, message: '请选择结束时间', trigger: 'blur' }
          ],
          times: [
            { required: true, message: '请输入次数/天数', trigger: 'blur' }
          ],
          tokenId: [
            { required: true, message: '请选择收益币种', trigger: 'blur' }
          ],
          userLimit: [
            { required: true, message: '请输入用户限额', trigger: 'blur' }
          ],
          income: [
            { required: true, validator: validatorIncome }
          ]
        },
        financialForm: {
          name: '',
          needSign: 1,
          baseTokenId: '',
          baseTokenName: '',
          content: {
            content: '',
          },
          depth: '',
          addSold: '',
          details: [],
          incomeMax: '',
          incomeMin: '',
          limitValue: '',
          showIncomeMin: '',
          showIncomeMax: '',
          nextIncome: '',
          minValue: '',
          ratio: '',
          startAt: new Date().getTime(),
          stopAt: '',
          times: '',
          tokenId: '',
          tokenName: '',
          userLimit: '',
          visible: 0
        },
        formLabelWidth: '150px',
        subFlag: false,
        pageNum: 1,
        copyFinancialForm: {},
        checkInType: [
          {
            id: 1,
            name: '签到'
          },
          {
            id: 0,
            name: '周期'
          }
        ]
      }
    },
    computed: {
      ...mapGetters({
        financialList: 'financialList',
        tokenList: 'tokenList',
        permission: 'permission',
        editor() {
          return this.$refs.myQuillEditor.quill;
        }
      })
    },
    watch: {
      'financialForm.depth': {
        handler(n,o) {
          n = Number(n);
          o = Number(o);
          if (!this.depthDialog && !this.dialogTitle) return;
          if (n > 20 || n <= 0) {
            this.financialForm.depth = '';
            this.financialForm.details = [];
            this.depthFlag = false;
            return
          }
          this.depthFlag = true;
          if (this.dialogTitle) {
            this.financialForm.details = this.addDepthItem(0, n);
            return;
          }
          if (n-o > 0) {
            this.financialForm.details.unshift(...this.addDepthItem(o, n))
          } else if (n-o < 0) {
            this.financialForm.details.splice(0,o-n)
          }

        }
      }
    },
    mounted() {
      this.projectData();
      this.copyFinancialForm = Object.assign({}, this.financialForm);
    },
    methods: {

      beforeUpload(res, file) {
        let isJPG = false
        isJPG = res.type === 'image/jpeg' || res.type === 'image/png' || res.type === 'image/jpg'
        const isLt2M = res.size / 1024 / 1024 < this.limit
        this.imgObj.key = this.calculate_object_name(res.name)
        if (!isJPG) {
          this.$message.error(`只支持${this.payload}格式!`)
        }
        if (!isLt2M) {
          this.$message.error(`上传文件大小不能超过 ${this.limit}MB!`)
        }
        this.quillUpdateImg = true
        return isJPG && isLt2M

      },
      // 上传图片成功
      uploadSuccess(res, file) {
        let quill = this.$refs.myQuillEditor.quill
        let length = quill.getSelection().index;
        let  imageUrl = this.imgBase + '/' + this.imgObj.key
        quill.insertEmbed(length, 'image', imageUrl)
        quill.setSelection(length + 1)
        this.quillUpdateImg = false
      },
      // 上传图片失败
      uploadError(res, file) {
        this.quillUpdateImg = false
        this.$message.error('图片插入失败')
      },
      random_string(len) {
        len = len || 32
        const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
        const maxPos = chars.length
        let pwd = ''
        for (let i = 0; i < len; i++) {
          pwd += chars.charAt(Math.floor(Math.random() * maxPos))
        }
        return pwd
      },

      get_suffix(filename) {
        const pos = filename.lastIndexOf('.')
        let suffix = ''
        if (pos !== -1) {
          suffix = filename.substring(pos)
        }
        return suffix
      },
      calculate_object_name(filename) {
        const nowStr =  new Date().getTime()
        const suffix = this.get_suffix(filename)
        return this.ossObj.dir + '/' + nowStr + this.random_string(10) + suffix
      },










      // 上传图片成功


      tokenFun(v, l) {
        let obj = {};
        obj = this.tokenList.find((item) => {
          return item.tokenId === v;
        });
        this.financialForm[l] = obj.tokenName;
      },
      handleCurrentChange(v) {
        this.pageNum = v;
        this.projectData()
      },
      editManage(id) {
        this.dialogTitle = false;
        this.$store.dispatch('getFinancialListById', `/${id}`).then((res) => {
          Object.assign(this.financialForm, res);
          this.dialogFormVisible = true;
          this.ruleFlag = true;
          this.depthFlag = true;
        }).catch();
      },
      projectData() {
        this.$store.dispatch('getFinancialList', `?financialName=${this.searchText}&orderBy=created_at desc&pageNum=${this.pageNum}&pageSize=20`);
      },
      dialogClose() {
        this.financialForm = Object.assign({}, this.copyFinancialForm);
        this.dialogTitle = true;
        this.$refs['financialForm'].clearValidate();
        this.depthFlag = false;
        this.ruleFlag = false;
      },
      subForm(n) {
        this.$refs[n].validate((valid) => {
          if (!this.depthFlag || !this.ruleFlag) {
            this.$message.error('请设置提成层级或介绍规则');
            return;
          }
          this.subFlag = true;
          if (valid) {
            this.$store.dispatch(this.dialogTitle ? 'createFinancial' : 'modifyFinancial', this.financialForm).then(() => {
              this.subFlag = false;
              this.dialogFormVisible = false;
              this.projectData();
            }).catch(() => {
              this.subFlag = false;
            })
          }
        })
      },
      subRuleDialog() {
        // this.financialForm.content.content.replace(/\s/ig,'') && this.financialForm.content.rule.replace(/\s/ig,'')
        if (this.financialForm.content.content) {
          this.ruleFlag = true;
        } else {
          this.ruleFlag = false;
        }
        this.ruleDialog = false;
      },
      subDepthDialog() {
        if (this.financialForm.depth > 20 || this.financialForm.depth <=0) return;
        this.depthDialog = false;
      },
      addDepthItem(n, m) {
        let l = [];
        for (let i = n; i < m; i++) {
          l.unshift({
            depth: i + 1,
            ratio: 0,
          });
        }
        return l
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .financial{
    padding:20px;
    .financial-form-item{
      width:45%;
      display: inline-block;
    }
    .financial-form-inline{
      & .el-date-editor{
        width:100%;
      }
    }
    .financial-input{
      display: inline-block;
      width:40.8%;
    }
    .financial-icon{
      font-size:24px;
      position: relative;
      left:10px;
      top:3px;
    }
    .financial-icon-succ{
      color:#00ff00;
    }
    .financial-icon-err{
      color:red;
    }

  }
</style>
