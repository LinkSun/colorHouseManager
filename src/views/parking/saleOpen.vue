<template>
    <div class="app-container calendar-list-container" v-loading="listLoading">
        <div><br></div>
        <!-- <div>项目：话都不说&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;筛选条件：&nbsp;&nbsp;&nbsp;&nbsp;标准&nbsp;&nbsp;&nbsp;&nbsp;可见&nbsp;&nbsp;&nbsp;&nbsp;未售</div> -->
        <div v-for="(value, key, index) in list" :key="index" class="parking-checked-group">
            <p>
                车位位置：{{key}}&nbsp;&nbsp;&nbsp;&nbsp; 
                <el-button type="primary" size="mini" @click="checkedAll(index)" :class="'parking-checked-' + index">全选</el-button>
                <el-button type="primary" size="mini" @click="checkedNothing(index)" :class="'parking-checked-' + index">全不选</el-button>
            </p>
            <p class="el-checkbox-group1">
                <label v-for="item in value" :key="item.parking_id" :style="item.disabled === true ? 'color:#cccccc;' : ''">
                    <input type="checkbox" :disabled="item.disabled" :value="item.parking_id">
                     {{ item.parking_no }}
                </label>
                
                <!-- <el-checkbox v-for="item in value" :label="item.parking_no" :key="item.parking_no" 
                :checked="item.marketing_control == 2 ? true : false" class="check-box">{{item.parking_no}}</el-checkbox> -->
            </p>
            <br>
            <hr>
        </div>
        
        <el-button type="primary" @click="open">批量改价格</el-button>
        &nbsp;&nbsp;
        <el-button type="primary" @click="openStatus">批量改状态</el-button>
        &nbsp;&nbsp;
        <el-button type="primary" @click="openTag">批量改车位标签</el-button>
        &nbsp;&nbsp;
        <el-button type="danger"  @click="deleteAll">批量删除</el-button>
        <br>
        <!-- 弹窗 -->
        <el-dialog title="批量改价格 (选填，留空项不会更新)" :visible.sync="dialogFormVisible" width="50%">
            
            <el-form :ref="form" :model="form" label-width="180px">
                
            <el-form-item label="销售价格(元)">
                <el-input v-model="form.sale_price"></el-input>
            </el-form-item>
            <el-form-item label="饭票返还总额(彩饭票)">
                <el-input v-model="form.total_ticket"></el-input>
            </el-form-item>
            <el-form-item label="饭票返还计划配置">
                <div>
                    <p class="fp_rule" v-for="(item,index) in form.fp_rule" :key="index">
                        支付完成后 <input type="number" v-model="item.day"> 天内&nbsp;&nbsp;&nbsp;
                        返还 <input type="number" v-model="item.amount"> 饭票 <el-button round @click="fp_rule_minus(index)">-</el-button>
                    </p>
                    <p>
                        <el-button round @click="fp_rule_plus">+</el-button>
                    </p>
                </div>
                <span style="display:none;">{{ form.fp_rule }}</span>
            </el-form-item>
            <el-form-item label="定金(元)">
                <el-input v-model="form.deposit"></el-input>
            </el-form-item>
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="formUpdateSubmit">提 交</el-button>
            </div>
        </el-dialog>

        <!-- 弹窗2 -->
        <el-dialog title="批量改状态" :visible.sync="dialogFormStatusVisible" width="50%">
            <el-form :ref="formStatus" :model="formStatus" label-width="180px">
                
            <el-form-item label="车位可见状态" required>
                <el-select v-model="formStatus.visible" placeholder="请选择车位可见状态">
                    <el-option v-for="(item, index) in parkingVisible" :key="item.id" :label="item" :value="parseInt(index)"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="车位表面销售状态" required>
                <el-select v-model="formStatus.face_sale_status" placeholder="请选择车位表面销售状态">
                    <el-option v-for="(item, index) in parkingSaleStatus" :key="item.id" :label="item" :value="parseInt(index)"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="车位实际销售状态" required>
                <el-select v-model="formStatus.real_sale_status" placeholder="请选择车位实际销售状态">
                    <el-option v-for="(item, index) in parkingSaleStatus" :key="index" :label="item" :value="parseInt(index)"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="车位销控状态" required>
                <el-select v-model="formStatus.marketing_control" placeholder="请选择车位销控状态">
                    <el-option v-for="(item, index) in marketingControl" :key="index" :label="item" :value="parseInt(index)"></el-option>
                </el-select>
            </el-form-item>
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormStatusVisible = false">取 消</el-button>
                <el-button type="primary" @click="formUpdateStatusSubmit">提 交</el-button>
            </div>
        </el-dialog>

        <!-- 弹窗3 -->
        <el-dialog title="批量改车位标签" :visible.sync="dialogFormTagVisible" width="50%">
            <el-form :ref="formStatus" :model="formStatus" label-width="180px">
                
            <el-form-item label="车位标签" required>
                <el-select v-model="formTag.parking_tag" placeholder="请选择车位标签">
                    <el-option v-for="(item, index) in parkingTag" :key="index" :label="item" :value="index"></el-option>
                </el-select>
            </el-form-item>
            
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormTagVisible = false">取 消</el-button>
                <el-button type="primary" @click="formUpdateTagSubmit">提 交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import httpClient from '@/utils/request'
    // import httpClientFile from '@/utils/requestFile'
    // import httpFile from '@/utils/downloadFile'
    import $ from 'jquery'

    export default {
        name: 'parkingSaleOpen',
        data() {
            return {
                project_id: 0,
                parking_id:'',
                value:'',
                query:{
                    parking_no: '',
                    visible: '',
                    parking_tag: '',
                    marketing_control: '',
                    face_sale_status: '',
                    real_sale_status: '',
                },
                listLoading: false,
                list: [],
                parkingSaleStatus: [],
                parkingVisible: [],
                marketingControl: [],
                parkingTag: [],
                // 价格弹窗1
                dialogFormVisible: false,
                form: {
                    form_price: 1,
                    checkedParkings: [],
                    sale_price: '',
                    total_ticket: '',
                    fp_rule: [],
                    deposit: ''
                },
                // 状态弹窗2
                dialogFormStatusVisible: false,
                formStatus: {
                    form_status: 1,
                    checkedParkings: [],
                    visible: '',
                    face_sale_status: '',
                    real_sale_status: '',
                    marketing_control: ''
                },
                // 状态弹窗3 parking_tag
                dialogFormTagVisible: false,
                // dialogFormTagVisible1: false,
                formTag: {
                    parking_tag: '',
                    checkedParkings: []
                },
                // checkList:[],
            }
        },
        filters: {
            
        },
        created() {
            const params = this.$route.params
            this.project_id = parseInt(params.id)
            this.query.parking_no = this.$route.query.parking_no
            this.query.visible = this.$route.query.visible
            this.query.parking_tag = this.$route.query.parking_tag
            this.query.marketing_control = this.$route.query.marketing_control
            this.query.face_sale_status = this.$route.query.face_sale_status
            this.query.real_sale_status = this.$route.query.real_sale_status
            this.getData();
            console.log("22",this.$route.query.visible)
        },
        methods: { 
            getData() {
                this.listLoading = true;
                httpClient.get('admin/parking/sale/' + this.project_id, { params: this.query }).then(response => {
                    const data = response.content
                    this.list = data.list
                    this.parkingSaleStatus = data.parkingSaleStatus
                    this.parkingVisible = data.parkingVisible
                    this.marketingControl = data.marketingControl
                    this.parkingTag = data.parkingTag
                    this.listLoading = false
                })
            },
            // 批量删除
            deleteAll() {
                let temp = []
                $('input:checkbox:checked').each(function (index, item) {
                     temp.push($(this).val());
                 });
                 this.form.checkedParkings = temp
                 console.log("temp",temp)
                 if (this.form.checkedParkings.length == 0) {
                     this.$message.error('请先选择车位')
                     return
                 }
                this.$confirm('确认批量删除车位？')
                    .then(_=> {
                        httpClient.post('admin/parking/delete-all', {parking_id: temp}).then(response => {
                            this.$message({ message: '操作成功', type: 'success' });
                            setTimeout(() => {
                                this.getData()
                            },1000)
                            
                        })
                    }).catch(_ => {})
                
                
            },
            checkedAll(index) {
            
                $('.parking-checked-' + index).parent().next().find('input[type="checkbox"]:not(:disabled)').prop("checked", true)
                // let arr = this.list[key]
                // let newarr = []
                // for (const i in arr) {
                //     newarr.push({
                //         parking_no: this.list[key][i].parking_no,
                //         marketing_control: 2
                //     });
                // }
                // //this.list[key] = newarr
                // //  this.$set(this.list,key,newarr)
                // // console.log(this.list)
                // // this.$forceUpdate()
                // // console.log(1)
                // this.list[key] = newarr
                // this.list = Object.assign({},this.list)
            },
            checkedNothing(index) {
                $('.parking-checked-' + index).parent().next().find('input:checkbox').prop("checked", false)
            },
            open() {
                let temp = []
                $('input:checkbox:checked').each(function (index, item) {
                     temp.push($(this).val());
                 });
                 this.form.checkedParkings = temp
                 if (this.form.checkedParkings.length == 0) {
                     this.$message.error('请先选择车位')
                     return
                 }

                this.dialogFormVisible = true
            },

            formUpdateSubmit() {
                this.$message('提交中...')
                httpClient.post('admin/parking/sale/' + this.project_id, this.form).then(response => {
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                    this.dialogFormVisible = false
                })
            },
            openStatus() {
                let temp = []
                $('input:checkbox:checked').each(function (index, item) {
                     temp.push($(this).val());
                 });
                 this.formStatus.checkedParkings = temp
                 if (this.formStatus.checkedParkings.length == 0) {
                     this.$message.error('请先选择车位')
                     return
                 }

                this.dialogFormStatusVisible = true
            },

            formUpdateStatusSubmit() {
                this.$message('提交中...')
                httpClient.post('admin/parking/sale/' + this.project_id, this.formStatus).then(response => {
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                    this.dialogFormStatusVisible = false
                })
            },
            openTag() {
                let temp = []
                $('input:checkbox:checked').each(function (index, item) {
                     temp.push($(this).val());
                 });
                 this.formTag.checkedParkings = temp
                 if (this.formTag.checkedParkings.length == 0) {
                     this.$message.error('请先选择车位')
                     return
                 }

                this.dialogFormTagVisible = true
            },

            formUpdateTagSubmit() {
                this.$message('提交中...')
                httpClient.post('admin/parking/sale/' + this.project_id, this.formTag).then(response => {
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                    this.dialogFormTagVisible = false
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
            
            
        },
        
        mounted() {
            
                // $(".parking-checked").on('click', function(){
                //     alert(1)
                // })
            
            // setTimeout(function(){
            //     $(".parking-checked").on('click', function(){
            //     alert(1)
            //     })
            // },2500)
        }
    }
    
</script>
<style lang="css" scoped>
    
    .parking-checked-group .el-checkbox-group1 label {
        display: inline-block; 
        margin: 0 25px 10px 0; 
        color: #878787
        }
    .f-r {float: right;}
    .check-box {margin-bottom: 10px;}
    .fp_rule input {height: 35px; width: 70px;}
</style>

