<template>
    <div class="my-containt">
        <router-link :to="{name: 'my-router1-1',params:{id:id}}">

            <el-button size="small" type="primary" class="btn">1.项目操作</el-button>
        </router-link>

        <router-link :to="{name: 'my-router1-2',params:{id:id}}">

            <el-button size="small" type="primary" class="btn">2.购房荐房福利</el-button>
        </router-link>
        <router-link :to="{name: 'my-router1-3',params:{id:id} }">

            <el-button size="small" type="primary" class="btn">3.项目相册</el-button>
        </router-link>
        <router-link :to="{name: 'my-router1-4',params:{id:id}}">

            <el-button size="small" type="primary" class="btn">4.项目详情</el-button>
        </router-link>
        <router-link :to="{name: 'my-router1-5',params:{id:id}}">

            <el-button size="small" type="primary" class="btn">5.对接设置</el-button>
        </router-link>
        <hr>
        <router-view/>

    </div>
</template>
<script>
export default {
    data() {
        return {
            id: 0,
        }
    },
    mounted() {
        this.id = this.$route.params.id
        // console.log(this.$route.params.id)
    },
}
</script>
<style>
.my-containt .btn{
background-color: #97a8be !important;


}
.my-containt .router-link-exact-active  .btn {

 background-color: #66b1ff !important;


}



</style>

