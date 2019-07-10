
<template>
    <div class="app-container calendar-list-container" v-loading="listLoading" >
        <div>
                <span class="money">当前OA用户：{{ user_name }}</span>
        </div>
            <br>
        <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText" style="width:250px;">
        </el-input>
        <br><br>
        <el-tree
        :data="list"
        show-checkbox
        node-key="id"
        :default-expanded-keys="expandedKeys"
        :default-checked-keys="checkedKeys"
        :props="defaultProps"
        :filter-node-method="filterNode"
        ref="tree2">
        </el-tree>
        <br>
        <el-button type="primary" @click="submit">提交</el-button>
    </div>
</template>

<script>
    import httpClient from '@/utils/request'

    export default {
        name: 'userProjectDispatch',
        data() {
            return {
                listLoading: false,
                filterText: '',
                id: 0,
                list: [],
                expandedKeys: [],
                checkedKeys: [],
                user_name: '',
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            }
        },
        filters: {
            
        },
        watch: {
        filterText(val) {
            this.$refs.tree2.filter(val);
        }
        },
        created() {
            const params = this.$route.params
            this.id = parseInt(params.id)
            this.getList();
        },
        methods: {
            getList() {
                this.listLoading = true;
                httpClient.get('admin/project/dept/tree/' + this.id).then(response => {
                    const data = response.content
                    this.list = data.list
                    this.expandedKeys = data.checked_keys
                    this.checkedKeys = data.checked_keys
                    this.user_name = data.user_name
                    this.listLoading = false
                })
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            getCheckedKeys() {
                return this.$refs.tree2.getCheckedKeys(true);
            },
            submit() {
                this.$message('提交中...')
                let projects = this.getCheckedKeys()
                httpClient.post('admin/user/project/dispatch/' + this.id, {projects: projects}).then(response => {
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