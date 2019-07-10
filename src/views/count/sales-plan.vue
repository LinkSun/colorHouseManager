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
                    <el-date-picker v-model="query.month" type="month" value-format="timestamp" placeholder="选择月份"></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="downLoad" icon="el-icon-download">下载模板</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="createProfit" icon="el-icon-upload2">上传计划</el-button>
                </el-form-item>
            </el-form>
            
        </div>
        <el-table :key='tableKey' :data="list" v-loading="listLoading" 
        border fit highlight-current-row style="width: 100%;" @selection-change="handleSelectionChange">

            <el-table-column type="selection" width="40">

            </el-table-column>

            <el-table-column align="center" label="事业部">
                <template scope="scope">
                    <span>{{scope.row.dept_name}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="项目">
                <template scope="scope">
                    <span>{{scope.row.project_name}}</span>
                </template>
            </el-table-column>


            <el-table-column align="center" label="月份">
                <template scope="scope">
                    <span>{{scope.row.month|formatDate2}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="月目标">
                <template scope="scope">
                    <span>{{scope.row.month_target}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="月去化目标">
                <template scope="scope">
                    <span>{{scope.row.month_finish}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="录入时间">
                <template scope="scope">
                    <span>{{scope.row.created_at | formatDate}}</span>
                </template>
            </el-table-column>

            <el-table-column fixed="right" align="center" width="100" label="操作" >
                <template scope="scope">
                    <el-button  size="small" type="primary" @click="updatePlan(scope.row.id)">编辑</el-button>
                </template>
            </el-table-column>


        </el-table>

        <div v-show="!listLoading" class="pagination-container" style="margin-top:10px;text-align:right">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="query.page"
                           :page-sizes="[10,20,30,50]" :page-size="query.page_size" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>


        <!-- 添加弹窗 -->
        <el-dialog title="上传计划" :visible.sync="dialogFormVisible" width="50%">
            <el-form :ref="form" :model="form" label-width="120px">
                <el-form-item label="提示:">
                    <span>如果选择的月份已存在，数据将会全部覆盖。</span>
                </el-form-item>
                <el-form-item label="选择月份" required>
                    <el-date-picker v-model="form.month" type="month" value-format="timestamp" placeholder="选择月份"></el-date-picker>
                </el-form-item>
                <el-form-item label="上传计划" required>
                    <el-upload
                        class="upload-demo"
                        name="file"
                        :action="uploadFileUrl"
                        :on-change="handleChange"
                        :on-remove="handleFileRemove"
                        :on-success="handlerFileSuccess"
                        :file-list="fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="formSubmit">提 交</el-button>
            </div>
        </el-dialog>

        <!-- 编辑弹窗 -->
        <el-dialog title="编辑" :visible.sync="dialogFormUpdateVisible" width="50%">
            <el-form :ref="formUpdate" :model="formUpdate" label-width="120px">
                <el-form-item label="月份" required>
                    <el-date-picker v-model="formUpdate.month" type="month" value-format="timestamp" placeholder="选择月份"></el-date-picker>
                </el-form-item>
                <el-form-item label="月目标" required>
                    <el-input v-model="formUpdate.month_target" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="月去化目标" required>
                    <el-input v-model="formUpdate.month_finish" autocomplete="off"></el-input>
                </el-form-item>            
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormUpdateVisible = false">取 消</el-button>
                <el-button type="primary" @click="formUpdateSubmit">提 交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import httpClient from '@/utils/request'
    import httpFile from '@/utils/downloadFile'
    import { staticUrl } from '@/utils/env'
    import { formatDate } from '@/utils/index'

    export default {
        name: 'salesPlan',
        data() {
            return {
                id: 0,
                list: [],
                total: 0,
                listLoading: true,
                query: {
                    page: 1,
                    page_size: 10,
                    project_id: '',
                    month:''
                },
                projects: [],
                tableKey: 0,
                // 添加奖励分配弹窗
                uploadFileUrl: staticUrl + '/upload/file',
                dialogFormVisible: false,
                form: {
                    month: '',
                    file_path: ''
                },
                fileList: [],
                dialogFormUpdateVisible: false,
                formUpdate: {
                    month: '',
                    month_target: '',
                    month_finish: ''
                }
            }
        },
        filters: {
            formatNum(param) {
                return parseFloat(param)
            },
            formatDate(param) {
                if (param == 0) {
                    return ''
                }
                let date = new Date(param * 1000)
                return formatDate(date, 'yyyy-MM-dd hh:mm')
            },
            formatDate2(param) {
                if (param == 0) {
                    return ''
                }
                let date = new Date(param * 1000)
                return formatDate(date, 'yyyy-MM')
            },
            formatColor(param) {
                let primary = 'color:#409EFF;'
                let info = 'color:#909399;'
                let success = 'color:#67C23A;'
                let warning = 'color:#E6A23C;'
                let danger = 'color:#F56C6C;'

                if (param == 2) {
                    return  warning
                }
                return info
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
                httpClient.get('admin/sales/plan', { params: this.query }).then(response => {
                    const data = response.content
                    this.list = data.list
                    this.total = data.total
                    this.projects = data.projects
                    this.listLoading = false
                })
            },
            onSearch(column) {
                this.getList()
            },
            createProfit() {
                this.dialogFormVisible = true
            },
            downLoad() {
                this.$message('响应中...')
                httpFile.get('admin/sales/plan/download/template', { params: this.query }).then(response => {
                    this.downloadTemplate(response)
                })
            },
            // 下载文件
            downloadTemplate (data) {
                if (!data) {
                    return
                }
                let url = window.URL.createObjectURL(new Blob([data]))
                let link = document.createElement('a')
                link.style.display = 'none'
                link.href = url
                link.setAttribute('download', '销售计划模板.xlsx')
                
                document.body.appendChild(link)
                link.click()
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
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
            formSubmit() {
                this.$message('提交中...')
                httpClient.post('admin/sales/plan', this.form).then(response => {
                    this.dialogFormVisible = false
                    this.$message({ message: '操作成功', type: 'success' });
                    this.getList()
                })
            },  
            // 编辑弹窗
            formUpdateSubmit() {
                httpClient.post('admin/sales/plan/' + this.id, this.formUpdate).then(response => {
                    this.dialogFormUpdateVisible = false
                    this.getList()   
                })
            },
            updatePlan(id) {
                this.id = id
                const current = this.list.find((element) => (element.id == id))
                this.formUpdate.month = current.month * 1000
                this.formUpdate.month_target = current.month_target
                this.formUpdate.month_finish = current.month_finish
                this.dialogFormUpdateVisible = true
            },
        }
    }
</script>

<style lang="css">
.fileinput {display: none;}
</style>