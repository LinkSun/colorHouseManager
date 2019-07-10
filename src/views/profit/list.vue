<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            
               <el-form :inline="true" :model="query" class="demo-form-inline">
                <el-form-item label="">
                    <el-input v-model="query.title" placeholder="标题"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="createProfit">新建奖励</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="downLoad">下载奖励发放模板</el-button>
                </el-form-item>
            </el-form>
            
        </div>
        <el-table :key='tableKey' :data="list" v-loading="listLoading" 
        border fit highlight-current-row style="width: 100%;" @selection-change="handleSelectionChange">

            <el-table-column type="selection" width="40">

            </el-table-column>

            <el-table-column align="center" label="编号" width="80">
                <template scope="scope">
                    <span>{{scope.row.id}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="标题">
                <template scope="scope">
                    <span>{{scope.row.title}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="发放金额/已发金额">
                <template scope="scope">
                    <span>{{scope.row.fp_amount | formateMoney }} / {{scope.row.sent_amount | formateMoney}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="回款总额">
                <template scope="scope">
                    <span>{{scope.row.has_amount | formateMoney}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="目标完成率">
                <template scope="scope">
                    <span>{{(scope.row.finish*100).toFixed(1) + '%'}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="状态">
                <template scope="scope">
                    <span :style="scope.row.status | formatColor">{{ profitType[scope.row.status] || '' }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="录入时间">
                <template scope="scope">
                    <span>{{scope.row.created_at | formatDate}}</span>
                </template>
            </el-table-column>

            <el-table-column fixed="right" align="center" width="100" label="操作" >
                <template scope="scope">
                
                    <router-link :to="{path: '/profit/list/detail/' + scope.row.id}">
                        <el-button  size="small" type="primary">详情</el-button>
                    </router-link>

                </template>
            </el-table-column>


        </el-table>

        <div v-show="!listLoading" class="pagination-container" style="margin-top:10px;text-align:right">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="query.page"
                           :page-sizes="[10,20,30,50]" :page-size="query.page_size" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>


        <!-- 添加车位弹窗 -->
        <el-dialog title="新建奖励" :visible.sync="dialogFormVisible" width="50%">
            <el-form :ref="form" :model="form" label-width="120px">
                <el-form-item label="标题" required>
                    <el-input v-model="form.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="回款总额" required>
                    <el-input v-model="form.has_amount" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="饭票奖励总额" required>
                    <el-input v-model="form.fp_amount" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="目标完成率" required>
                    <el-input v-model="form.finish" autocomplete="off" placeholder="请填小数, 例如：96%转成小数0.96"></el-input>
                </el-form-item>
                <el-form-item label="上传奖励明细" required>
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
    </div>
</template>

<script>
    import httpClient from '@/utils/request'
    import { staticUrl } from '@/utils/env'
    import { formatDate } from '@/utils/index'

    export default {
        name: 'profitList',
        data() {
            return {
                list: [],
                total: 0,
                listLoading: true,
             
                query: {
                    page: 1,
                    page_size: 10,
                    title: '',
                },
                profitType: [],
                profitDetailType: [],
                multipleSelection: [],
                tableKey: 0,
                // 添加奖励分配弹窗
                uploadFileUrl: staticUrl + '/upload/file',
                dialogFormVisible: false,
                form: {
                    title: '',
                    has_amount: '',
                    fp_amount: '',
                    finish: '',
                    file_path: ''
                },
                fileList: []
            }
        },
        filters: {
            formateMoney(param) {
                return parseFloat(param)
            },
            formatDate(param) {
                if (param == 0) {
                    return ''
                }
                let date = new Date(param * 1000)
                return formatDate(date, 'yyyy-MM-dd hh:mm')
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
                httpClient.get('admin/user/profit', { params: this.query }).then(response => {
                    const data = response.content
                    this.list = data.list
                    this.total = data.total
                    this.profitType = data.profitType
                    this.profitDetailType = data.profitDetailType
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
                let fileUrl = staticUrl + '/template/'
                window.location.href = fileUrl + '奖励明细.xlsx'
                // window.open(fileUrl + '车位导入.xlsx', '_blank')
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
                httpClient.post('admin/user/profit', this.form).then(response => {
                    this.dialogFormVisible = false
                    this.$message({ message: '操作成功', type: 'success' });
                    this.getList()   
                })
            }  
        }
    }
</script>

<style lang="css">
.fileinput {display: none;}
</style>