<template>
    <!-- 这个页面交互已经完成 -->
    <div>
        <!-- 1 -->
        <!-- <h4 class="title">楼盘信息</h4> -->

        <!-- <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"> 去除了验证-->
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <!-- <el-form-item label="销售状态:(没)" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择活动区域" class="my-input">

                    <el-option label="在售" value="shanghai"></el-option>
                    <el-option label="已售" value="beijing"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="交房时间:(没)" prop="name">

                <el-input v-model="ruleForm.name" class="my-input"></el-input>

            </el-form-item>
            <el-form-item label="楼盘地址:(没)" prop="name">

                <el-input v-model="ruleForm.name" class="my-input"></el-input>

            </el-form-item> -->

            <!-- 2 -->
            <h4 class="title">销售信息</h4>

            <el-form-item label="参考单价:" prop="name">
                <el-input v-model="ruleForm.reference_price" class="my-input"></el-input>

            </el-form-item>
            <el-form-item label="楼盘总价:" prop="name">
                <el-input v-model="ruleForm.total_price" class="my-input"></el-input>

            </el-form-item>
            <el-form-item label="在售户型:" prop="name">
                <el-input v-model="ruleForm.house_type" class="my-input"></el-input>

            </el-form-item>
            <el-form-item label="售楼地址:" prop="name">
                <el-input v-model="ruleForm.sales_office" class="my-input"></el-input>

            </el-form-item>
            <!-- 3 -->
            <h4 class="title">建筑规划</h4>

            <el-form-item label="建筑类型:" prop="name">
                <el-input v-model="ruleForm.building_type" class="my-input"></el-input>

            </el-form-item>
            <!-- <el-form-item label="产权年限:(没)" prop="name">
                <el-input v-model="ruleForm.name" class="my-input"></el-input>

            </el-form-item> -->
            <el-form-item label="装修标准:" prop="name">
                <el-input v-model="ruleForm.renovation" class="my-input"></el-input>

            </el-form-item>
            <el-form-item label="开发商:" prop="name">
                <el-input v-model="ruleForm.developer" class="my-input"></el-input>

            </el-form-item>
            <el-form-item label="容积率:" prop="name">
                <el-input v-model="ruleForm.far" class="my-input"></el-input>

            </el-form-item>
            <el-form-item label="绿化率:" prop="name">
                <el-input v-model="ruleForm.greening" class="my-input"></el-input>

            </el-form-item>
            <el-form-item label="规划用户:" prop="name">
                <el-input v-model="ruleForm.planning_user" class="my-input"></el-input>

            </el-form-item>
            <el-form-item label="楼层状况:" prop="name">
                <el-input v-model="ruleForm.floor_condition" class="my-input"></el-input>

            </el-form-item>
            <el-form-item label="占地面积:" prop="name">
                <el-input v-model="ruleForm.cover_area" class="my-input"></el-input>

            </el-form-item>
            <el-form-item label="建筑面积:" prop="name">
                <el-input v-model="ruleForm.floor_space" class="my-input"></el-input>

            </el-form-item>
            <el-form-item label="工程进度:" prop="name">
                <el-input v-model="ruleForm.progress" class="my-input"></el-input>

            </el-form-item>
            <!-- 4 -->

            <h4 class="title">物业信息</h4>

            <el-form-item label="物业费:" prop="name">
                <el-input v-model="ruleForm.management_fee" class="my-input"></el-input>

            </el-form-item>
            <el-form-item label="车位数:" prop="name">
                <el-input v-model="ruleForm.cars_num" class="my-input"></el-input>

            </el-form-item>
            <el-form-item label="车位比:" prop="name">
                <el-input v-model="ruleForm.cars_rate" class="my-input"></el-input>

            </el-form-item>
            <h4 class="title">预售许可证</h4>

            <el-form-item label="预售证号:" prop="name">
                <el-input v-model="ruleForm.preselling_license" class="my-input"></el-input>

            </el-form-item>
            <el-form-item label="发证时间:" prop="name">
                <el-input v-model="ruleForm.issuing_time" class="my-input"></el-input>

            </el-form-item>
            <el-form-item label="绑定楼栋:" prop="name">
                <el-input v-model="ruleForm.binding" class="my-input"></el-input>

            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
            </el-form-item>

        </el-form>
    </div>

</template>

<script>
import httpClient from '@/utils/request'

export default {
    data() {
        return {
            bid: '',
            ruleForm: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: '',
                //增加的数据
                reference_price: '',
                total_price: '',
                house_type: '',
                sales_office: '',
                building_type: '',
                renovation: '',
                developer: '',
                far: '',
                greening: '',
                planning_user: '',
                floor_condition: '',
                cover_area: '',
                floor_space: '',
                progress: '',
                management_fee: '',
                cars_num: '',
                cars_rate: '',
                preselling_license: '',
                issuing_time: '',
                binding: '',
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
    mounted() {
        this.bid = this.$route.params.id;
 this.getMounte();

    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    // console.log(this.ruleForm)
                    // alert('submit!')
                    // 进到这里是提交
                    this.addCategary()
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
        },
        getMounte() {
            httpClient
                .get(`admin/specification?bid=${this.bid}`)
                .then(res => {
                    console.log(res)

                    this.ruleForm.reference_price = res.content.reference_price
                    this.ruleForm.total_price = res.content.total_price
                    this.ruleForm.house_type = res.content.house_type
                    this.ruleForm.sales_office = res.content.sales_office
                    this.ruleForm.building_type = res.content.building_type
                    this.ruleForm.renovation = res.content.renovation
                    this.ruleForm.developer = res.content.developer
                    this.ruleForm.far = res.content.far
                    this.ruleForm.greening = res.content.greening
                    this.ruleForm.planning_user = res.content.planning_user
                    this.ruleForm.floor_condition = res.content.floor_condition
                    this.ruleForm.cover_area = res.content.cover_area
                    this.ruleForm.floor_space = res.content.floor_space
                    this.ruleForm.progress = res.content.progress
                    this.ruleForm.management_fee = res.content.management_fee
                    this.ruleForm.cars_num = res.content.cars_num
                    this.ruleForm.cars_rate = res.content.cars_rate
                    this.ruleForm.preselling_license = res.content.preselling_license
                    this.ruleForm.issuing_time = res.content.issuing_time
                    this.ruleForm.binding = res.content.binding
                })
                .catch(err => {
                    console.log(err)
                })
        },

        //调用后台接口

        addCategary() {
            httpClient
                .post('admin/add/specification', {
                    bid: this.bid,
                    reference_price: this.ruleForm.reference_price,
                    total_price: this.ruleForm.total_price,
                    house_type: this.ruleForm.house_type,
                    sales_office: this.ruleForm.sales_office,
                    building_type: this.ruleForm.building_type,
                    renovation: this.ruleForm.renovation,
                    developer: this.ruleForm.developer,
                    far: this.ruleForm.far,
                    greening: this.ruleForm.greening,
                    planning_user: this.ruleForm.planning_user,
                    floor_condition: this.ruleForm.floor_condition,
                    cover_area: this.ruleForm.cover_area,
                    floor_space: this.ruleForm.floor_space,
                    progress: this.ruleForm.progress,
                    management_fee: this.ruleForm.management_fee,
                    cars_num: this.ruleForm.cars_num,
                    cars_rate: this.ruleForm.cars_rate,
                    preselling_license: this.ruleForm.preselling_license,
                    issuing_time: this.ruleForm.issuing_time,
                    binding: this.ruleForm.binding,
                })
                .then(res => {
                    console.log(res)
                    if (res.code === 0) {
                        this.$message({
                            message: res.message,
                            type: 'success',
                        })
                    } else {
                        this.$message({ message: res.message, type: 'warning' })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
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
