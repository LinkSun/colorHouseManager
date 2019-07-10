<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            
               <el-form :inline="true" :model="query" class="demo-form-inline">
                <el-form-item label="">
                    <el-input v-model="query.identity_name" clearable placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="query.mobile" clearable placeholder="手机号"></el-input>
                </el-form-item>
                
                <el-form-item>
                    <el-button type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
            </el-form>
            
        </div>
        <el-table :key='tableKey' :data="list" v-loading="listLoading" 
        border fit highlight-current-row style="width: 100%;" @selection-change="handleSelectionChange">

            <el-table-column type="selection" width="40">

            </el-table-column>
            <el-table-column align="center" label="编号">
                <template scope="scope">
                    <span>{{scope.row.id}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="用户姓名">
                <template scope="scope">
                    <span>{{scope.row.identity_name}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="手机号">
                <template scope="scope">
                    <span>{{scope.row.mobile}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="身份证号">
                <template scope="scope">
                    <span>{{scope.row.identity_val}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="银行卡">
                <template scope="scope">
                    <span>{{scope.row.bank_account}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="地址">
                <template scope="scope">
                    <span>{{scope.row.city}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="车位项目">
                <template scope="scope">
                    <span>{{scope.row.project_name}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="车位号">
                <template scope="scope">
                    <span>{{scope.row.parking_no}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="车位保有状态">
                <template>
                    <span>保有</span>
                </template>
            </el-table-column>
             <el-table-column align="center" label="注册号">
                <template scope="scope">
                    <span>{{scope.row.mobile}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="注册日期">
                <template scope="scope">
                    <span>{{scope.row.created_at}}</span>
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
        name: 'CustomerList',
        data() {
            return {
                list: [],
                total: 0,
                listLoading: true,
                project: '',
                query: {
                    page: 1,
                    page_size: 10,
                    mobile: '',
                    identity_name: '',
                },
                payType: [],
                orderStatus: [],
                purchaseMethod: [],
                tableKey: 0,
                
            }
        },
        filters: {
            formatDate(param) {
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
                this.getList();
            },
            handleCurrentChange(val) {
                this.query.page = val
                this.getList()
            },
            getList() {
                this.listLoading = true;
                httpClient.get('admin/customer', { params: this.query }).then(response => {
                    const data = response.content
                    this.list = data.list
                    this.total = data.total
                    this.payType = data.payType
                    this.purchaseMethod = data.purchaseMethod
                    this.orderStatus = data.orderStatus
                    this.listLoading = false
                })
            },
            onSearch(column) {
                this.getList()
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            formSubmit() {
                // this.$message('提交中...')
                // httpClient.post('admin/parking/addone/' + this.project_id, this.form).then(response => {
                //        this.dialogFormVisible = false
                //        this.getList()
                        
                // })
            }  
        }
    }
</script>

<style lang="css">

</style>