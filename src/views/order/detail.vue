<template>
    <div class="app-container calendar-list-container">
        <div style="margin: 20px;"></div>
        <el-form :model="form" v-loading="listLoading" :label-position="labelPosition" label-width="230px" style="width:60%;">
            <div>订单信息: </div>
            <el-form-item label="订单编号">
                <el-input v-model="order.order_no" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="订单状态">
                <el-select v-model="order.order_status" placeholder="选择订单状态" :disabled="true">
                    <el-option v-for="(item, index) in orderStatus" :key="item.id" :label="item" :value="parseInt(index)"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="订单时间">
                <el-input v-model="order.create_time" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="销售员oa">
                <el-input v-model="order.saleman_account" :disabled="true"></el-input>
            </el-form-item>
        
            <div>车位信息: </div>
            <el-form-item label="车位编号">
                <el-input v-model="order.parking_no" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="所属项目">
                <el-input v-model="order.project_name" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="车位uuid">
                <el-input v-model="order.parking_uuid" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="车位类型">
                <el-select v-model="order.parking_type" placeholder="请选择车位类型" :disabled="true">
                    <el-option v-for="(item, index) in parkingType" :key="item.id" :label="item" :value="parseInt(index)"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="车位位置">
                <el-input v-model="order.parking_position" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="车位面积(㎡)">
                <el-input v-model="order.parking_area" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="产权">
                <el-input v-model="order.propery_right" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="收购价格">
                <el-input v-model="order.parking_purchase_price" :disabled="true"></el-input>
            </el-form-item>
            
            <div>客户信息: </div>
            <el-form-item label="姓名">
                <el-input v-model="order.customer_name" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="手机号码">
                <el-input v-model="order.customer_phone" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="身份证号码">
                <el-input v-model="order.customer_card" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="房间号">
                <el-input v-model="order.room_no" :disabled="true"></el-input>
            </el-form-item>

            <div>购买信息: </div>
            <el-form-item label="购买方式">
                <el-select v-model="order.purchase_method" placeholder="请选择购买方式" :disabled="true">
                    <el-option v-for="(item, index) in purchaseMethod" :key="item.id" :label="item" :value="parseInt(index)"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="定金/定价">
                <el-input v-model="order.deposit" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="尾款">
                <el-input v-model="order.tail_price" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="购买总价">
                <el-input v-model="order.purchase_price" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="推荐人">
                <el-input v-model="order.recommend_name" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="推荐人电话">
                <el-input v-model="order.recommend_phone" :disabled="true"></el-input>
            </el-form-item>
            <div>支付信息: </div>
            <el-form-item label="支付账单号">
                <el-input v-model="orderPayment.payment_no" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="账单金额">
                <el-input v-model="orderPayment.payment_amount" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="账单类型">
                <el-select v-model="orderPayment.payment_type" placeholder="选择账单类型" :disabled="true">
                    <el-option v-for="(item, index) in paymentType" :key="item.id" :label="item" :value="parseInt(index)"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="账单状态">
                <el-select v-model="order.order_status" placeholder="选择账单状态" :disabled="true">
                    <el-option v-for="(item, index) in orderStatus" :key="item.id" :label="item" :value="parseInt(index)"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="账单支付时间">
                <el-input v-model="orderPayment.payment_time" :disabled="true"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import httpClient from '@/utils/request'

    export default {
        name: 'parkingDetail',
        data() {
            return {
                labelPosition: 'right',
                disabled: true,
                listLoading: true,
                order: '',
                orderPayment: {
                    payment_no: '',
                    payment_amount: '',
                    payment_type: '',
                    order_status: '',
                    payment_time: ''
                },
                orderStatus: [],
                payType: [],
                parkingSaleStatus: [],
                parkingPurchaseType: [],
                parkingPurchaseMethod: [],
                parkingType: [],
                paymentType: [],
                purchaseMethod: [],
                parkingVisible: [],
                certificateTransact: [],
                marketingControl: [],
                form: {
                    parking_no: '',
                    parking_uuid: '',
                    parking_type: '',
                    parking_position: '',
                    purchase_type: '',
                    parking_area: 0,
                    purchase_price: 0,
                    property_right: '',
                    parking_contract: '',
                    face_sale_status: 0,
                    real_sale_status: 0,
                    purchase_method: '',
                    sale_price: 0,
                    total_ticket: 0,
                    deposit: 0,
                    visible: '',
                    certificate_transact: 0,
                    marketing_control: 0,
                    customer_name: '',
                    customer_phone: '',
                    customer_card: '',
                    room_no: ''

                },
                parking_contract: [],
            }
        },
        filters: {
            
        },
        created() {
            const params = this.$route.params;
            this.parking_id = parseInt(params.id);
            this.getData();
        },
        methods: { 
            getData() {
                this.listLoading = true;
                httpClient.get('admin/order/detail/' + this.parking_id).then(response => {
                    const data = response.content;
                    this.order = data.order
                    if (data.orderPayment != null) {
                         this.orderPayment = data.orderPayment
                    }
                   
                    this.orderStatus = data.orderStatus
                    this.payType = data.payType
                    this.purchaseMethod = data.purchaseMethod
                    this.parkingType = data.parkingType
                    this.paymentType = data.paymentType
                    this.listLoading = false;
                })
            },
            makeFormData() {
                for (const key in this.form) {
                    this.form[key] = this.parking[key]
                }
            }
            
        }
    }
</script>

<style lang="css" scoped>
    
</style>
