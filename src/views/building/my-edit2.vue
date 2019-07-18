<template>
    <div>
        <h2 class="title">购房福利</h2>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="标签:">
                买返
                <el-input v-model="form.name" class="area"></el-input>饭票

            </el-form-item>
            <el-form-item label="描述:">
                <el-input type="textarea" v-model="form.desc1" rows="10" cols="20" class="my-input1"></el-input>
            </el-form-item>

        </el-form>
        <h2 class="title">荐房福利</h2>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="标签:">
                买返
                <el-input v-model="form.name" class="area"></el-input>饭票

            </el-form-item>
            <el-form-item label="描述1:">
                <el-select v-model="form.region" placeholder="请选择活动区域" class="my-input3">

                    <el-option label="预约成功" value="shanghai"></el-option>
                    <el-option label="预约失败" value="beijing"></el-option>

                </el-select>
                买得
                <el-input v-model="form.name" class="my-input"></el-input>饭票
                <el-button type="danger">删除</el-button>
                <br>
                <el-button type="primary" class="add">添加</el-button>

            </el-form-item>
            <el-form-item label="描述2:">
                <el-input type="textarea" v-model="form.desc2" rows="10" cols="20" class="my-input1"></el-input>
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
                desc1: '返成交价格的1% （参考可返21600.00饭票）不包括税金',
                desc2: '推荐客户成交可得成交价的1%（不包括税金）',
            },
        }
    },
    mounted() {
        // 可以得到id
        console.log(this.$route.params.id)
    },
}
</script>
<style>
.my-input {
    width: 80px;
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
