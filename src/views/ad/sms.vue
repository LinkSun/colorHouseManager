<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            
               <el-form :inline="true" :model="query" class="demo-form-inline">
                <el-form-item label="">
                    <el-input v-model="query.des" clearable placeholder="描述"></el-input>
                </el-form-item>
                <el-form-item label="">
                        <el-select v-model="query.type" clearable placeholder="消息类型">
                            <el-option v-for="(value, key) in smsLogType" :key="key" :label="value" :value="key"></el-option>
                        </el-select>
                </el-form-item>
                <el-form-item label="">
                        <el-select v-model="query.deleted" clearable placeholder="状态">
                            <el-option v-for="(value, key) in smsLogDelete" :key="key" :label="value" :value="key"></el-option>
                        </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="createProfit">新建消息任务</el-button>
                </el-form-item>
            </el-form>
            
        </div>
        <el-table :key='tableKey' :data="list" v-loading="listLoading" 
        border fit highlight-current-row style="width: 100%;" @selection-change="handleSelectionChange">

            <el-table-column type="selection" width="40">

            </el-table-column>

            <el-table-column align="center" label="编号" width="80">
                <template scope="scope">
                    <span>{{scope.row.id}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="描述">
                <template scope="scope">
                    <span>{{scope.row.des}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="发送内容" width="350">
                <template scope="scope">
                    <span>{{scope.row.content}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="开始发送时间">
                <template scope="scope">
                    <span>{{scope.row.start_at | formatDate}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="消息类型">
                <template scope="scope">
                    <span>{{ smsLogType[scope.row.type] || '' }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="状态">
                <template scope="scope">
                    <span :style="scope.row.deleted | formatColor">{{ smsLogDelete[scope.row.deleted] || '' }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="创建时间/人">
                <template scope="scope">
                    <span>{{scope.row.created_at | formatDate}}</span> / <span>{{ scope.row.user_name }}</span>
                </template>
            </el-table-column>

            <el-table-column fixed="right" align="center" width="250" label="操作" >
                <template scope="scope">
                    
                    <router-link :to="{path: '/ad/sms/detail/' + scope.row.id}">
                        <el-button  size="small" type="primary">发送详情</el-button>
                    </router-link>
                    <router-link :to="{path: '/ad/sms/info/' + scope.row.id}" v-show="scope.row.deleted == 0">
                        <el-button  size="small" type="primary">编辑</el-button>
                    </router-link>
                    <el-button v-show="scope.row.deleted == 0"  size="small" type="danger" @click="confirmDelete(scope.row.id)">
                        删除
                    </el-button>
                </template>
            </el-table-column>


        </el-table>

        <div v-show="!listLoading" class="pagination-container" style="margin-top:10px;text-align:right">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="query.page"
                           :page-sizes="[10,20,30,50]" :page-size="query.page_size" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>


        <!-- 添加弹窗 -->
        <el-dialog title="新建短信任务" :visible.sync="dialogFormVisible" width="50%">
            <el-form :ref="form" :model="form" label-width="120px">
                <el-form-item label="描述" required>
                    <el-input v-model="form.des" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="消息类型" required>
                    <el-radio-group v-model="form.type">
                        <el-radio v-for="(value, key) in smsLogType" :key="key" :label="key">{{ value }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="开始发送时间" required>
                    <el-date-picker
                    v-model="form.start_at"
                    type="datetime"
                    placeholder="选择日期" value-format="timestamp">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="短信内容" required>
                    <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" v-model="form.content" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" required>
                    <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 14}" v-model="form.phone" autocomplete="off" placeholder="批量请用英文逗号分割"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="formSubmit">提 交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import httpClient from '@/utils/request'
    import { formatDate } from '@/utils/index'

    export default {
        name: 'adSms',
        data() {
            return {
                list: [],
                total: 0,
                listLoading: true,
             
                query: {
                    page: 1,
                    page_size: 10,
                    des: '',
                    type: '',
                    deleted: ''
                },
                smsLogDelete: [],
                smsLogType: [],
                tableKey: 0,
                // 添加奖励分配弹窗
                
                dialogFormVisible: false,
                form: {
                    des: '',
                    type: 0,
                    start_at: '',
                    content: '',
                    phone: ''
                }
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
                    return  danger
                }
                return info
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
                httpClient.get('admin/sms', { params: this.query }).then(response => {
                    const data = response.content
                    this.list = data.list
                    this.total = data.total
                    this.smsLogDelete = data.smsLogDelete
                    this.smsLogType = data.smsLogType
                    this.listLoading = false
                })
            },
            onSearch(column) {
                this.getList()
            },
            createProfit() {
                this.form.des = ''
                this.dialogFormVisible = true
            },
            confirmDelete(id) {
                this.$confirm('确认要删除该任务？')
                    .then(_=> {
                        httpClient.post('admin/sms/delete/' + id).then(response => {
                            this.getList()       
                        })
                    }).catch(_ => {})
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            
            formSubmit() {
                this.$message('提交中...')
                httpClient.post('admin/sms', this.form).then(response => {
                    this.dialogFormVisible = false
                    this.$message({ message: '操作成功', type: 'success' })
                    this.getList()   
                })
            }  
        }
    }
</script>

<style lang="css">
.fileinput {display: none;}
</style>