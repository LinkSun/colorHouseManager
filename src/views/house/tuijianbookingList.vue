<template>
    <div class="app-container calendar-list-container">
        <!-- <div class="filter-container">
            
               <el-form :inline="true" :model="query" class="demo-form-inline">
                <el-form-item label="">
                    <el-input v-model="query.build" placeholder="楼盘名称"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="query.his_name" placeholder="推荐人姓名"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="query.his_phone" placeholder="推荐人电话"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="query.state" placeholder="状态"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
            </el-form>
            
        </div> -->
        <el-table :key='tableKey' :data="list" v-loading="listLoading" 
        border fit highlight-current-row style="width: 100%;" @selection-change="handleSelectionChange">

            <el-table-column type="selection" width="40">

            </el-table-column>

            <el-table-column align="center" label="楼盘名称">
                <template scope="scope">
                    <span>{{scope.row.build}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="推荐人姓名">
                <template scope="scope">
                    <span>{{scope.row.his_name}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="推荐人电话">
                <template scope="scope">
                    <span>{{scope.row.his_phone}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="创建时间">
                <template scope="scope">
                    <span>{{scope.row.created_at}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="来源">
                <template scope="scope">
                    <span>{{scope.row.orgin}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="状态">
                <template scope="scope">
                    <span>{{scope.row.state}}</span>
                </template>
            </el-table-column>

        </el-table>

        <div v-show="!listLoading" class="pagination-container" style="margin-top:10px;text-align:right">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="query.page"
                           :page-sizes="[20,40,60,80]" :page-size="query.page_size" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        
    </div>
</template>

<script>
    import httpClient from '@/utils/request'
    // import { formatDate } from '@/utils/index'

    export default {
        name: 'tuijianbookingList',
        data() {
            return {
                list: [],
                total: 0,
                id: 0,
                listLoading: true,
                value:'',
                proprietorState: [],
                query: {
                    page: 1,
                    page_size: 20,
                    // build: '',
                    // his_name: '',
                    // his_phone: '',
                    // state: '',
                },
                
                tableKey: 0,
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
            this.getList();
        },
        methods: {
            handleSizeChange(val) {
                this.query.page_size = val
                this.getList();
            },
            handleCurrentChange(val) {
                this.query.page = val
                this.getList()
            },
            getList() {
                this.listLoading = true;
                httpClient.get('admin/appoint/invitation/list', { params: this.query }).then(response => {
                    const data = response.content
                    this.list = data.list
                    this.total = data.total
                    this.proprietorState = data.proprietorState
                    this.listLoading = false
                })
            },
            // onSearch(column) {
            //     this.getList()
            // },
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
            },
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
            //  onSearch(column) {
            //     this.getList()
            // },
        }
    }
</script>

<style lang="css">
.fileinput {display: none;}
</style>