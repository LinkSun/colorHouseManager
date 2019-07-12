<template>
  <div class="my-comtaint">
    <el-form ref="form" :model="form" label-width="130px">
      <el-form-item label="添加相册分类:">
        <el-input v-model="form.inputValue" class="my-input"></el-input>&nbsp;

        <el-button type="primary" @click="addCategary">添加</el-button>
      </el-form-item>
      <el-form-item label="选择相册分类:">
        <el-select v-model="form.region" placeholder="请选择相册分类" class="my-input">
          <el-option label="效果图" value="shanghai"></el-option>
          <el-option label="沙盘" value="beijing"></el-option>
          <el-option label="户型" value="beijing1"></el-option>
          <el-option label="周边" value="beijing2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="添加相册图片:">
        <!-- 1.在线版已处理好的跨域 -->
        <!-- <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :auto-upload="true"

 name="photo" :on-success="mySuccess"> -->
        <!-- 2.真实上线用的 -->
        <!-- <el-upload action="https://salesv2-ccw-test.colourlife.com/upload/image/5" list-type="picture-card" :auto-upload="true" name="photo"
          :on-success="mySuccess">
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
        </el-upload> -->
        <!-- 3.phpstudy测试版本地使用普通上传文件方式 -->
        <el-upload action="http://localhost:8080/parking/public/upload/image/5" list-type="picture-card" :auto-upload="false" name="photo"
          :on-change="myPost" :on-success="mySuccess">
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

      </el-form-item>

      <el-form-item label="选择相册分类:">
        <el-select v-model="form.region" placeholder="请选择活动区域" class="my-input">
          <el-option label="效果图" value="shanghai"></el-option>
          <el-option label="沙盘" value="beijing"></el-option>
          <el-option label="户型" value="beijing1"></el-option>
          <el-option label="周边" value="beijing2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="添加户型分类:">
        <el-input v-model="form.name" class="my-input"></el-input>&nbsp;
        <el-button type="primary">添加</el-button>
      </el-form-item>
      <el-form-item label="选择户型类型:">
        <el-select v-model="form.region" placeholder="请选择活动区域" class="my-input">
          <el-option label="效果图" value="shanghai"></el-option>
          <el-option label="沙盘" value="beijing"></el-option>
          <el-option label="户型" value="beijing1"></el-option>
          <el-option label="周边" value="beijing2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="建筑面积:">
        <el-input v-model="form.area1" class="area"></el-input>&nbsp;㎡

      </el-form-item>
      <el-form-item label="是否添加标签:">
        <el-radio v-model="form.radio" label="1">是</el-radio>
        <el-radio v-model="form.radio" label="2">否</el-radio>
        <br>
        <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
          {{tag}}
        </el-tag>
        <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm">
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>

      </el-form-item>
      <el-form-item label="原生form测试:">
        <form action="https://salesv2-ccw-test.colourlife.com/upload/image/5" method="post" enctype="multipart/form-data">
          <input type="file" name="photo">
          <button>提交</button>
        </form>
      </el-form-item>
      <el-form-item label="添加户型图片:">
        <el-upload action="https://salesv2-ccw-test.colourlife.com/upload/image/5" list-type="picture-card" :auto-upload="true" name="photo"
          :on-success="mySuccess">
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
      </el-form-item>

      <el-form-item label="添加效果图图片:">
        <el-upload action="https://salesv2-ccw-test.colourlife.com/upload/image/5" list-type="picture-card" :auto-upload="true" name="photo"
          :on-success="mySuccess">
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
  import axios from 'axios';


  export default {
    data() {
      return {
        form: {
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
          radio: 1,
        },
        dialogImageUrl: '',
        dialogVisible: false,
        dynamicTags: ['标签一', '标签二', '标签三'],
        inputVisible: false,
        inputValue: '',
        // 最后一个上传图片
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,
      }
    },
    mounted() {
      // 可以得到id
      // console.log(this.$route.params.id)
    },
    methods: {
      // 本地phpstudy的测试上传的接口
      myPost(file) {
        console.log(file)
        axios.post('http://localhost:8080/parking/public/upload/image/5').then(res => {

          console.log(res);
        }).catch()
      },

      myRequest(file) {
        console.log(file)
      },

      onSubmit() {
        console.log('上传')
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
      },
      addCategary() {
        httpClient
          .post('admin/add/album/category', {
            name: this.form.inputValue,
          })
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
      },
      handleRemove(file) {
        console.log(file)
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },

      mySuccess(res) {
        console.log('进到这里,已上传')

        console.log(res)
      },
    },
  }

</script>
<style>
  .my-input {
    width: 300px;
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

  .el-tag+.el-tag {
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
