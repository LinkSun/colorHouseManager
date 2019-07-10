<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            
               <el-form :inline="true" :model="query" class="demo-form-inline">
                <el-form-item>
                    <el-button type="primary" @click="pass" :disabled="btnPass">审核通过</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="notPass" :disabled="btnPass">审核不通过</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="send" :disabled="btnSend">发放</el-button>
                </el-form-item>
            </el-form>
            <div>
                <span class="money">{{ title }}</span>
                <span class="money">发放总额：{{ detailSum['total'] | formateMoney }}</span>
                <span class="money">已发总额：{{ detailSum['sent_amount'] | formateMoney }}</span>
                <span class="money">未发总额：{{ (detailSum['total'] - detailSum['sent_amount']) | formateMoney }}</span>
            </div>
            <br>
        </div>
        <el-table :key='tableKey' :data="list" v-loading="listLoading" 
        border fit highlight-current-row style="width: 100%;" @selection-change="handleSelectionChange">

            <el-table-column type="selection" width="40">

            </el-table-column>

            <el-table-column align="center" label="姓名">
                <template scope="scope">
                    <span>{{scope.row.oa_name}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="OA账号">
                <template scope="scope">
                    <span>{{scope.row.oa_account}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="手机">
                <template scope="scope">
                    <span>{{scope.row.oa_phone}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="项目">
                <template scope="scope">
                    <span>{{scope.row.community_name}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="金额">
                <template scope="scope">
                    <span>{{scope.row.amount | formateMoney}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="状态">
                <template scope="scope">
                    <span :style="scope.row.status | formatColor">{{ profitDetailType[scope.row.status] || '' }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="备注">
                <template scope="scope">
                    <span>{{ scope.row.remark }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="创建时间">
                <template scope="scope">
                    <span>{{scope.row.created_at | formatDate}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="发放时间">
                <template scope="scope">
                    <span>{{scope.row.send_time | formatDate}}</span>
                </template>
            </el-table-column>

            <!-- <el-table-column fixed="right" align="center" width="100" label="操作" >
                <template scope="scope">
                
                    <router-link :to="{path: '/project/parking/detail/' + scope.row.parking_id}">
                        <el-button  size="small" type="primary">详情</el-button>
                    </router-link>

                </template>
            </el-table-column> -->


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
        name: 'profitDetailList',
        data() {
            return {
                id: 0,
                list: [],
                total: 0,
                listLoading: true,
                detailSum: [],
                title: '',
                user_profit_status: 0,
                query: {
                    page: 1,
                    page_size: 10,
                },
                profitType: [],
                profitDetailType: [],
                multipleSelection: [],
                btnSend: false,
                btnPass: false,
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
                return formatDate(date, 'yyyy-MM-dd hh:mm')
            },
            formatColor(param) {
                let primary = 'color:#409EFF;'
                let info = 'color:#909399;'
                let success = 'color:#67C23A;'
                let warning = 'color:#E6A23C;'
                let danger = 'color:#F56C6C;'

                if (param == 1 || param == 4) {
                    return  warning
                }

                if (param == 2) {
                    return  success
                }
                if (param == 3) {
                    return  danger
                }
                return info
            }
        },
        created() {
            const params = this.$route.params;
            this.id = parseInt(params.id);
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
                httpClient.get('admin/user/profit/detail/' + this.id, { params: this.query }).then(response => {
                    const data = response.content
                    this.title = data.title
                    this.user_profit_status = data.user_profit_status
                    this.list = data.list
                    this.total = data.total
                    this.detailSum = data.detailSum
                    this.profitType = data.profitType
                    this.profitDetailType = data.profitDetailType
                    if (this.user_profit_status != 0) {
                        this.btnPass = true;
                    }
                    if (this.user_profit_status == 0 || this.user_profit_status == 2) {
                        this.btnSend = true;
                    } else {
                        this.btnSend = false;
                    }
                    this.listLoading = false
                })
            },
            pass() {
                this.$confirm('确认要审核通过吗？')
                    .then(_=> {
                        this.$message('处理中...')
                        httpClient.post('admin/user/profit/pass/' + this.id, {ok: 1}).then(response => {
                            this.$message({
                                type: 'success',
                                message: '操作成功'
                            })
                            this.getList()
                        })
                    }).catch(_ => {})
            },
            notPass() {
                this.$confirm('确认要审核不通过吗？')
                    .then(_=> {
                        this.$message('处理中...')
                        httpClient.post('admin/user/profit/pass/' + this.id, {ok: 0}).then(response => {
                            this.$message({
                                type: 'success',
                                message: '操作成功'
                            })
                            this.getList()
                        })
                    }).catch(_ => {})
            },
            send() {
                this.$confirm('确认要发放奖励吗？')
                    .then(_=> {
                        this.$message('处理中...')
                        httpClient.post('admin/user/profit/send/' + this.id).then(response => {
                            this.$message({
                                type: 'success',
                                message: '操作成功'
                            })
                            this.getList()
                        })
                    }).catch(_ => {})
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
            }
        }
    }
</script>

<style lang="css">
.money {margin-right: 20px; color: #909399;}
</style>