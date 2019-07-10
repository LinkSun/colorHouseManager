<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            
               <el-form :inline="true" :model="query" class="demo-form-inline">
                <el-form-item label="">
                    <el-input v-model="query.user_name" clearable placeholder="OA姓名"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-select v-model="query.type" clearable placeholder="操作类型">
                        <el-option v-for="(item, index) in logType" :key="index" :label="item" :value="index"></el-option>
                    </el-select>
                </el-form-item>
                
                <el-form-item label="">
                    <el-date-picker v-model="query.start_time" type="date" value-format="timestamp" placeholder="开始时间"></el-date-picker>
                </el-form-item>
                <el-form-item label="">
                    <el-date-picker v-model="query.end_time" type="date" value-format="timestamp" placeholder="结束时间"></el-date-picker>
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

            <el-table-column align="center" label="编号">
                <template scope="scope">
                    <span>{{scope.row.id}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="操作人">
                <template scope="scope">
                    <span >{{ scope.row.user_name }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="类型">
                <template scope="scope">
                    <span>{{ scope.row.type }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="任务描述" width="350">
                <template scope="scope">
                    <span>{{scope.row.des}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="时间">
                <template scope="scope">
                    <span>{{scope.row.created_at|formatDate}}</span>
                </template>
            </el-table-column>

            <el-table-column fixed="right" align="center" width="150" label="操作" >
                <template scope="scope">
                    <el-button size="small" type="primary" @click="popDetail(scope.row.id)">查看详情</el-button>
                </template>
            </el-table-column>


        </el-table>

        <div v-show="!listLoading" class="pagination-container" style="margin-top:10px;text-align:right">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="query.page"
                           :page-sizes="[10,20,30,50]" :page-size="query.page_size" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

        <!-- 弹窗 -->
        <el-dialog title="日志详情" :visible.sync="dialogFormVisible" width="70%">
            <div>{{ log_title }}</div><br>
            <div>
                <div class="json-container">
                    <p>旧数据：</p>
                    <vue-json-pretty
                    :path="'res'"
                    :data='old_content'
                    >
                    </vue-json-pretty>
                </div>
                <div class="json-gap"> </div>
                <div class="json-container">
                    <p>新数据：</p>
                    <vue-json-pretty
                    :path="'res'"
                    :data='new_content'
                    >
                    </vue-json-pretty>
                </div>
                <div style="clear:both;"></div>
            </div>
        </el-dialog>
        
    </div>
</template>

<script>
    import httpClient from '@/utils/request'
    import { formatDate } from '@/utils/index'
    import VueJsonPretty from 'vue-json-pretty'

    export default {
        components: { VueJsonPretty },
        name: 'buildingList',
        data() {
            return {
                log_title: '',
                old_content: '',
                new_content: '',
                list: [],
                total: 0,
                listLoading: true,
                logType: [],
                query: {
                    page: 1,
                    page_size: 10,
                    project_id: '',
                    user_name: '',
                    type: '',
                    start_time: '',
                    end_time: ''
                },

                tableKey: 0,
                dialogFormVisible: false,
                form: {
                    check: '',
                    check_txt: ''
                }
                
            }
        },
        filters: {
            formatDate(param) {
                if (param == 0) {
                    return ''
                }
                let date = new Date(param * 1000)
                return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
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
                httpClient.get('admin/log/oa', { params: this.query }).then(response => {
                    const data = response.content
                    this.list = data.list
                    this.total = data.total
                    this.logType = data.logType
                    this.listLoading = false
                })
            },
            onSearch(column) {
                this.getList()
            },

            popDetail(id) {
                let log = this.list.find(function(item) {
                                        return item.id === id
                                    })
                this.log_title = log.user_name + " " + log.des + " " + this.prettyTime(log.created_at)
                this.old_content = log.old_content == "" ? "" : JSON.parse(log.old_content)
                this.new_content = log.new_content == "" ? "" : JSON.parse(log.new_content)
                this.dialogFormVisible = true
            },
            prettyTime(param) {
                if (param == 0) {
                    return ''
                }
                let date = new Date(param * 1000)
                return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
            }
        }
    }
</script>

<style lang="css">
.fileinput {display: none;}
.json-container {
    float: left;
    width: 48%;
}
.json-gap {
    float: left;
    width: 2%;
}
</style>