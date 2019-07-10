<template>
    <div class="app-container calendar-list-container">
         <div class="filter-container">
               <el-form :inline="true" :model="query" class="demo-form-inline">
                 <el-form-item label="">
                    <el-input v-model="query.code" placeholder="请输入券码" clearable></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="query.mobile" placeholder="请输入手机号" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSearch">搜索</el-button>
                </el-form-item>
            </el-form>
            
        </div>
        <el-table  
        :data="list" 
        v-loading="listLoading" 
        border  
        style="width: 100%;">
            <!-- <el-table-column align="center" label="描述">
                <template scope="scope">
                    <span>{{scope.row.title}}</span>
                </template>
            </el-table-column> -->
            <el-table-column align="center" label="ID">
                <template scope="scope">
                    <span>{{scope.row.id}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="券码">
                <template scope="scope">
                    <span>{{scope.row.code}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="用户名称">
                <template scope="scope">
                    <span>{{scope.row.user_name}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="用户手机号">
                <template scope="scope">
                    <span>{{scope.row.mobile}}</span>
                </template>
            </el-table-column>
            
            <el-table-column align="center" label="抵扣金额">
                <template scope="scope">
                    <span>{{scope.row.coupon_amount}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="最少使用金额">
                <template scope="scope">
                    <span>{{scope.row.min_amount}}</span>
                </template>
            </el-table-column>
            
            <el-table-column align="center" label="有效期">
                <template scope="scope">
                    <span>{{scope.row.valid_day}}</span>
                </template>
            </el-table-column>
            
            <el-table-column align="center" label="创建时间">
                <template scope="scope">
                    <span>{{scope.row.created_at}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="使用状态">
                <template scope="scope">
                    <span>{{scope.row.state}}</span>
                </template>
            </el-table-column>
            </el-table>

        <div v-show="!listLoading" class="pagination-container" style="margin-top:10px;text-align:right">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="query.page"
                           :page-sizes="[10,20,30,50]" :page-size="query.page_size" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <!-- 添加优惠券弹窗 -->
       <!-- <el-dialog title="优惠券" :visible.sync="dialogFormVisible" width="50%">
            <el-form :ref="form" :model="form" label-width="120px">
                <el-form-item label="描述" required>
                    <el-input v-model="form.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="抵扣金额" required>
                    <el-input v-model="form.coupon_amount" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="有效期" required>
                    <el-date-picker
                    v-model="form.valid_day"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="最少使用金额" required>
                    <el-input v-model="form.min_amount" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="formSubmit">提 交</el-button>
            </div>
        </el-dialog> -->
    </div>
</template>

<script>
    import httpClient from '@/utils/request'

    export default {
        name: 'couponList',
        data() {
            return {
                valid_day:'',
                list: [],
                total: 0,
                listLoading: true,
                dialogFormVisible: false,
                query: {
                    page: 1,
                    page_size: 10,
                    code:'',
                    mobile:''
                },
                form: {
                    title:'',
                    coupon_amount:'',
                    valid_day:'',
                    min_amount:'',
                }
            }
        },
        created() {
            this.getList();
        },
        methods: {
              // 添加弹窗
            add() {
                this.dialogFormVisible = true
            },
            formSubmit() {
                this.$message('提交中...')
                httpClient.post('admin/ticket/template/add', this.form).then(response => {
                    this.dialogFormVisible = false
                    this.$message({
                        type: 'success',
                        message: '操作成功'
                    })
                    this.getList()   
                })
            },
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
                httpClient.get('admin/ticket/list', { params: this.query }).then(response => {
                    console.log("优惠券",response)
                    const data = response.content
                    this.list = data.list
                    this.total = data.total
                    this.listLoading = false
                })
            },
            onSearch(column) {
                this.getList()
            },
        }
    }
</script>

<style scoped>
    .el-date-editor{
        width: 100%!important;
    }
</style>