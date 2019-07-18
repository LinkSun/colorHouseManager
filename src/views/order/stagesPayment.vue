<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <el-form :inline="true" :model="query" class="demo-form-inline">
                <el-date-picker class="filter-item"
                    v-model="value1"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="下单开始时间"
                    end-placeholder="下单结束时间"
                    value-format="yyyy-MM-dd">
                </el-date-picker>
                <el-date-picker class="filter-item"
                    v-model="value2"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="代扣开始时间"
                    end-placeholder="代扣结束时间"
                    value-format="yyyy-MM-dd">
                </el-date-picker>
                <el-form-item label="" style="margin-right: 0;">
                    <el-input v-model="query.child_order_no" placeholder="请输入子订单号" clearable></el-input>
                </el-form-item>
                <el-form-item label="" style="margin-right: 0;">
                    <el-select v-model="query.kk_state" clearable placeholder="扣款状态">
                        <el-option v-for="(value, key, index) in order_kk_state" :key="index" :label="value" :value="key"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="" style="margin-right: 0;">
                    <el-input v-model="query.parking_no" placeholder="请输入车位编号" clearable></el-input>
                </el-form-item>
                 <el-form-item label="" style="margin-right: 0;">
                    <el-input v-model="query.customer_name" placeholder="请输入客户姓名" clearable></el-input>
                </el-form-item>
                 <el-form-item label="" style="margin-right: 0;">
                    <el-input v-model="query.customer_mobile" placeholder="请输入客户手机" clearable></el-input>
                </el-form-item>
                <el-form-item label="" style="margin-right: 0;">
                    <el-select v-model="query.fq_state" clearable placeholder="分期状态">
                        <el-option v-for="(value, key, index) in order_fq_state" :key="index" :label="value" :value="key"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="" style="margin-right: 0;">
                    <el-select v-model="query.parking_tag" clearable placeholder="车位标签">
                        <el-option v-for="(value, key, index) in order_parking_tag" :key="index" :label="value" :value="key"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onExport">导出</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="add">添加</el-button>
                </el-form-item>
            </el-form>
            
        </div>
        <el-table :key='tableKey' :data="list" v-loading="listLoading" 
        border fit highlight-current-row style="width: 100%;" @selection-change="handleSelectionChange">

            <el-table-column type="selection" width="40">

            </el-table-column>
            
            <el-table-column align="center" label="订单号" width="120">
                <template scope="scope">
                    <span>{{scope.row.order_no}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="子订单" width="120">
                <template scope="scope">
                    <span>{{scope.row.child_order_no}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="代扣订单" width="120">
                <template scope="scope">
                    <span>{{scope.row.with_out_no}}</span>
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
                    <span v-if="scope.row.parking_tag==0">标品</span>
                    <span v-if="scope.row.parking_tag==1">无理由退</span>
                    <span v-if="scope.row.parking_tag==2">员工购</span>
                    <span v-if="scope.row.parking_tag==3">无理由退+员工购</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="OA">
                <template scope="scope">
                    <span>{{scope.row.oa}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="客户姓名">
                <template scope="scope">
                    <span>{{scope.row.customer_name}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="手机号" width="120">
                <template scope="scope">
                    <span>{{scope.row.customer_mobile}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="身份证" width="120">
                <template scope="scope">
                    <span>{{scope.row.card_no}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="银行卡号" width="120">
                <template scope="scope">
                    <span>{{scope.row.bank_no}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="开户行" width="120">
                <template scope="scope">
                    <span>{{scope.row.bank_name}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="总价">
                <template scope="scope">
                    <span>{{scope.row.total_price}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="定金">
                <template scope="scope">
                    <span>{{scope.row.deposit}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="扣款金额">
                <template scope="scope">
                    <span>{{scope.row.kk_amount}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="分期期数">
                <template scope="scope">
                    <span>{{scope.row.qi_num}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="分期数">
                <template scope="scope">
                    <span>{{scope.row.total_qi_num}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="扣款时间" width="150">
                <template scope="scope">
                    <span>{{scope.row.kk_time}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="创建时间" width="150">
                <template scope="scope">
                    <span>{{scope.row.created_at}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="扣款状态">
                <template scope="scope">
                    <span v-if="scope.row.kk_state==0">扣款中</span>
                    <span v-if="scope.row.kk_state==1">扣款成功</span>
                    <span v-if="scope.row.kk_state==2">扣款失败</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="分期状态">
                <template scope="scope">
                    <span v-if="scope.row.fq_state==1">分期中</span>
                    <span v-if="scope.row.fq_state==2">已完成</span>
                    <span v-if="scope.row.fq_state==3">已断供</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="支付时间" width="150">
                <template scope="scope">
                    <span>{{scope.row.pay_time}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="备注">
                <template scope="scope">
                    <span>{{scope.row.remark}}</span>
                </template>
            </el-table-column>

            <el-table-column fixed="right" align="center" width="150" label="操作" >
                <template scope="scope">
                    <el-button  size="small" type="primary" @click="search(scope.row.id)">查看</el-button>
                </template>
            </el-table-column>


        </el-table>

        <div v-show="!listLoading" class="pagination-container" style="margin-top:10px;text-align:right">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="query.page"
                           :page-sizes="[10,20,30,50]" :page-size="query.page_size" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
            <!-- 添加弹窗 -->
        <el-dialog title="查看扣款订单" :visible.sync="dialogFormUpdateVisible" width="50%">
             <el-form :model="form" v-loading="listLoading" label-width="125px">
            <div style="margin-bottom: 15px;">车位基本信息: </div>
            <div class="mb30 clear">
            <div style="width:50%;float:left">
                <el-form-item label="订单号" style="margin-bottom: 7px;">
                    <el-input @blur="order" v-model="order_no" clearable placeholder="请输入订单号"></el-input>
                </el-form-item>
                <el-form-item label="项目名称" style="margin-bottom: 7px;">
                    <span>{{form.project_name}}</span>
                </el-form-item>
            </div>
            <div style="width:50%;float:left">
                <el-form-item label="车位编号" style="margin-bottom: 7px;">
                    <span>{{form.parking_no}}</span>
                </el-form-item>
            </div>
            </div>
            <div style="margin-bottom: 15px;">订单信息: </div>
            <div class="mb30 clear">
            <div style="width:50%;float:left">
                <el-form-item label="车位总价" style="margin-bottom: 7px;">
                    <span>{{form.purchase_price}}</span>
                </el-form-item>
                <el-form-item label="每期扣款金额" style="margin-bottom: 7px;">
                    <!-- <el-input v-model="form.kk_amount" clearable placeholder="请输入金额"></el-input> -->
                    <span>{{kk_amount/ 1 | rounding}}</span>
                </el-form-item>
                <el-form-item label="支付时间" style="margin-bottom: 7px;">
                    <span>{{form.payment_time}}</span>
                </el-form-item>
                <el-form-item label="扣款时间" style="margin-bottom: 7px;">
                    每月&nbsp;&nbsp;&nbsp; <span>15</span>&nbsp;&nbsp;&nbsp;日
                </el-form-item>
                <el-form-item label="二次扣款时间" style="margin-bottom: 7px;">
                    每月&nbsp;&nbsp;&nbsp; <span>20&nbsp;&nbsp;&nbsp;</span>日
                </el-form-item>
                
            </div>
            <div style="width:50%;float:left">
                <el-form-item label="定金金额" style="margin-bottom: 7px;">
                    <span>{{form.deposit}}</span>
                </el-form-item>
                <el-form-item label="分期数" style="margin-bottom: 7px;">
                    <el-input @blur="fq" v-model="total_fq_num" clearable placeholder="请输入分期数"></el-input>
                </el-form-item>
            </div>
            </div>
            <div style="margin-bottom: 15px;">用户信息: </div>
            <div class="mb30 clear">
            <div style="width:50%;float:left">
                <el-form-item label="客户姓名" style="margin-bottom: 7px;">
                    <span>{{form.customer_name}}</span>
                </el-form-item>
                <el-form-item label="手机号" style="margin-bottom: 7px;">
                    <span>{{form.customer_phone}}</span>
                </el-form-item>
                <el-form-item label="身份证" style="margin-bottom: 7px;">
                    <span>{{form.customer_card}}</span>
                </el-form-item>
                <el-form-item label="银行卡" style="margin-bottom: 7px;">
                    <el-input v-model="form.bank_no" clearable placeholder="请输入银行卡号"></el-input>
                </el-form-item>
                <el-form-item label="开户行" style="margin-bottom: 7px;">
                    <el-select v-model="form.bank_name" clearable placeholder="请选择开户行" style="width:100%">
                        <el-option v-for="(value, key, index) in bankName" :key="index" :label="value" :value="value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注" style="margin-bottom: 7px;">
                    <el-input v-model="form.remark" clearable placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-button type="primary" @click="formSubmit">提交</el-button>
                </el-form-item>
            </div>
            </div>
        </el-form>
        </el-dialog>
            <!-- 查看弹窗 -->
        <el-dialog title="查看扣款订单" :visible.sync="dialogFormUpdateVisible1" width="50%">
             <el-form :model="info" v-loading="listLoading" label-width="125px">
            <div style="margin-bottom: 15px;">车位基本信息: </div>
            <div class="mb30 clear">
            <div style="width:50%;float:left">
                <el-form-item label="订单号" style="margin-bottom: 7px;">
                    <span>{{info.order_no}}</span>
                </el-form-item>
                <el-form-item label="项目名称" style="margin-bottom: 7px;">
                    <span>{{info.project_name}}</span>
                </el-form-item>
            </div>
            <div style="width:50%;float:left">
                <el-form-item label="子订单号" style="margin-bottom: 7px;">
                    <span>{{info.child_order_no}}</span>
                </el-form-item>
                <el-form-item label="车位编号" style="margin-bottom: 7px;">
                    <span>{{info.parking_no}}</span>
                </el-form-item>
            </div>
            </div>
            <div style="margin-bottom: 15px;">订单信息: </div>
            <div class="mb30 clear">
            <div style="width:50%;float:left">
                <el-form-item label="车位总价" style="margin-bottom: 7px;">
                    <span>{{info.total_price}}</span>
                </el-form-item>
                <el-form-item label="每期扣款金额" style="margin-bottom: 7px;">
                    <span>{{info.kk_amount}}</span>
                </el-form-item>
                <el-form-item label="分期数" style="margin-bottom: 7px;">
                    <span>{{info.total_qi_num}}</span>
                </el-form-item>
                <el-form-item label="扣款时间" style="margin-bottom: 7px;">
                    <span>每月&nbsp;&nbsp;&nbsp;15&nbsp;&nbsp;&nbsp;日</span>
                </el-form-item>
                <el-form-item label="二次扣款时间" style="margin-bottom: 7px;">
                    <span>每月&nbsp;&nbsp;&nbsp;20&nbsp;&nbsp;&nbsp;日</span>
                </el-form-item>
                <el-form-item label="支付时间" style="margin-bottom: 7px;">
                    <span>{{info.pay_time|formatDate}}</span>
                </el-form-item>
            </div>
            <div style="width:50%;float:left">
                <el-form-item label="定金金额" style="margin-bottom: 7px;">
                    <span>{{info.deposit}}</span>
                </el-form-item>
                <el-form-item label="分期状态" style="margin-bottom: 7px;">
                    <span v-if="info.fq_state==0">分期中</span>
                    <span v-if="info.fq_state==1">已完成</span>
                    <span v-if="info.fq_state==2">已断供</span>
                </el-form-item>
                <el-form-item label="分期期数" style="margin-bottom: 7px;">
                    <span>{{info.qi_num}}</span>
                </el-form-item>
            </div>
            </div>
            <div style="margin-bottom: 15px;">用户信息: </div>
            <div class="mb30 clear">
            <div style="width:50%;float:left">
                <el-form-item label="客户姓名" style="margin-bottom: 7px;">
                    <span>{{info.customer_name}}</span>
                </el-form-item>
                <el-form-item label="手机号" style="margin-bottom: 7px;">
                    <span>{{info.customer_mobile}}</span>
                </el-form-item>
                <el-form-item label="身份证" style="margin-bottom: 7px;">
                    <span>{{info.card_no }}</span>
                </el-form-item>
                <el-form-item label="银行卡" style="margin-bottom: 7px;">
                    <span>{{info.bank_no }}</span>
                </el-form-item>
                <el-form-item label="开户行" style="margin-bottom: 7px;">
                    <span>{{info.bank_name}}</span>
                </el-form-item>
                <el-form-item label="备注" style="margin-bottom: 7px;">
                    <span>{{info.remark}}</span>
                </el-form-item>
            </div>
            </div>
            <div style="margin-bottom: 15px;">扣款情况: </div>
            <div class="mb30 clear">
            <div style="width:50%;float:left">
                <el-form-item label="子订单生成时间" style="margin-bottom: 7px;">
                    <span>{{info.created_at|formatDate}}</span>
                </el-form-item>
                <el-form-item label="扣款时间" style="margin-bottom: 7px;">
                    <span>{{info.kk_time|formatDate}}</span>
                </el-form-item>
                <el-form-item label="扣款结果" style="margin-bottom: 7px;">
                    <span v-if="info.kk_state==0">扣款中</span>
                    <span v-if="info.kk_state==1">扣款成功</span>
                    <span v-if="info.kk_state==2">扣款失败</span>
                </el-form-item>
                <el-form-item label="代扣单号" style="margin-bottom: 7px;">
                    <span>{{info.with_out_no}}</span>
                </el-form-item>
                <el-form-item label="结果说明" style="margin-bottom: 7px;">
                    <span>{{info.remark}}</span>
                </el-form-item>
            </div>
            </div>
        </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import httpClient from '@/utils/request'
    import httpFile from '@/utils/downloadFile'
    import { formatDate } from '@/utils/index'

    export default {
        data() {
            return {
                list: [],
                total: 0,
                id:"",
                value1:'',
                value2:'',
                listLoading: true,
                query: {
                    page: 1,
                    page_size: 10,
                    child_order_no:'',
                    kk_state:'',
                    parking_no:'',
                    customer_name:'',
                    customer_mobile:'',
                    fq_state:'',
                    parking_tag:'',
                    order_created_start:'',
                    order_created_end:'',
                    kk_time_start:'',
                    kk_time_end:'',
                },
                order_no:'',
                bankName: [
                    '中国工商银行', 
                    '中国银行', 
                    '中国建设银行', 
                    '交通银行', 
                    '中国光大银行', 
                    '广发银行', 
                    '兴业银行', 
                    '上海浦东发展银行', 
                    '上海银行', 
                    '中国邮政储蓄银行', 
                    '中信银行', 
                    '中国农业银行', 
                    '招商银行', 
                    '平安银行'
                ],
                total_fq_num:'',
                kk_amount:'',
                form: {
                    total_fq_num:'',
                    kk_amount:'',
                    bank_no:'',
                    bank_name:'',
                    remark:'',
                    order_id:'',
                    purchase_price:'',
                    deposit:'',
                },
                info:{},
                order_kk_state:[],
                order_fq_state:[],
                order_parking_tag:[],
                // bankName:[],
                dialogFormUpdateVisible:false,
                dialogFormUpdateVisible1:false,
                tableKey: 0,                
            }
        },
        filters: {
            formatDate(param) {
                if (param <= 0) {
                    return ''
                }
                let date = new Date(param * 1000)
                return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
            },
            rounding (value) {
                if (value == 0) {
                    return ''
                }
                return value.toFixed(2)
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
            fq(){
                if (this.total_fq_num) {
                    this.kk_amount=(this.form.purchase_price-this.form.deposit)/this.total_fq_num
                    this.form.kk_amount=this.kk_amount
                    this.form.total_fq_num=this.total_fq_num
                }else{
                    this.kk_amount=''
                }
                
            },
             // 导出
            onExport() {
                this.query.order_created_start=this.value1[0]
                this.query.order_created_end=this.value1[1]
                this.query.kk_time_start=this.value2[0]
                this.query.kk_time_end=this.value2[1]
                this.$message('导出中...')
                httpFile.get('/admin/staging/fq/export', { params: this.query }).then(response => {
                    this.download1(response)
                })
            },
              // 导出文件
            download1 (data) {
                if (!data) {
                    return
                }
                let url = window.URL.createObjectURL(new Blob([data]))
                let link = document.createElement('a')
                link.style.display = 'none'
                link.href = url
                link.setAttribute('download', '分期扣款信息.xlsx')
                
                document.body.appendChild(link)
                link.click()
            },
            onSearch(column) {
                console.log("下单时间",this.value1)
                console.log("代扣时间",this.value2)
                // return;
                if (this.value1) {
                    this.query.order_created_start=this.value1[0]
                    this.query.order_created_end=this.value1[1]
                }else{
                    this.query.order_created_start=''
                    this.query.order_created_end=''
                }
                if (this.value2) {
                    this.query.kk_time_start=this.value2[0]
                    this.query.kk_time_end=this.value2[1]
                }else{
                    this.query.kk_time_start=''
                    this.query.kk_time_end=''
                }
                
                this.getList()
            },
            getList() {
                this.listLoading = true;
                // httpClient.get('admin/staging/fq/list', { params: this.query }).then(response => {
                    httpClient.get('admin/staging/fq/list',{ params: this.query }).then(response => {
                    console.log("饭票",response)
                    this.list = response.content.list
                    this.order_kk_state = response.content.order_kk_state
                    this.order_fq_state = response.content.order_fq_state
                    this.order_parking_tag = response.content.order_parking_tag
                    this.total = response.content.total
                    this.listLoading = false
                })
            },
            
            handleSelectionChange(val) {
                console.log("val",val)
                this.multipleSelection = val
            },
            // 提交
            formSubmit() {
                if (!this.order_no) {
                    this.$message({
                        message: '请输入订单号',
                        type: 'warning'
                    });
                    return;
                }
                if (!this.total_fq_num) {
                    this.$message({
                        message: '请输入分期数',
                        type: 'warning'
                    });
                    return;
                }
                if (!this.form.bank_no) {
                    this.$message({
                        message: '请输入银行卡号',
                        type: 'warning'
                    });
                    return;
                }
                if (!this.form.bank_name) {
                    this.$message({
                        message: '请选择开户行',
                        type: 'warning'
                    });
                    return;
                }
                this.$message('提交中...')
                httpClient.post('admin/staging/fq/add', this.form).then(response => {
                       this.dialogFormUpdateVisible = false
                       this.$message({ message: '操作成功', type: 'success' })
                       this.getList()
                        
                })
            },
             // 添加弹窗
            add() {
                this.form={}
                this.order_no=''
                this.kk_amount=''
                this.total_fq_num=''
                this.dialogFormUpdateVisible = true
                
            },
             // 查看弹窗
            search(id) {
                this.id = id
                // this.$refs['formUpdate'].resetFields();
                this.dialogFormUpdateVisible1 = true
                httpClient.get('admin/staging/fq/detail?id=' + id).then(response => {
                    this.info = response.content
                    
                })
                
            },
            order(){
                httpClient.get('admin/get/detail/orderno?order_no=' + this.order_no).then(response => {
                    this.form = response.content.order
                    this.form.order_id = response.content.order.order_id
                    this.form.purchase_price = response.content.order.purchase_price
                    this.form.deposit = response.content.order.deposit
                })
            },
        }
    }
</script>

<style>
.fileinput {display: none;}
.el-date-editor .el-range-separator{
    width: 7%!important;
}
</style>
<style scoped>
.clear::before, .clear::after {
    content: "";
    display: block;
    clear: both;
}
.left,.right{
    width: 50%;
    float: left;
}
.mb30{
    margin-bottom: 30px;
}
.mb15{
    margin-bottom: 7px;
}
</style>