<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            
               <el-form :inline="true" :model="query" class="demo-form-inline">
                <el-form-item label="">
                    <el-input v-model="query.dept_name" clearable placeholder="事业部"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="query.project_name" clearable placeholder="项目名称"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="query.parking_no" clearable placeholder="车位编号"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-select v-model="query.parking_tag" clearable placeholder="车位标签">
                        <el-option v-for="(item, index) in parkingTag" :key="index" :label="item" :value="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="query.customer_phone" clearable placeholder="客户手机号"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="query.order_no" clearable placeholder="订单编号"></el-input>
                </el-form-item>
                <el-form-item label="">
                <el-select v-model="query.order_status" clearable placeholder="订单状态">
                    <el-option v-for="(item, index) in orderStatus" :key="item.id" :label="item" :value="parseInt(index)"></el-option>
                </el-select>

                <el-date-picker v-model="query.start_time" type="datetime" placeholder="开始时间"></el-date-picker>
                <el-date-picker v-model="query.end_time" type="datetime" placeholder="结束时间"></el-date-picker>

                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
                 <el-form-item>
                    <el-button type="primary" @click="onExport">导出</el-button>
                </el-form-item>
            </el-form>
            
        </div>

        <div class="filter-container" style="color:#757575;">
            订单总数: {{ total }},
            未支付数量: {{ orderInit }},
            已支付定金数量: {{ orderDeposit }},
            购买完成数量: {{ orderSuccess }},
            历史订单数量: {{ orderHistory }},
            订单关闭数量: {{ orderClose }}
        </div>
        <br>
        <el-table :key='tableKey' :data="list" v-loading="listLoading" 
        border fit highlight-current-row style="width: 100%;" @selection-change="handleSelectionChange">

            <el-table-column type="selection" width="40">

            </el-table-column>

            <el-table-column align="center" label="事业部" width="120">
                <template scope="scope">
                    <span>{{scope.row.dept_name}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="项目名称" width="140">
                <template scope="scope">
                    <span>{{scope.row.project_name}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="订单号" width="165">
                <template scope="scope">
                    <span>{{scope.row.order_no}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="购买方式" width="120">
                <template scope="scope">
                    <span>{{ purchaseMethod[scope.row.purchase_method] || ''}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="购买类型" width="120">
                <template scope="scope">
                    <span>{{ buyType[scope.row.buy_type] || ''}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="订单状态">
                <template scope="scope">
                    <span>{{orderStatus[scope.row.order_status] || ''}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="车位编号">
                <template scope="scope">
                    <span>{{scope.row.parking_no}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="车位标签">
                <template scope="scope">
                    <span>{{parkingTag[scope.row.parking_tag] || ''}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="推荐人">
                <template scope="scope">
                    <span>{{scope.row.recommend_name}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="客户姓名">
                <template scope="scope">
                    <span>{{scope.row.customer_name}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="客户手机" width="120">
                <template scope="scope">
                    <span>{{scope.row.customer_phone}}</span>
                </template>
            </el-table-column>


            <el-table-column align="center" label="定金">
                <template scope="scope">
                    <span>{{scope.row.deposit}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="尾款">
                <template scope="scope">
                    <span>{{scope.row.tail_price}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="饭票">
                <template scope="scope">
                    <span>{{scope.row.total_ticket}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="下单时间" width="160">
                <template scope="scope">
                    <span>{{scope.row.create_time}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="签约状态" width="160">
                <template scope="scope">
                    <span v-if="scope.row.sign_state==0">未签</span>
                    <span v-if="scope.row.sign_state==1">已签</span>
                </template>
            </el-table-column>
            <el-table-column  fixed="right" align="center" width="250" label="操作" >
                <template scope="scope">
                    <el-button v-if="scope.row.buy_type==1&&scope.row.order_status==3" size="small" type="primary" @click="confirmSuccess(scope.row.order_id)">
                       贷款成功
                    </el-button>

                    <el-button  v-if="scope.row.buy_type==1&&scope.row.order_status==3" size="small" type="primary" @click="confirmFaile(scope.row.order_id)">
                       贷款失败
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
    import httpFile from '@/utils/downloadFile'

    export default {
        name: 'orderList',
        data() {
            return {
                list: [],
                total: 0,
                listLoading: true,
                project: '',
                query: {
                    page: 1,
                    page_size: 10,
                    region_name: '',
                    dept_name: '',
                    project_name: '',
                    parking_no: '',
                    customer_phone: '',
                    order_no: '',
                    order_status: '',
                    parkin_tag: '',
                    start_time: '',
                    end_time: '',
                },
                payType: [],
                orderStatus: [],
                purchaseMethod: [],
                buyType: [],
                parkingTag: [],
                orderInit: 0,
                orderDeposit: 0,
                orderSuccess: 0,
                orderHistory: 0,
                orderClose: 0,
                tableKey: 0,
                
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
                httpClient.get('admin/count/order', { params: this.query }).then(response => {
                    const data = response.content
                    this.list = data.list
                    this.total = data.total
                    this.payType = data.payType
                    this.purchaseMethod = data.purchaseMethod
                    this.buyType = data.buyType
                    this.orderStatus = data.orderStatus
                    this.parkingTag = data.parkingTag
                    this.orderInit = data.orderInit
                    this.orderDeposit = data.orderDeposit
                    this.orderSuccess = data.orderSuccess
                    this.orderHistory = data.orderHistory
                    this.orderClose = data.orderClose
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
            },
            confirmSuccess(order_id) {
                this.$confirm('确认该业主贷款成功?')
                    .then(_=> {
                        httpClient.post('/admin/ygg/order/success',{ order_id: order_id }).then(response => {
                            this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                            this.getList()       
                        })
                    }).catch(_ => {})
            },  
            confirmFaile(order_id) {
                this.$confirm('确认该业主贷款失败?')
                    .then(_=> {
                        httpClient.post('/admin/ygg/order/fail',{ order_id: order_id }).then(response => {
                            this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                            this.getList()       
                        })
                    }).catch(_ => {})
            },  
             // 下载文件
            download (data) {
                if (!data) {
                    return
                }
                let url = window.URL.createObjectURL(new Blob([data]))
                let link = document.createElement('a')
                link.style.display = 'none'
                link.href = url
                link.setAttribute('download', '彩车位订单.xlsx')
                
                document.body.appendChild(link)
                link.click()
            },
             onExport() {
                this.$message('导出中...')
                httpFile.get('/admin/order/export', { params: this.query }).then(response => {
                    this.download(response)
                })
            },
        }
    }
</script>

<style lang="css">

</style>