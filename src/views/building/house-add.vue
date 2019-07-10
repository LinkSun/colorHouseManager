<template>
    <div class="app-container calendar-list-container">
        <div style="margin: 20px;"></div>
        <el-form :model="form" v-loading="listLoading" :label-position="labelPosition" label-width="230px" style="width:60%;">
            
            <el-form-item label="楼盘名称" required>
                <el-input v-model="building.label" :disabled="true"></el-input>
            </el-form-item>

            <el-form-item label="户型名称" required>
                <el-input v-model="form.label"></el-input>
            </el-form-item>

            <el-form-item label="单位价格" required>
                <el-input v-model="form.unit_price"></el-input>
            </el-form-item>

            <el-form-item label="总面积" required>
                <el-input v-model="form.acreage"></el-input>
            </el-form-item>

            <el-form-item label="可用面积" required>
                <el-input v-model="form.use_area"></el-input>
            </el-form-item>

            <el-form-item label="销售状态" required>
                <el-select v-model="form.sale_status" placeholder="请选择销售状态">
                    <el-option v-for="(item, index) in houseSaleStatus" :key="index" :label="item" :value="parseInt(index)"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="启用/禁用">
                <el-select v-model="form.status" placeholder="请选状态">
                    <el-option v-for="(item, index) in houseStatus" :key="index" :label="item" :value="parseInt(index)"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="描述" >
                <el-input type="textarea" v-model="form.describe"></el-input>
            </el-form-item>

            <el-form-item label="户型图片" required>

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
        name: 'houseAdd',
        data() {
            return {
                uploadImgUrl: staticUrl + '/upload/image/650',
                labelPosition: 'right',
                disabled: false,
                listLoading: false,
                id: 0,
                building: '',
                houseSaleStatus: [],
                houseStatus: [],
                form: {
                    label: '',
                    unit_price:'',
                    acreage: '',
                    use_area: '',
                    describe: '',
                    sale_status: '',
                    status: 1,
                    images: [],
                },
                fileList: [],
                previewUrl: '',
                dialogVisible: false
            }
        },
        filters: {
            
        },
        created() {
            const params = this.$route.params
            this.id = parseInt(params.id)
            this.getList()
        },
        methods: { 
            getList() {
                this.listLoading = true
                httpClient.get('admin/building/house/' + this.id).then(response => {
                    const data = response.content
                    
                    this.houseSaleStatus = data.houseSaleStatus
                    this.houseStatus = data.houseStatus
                    this.building = data.building
                    
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
                
                httpClient.post('admin/building/house/' + this.id, this.form).then(response => {
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
