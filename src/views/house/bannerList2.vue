<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">

            <!-- <el-form :inline="true" :model="query" class="demo-form-inline"> -->

            <!-- <el-form-item> -->
            <!-- <el-button type="primary" @click="createPermission">添加banner</el-button> -->
            <!-- <el-button type="primary" @click="dialogFormVisible = true">添加banner</el-button> -->
            <!-- </el-form-item> -->
            <!-- </el-form> -->

        </div>
        <el-table :key='tableKey' :data="list" v-loading="listLoading" border fit highlight-current-row style="width: 100%;" @selection-change="handleSelectionChange">
            <el-table-column align="center" label="ID" width="40">

                <template scope="scope">
                    <span>{{scope.row.id}}</span>
                    <!-- <span>1</span> -->
                </template>
            </el-table-column>
            <el-table-column align="center" label="名称">
                <template scope="scope">
                    <span>{{scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="图片">
                <template scope="scope">
                    <img :src="scope.row.image" alt="" class="my-image">
                </template>
            </el-table-column>

            <el-table-column align="center" label="上架时间">
                <template scope="scope">
                    <span>{{scope.row.pull_time}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="下架时间">
                <template scope="scope">
                    <span>{{scope.row.put_time}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="跳转链接" width="300">
                <template scope="scope">
                    <span>{{scope.row.url}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="点击量">
                <template scope="scope">
                    <span>{{scope.row.click_num}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="当前状态">
                <template scope="scope">
                    <span>{{scope.row.state_name}}</span>
                    <!-- <span v-else>禁用</span> -->
                </template>
            </el-table-column>
            <el-table-column align="center" label="最近操作人">
                <template scope="scope">
                    <span>{{scope.row.user}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="最近操作时间">
                <template scope="scope">
                    <span>{{scope.row.created_at}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="操作">
                <template scope="scope">
                    <div class="my-edit">
                        <el-button type="primary" @click="update(scope.row)" size="small">编辑</el-button>
                        <el-button type="danger" size="small" @click="checkState(scope.row)">{{scope.row.state_name}}</el-button>
                    </div>

                </template>
            </el-table-column>

        </el-table>

        <div v-show="!listLoading" class="pagination-container" style="margin-top:10px;text-align:right">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="query.page" :page-sizes="[20,40,60]" :page-size="query.page_size" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

        <!-- 添加弹窗 -->
        <!-- <el-dialog title="添加业主" :visible.sync="dialogFormVisible" width="50%">
            <el-form :ref="form" :model="form" label-width="120px">
                <el-form-item label="项目名称" required>
                    <el-input v-model="form.community_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="项目uuid">
                    <el-input v-model="form.community_uuid" autocomplete="off" placeholder="选填"></el-input>
                </el-form-item>
                <el-form-item label="房号" required>
                    <el-input v-model="form.room_no" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="业主姓名" required>
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="业主手机" required>
                    <el-input v-model="form.mobile" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="formSubmit">提 交</el-button>
            </div>
        </el-dialog> -->

        <!-- 编辑弹窗 -->
        <el-dialog title="编辑轮播图" :visible.sync="dialogFormUpdateVisible" width="50%">
            <el-form ref="form" :model="formUpdate" label-width="100px">

                <el-form-item label="名称:" class='my-width' required>

                    <el-input v-model="formUpdate.name"></el-input>
                </el-form-item>
                <!-- <el-form-item label="原来图片:" class='my-width' >

                <image :src="formUpdate.image" class="editImage"/>
            </el-form-item> -->
                <el-form-item label="上传新图片:" required>

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

                    <el-input v-model="formUpdate.url"></el-input>

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

                        <el-date-picker v-model="formUpdate.value" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00']">
                        </el-date-picker>
                    </div>

                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="formSubmit">保存</el-button>

                </el-form-item>
            </el-form>

            <!-- <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormUpdateVisible = false">取 消</el-button>
                <el-button type="primary" @click="formUpdateSubmit">提 交</el-button>
            </div> -->
        </el-dialog>
        <!-- 我增加的添加弹框 -->
        <!-- <el-dialog title="添加轮播图" :visible.sync="dialogFormVisible">
            <el-form :ref="formUpdate" :model="formUpdate" label-width="120px">
                <el-form-item label="名称" >
                    <el-input v-model="formUpdate.community_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="图片">
                    <el-upload action="https://salesv2-ccw-test.colourlife.com/upload/image/5" list-type="picture-card" :auto-upload="true" name="photo" :on-success="mySuccess">
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
                <el-form-item label="上架时间">
                    <el-input v-model="formUpdate.room_no" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="下架时间" >
                    <el-input v-model="formUpdate.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="跳转链接" >
                    <el-input v-model="formUpdate.mobile" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="点击量" >
                    <el-input v-model="formUpdate.mobile" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="当前状态" >
                    <el-input v-model="formUpdate.mobile" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="最近操作人" >
                    <el-input v-model="formUpdate.mobile" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="最近操作时间" >
                    <el-input v-model="formUpdate.mobile" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">添加</el-button>
            </div>
        </el-dialog> -->
    </div>
</template>

<script>
import httpClient from '@/utils/request'
// import { formatDate } from '@/utils/index'

export default {
  name: 'bookingList',
  data() {
    return {
      value1: [],
      state: 0,
      dialogImageUrl: '',
      dialogVisible: false, //图片上传
      list: [],
      total: 0,
      id: 0,
      listLoading: true,
      proprietorState: [],
      appointStatus: [],
      query: {
        page: 1,
        page_size: 20
      },
      //   query: {
      //     page: 1,
      //     page_size: 20,
      //     label: '',
      //     mobile: '',
      //     appoint_date: '',
      //     status: ''
      //   },
      value: '',
      tableKey: 0,
      formLabelWidth: '120px',
      // 添加弹窗
      dialogFormVisible: false,
      form: {
        community_name: '',
        community_uuid: '',
        room_no: '',
        name: '',
        mobile: ''
      },
      // 编辑弹窗
      dialogFormUpdateVisible: false,
      formUpdate: {
        banner_id: 0,
        name: '',
        image: 'test.com',
        url: '',
        value: []
      }
    }
  },
  // filters: {
  //     formatDate(param) {
  //         if (param == 0) {
  //             return ''
  //         }
  //         let date = new Date(param * 1000)
  //         return formatDate(date, 'yyyy-MM-dd hh:mm')
  //     },
  //     formatColor(param) {
  //         let primary = 'color:#409EFF;'
  //         let info = 'color:#909399;'
  //         let success = 'color:#67C23A;'
  //         let warning = 'color:#E6A23C;'
  //         let danger = 'color:#F56C6C;'

  //         if (param == 1) {
  //             return  danger
  //         }
  //         return info
  //     }
  // },
  created() {
    this.getList()
    // this.getmykData()
  },
  methods: {
    handleExceed() {
      this.$message.warning('一次只能上传一张哦')
    },
    handleExceed() {
      this.$message.warning('一次只能上传一张哦')
    },
    //   启用切换
    checkState(value) {
      let state = value.state == 1 ? 0 : 1
      let id = value.id
      httpClient
        .post('admin/banner/state', { banner_id: id, state: state })
        .then(response => {
          console.log(response)
          this.getList()
        })
    },
    mySuccess(res) {
      console.log('进到这里,已上传')
      console.log(res)
      this.imagesValue = res.content.photoPath
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleSizeChange(val) {
      this.query.page_size = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.query.page = val
      this.getList()
    },
    getList() {
      this.listLoading = true
      //   this.query.appoint_date = this.value
      //   httpClient
      //     .get('admin/appoint/list', { params: this.query })
      //     .then(response => {
      //       const data = response.content
      //       this.list = data.list
      //       this.total = data.total
      //       this.proprietorState = data.proprietorState
      //       this.listLoading = false
      //     })
      // 轮播图接口
      httpClient
        .get('admin/banner/list', { params: this.query })
        .then(response => {
          const data = response.content
          this.list = data.list
          this.total = data.total
          this.proprietorState = data.proprietorState
          this.listLoading = false
        })
    },
    getmykData() {
      this.listLoading = true
      httpClient.get('admin/build/select').then(response => {
        const data = response.content
        this.appointStatus = data.appoint_status
      })
    },
    onSearch(column) {
      this.getList()
    },


    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 添加弹窗
    createPermission() {
      this.dialogFormVisible = true
      this.form.room_no = ''
      this.form.name = ''
      this.form.mobile = ''
    },
    // 编辑提交信息
    formSubmit() {
      httpClient
        .post('admin/add/banner', {
          banner_id: this.formUpdate.banner_id,
          name: this.formUpdate.name,
          image: this.formUpdate.image,
          // image:'test.com',
          url: this.formUpdate.url,
          put_time: this.formUpdate.value[0],
          pull_time: this.formUpdate.value[1]
        })
        .then(response => {
          if (response.code == 0) {
            this.$message({
              type: 'success',
              message: response.message
            })
            this.getList()
            this.dialogFormUpdateVisible = false
          }
        })
    },
    // 编辑获取信息的事件
    update(value) {
      //   this.id = id
      //   this.dialogFormUpdateVisible = true
      //   httpClient.get('admin/house/proprietor/show/' + id).then(response => {
      //     const data = response.content
      //     this.formUpdate.community_name = data.proprietor.community_name
      //     this.formUpdate.community_uuid = data.proprietor.community_uuid
      //     this.formUpdate.room_no = data.proprietor.room_no
      //     this.formUpdate.name = data.proprietor.name
      //     this.formUpdate.mobile = data.proprietor.mobile
      //   })
      console.log(value)

      this.formUpdate.banner_id = value.id
      this.dialogFormUpdateVisible = true
      httpClient
        .get('admin/banner/one?banner_id=' + value.id)
        .then(response => {
        

          this.formUpdate.name = response.content.list.name
          //    this.formUpdate.image=response.content.list.image;
          //    this.formUpdate.url=response.content.list.url;
          //    this.formUpdate.value[0]=response.content.list.put_time;
          //    this.formUpdate.value[1]=response.content.list.pull_time;
        })
    },

    formUpdateSubmit() {
      //   this.$message('提交中...')
      //   httpClient
      //     .post('admin/house/proprietor/update/' + this.id, this.formUpdate)
      //     .then(response => {
      //       this.dialogFormUpdateVisible = false
      //       this.$message({
      //         type: 'success',
      //         message: '操作成功'
      //       })
      //       this.getList()
      //     })
      this.dialogFormUpdateVisible = true
      // 非空判断
      if (
        this.form.name == '' ||
        this.imagesValue == '' ||
        this.form.address == '' ||
        this.value1 == ''
      ) {
        alert('请填写完整哦')
        return
      } else {
        httpClient
          .post('admin/add/banner', {
            banner_id: 19,
            name: this.form.name,
            image: this.imagesValue,

            url: this.form.address,
            put_time: this.value1[0],
            pull_time: this.value1[1]
          })
          .then(res => {
            console.log(res)
            this.$message({
              type: 'success',
              message: '操作成功'
            })
            this.dialogFormUpdateVisible = false
          })
          .catch()
      }
    }
  }
}
</script>

<style lang="css">
.fileinput {
  display: none;
}
.my-primary {
  color: #169bd5;
  border: 1px solid #169bd5;

  background-color: #fff;
}
.gutter {
  display: block !important;
}
.my-input {
  width: 300px;
}
.cell {
  color: black !important;
}
.my-edit {
  display: flex;
}
.my-image {
  width: 80px;
  height: 34px;
}
.my-width {
  width: 500px;
}
.editImage {
  width: 150px;
  height: 150px;
  display: block;
}
</style>