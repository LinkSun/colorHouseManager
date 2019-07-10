<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            
               <el-form :inline="true" :model="query" class="demo-form-inline">
                <el-form-item label="">
                    <el-input v-model="query.project_name" placeholder="输入项目名称" clearable></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="query.parking_no" placeholder="车位编号" clearable></el-input>
                </el-form-item>
                <el-date-picker class="filter-item"
                    v-model="value1"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    value-format="yyyy-MM-dd">
                </el-date-picker>
                <el-form-item>
                    <el-button type="primary" @click="onSearch">搜索</el-button>
                </el-form-item>
                
            </el-form>
            
        </div>
        <el-table :key='tableKey' :data="list" v-loading="listLoading" 
        border fit highlight-current-row style="width: 100%;" @selection-change="handleSelectionChange">

            <el-table-column type="selection" width="40">

            </el-table-column>
            
            <el-table-column align="center" label="项目名称" width="80">
                <template scope="scope">
                    <span>{{scope.row.project_name}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="车位编号">
                <template scope="scope">
                    <span>{{scope.row.parking_no}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="楼栋名称">
                <template scope="scope">
                    <span>{{scope.row.build_name}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="业主姓名">
                <template scope="scope">
                    <span>{{scope.row.name}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="总发放/总期数" width="150">
                <template scope="scope">
                    <span>{{scope.row.total_amount}}/{{scope.row.total_num}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="手机号" width="150">
                <template scope="scope">
                    <span>{{scope.row.mobile}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="订单状态">
                <template scope="scope">
                    <span v-if="scope.row.order_status==2">购买成功</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="订单支付时间" width="150">
                <template scope="scope">
                    <span>{{scope.row.order_pay_time}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="创建时间" width="150">
                <template scope="scope">
                    <span>{{scope.row.created_at}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="发放状态">
                <template scope="scope">
                    <span v-if="scope.row.state==0">待审核</span>
                    <span v-if="scope.row.state==1">发放成功</span>
                    <span v-if="scope.row.state==2">审核不通过</span>
                    <span v-if="scope.row.state==3">发放中</span>
                </template>
            </el-table-column>

            <el-table-column fixed="right" align="center" width="250" label="操作" >
                <template scope="scope">

                    <router-link :to="{path: '/mealticket/mealticketDetail/' + scope.row.id}">
                        <el-button  size="small" type="primary">发放详情</el-button>
                    </router-link>
                    <router-link :to="{path: '/mealticket/mealticketExamine/' + scope.row.id}">
                        <el-button v-if="scope.row.state==0" size="small" type="primary">审核</el-button>
                    </router-link>
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
        name: 'orderList',
        data() {
            return {
                list: [],
                total: 0,
                id:"",
                value1:'',
                listLoading: true,
                query: {
                    page: 1,
                    page_size: 10,
                    project_name:'',
                    parking_no:'',
                    start_time:'',
                    end_time:'',
                },
                
                tableKey: 0,                
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
                httpClient.get('admin/fp/plan/list', { params: this.query }).then(response => {
                    console.log("饭票",response)
                    this.list = response.content.list
                    this.total = response.content.total
                    this.listLoading = false
                })
            },
            onSearch(column) {
                this.query.start_time=this.value1[0]
                this.query.end_time=this.value1[1]
                console.log("start_time",this.query.start_time)
                this.getList()
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
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