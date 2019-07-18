<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            
            <el-form :inline="true" :model="query" class="demo-form-inline parking-search">
                <el-form-item label="">
                    <el-input v-model="query.parking_no" clearable placeholder="车位编号"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-select v-model="query.parking_tag" multiple clearable placeholder="车位标签">
                        <el-option v-for="(value, key, index) in parkingTag" :key="index" :label="value" :value="key"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-select v-model="query.visible" clearable placeholder="可见状态">
                        <el-option v-for="(value, key, index) in parkingVisible" :key="index" :label="value" :value="key"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-select v-model="query.marketing_control" clearable placeholder="销控状态">
                        <el-option v-for="(value, key, index) in marketingControl" :key="index" :label="value" :value="key"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-select v-model="query.face_sale_status" clearable placeholder="表面销售状态">
                        <el-option v-for="(value, key, index) in parkingSaleStatus" :key="index" :label="value" :value="key"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-select v-model="query.real_sale_status" clearable placeholder="真实销售状态">
                        <el-option v-for="(value, key, index) in parkingSaleStatus" :key="index" :label="value" :value="key"></el-option>
                    </el-select>
                </el-form-item>
                <!-- 多选 -->
                <el-form-item label="">
                    <el-select v-model="query.near_build" multiple clearable placeholder="靠近楼栋号">
                        <el-option v-for="(value, key, index) in nearBuild" :key="index" :label="value" :value="value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-select v-model="query.property_right" multiple clearable placeholder="产权性质">
                        <el-option v-for="(value, key, index) in parkingRightType" :key="index" :label="value" :value="key"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-select v-model="query.parking_wz" multiple clearable placeholder="车位位置">
                        <el-option v-for="(value, key, index) in parking_wz" :key="index" :label="value" :value="key"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-select v-model="query.parking_type" multiple clearable placeholder="车位类型">
                        <el-option v-for="(value, key, index) in parkingType" :key="index" :label="value" :value="key"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-select v-model="query.floor" clearable placeholder="楼层">
                        <el-option v-for="(value, key, index) in floor" :key="index" :label="value" :value="value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-select v-model="query.pinzhi"  multiple clearable placeholder="车位品质">
                        <el-option v-for="(value, key, index) in pin_zhi" :key="index" :label="value" :value="key"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <!-- <el-select v-model="query.parking_name" clearable placeholder="产品名称">
                        <el-option v-for="(value, key, index) in parkingSaleStatus" :key="index" :label="value" :value="key"></el-option>
                    </el-select> -->
                    <el-input v-model="query.parking_name" clearable placeholder="产品名称"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <!-- <el-select v-model="query.parking_type_name" clearable placeholder="车位类型名称">
                        <el-option v-for="(value, key, index) in parkingSaleStatus" :key="index" :label="value" :value="key"></el-option>
                    </el-select> -->
                    <el-input v-model="query.parking_type_name" clearable placeholder="车位类型名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onExport">导出</el-button>
                </el-form-item>
            </el-form>
            <el-form  :inline="true" class="demo-form-inline" :model="query">   
                <el-form-item>
                    <el-button type="primary" size="small" @click="dialogFormVisible = true">添加</el-button>
                    <el-button type="primary" size="small" @click="updateAll()">批量修改</el-button>
                    <!-- <el-button type="primary" size="small" @click="deleteAll()">批量删除</el-button> -->
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" @click="exportQr" icon="el-icon-download">导出二维码</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" @click="downTemplate" icon="el-icon-download">下载模板</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" icon="el-icon-upload2" @click="importParking">批量导入车位</el-button>
                    <input class="fileinput" size="small" name="file" type="file" @change="update" id="import-parking" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" icon="el-icon-upload2" @click="importOrder">导入历史记录</el-button>
                    <input class="fileinput" size="small" name="file" type="file" @change="import_order" id="import-order" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" icon="el-icon-upload2" @click="importCaifu">导入彩车位一号订单</el-button>
                    <input class="fileinput" size="small" name="file" type="file" @change="import_caifu" id="import-caifu" />
                </el-form-item>
            </el-form>
            
        </div>
        <div class="filter-container" style="color:#969696;">
            项目名称: {{ project_name }}, 业务类型: {{ project_type }}, 
            收购总额: {{ parking_purchase_total }}, 产品数量: {{ parking_count }}, 实际已售数量: {{ parking_sold_count }}
        </div>
        <br>
        <el-table :key='tableKey' :data="list" v-loading="listLoading" 
        border fit highlight-current-row style="width: 100%;" @selection-change="handleSelectionChange">

            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
            <el-table-column align="center" label="车位编号">
                <template scope="scope">
                    <span>{{scope.row.parking_no}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="车位标签">
                <template scope="scope">
                    <span>{{ parkingTag[scope.row.parking_tag] || '' }}</span>
                </template>
            </el-table-column>

            <!-- <el-table-column align="center" label="收购价">
                <template scope="scope">
                    <span>{{ scope.row.purchase_price }}</span>
                </template>
            </el-table-column> -->

            <el-table-column align="center" label="收购类型">
                <template scope="scope">
                    <span>{{ parkingPurchaseType[scope.row.purchase_type] || '' }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="产权性质">
                <template scope="scope">
                    <span>{{parkingRightType[scope.row.property_right] || ''}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="楼栋">
                <template scope="scope">
                    <span>{{scope.row.near_build}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="楼层">
                <template scope="scope">
                    <span>{{scope.row.floor}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="面积">
                <template scope="scope">
                    <span>{{scope.row.parking_area}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="车位类型">
                <template scope="scope">
                    <span>{{parkingType[scope.row.parking_type] || ''}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" width="130" label="车位类型名称">
                <template scope="scope">
                    <span>{{scope.row.parking_type_name}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="产品名称">
                <template scope="scope">
                    <span>{{scope.row.parking_name}}</span>
                </template>
            </el-table-column>
            
             <el-table-column align="center" label="销售价格">
                <template scope="scope">
                    <span>{{scope.row.sale_price}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" width="130" label="现金减免额度">
                <template scope="scope">
                    <span>{{scope.row.cash_offer_amount/ 1 | rounding}}</span>
                </template>
            </el-table-column>

             <el-table-column align="center" label="饭票总额">
                <template scope="scope">
                    <span>{{scope.row.total_ticket}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="定金金额">
                <template scope="scope">
                    <span>{{scope.row.deposit}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="车位位置" width="200">
                <template scope="scope">
                    <span>{{parking_wz[scope.row.parking_wz]}}</span>
                    <span v-if="scope.row.is_duli==1">，独立</span>
                    <span v-if="scope.row.is_cefang==1">，侧方</span>
                    <span v-if="scope.row.is_sijiao==1">，死角</span>

                </template>
            </el-table-column>
             <el-table-column align="center" label="车位品质">
                <template scope="scope">
                    <span v-if="scope.row.jss_shouzu==1">驾驶室开门受阻</span>
                    <span v-if="scope.row.fjss_shouzu==1">，副驾驶开门受阻</span>
                    <span v-if="scope.row.san_zhong==1">，3中</span>
                    <span v-if="scope.row.ls_shui==1">，漏水渗水</span>
                    <span v-if="scope.row.height_lower==1">，高度较低</span>
                    <span v-if="scope.row.xiao_fang_sz==1">，消防/水管阻挡</span>
                    <span v-if="scope.row.door_sz==1">，各类门阻挡</span>
                    <span v-if="scope.row.other_sz==1">，其它物体阻挡</span>
                    <span v-if="scope.row.psg_sz==1">，排水道影响</span>
                    <span v-if="scope.row.wxj_sz==1">，维修井影响</span>
                    <span v-if="scope.row.ygc_sz==1">，易刮擦</span>
                    <span v-if="scope.row.ljz_sz==1">，近垃圾站</span>
                </template>
            </el-table-column>
            <el-table-column align="center" width="130" label="车位可见状态">
                <template scope="scope">
                    <span>{{ parkingVisible[scope.row.visible] || '' }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="销控状态">
                <template scope="scope">
                    <span>{{ marketingControl[scope.row.marketing_control] || ''}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" width="130" label="真实销售状态">
                <template scope="scope">
                    <span>{{ parkingSaleStatus[scope.row.real_sale_status] || ''}}</span>
                </template>
            </el-table-column>
             <el-table-column align="center" width="130" label="表面销售状态">
                <template scope="scope">
                    <span>{{ parkingSaleStatus[scope.row.face_sale_status] || '' }}</span>
                </template>
            </el-table-column>
             
             <!-- <el-table-column align="center" label="购买方式">
                <template scope="scope">
                    <span>{{ parkingPurchaseMethod[scope.row.purchase_method] || ''}}</span>
                </template>
            </el-table-column> -->
             <el-table-column align="center" label="产证办理">
                <template scope="scope">
                    <span v-if="scope.row.certificate_transact==1">是</span>
                    <span v-if="scope.row.certificate_transact==0">否</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="备注">
                <template scope="scope">
                    <span>{{scope.row.remark}}</span>
                </template>
            </el-table-column>
             <!-- <el-table-column align="center" label="客户姓名">
                <template scope="scope">
                    <span>{{scope.row.customer_name}}</span>
                </template>
            </el-table-column>

             <el-table-column align="center" label="客户手机">
                <template scope="scope">
                    <span>{{scope.row.customer_phone}}</span>
                </template>
            </el-table-column>
        
             <el-table-column align="center" label="客户地址">
                <template scope="scope">
                    <span>{{scope.row.building_name}}</span>
                </template>
            </el-table-column> -->
             <!-- <el-table-column align="center" label="备注">
                <template scope="scope">
                    <span>{{scope.row.parking_position}}</span>
                </template>
            </el-table-column> -->
            <el-table-column fixed="right" align="center" width="315" label="操作" >
                <template scope="scope">
                
                    <el-button  size="small" type="primary" @click="canDetail(scope.row.parking_id)">查看</el-button>
                   
                    <el-button :disabled="scope.row.real_sale_status == 2 || scope.row.real_sale_status == 4 || scope.row.real_sale_status == 5"  size="small" type="primary" @click="canEdit(scope.row.parking_id)">编辑</el-button>
                    <el-button  size="small" type="primary" @click="qrPreview(scope.row.qr_code, scope.row.parking_uuid)">二维码</el-button>
                    <el-button  size="small" type="danger" @click="confirmDelete(scope.row.parking_id)">
                        {{ scope.row.visible == 1 ? '删除' : '恢复' }}
                    </el-button>
                </template>
            </el-table-column>


        </el-table>

        <div v-show="!listLoading" class="pagination-container" style="margin-top:10px;text-align:right">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="query.page"
                           :page-sizes="[10,20,30,50]" :page-size="query.page_size" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>


        <!-- 添加车位弹窗 -->
        <el-dialog title="添加车位信息" :visible.sync="dialogFormVisible" width="50%">
            <el-form :ref="form" :model="form" label-width="160px">
                <el-form-item label="车位编号" required>
                    <el-input v-model="form.parking_no" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="车位类型" required>
                    <el-select v-model="form.parking_type" placeholder="请选择车位类型">
                        <el-option v-for="(item, index) in parkingType" :key="item.id" :label="item" :value="parseInt(index)"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="车位位置">
                    <el-input v-model="form.parking_position" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="车位面积(㎡)" required>
                    <el-input v-model="form.parking_area" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="车位收购类型" required>
                    <el-select v-model="form.purchase_type" placeholder="请选择车位收购类型">
                        <el-option v-for="(item, index) in parkingPurchaseType" :key="item.id" :label="item" :value="parseInt(index)"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="车位收购价格(元/个)" required>
                    <el-input v-model="form.purchase_price" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="饭票返还总额(彩饭票)">
                    <el-input v-model="form.total_ticket" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="formSubmit">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 下载模板弹窗 -->
        <el-dialog title="下载模板-请选择" :visible.sync="dialogFormVisible2" width="50%">
            <el-form :ref="form" :model="form" label-width="160px">
                
                <el-form-item label="" required>
                    <el-button type="primary" size="small" @click="downParking(1)">下载车位模板</el-button>
                </el-form-item>
                <el-form-item label="" required>
                    <el-button type="primary" size="small" @click="downParking(2)">下载历史记录模板</el-button>
                </el-form-item>
                <el-form-item label="" required>
                    <el-button type="primary" size="small" @click="downParking(3)">下载彩车位一号订单模板</el-button>
                </el-form-item>
                
            </el-form>

            <!-- <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="formDownSubmit">确 定</el-button>
            </div> -->
        </el-dialog>
        <!-- 图片弹窗 -->
        <el-dialog title="二维码预览" :visible.sync="dialogVisibleQr" width="65%" style="text-align:center;">
            <img :src="qrUrl" alt="二维码"><br>
            <span style="font-size:20px;">{{ parking_uuid }}</span>
        </el-dialog>

        <!-- 编辑弹窗 -->
        <el-dialog title="编辑车位" :visible.sync="dialogVisibleEdit" width="60%">
            <parking-edit :parkingId="parkingId" @refresh="parentRefresh" ref="child"></parking-edit>
        </el-dialog>

        <!-- 详情弹窗 -->
        <el-dialog title="车位详情" :visible.sync="dialogVisibleDetail" width="60%">
            <parking-detail :parkingId="parkingId" @refresh="parentRefreshd" ref="childd"></parking-detail>
        </el-dialog>
    </div>
</template>

<script>
    import httpClient from '@/utils/request'
    import httpClientFile from '@/utils/requestFile'
    import httpFile from '@/utils/downloadFile'
    import { staticUrl } from '@/utils/env'
    import parkingEdit from '@/views/parking/addedit'
    import parkingDetail from '@/views/parking/detail'

    export default {
        name: 'parkingList',
        components: { parkingEdit, parkingDetail },
        data() {
            return {
                project_id: 0,
                parkingId: 0,
                project_name: '',
                project_type: '',
                parking_purchase_total: 0,
                parking_count: 0,
                parking_sold_count: 0,
                list: [],
                total: 0,
                listLoading: true,
                project: '',
                query: {
                    page: 1,
                    page_size: 10,
                    parking_no: '',
                    visible: '',
                    parking_tag: [],
                    marketing_control: '',
                    face_sale_status: '',
                    real_sale_status: '',
                    parking_name:'',
                    parking_type_name:'',
                    near_build:[],
                    property_right:[],
                    parking_wz: [],
                    parking_type: [],
                    floor: [],
                    pinzhi:[]
                },
                parkingSaleStatus: [],
                parkingPurchaseType: [],
                parkingPurchaseMethod: [],
                parkingType: [],
                parkingTag: [],
                nearBuild: [],
                floor: [],
                pin_zhi:[],
                marketingControl: [],
                parkingVisible: [],
                parkingRightType: [],
                parking_wz: [],
                certificateTransact: [],
                multipleSelection: [],
                tableKey: 0,
                // 添加车位弹窗
                dialogFormVisible: false,
                form: {
                    parking_no: '',
                    parking_type: '',
                    parking_position: '',
                    parking_area: '',
                    purchase_type: '',
                    purchase_price: '',
                    total_ticket: 0
                },
                // 下载模板
                dialogFormVisible2: false,
                // 二维码
                dialogVisibleQr: false,
                qrUrl: '',
                parking_uuid: '',
                // 编辑弹窗
                dialogVisibleEdit: false,
                dialogVisibleDetail: false,
                
            }
        },
        filters: {
            rounding (value) {
            return value.toFixed(2)
            }
        },
        created() {
            const params = this.$route.params
            this.project_id = parseInt(params.id)
            // const page = this.$route.query.page
            // if (page !== undefined) {
            //         //this.query.page = parseInt(page)
            //         //console.log(this.query)
            //         this.handleCurrentChange(page)
            //         return
            //     }

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
                httpClient.get('admin/project/parking/' + this.project_id, { params: this.query }).then(response => {
                    const data = response.content
                    this.list = data.list
                    this.total = data.total
                    this.project = data.project
                    this.parkingSaleStatus = data.parkingSaleStatus 
                    this.nearBuild = data.nearBuild
                    this.parkingPurchaseType = data.parkingPurchaseType
                    this.parkingPurchaseMethod = data.parkingPurchaseMethod
                    this.parkingType = data.parkingType  
                    this.parkingTag = data.parkingTag
                    this.floor = data.floor  
                    this.pin_zhi = data.pin_zhi
                    this.marketingControl = data.marketingControl
                    this.parkingVisible = data.parkingVisible
                    this.parkingRightType = data.parkingRightType 
                    this.parking_wz = data.parking_wz
                    this.certificateTransact = data.certificateTransact
                    this.project_name = data.project_name
                    this.project_type = data.project_type
                    this.parking_purchase_total = data.parking_purchase_total
                    this.parking_count = data.parking_count
                    this.parking_sold_count = data.parking_sold_count
                    this.listLoading = false
                })
            },
            onSearch(column) {
                this.getList()
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            formSubmit() {
                this.$message('提交中...')
                httpClient.post('admin/parking/addone/' + this.project_id, this.form).then(response => {
                       this.dialogFormVisible = false
                       this.$message({ message: '操作成功', type: 'success' })
                       this.getList()
                        
                })
            },
            canEdit(parking_id) {
                this.parkingId = parking_id
                this.dialogVisibleEdit = true
                this.$refs.child.getData()
            },
            canDetail(parking_id) {
                this.parkingId = parking_id
                this.dialogVisibleDetail = true
                this.$refs.childd.getData()
            },
            // deleteAll() {
            //     if (this.multipleSelection.length == 0) {
            //         this.$message({
            //             message: '请先选择车位',
            //             type: 'warning'
            //         });
            //         return
            //     }
                
            //     let parkingId = []
            //     for (const key in this.multipleSelection) {
            //             parkingId.push(this.multipleSelection[key].parking_id)  
            //     }

            //     httpClient.post('admin/parking/delete-all', {parkingId: parkingId}).then(response => {
            //         this.$message({ message: '操作成功', type: 'success' });
            //         this.getList()
            //     })
                
            // },
            updateAll(){
                console.log("22",this.query)
                // return
                this.$router.push({ 
                    path: '/project/parking/sale/open/'+this.project_id,
                    query:{
                        visible:this.query.visible,
                        parking_no:this.query.parking_no,
                        parking_tag:this.query.parking_tag,
                        marketing_control:this.query.marketing_control,
                        face_sale_status:this.query.face_sale_status,
                        real_sale_status:this.query.real_sale_status,
                    }
                    });
            },
            confirmDelete(id) {
                this.$confirm('确认要进行此操作吗？')
                    .then(_=> {
                        this.deleteParking(id)
                    }).catch(_ => {})
            },
            downTemplate() {
                this.dialogFormVisible2 = true
            },
            formDownSubmit() {

            },
            exportQr() {
                this.$message('导出中...')
                httpFile.get('admin/project/parking/qr/export/' + this.project_id).then(response => {
                    this.download(response)
                })
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
                link.setAttribute('download', this.project_name + '_二维码.xlsx')
                
                document.body.appendChild(link)
                link.click()
            },
              // 导出文件
            download1 (data) {
                if (!data) {
                    return
                }
                let url = window.URL.createObjectURL(new Blob([data]))
                let link = document.createElement('a')
                link.style.display = 'none'
                link.href = url
                link.setAttribute('download', '车位信息.xlsx')
                
                document.body.appendChild(link)
                link.click()
            },
             onExport() {
                this.$message('导出中...')
                httpFile.get('/admin/parking/export/'+ this.project_id, { params: this.query }).then(response => {
                    this.download1(response)
                })
            },
            qrPreview(src, uuid) {
                this.qrUrl = src
                this.parking_uuid = uuid
                this.dialogVisibleQr = true
            },
            deleteParking(id) {
                httpClient.post('admin/parking/delete/' + id).then(response => {
                    this.$message({ message: '操作成功', type: 'success' });
                    this.getList()
                })
            },
            downParking(param) {
                this.$message('响应中...')
                let fileUrl = staticUrl + '/template/'
                if (param == 1) {
                    window.location.href = fileUrl + '车位导入.xlsx'
                    // window.open(fileUrl + '车位导入.xlsx', '_blank')
                    return
                }
                if (param == 2) {
                    window.location.href = fileUrl + '车位历史记录导入.xlsx'
                    return
                }

                if (param == 3) {
                    window.location.href = fileUrl + '彩车位一号订单.xlsx'
                }
            },
            importParking() {
                document.getElementById('import-parking').click();
            },

            update(e) {
                    this.$message('上传中...，车位编号如果存在，将不会写入')

                    let file = e.target.files[0]
                    let param = new FormData() //创建form对象
                    param.append('file', file) //通过append向form对象添加数据
                    console.log("file",file)
                    document.getElementById('import-parking').value = ''
                    httpClientFile.post('admin/parking/import/sheet/' + this.project_id, param).then(response=>{
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                        this.getList()
                        // console.log(response.content)
                    })
            },
            importOrder() {
                document.getElementById('import-order').click();
            },

            import_order(e) {
                    this.$message('上传中...，车位编号如果不存在，将不会写入')

                    let file = e.target.files[0]
                    let param = new FormData() //创建form对象
                    param.append('file', file) //通过append向form对象添加数据
                    document.getElementById('import-order').value = ''
                    httpClientFile.post('admin/parking/import/order/' + this.project_id, param).then(response=>{
            
                        if(response.content != "") {

                            let parkingNo = response.content.join(" ")

                            // this.$alert(parkingNo, '发现无导入的车位：', {
                            //     confirmButtonText: '确定',
                            //     callback: action => {
                            //         this.getList()
                            //         }
                            //     })

                            this.$confirm(parkingNo, '发现导入失败的记录:', {
                                confirmButtonText: '确定',
                            }).then(() => {
                                this.getList()
                            }).catch(() => {
                                this.getList()        
                            });

                            this.getList()
                        } else {
                            this.$message({
                                message: '操作成功',
                                type: 'success'
                            });
                            this.getList()
                        }
                    })
            },
            importCaifu() {
                document.getElementById('import-caifu').click();
            },

            import_caifu(e) {
                    this.$message('上传中...，车位编号如果不存在，将不会写入')

                    let file = e.target.files[0]
                    let param = new FormData() //创建form对象
                    param.append('file', file) //通过append向form对象添加数据
                    document.getElementById('import-caifu').value = ''
                    httpClientFile.post('admin/parking/import/caifu/' + this.project_id, param).then(response=>{
                        
                        if(response.content != "") {

                            let parkingNo = response.content.join(" ")

                            // this.$alert(parkingNo, '发现无导入的车位：', {
                            //     confirmButtonText: '确定',
                            //     callback: action => {
                            //         this.getList()
                            //         }
                            //     })

                            this.$confirm(parkingNo, '发现导入失败的记录:', {
                                confirmButtonText: '确定',
                            }).then(() => {
                                this.getList()
                            }).catch(() => {
                                this.getList()        
                            });

                            this.getList()
                        } else {
                            this.$message({
                                message: '操作成功',
                                type: 'success'
                            });
                            this.getList()
                        }
                        
                    })
            },
            parentRefresh(){
                this.dialogVisibleEdit = false
                this.getList()
            },
            parentRefreshd(){
                this.dialogVisibleDetail = false
                //this.getList()
            }

        }
    }
</script>

<style lang="css" scoped>
.f-r {float: right;}
.fileinput {display: none;}
.parking-search input {width: 150px; padding: 0 5px;}
</style>