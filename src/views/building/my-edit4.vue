<template>

    <div>
        <!-- 1 -->
        <h4 class="title">楼盘信息</h4>

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="销售状态:" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择活动区域" class="my-input">
                    <el-option label="在售" value="shanghai"></el-option>
                    <el-option label="已售" value="beijing"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="交房时间:" prop="name">
                <el-input v-model="ruleForm.name" class="my-input"></el-input>

            </el-form-item>
            <el-form-item label="楼盘地址:" prop="name">
                <el-input v-model="ruleForm.name" class="my-input"></el-input>

            </el-form-item>

      
            <!-- 2 -->
            <h4 class="title">销售信息</h4>

         
                <el-form-item label="参考单价:" prop="name">
                    <el-input v-model="ruleForm.name" class="my-input"></el-input>

                </el-form-item>
                <el-form-item label="楼盘总价:" prop="name">
                    <el-input v-model="ruleForm.name" class="my-input"></el-input>

                </el-form-item>
                <el-form-item label="在售户型:" prop="name">
                    <el-input v-model="ruleForm.name" class="my-input"></el-input>

                </el-form-item>
                <el-form-item label="售楼地址:" prop="name">
                    <el-input v-model="ruleForm.name" class="my-input"></el-input>

                </el-form-item>
                <!-- 3 -->
                <h4 class="title">建筑规划</h4>

               

                    <el-form-item label="建筑类型:" prop="name">
                        <el-input v-model="ruleForm.name" class="my-input"></el-input>

                    </el-form-item>
                    <el-form-item label="产权年限:" prop="name">
                        <el-input v-model="ruleForm.name" class="my-input"></el-input>

                    </el-form-item>
                    <el-form-item label="装修标准:" prop="name">
                        <el-input v-model="ruleForm.name" class="my-input"></el-input>

                    </el-form-item>
                    <el-form-item label="开发商:" prop="name">
                        <el-input v-model="ruleForm.name" class="my-input"></el-input>

                    </el-form-item>
                    <el-form-item label="容积率:" prop="name">
                        <el-input v-model="ruleForm.name" class="my-input"></el-input>

                    </el-form-item>
                    <el-form-item label="绿化率:" prop="name">
                        <el-input v-model="ruleForm.name" class="my-input"></el-input>

                    </el-form-item>
                    <el-form-item label="规划用户:" prop="name">
                        <el-input v-model="ruleForm.name" class="my-input"></el-input>

                    </el-form-item>
                    <el-form-item label="楼层状况:" prop="name">
                        <el-input v-model="ruleForm.name" class="my-input"></el-input>

                    </el-form-item>
                    <el-form-item label="占地面积:" prop="name">
                        <el-input v-model="ruleForm.name" class="my-input"></el-input>

                    </el-form-item>
                    <el-form-item label="建筑面积:" prop="name">
                        <el-input v-model="ruleForm.name" class="my-input"></el-input>

                    </el-form-item>
                    <el-form-item label="工程进度:" prop="name">
                        <el-input v-model="ruleForm.name" class="my-input"></el-input>

                    </el-form-item>
                    <!-- 4 -->

                    <h4 class="title">物业信息</h4>

                    

                        <el-form-item label="物业费:" prop="name">
                            <el-input v-model="ruleForm.name" class="my-input"></el-input>

                        </el-form-item>
                        <el-form-item label="车位数:" prop="name">
                            <el-input v-model="ruleForm.name" class="my-input"></el-input>

                        </el-form-item>
                        <el-form-item label="车位比:" prop="name">
                            <el-input v-model="ruleForm.name" class="my-input"></el-input>

                        </el-form-item>
                        <h4 class="title">预售许可证</h4>

                       

                            <el-form-item label="预售证号:" prop="name">
                                <el-input v-model="ruleForm.name" class="my-input"></el-input>

                            </el-form-item>
                            <el-form-item label="发证时间:" prop="name">
                                <el-input v-model="ruleForm.name" class="my-input"></el-input>

                            </el-form-item>
                            <el-form-item label="绑定楼栋:" prop="name">
                                <el-input v-model="ruleForm.name" class="my-input"></el-input>

                            </el-form-item>

                            <el-form-item>
                                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                                <el-button @click="resetForm('ruleForm')">重置</el-button>
                            </el-form-item>

                        </el-form>
    </div>

</template>

<script>
export default {
    data() {
        return {
            ruleForm: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: '',
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: '请输入内容',
                        trigger: 'blur',
                    },
                    {
                        min: 3,
                        max: 5,
                        message: '长度在 3 到 5 个字符',
                        trigger: 'blur',
                    },
                ],
                region: [
                    {
                        required: true,
                        message: '请选择活动区域',
                        trigger: 'change',
                    },
                ],
            },
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    alert('submit!')
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
        },
    },
}
</script>

<style>
.my-input {
    width: 200px;
}
.title {
    padding-left: 30px;
    margin-top: 30px;
}
</style>
