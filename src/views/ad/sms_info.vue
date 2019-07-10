<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container" style="width:50%">
               <el-form :ref="form" :model="form" v-loading="listLoading" label-width="120px">
                    <el-form-item label="描述" required>
                    <el-input v-model="form.des" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="消息类型" required>
                    <el-radio-group v-model="form.type">
                        <el-radio v-for="(value, key) in smsLogType" :key="key" :label="key">{{ value }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="开始发送时间" required>
                    <el-date-picker
                    v-model="form.start_at"
                    type="datetime"
                    placeholder="选择日期" value-format="timestamp">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="短信内容" required>
                    <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" v-model="form.content" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" required>
                    <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 14}" v-model="form.phone" autocomplete="off" placeholder="批量请用英文逗号分割"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="formUpdate">提交</el-button>
                </el-form-item>
            </el-form>
            
        </div>
    </div>
</template>

<script>
    import httpClient from '@/utils/request'

    export default {
        name: 'adSmsInfo',
        data() {
            return {
                id: 0,
                listLoading: true,
                form: {
                    des: '',
                    type: '',
                    start_at: '',
                    content: '',
                    phone: ''
                },
                smsLogType: [],
                tableKey: 0,
                
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
                httpClient.get('admin/sms/info/' + this.id).then(response => {
                    const data = response.content
                    this.form.des = data.task.des
                    this.form.type = data.task.type
                    this.form.start_at = data.task.start_at*1000
                    this.form.content = data.task.content
                    this.smsLogType = data.smsLogType
                    this.form.phone = data.phones.join(',')
                    this.listLoading = false
                })
            },
            formUpdate() {
                this.$message('提交中...')
                httpClient.post('admin/sms/update/' + this.id, this.form).then(response => {
                    
                    this.$message({ message: '操作成功', type: 'success' })
                    this.$router.go(-1)  
                })
            }
        }
    }
</script>

<style lang="css">
.fileinput {display: none;}
</style>