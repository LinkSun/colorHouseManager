<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            
               <el-form :inline="true" :model="query" class="demo-form-inline">
                <!-- <el-form-item label="">
                    <el-input v-model="query.label" placeholder="楼盘名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSearch">查询</el-button>
                </el-form-item> -->
                <el-form-item>
                        <el-button type="primary" @click="add">新建任务类型</el-button>
                </el-form-item>
            </el-form>
            
        </div>
        <el-table :key='tableKey' :data="list" v-loading="listLoading" 
        border fit highlight-current-row style="width: 100%;" @selection-change="handleSelectionChange">

            <el-table-column type="selection" width="40">

            </el-table-column>

            <el-table-column align="center" label="任务类型">
                <template scope="scope">
                    <span>{{scope.row.name}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="任务类型描述">
                <template scope="scope">
                    <span>{{scope.row.des}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="创建时间">
                <template scope="scope">
                    <span>{{scope.row.created_at | formatDate}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="启用/禁用">
                <template scope="scope">
                    <span :style="scope.row.status | formatColor">{{ taskTypeStatus[scope.row.status] || '' }}</span>
                </template>
            </el-table-column>

            <el-table-column fixed="right" align="center" width="240" label="操作" >
                <template scope="scope">
                    
                    <el-button  size="small" type="primary" @click="update(scope.row.id)">编辑</el-button>
                    
                    <el-button  size="small" type="danger" @click="confirmDelete(scope.row.id)">
                       {{ scope.row.status == 2 ? '启用' : '禁用' }}
                    </el-button>

                </template>
            </el-table-column>


        </el-table>

        <div v-show="!listLoading" class="pagination-container" style="margin-top:10px;text-align:right">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="query.page"
                           :page-sizes="[10,20,30,50]" :page-size="query.page_size" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

        <!-- 新建弹窗 -->
        <el-dialog title="新建任务类型" :visible.sync="dialogFormVisible" width="50%">
            <el-form :ref="form" :model="form" label-width="120px">
                <el-form-item label="任务类型名称" required>
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="任务类型描述">
                    <el-input v-model="form.des" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="formSubmit">提 交</el-button>
            </div>
        </el-dialog>
        <!-- 编辑弹窗 -->
        <el-dialog title="编辑任务类型" :visible.sync="dialogFormUpdateVisible" width="50%">
            <el-form :ref="formUpdate" :model="formUpdate" label-width="120px">
                <el-form-item label="任务类型名称" required>
                    <el-input v-model="formUpdate.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="任务类型描述">
                    <el-input v-model="formUpdate.des" autocomplete="off"></el-input>
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
    import { formatDate } from '@/utils/index'

    export default {
        name: 'taskTypeList',
        data() {
            return {
                id: 0,
                list: [],
                total: 0,
                listLoading: true,
                taskTypeStatus: [],
                taskTypeMap:[],
                query: {
                    page: 1,
                    page_size: 10,
                },
                
                tableKey: 0,
                dialogFormVisible: false,
                dialogFormUpdateVisible: false,
                form: {
                    name: '',
                    des: ''
                },
                formUpdate: {
                    name: '',
                    des: ''
                }
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
                return formatDate(date, 'yyyy-MM-dd hh:mm')
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
                httpClient.get('admin/tasktype', { params: this.query }).then(response => {
                    const data = response.content
                    this.list = data.list
                    this.total = data.total
                    this.taskTypeStatus = data.taskTypeStatus
                    this.listLoading = false
                })
            },
            onSearch(column) {
                this.getList()
            },
            confirmDelete(id) {
                this.$confirm('确认要进行该操作吗？')
                    .then(_=> {
                        httpClient.post('admin/tasktype/delete/' + id).then(response => {
                            this.getList()       
                        })
                    }).catch(_ => {})
            },

            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            // 添加弹窗
            add() {
                this.form.name = ''
                this.form.des = ''
                this.dialogFormVisible = true
            },
            formSubmit() {
                this.$message('提交中...')
                httpClient.post('admin/tasktype', this.form).then(response => {
                    this.dialogFormVisible = false
                    this.$message({
                        type: 'success',
                        message: '操作成功'
                    })
                    this.getList()   
                })
            },
            // 编辑弹窗
            update(id) {
                this.id = id
                this.formUpdate.name = ''
                this.formUpdate.des = ''
                this.dialogFormUpdateVisible = true
                httpClient.get('admin/tasktype/' + id).then(response => {
                    const data = response.content
                    this.formUpdate.name = data.type.name
                    this.formUpdate.des = data.type.des
                })
                
            },
            
            formUpdateSubmit() {
                this.$message('提交中...')
                httpClient.post('admin/tasktype/' + this.id, this.formUpdate).then(response => {
                    this.dialogFormUpdateVisible = false
                    this.$message({
                        type: 'success',
                        message: '操作成功'
                    })
                    this.getList()   
                })
            }
        }
    }
</script>

<style lang="css">
.fileinput {display: none;}
</style>