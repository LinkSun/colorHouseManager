<template>
    <div class="app-container calendar-list-container" v-loading="listLoading" >
        <div class="filter-container position">
            <div>
                <span class="money">当前角色：{{ role_name }}</span>
            </div>
            <br>
            <el-transfer v-model="value" filterable :data="data" class="transfer1"
            :titles="['所有权限', '已拥有权限']">
            </el-transfer>
            <br>
            <el-button type="primary" @click="formUpdateSubmit">提 交</el-button>
        </div>

    </div>
</template>

<script>
    import httpClient from '@/utils/request'

    export default {
        name: 'roleDispatch',
        data() {
            return {
                id: 0,
                role_name: '',
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
                httpClient.get('admin/role/dispatch/' + this.id).then(response => {
                    const data = response.content
                    this.role_name = data.roleName
                    this.data = data.allPermission
                    this.value = data.roleHasPermission
                    this.listLoading = false
                })
            },
            formUpdateSubmit() {
                this.$message('提交中...')
                httpClient.post('admin/role/dispatch/' + this.id, {value: this.value}).then(response => {
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
.transfer1 .el-transfer-panel {
    width:  250px;
}
</style>