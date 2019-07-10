<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            
               <el-form :inline="true" :model="query" class="demo-form-inline">
                <el-form-item label="">
                    <el-select v-model="query.project_id" clearable filterable placeholder="选择项目">
                        <el-option
                        v-for="item in project"
                            :key="item.project_id"
                            :label="item.project_name"
                            :value="item.project_id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-select v-model="query.task_type_id" clearable placeholder="任务类型">
                        <el-option v-for="(value, key, index) in taskTypeMap" :key="index" :label="value" :value="key"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-select v-model="query.progress" clearable placeholder="任务进度">
                        <el-option v-for="(item, index) in taskProgress" :key="index" :label="item" :value="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-select v-model="query.check" clearable placeholder="审核结果">
                        <el-option v-for="(item, index) in taskCheck" :key="index" :label="item" :value="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-date-picker v-model="query.start_time" type="datetime" value-format="timestamp" placeholder="开始时间"></el-date-picker>
                </el-form-item>
                <el-form-item label="">
                    <el-date-picker v-model="query.end_time" type="datetime" value-format="timestamp" placeholder="结束时间"></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <router-link :to="{path: '/task/add'}">
                        <el-button type="primary">新建任务</el-button>
                    </router-link>
                </el-form-item>
            </el-form>
            
        </div>
        <el-table :key='tableKey' :data="list" v-loading="listLoading" 
        border fit highlight-current-row style="width: 100%;" @selection-change="handleSelectionChange">

            <el-table-column type="selection" width="40">

            </el-table-column>

            <el-table-column align="center" label="项目名称">
                <template scope="scope">
                    <span>{{scope.row.project_name}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="任务类型">
                <template scope="scope">
                    <span >{{taskTypeMap[scope.row.task_type_id] || ''}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="任务名称">
                <template scope="scope">
                    <span>{{scope.row.name}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="任务描述" width="200">
                <template scope="scope">
                    <span>{{scope.row.des}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="执行人">
                <template scope="scope">
                    <span>{{scope.row.user_name}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="开始时间" width="100">
                <template scope="scope">
                    <span>{{scope.row.start_time|formatDate2}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="结束时间" width="100">
                <template scope="scope">
                    <span>{{scope.row.end_time|formatDate2}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="完成时间" width="100">
                <template scope="scope">
                    <span>{{scope.row.finish_time|formatDate2}}</span>
                </template>
            </el-table-column>


            <el-table-column align="center" label="任务进度">
                <template scope="scope">
                    <span  :style="scope.row.progress | formatColorCheck">{{ taskProgress[scope.row.progress] || '' }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="启用/禁用" width="100">
                <template scope="scope">
                    <span :style="scope.row.deleted | formatColorDelete">{{ taskDeleted[scope.row.deleted] || '' }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="审核结果">
                <template scope="scope">
                    <span :style="scope.row.check | formatColorCheck">{{ taskCheck[scope.row.check] || '' }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="审核备注">
                <template scope="scope">
                    <span>{{scope.row.check_txt}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="创建时间" width="100">
                <template scope="scope">
                    <span>{{scope.row.created_at|formatDate2}}</span>
                </template>
            </el-table-column>

            <el-table-column fixed="right" align="center" width="220" label="操作" >
                <template scope="scope">
                    <router-link v-show="scope.row.deleted == 0 && scope.row.progress == 0" :to="{path: '/task/edit/' + scope.row.id}">
                        <el-button  size="small" type="primary">编辑</el-button>
                    </router-link>
                    <el-button v-show="scope.row.progress == 3 && scope.row.check == 0" size="small" type="primary" @click="popCheck(scope.row.id)">审核</el-button>
                    <el-button v-show="scope.row.deleted == 0 && scope.row.progress == 1" size="small" type="primary" @click="popFinish(scope.row.id)" style="margin-left:0;">完成</el-button>
                    <el-button v-show="scope.row.check == 0 && (scope.row.progress == 0 ||scope.row.progress == 1)" size="small" type="danger" @click="confirmDelete(scope.row.id)">
                        {{ scope.row.deleted == 0 ? '禁用' : '启用' }}
                    </el-button>
                </template>
            </el-table-column>


        </el-table>

        <div v-show="!listLoading" class="pagination-container" style="margin-top:10px;text-align:right">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="query.page"
                           :page-sizes="[10,20,30,50]" :page-size="query.page_size" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

        <!-- 审核弹窗 -->
        <el-dialog title="审核" :visible.sync="dialogFormVisible" width="50%">
            <el-form :ref="form" :model="form" label-width="120px">
                
                    <el-form-item label="审核结果" required="">
                        <el-radio-group v-model="form.check">
                            <el-radio label="1">通过</el-radio>
                            <el-radio label="2">否决</el-radio>
                        </el-radio-group>
                    </el-form-item>
                
                <el-form-item label="审核备注">
                    <el-input type="textarea" v-model="form.check_txt"></el-input>
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
    import { formatDate } from '@/utils/index'

    export default {
        name: 'buildingList',
        data() {
            return {
                id: 0,
                list: [],
                total: 0,
                listLoading: true,
                taskCheck: [],
                taskProgress: [],
                taskDeleted: [],
                taskTypeMap: [],
                project: [],
                query: {
                    page: 1,
                    page_size: 10,
                    project_id: '',
                    task_type_id: '',
                    check: '',
                    check_txt: '',
                    progress: '',
                    start_time: '',
                    end_time: ''
                },

                tableKey: 0,
                dialogFormVisible: false,
                form: {
                    check: '',
                    check_txt: ''
                }
                
            }
        },
        filters: {
            formateMoney(param) {
                return parseFloat(param)
            },
            formatColorDelete(param) {
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
            formatColorCheck(param) {
                let primary = 'color:#409EFF;'
                let info = 'color:#909399;'
                let success = 'color:#67C23A;'
                let warning = 'color:#E6A23C;'
                let danger = 'color:#F56C6C;'

                if (param == 2) {
                    return  danger
                }
                return info
            },
            formatDate(param) {
                if (param == 0) {
                    return ''
                }
                let date = new Date(param * 1000)
                return formatDate(date, 'yyyy-MM-dd')
            },
            formatDate2(param) {
                if (param == 0) {
                    return ''
                }
                let date = new Date(param * 1000)
                return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
            }
        },
        created() {
            this.getList();
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
                httpClient.get('admin/task', { params: this.query }).then(response => {
                    const data = response.content
                    this.list = data.list
                    this.total = data.total
                    this.taskCheck = data.taskCheck
                    this.taskProgress = data.taskProgress
                    this.taskDeleted = data.taskDeleted
                    this.taskTypeMap = data.taskTypeMap
                    this.project = data.project
                    this.listLoading = false
                })
            },
            onSearch(column) {
                this.getList()
            },
            confirmDelete(id) {
                this.$confirm('确认要进行该操作吗？')
                    .then(_=> {
                        httpClient.post('admin/task/delete/' + id).then(response => {
                            this.getList()       
                        })
                    }).catch(_ => {})
            },
            popFinish(id) {
                this.$confirm('确认要进行完成操作吗？')
                    .then(_=> {
                        httpClient.post('admin/task/finish/' + id).then(response => {
                            this.getList()       
                        })
                    }).catch(_ => {})
            },

            popCheck(id) {
                this.id = id
                this.form.check = ''
                this.dialogFormVisible = true
            },
            formSubmit() {

                this.$message('提交中...')
                httpClient.post('admin/task/check/' + this.id, this.form).then(response => {
                    this.dialogFormVisible = false
                    this.$message({
                        type: 'success',
                        message: '操作成功'
                    })
                    this.getList()   
                })
            },

            handleSelectionChange(val) {
                this.multipleSelection = val
            }
        }
    }
</script>

<style lang="css">
.fileinput {display: none;}
</style>