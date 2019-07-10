<template>
    <div class="app-container calendar-list-container">
        <!-- <div class="filter-container">
            
               <el-form :inline="true" :model="query" class="demo-form-inline">
                <el-form-item label="">
                    <el-input v-model="query.label" placeholder="楼盘名称"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="query.mobile" placeholder="预约人电话"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-date-picker
                        v-model="value"
                        type="date"
                        placeholder="选择预约日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="">
                    <el-select v-model="query.status" placeholder="请选择状态">
                        <el-option v-for="(item, index) in appointStatus" :key="index" :label="item" :value="parseInt(index)"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
            </el-form>
            
        </div> -->
        <el-table :key='tableKey' :data="list" v-loading="listLoading" 
        border fit highlight-current-row style="width: 100%;" @selection-change="handleSelectionChange">

            <el-table-column type="selection" width="40">

            </el-table-column>

            <el-table-column align="center" label="订单金额">
                <template scope="scope">
                    <span>{{scope.row.amount}}</span>
                </template>
            </el-table-column>
            
            <el-table-column align="center" label="订单号">
                <template scope="scope">
                    <span>{{scope.row.colour_sn}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="投资人电话">
                <template scope="scope">
                    <span>{{scope.row.mobile}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="客户姓名">
                <template scope="scope">
                    <span>{{scope.row.nickname}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="交易流水">
                <template scope="scope">
                    <span>{{scope.row.out_trade_sn}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="创单时间">
                <template scope="scope">
                    <span>{{scope.row.time_create}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="付款时间">
                <template scope="scope">
                    <span>{{scope.row.time_pay}}</span>
                </template>
            </el-table-column>
            
            <el-table-column align="center" label="更新时间">
                <template scope="scope">
                    <span>{{scope.row.time_update}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="状态">
                <template scope="scope">
                    <span>{{scope.row.state}}</span>
                </template>
            </el-table-column>


        </el-table>

        <div v-show="!listLoading" class="pagination-container" style="margin-top:10px;text-align:right">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="query.page"
                           :page-sizes="[20,40,60]" :page-size="query.page_size" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        
    </div>
</template>

<script>
    import httpClient from '@/utils/request'
    // import { formatDate } from '@/utils/index'

    export default {
        name: 'fpbList',
        data() {
            return {
                list: [],
                total: 0,
                listLoading: true,
                query: {
                    page: 1,
                    page_size: 20,
                    
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
                httpClient.get('admin/ticket/order/list', { params: this.query }).then(response => {
                    const data = response.content
                    this.list = data.list
                    this.total = data.total
                    this.listLoading = false
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            
        }
    }
</script>

<style lang="css">
.fileinput {display: none;}
</style>