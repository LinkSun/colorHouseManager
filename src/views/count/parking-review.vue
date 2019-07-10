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
                    <el-input v-model="query.oa" clearable placeholder="OA账号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onExport">导出</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="downloadTemplate" icon="el-icon-download">下载模板</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="createProfit" icon="el-icon-upload2">导入</el-button>
                </el-form-item>
            </el-form>
            
        </div>
        <el-table :key='tableKey' :data="list" v-loading="listLoading" 
        border fit highlight-current-row style="width: 100%;" @selection-change="handleSelectionChange">

            <el-table-column type="selection" width="40">

            </el-table-column>

            <el-table-column align="center" label="项目名称">
                <template scope="scope">
                    <span>{{scope.row.project_name}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="OA账户">
                <template scope="scope">
                    <span>{{scope.row.oa}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="车位编号">
                <template scope="scope">
                    <span>{{scope.row.parking_no}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="靠近楼栋">
                <template scope="scope">
                    <span>{{scope.row.building}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="面积 ㎡">
                <template scope="scope">
                    <span>{{scope.row.area}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="楼层">
                <template scope="scope">
                    <span>{{scope.row.floor}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="产权性质">
                <template scope="scope">
                    <span>{{scope.row.property_right}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" width="140" label="创建时间">
                <template scope="scope">
                    <span>{{scope.row.created_at | formatDate}}</span>
                </template>
            </el-table-column>

            <el-table-column fixed="right" align="center" label="操作" >
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
        <el-dialog title="导入" :visible.sync="dialogFormVisible2" width="50%">
            <el-form :ref="form" :model="form" label-width="120px">
                <!-- <el-form-item label="选择项目" required="">
                    <el-select v-model="form.project_id" clearable filterable placeholder="选择项目">
                        <el-option
                        v-for="item in projects"
                            :key="item.project_id"
                            :label="item.project_name"
                            :value="item.project_id">
                        </el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="上传文件" required>
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

        <!-- 弹窗 -->
        <!-- 附加信息弹窗 -->
        <el-dialog title="详情" :visible.sync="dialogFormVisible" width="60%">
            <el-form :ref="review" label-width="140px">
                <el-form-item label="项目名称">
                    <span>{{ review.project_name }}</span>
                </el-form-item>

                <el-form-item label="OA账户">
                    <span>{{ review.oa }}</span>
                </el-form-item>

                <el-form-item label="车位编号">
                    <span>{{ review.parking_no }}</span>
                </el-form-item>
                <el-form-item label="靠近楼栋">
                    <span>{{ review.building }}</span>
                </el-form-item>

                <el-form-item label="面积">
                    <span>{{ review.area }}㎡</span>
                </el-form-item>

                <el-form-item label="楼层">
                    <span>{{ review.floor }}</span>
                </el-form-item>

                <el-form-item label="产权性质">
                    <span>{{ review.property_right }}</span>
                </el-form-item>

                <el-form-item label="车位类型">
                    <span>{{ review.parking_type }}</span>
                </el-form-item>

                <el-form-item label="距电梯口情况">
                    <span>{{ review.distance}}</span>
                </el-form-item>

                <el-form-item label="车位位置">
                    <el-tag type="info" v-for="(item, index) in review.position" :key="index" style="margin-right:5px;">{{ item }}</el-tag>
                </el-form-item>

                <el-form-item label="车位品质">
                    <el-tag type="info" v-for="(item, index) in review.quality" :key="index" style="margin-right:5px;">{{ item }}</el-tag>
                </el-form-item>

                <el-form-item label="特殊备注">
                    <span>{{ review.remark }}</span>
                </el-form-item>

                <el-form-item label="图片">
                    <p v-for="(item, index) in review.image" :key="index">
                        <img :src="item" alt="" style="width:100%;height:auto;">
                    </p>
                </el-form-item>

                <el-form-item label="拜访时间">
                    <span>{{ review.created_at | formatDate }}</span>
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
        name: 'parkingReview',
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
                    oa: ''
                },
                hasExport: false,
                tableKey: 0,
                // 添加奖励分配弹窗
                dialogFormVisible: false,
                dialogFormVisible2: false,
                review: {}, // 当前资产详情
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
                httpClient.get('admin/oa/parking/review', { params: this.query }).then(response => {
                    const data = response.content
                    this.list = data.list
                    this.projects = data.projects
                    this.total = data.total
                    this.listLoading = false
                })
            },
            onSearch(column) {
                this.getList()
            },
            onExport() {
                this.$message('导出中...')
                httpFile.get('admin/oa/parking/review/export', { params: this.query }).then(response => {
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

                httpClient.get('admin/oa/parking/review/' + id).then(response => {
                    const data = response.content
                    this.review = data.review
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
                window.location.href = fileUrl + '车位资产录入模板.xlsx'
            },
            
            formSubmit() {
                this.$message('提交中...')
                httpClient.post('admin/oa/parking/review/import', this.form).then(response => {
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
                link.setAttribute('download', '车位资产录入列表.xlsx')
                
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