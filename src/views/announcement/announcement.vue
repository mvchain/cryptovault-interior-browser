<template>
  <div class="announcement">
    <el-row style="margin-bottom:20px;">
      <el-col :span="18">
        <el-button  @click="dialogFormVisible = true;" >新建公告</el-button>
      </el-col>
    </el-row>
    <el-table
      border
      :data="bannerList"
      style="width: 100%">
      <el-table-column
        label="创建日期">
        <template slot-scope="scope">
          {{new Date(scope.row.createdAt).toLocaleString()}}
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button size="small" @click="editBanner(scope.row)">编辑</el-button>
          <el-button size="small" @click="deleteBanner(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :close-on-click-modal="false" @close="dialogClosed" :show-close="false" :visible="dialogFormVisible" center >
      <el-form :model="bannerFrom">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="bannerFrom.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth">
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
                v-model="bannerFrom.content"
                ref="myQuillEditor"
                :options="editorOption"

              >
              </quill-editor>
            </el-row>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button :loading="subFlag" type="primary" @click="subRuleDialog">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import { quillEditor } from "vue-quill-editor"; //调用编辑器
  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.snow.css';
  import 'quill/dist/quill.bubble.css';
  export default {
    name: 'announcement',
    components: {
      quillEditor,
    },
    data() {
      let that = this;
      return {
        quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
        serverUrl: window.urlData.ossObj.host,  // 这里写你要上传的图片服务器地址
        detailContent: '', // 富文本内容
        editorOption: {
          placeholder: '请输入公告内容',
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
        subFlag: false,
        formLabelWidth: '150px',
        bannerFrom: {
          title: '',
          content: ''
        }
      }
    },
    computed: {
      ...mapGetters({
        bannerList: 'bannerList'
      }),
      editor() {
        return this.$refs.myQuillEditor.quill;
      }
    },
    mounted() {
      this.getBannerData()
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
        const nowStr = new Date().getTime()
        const suffix = this.get_suffix(filename)
        return this.ossObj.dir + '/' + nowStr + this.random_string(10) + suffix
      },




      getBannerData() {
        this.$store.dispatch('getBannerList')
          .then()
          .catch()
      },
      editBanner(obj) {
        this.bannerFrom  = obj;
        this.dialogFormVisible = true
      },
      deleteBanner(id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('deleteBannerList', id)
            .then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getBannerData()
            })
            .catch()
        }).catch();

      },
      dialogClosed() {
        this.bannerFrom = {}
      },
      subRuleDialog() {
        this.$store.dispatch('postBannerList', this.bannerFrom)
          .then(() => {
            this.dialogFormVisible = false
            this.$message.success('提交成功')
            this.getBannerData()
          })
          .catch()
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .announcement{
    padding:20px;
    .avatar-uploader{
      display: none;
    }
  }
</style>
