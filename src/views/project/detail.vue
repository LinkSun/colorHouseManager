<template>
    <div class="app-container calendar-list-container">
        <div style="margin: 20px;"></div>
        <el-form v-loading="listLoading" :label-position="labelPosition" label-width="230px">
            <el-form-item label="项目名称">
                <span>{{ project.project_name }}</span>
                <!-- <el-input v-model="project.project_name"></el-input> -->
            </el-form-item>
            <el-form-item label="所属大区">
                <span>{{ project.region_name }}</span>
            </el-form-item>
            <el-form-item label="所属事业部">
                <span>{{ project.dept_name }}</span>
            </el-form-item>
            <el-form-item label="省份">
                <span>{{ project.province }}</span>
            </el-form-item>
            <el-form-item label="城市">
                <span>{{ project.city }}</span>
            </el-form-item>
            <el-form-item label="项目负责人">
                <span>{{ project_user.user_name +' '+ project_user.phone}}</span>
            </el-form-item>
            <el-form-item label="表面均价">
                <span>{{ project.product_number }}</span>
            </el-form-item>
            <el-form-item label="表面返还饭票数">
                <span>{{ project.sold_number }}</span>
            </el-form-item>
            <el-form-item label="饭票返还计划配置">
                <p v-for="item in project.fp_rule" :key="item.id">
                    支付完成后 <span>{{ item.day }}</span> 天内&nbsp;&nbsp;&nbsp;
                    返还 <span>{{ item.amount }}</span> 饭票
                </p>   
            </el-form-item>
            <el-form-item label="收购总额">
                <span>{{ purchase_total }}</span>
            </el-form-item>
            <el-form-item label="项目标签">
                <span>{{ project_tag[project.project_tag] || '' }}</span>
            </el-form-item>
            <el-form-item label="业务类型">
                <span>{{ project_type[project.project_type] || '' }}</span>
            </el-form-item>
            <el-form-item label="车位总数量">
                <span>{{ parking_total }}</span>
            </el-form-item>
            <el-form-item label="真实可售车位数量">
                <span>{{ parking_init_total }}</span>
            </el-form-item>
            <el-form-item label="真实已售车位数量">
                <span>{{ parking_sold_total }}</span>
            </el-form-item>
            <el-form-item label="车位图片">
                <p v-for="item in parking_space" :key="item.id">
                    <img :src="item" alt="" class="img-responsive">
                </p>
            </el-form-item>
            <el-form-item label="车位地图">
                <p v-for="item in parking_map" :key="item.id">
                    <img :src="item" alt="" class="img-responsive">
                </p>
            </el-form-item>
            <el-form-item label="项目图片">
                <p v-for="item in project_picture" :key="item.id">
                    <img :src="item" alt="" class="img-responsive">
                </p>
            </el-form-item>
            <!-- <el-form-item label="合同及相关资料">
                <p v-for="item in contract" :key="item.id">
                    <img :src="item" alt="" class="img-responsive">
                </p>
            </el-form-item> -->
            <el-form-item label="">
                <router-link :to="{path: '/project/parking/list/' + id}">
                    <el-button type="primary">车位详情</el-button>
                </router-link>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import httpClient from '@/utils/request'
    import { staticUrl } from '@/utils/env'

    export default {
        name: 'projectDetail',
        data() {
            return {
                labelPosition: 'right',
                id: '',
                project: '',
                parking_total: 0,
                parking_init_total: 0,
                parking_sold_total: 0,
                purchase_total: 0,
                parking_space: [],
                parking_map: [],
                project_picture: [],
                contract: [],
                listLoading: true,
                project_type: [],
                project_tag: [],
                project_user: {
                    user_name: '',
                    phone: '',
                },
                query: {
                },
                staticUrl: staticUrl,
                tableKey: 0
            }
        },
        filters: {
            
        },
        created() {
            const params = this.$route.params;
            this.id = parseInt(params.id);
            this.getData();
        },
        methods: { 
            getData() {
                this.listLoading = true;
                httpClient.get('admin/project/' + this.id, { params: this.query }).then(response => {
                    const data = response.content;
                    this.project = data.project;
                    this.project.sold_number = this.project.sold_number == null ? 0 : parseInt(this.project.sold_number)
                    this.project.product_number = this.project.product_number == null ? 0 : parseInt(this.project.product_number)
                    this.project.project_tag = parseInt(this.project.project_tag == '' ? 0 : this.project.project_tag)
                    this.parking_total = data.parking_total
                    this.parking_init_total = data.parking_init_total
                    this.parking_sold_total = data.parking_sold_total
                    this.purchase_total = data.purchase_total
                    this.parking_space = this.project.parking_space != null ? this.project.parking_space.split(',') : []
                    this.parking_map = this.project.parking_map != null ? this.project.parking_map.split(',') : []
                    this.project_picture = this.project.project_picture != null ? this.project.project_picture.split(',') : []
                    this.contract = this.project.contract != null ? this.project.contract.split(',') : []
                    this.project_type = data.project_type
                    this.project_tag = data.project_tag
                    if (data.project_user != null) {
                        this.project_user = data.project_user
                    }
                    
                    this.listLoading = false;
                })
            },
            handleFilter() {
                this.getData();
            }
        }
    }
</script>

<style lang="css" scoped>
    .img-responsive {
        width: 500px;
        height: auto;
    }
</style>
