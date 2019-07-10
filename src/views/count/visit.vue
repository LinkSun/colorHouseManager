<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            
               <el-form :inline="true" :model="query" class="demo-form-inline">
                <el-form-item label="">
                    <el-select v-model="query.project_id" clearable filterable placeholder="选择项目">
                        <el-option
                        v-for="item in projects"
                            :key="item.project_id"
                            :label="item.project_name"
                            :value="item.project_id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="query.oa_name" clearable placeholder="客户经理姓名"></el-input>
                </el-form-item>
                <!-- <el-form-item label="">
                    <el-input v-model="query.phone" placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="query.plate_numbers" placeholder="车牌号"></el-input>
                </el-form-item> -->
                <el-form-item>
                    <el-button type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onExport">导出</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="downloadTemplate" icon="el-icon-download">下载蓄客记录模板</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="createProfit" icon="el-icon-upload2">上传蓄客记录</el-button>
                </el-form-item>
            </el-form>
            
        </div>
        <el-table :key='tableKey' :data="list" v-loading="listLoading" 
        border fit highlight-current-row style="width: 100%;" @selection-change="handleSelectionChange">

            <el-table-column type="selection" width="40">

            </el-table-column>

            <el-table-column align="center" label="项目名称">
                <template scope="scope">
                    <span>{{scope.row.community_name}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="客户经理姓名">
                <template scope="scope">
                    <span>{{scope.row.oa_name}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="业主姓名">
                <template scope="scope">
                    <span>{{scope.row.name}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="身份">
                <template scope="scope">
                    <span>{{scope.row.identity}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="等级">
                <template scope="scope">
                    <span>{{scope.row.intention}}</span>
                </template>
            </el-table-column>


            <el-table-column align="center" label="拜访时间">
                <template scope="scope">
                    <span>{{scope.row.visit_time | formatDate}}</span>
                </template>
            </el-table-column>

            <el-table-column fixed="right" align="center" width="170" label="操作" >
                <template scope="scope">
                    <el-button size="small" type="primary" @click="showInfo(scope.row.id)">
                       详情
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
        <el-dialog title="上传计划" :visible.sync="dialogFormVisible2" width="50%">
            <el-form :ref="form" :model="form" label-width="120px">
                <el-form-item label="选择项目" required="">
                    <el-select v-model="form.project_id" clearable filterable placeholder="选择项目">
                        <el-option
                        v-for="item in projects"
                            :key="item.project_id"
                            :label="item.project_name"
                            :value="item.project_id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上传计划" required>
                    <el-upload
                        class="upload-demo"
                        name="file"
                        :action="uploadFileUrl"
                        :on-change="handleChange"
                        :on-remove="handleFileRemove"
                        :on-success="handlerFileSuccess"
                        :file-list="fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="formSubmit">提 交</el-button>
            </div>
        </el-dialog>

        <!-- 附加信息弹窗 -->
        <el-dialog title="拜访详情详情" :visible.sync="dialogFormVisible" width="60%">
            <el-form :ref="visit" label-width="140px">
                <el-form-item label="拜访人OA">
                    <span>{{ visit.oa_account }}</span>
                </el-form-item>

                <el-form-item label="拜访人姓名">
                    <span>{{ visit.oa_name }}</span>
                </el-form-item>

                <el-form-item label="拜访人手机号">
                    <span>{{ visit.oa_mobile }}</span>
                </el-form-item>
                <el-form-item label="省">
                    <span>{{ visit.province }}</span>
                </el-form-item>

                <el-form-item label="市">
                    <span>{{ visit.city }}</span>
                </el-form-item>

                <el-form-item label="区">
                    <span>{{ visit.region }}</span>
                </el-form-item>

                <el-form-item label="项目名称">
                    <span>{{ visit.community_name }}</span>
                </el-form-item>

                <el-form-item label="项目uuid">
                    <span>{{ visit.community_uuid }}</span>
                </el-form-item>

                <el-form-item label="楼栋名称">
                    <span>{{ visit.build_name}}</span>
                </el-form-item>

                <el-form-item label="楼栋编码">
                    <span>{{ visit.build_code }}</span>
                </el-form-item>

                <el-form-item label="房间名称">
                    <span>{{ visit.room_name }}</span>
                </el-form-item>

                <el-form-item label="房间号">
                    <span>{{ visit.room_code }}</span>
                </el-form-item>

                <el-form-item label="姓名">
                    <span>{{ visit.name }}</span>
                </el-form-item>

                <el-form-item label="身份">
                    <span>{{ visit.identity }}</span>
                </el-form-item>
                <el-form-item label="等级">
                    <span>{{ visit.intention }}</span>
                </el-form-item>
                <el-form-item label="电话">
                    <span>{{ visit.phone }}</span>
                </el-form-item>

                <el-form-item label="车辆">
                    <span>{{ visit.have_car == 0 ? '无' : '有' }}</span>
                </el-form-item>

                <el-form-item label="车牌号">
                    <span>{{ visit.plate_numbers }}</span>
                </el-form-item>

                <el-form-item label="停车位置">
                    <span>{{ visit.parking_spot }}</span>
                </el-form-item>

                <el-form-item label="拜访内容">
                    <span>{{ visit.visit_content }}</span>
                </el-form-item>

                <el-form-item label="解决事项">
                    <span>{{ visit.solve_item }}</span>
                </el-form-item>

                <el-form-item label="对专属车位的看法">
                    <span>{{ visit.opinion }}</span>
                </el-form-item>

                <el-form-item label="期望参加的活动">
                    <span>{{ visit.want_activity }}</span>
                </el-form-item>

                <el-form-item label="拜访时间">
                    <span>{{ visit.visit_time | formatDate }}</span>
                </el-form-item>
                
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import httpClient from '@/utils/request'
    import httpFile from '@/utils/downloadFile'
    import { staticUrl } from '@/utils/env'
    import { formatDate } from '@/utils/index'

    export default {
        name: 'orderList',
        data() {
            return {
                list: [],
                total: 0,
                listLoading: false,
                projects: [],
                query: {
                    page: 1,
                    page_size: 10,
                    project_id: '',
                    name: '',
                    oa_name: '',
                    phone: '',
                    plate_numbers: ''
                },
                hasExport: false,
                tableKey: 0,
                // 添加奖励分配弹窗
                dialogFormVisible: false,
                dialogFormVisible2: false,
                visit: '', // 当前拜访详情
                uploadFileUrl: staticUrl + '/upload/file',
                form: {
                    project_id: '',
                    file_path: ''
                },
                fileList: []
            }
        },
        filters: {
            formateMoney(param) {
                return parseFloat(param)
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
            },
            formatDate(param) {
                if (param == 0) {
                    return ''
                }
                let date = new Date(param * 1000)
                return formatDate(date, 'yyyy-MM-dd hh:mm')
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
                httpClient.get('admin/oa/visit/list', { params: this.query }).then(response => {
                    const data = response.content
                    this.list = data.list
                    this.projects = data.projects
                    this.hasExport = data.hasExport 
                    this.total = data.total
                    this.listLoading = false
                })
            },
            onSearch(column) {
                this.getList()
            },
            onExport() {
                if (this.hasExport == false) {
                    this.$message.error('无操作权限!')
                    return
                }
                this.$message('导出中...')
                httpFile.get('admin/oa/visit/list/export', { params: this.query }).then(response => {
                    this.download(response)
                })
            },
            confirmDelete(id) {
                this.$confirm('确认要进行该操作吗？')
                    .then(_=> {
                        httpClient.post('admin/user/delete/' + id).then(response => {
                            this.getList()       
                        })
                    }).catch(_ => {})
            },
            showInfo(id) {

                httpClient.get('admin/oa/visit/list/' + id).then(response => {
                    const data = response.content
                    this.visit = data.visit
                    this.dialogFormVisible = true            
                })
                
            },
            createProfit() {
                this.form.project_id = ''
                this.form.file_path = ''
                this.fileList = []
                this.dialogFormVisible2 = true
            },
            downloadTemplate() {
                this.$message('响应中...')
                let fileUrl = staticUrl + '/template/'
                window.location.href = fileUrl + '蓄客模板.xlsx'
            },
            
            formSubmit() {
                this.$message('提交中...')
                httpClient.post('admin/oa/visit/list', this.form).then(response => {
                    this.dialogFormVisible2 = false
                    this.$message({ message: '操作成功', type: 'success' });
                    this.getList()
                })
            },
             // 添加奖励分配弹窗
            handleChange(file, fileList) {
                this.fileList = fileList.slice(-1);
            },
            handlerFileSuccess(response, fileList) {
                let data = response.content
                this.form.file_path = data.fileName
            },
            handleFileRemove(file, fileList) {
                this.form.file_path = ''
            },
            // 下载文件
            download (data) {
                if (!data) {
                    return
                }
                let url = window.URL.createObjectURL(new Blob([data]))
                let link = document.createElement('a')
                link.style.display = 'none'
                link.href = url
                link.setAttribute('download', '员工拜访记录.xlsx')
                
                document.body.appendChild(link)
                link.click()
            },
            downLoad1() {
                this.$message('响应中...')
                let fileUrl = staticUrl + '/template/'
                window.location.href = fileUrl + '奖励分配.xlsx'
                // window.open(fileUrl + '车位导入.xlsx', '_blank')
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