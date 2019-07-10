<template>
     <div class="app-container calendar-list-container">
        <div class="filter-container">
               <el-form :inline="true" class="demo-form-inline">
                <el-form-item>
                    <el-button type="primary" size="small" @click="importParking">上传转账记录</el-button>
                    <input class="fileinput" size="small" name="file" type="file" @change="update" id="import-parking" />
                </el-form-item> 
                <el-form-item>
                    <el-button type="primary" size="small" @click="download">下载转账记录</el-button>
                </el-form-item> 
            </el-form>   
        </div>
        <el-table :key='tableKey' :data="list" v-loading="listLoading" 
        border fit highlight-current-row style="width: 100%;" @selection-change="handleSelectionChange">

            <el-table-column type="selection" width="40">

            </el-table-column>

            <el-table-column align="center" label="ID" width="80">
                <template scope="scope">
                    <span>{{scope.row.id}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="文件名称">
                <template scope="scope">
                    <span>{{scope.row.file_name}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="消息">
                <template scope="scope">
                    <span>{{scope.row.message}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="创建时间">
                <template scope="scope">
                    <span>{{scope.row.created_at}}</span>
                </template>
            </el-table-column>

        </el-table>
        <div v-show="!listLoading" class="pagination-container" style="margin-top:10px;text-align:right">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="query.page"
                           :page-sizes="[10,20,30,50]" :page-size="query.page_size" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import httpClientFile from '@/utils/requestFile'
import httpClient from '@/utils/request'
import { staticUrl } from '@/utils/env'
export default {
    data(){
        return{
            list: [],
            total: 0,
            tableKey: 0,
            listLoading: true,
            query: {
                page: 1,
                page_size: 10,
                // project_name:'',
                // parking_no:'',
                // start_time:'',
                // end_time:'',
            },
        }
    },
     created() {
            this.getList();
        },
    methods:{
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
                httpClient.get('admin/eTransfer/record', { params: this.query }).then(response => {
                    console.log("转账",response)
                    this.list = response.content.list
                    this.total = response.content.total
                    this.listLoading = false
                })
            },
        importParking() {
                document.getElementById('import-parking').click();
            },

            update(e) {
                    this.$message('上传中...')

                    let file = e.target.files[0]
                    let param = new FormData() //创建form对象
                    param.append('file', file) //通过append向form对象添加数据
                    console.log("file",file)
                    document.getElementById('import-parking').value = ''
                    httpClientFile.post('/admin/send/transfer' , param).then(response=>{
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                        this.getList()
                        // console.log(response.content)
                    })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            // download(){
            //     httpClientFile.get('/admin/transfer/export').then(response=>{
            //             this.$message({
            //                 message: '操作成功',
            //                 type: 'success'
            //             });
                       
            //         })
            // }
            download() {
                this.$message('响应中...')
                let fileUrl = staticUrl
                    window.location.href = fileUrl + '/admin/transfer/export'
                    return
            },
    }
}
</script>

<style scoped>
.fileinput {display: none;}
</style>
