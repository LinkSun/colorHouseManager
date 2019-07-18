<template>
    <div class="app-container calendar-list-container">
        <div style="margin: 20px;"></div>
        <el-form :model="form" v-loading="listLoading" label-width="125px">
            <div style="margin-bottom: 15px;">车位基本信息: </div>
            <div class="mb30 clear">
            <div class="left">
                <el-form-item label="车位编号" style="margin-bottom: 7px;">
                    <span>{{form.parking_no}}</span>
                </el-form-item>
                <el-form-item label="车位类型" required>
                    <el-select v-model="form.parking_type" placeholder="请选择车位类型" :disabled="disabled">
                        <el-option v-for="(item, index) in parkingType" :key="item.id" :label="item" :value="parseInt(index)"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="产权性质" required>
                    <el-select v-model="form.property_right" placeholder="请选择车位产权" :disabled="disabled">
                        <el-option v-for="(item, index) in parkingRightType" :key="index" :label="item" :value="parseInt(index)"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="靠近楼栋">
                    <el-input v-model="form.near_build" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="楼层" style="margin-bottom: 7px;" required>
                    <el-input v-model="form.floor" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="车位类型名称"  style="margin-bottom: 7px;">
                    <span>{{form.parking_type_name}}</span>
                </el-form-item>
                <el-form-item label="产品名称" required>
                    <el-input v-model="form.parking_name" :disabled="disabled"></el-input>
                </el-form-item>
            </div>
            <div class="right">
                <el-form-item label="车位UUID"  style="margin-bottom: 7px;">
                    <span>{{form.parking_uuid}}</span>
                </el-form-item>
                <el-form-item label="车位标签">
                    <el-select v-model="form.parking_tag" placeholder="请选择车位标签" :disabled="disabled">
                        <el-option v-for="(item, index) in parkingTag" :key="item.id" :label="item" :value="parseInt(index)"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="车位收购类型">
                    <el-select v-model="form.purchase_type" placeholder="请选择车位收购类型" :disabled="disabled">
                        <el-option v-for="(item, index) in parkingPurchaseType" :key="item.id" :label="item" :value="parseInt(index)"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="面积">
                    <el-input v-model="form.parking_area" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="上传合同信息">
                    <el-upload
                            style="margin-top: 30px;"
                            name="photo"
                            class="upload-demo"
                            :multiple=true
                            list-type="picture"
                            :file-list="parking_contract"
                            :disabled="disabled">
                        <el-button size="small" type="info">上传图片</el-button>
                        <div slot="tip" class="el-upload__tip">支持单个或批量上传</div>
                    </el-upload>
                </el-form-item>
            </div>
            </div>
            <!-- <el-form-item label="车位位置">
                <el-input v-model="form.parking_position" :disabled="disabled"></el-input>
            </el-form-item> -->
            <!-- <el-form-item label="车位收购价格(元/个)">
                <el-input v-model="form.purchase_price" :disabled="disabled"></el-input>
            </el-form-item> -->
            <div style="margin-bottom: 15px;">车位位置/品质: </div>
            <div class="mb30 clear">
                <el-form-item label="车位距离" required>
                    <el-select v-model="form.parking_wz" placeholder="请选择车位距离" :disabled="disabled">
                        <el-option v-for="(item, index) in parking_wz" :key="index" :label="item" :value="index"></el-option>
                    </el-select>
                </el-form-item>
                <div class="clear">
                    <el-form-item label="是否独立" class="left mb15">
                        <template>
                            <el-radio-group v-model="form.is_duli">
                                <el-radio :label="1" :disabled="disabled">是</el-radio>
                                <el-radio :label="0" :disabled="disabled">否</el-radio>
                            </el-radio-group>
                        </template>
                    </el-form-item>
                    <el-form-item label="是否侧方" class="left mb15">
                        <template>
                            <el-radio-group v-model="form.is_cefang">
                                <el-radio :label="1" :disabled="disabled">是</el-radio>
                                <el-radio :label="0" :disabled="disabled">否</el-radio>
                            </el-radio-group>
                        </template>
                    </el-form-item>
                    <el-form-item label="是否死角" class="left mb15">
                        <template>
                            <el-radio-group v-model="form.is_sijiao">
                                <el-radio :label="1" :disabled="disabled">是</el-radio>
                                <el-radio :label="0" :disabled="disabled">否</el-radio>
                            </el-radio-group>
                        </template>
                    </el-form-item>
                    <el-form-item label="驾驶室开门受阻" class="left mb15">
                        <template>
                            <el-radio-group v-model="form.jss_shouzu">
                                <el-radio :label="1" :disabled="disabled">是</el-radio>
                                <el-radio :label="0" :disabled="disabled">否</el-radio>
                            </el-radio-group>
                        </template>
                    </el-form-item>
                    <el-form-item label="副驾驶室开门受阻" class="left mb15">
                        <template>
                            <el-radio-group v-model="form.fjss_shouzu">
                                <el-radio :label="1" :disabled="disabled">是</el-radio>
                                <el-radio :label="0" :disabled="disabled">否</el-radio>
                            </el-radio-group>
                        </template>
                    </el-form-item>
                    <el-form-item label="三中" class="left mb15">
                        <template>
                            <el-radio-group v-model="form.san_zhong">
                                <el-radio :label="1" :disabled="disabled">是</el-radio>
                                <el-radio :label="0" :disabled="disabled">否</el-radio>
                            </el-radio-group>
                        </template>
                    </el-form-item>
                    <el-form-item label="漏水渗水" class="left mb15">
                        <template>
                            <el-radio-group v-model="form.ls_shui">
                                <el-radio :label="1" :disabled="disabled">是</el-radio>
                                <el-radio :label="0" :disabled="disabled">否</el-radio>
                            </el-radio-group>
                        </template>
                    </el-form-item>
                    <el-form-item label="高度较低" class="left mb15">
                        <template>
                            <el-radio-group v-model="form.height_lower">
                                <el-radio :label="1" :disabled="disabled">是</el-radio>
                                <el-radio :label="0" :disabled="disabled">否</el-radio>
                            </el-radio-group>
                        </template>
                    </el-form-item>
                    <el-form-item label="消防/水管阻挡" class="left mb15">
                        <template>
                            <el-radio-group v-model="form.xiao_fang_sz">
                                <el-radio :label="1" :disabled="disabled">是</el-radio>
                                <el-radio :label="0" :disabled="disabled">否</el-radio>
                            </el-radio-group>
                        </template>
                    </el-form-item>
                    <el-form-item label="各类门阻挡" class="left mb15">
                        <template>
                            <el-radio-group v-model="form.door_sz">
                                <el-radio :label="1" :disabled="disabled">是</el-radio>
                                <el-radio :label="0" :disabled="disabled">否</el-radio>
                            </el-radio-group>
                        </template>
                    </el-form-item>
                    <el-form-item label="其他阻挡物" class="left mb15">
                        <template>
                            <el-radio-group v-model="form.other_sz">
                                <el-radio :label="1" :disabled="disabled">是</el-radio>
                                <el-radio :label="0" :disabled="disabled">否</el-radio>
                            </el-radio-group>
                        </template>
                    </el-form-item>
                    <el-form-item label="排水道影响" class="left mb15">
                        <template>
                            <el-radio-group v-model="form.psg_sz">
                                <el-radio :label="1" :disabled="disabled">是</el-radio>
                                <el-radio :label="0" :disabled="disabled">否</el-radio>
                            </el-radio-group>
                        </template>
                    </el-form-item>
                    <el-form-item label="维修井影响" class="left mb15">
                        <template>
                            <el-radio-group v-model="form.wxj_sz">
                                <el-radio :label="1" :disabled="disabled">是</el-radio>
                                <el-radio :label="0" :disabled="disabled">否</el-radio>
                            </el-radio-group>
                        </template>
                    </el-form-item>
                    <el-form-item label="易刮擦" class="left mb15">
                        <template>
                            <el-radio-group v-model="form.ygc_sz">
                                <el-radio :label="1" :disabled="disabled">是</el-radio>
                                <el-radio :label="0" :disabled="disabled">否</el-radio>
                            </el-radio-group>
                        </template>
                    </el-form-item>
                    <el-form-item label="近垃圾站" class="left mb15">
                        <template>
                            <el-radio-group v-model="form.ljz_sz">
                                <el-radio :label="1" :disabled="disabled">是</el-radio>
                                <el-radio :label="0" :disabled="disabled">否</el-radio>
                            </el-radio-group>
                        </template>
                    </el-form-item>
                </div>
            </div>
            <div style="margin-bottom: 15px;">车位价格: </div>
            <div class="mb30 clear">
                <el-form-item label="销售价格" required class="left">
                    <el-input v-model="form.sale_price" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="饭票总额" required class="left">
                    <el-input v-model="form.total_ticket"  :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="收购价" class="left">
                    <el-input v-model="form.purchase_price"  :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="定金" required  class="left">
                    <el-input v-model="form.deposit" :disabled="disabled"></el-input>
                </el-form-item>
            </div>
            <div style="margin-bottom: 15px;">饭票返还计划配置: </div>
            <div style="margin-left: 140px;">
                <p class="fp_rule" v-for="(item,index) in form.fp_rule" :key="index">
                    支付完成后 <input type="number" v-model="item.day" :disabled="disabled"> 天内&nbsp;&nbsp;&nbsp;
                    <!-- 返还 <input type="number" v-model="item.amount"> 饭票 <el-button round @click="fp_rule_minus(index)">-</el-button> -->
                    返还 <input type="number" v-model="item.amount" :disabled="disabled"> 饭票 <el-button round>-</el-button>
                </p>
                <p>
                    <!-- <el-button round @click="fp_rule_plus">+</el-button> -->
                </p>
            </div>
            <span style="display:none;">{{ form.fp_rule }}</span>
            <div style="margin-bottom: 15px;">车位状态: </div>
            <div class="clear">
                <el-form-item label="可见状态" required class="left">
                    <el-select v-model="form.visible" placeholder="请选择车位可见状态" :disabled="disabled">
                        <el-option v-for="(item, index) in parkingVisible" :key="item.id" :label="item" :value="parseInt(index)"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="销控状态" required class="left">
                    <el-select v-model="form.marketing_control" placeholder="请选择车位销控状态" :disabled="disabled">
                        <el-option v-for="(item, index) in marketingControl" :key="item.id" :label="item" :value="parseInt(index)"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="真实销售状态" class="left">
                    <el-select v-model="form.real_sale_status" placeholder="请选择车位实际销售状态" :disabled="disabled">
                        <el-option v-for="(item, index) in parkingSaleStatus" :key="item.id" :label="item" :value="parseInt(index)"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="表面销售状态" class="left">
                    <el-select v-model="form.face_sale_status" placeholder="请选择车位表面销售状态" :disabled="disabled">
                        <el-option v-for="(item, index) in parkingSaleStatus" :key="item.id" :label="item" :value="parseInt(index)"></el-option>
                    </el-select>
                </el-form-item>
            </div>
            <el-form-item label="产证办理">
                <template>
                    <el-radio-group v-model="form.certificate_transact">
                        <el-radio :label="1" :disabled="disabled">是</el-radio>
                        <el-radio :label="2" :disabled="disabled">否</el-radio>
                    </el-radio-group>
                </template>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="form.remark"  :disabled="disabled"></el-input>
            </el-form-item>
            <!-- <el-form-item label="饭票返还总额(彩饭票)" required>
                <el-input v-model="form.total_ticket" :disabled="disabled"></el-input>
            </el-form-item>
             -->
        </el-form>
        <!-- <el-dialog title="图片预览" :visible.sync="dialogVisible" width="65%" style="text-align:center;">
            <img :src="previewUrl" alt="" style="width:100%;height:auto;">
        </el-dialog> -->
        
    </div>
</template>

<script>
    import httpClient from '@/utils/request'
    import { formatDate } from '@/utils/index'
    export default {
        name: 'parkingDetail',
        props: {
            parkingId: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                labelPosition: 'right',
                disabled: true,
                listLoading: true,
                parking_id: 0,
                parking: '',
                parkingSaleStatus: [],
                parkingPurchaseType: [],
                parkingPurchaseMethod: [],
                parkingType: [],
                parkingTag: [],
                parkingVisible: [],
                parkingRightType: [],
                certificateTransact: [],
                marketingControl: [],
                parking_wz: [],
                form: {
                    parking_no: '',
                    parking_uuid: '',
                    parking_type: '',
                    parking_position: '',
                    purchase_type: '',
                    parking_area: 0,
                    parking_tag: 0,
                    floor: '',
                    parking_wz: '',
                    purchase_price: 0,
                    property_right: '',
                    parking_contract: [],
                    face_sale_status: 0,
                    real_sale_status: 0,
                    sale_price: 0,
                    total_ticket: 0,
                    fp_rule: [],
                    deposit: 0,
                    visible: '',
                    certificate_transact: 0,
                    marketing_control: 0,
                    customer_name: '',
                    customer_phone: '',
                    customer_card: '',
                    room_no: '',
                    near_build:'',
                    parking_type_name: '',
                    parking_name: '',
                    is_duli:'',
                    is_cefang:'', 
                    is_sijiao:'', 
                    jss_shouzu:'',
                    fjss_shouzu:'',
                    san_zhong:'', 
                    ls_shui:'', 
                    height_lower:'',  
                    xiao_fang_sz:'',
                    door_sz:'', 
                    other_sz:'', 
                    psg_sz:'',
                    wxj_sz:'', 
                    ygc_sz:'', 
                    ljz_sz:'', 
                    remark:'',

                },
                parking_contract: [],
            }
        },
        filters: {
            formatDate(param) {
                if (param == 0 || param == null) {
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

                if (param == 2) {
                    return  warning
                }
                return info
            }
        },
        created() {
            this.getData();
        },
        methods: { 
            getData() {
                this.parking = {}
                this.listLoading = true;
                setTimeout(()=>{
                    httpClient.get('admin/project/parking/detail/' + this.parkingId).then(response => {
                        const data = response.content;
                        this.parking = data.parking
                        this.parkingSaleStatus = data.parkingSaleStatus
                        this.parkingPurchaseType = data.parkingPurchaseType
                        this.parkingPurchaseMethod = data.parkingPurchaseType
                        this.parkingType = data.parkingType
                        this.parkingTag = data.parkingTag
                        this.parking_wz = data.parking_wz  
                        this.parkingVisible = data.parkingVisible
                        this.marketingControl = data.marketingControl
                        this.parkingRightType = data.parkingRightType
                        this.certificateTransact = data.certificateTransact
                        this.form.is_duli = this.parking.is_duli
                        this.form.is_cefang = this.parking.is_cefang
                        this.form.is_sijiao = this.parking.is_sijiao
                        this.form.jss_shouzu = this.parking.jss_shouzu
                        this.form.fjss_shouzu = this.parking.fjss_shouzu
                        this.form.san_zhong = this.parking.san_zhong
                        this.form.ls_shui = this.parking.ls_shui
                        this.form.height_lower = this.parking.height_lower
                        this.form.xiao_fang_sz = this.parking.xiao_fang_sz
                        this.form.door_sz = this.parking.door_sz
                        this.form.other_sz = this.parking.other_sz
                        this.form.psg_sz = this.parking.psg_sz
                        this.form.wxj_sz = this.parking.wxj_sz
                        this.form.ygc_sz = this.parking.ygc_sz
                        this.form.ljz_sz = this.parking.ljz_sz
                        this.form.certificate_transact = this.parking.certificate_transact
                        this.makeFormData()
                        this.parking_contract = this.parking.parking_contract != null ? this.parking.parking_contract.split(',') : []
                        this.listLoading = false;
                    })
                },500)
            },
            makeFormData() {
                for (const key in this.form) {
                    this.form[key] = this.parking[key]
                }
            }
            
        }
    }
</script>

<style lang="css" scoped>
    .img-responsive {
        width: 450px;
        height: auto;
    }
    .fp_rule input {height: 35px; width: 70px;}
</style>
<style scoped>
.clear::before, .clear::after {
    content: "";
    display: block;
    clear: both;
}
.left,.right{
    width: 50%;
    float: left;
}
.mb30{
    margin-bottom: 30px;
}
.mb15{
    margin-bottom: 7px;
}
</style>