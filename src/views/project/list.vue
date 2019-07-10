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
                    <el-select v-model="query.project_state" clearable placeholder="项目状态">
                        <el-option v-for="(value, key, index) in project_state" :key="index" :label="value" :value="key"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
                
                <el-button type="primary" @click="dialogFormVisible = true">新建项目</el-button>
                
            </el-form>
            
        </div>

        <el-table :key='tableKey' :data="list" v-loading="listLoading" fit border highlight-current-row style="width:100%;">

            <el-table-column align="center" label="项目名称">
                <template scope="scope">
                    <span>{{scope.row.project_name}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="项目UUID" width="160">
                <template scope="scope">
                    <span>{{scope.row.relevance}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="项目状态">
                <template scope="scope">
                    <span>{{ project_state[scope.row.state] || '' }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="业务类型">
                <template scope="scope">
                    <span>{{ project_type[scope.row.project_type] || '' }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="所属大区">
                <template scope="scope">
                    <span>{{scope.row.region_name}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="所属事业部">
                <template scope="scope">
                    <span>{{scope.row.dept_name}}</span>
                </template>
            </el-table-column>


            <el-table-column align="center" label="省份">
                <template scope="scope">
                    <span>{{scope.row.province}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="城市">
                <template scope="scope">
                    <span>{{scope.row.city}}</span>
                </template>
            </el-table-column>

            <!-- <el-table-column align="center" label="收购总资产">
                <template scope="scope">
                    <span>{{scope.row.total_amount}}</span>
                </template>
            </el-table-column> -->

            <el-table-column align="center" label="车位数量">
                <template scope="scope">
                    <span>{{scope.row.parking_number}}</span>
                </template>
            </el-table-column>

             <!-- <el-table-column align="center" label="已售数量">
                <template scope="scope">
                    <span></span>
                </template>
            </el-table-column> -->

            <el-table-column fixed="right" align="center" width="320px" label="操作" >
                <template scope="scope">
                    <router-link :to="{path: '/project/parking/list/' + scope.row.project_id}">
                        <el-button  size="small" type="primary">查看车位</el-button>
                    </router-link>
                    <router-link :to="{path: '/project/list/' + scope.row.project_id}">
                        <el-button  size="small" type="primary">项目详情</el-button>
                    </router-link>
                    <router-link :to="{path: '/project/edit/' + scope.row.project_id}">
                        <el-button  size="small" type="primary">编辑</el-button>
                    </router-link>
                    <el-button  size="small" type="danger" @click="confirmDelete(scope.row.project_id)">
                        {{ scope.row.state == 0 ? '删除' : '恢复' }}
                    </el-button>
                </template>
            </el-table-column>


        </el-table>

        <div v-show="!listLoading" class="pagination-container" style="margin-top:10px;text-align:right">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="query.page"
                           :page-sizes="[10,20,30,50]" :page-size="query.page_size" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        
    <!-- 弹窗添加项目 -->
        <el-dialog title="搜索项目" :visible.sync="dialogFormVisible" width="70%">
            <el-form :inline="true" :model="formSearch">
                <el-form-item label="项目名称">
                    <el-input v-model="formSearch.communityName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchCommunity">查询</el-button>
                </el-form-item>
            </el-form>

            <el-table :key='tableKey1' :data="communityList" v-loading="listLoading1"
        border fit highlight-current-row style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column align="center" label="项目名称">
                    <template scope="scope">
                        <span>{{scope.row.name}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="项目UUID" width="320">
                    <template scope="scope">
                        <span>{{scope.row.communityUuid}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="省份">
                    <template scope="scope">
                        <span>{{ scope.row.province }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="城市">
                    <template scope="scope">
                        <span>{{ scope.row.city }}</span>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="formSubmit">确 定</el-button>
            </div>
        </el-dialog>

    </div>
    
</template>

<script>
    import httpClient from '@/utils/request'

    export default {
        name: 'projectList',
        data() {
            return {
                project_type: [],
                project_state: [],
                list: [],
                total: 0,
                listLoading: true,
                projects: [],
                query: {
                    page: 1,
                    page_size: 10,
                    project_state: '',
                    project_name: '',
                    project_id: '',
                    sold_sort: ''
                },
    
                tableKey: 0,

                // 弹窗
                listLoading1: false,
                tableKey1: 1,
                dialogFormVisible: false,
                formSearch: {
                    communityName: '',
                },
                communityList: [],
                multipleSelection: []
            }
        },
        created() {
            this.getList();
        },
        filters: {
            // typeFilter(status) {
            //     return this.project_type[1] || ''
            // }
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
                httpClient.get('admin/project', { params: this.query }).then(response => {
                    const data = response.content
                    this.list = data.list
                    this.total = data.total
                    this.projects = data.projects
                    this.project_type = data.project_type
                    this.project_state = data.project_state
                    this.listLoading = false
                })
            },
            onSearch() {
                this.getList()
            },
            confirmDelete(id) {
                this.$confirm('确认要进行该操作吗？')
                    .then(_=> {
                        this.deleteNotice(id)
                    }).catch(_ => {})
            },
            deleteNotice(id) {
                httpClient.post('admin/project/downup/' + id).then(response => {
                    this.getList()
                })
            },

            // 弹窗添加项目
            getSearch() {

                if (this.formSearch.communityName == '') {
                    return
                }

                this.listLoading1 = true;
                httpClient.get('search/community', { params: this.formSearch }).then(response => {
                    const data = response.content
                    this.communityList = data.list
                    this.listLoading1 = false
                })
            },
            formSubmit() {
                if (this.multipleSelection.length == 0) {
                    this.$message({
                        message: '请选选择项目',
                        type: 'warning'
                    })
                    return
                }
                this.listLoading1 = true;
                httpClient.post('admin/project', { community: this.multipleSelection }).then(response => {
                    this.listLoading1 = false;
                    this.dialogFormVisible = false
                    this.getList();
                })

            },
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            searchCommunity() {
                this.getSearch()
            },
        }
    }
</script>

<style lang="css">
.f-r {float: right;}
</style>