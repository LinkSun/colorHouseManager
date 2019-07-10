
<template>
    <div class="app-container calendar-list-container" v-loading="listLoading" >
        <div class="filter-container position">
            <div>
                <span class="money">当前OA用户：{{ user_name }}</span>
            </div>
            <br>
            <el-transfer v-model="value" :data="data" 
            :titles="['所有角色', '已拥有角色']">
            </el-transfer>
            <br>
            <el-button type="primary" @click="formUpdateSubmit">提 交</el-button>
        </div>

    </div>
</template>

<script>
    import httpClient from '@/utils/request'

    export default {
        name: 'userRoleDispatch',
        data() {
            return {
                id: 0,
                user_name: '',
                listLoading: false,
                data: [],
                value: []
            }
        },
        filters: {
            
        },
        created() {
            const params = this.$route.params
            this.id = parseInt(params.id)
            this.getList();
        },
        methods: {
            getList() {
                this.listLoading = true;
                httpClient.get('admin/user/roles/dispatch/' + this.id).then(response => {
                    const data = response.content
                    this.user_name = data.userName
                    this.data = data.allRole
                    this.value = data.userHasRole
                    this.listLoading = false
                })
            },
            formUpdateSubmit() {
                this.$message('提交中...')
                httpClient.post('admin/user/roles/dispatch/' + this.id, {value: this.value}).then(response => {
                    this.dialogFormUpdateVisible = false
                    this.$router.go(-1)
                    this.$message({
                        type: 'success',
                        message: '操作成功'
                    })
                })
            }
            
        }
    }
</script>

<style lang="css">
.money {margin-right: 20px; color: #909399;}

</style>