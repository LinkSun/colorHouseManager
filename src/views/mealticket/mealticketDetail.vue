<template>
    <div class="app-container calendar-list-container">
        <el-table :key='tableKey' :data="list" v-loading="listLoading" 
        border fit highlight-current-row style="width: 100%;" @selection-change="handleSelectionChange">

            <el-table-column type="selection" width="40">

            </el-table-column>

            <el-table-column align="center" label="分期" width="150">
                <template scope="scope">
                    <span>返还第{{scope.row.key}}期</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="发放金额">
                <template scope="scope">
                    <span>{{scope.row.amount}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="发放日期">
                <template scope="scope">
                    <span>{{scope.row.send_time}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="饭票发放结果">
                <template scope="scope">
                    <span v-if="scope.row.state==0">待发送</span>
                    <span v-if="scope.row.state==1">发送成功</span>
                    <span v-if="scope.row.state==2">发送失败</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="到账状态">
                <template scope="scope">
                    <span v-if="scope.row.dz_state==0">待到账</span>
                    <span v-if="scope.row.dz_state==1">已到账</span>
                </template>
            </el-table-column>
            <el-table-column fixed="right" align="center" width="100" label="操作" >
                <template scope="scope">
                    <el-button v-if="scope.row.dz_state!=0 && scope.row.state==0" size="small" type="primary" @click="submit(scope.row.id)">
                       提交
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
        name: 'orderList',
        data() {
            return {
                list: [],
                total: 0,
                id:"",
                // value1:'',
                listLoading: true,
                // userState: [],
                // roleMap: [],
                query: {
                    page: 1,
                    page_size: 10,
                   
                },
                
                tableKey: 0,
               
            }
        },
        filters: {
            formatD(param) {
                if (param == 0) {
                    return ''
                }
                let date = new Date(param * 1000)
                return formatDate(date, 'yyyy-MM-dd')
            }
        },
        created() {
            const params = this.$route.params
            console.log("params",params)
            this.id = parseInt(params.id)
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
                httpClient.get('admin/fp/plan/detail?plan_id=' + this.id).then(response => {
                    console.log("饭票详情",response)
                    this.list = response.content
                    this.total = response.content.total
                    this.listLoading = false
                })
            },
            onSearch(column) {
                this.getList()
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
           submit(id) {
                httpClient.get('/admin/fp/plan/send?id=' + id).then(response => {
                    this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                })
            },
        }
    }
</script>

<style>
.fileinput {display: none;}
</style>