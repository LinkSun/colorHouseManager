<template>
    <div class="my-comtaint">
        <el-form ref="form" :model="form" label-width="145px">

            <el-form-item label="楼盘来源:">
                <el-select v-model="form.region" placeholder="请选择相册分类" class="my-input">
                    <el-option label="效果图" value="shanghai"></el-option>
                    <el-option label="沙盘" value="beijing"></el-option>
                    <el-option label="户型" value="beijing1"></el-option>
                    <el-option label="周边" value="beijing2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否需要签到:">
                <el-select v-model="form.region" placeholder="请选择相册分类" class="my-input">
                    <el-option label="效果图" value="shanghai"></el-option>
                    <el-option label="沙盘" value="beijing"></el-option>
                    <el-option label="户型" value="beijing1"></el-option>
                    <el-option label="周边" value="beijing2"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="项目id:">
                <el-input v-model="form.name" class="my-input"></el-input>&nbsp;

            </el-form-item>
            <el-form-item label="预约保护期:">
                <el-input v-model="form.name" class="my-input"></el-input>&nbsp;小时

            </el-form-item>
            <el-form-item label="签到保护期:">

                <el-input v-model="form.name" class="my-input"></el-input>&nbsp;天

            </el-form-item>

            <el-form-item label="是否属于饭票宝项目:">
                <el-radio v-model="form.radio" label="1">是</el-radio>
                <el-radio v-model="form.radio" label="2">否</el-radio>

            </el-form-item>
            <el-form-item label="尊享饭票项目id:">

                <el-input v-model="form.name" class="my-input"></el-input>&nbsp;

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
        }
    },
    mounted() {
        // 可以得到id
        console.log(this.$route.params.id)
    },
    methods: {
        onSubmit() {
            console.log('上传')
        },
        handleRemove(file, fileList) {
            console.log(file, fileList)
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url
            // this.dialogVisible = true
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


