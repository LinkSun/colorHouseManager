<template>
  <div class="my-comtaint">
    <el-form ref="form" :model="form" label-width="145px">

      <el-form-item label="楼盘来源:">
        <el-select v-model="form.belongValue" class="my-input" placeholder="请选择来源">
          <el-option :label="item" :value="item" v-for="(item, index) in form.belong" :key="index"></el-option>

        </el-select>
      </el-form-item>
      <el-form-item label="签到状况:">
        <el-select v-model="form.appoint_statusValue" class="my-input" placeholder="请选择签到状况">
          <el-option :label="item.name" :value="item.name" v-for="(item, index) in form.appoint_status" :key="index"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="项目id:">
        <el-input v-model="form.cst_proj" class="my-input"></el-input>&nbsp;

      </el-form-item>

      <el-form-item label="是否同步饭票宝项目:">
        <el-select v-model="form.ticketValue" class="my-input" placeholder="请选择是否同步饭票宝">
          <el-option :label="item" :value="item" v-for="(item, index) in form.ticket" :key="index"></el-option>

        </el-select>
      </el-form-item>
      <el-form-item label="尊享饭票项目id:">

        <el-input v-model="form.zx_proj" class="my-input"></el-input>&nbsp;

      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>

    </el-form>
    <!-- 上传图片1 -->

  </div>
</template>
<script>
import httpClient from '@/utils/request'

export default {
  data() {
    return {
      form: {
        bid: 0,
        belong: [],
        belongValue: '',
        appoint_status: [],
        appoint_statusValue: [],
        name: '',
        money: null,
        categery: '',
        area1: null,
        area2: null,
        huxing: '',
        years: null,
        date1: '',
        desc1: '',
        desc2: '',
        inputValue: '',
        dynamicTags: ['公交直达', '地铁旁', '绿化率高'],
        radio: 1
      },
      dialogImageUrl: '',
      dialogVisible: false,
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false
    }
  },
  mounted() {
    // 可以得到id
    this.form.bid = this.$route.params.id
    this.getMouted()
  },
  methods: {
    getMouted() {
      httpClient
        .get('admin/build/select')
        .then(res => {
          console.log(res)
          this.form.belong = res.content.belong
          let obj = res.content.appoint_status
          let arr = []
          for (const key in obj) {
            arr.push({ index: key, name: obj[key] })
          }
          this.form.appoint_status = arr

          this.form.ticket = res.content.ticket
        })
        .catch()
    },
    //   getMouted(){
    //       httpClient.get('admin/joint/detail?bid='+this.form.bid
    //       ).then(res=>{
    //           console.log(res)

    //       }).catch()
    //   },
    onSubmit() {
      let arr = this.form.appoint_status.filter(v => {
        if (v.name == this.form.appoint_statusValue) {
          return true
        }
      })
      let index = arr[0].index

      console.log('上传')
      httpClient
        .post('admin/set/joint', {
          bid: this.form.bid,
          belong: this.form.belongValue,
          need_sign: index,
          cst_proj: this.form.cst_proj,
          zx_proj: this.form.zx_proj,
          ticket: this.form.ticketValue
        })
        .then(res => {
          if (res.code == 0) {
            this.$message({
              message: res.message,
              type: 'success'
            })
            
          }
          console.log(res)
        })
        .catch()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      // this.dialogVisible = true
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  }
}
</script>
<style>
.my-input {
  width: 200px;
}

.my-input1 {
  width: 400px;
}

.area {
  width: 120px;
}

.my-comtaint {
  position: relative;
}

.my-right {
  position: absolute;
  top: 0;
  left: 450px;
}

.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>


