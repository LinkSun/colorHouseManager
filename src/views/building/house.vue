<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            
            <el-form :inline="true" :model="query" class="demo-form-inline">
                <el-form-item label="">
                    <el-input v-model="query.label" clearable placeholder="户型名称"></el-input>
                </el-form-item>
        
                <el-form-item label="">
                    <el-select v-model="query.status" clearable placeholder="启用状态">
                        <el-option v-for="(value, key) in houseStatus" :key="key" :label="value" :value="key"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSearch">查询</el-button>
                </el-form-item>

                <el-form-item>
                    <router-link :to="{path: '/building/house/add/' + building.id}">
                        <el-button type="primary">新建户型</el-button>
                    </router-link>
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

            <el-table-column align="center" label="户型名称">
                <template scope="scope">
                    <span>{{scope.row.label}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="单价">
                <template scope="scope">
                    <span>{{scope.row.unit_price}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="总面积">
                <template scope="scope">
                    <span>{{scope.row.acreage}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="可用面积">
                <template scope="scope">
                    <span>{{scope.row.use_area}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="销售状态">
                <template scope="scope">
                    <span>{{ houseSaleStatus[scope.row.sale_status] || ''}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="启用/禁用">
                <template scope="scope">
                    <span :style="scope.row.status | formatColor">{{ houseStatus[scope.row.status] || ''}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="描述">
                <template scope="scope">
                    <span>{{scope.row.describe}}</span>
                </template>
            </el-table-column>


            <el-table-column align="center" label="添加时间" width="150">
                <template scope="scope">
                    <span>{{scope.row.time_add|formatDate}}</span>
                </template>
            </el-table-column>

            <el-table-column fixed="right" align="center" width="240" label="操作" >
                <template scope="scope">

                    <router-link :to="{path: '/building/house/edit/' + scope.row.id}">
                        <el-button  size="small" type="primary">编辑</el-button>
                    </router-link>

                    <el-button size="small" type="danger" @click="doing(scope.row.id)" >
                        {{ scope.row.status == 1 ? '禁用' : '启用' }}
                    </el-button>
                    
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
        name: 'houseList',
        data() {
            return {
                id: 0,
                list: [],
                total: 0,
                listLoading: true,
                houseStatus: [],
                houseSaleStatus: [],
                building: '',
                query: {
                    page: 1,
                    page_size: 10,
                    label: '',
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

                if (param == 0) {
                    return danger
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
            this.getList()
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
                httpClient.get('admin/building/house/' + this.id, { params: this.query }).then(response => {
                    const data = response.content
                    this.list = data.list
                    this.total = data.total
                    this.building = data.building
                    this.houseSaleStatus = data.houseSaleStatus
                    this.houseStatus = data.houseStatus
                    this.listLoading = false
                })
            },
            onSearch(column) {
                this.getList()
            },
            doing(id) {
                this.$confirm('确认要执行该操作吗？')
                    .then(_=> {
                        httpClient.post('admin/building/house/ban/' + id).then(response => {
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