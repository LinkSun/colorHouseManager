<template>
    <div class="app-container calendar-list-container">
        <el-table  
        :data="list" 
        v-loading="listLoading" 
        border  
        style="width: 100%;">
            <el-table-column align="center" label="报名人姓名">
                <template scope="scope">
                    <span>{{scope.row.name}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="报名人手机号">
                <template scope="scope">
                    <span>{{scope.row.phone}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="预计出行时间">
                <template scope="scope">
                    <span>{{scope.row.start_time}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="提交时间">
                <template scope="scope">
                    <span>{{scope.row.date}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="收货地址" width="300">
                <template scope="scope">
                    <span>{{scope.row.address}}</span>
                </template>
            </el-table-column>
            
            </el-table>

        <div v-show="!listLoading" class="pagination-container" style="margin-top:10px;text-align:right">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="query.page"
                           :page-sizes="[10,20,30,50]" :page-size="query.page_size" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import httpClient from '@/utils/request'

    export default {
        name: 'enterList',
        data() {
            return {
                list: [],
                total: 0,
                listLoading: true,
                query: {
                    page: 1,
                    page_size: 10,
                },
            }
        },
        created() {
            this.getList();
        },
        methods: {
            handleSizeChange(val) {
                this.query.page_size = val
                this.getList();
            },
            handleCurrentChange(val) {
                this.query.page = val
                this.getList()
            },
            getList() {
                this.listLoading = true;
                httpClient.get('admin/activity/enter', { params: this.query }).then(response => {
                    console.log("报名",response)
                    const data = response.content
                    this.list = data.list
                    this.total = data.total
                    this.listLoading = false
                })
            },
        }
    }
</script>

<style lang="css">

</style>