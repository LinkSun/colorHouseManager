<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">

            <el-form :inline="true" :model="query" class="demo-form-inline">
                <el-form-item label="">
                    <el-input v-model="query.label" placeholder="楼盘名称"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="query.mobile" placeholder="预约人电话"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="query.mobile2" placeholder="推荐人电话"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-select v-model="query.status" placeholder="请选择状态">
                        <el-option v-for="(item, index) in appointStatus" :key="index" :label="item" :value="parseInt(index)"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-select v-model="query.status2" placeholder="请选择预约来源">
                        <!-- <el-option v-for="(item, index) in appointStatus2" :key="index" :label="item" :value="parseInt(index)"></el-option> -->
                        <el-option label="来源一" value="shanghai"></el-option>
                        <el-option label="来源二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-select v-model="query.status3" placeholder="请选择是否属于饭票宝">
                        <!-- <el-option v-for="(item, index) in appointStatus3" :key="index" :label="item" :value="parseInt(index)"></el-option> -->
                        <el-option label="是" value="shanghai"></el-option>
                        <el-option label="否" value="beijing"></el-option>
                    </el-select>
                </el-form-item>

                <!-- <el-form-item label="">
                    <el-date-picker
                        v-model="value"
                        type="date"
                        placeholder="选择预约日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item> -->

                <el-form-item>
                    <el-button type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button class="my-primary" type="primary" @click="onSearch2">清空查询</el-button>

                </el-form-item>
                <!-- <el-form-item>
                    <el-button type="primary" @click="createPermission">添加业主</el-button>
                </el-form-item> -->
            </el-form>

        </div>
        <el-table :key='tableKey' :data="list" v-loading="listLoading" border fit highlight-current-row style="width: 100%;" @selection-change="handleSelectionChange">

            <el-table-column type="selection" width="40">

            </el-table-column>

            <el-table-column align="center" label="id" width="40">

                <template scope="scope">
                    <span>{{scope.row.build2}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="楼盘名称">
                <template scope="scope">
                    <span>{{scope.row.build}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="预约人姓名">
                <template scope="scope">
                    <span>{{scope.row.nickname2}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="预约人电话">
                <template scope="scope">
                    <span>{{scope.row.mobile}}</span>
                </template>
            </el-table-column>

            <!-- <el-table-column align="center" label="预约时间" width="220">
                <template scope="scope">
                    <span>{{scope.row.appoint_date}}{{scope.row.appoint_time}}</span>
                </template>
            </el-table-column> -->

            <el-table-column align="center" label="预约来源">
                <template scope="scope">
                    <span>{{scope.row.type}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="推荐人姓名">
                <template scope="scope">
                    <span>{{scope.row.origin2}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="推荐人电话">
                <template scope="scope">
                    <span>{{scope.row.origin}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="创建时间">
                <template scope="scope">
                    <span>{{scope.row.created_at}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="当前状态">
                <template scope="scope">
                    <span>{{scope.row.status}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="备注">
                <template scope="scope">
                    <!-- <span>{{scope.row.status2}}</span> -->
                    <el-tag type="warning">饭票宝{{scope.row.status2}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" label="流转节点">
                <template scope="scope">
                    <!-- <span>{{scope.row.status2}}</span> -->
                    <!-- <el-tag @click="dialogTableVisible = true">查看详情{{scope.row.status2}}</el-tag> -->
                    <el-button type="primary" @click="dialogTableVisible = true" plain>查看详情</el-button>
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
        <!-- <el-dialog title="编辑业主" :visible.sync="dialogFormUpdateVisible" width="50%">
            <el-form :ref="formUpdate" :model="formUpdate" label-width="120px">
                <el-form-item label="项目名称" required>
                    <el-input v-model="formUpdate.community_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="项目uuid">
                    <el-input v-model="formUpdate.community_uuid" autocomplete="off" placeholder="选填"></el-input>
                </el-form-item>
                <el-form-item label="房号" required>
                    <el-input v-model="formUpdate.room_no" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="业主姓名" required>
                    <el-input v-model="formUpdate.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="业主手机" required>
                    <el-input v-model="formUpdate.mobile" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormUpdateVisible = false">取 消</el-button>
                <el-button type="primary" @click="formUpdateSubmit">提 交</el-button>
            </div>
        </el-dialog> -->

        <!-- 我添加的弹框
         -->
        <el-dialog title="流转节点" :visible.sync="dialogTableVisible" class="my-title">
            <div class="my-flex">
                <button type="primary">待签到</button><div>2019-7-21 16:10:23</div>
                
            </div>
            <div class="my-flex my-flex2">
                <button type="primary">已取消</button><div>2019-7-21 16:10:23</div>
                
            </div>
        </el-dialog>
    </div>
</template>

<script>
import httpClient from '@/utils/request'
// import { formatDate } from '@/utils/index'

export default {
  name: 'bookingList',
  data() {
    return {
      dialogTableVisible: false,

      list: [],
      total: 0,
      id: 0,
      listLoading: true,
      proprietorState: [],
      appointStatus: [],
      query: {
        page: 1,
        page_size: 20,
        label: '',
        mobile: '',
        appoint_date: '',
        status: ''
      },
      value: '',
      tableKey: 0
      // 添加弹窗
      // dialogFormVisible: false,
      // form: {
      //     community_name: '',
      //     community_uuid: '',
      //     room_no: '',
      //     name: '',
      //     mobile: ''
      // },
      // 编辑弹窗
      // dialogFormUpdateVisible: false,
      // formUpdate: {
      //     community_name: '',
      //     community_uuid: '',
      //     room_no: '',
      //     name: '',
      //     mobile: ''
      // },
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
    this.getmykData()
  },
  methods: {
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
      this.query.appoint_date = this.value
      httpClient
        .get('admin/appoint/list', { params: this.query })
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
    onSearch2(column) {},
    // confirmDelete(id) {
    //     this.$confirm('确认要进行该操作吗？')
    //         .then(_=> {
    //             httpClient.post('admin/house/proprietor/delete/' + id).then(response => {
    //                 this.getList()
    //             })
    //         }).catch(_ => {})
    // },

    handleSelectionChange(val) {
      this.multipleSelection = val
    }
    // 添加弹窗
    // createPermission() {
    //     this.dialogFormVisible = true
    //     this.form.room_no = ''
    //     this.form.name = ''
    //     this.form.mobile = ''
    // },
    // formSubmit() {
    //     this.$message('提交中...')
    //     httpClient.post('admin/house/proprietor', this.form).then(response => {
    //         this.dialogFormVisible = false
    //         this.$message({
    //             type: 'success',
    //             message: '操作成功'
    //         })
    //         this.getList()
    //     })
    // },
    // 编辑弹窗
    // update(id) {
    //     this.id = id
    //     // this.$refs['formUpdate'].resetFields();
    //     this.dialogFormUpdateVisible = true
    //     httpClient.get('admin/house/proprietor/show/' + id).then(response => {
    //         const data = response.content
    //         this.formUpdate.community_name = data.proprietor.community_name
    //         this.formUpdate.community_uuid = data.proprietor.community_uuid
    //         this.formUpdate.room_no = data.proprietor.room_no
    //         this.formUpdate.name = data.proprietor.name
    //         this.formUpdate.mobile = data.proprietor.mobile
    //     })

    // },

    // formUpdateSubmit() {
    //     this.$message('提交中...')
    //     httpClient.post('admin/house/proprietor/update/' + this.id, this.formUpdate).then(response => {
    //         this.dialogFormUpdateVisible = false
    //         this.$message({
    //             type: 'success',
    //             message: '操作成功'
    //         })
    //         this.getList()
    //     })
    // }
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
.my-title{
    font-weight: 600;
}
.my-flex{
    display: flex;
    
    align-items: center;

}
.my-flex2{
    margin-top: 30px;
}
.my-flex button{
    background-color: #169bd5;
    color: #fff;
    border: none;
    width: 90px;
    border-radius: 5px;
}
.my-flex div{
    margin-left: 40px;
}

</style>