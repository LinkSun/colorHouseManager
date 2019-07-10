<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            
               <el-form :inline="true" :model="query" class="demo-form-inline">
                <el-form-item label="">
                    <el-input v-model="query.user_name" placeholder="姓名" clearable></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="query.phone" placeholder="手机号" clearable></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="query.user_account" placeholder="OA账号" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="createUser">添加OA用户</el-button>
                </el-form-item>
            </el-form>
            
        </div>
        <el-table :key='tableKey' :data="list" v-loading="listLoading" 
        border fit highlight-current-row style="width: 100%;" @selection-change="handleSelectionChange">

            <el-table-column type="selection" width="40">

            </el-table-column>

            <el-table-column align="center" label="编号" width="80">
                <template scope="scope">
                    <span>{{scope.row.user_id}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="姓名">
                <template scope="scope">
                    <span>{{scope.row.user_name}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="手机号">
                <template scope="scope">
                    <span>{{scope.row.phone}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="OA账号">
                <template scope="scope">
                    <span>{{scope.row.identifier}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="角色">
                <template scope="scope">
                    <span>{{scope.row.roles}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="状态">
                <template scope="scope">
                    <span :style="scope.row.state | formatColor">{{ userState[scope.row.state] || '' }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="创建时间">
                <template scope="scope">
                    <span>{{scope.row.create_time}}</span>
                </template>
            </el-table-column>

            <el-table-column fixed="right" align="center" width="250" label="操作" >
                <template scope="scope">

                    <router-link :to="{path: '/user/role/' + scope.row.user_id}">
                        <el-button  size="small" type="primary">分配角色</el-button>
                    </router-link>

                    <router-link :to="{path: '/user/project/' + scope.row.user_id}">
                        <el-button  size="small" type="primary">分配项目</el-button>
                    </router-link>

                    <el-button  size="small" type="danger" @click="confirmDelete(scope.row.user_id)">
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


        <!-- 添加车位弹窗 -->
        <el-dialog title="添加OA用户" :visible.sync="dialogFormVisible" width="50%">
            <el-form :ref="form" :model="form" label-width="120px">
                <el-form-item label="OA账号" required>
                    <el-input v-model="form.user_account" autocomplete="off"></el-input>
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

    export default {
        name: 'orderList',
        data() {
            return {
                list: [],
                total: 0,
                listLoading: true,
                userState: [],
                roleMap: [],
                query: {
                    page: 1,
                    page_size: 10,
                    user_name: '',
                    phone: '',
                    user_account: ''
                },
                
                tableKey: 0,
                // 添加奖励分配弹窗
                dialogFormVisible: false,
                form: {
                    user_account: ''
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
            formatRoles(param) {
                
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
                httpClient.get('admin/user/list', { params: this.query }).then(response => {
                    const data = response.content
                    this.list = data.list
                    this.total = data.total
                    this.userState = data.userState
                    this.roleMap = data.roleMap
                    this.listLoading = false
                })
            },
            onSearch(column) {
                this.getList()
            },
            confirmDelete(id) {
                this.$confirm('确认要进行该操作吗？')
                    .then(_=> {
                        httpClient.post('admin/user/delete/' + id).then(response => {
                            this.getList()       
                        })
                    }).catch(_ => {})
            },
            createUser() {
                this.dialogFormVisible = true
            },
            downLoad() {
                this.$message('响应中...')
                let fileUrl = staticUrl + '/template/'
                window.location.href = fileUrl + '奖励分配.xlsx'
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
                httpClient.post('admin/user/add', this.form).then(response => {
                    this.dialogFormVisible = false
                    this.getList()   
                })
            }  
        }
    }
</script>

<style lang="css">
.fileinput {display: none;}
</style>