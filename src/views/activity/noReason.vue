<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            
               <el-form :inline="true" :model="query" class="demo-form-inline">
                <el-form-item label="">
                    <el-input v-model="query.user_name" clearable placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-select v-model="query.status" clearable placeholder="审核状态">
                        <el-option v-for="(item, index) in checkStatus" :key="index" :label="item" :value="index"></el-option>
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

            <el-table-column align="center" label="姓名">
                <template scope="scope">
                    <span>{{scope.row.user_name}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="银行卡号">
                <template scope="scope">
                    <span >{{ scope.row.bank_no }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="图片">
                <template scope="scope">
                    <img :src="scope.row.bank_url" alt="" style="width:120px;height:auto;cursor:pointer;" @click="preview(scope.row.bank_url)">
                </template>
            </el-table-column>

            <el-table-column align="center" label="提交时间">
                <template scope="scope">
                    <span>{{scope.row.created_at|formatDate}}</span>
                </template>
            </el-table-column>

             <el-table-column align="center" label="审核时间">
                <template scope="scope">
                    <span>{{scope.row.checked_at|formatDate}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="审核状态">
                <template scope="scope">
                    <span>{{ checkStatus[scope.row.status] || '' }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="不通过原因">
                <template scope="scope">
                    <span>{{scope.row.remark}}</span>
                </template>
            </el-table-column>


            <el-table-column fixed="right" align="center" label="操作">
                <template scope="scope">
                    <div class="button-a">
                    <el-button size="small" type="primary" @click="popDetail(scope.row.orders_id)">查看订单</el-button>
                    <el-button size="small" type="primary" :disabled="scope.row.status != 0" @click="checkSuccess(scope.row.id)">通过</el-button>
                    <el-button size="small" type="primary" :disabled="scope.row.status != 0" @click="checkFail(scope.row.id)">不通过</el-button>
                    <el-button size="small" type="primary" :disabled="scope.row.pay_status != 0" @click="payed(scope.row.id)">确认汇款</el-button>
                    </div>
                </template>
            </el-table-column>


        </el-table>

        <div v-show="!listLoading" class="pagination-container" style="margin-top:10px;text-align:right">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="query.page"
                           :page-sizes="[10,20,30,50]" :page-size="query.page_size" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

        <!-- 弹窗 -->
        <el-dialog title="审核不通过" :visible.sync="dialogFormVisible" width="70%">
            <el-form :ref="form" :model="form" label-width="120px">
                <el-form-item label="不通过原因">
                    <el-input type="textarea" v-model="form.remark"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="formSubmit">提 交</el-button>
            </div>
        </el-dialog>
        <!-- 弹窗2 -->
        <el-dialog title="图片详情" :visible.sync="dialogFormVisible2" width="70%">
            <img :src="imgPath" alt="" style="width:800px;height:auto;">
        </el-dialog>
    </div>
</template>

<script>
    import httpClient from '@/utils/request'
    import { formatDate } from '@/utils/index'
    import imgIcon from '@/assets/image.png'

    export default {
        name: 'buildingList',
        data() {
            return {
                imgIcon: imgIcon,
                log_title: '',
                old_content: '',
                new_content: '',
                list: [],
                total: 0,
                listLoading: true,
                checkStatus: [],
                query: {
                    page: 1,
                    page_size: 10,
                    project_id: '',
                    user_name: '',
                    status: ''
                },

                tableKey: 0,
                // 弹窗1
                id: '',
                dialogFormVisible: false,
                form: {
                    remark: ''
                },
                // 弹窗2
                dialogFormVisible2: false,
                imgPath: ''
            }
        },
        filters: {
            formatDate(param) {
                if (param == 0) {
                    return ''
                }

                if (param == null) {
                    return ''
                }
                let date = new Date(param * 1000)
                return formatDate(date, 'yyyy-MM-dd hh:mm')
            },
            formatJson(param) {
                return 1;
            }
        },
        created() {
            this.getList();
        },
        methods: {
            handleSizeChange(val) {
                this.query.page_size = val
                this.getList()
            },
            handleCurrentChange(val) {
                this.query.page = val
                this.getList()
            },
            getList() {
                this.listLoading = true
                httpClient.get('admin/activity/no-reason', { params: this.query }).then(response => {
                    const data = response.content
                    this.list = data.list
                    this.total = data.total
                    this.checkStatus = data.checkStatus
                    this.listLoading = false
                })
            },
            onSearch(column) {
                this.getList()
            },

            popDetail(id) {
                window.open('/admin/index.html#/order/detail/' + id)
            },
            preview(src) {
                this.imgPath = src
                this.dialogFormVisible2 = true
            },
            checkSuccess(id) {
                this.$confirm('确认要审核通过吗？')
                    .then(_=> {
                        let params = {status: 1, remark: ''}
                        httpClient.get('admin/activity/no-reason/check/' + id, { params: params }).then(response => {
                            
                            this.getList()
                        })
                        
                    }).catch(_ => {})
            },
            payed(id) {
                this.$confirm('确认要操作：确认汇款？')
                    .then(_=> {
                        httpClient.get('admin/activity/no-reason/payed/' + id, ).then(response => {
                            
                            this.getList()
                        })
                        
                    }).catch(_ => {})
            },
            checkFail(id) {
                this.id = id
                this.dialogFormVisible = true
            },
            formSubmit(){
                this.dialogFormVisible = false
                let params = {status: 2, remark: this.form.remark}
                httpClient.get('admin/activity/no-reason/check/' + this.id, { params: params }).then(response => {
                    
                    this.getList()
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
            }
        }
    }
</script>

<style lang="css">

.button-a button {
    margin-bottom: 2px;
}
</style>