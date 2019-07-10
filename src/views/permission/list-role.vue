<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            
               <el-form :inline="true" :model="query" class="demo-form-inline">
                <el-form-item label="">
                    <el-input v-model="query.role_name" placeholder="角色名称" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="createRole">添加角色</el-button>
                </el-form-item>
            </el-form>
            
        </div>
        <el-table :key='tableKey' :data="list" v-loading="listLoading" 
        border fit highlight-current-row style="width: 100%;" @selection-change="handleSelectionChange">

            <el-table-column type="selection" width="40">

            </el-table-column>

            <el-table-column align="center" label="角色名称">
                <template scope="scope">
                    <span>{{scope.row.role_name}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="状态">
                <template scope="scope">
                    <span :style="scope.row.state | formatColor">{{ roleState[scope.row.state] || '' }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="创建时间">
                <template scope="scope">
                    <span>{{scope.row.create_time}}</span>
                </template>
            </el-table-column>

            <el-table-column fixed="right" align="center" width="240" label="操作" >
                <template scope="scope">
                    <el-button  size="small" type="primary" @click="updateRole(scope.row.role_id)">
                       编辑
                    </el-button>
                    <router-link :to="{path: '/permission/role/' + scope.row.role_id + '/dispatch'}">
                        <el-button  size="small" type="primary">分配权限</el-button>
                    </router-link>
                    <el-button  size="small" type="danger" @click="confirmDelete(scope.row.role_id)">
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
        <el-dialog title="添加角色" :visible.sync="dialogFormVisible" width="50%">
            <el-form :ref="form" :model="form" label-width="120px">
                <el-form-item label="角色名称" required>
                    <el-input v-model="form.role_name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="formSubmit">提 交</el-button>
            </div>
        </el-dialog>
        <!-- 编辑角色弹窗 -->
        <el-dialog title="编辑角色" :visible.sync="dialogFormUpdateVisible" width="50%">
            <el-form :ref="formUpdate" :model="formUpdate" label-width="120px">
                <el-form-item label="角色名称" required>
                    <el-input v-model="formUpdate.role_name" autocomplete="off"></el-input>
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
        name: 'List-role',
        data() {
            return {
                list: [],
                total: 0,
                listLoading: true,
                roleState: [],
                query: {
                    page: 1,
                    page_size: 10,
                    role_name: ''
                },
                
                tableKey: 0,
                // 添加弹窗
                dialogFormVisible: false,
                form: {
                    role_name: ''
                },
                // 编辑弹窗
                dialogFormUpdateVisible: false,
                id: 0,
                formUpdate: {
                    role_name: ''
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
                httpClient.get('admin/role/list', { params: this.query }).then(response => {
                    const data = response.content
                    this.list = data.list
                    this.total = data.total
                    this.roleState = data.roleState
                    this.listLoading = false
                })
            },
            onSearch(column) {
                this.getList()
            },
            confirmDelete(id) {
                this.$confirm('确认要进行该操作吗？')
                    .then(_=> {
                        httpClient.post('admin/role/delete/' + id).then(response => {
                            this.getList()       
                        })
                    }).catch(_ => {})
            },

            handleSelectionChange(val) {
                this.multipleSelection = val
            },
             // 添加弹窗
            createRole() {
                this.dialogFormVisible = true
            },
            formSubmit() {
                this.$message('提交中...')
                httpClient.post('admin/role/add', this.form).then(response => {
                    this.dialogFormVisible = false
                    this.$message({
                        type: 'success',
                        message: '操作成功'
                    })
                    this.getList()   
                })
            },
            // 编辑弹窗
            updateRole(id) {
                this.id = id
                this.formUpdate.role_name = ''
                this.dialogFormUpdateVisible = true
                httpClient.get('admin/role/show/' + id).then(response => {
                    const data = response.content
                    this.formUpdate.role_name = data.role.role_name
                })
                
            },
            
            formUpdateSubmit() {
                this.$message('提交中...')
                httpClient.post('admin/role/update/' + this.id, this.formUpdate).then(response => {
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