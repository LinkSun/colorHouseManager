<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            
               <el-form :inline="true" :model="query" class="demo-form-inline">
                <el-form-item label="">
                    <el-input v-model="query.permission_name" placeholder="权限名称" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="createPermission">添加权限</el-button>
                </el-form-item>
            </el-form>
            
        </div>
        <el-table :key='tableKey' :data="list" v-loading="listLoading" 
        border fit highlight-current-row style="width: 100%;" @selection-change="handleSelectionChange">

            <el-table-column type="selection" width="40">

            </el-table-column>

            <el-table-column align="center" label="权限名称">
                <template scope="scope">
                    <span>{{scope.row.permission_name}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="权限编码">
                <template scope="scope">
                    <span>{{scope.row.url}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="状态">
                <template scope="scope">
                    <span :style="scope.row.state | formatColor">{{ permissionState[scope.row.state] || '' }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="创建时间">
                <template scope="scope">
                    <span>{{scope.row.create_time}}</span>
                </template>
            </el-table-column>

            <el-table-column fixed="right" align="center" width="150" label="操作" >
                <template scope="scope">
                    <el-button  size="small" type="primary" @click="updatePermission(scope.row.permission_id)">
                       编辑
                    </el-button>

                    <el-button  size="small" type="danger" @click="confirmDelete(scope.row.permission_id)">
                       {{ scope.row.state == 0 ? '停用' : '恢复' }}
                    </el-button>

                </template>
            </el-table-column>


        </el-table>

        <div v-show="!listLoading" class="pagination-container" style="margin-top:10px;text-align:right">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="query.page"
                           :page-sizes="[10,20,30,50]" :page-size="query.page_size" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>


        <!-- 添加权限弹窗 -->
        <el-dialog title="添加权限" :visible.sync="dialogFormVisible" width="50%">
            <el-form :ref="form" :model="form" label-width="120px">
                <el-form-item label="权限名称" required>
                    <el-input v-model="form.permission_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="权限编码" required>
                    <el-input v-model="form.url" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="formSubmit">提 交</el-button>
            </div>
        </el-dialog>
        <!-- 编辑权限弹窗 -->
        <el-dialog title="编辑权限弹窗" :visible.sync="dialogFormUpdateVisible" width="50%">
            <el-form :ref="formUpdate" :model="formUpdate" label-width="120px">
                <el-form-item label="权限名称" required>
                    <el-input v-model="formUpdate.permission_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="权限编码" required>
                    <el-input v-model="formUpdate.url" autocomplete="off"></el-input>
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

    export default {
        name: 'List-permission',
        data() {
            return {
                list: [],
                total: 0,
                listLoading: true,
                permissionState: [],
                query: {
                    page: 1,
                    page_size: 10,
                    permission_name: ''
                },
                
                tableKey: 0,
                // 添加弹窗
                dialogFormVisible: false,
                form: {
                    permission_name: '',
                    url: ''
                },
                // 编辑弹窗
                dialogFormUpdateVisible: false,
                id: 0,
                formUpdate: {
                    permission_name: '',
                    url: ''
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

                if (param == 1) {
                    return  danger
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
                httpClient.get('admin/permission/list', { params: this.query }).then(response => {
                    const data = response.content
                    this.list = data.list
                    this.total = data.total
                    this.permissionState = data.permissionState
                    this.listLoading = false
                })
            },
            onSearch(column) {
                this.getList()
            },
            confirmDelete(id) {
                this.$confirm('确认要进行该操作吗？')
                    .then(_=> {
                        httpClient.post('admin/permission/delete/' + id).then(response => {
                            this.getList()       
                        })
                    }).catch(_ => {})
            },

            handleSelectionChange(val) {
                this.multipleSelection = val
            },
             // 添加弹窗
            createPermission() {
                this.dialogFormVisible = true
            },
            formSubmit() {
                this.$message('提交中...')
                httpClient.post('admin/permission/add', this.form).then(response => {
                    this.dialogFormVisible = false
                    this.$message({
                        type: 'success',
                        message: '操作成功'
                    })
                    this.getList()   
                })
            },
            // 编辑弹窗
            updatePermission(id) {
                this.id = id
                this.formUpdate.permission_name = ''
                this.formUpdate.url = ''
                this.dialogFormUpdateVisible = true
                httpClient.get('admin/permission/show/' + id).then(response => {
                    const data = response.content
                    this.formUpdate.permission_name = data.permission.permission_name
                    this.formUpdate.url = data.permission.url
                })
                
            },
            
            formUpdateSubmit() {
                this.$message('提交中...')
                httpClient.post('admin/permission/update/' + this.id, this.formUpdate).then(response => {
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