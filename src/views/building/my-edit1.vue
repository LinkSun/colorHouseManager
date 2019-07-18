<template>
    <div class="my-comtaint">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="楼盘名称:">
                <el-input v-model="form.name" class="my-input"></el-input>
            </el-form-item>

            <el-form-item label="标签:">
                <el-tag :key="tag" v-for="tag in form.dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
                    {{tag}}
                </el-tag>
                <el-input class="input-new-tag" v-if="inputVisible" v-model="form.inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">+</el-button>
            </el-form-item>

            <el-form-item label="参考均价:">
                <el-input v-model="form.money" class="my-input"></el-input>&nbsp;元/m2

            </el-form-item>

            <el-form-item label="建筑类型:">
                <el-input v-model="form.categery" class="my-input"></el-input>
            </el-form-item>

            <el-form-item label="建面:">
                <el-input v-model="form.area1" class="area"></el-input> ~
                <el-input v-model="form.area2" class="area"></el-input>&nbsp;m2

            </el-form-item>

            <el-form-item label="开盘状态:" >
                <el-radio-group v-model="form.status">
                    <el-radio :label="1">已开盘</el-radio>
                    <el-radio :label="2">未开盘</el-radio>
                    <el-radio :label="3">已售罄</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="开盘:">
                <el-col :span="11" class="my-input">

                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>

                </el-col>

            </el-form-item>

            <el-form-item label="户型:">
                <el-input v-model="form.huxing" class="my-input"></el-input>
            </el-form-item>
            <el-form-item label="产权:">
                <el-input v-model="form.years" class="my-input"></el-input>
            </el-form-item>

            <el-form-item label="详细地址:">
                <el-input type="textarea" v-model="form.desc1" rows="3" cols="10" class="my-input1"></el-input>
            </el-form-item>
            <el-form-item label="项目介绍:">
                <el-input type="textarea" v-model="form.desc2" rows="10" cols="20" class="my-input1"></el-input>
            </el-form-item>

            <el-form-item class="my-right">
                <div>楼盘列表图片：</div>

                <el-upload action="#" list-type="picture-card" :auto-upload="false" :file-list="fileList">

                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                        <span class="el-upload-list__item-actions">
                            <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                <i class="el-icon-zoom-in"></i>
                            </span>
                            <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                                <i class="el-icon-download"></i>
                            </span>
                            <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                                <i class="el-icon-delete"></i>
                            </span>
                        </span>
                    </div>
                </el-upload>

            </el-form-item>
            <el-form-item class="my-right2">
                <div>楼盘首页图片：</div>

                <el-upload action="#" list-type="picture-card" :auto-upload="false" :file-list="fileList">

                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                        <span class="el-upload-list__item-actions">
                            <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                <i class="el-icon-zoom-in"></i>
                            </span>
                            <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                                <i class="el-icon-download"></i>
                            </span>
                            <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                                <i class="el-icon-delete"></i>
                            </span>
                        </span>
                    </div>
                </el-upload>

            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
            </el-form-item>

        </el-form>

    </div>
</template>
<script>
import httpClient from '@/utils/request'

export default {
    data() {
        return {
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
                status: '',
            },
            //自动上传
            fileList: [],

            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,

            inputVisible: false,
        }
    },
    mounted() {
        // 可以得到id
        console.log(this.$route.params.id)
    },
    methods: {
        onSubmit() {
            console.log(this.form)
            // 同时调用上传文件方法
            console.log(this.$refs.upload)
        },
        handleClose(tag) {
            this.form.dynamicTags.splice(this.form.dynamicTags.indexOf(tag), 1)
        },
        showInput() {
            this.inputVisible = true
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus()
            })
        },
        handleInputConfirm() {
            let inputValue = this.form.inputValue

            if (inputValue) {
                this.form.dynamicTags.push(inputValue)
            }
            this.inputVisible = false
            this.inputValue = ''
        },
        handleRemove(file) {
            console.log(file)
        },
        handlePictureCardPreview(file) {
            console.log(file)

            this.dialogImageUrl = file.url
            this.dialogVisible = true
        },
        handleDownload(file) {
            console.log(file)
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
    width: 60px;
}
.my-comtaint {
    position: relative;
}

.my-right {
    position: absolute;
    top: 0;
    left: 450px;
}
.my-right2 {
    position: absolute;
    top: 314px;
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

