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
                    <el-input v-model="form.near_build"></el-input>
                </el-form-item>
                <el-form-item label="楼层" style="margin-bottom: 7px;" required>
                    <el-input v-model="form.floor"></el-input>
                </el-form-item>
                <el-form-item label="车位类型名称"  style="margin-bottom: 7px;">
                    <span>{{form.parking_type_name}}</span>
                </el-form-item>
                <el-form-item label="产品名称" required>
                    <el-input v-model="form.parking_name"></el-input>
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
                            :action="uploadImgUrl"
                            :on-preview="handleContractPreview"
                            :on-remove="handleContractRemove"
                            :on-success="handlerContractSuccess"
                            :multiple=true
                            list-type="picture"
                            :file-list="parking_contract">
                        <el-button size="small" type="primary">上传图片</el-button>
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
                    <el-select v-model="form.parking_wz" placeholder="请选择车位距离">
                        <el-option v-for="(item, index) in parking_wz" :key="index" :label="item" :value="index"></el-option>
                    </el-select>
                </el-form-item>
                <div class="clear">
                    <el-form-item label="是否独立" class="left mb15">
                        <template>
                            <el-radio-group v-model="form.is_duli">
                                <el-radio :label="1">是</el-radio>
                                <el-radio :label="0">否</el-radio>
                            </el-radio-group>
                        </template>
                    </el-form-item>
                    <el-form-item label="是否侧方" class="left mb15">
                        <template>
                            <el-radio-group v-model="form.is_cefang">
                                <el-radio :label="1">是</el-radio>
                                <el-radio :label="0">否</el-radio>
                            </el-radio-group>
                        </template>
                    </el-form-item>
                    <el-form-item label="是否死角" class="left mb15">
                        <template>
                            <el-radio-group v-model="form.is_sijiao">
                                <el-radio :label="1">是</el-radio>
                                <el-radio :label="0">否</el-radio>
                            </el-radio-group>
                        </template>
                    </el-form-item>
                    <el-form-item label="驾驶室开门受阻" class="left mb15">
                        <template>
                            <el-radio-group v-model="form.jss_shouzu">
                                <el-radio :label="1">是</el-radio>
                                <el-radio :label="0">否</el-radio>
                            </el-radio-group>
                        </template>
                    </el-form-item>
                    <el-form-item label="副驾驶室开门受阻" class="left mb15">
                        <template>
                            <el-radio-group v-model="form.fjss_shouzu">
                                <el-radio :label="1">是</el-radio>
                                <el-radio :label="0">否</el-radio>
                            </el-radio-group>
                        </template>
                    </el-form-item>
                    <el-form-item label="三中" class="left mb15">
                        <template>
                            <el-radio-group v-model="form.san_zhong">
                                <el-radio :label="1">是</el-radio>
                                <el-radio :label="0">否</el-radio>
                            </el-radio-group>
                        </template>
                    </el-form-item>
                    <el-form-item label="漏水渗水" class="left mb15">
                        <template>
                            <el-radio-group v-model="form.ls_shui">
                                <el-radio :label="1">是</el-radio>
                                <el-radio :label="0">否</el-radio>
                            </el-radio-group>
                        </template>
                    </el-form-item>
                    <el-form-item label="高度较低" class="left mb15">
                        <template>
                            <el-radio-group v-model="form.height_lower">
                                <el-radio :label="1">是</el-radio>
                                <el-radio :label="0">否</el-radio>
                            </el-radio-group>
                        </template>
                    </el-form-item>
                    <el-form-item label="消防/水管阻挡" class="left mb15">
                        <template>
                            <el-radio-group v-model="form.xiao_fang_sz">
                                <el-radio :label="1">是</el-radio>
                                <el-radio :label="0">否</el-radio>
                            </el-radio-group>
                        </template>
                    </el-form-item>
                    <el-form-item label="各类门阻挡" class="left mb15">
                        <template>
                            <el-radio-group v-model="form.door_sz">
                                <el-radio :label="1">是</el-radio>
                                <el-radio :label="0">否</el-radio>
                            </el-radio-group>
                        </template>
                    </el-form-item>
                    <el-form-item label="其他阻挡物" class="left mb15">
                        <template>
                            <el-radio-group v-model="form.other_sz">
                                <el-radio :label="1">是</el-radio>
                                <el-radio :label="0">否</el-radio>
                            </el-radio-group>
                        </template>
                    </el-form-item>
                    <el-form-item label="排水道影响" class="left mb15">
                        <template>
                            <el-radio-group v-model="form.psg_sz">
                                <el-radio :label="1">是</el-radio>
                                <el-radio :label="0">否</el-radio>
                            </el-radio-group>
                        </template>
                    </el-form-item>
                    <el-form-item label="维修井影响" class="left mb15">
                        <template>
                            <el-radio-group v-model="form.wxj_sz">
                                <el-radio :label="1">是</el-radio>
                                <el-radio :label="0">否</el-radio>
                            </el-radio-group>
                        </template>
                    </el-form-item>
                    <el-form-item label="易刮擦" class="left mb15">
                        <template>
                            <el-radio-group v-model="form.ygc_sz">
                                <el-radio :label="1">是</el-radio>
                                <el-radio :label="0">否</el-radio>
                            </el-radio-group>
                        </template>
                    </el-form-item>
                    <el-form-item label="近垃圾站" class="left mb15">
                        <template>
                            <el-radio-group v-model="form.ljz_sz">
                                <el-radio :label="1">是</el-radio>
                                <el-radio :label="0">否</el-radio>
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
                    <el-input v-model="form.total_ticket"></el-input>
                </el-form-item>
                <el-form-item label="收购价" class="left">
                    <el-input v-model="form.purchase_price"></el-input>
                </el-form-item>
                <el-form-item label="定金" required  class="left">
                    <el-input v-model="form.deposit" :disabled="disabled"></el-input>
                </el-form-item>
            </div>
            <div style="margin-bottom: 15px;">饭票返还计划配置: </div>
            <div style="margin-left: 140px;">
                <p class="fp_rule" v-for="(item,index) in form.fp_rule" :key="index">
                    支付完成后 <input type="number" v-model="item.day"> 天内&nbsp;&nbsp;&nbsp;
                    返还 <input type="number" v-model="item.amount"> 饭票 <el-button round @click="fp_rule_minus(index)">-</el-button>
                </p>
                <p>
                    <el-button round @click="fp_rule_plus">+</el-button>
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
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="2">否</el-radio>
                    </el-radio-group>
                </template>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="form.remark"></el-input>
            </el-form-item>
            <!-- <el-form-item label="饭票返还总额(彩饭票)" required>
                <el-input v-model="form.total_ticket" :disabled="disabled"></el-input>
            </el-form-item>
             -->
            
            <el-form-item label="">
                <el-button type="primary" @click="onSubmit">提交</el-button>
            </el-form-item>
        </el-form>
        <el-dialog title="图片预览" :visible.sync="dialogVisible" width="65%" style="text-align:center;">
            <img :src="previewUrl" alt="" style="width:100%;height:auto;">
        </el-dialog>
    </div>
</template>

<script>
    import httpClient from '@/utils/request'
    import { staticUrl } from '@/utils/env'

    export default {
        name: 'parkingEdit',
        props: {
            parkingId: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                radio:'',
                project_id: 0,
                uploadImgUrl: staticUrl + '/upload/image/650',
                labelPosition: 'right',
                disabled: false,
                listLoading: true,
                parking_id: 0,
                parking: '',
                parkingSaleStatus: [],
                parkingPurchaseType: [],
                parkingPurchaseMethod: [],
                parkingType: [],
                parkingTag: [],
                parking_wz: [],
                parkingVisible: [],
                certificateTransact: [],
                marketingControl: [],
                parkingRightType: [],
                floor: [],
                form: {
                    parking_no: '',
                    parking_uuid: '',
                    parking_type: '',
                    parking_position: '',
                    purchase_type: '',
                    parking_area: 0,
                    floor: '',
                    parking_wz: '',
                    parking_tag: 0,
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
                    certificate_transact:'',
                    remark:'',
                },
                parking_contract: [],
                previewUrl: '',
                dialogVisible: false,
                staticUrl: staticUrl

            }
        },
        filters: {
            
        },
        created() {
            const params = this.$route.params
            this.parking_id = parseInt(params.id)
            this.getData()
            
        },
        methods: { 
            getData() {
                this.listLoading = true
                this.parking = {}
                setTimeout(() => {
                    httpClient.get('admin/project/parking/detail/' + this.parkingId).then(response => {
                        const data = response.content;
                        this.parking = data.parking
                        this.project_id = this.parking.project_id
                        this.parkingSaleStatus = data.parkingSaleStatus
                        this.parkingPurchaseType = data.parkingPurchaseType
                        this.parkingPurchaseMethod = data.parkingPurchaseType
                        this.parkingType = data.parkingType
                        this.parking_wz = data.parking_wz
                        this.parkingTag = data.parkingTag
                        this.parkingVisible = data.parkingVisible
                        this.parkingRightType = data.parkingRightType
                        this.marketingControl = data.marketingControl
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
                        console.log("11",this.form.is_duli)
                        this.makeFormData()
                        if (this.form.fp_rule.length == 0) {
                            this.form.fp_rule.push({"day":'', "amount":''})
                        }
                        this.form.parking_contract = this.dealFormPhoto(this.parking.parking_contract != null ? this.parking.parking_contract.split(',') : [])
                        this.parking_contract = this.showPhoto(this.parking.parking_contract != null ? this.parking.parking_contract.split(',') : [])
                        this.listLoading = false
                    })
                }, 500)
            },
            makeFormData() {
                for (const key in this.form) {
                    this.form[key] = this.parking[key]
                }
            },
            dealFormPhoto(arr) {
                if (arr.length == 0) {
                    return [];
                }

                let newArr = []
                for (const i in arr) {
                    if (arr[i] != '') {
                        // 去除oss 地址
                        // http://czy-version.oss-cn-shenzhen.aliyuncs.com/upload%2Fimages%2F20181228%2F1812281136105c259a2ac36ed.png?OSSAccessKeyId=LTAIMJIPmPad9RXY&Signature=7mJdF0D%2FBmiP8tr%2B1evRNU3amag%3D&Expires=1546054611
                        newArr.push(this.splitOssUrl(arr[i]))
                    }
                }
                return newArr
            },
            splitOssUrl(url) {
                let ossUrl = decodeURIComponent(url)
                ossUrl = ossUrl.split('?')[0]
                ossUrl = ossUrl.split('upload/images/')[1]
                return 'upload/images/' + ossUrl
            },
            showPhoto(arr) {
                if (arr.length == 0) {
                    return [];
                }
                
                let newArr = []
                for (const i in arr) {
                    if (arr[i] != '') {
                        newArr.push({name: '图片'+ (parseInt(i)+1), url: arr[i]})
                    }
                }
                return newArr
            },
            onSubmit() {
                if (!this.form.parking_type) {
                    this.$message({
                        message: '请选择车位类型',
                        type: 'warning'
                    });
                    return;
                }
                if (!this.form.property_right) {
                    this.$message({
                        message: '请选择产权性质',
                        type: 'warning'
                    });
                    return;
                }
                if (!this.form.floor) {
                    this.$message({
                        message: '请填写楼层',
                        type: 'warning'
                    });
                    return;
                }
                if (!this.form.parking_name) {
                    this.$message({
                        message: '请填写产品名称',
                        type: 'warning'
                    });
                    return;
                }
                if (!this.form.parking_wz) {
                    this.$message({
                        message: '请选择车位距离',
                        type: 'warning'
                    });
                    return;
                }
                if (!this.form.sale_price) {
                    this.$message({
                        message: '请填写销售价格',
                        type: 'warning'
                    });
                    return;
                }
                if (!this.form.total_ticket) {
                    this.$message({
                        message: '请填写饭票总额',
                        type: 'warning'
                    });
                    return;
                }
                if (!this.form.deposit) {
                    this.$message({
                        message: '请填写定金',
                        type: 'warning'
                    });
                    return;
                }
                if (!this.form.visible) {
                    this.$message({
                        message: '请选择可见状态',
                        type: 'warning'
                    });
                    return;
                }
                if (!this.form.marketing_control) {
                    this.$message({
                        message: '请选择销控状态',
                        type: 'warning'
                    });
                    return;
                }
                
                this.$message('提交中...')
                if (this.form.fp_rule.length == 0) {
                        this.form.fp_rule.push({"day":'', "amount":''})
                    }
                httpClient.post('admin/parking/update/' + this.parkingId, this.form).then(response => {
                    this.$message({ message: '操作成功', type: 'success' })
        
                    //this.$router.push({ name: 'Parking', params: {id: this.project_id}, query: this.$route.query })
                    //this.$router.go(-1)
                    this.$emit('refresh')
                })
            },
            // 饭票返还规则配置
            fp_rule_plus() {
                this.form.fp_rule.push({"day":'', "amount":''})
            },

            fp_rule_minus(index) {
                let newArr = []
                for (const key in this.form.fp_rule) {
                    if (key == index) {
                        continue
                    }
                    newArr.push(this.form.fp_rule[key])
                }
                this.form.fp_rule = newArr
            },

            // 上传图片控件 - 合同
            previewPhoto(url) {
                this.previewUrl = url
                this.dialogVisible = true
            },

            handleContractRemove(file, fileList) {
                this.form.parking_contract = [];
                for (const i in fileList) {
                    if (fileList[i].hasOwnProperty('response')) {
                        this.form.parking_contract.push(fileList[i].response.content.photoPath)
                    } else {
                        const path = fileList[i].url;
                        const imgPath = this.splitOssUrl(path)
                        this.form.parking_contract.push(imgPath)
                    }
                }
            },
            handleContractPreview(file) {
                this.previewPhoto(file.url)
            },
            handlerContractSuccess(response, fileList) {
                let data = response.content
                this.form.parking_contract.push(data.photoPath)
            }
            
        }
    }
</script>

<style lang="css" scoped>
    .img-responsive {
        width: 350px;
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
