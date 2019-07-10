<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            
            <el-form :inline="true" :model="query" class="demo-form-inline">
                <el-form-item label="">
                    <el-input v-model="query.identity_name" clearable placeholder="预约人姓名"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="query.mobile" clearable placeholder="预约人手机"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-select v-model="query.status" clearable placeholder="处理状态">
                        <el-option v-for="(value, key) in bookStatus" :key="key" :label="value" :value="key"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
                
            </el-form>
            <div style="color:#909399;margin-bottom:13px;">
                当前楼盘: {{ building.label }}
            </div>
            
        </div>
        <el-table :key='tableKey' :data="list" v-loading="listLoading" 
        border fit highlight-current-row style="width: 100%;" @selection-change="handleSelectionChange">

            <el-table-column type="selection" width="40">

            </el-table-column>

            <el-table-column align="center" label="预约人姓名">
                <template scope="scope">
                    <span>{{scope.row.identity_name}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="预约人手机">
                <template scope="scope">
                    <span>{{scope.row.mobile}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="处理状态">
                <template scope="scope">
                    <span :style="scope.row.status | formatColor">{{ bookStatus[scope.row.status] || ''}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="预约时间">
                <template scope="scope">
                    <span>{{scope.row.created_at|formatDate}}</span>
                </template>
            </el-table-column>

            <el-table-column fixed="right" align="center" width="180" label="操作" >
                <template scope="scope">
                    <!-- <router-link :to="{path: '/building/detail/' + scope.row.id}">
                        <el-button  size="small" type="primary">详情&审核</el-button>
                    </router-link> -->

                    <el-button  size="small" type="primary" @click="doing(scope.row.id)" :disabled="scope.row.status == 2">处理中</el-button>
                    <el-button  size="small" type="primary" @click="finish(scope.row.id)" :disabled="scope.row.status == 2">已处理</el-button>
                    
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
    import httpClient from '@/utils/request'
    import { formatDate } from '@/utils/index'

    export default {
        name: 'bookingList',
        data() {
            return {
                id: 0,
                list: [],
                total: 0,
                listLoading: true,
                bookStatus: [],
                building: '',
                query: {
                    page: 1,
                    page_size: 10,
                    identity_name: '',
                    mobile: '',
                    status: ''
                },
                
                tableKey: 0,
                
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
                    return  warning
                }
                if (param == 2) {
                    return success
                }
                return info
            },
            formatDate(param) {
                if (param == 0) {
                    return ''
                }
                let date = new Date(param * 1000)
                return formatDate(date, 'yyyy-MM-dd hh:mm')
            },
        },
        created() {
            const params = this.$route.params
            this.id = parseInt(params.id)
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
                httpClient.get('admin/building/booking/' + this.id, { params: this.query }).then(response => {
                    const data = response.content
                    this.list = data.list
                    this.total = data.total
                    this.building = data.building
                    this.bookStatus = data.bookStatus
                    this.listLoading = false
                })
            },
            onSearch(column) {
                this.getList()
            },
            doing(id) {
                
                this.$confirm('确认要设置处理中操作吗？')
                    .then(_=> {
                        httpClient.post('admin/building/booking/' + id, {status: 1}).then(response => {
                            this.getList()
                            this.$message({
                                type: 'success',
                                message: '操作成功'
                            })       
                        })
                    }).catch(_ => {})
            },

            finish(id) {
                this.$confirm('确认要设置已处理操作吗？')
                    .then(_=> {
                        httpClient.post('admin/building/booking/' + id, {status: 2}).then(response => {
                            this.getList()
                            this.$message({
                                type: 'success',
                                message: '操作成功'
                            })      
                        })
                    }).catch(_ => {})
            },

            handleSelectionChange(val) {
                this.multipleSelection = val
            }
        }
    }
</script>

<style lang="css">

</style>