<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">

            <el-form :inline="true" :model="query" class="demo-form-inline">
                <el-form-item label="">
                    <el-input v-model="query.label" clearable placeholder="楼盘名称"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-select v-model="query.status" clearable placeholder="开盘状态">
                        <el-option v-for="(value, key) in buildingStatus" :key="key" :label="value" :value="key"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-select v-model="query.enabled" clearable placeholder="启用状态">
                        <el-option v-for="(value, key) in buildingEnabled" :key="key" :label="value" :value="key"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-select v-model="query.audit_status" clearable placeholder="审核状态">
                        <el-option v-for="(value, key) in buildingAuditStatus" :key="key" :label="value" :value="key"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <router-link :to="{path: '/building/add'}">
                        <el-button type="primary">添加楼盘</el-button>
                    </router-link>
                </el-form-item>
            </el-form>

        </div>
        <el-table :key='tableKey' :data="list" v-loading="listLoading" border fit highlight-current-row style="width: 100%;" @selection-change="handleSelectionChange">

            <!-- <el-table-column type="selection" width="40">

            </el-table-column> -->

            <el-table-column align="center" label="排序" width="80">
                <template scope="scope">
                    <span>{{scope.row.sort}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="楼盘名称" width="150">
                <template scope="scope">
                    <span>{{scope.row.label}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="建筑标签" width="150">
                <template scope="scope">
                    <span>{{scope.row.tag}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="产权(年)" width="150">
                <template scope="scope">
                    <span>{{scope.row.term_for_use}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="返还内容" width="150">
                <template scope="scope">
                    <span>{{scope.row.f_ticket}}</span>
                </template>
            </el-table-column>

            <!-- <el-table-column align="center" label="地址" width="190">
                <template scope="scope">
                    <span>{{scope.row.address}}</span>
                </template>
            </el-table-column> -->

            <el-table-column align="center" label="开盘状态" width="150">
                <template scope="scope">
                    <span>{{ buildingStatus[scope.row.status] || '' }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="启用/禁用" width="150">
                <template scope="scope">
                    <span :style="scope.row.enabled | formatColor">{{ buildingEnabled[scope.row.enabled] || '' }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="审核状态" width="150">
                <template scope="scope">
                    <span>{{ buildingAuditStatus[scope.row.audit_status] || '' }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="流程" width="150">
                <template scope="scope">
                    <span v-if="scope.row.need_sign==0">不签到流程</span>
                    <span v-if="scope.row.need_sign==1">签到流程</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="过期时间" width="150">
                <template scope="scope">
                    <span>{{ buildingDeadline[scope.row.deadline] || '' }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="饭票宝" width="150">
                <template scope="scope">
                    <span>{{ ticket[scope.row.ticket] || '' }}</span>
                </template>
            </el-table-column>

            <el-table-column fixed="right" align="center" width="600" label="操作">
                <template scope="scope">
                    <!-- <router-link :to="{path: '/building/edit/' + scope.row.id}"> -->
                    <router-link :to="{name: 'my-router1', params: {


 id: scope.row.id

          }}">

                        <el-button size="small" type="primary">项目操作</el-button>
                    </router-link>

                    <router-link :to="{path: '/building/detail/' + scope.row.id}">
                        <el-button size="small" type="primary">详情&审核</el-button>
                    </router-link>
                    <router-link :to="{path: '/building/edit/' + scope.row.id}">
                        <el-button size="small" type="primary">编辑</el-button>
                    </router-link>
                    <router-link :to="{path: '/building/booking/' + scope.row.id}">
                        <el-button size="small" type="primary">预约记录</el-button>
                    </router-link>
                    <router-link :to="{path: '/building/recommend/' + scope.row.id}">
                        <el-button size="small" type="primary">推荐记录</el-button>
                    </router-link>
                    <router-link :to="{path: '/building/house/' + scope.row.id}">
                        <el-button size="small" type="primary">户型管理</el-button>
                    </router-link>
                    <el-button size="small" type="danger" @click="confirmDelete(scope.row.id)">
                        {{ scope.row.enabled == 0 ? '启用' : '禁用' }}
                    </el-button>

                </template>
            </el-table-column>

        </el-table>

        <div v-show="!listLoading" class="pagination-container" style="margin-top:10px;text-align:right">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="query.page" :page-sizes="[10,20,30,50]" :page-size="query.page_size" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

    </div>
</template>

<script>
import httpClient from '@/utils/request'

export default {
    name: 'buildingList',
    data() {
        return {
            list: [],
            total: 0,
            listLoading: true,
            buildingEnabled: [],
            buildingStatus: [],
            buildingAuditStatus: [],
            Process: [],
            buildingDeadline: [],
            ticket: [],
            query: {
                page: 1,
                page_size: 10,
                label: '',
                status: '',
                enabled: '',
                audit_status: '',
                process: '',
                deadline: '',
                ticket: '',
            },

            tableKey: 0,
        }
    },
    filters: {
        formateMoney(param) {
            return parseFloat(param)
        },
        formatColor(param) {
            let primary = 'color:#409EFF;'
            let info = 'color:#909399;'
            let success = 'color:#67C23A;'
            let warning = 'color:#E6A23C;'
            let danger = 'color:#F56C6C;'

            if (param == 0) {
                return danger
            }
            return info
        },
    },
    created() {
        this.getList()
    },
    methods: {
        handleSizeChange(val) {
            this.query.page_size = val
            this.getList()
        },
        handleCurrentChange(val) {
            this.query.page = val
            this.getList()
        },
        getList() {
            this.listLoading = true
            httpClient
                .get('admin/building', { params: this.query })
                .then(response => {
                    const data = response.content
                    this.list = data.list
                    this.total = data.total
                    this.buildingEnabled = data.buildingEnabled
                    this.buildingStatus = data.buildingStatus
                    this.buildingAuditStatus = data.buildingAuditStatus
                    this.Process = data.Process
                    this.buildingDeadline = data.buildingDeadline
                    this.ticket = data.ticket
                    this.listLoading = false
                })
        },
        onSearch(column) {
            this.getList()
        },
        confirmDelete(id) {
            this.$confirm('确认要进行该操作吗？')
                .then(_ => {
                    httpClient
                        .post('admin/building/delete/' + id)
                        .then(response => {
                            this.getList()
                        })
                })
                .catch(_ => {})
        },

        handleSelectionChange(val) {
            this.multipleSelection = val
        },
    },
}
</script>

<style lang="css">
.fileinput {
    display: none;
}
</style>