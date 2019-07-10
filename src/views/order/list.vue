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
                <el-form-item label="">
                    <el-input v-model="query.customer_phone" clearable placeholder="客户手机号"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="query.order_no" clearable placeholder="订单编号"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-select v-model="query.order_status" clearable placeholder="订单状态">
                        <el-option v-for="(item, index) in orderStatus" :key="index" :label="item" :value="parseInt(index)"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-select v-model="query.parking_tag" clearable placeholder="车位标签">
                        <el-option v-for="(item, index) in parkingTag" :key="index" :label="item" :value="parseInt(index)"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onExport">导出</el-button>
                </el-form-item>
            </el-form>

        </div>
        <el-table :key='tableKey' :data="list" v-loading="listLoading"
                  border fit highlight-current-row style="width: 100%;" @selection-change="handleSelectionChange">

            <el-table-column type="selection" width="40">

            </el-table-column>

            <el-table-column align="center" label="订单号" width="165">
                <template scope="scope">
                    <span>{{scope.row.order_no}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="项目名称">
                <template scope="scope">
                    <span>{{scope.row.project_name}}</span>
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

            <el-table-column align="center" label="购买方式" width="120">
                <template scope="scope">
                    <span>{{ purchaseMethod[scope.row.purchase_method] || ''}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="总价">
                <template scope="scope">
                    <span>{{scope.row.purchase_price}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="订单金额">
                <template scope="scope">
                    <span>{{scope.row.deposit}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="订单状态">
                <template scope="scope">
                    <span>{{orderStatus[scope.row.order_status] || ''}}</span>
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

            <el-table-column fixed="right" align="center" width="140" label="操作" >
                <template scope="scope">

                    <router-link :to="{path: '/order/detail/' + scope.row.order_id}">
                        <el-button  size="small" type="primary">查看</el-button>
                    </router-link>
                    <el-button v-if="scope.row.order_status == 3"  size="small" type="primary" @click="update(scope.row)" style="margin-top:5px;">
                        编辑车位售价
                    </el-button>
                    <!-- <router-link :to="{path: '/project/parking/edit/' + scope.row.parking_id}">
                        <el-button  size="small" type="primary">编辑</el-button>
                    </router-link> -->
                    <!-- <el-button  size="small" type="danger" @click="confirmDelete(scope.row.order_id)">
                        删除
                    </el-button> -->
                </template>
            </el-table-column>


        </el-table>

        <div v-show="!listLoading" class="pagination-container" style="margin-top:10px;text-align:right">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="query.page"
                           :page-sizes="[10,20,30,50]" :page-size="query.page_size" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>


        <!-- 编辑弹窗 -->
        <el-dialog title="编辑车位售价" :visible.sync="dialogFormUpdateVisible" width="50%">
            <el-form :ref="formUpdate" :model="formUpdate" label-width="120px">
                <el-form-item label="订单号">
                    <span>{{ formUpdate.order_no }}</span>
                </el-form-item>
                <el-form-item label="车位编号">
                    <span>{{ formUpdate.parking_no }}</span>
                </el-form-item>
                <el-form-item label="车位售价">
                    <span>{{ formUpdate.sell_price }}</span>
                </el-form-item>
                <el-form-item label="车位新售价" required>
                    <el-input v-model="formUpdate.new_sell_price" autocomplete="off"></el-input>
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
                },
                payType: [],
                orderStatus: [],
                purchaseMethod: [],
                parkingTag:[],
                tableKey: 0,
                formUpdate: {
                    order_id: '',
                    parking_id:'',
                    sell_price: '',
                    order_no: '',
                    parking_no: '',
                    new_sell_price: ''
                },
                dialogFormUpdateVisible: false
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
                httpClient.get('admin/order', { params: this.query }).then(response => {
                    const data = response.content
                    this.list = data.list
                this.total = data.total
                this.payType = data.payType
                this.purchaseMethod = data.purchaseMethod
                this.orderStatus = data.orderStatus
                this.parkingTag = data.parkingTag
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
            update(row) {
                //this.id = id
                // this.$refs['formUpdate'].resetFields();
                this.dialogFormUpdateVisible = true
                this.formUpdate.order_id = row.order_id
                this.formUpdate.parking_id = row.parking_id
                this.formUpdate.sell_price = row.purchase_price
                this.formUpdate.order_no = row.order_no
                this.formUpdate.parking_no = row.parking_no

            },
            formUpdateSubmit() {
                this.$message('提交中...')
                httpClient.post('admin/edit/order/sell/price/', this.formUpdate).then(response => {
                    this.dialogFormUpdateVisible = false
                this.$message({
                    type: 'success',
                    message: '操作成功'
                })
                this.getList()
            })
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