<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            
               <el-form :inline="true" :model="query" class="demo-form-inline">
                <el-form-item label="">
                    <el-select v-model="query.project_id" clearable filterable placeholder="选择项目">
                        <el-option
                        v-for="item in projects"
                            :key="item.project_id"
                            :label="item.project_name"
                            :value="item.project_id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="">
                    <el-input v-model="query.oa_name" clearable placeholder="客户经理姓名"></el-input>
                </el-form-item>

                <el-date-picker
                    v-model="query.month"
                    type="month"
                    value-format="timestamp"
                    placeholder="选择月">
                </el-date-picker>
                <el-form-item>
                    <el-button type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onExport">导出</el-button>
                </el-form-item>
            </el-form>
            
        </div>
        <el-table :key='tableKey' :data="list" v-loading="listLoading" 
        border fit highlight-current-row style="width: 100%;" @selection-change="handleSelectionChange">

            <el-table-column type="selection" width="40">

            </el-table-column>

            <el-table-column align="center" label="项目名称">
                <template scope="scope">
                    <span>{{scope.row.community_name}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="客户经理姓名">
                <template scope="scope">
                    <span :data-name="scope.row.oa_name">{{oa_name}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="累计拜访次数">
                <template scope="scope">
                    <span>{{scope.row.month_total}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="拜访时间">
                <template scope="scope">
                    <span :data-total="scope.row.month_total">{{month | formatDate}}</span>
                </template>
            </el-table-column>

            <el-table-column fixed="right" align="center" width="170" label="操作" >
                <template scope="scope">
                    <el-button size="small" type="primary" @click="showDetail(scope.row.community_uuid)">
                       详情
                    </el-button>
                </template>
            </el-table-column>

        </el-table>

        <div v-show="!listLoading" class="pagination-container" style="margin-top:10px;text-align:right">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="query.page"
                           :page-sizes="[10,20,30,50]" :page-size="query.page_size" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>


        <!-- 附加信息弹窗 -->
        <el-dialog title="统计详情" :visible.sync="dialogFormVisible2" width="70%">
            <el-table :key='tableKey2' :data="listDetail" 
        border fit highlight-current-row style="width: 100%;" >

                <el-table-column align="center" label="项目名称">
                    <template scope="scope">
                        <span>{{scope.row.community_name}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="客户经理OA">
                    <template scope="scope">
                        <span>{{scope.row.oa_account}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="客户经理姓名">
                    <template scope="scope">
                        <span>{{scope.row.oa_name}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="客户经理手机">
                    <template scope="scope">
                        <span>{{scope.row.oa_mobile}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="拜访时间">
                    <template scope="scope">
                        <span>{{scope.row.visit_time | formatDate2}}</span>
                    </template>
                </el-table-column>

                <!-- <el-table-column fixed="right" align="center" width="170" label="操作" >
                    <template scope="scope">
                        <el-button size="small" type="primary" @click="showDetail(scope.row.community_uuid)">
                        详情
                        </el-button>
                    </template>
                </el-table-column> -->

            </el-table>
        </el-dialog>
    </div>
</template>

<script>
    import httpClient from '@/utils/request'
    import httpFile from '@/utils/downloadFile'
    import { staticUrl } from '@/utils/env'
    import { formatDate } from '@/utils/index'

    export default {
        name: 'orderList',
        data() {
            return {
                list: [],
                total: 0,
                listLoading: false,
                projects: [],
                month: '',
                oa_name: '',
                query: {
                    page: 1,
                    page_size: 10,
                    project_id: '',
                    oa_name: '',
                    month: ''
                },
                hasExport: false,
                tableKey: 0,
                // 弹窗
                listDetail: [],
                dialogFormVisible: false,
                dialogFormVisible2: false,
                tableKey2: 1,
                visit: '', // 当前拜访详情
                uploadFileUrl: staticUrl + '/upload/file',
                form: {
                    project_id: '',
                    file_path: ''
                },
                fileList: []
            }
        },
        filters: {
            formateMoney(param) {
                return parseFloat(param)
            },
            formatColor(param) {
                let primary = 'color:#409EFF;'
                let info = 'color:#909399;'
                let success = 'color:#67C23A;'
                let warning = 'color:#E6A23C;'
                let danger = 'color:#F56C6C;'

                if (param == 1) {
                    return  danger
                }
                return info
            },
            formatDate(param) {
                if (param == 0) {
                    return ''
                }
                let date = new Date(param * 1000)
                return formatDate(date, 'yyyy-MM')
            },
            formatDate2(param) {
                if (param == 0) {
                    return ''
                }
                let date = new Date(param * 1000)
                return formatDate(date, 'yyyy-MM-dd hh:mm')
            }
        },
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
                httpClient.get('admin/oa/visit/count', { params: this.query }).then(response => {
                    const data = response.content
                    this.list = data.list
                    this.projects = data.projects
                    this.total = data.total
                    this.month = data.month
                    this.oa_name = data.oa_name
                    this.listLoading = false
                })
            },
            onSearch(column) {
                this.getList()
            },
            onExport() {
    
                this.$message('导出中...')
                httpFile.get('admin/oa/visit/count/export', { params: this.query }).then(response => {
                    this.download(response)
                })
            },
            confirmDelete(id) {
                this.$confirm('确认要进行该操作吗？')
                    .then(_=> {
                        httpClient.post('admin/user/delete/' + id).then(response => {
                            this.getList()       
                        })
                    }).catch(_ => {})
            },
            showDetail(uuid) {
                let query = {
                    community_uuid: uuid,
                    oa_name: this.oa_name,
                    month: this.month,
                }
                httpClient.get('admin/oa/visit/count/detail', {params: query}).then(response => {
                    const data = response.content
                    this.listDetail = data.list
                    this.dialogFormVisible2 = true            
                })
                
            },
            createProfit() {
                this.form.project_id = ''
                this.form.file_path = ''
                this.fileList = []
                this.dialogFormVisible2 = true
            },
            downloadTemplate() {
                this.$message('响应中...')
                let fileUrl = staticUrl + '/template/'
                window.location.href = fileUrl + '蓄客模板.xlsx'
            },
            
            formSubmit() {
                this.$message('提交中...')
                httpClient.post('admin/oa/visit/list', this.form).then(response => {
                    this.dialogFormVisible2 = false
                    this.$message({ message: '操作成功', type: 'success' });
                    this.getList()
                })
            },
             // 添加奖励分配弹窗
            handleChange(file, fileList) {
                this.fileList = fileList.slice(-1);
            },
            handlerFileSuccess(response, fileList) {
                let data = response.content
                this.form.file_path = data.fileName
            },
            handleFileRemove(file, fileList) {
                this.form.file_path = ''
            },
            // 下载文件
            download (data) {
                if (!data) {
                    return
                }
                let url = window.URL.createObjectURL(new Blob([data]))
                let link = document.createElement('a')
                link.style.display = 'none'
                link.href = url
                link.setAttribute('download', '员工拜访统计.xlsx')
                
                document.body.appendChild(link)
                link.click()
            },
            downLoad1() {
                this.$message('响应中...')
                let fileUrl = staticUrl + '/template/'
                window.location.href = fileUrl + '奖励分配.xlsx'
                // window.open(fileUrl + '车位导入.xlsx', '_blank')
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
             
            
        }
    }
</script>

<style lang="css">
.fileinput {display: none;}
</style>