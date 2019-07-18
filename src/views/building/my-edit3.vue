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

            <el-form-item label="添加相册图片:">

             
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
                    <el-input v-model="form.name" class="my-input"></el-input>&nbsp;
                    <el-button type="primary">添加</el-button>
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
                    <el-radio-group v-model="form.status">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="2">否</el-radio>

                    </el-radio-group>

                    <br>
                    <div>
                        <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
                            {{tag}}
                        </el-tag>
                        <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
                        </el-input>
                        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                    </div>

                </el-form-item>
                <el-form-item label="原生form测试:">
                    <form action="https://salesv2-ccw-test.colourlife.com/upload/image/5" method="post" enctype="multipart/form-data">
                        <input type="file" name="photo">
                        <button>提交</button>
                    </form>
                </el-form-item>
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
            inputValue: '', //客户选择的值
            isShow: false,
            categeryValue: [
                { name: '效果图' },
                { name: '沙盘' },
                { name: '户型' },
                { name: '周边' },
            ], //相册分类
            huxingValue: [
                { name: '三室一厅' },
                { name: '三室两厅' },
                { name: '二室两厅' },
                { name: '二室两厅' },
            ], //相册分类

            form: {
                name: '',
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
            dialogImageUrl: '',
            dialogVisible: false,
            dynamicTags: ['标签一', '标签二', '标签三'],
            inputVisible: false,
            inputValue: '',
            // 最后一个上传图片
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
        }
    },
    mounted() {
        // 可以得到id
        // console.log(this.$route.params.id)
        // 获取相册分类
        httpClient
            .get('admin/album/category', {})
            .then(res => {
                console.log(res)
                console.log(res.content)
                let arr1 = []
                arr1 = res.content.filter(v => {
                    if (v.pid != 0) {
                        return true
                    }
                })
                let arr2 = res.content.filter(v => {
                    if (v.pid == 0) {
                        return true
                    }
                })
                this.huxingValue = arr1

                this.categeryValue = arr2
            })
            .catch(err => {
                console.log(err)
            })
    },
    methods: {
        onChangeValue(e) {
            console.log(this.inputValue)
            if (this.inputValue == '户型') {
                console.log('显示')
                this.isShow = true
            } else {
                this.isShow = false
            }
        },

        myRequest(file) {
            console.log(file)
        },

        onSubmit() {
            console.log('上传')
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
            let inputValue = this.inputValue
            if (inputValue) {
                this.dynamicTags.push(inputValue)
            }
            this.inputVisible = false
            this.inputValue = ''
        },
        addCategary() {
            httpClient
                .post('admin/add/album/category', {
                    name: this.form.inputValue,
                })
                .then(res => {
                    console.log(res)
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


