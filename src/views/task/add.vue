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
                        <el-option v-for="(value, key, index) in taskTypeMap" :key="index" :label="value" :value="key"></el-option>
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
                <el-date-picker v-model="form.start_time" type="date" placeholder="开始时间"></el-date-picker>
            </el-form-item>

            <el-form-item label="任务截止时间" required>
                <el-date-picker v-model="form.end_time" type="date" placeholder="结束时间"></el-date-picker>
            </el-form-item>

            <el-form-item label="任务频次" required>
                <el-radio-group v-model="form.once_many">
                    <el-radio label="1">单次</el-radio>
                    <el-radio label="2">多次</el-radio>
                </el-radio-group>
                <div v-show="form.once_many == 2">
                    <div class="many-option">
                        <el-radio-group v-model="form.day_week_month">
                            <el-radio-button label="1">日</el-radio-button>
                            <el-radio-button label="2">周</el-radio-button>
                            <el-radio-button label="3">月</el-radio-button>
                        </el-radio-group>
                    </div>
                    <div v-show="form.day_week_month == 2">
                        <el-radio-group v-model="form.week">
                            <el-radio v-for="(value,index) in weeks" :key="index" :label="index">{{value}}</el-radio>
                        </el-radio-group>
                    </div>
                    <div v-show="form.day_week_month == 3">
                        <el-select v-model="form.month">
                            <el-option v-for="(value, index) in month" :key="index" :label="value" :value="index+1"></el-option>
                        </el-select>
                    </div>
                </div>
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
                    once_many: '1', // 频次
                    day_week_month: '1', // 日||周||月
                    week: 1,
                    month: 1
                },
                fileList: [],
                previewUrl: '',
                dialogVisible: false
            }
        },
        filters: {
            
        },
        created() {
            
            this.getData()
        },
        methods: { 
            getData() {
                this.listLoading = true
                httpClient.get('admin/task/option').then(response => {
                    const data = response.content
                    
                    this.project = data.project
                    this.taskTypeMap = data.taskTypeMap
                    
                    // 生成月份
                    for (let index = 0; index < 30; index++) {
                       this.month.push((index+1) + '号')
                    }
                    this.listLoading = false
                })
            },
           
            onSubmit() {
                this.$message('提交中...')
                
                httpClient.post('admin/task', this.form).then(response => {
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
