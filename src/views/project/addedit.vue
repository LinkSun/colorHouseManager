<template>
    <div class="app-container calendar-list-container">
        <div style="margin: 20px;"></div>
        <el-form ref="form" :model="form" :rules="rules" v-loading="listLoading" :label-position="labelPosition" label-width="260px" style="width:60%;">
            <el-form-item label="项目名称">
                <el-input v-model="project.project_name" disabled></el-input>
            </el-form-item>
            <el-form-item label="所属大区">
                <el-input v-model="project.region_name" disabled></el-input>
            </el-form-item>
            <el-form-item label="所属事业部">
                <el-input v-model="project.dept_name" disabled></el-input>
            </el-form-item>
            <el-form-item label="省份">
                <el-input v-model="project.province" disabled></el-input>
            </el-form-item>
            <el-form-item label="城市">
                <el-input v-model="project.city" disabled></el-input>
            </el-form-item>
            <el-form-item label="项目负责人">
                <el-select v-model="form.project_user_id" clearable filterable placeholder="请选择项目标负责人">
                    <el-option v-for="item in project_users" :key="item.user_id" :label="item.user_name + ' ' + item.phone" :value="item.user_id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="表面均价">
                <el-input v-model="form.product_number"></el-input>
            </el-form-item>
            <el-form-item label="表面返还饭票数">
                <el-input v-model="form.sold_number"></el-input>
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
            <el-form-item label="尊享饭票项目id">
                <el-input v-model="form.fp_project_id "></el-input>
            </el-form-item>
            <el-form-item label="尊享饭票模板id">
                <el-input v-model="form.fp_template_id"></el-input>
            </el-form-item>
            <el-form-item label="项目标签">
                <el-select v-model="form.project_tag" placeholder="请选择项目标签">
                    <el-option v-for="(item, index) in project_tag" :key="item.id" :label="item" :value="parseInt(index)"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="业务类型">
                <el-select v-model="form.project_type" placeholder="请选择业务类型">
                    <el-option v-for="(item, index) in project_type" :key="item.id" :label="item" :value="parseInt(index)"></el-option>
                </el-select>
            </el-form-item>
            
            <el-form-item label="车位图片">
                <el-upload
                        name="photo"
                        class="upload-demo"
                        :action="uploadImgUrl"
                        :on-preview="handleParkingPreview"
                        :on-remove="handleParkingRemove"
                        :on-success="handlerParkingSuccess"
                        :multiple=true
                        list-type="picture"
                        :file-list="parking_list">
                    <el-button size="small" type="primary">上传图片</el-button>
                    <div slot="tip" class="el-upload__tip">支持单个或批量上传</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="车位地图">
                <el-upload
                        name="photo"
                        class="upload-demo"
                        :action="uploadImgUrl"
                        :on-preview="handleParkingMapPreview"
                        :on-remove="handleParkingMapRemove"
                        :on-success="handlerParkingMapSuccess"
                        :multiple=true
                        list-type="picture"
                        :file-list="parking_map_list">
                    <el-button size="small" type="primary">上传图片</el-button>
                    <div slot="tip" class="el-upload__tip">支持单个或批量上传</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="项目图片">
                <el-upload
                        name="photo"
                        class="upload-demo"
                        :action="uploadImgUrl"
                        :on-preview="handleProjectPreview"
                        :on-remove="handleProjectRemove"
                        :on-success="handlerProjectSuccess"
                        :multiple=true
                        list-type="picture"
                        :file-list="project_list">
                    <el-button size="small" type="primary">上传图片</el-button>
                    <div slot="tip" class="el-upload__tip">支持单个或批量上传</div>
                </el-upload>
            </el-form-item>
            <!-- <el-form-item label="合同及相关资料">
                <el-upload
                        name="photo"
                        class="upload-demo"
                        :action="uploadImgUrl"
                        :on-preview="handleContractPreview"
                        :on-remove="handleContractRemove"
                        :on-success="handlerContractSuccess"
                        :multiple=true
                        list-type="picture"
                        :file-list="contract_list">
                    <el-button size="small" type="primary">上传图片</el-button>
                    <div slot="tip" class="el-upload__tip">支持单个或批量上传</div>
                </el-upload>
            </el-form-item> -->
            <el-form-item label=""> 
                <el-button type="primary" @click="submitForm()">提交</el-button>
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
        name: 'projectEdit',
        data() {
            return {
                uploadImgUrl: staticUrl + '/upload/image/650',
                labelPosition: 'right',
                id: '',
                project: '',
                parking_space: [],
                project_picture: [],
                contract: [],
                listLoading: true,
                project_type: [],
                project_tag: [],
                project_users: [],
                form: {
                    product_number: '',
                    sold_number: '',
                    project_type: '',
                    project_tag: '',
                    fp_rule: [],
                    parking_space: [],
                    parking_map: [],
                    project_picture: [],
                    project_user_id: '',
                    fp_project_id :"",
                    fp_template_id:""
                    
                },
                dialogVisible: false,
                previewUrl: '',
                staticUrl: staticUrl,
                tableKey: 0,
                rules: {
                    product_number: [
                        { required: true, message: '表面均价不能为空'},
                        { type: 'number', message: '表面均价必须为数字值'}
                    ],
                    sold_number: [
                        { required: true, message: '表面返还饭票数不能为空'},
                        { type: 'number', message: '表面返还饭票数必须为数字值'}
                    ]
                },
                parking_list: [],
                parking_map_list: [],
                project_list: [],
                contract_list: []
            }
        },
        filters: {
            
        },
        created() {
            const params = this.$route.params;
            this.id = parseInt(params.id);
            this.getData();
        },
        methods: { 
            getData() {
                this.listLoading = true;
                httpClient.get('admin/project/' + this.id, { params: this.query }).then(response => {
                    const data = response.content;
                    this.project = data.project;
                    this.project_type = data.project_type
                    this.project_tag = data.project_tag
                    this.form.sold_number = this.project.sold_number == null ? 0 : parseInt(this.project.sold_number)
                    this.form.product_number = this.project.product_number == null ? 0 : parseInt(this.project.product_number)
                    this.form.project_tag = parseInt(this.project.project_tag == '' ? 0 : this.project.project_tag)
                    this.form.project_type = this.project.project_type
                    this.form.fp_rule = this.project.fp_rule
                    this.form.fp_project_id  = this.project.fp_project_id 
                    this.form.fp_template_id = this.project.fp_template_id
                    if (this.project.fp_rule.length == 0) {
                        this.form.fp_rule.push({"day":'', "amount":''})
                    }

                    this.form.parking_space = this.dealFormPhoto(this.project.parking_space != null ? this.project.parking_space.split(',') : [])
                    this.form.parking_map = this.dealFormPhoto(this.project.parking_map != null ? this.project.parking_map.split(',') : [])
                    this.form.project_picture = this.dealFormPhoto(this.project.project_picture != null ? this.project.project_picture.split(',') : [])
                    //this.form.contract = this.dealFormPhoto(this.project.contract != null ? this.project.contract.split(',') : [])
                    this.project_users = data.project_users
                    if (data.project_user != null) {
                        this.form.project_user_id = data.project_user.user_id
                    }
                    
                    this.parking_list = this.showPhoto(this.project.parking_space != null ? this.project.parking_space.split(',') : [])
                    this.parking_map_list = this.showPhoto(this.project.parking_map != null ? this.project.parking_map.split(',') : [])
                    this.project_list = this.showPhoto(this.project.project_picture != null ? this.project.project_picture.split(',') : [])
                    this.contract_list = this.showPhoto(this.project.contract != null ? this.project.contract.split(',') : [])
                    this.listLoading = false;
                })
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
            previewPhoto(url) {
                this.previewUrl = url
                this.dialogVisible = true
            },
            
            submitForm(form) {
                this.$message('提交中...');
                if (this.form.fp_rule.length == 0) {
                        this.form.fp_rule.push({"day":'', "amount":''})
                    }
                httpClient.post('admin/project/edit/' + this.id, this.form).then(response => {
                    this.$message({ message: '操作成功', type: 'success' });
                    this.$router.go(-1)    
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

            // 上传图片控件 - 车位
            handleParkingRemove(file, fileList) {
                this.form.parking_space = [];
                for (const i in fileList) {
                    if (fileList[i].hasOwnProperty('response')) {
                        this.form.parking_space.push(fileList[i].response.content.photoPath)
                    } else {
                        const path = fileList[i].url;
                        const imgPath = this.splitOssUrl(path)
                        this.form.parking_space.push(imgPath)
                    }
                }
            },
            handleParkingPreview(file) {
                this.previewPhoto(file.url)
            },
            handlerParkingSuccess(response, fileList) {
                let data = response.content
                this.form.parking_space.push(data.photoPath)
            },

            // 上传图片控件 - 车位地图
            handleParkingMapRemove(file, fileList) {
                this.form.parking_map = [];
                for (const i in fileList) {
                    if (fileList[i].hasOwnProperty('response')) {
                        this.form.parking_map.push(fileList[i].response.content.photoPath)
                    } else {
                        const path = fileList[i].url;
                        const imgPath = this.splitOssUrl(path)
                        this.form.parking_map.push(imgPath)
                    }
                }
            },
            handleParkingMapPreview(file) {
                this.previewPhoto(file.url)
            },
            handlerParkingMapSuccess(response, fileList) {
                let data = response.content
                this.form.parking_map.push(data.photoPath)
            },

            // 上传图片控件 - 项目
            handleProjectRemove(file, fileList) {
                this.form.project_picture = [];
                for (const i in fileList) {
                    if (fileList[i].hasOwnProperty('response')) {
                        this.form.project_picture.push(fileList[i].response.content.photoPath)
                    } else {
                        const path = fileList[i].url;
                        const imgPath = this.splitOssUrl(path)
                        this.form.project_picture.push(imgPath)
                    }
                }
            },
            handleProjectPreview(file) {
                this.previewPhoto(file.url)
            },
            handlerProjectSuccess(response, fileList) {
                let data = response.content
                this.form.project_picture.push(data.photoPath)
            },

            // 上传图片控件 - 合同
            handleContractRemove(file, fileList) {
                this.form.contract = [];
                for (const i in fileList) {
                    if (fileList[i].hasOwnProperty('response')) {
                        this.form.contract.push(fileList[i].response.content.photoPath)
                    } else {
                        const path = fileList[i].url;
                        const imgPath = this.splitOssUrl(path)
                        this.form.contract.push(imgPath)
                    }
                }
            },
            handleContractPreview(file) {
                this.previewPhoto(file.url)
            },
            handlerContractSuccess(response, fileList) {
                let data = response.content
                this.form.contract.push(data.photoPath)
            }

        
        }
    }
</script>

<style lang="css" scoped>
    .img-responsive {
        width: 100%;
        height: auto;
    }
    .fp_rule input {height: 35px; width: 70px;}
</style>
