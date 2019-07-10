<template>
    <div class="app-container calendar-list-container">
        <div style="margin: 20px;"></div>
        <el-form :model="form" v-loading="listLoading" :label-position="labelPosition" label-width="230px" style="width:60%;">
            <el-form-item label="首页展示" required>
                <el-radio-group v-model="form.home_display">
                    <el-radio v-for="(item, index) of homeDisplay" :key="index" :label="parseInt(index)">{{ item }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="楼盘选择" required>
                <el-radio-group v-model="form.type">
                    <el-radio v-for="(item, index) of buildingType" :key="index" :label="parseInt(index)">{{ item }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="建筑类型" required>
                <el-select v-model="form.build_type" placeholder="请选择建筑类型">
                    <el-option v-for="(item, index) in buildingUseType" :key="index" :label="item" :value="parseInt(index)"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="楼盘名称" required>
                <el-input v-model="form.label"></el-input>
            </el-form-item>

            <el-form-item label="单位价格" required>
                <el-input v-model="form.unit_price"></el-input>
            </el-form-item>

            <el-form-item label="价格单位" required>
                <el-radio-group v-model="form.unit_type">
                    <el-radio v-for="(item, index) of buildingPriceType" :key="index" :label="parseInt(index)">{{ item }}</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="销售员姓名" >
                <el-input v-model="form.salesperson"></el-input>
            </el-form-item>

            <el-form-item label="电话" required>
                <el-input v-model="form.hotline"></el-input>
            </el-form-item>

            <el-form-item label="楼盘图片" required>

                <el-upload
                        name="photo"
                        class="upload-demo"
                        :action="uploadImgUrl"
                        :on-preview="handleContractPreview"
                        :on-remove="handleContractRemove"
                        :on-success="handlerContractSuccess"
                        :multiple=true
                        list-type="picture"
                        :file-list="fileList">
                    <el-button size="small" type="primary">上传图片</el-button>
                    <div slot="tip" class="el-upload__tip">支持单个或批量上传</div>
                </el-upload>
            
            </el-form-item>

            <el-form-item label="省市区" required>
                <el-cascader
                    size="large"
                    :options="options"
                    v-model="form.region_id"
                    @change="handleChange">
                </el-cascader>
            </el-form-item>

            <el-form-item label="地址" required>
                <el-input v-model="form.address"></el-input>
            </el-form-item>

            <el-form-item label="概述" required>
                <el-input type="textarea" v-model="form.describe"></el-input>
            </el-form-item>

            <el-form-item label="交通" required>
                <el-input type="textarea" v-model="form.transit"></el-input>
            </el-form-item>

            <el-form-item label="开盘状态" required>
                <el-radio-group v-model="form.status">
                    <el-radio v-for="(item, index) of buildingStatus" :key="index" :label="parseInt(index)">{{ item }}</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="交楼时间">
                <el-date-picker
                v-model="form.delivery_time"
                type="date"
                placeholder="选择日期" value-format="timestamp">
                </el-date-picker>
            </el-form-item>

            <el-form-item label="开盘时间" required>
                <el-date-picker
                v-model="form.opening_time"
                type="date"
                placeholder="选择日期" value-format="timestamp">
                </el-date-picker>
            </el-form-item>

            <el-form-item label="产权(年限)">
                <el-input v-model="form.term_for_use"></el-input>
            </el-form-item>

            <el-form-item label="推荐赚钱(元)">
                <el-input v-model="form.rebate"></el-input>
            </el-form-item>

            <el-form-item label="返还内容" required>
                <el-input v-model="form.f_ticket"></el-input>
            </el-form-item>

            <el-form-item label="楼盘标签" required>
                <el-input v-model="form.tag"></el-input>
            </el-form-item>

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
    import { regionDataPlus, CodeToText } from 'element-china-area-data'

    export default {
        name: 'buildingAdd',
        data() {
            return {
                uploadImgUrl: staticUrl + '/upload/image/650',
                labelPosition: 'right',
                disabled: false,
                listLoading: false,
                id: 0,
                building: '',
                buildingUseType: [],
                homeDisplay:[],
                buildingType: [],
                buildingPriceType: [],
                buildingStatus: [],
                options: regionDataPlus,
                form: {
                    home_display: '',
                    type:'',
                    build_type: '',
                    label: '',
                    unit_price: '',
                    unit_type: '',
                    salesperson: '',
                    hotline:'',
                    images: [],
                    address: '',
                    describe: '',
                    transit: '',
                    status: '',
                    delivery_time: '',
                    opening_time: '',
                    term_for_use: '',
                    rebate:'',
                    f_ticket: '',
                    region_id: [],
                    region_names: [],
                    tag: ''
                },
                fileList: [],
                previewUrl: '',
                dialogVisible: false
            }
        },
        filters: {
            
        },
        created() {
        
            this.getData()
        },
        methods: { 
            getData() {
                this.listLoading = true
                httpClient.get('admin/building/0').then(response => {
                    const data = response.content
                    
                    this.buildingUseType = data.buildingUseType
                    this.homeDisplay = data.homeDisplay
                    this.buildingType = data.buildingType
                    this.buildingPriceType = data.buildingPriceType
                    this.buildingStatus = data.buildingStatus
                    
                    this.listLoading = false
                })
            },
            makeFormData() {
                for (const key in this.form) {
                    this.form[key] = this.building[key]
                }
            },
            dealFormPhoto(arr) {
                if (arr.length == 0) {
                    return []
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
                    return []
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
                this.$message('提交中...')
                // 处理 region_names
                let arr = []
                for (const i in this.form.region_id) {
                    if (this.form.region_id[i] == '') {
                        arr.push('');
                    } else {
                        arr.push(CodeToText[this.form.region_id[i]] || '')
                    }
                }
                this.form.region_names = arr
                httpClient.post('admin/building', this.form).then(response => {
                    this.$message({
                        type: 'success',
                        message: '操作成功'
                    })
                    this.$router.go(-1)    
                })
            },
            // 省市区
            handleChange (value) {
                console.log(value)
                // console.log(CodeToText[value[0]])
            },

            // 上传图片控件 - 合同
            previewPhoto(url) {
                this.previewUrl = url
                this.dialogVisible = true
            },

            handleContractRemove(file, fileList) {
                this.form.images = []
                for (const i in fileList) {
                    if (fileList[i].hasOwnProperty('response')) {
                        this.form.images.push(fileList[i].response.content.photoPath)
                    } else {
                        const path = fileList[i].url
                        const imgPath = this.splitOssUrl(path)
                        this.form.images.push(imgPath)
                    }
                }

            },
            handleContractPreview(file) {
                this.previewPhoto(file.url)
            },
            handlerContractSuccess(response, fileList) {
                let data = response.content
                this.form.images.push(data.photoPath)
            }
            
        }
    }
</script>

<style lang="css">
    .img-responsive {
        width: 350px;
        height: auto;
    }
</style>
