
<template>
    <div class='banner-containt'>

        <el-form ref="form" :model="form" label-width="100px">

            <el-form-item label="名称:" class='my-width' required>

                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="图片:" required>

                
                <!-- <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :limit="1" :on-exceed="handleExceed" :auto-upload="true" name="photo" :on-success="mySuccess"> -->
                
                <el-upload action="https://salesv2-ccw-test.colourlife.com/upload/image/5" list-type="picture-card" :limit="1" :on-exceed="handleExceed" :auto-upload="true" name="photo" :on-success="mySuccess">
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                        <span class="el-upload-list__item-actions">
                            <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                <i class="el-icon-zoom-in"></i>
                            </span>
                            <span v-if="!disabled" class="el-upload-list__item-delete">
                                <i class="el-icon-download"></i>
                            </span>
                            <span v-if="!disabled" class="el-upload-list__item-delete">
                                <i class="el-icon-delete"></i>
                            </span>
                        </span>
                    </div>
                </el-upload>
                <div>(尺寸:750*410)</div>
            </el-form-item>

            <el-form-item label="跳转链接:" class='my-width' required>

                <el-input v-model="form.address"></el-input>

            </el-form-item>

            <el-form-item label="上下线时间:" class='my-width' required>

                <!-- <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
                <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
            </el-col> -->

                <div class="block">

                    <el-date-picker v-model="value1" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00']">
                    </el-date-picker>
                </div>

            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>

            </el-form-item>
        </el-form>
    </div>

</template>

<script>
import httpClient from '@/utils/request'

export default {
  name: 'banner',
  data() {
    return {
      value1: '', //时间
      imagesValue: '',

      form: {
        name: '', //楼盘名称
        address: '', //链接
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
      handleExceed(){
          this.$message.warning("一次只能上传一张哦")
      },
    onSubmit() {
      console.log('submit!')

      // 非空判断
      if (
        this.form.name == '' ||
        this.imagesValue == '' ||
        this.form.address == '' ||
        this.value1 ==''
      ) {
        alert('请填写完整哦')
        return
      } else {
        httpClient
          .post('admin/add/banner', {
            name: this.form.name,
            image: this.imagesValue,

            url: this.form.address,
            put_time: this.value1[0],
            pull_time: this.value1[1]
          })
          .then(res => {
            console.log(res)
          })
          .catch()
      }
    },
    mySuccess(res) {
      console.log('进到这里,已上传')

      console.log(res)
      this.imagesValue=res.content.photoPath;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>
<style>
.banner-containt {
  padding-top: 20px;
}

.my-width {
  width: 500px;
}
</style>

