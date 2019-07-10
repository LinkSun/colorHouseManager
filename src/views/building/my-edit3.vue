<template>
    <div class="my-comtaint">
        <el-form ref="form" :model="form" label-width="130px">
            <el-form-item label="添加相册分类:">
                <el-input v-model="form.name" class="my-input"></el-input>&nbsp;
                <el-button type="primary" @click="addCategary">添加</el-button>
            </el-form-item>
            <el-form-item label="选择相册分类:">
                <el-select v-model="form.region" placeholder="请选择相册分类" class="my-input">
                    <el-option label="效果图" value="shanghai"></el-option>
                    <el-option label="沙盘" value="beijing"></el-option>
                    <el-option label="户型" value="beijing1"></el-option>
                    <el-option label="周边" value="beijing2"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="添加相册图片:">
<el-upload action="https://salesv2-ccw-test.colourlife.com/upload/image/650" name="photo" enctype="multipart/form-data" 

  method="post" list-type="picture-card" :on-preview="handlePictureCardPreview">


                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog>
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>

            <el-form-item label="选择相册分类:">
                <el-select v-model="form.region" placeholder="请选择活动区域" class="my-input">
                    <el-option label="效果图" value="shanghai"></el-option>
                    <el-option label="沙盘" value="beijing"></el-option>
                    <el-option label="户型" value="beijing1"></el-option>
                    <el-option label="周边" value="beijing2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="添加户型分类:">
                <el-input v-model="form.name" class="my-input"></el-input>&nbsp;
                <el-button type="primary">添加</el-button>
            </el-form-item>
            <el-form-item label="选择户型类型:">
                <el-select v-model="form.region" placeholder="请选择活动区域" class="my-input">
                    <el-option label="效果图" value="shanghai"></el-option>
                    <el-option label="沙盘" value="beijing"></el-option>
                    <el-option label="户型" value="beijing1"></el-option>
                    <el-option label="周边" value="beijing2"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="建筑面积:">
                <el-input v-model="form.area1" class="area"></el-input>&nbsp;㎡

            </el-form-item>
            <el-form-item label="是否添加标签:">
                <el-radio v-model="form.radio" label="1">是</el-radio>
                <el-radio v-model="form.radio" label="2">否</el-radio>
                <br>
                <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
                    {{tag}}
                </el-tag>
                <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>

            </el-form-item>
            <el-form-item label="添加户型图片:">
<el-upload action="https://salesv2-ccw-test.colourlife.com/upload/image/650" list-type="picture-card" :on-preview="handlePictureCardPreview">

                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog>
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item label="添加效果图图片:">
                <!-- <el-upload action="#" list-type="picture-card" :auto-upload="false"> -->
                <el-upload action="#" list-type="picture-card" >
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
        <!-- 上传图片1 -->

    </div>
</template>
<script>
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
                radio: 1,
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
    },
    methods: {
 myRequest(file){
console.log(file);


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
            this.api.addPhoto({
                //  params:{name:}
            })
        },
        handleRemove(file) {
            console.log(file)
        },
        handlePictureCardPreview(file) {
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


