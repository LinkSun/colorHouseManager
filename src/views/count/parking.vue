<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            
            <el-form :inline="true" :model="query" class="demo-form-inline">
                <el-form-item label="">
                    <el-input v-model="query.region_name" clearable placeholder="大区"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="query.dept_name" clearable placeholder="事业部"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="query.project_name" clearable placeholder="项目名称"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="query.parking_no" clearable placeholder="车位编号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
            </el-form>
            
        </div>
        <div class="filter-container" style="color:#757575;">
            车位总数: {{ countParking }},
            已售数量(销售完成+定金支付完成): {{ total }},
            已售数量(销售完成): {{ countSoldFinishParking }} <br>
            回款金额(销售完成车位的销售金额总计): {{ sumSoldFinishParkingAmount }} <br>
            未回款金额(定金支付完成订单的尾款款项总额): {{ sumSoldPreParkingAmount }}
        </div>
        <br>
        <el-table :key='tableKey' :data="list" v-loading="listLoading" 
        border fit highlight-current-row style="width: 100%;" @selection-change="handleSelectionChange">

            <el-table-column
            type="selection"
            width="55">
            </el-table-column>

            <el-table-column align="center" label="大区">
                <template scope="scope">
                    <span>{{ scope.row.region_name }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="事业部">
                <template scope="scope">
                    <span>{{ scope.row.dept_name }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="项目名称">
                <template scope="scope">
                    <span>{{ scope.row.project_name }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="车位编号">
                <template scope="scope">
                    <span>{{scope.row.parking_no}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="购买方式">
                <template scope="scope">
                    <span>{{ purchaseMethod[scope.row.purchase_method] || '' }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="销售状态">
                <template scope="scope">
                    <span>{{ orderStatus[scope.row.order_status] || '' }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="收购价">
                <template scope="scope">
                    <span>{{scope.row.purchase_price}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="销售价格">
                <template scope="scope">
                    <span>{{scope.row.sale_price}}</span>
                </template>
            </el-table-column>

             <el-table-column align="center" label="订金">
                <template scope="scope">
                    <span>{{scope.row.deposit}}</span>
                </template>
            </el-table-column>

             <el-table-column align="center" label="饭票">
                <template scope="scope">
                    <span>{{scope.row.total_ticket}}</span>
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

    export default {
        name: 'countParking',
        data() {
            return {
                list: [],
                total: 0,
                listLoading: true,
                orderStatus: [],
                purchaseMethod: [],
                countParking: 0,
                countSoldFinishParking: 0,
                sumSoldFinishParkingAmount: '',
                sumSoldPreParkingAmount: '',
                query: {
                    page: 1,
                    page_size: 10,
                    region_name: '',
                    dept_name: '',
                    project_name: '',
                    parking_no: ''
                },
                multipleSelection: [],
                tableKey: 0
            }
        },
        filters: {

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
                httpClient.get('admin/count/parking', { params: this.query }).then(response => {
                    const data = response.content
                    this.list = data.list
                    this.total = data.total
                    this.countParking = data.countParking
                    this.countSoldFinishParking = data.countSoldFinishParking
                    this.sumSoldFinishParkingAmount = data.sumSoldFinishParkingAmount
                    this.sumSoldPreParkingAmount = data.sumSoldPreParkingAmount
                    this.orderStatus = data.orderStatus
                    this.purchaseMethod = data.purchaseMethod
                    this.listLoading = false
                })
            },
            onSearch(column) {
                this.getList()
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
            }
        }
    }
</script>

<style lang="css">
.f-r {float: right;}
</style>