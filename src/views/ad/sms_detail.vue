<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
               <el-form :inline="true" :model="query" class="demo-form-inline">
                   <el-form-item label="">
                        <el-input v-model="query.phone" clearable placeholder="手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <el-select v-model="query.send_status" clearable placeholder="发送状态">
                            <el-option v-for="(value, key) in sendStatus" :key="key" :label="value" :value="key"></el-option>
                        </el-select>
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

            <el-table-column align="center" label="编号" width="100">
                <template scope="scope">
                    <span>{{scope.row.id}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="手机号">
                <template scope="scope">
                    <span>{{scope.row.phone}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="状态">
                <template scope="scope">
                    <span :style="scope.row.send_status | formatColor">{{ sendStatus[scope.row.send_status] || '' }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="备注">
                <template scope="scope">
                    <span>{{scope.row.remark}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="发送时间">
                <template scope="scope">
                    <span>{{scope.row.send_time | formatDate}}</span>
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
        name: 'adSmsDetail',
        data() {
            return {
                id: 0,
                list: [],
                total: 0,
                listLoading: true,
                des: '',
                query: {
                    page: 1,
                    page_size: 10,
                    phone: '',
                    send_status: '',
                },
                sendStatus: [],
                tableKey: 0,
                
            }
        },
        filters: {
            formateMoney(param) {
                return parseFloat(param)
            },
            formatDate(param) {
                if (param == 0) {
                    return ''
                }
                let date = new Date(param * 1000)
                return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
            },
            formatColor(param) {
                let primary = 'color:#409EFF;'
                let info = 'color:#909399;'
                let success = 'color:#67C23A;'
                let warning = 'color:#E6A23C;'
                let danger = 'color:#F56C6C;'

                if (param == 1) {
                    return  success
                }
                return info
            }
        },
        created() {
            const params = this.$route.params
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
                httpClient.get('admin/sms/detail/' + this.id, { params: this.query }).then(response => {
                    const data = response.content
                    this.des = data.des
                    this.list = data.list
                    this.total = data.total
                    this.sendStatus = data.sendStatus
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
.fileinput {display: none;}
</style>