<template>
    <div class="app-container calendar-list-container">
        <div style="margin: 20px;"></div>
        <el-form :model="form" v-loading="listLoading" :label-position="labelPosition" label-width="230px" style="width:80%;">
            <el-form-item label="选择项目" required>
                <el-select v-model="form.project_id" filterable placeholder="选择项目">
                        <el-option
                        v-for="item in project"
                            :key="item.project_id"
                            :label="item.project_name"
                            :value="item.project_id">
                        </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择任务类型" required>
                    <el-select v-model="form.task_type_id" placeholder="选择任务类型">
                        <el-option v-for="(value, key, index) in taskTypeMap" :key="index" :label="value" :value="parseInt(key)"></el-option>
                    </el-select>
            </el-form-item>

            <el-form-item label="任务名称" required>
                <el-input v-model="form.name"></el-input>
            </el-form-item>

            <el-form-item label="任务描述" required>
                <el-input type="textarea" v-model="form.des"></el-input>
            </el-form-item>

            <el-form-item label="执行人" required>
                <el-input v-model="form.oa_account" placeholder="OA账号"></el-input>
            </el-form-item>

            <el-form-item label="任务开始时间" required>
                <el-date-picker v-model="form.start_time" type="datetime" value-format="timestamp" placeholder="开始时间"></el-date-picker>
            </el-form-item>

            <el-form-item label="任务截止时间" required>
                <el-date-picker v-model="form.end_time" type="datetime" value-format="timestamp" placeholder="结束时间"></el-date-picker>
            </el-form-item>

            <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                </el-form-item>
        </el-form>
        
    </div>
</template>

<script>
    import httpClient from '@/utils/request'

    export default {
        name: 'taskAdd',
        data() {
            return {
                labelPosition: 'right',
                disabled: false,
                listLoading: true,
                id: 0,
                project: [],
                taskTypeMap: [],
                weeks:['周日','周一','周二','周三','周四','周五','周六'],
                month: [],
                form: {
                    project_id: '',
                    task_type_id: '',
                    name: '',
                    des: '',  
                    oa_account: '',
                    start_time: '',
                    end_time: '',
                },
                fileList: [],
                previewUrl: '',
                dialogVisible: false
            }
        },
        filters: {
            
        },
        created() {
            const params = this.$route.params;
            this.id = parseInt(params.id);
            this.getData()
        },
        methods: { 
            getData() {
                this.listLoading = true
                httpClient.get('admin/task/' + this.id).then(response => {
                    const data = response.content
                    
                    this.project = data.project
                    this.taskTypeMap = data.taskTypeMap
                    this.form.project_id = data.task.project_id
                    this.form.task_type_id = data.task.task_type_id
                    this.form.name = data.task.name
                    this.form.des = data.task.des
                    this.form.oa_account = data.task.identifier
                    this.form.start_time = data.task.start_time * 1000
                    this.form.end_time = data.task.end_time * 1000
                    this.listLoading = false
                })
            },
           
            onSubmit() {
                this.$message('提交中...')
                
                httpClient.post('admin/task/' + this.id, this.form).then(response => {
                    this.$message({
                        type: 'success',
                        message: '操作成功'
                    })
                    this.$router.go(-1)    
                })
            }
            
        }
    }
</script>

<style lang="css">
.many-option {margin: 10px 0;}
</style>
