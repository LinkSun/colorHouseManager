<template>
    <div class="my-comtaint">
        <el-form ref="form" :model="form" label-width="130px">

            <el-form-item label="添加相册分类:">
                <el-input v-model="form.inputValue" class="my-input"></el-input>&nbsp;

                <el-button type="primary" @click="addCategary">添加</el-button>
            </el-form-item>
            <el-form-item label="选择相册分类:">
                <el-select v-model="inputValue" placeholder="请选择相册分类" class="my-input" @change="onChangeValue">

                    <el-option v-for="(item, index) in categeryValue" :key="index" :label="item.name" :value="item.name"></el-option>

                </el-select>
            </el-form-item>

            <el-form-item label="添加相册图片:" v-show="isShow2">

                <el-upload action="https://salesv2-ccw-test.colourlife.com/upload/image/5" list-type="picture-card" :auto-upload="true" name="photo" :on-success="mySuccess">
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                        <span class="el-upload-list__item-actions">
                            <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                <i class="el-icon-zoom-in"></i>
                            </span>
                            <span v-if="!disabled" class="el-upload-list__item-delete">
                                <i class="el-icon-download"></i>
                            </span>
                            <span v-if="!disabled" class="el-upload-list__item-delete">
                                <i class="el-icon-delete"></i>
                            </span>
                        </span>
                    </div>
                </el-upload>
            </el-form-item>

            <!-- <el-form-item label="选择相册分类:">
                <el-select v-model="form.region" placeholder="请选择活动区域" class="my-input">
                    <el-option v-for="(item, index) in categeryValue" :key="index" :label="item.name" :value="item.name"></el-option>
                    
                </el-select>
            </el-form-item> -->
            <div v-show="isShow">
                <el-form-item label="添加户型分类:">
                    <el-input v-model="form.hxValue" class="my-input"></el-input>&nbsp;
                    <el-button type="primary" @click="addHuxing">添加</el-button>
                </el-form-item>
                <el-form-item label="选择户型类型:">
                    <!-- huxingValue -->

                    <el-select v-model="form.region2" placeholder="请选择活动区域" class="my-input">
                        <el-option v-for="(item, index) in huxingValue" :key="index" :label="item.name" :value="item.name"></el-option>

                    </el-select>
                </el-form-item>

                <el-form-item label="建筑面积:">
                    <el-input v-model="form.area1" class="area"></el-input>&nbsp;㎡

                </el-form-item>
                <!-- <el-form-item label="是否添加标签:">

                <el-radio-group v-model="form.status">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                   
                </el-radio-group>
            </el-form-item> -->

                <el-form-item label="是否添加标签:">

                    <!-- <el-radio v-model="form.radio" label="1">是</el-radio>
                <el-radio v-model="form.radio" label="2">否</el-radio> -->
                    <!-- <el-form-item label="开盘状态">
                    <el-radio-group v-model="form.status">
                        <el-radio :label="1">已开盘</el-radio>
                        <el-radio :label="2">未开盘</el-radio>
                        <el-radio :label="3">已售罄</el-radio>
                    </el-radio-group>
                </el-form-item> -->
<el-radio-group v-model="form.status" @change="danxuanChange">

                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="2">否</el-radio>

                    </el-radio-group>

                    <br>
                    <div v-show="biaoqianShow">
                        <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
                            {{tag}}
                        </el-tag>
                        <el-input class="input-new-tag" v-if="inputVisible" v-model="tagtValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
                        </el-input>
                        <el-button v-else class="button-new-tag" size="small" @click="showInput">+新标签</el-button>
                    </div>

                </el-form-item>
                <!-- <el-form-item label="原生form测试:">
          <form action="https://salesv2-ccw-test.colourlife.com/upload/image/5" method="post" enctype="multipart/form-data">
            <input type="file" name="photo">
            <button>提交</button>
          </form>
        </el-form-item> -->
                <el-form-item label="添加户型图片:">
                    <el-upload action="https://salesv2-ccw-test.colourlife.com/upload/image/5" list-type="picture-card" :auto-upload="true" name="photo" :on-success="mySuccess">
                        <i slot="default" class="el-icon-plus"></i>
                        <div slot="file" slot-scope="{file}">
                            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                            <span class="el-upload-list__item-actions">
                                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                    <i class="el-icon-zoom-in"></i>
                                </span>
                                <span v-if="!disabled" class="el-upload-list__item-delete">
                                    <i class="el-icon-download"></i>
                                </span>
                                <span v-if="!disabled" class="el-upload-list__item-delete">
                                    <i class="el-icon-delete"></i>
                                </span>
                            </span>
                        </div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="添加效果图图片:">
                    <el-upload action="https://salesv2-ccw-test.colourlife.com/upload/image/5" list-type="picture-card" :auto-upload="true" name="photo" :on-success="mySuccess">
                        <i slot="default" class="el-icon-plus"></i>
                        <div slot="file" slot-scope="{file}">
                            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                            <span class="el-upload-list__item-actions">
                                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                    <i class="el-icon-zoom-in"></i>
                                </span>
                                <span v-if="!disabled" class="el-upload-list__item-delete">
                                    <i class="el-icon-download"></i>
                                </span>
                                <span v-if="!disabled" class="el-upload-list__item-delete">
                                    <i class="el-icon-delete"></i>
                                </span>
                            </span>
                        </div>
                    </el-upload>
                </el-form-item>
            </div>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
            </el-form-item>

        </el-form>
        <!-- 上传图片1 -->

    </div>
</template>
<script>
import httpClient from '@/utils/request'

export default {
    data() {
        return {
 biaoqianShow:true,

            imagesValue: [],
            tagtValue: '',

            bid: 0,
            inputValue: '', //客户选择的值
            isShow2: true,
            isShow: false,
            // categeryValue: [{
            //     name: '效果图'
            //   },
            //   {
            //     name: '沙盘'
            //   },
            //   {
            //     name: '户型'
            //   },
            //   {
            //     name: '周边'
            //   },
            //
            categeryValue: [],

            //相册分类
            huxingValue: [
                {
                    name: '三室一厅',
                },
                {
                    name: '三室两厅',
                },
                {
                    name: '二室两厅',
                },
                {
                    name: '二室两厅',
                },
            ], //相册分类

            form: {
                name: '',
                hxValue: '',
status:'',

                money: null,
                categery: '',
                area1: null,
                area2: null,
                huxing: '',
                years: null,
                date1: '',
                desc1: '',
                desc2: '',
                inputValue: '',
                dynamicTags: ['公交直达', '地铁旁', '绿化率高'],
                radio: 1,
                region2: '',
            },
          
            dialogVisible: false,
            dynamicTags: ['公交直达'],
            inputVisible: false,
            inputValue: '',
            // 最后一个上传图片
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
        }
    },
    created() {
        const params=this.$route.params;
        this.bid=parseInt(params.id)
        console.log(this.bid)
    },
    mounted() {
        // 可以得到id
        // console.log(this.$route.params.id)
        // this.bid = this.$route.params.id

        this.getMount()
    },
    methods: {
 danxuanChange(){
     console.log("单选变化了");
 console.log(this.form.status);
 if(this.form.status==2){
this.biaoqianShow=false;
//标签内容去空
this.dynamicTags=[]


 }else{
this.biaoqianShow=true;
this.dynamicTags=['公交直达']

 }

     
     
 },

        getMount() {
            // 获取相册分类
            httpClient
                .get('admin/album/category')
                .then(res => {
                    // console.log(res)
                    // console.log(res.content)
                    let arr1 = []
                    arr1 = res.content.list.filter(v => {
                        if (v.pid != 0) {
                            return true
                        }
                    })
                    let arr2 = res.content.list.filter(v => {
                        if (v.pid == 0) {
                            return true
                        }
                    })
                    console.log(arr2)

                    this.huxingValue = arr1
                    this.categeryValue = arr2
                })
                .catch(err => {
                    console.log(err)
                })
        },
        //添加户型
        addHuxing() {
            //  admin/add/album/category
            httpClient
                .post('admin/add/album/category', {
                    pid: 3,
                    name: this.form.hxValue,
                })
                .then(res => {
                    console.log(res);
                    //重新调用获取
                    this.getMount();
                    if (res.code === 0) {
                        this.$message({ message: res.message, type: 'success' })
                    } else {
                        this.$message({
                            message: res.message,
                            type: 'warning',
                        })
                    }
                    this.form.hxValue = '';
                })
                .catch(err => {
                    console.log(err)
                })
        },
        onChangeValue(e) {
            console.log(this.inputValue)
            if (this.inputValue == '户型') {
                console.log('显示')
                this.isShow = true
                this.isShow2 = false
            } else {
                this.isShow = false
                this.isShow2 = true
            }
        },

        myRequest(file) {
            console.log(file)
        },

        onSubmit() {
            console.log('上传')
            // 获得id
            let cidArr = this.categeryValue.filter(v => {
                if (v.name == this.inputValue) {
                    return true
                }
            })
            let cid = cidArr[0].id
            console.log(cid)
            //保存请求
            httpClient
                .post('admin/add/image', {
                    bid: this.bid,
                    cid: cid,
                    // 数据记得要写活
                    images: this.imagesValue,

                    area: this.form.area1,
                    tags: this.dynamicTags,
                })
                .then(res => {
                    console.log(res)
                    if (res.code === 0) {
                        this.$message({ message: res.message, type: 'success' })
                        // 清除数据
                         this.imagesValue=[];

                     this.form.area1='';
                     this.dynamicTags=['公交直达'];
                    } else {
                        this.$message({
                            message: res.message,
                            type: 'warning',
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },

        handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
        },
        showInput() {
            this.inputVisible = true
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus()
            })
        },
        handleInputConfirm() {
            let tagtValue = this.tagtValue
            if (tagtValue) {
                this.dynamicTags.push(tagtValue)
            }
            this.inputVisible = false
            this.tagtValue = ''
        },
        addCategary() {
            httpClient
                .post('admin/add/album/category', {
                    name: this.form.inputValue,
                })
                .then(res => {
                    console.log(res)
                    this.getMount()

                    if (res.code === 0) {
                        this.$message({ message: res.message, type: 'success' })
                    } else {
                        this.$message({
                            message: res.message,
                            type: 'warning',
                        })
                    }
                    this.form.inputValue = ''
                })
                .catch(err => {
                    console.log(err)
                })
        },
        handleRemove(file) {
            console.log(file)
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url
            this.dialogVisible = true
        },

        mySuccess(res) {
            console.log('进到这里,已上传')

            console.log(res)
            this.imagesValue.push(res.content.photoPath)
        },
    },
}
</script>
<style>
.my-input {
    width: 300px;
}

.my-input1 {
    width: 400px;
}

.area {
    width: 120px;
}

.my-comtaint {
    position: relative;
}

.my-right {
    position: absolute;
    top: 0;
    left: 450px;
}

.el-tag + .el-tag {
    margin-left: 10px;
}

.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}

.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
</style>
