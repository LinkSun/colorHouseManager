<template>
    <div>
        <h2 class="title">购房福利</h2>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="标签:">
                买返
                <el-input v-model="form.f_ticket" class="area"></el-input>饭票

            </el-form-item>
            <el-form-item label="描述:">
                <el-input type="textarea" v-model="form.f_ticket_describe" rows="10" cols="20" class="my-input1"></el-input>
            </el-form-item>

        </el-form>
        <h2 class="title">荐房福利</h2>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="标签:">
                荐返
                <el-input v-model="form.rebate" class="area"></el-input>饭票

            </el-form-item>
            <el-form-item label="赠送1:">
                <!-- <el-select v-model="form.region" placeholder="请选择活动区域" class="my-input3">

                    <el-option label="预约成功" value="shanghai"></el-option>
                    <el-option label="预约失败" value="beijing"></el-option>

                </el-select> -->
                签到成功可得
                <el-input v-model="form.purchase_return" class="my-input"></el-input>饭票

                <!-- <el-button type="danger">删除</el-button> -->
                <!-- <br> -->
                <!-- <el-button type="primary" class="add">添加</el-button> -->

            </el-form-item>
            <el-form-item label="增送2:">
                <!-- <el-select v-model="form.region" placeholder="请选择活动区域" class="my-input3">

                    <el-option label="预约成功" value="shanghai"></el-option>
                    <el-option label="预约失败" value="beijing"></el-option>

                </el-select> -->
                <!-- 预约成功可得
                <el-input v-model="form.name" class="my-input"></el-input>饭票  -->
                推荐成功可得
                <el-input v-model="form.sign_return" class="my-input"></el-input>饭票

                <!-- <el-button type="danger">删除</el-button> -->
                <!-- <br> -->
                <!-- <el-button type="primary" class="add">添加</el-button> -->

            </el-form-item>
            <el-form-item label="描述:">
                <el-input type="textarea" v-model="form.rebate_describe" rows="10" cols="20" class="my-input1"></el-input>
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
                bid: '',
                f_ticket: '',
                rebate: '',
                purchase_return: '',
                f_ticket_describe: '',
                rebate_describe: '',
                sign_return: '',
            },
        }
    },
    mounted() {
        // 可以得到id;
        this.form.bid = this.$route.params.id;
     
        if(this.form.bid==undefined){
            this.form.bid=window.sessionStorage.getItem('bid')
        }
        this.getMount();
    },
    methods: {
        getMount() {
            // 加载页面 // admin/reward/detail
            httpClient
                .get(`admin/reward/detail?bid=${this.form.bid}`)
                .then(res => {
                    console.log(res)
                    this.form.bid = res.content.bid
                    this.form.f_ticket = res.content.f_ticket
                    this.form.rebate = res.content.rebate
                    this.form.purchase_return = res.content.purchase_return
                    this.form.f_ticket_describe = res.content.f_ticket_describe
                    this.form.rebate_describe = res.content.rebate_describe
                    this.form.sign_return = res.content.sign_return
                })
                .catch(err => {
                    console.log(err)
                })
        },
        onSubmit() {
            console.log(11)

            httpClient
                .post('admin/add/reward', {
                    bid: this.form.bid,
                    f_ticket: this.form.f_ticket,
                    rebate: this.form.rebate,
                    purchase_return: this.form.purchase_return,
                    f_ticket_describe: this.form.f_ticket_describe,
                    rebate_describe: this.form.rebate_describe,
                    sign_return : this.form.sign_return


                    
                })
                .then(res => {
                    console.log(res)
                    //重新调用获取

                    if (res.code === 0) {
                        this.$message({ message: res.message, type: 'success' })
                    } else {
                        this.$message({
                            message: res.message,
                            type: 'warning',
                        })
                    }
                    this.form.hxValue = ''
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
    width: 60px;
}
.my-input1 {
    width: 320px;
}

.title {
    padding-left: 30px;
    margin-top: 30px;
}
.add {
    margin-top: 20px;
}
.area {
    width: 60px;
}
</style>
