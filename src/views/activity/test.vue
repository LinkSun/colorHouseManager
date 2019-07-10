<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            
               <br>
            
        </div>
        <br>
        <br>

        <!-- 异步上传图片例子 -->
        <div>
            <el-button type="primary" size="small" icon="el-icon-upload2" @click="importBtn">上传</el-button>
            <input class="fileinput" size="small" name="file" value="" type="file" @change="importStart" id="import-order" />
            <br><br>
            <img :src="imgSrc" alt="">
        </div>

        
       
    </div>
</template>

<script>
    import httpClient from '@/utils/request'
    import axios from 'axios'
    

    export default {
        
        name: 'test',
        data() {
            return {
                query : '',
                fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
                imgPath: '', // 传给后台
                imgSrc: ''   // 前端显示
            }
        },
        filters: {
            
        },
        created() {
            // this.getList();
        },
        methods: {
           
            // getList() {
            //     this.listLoading = true
            //     httpClient.get('admin/activity/no-reason', { params: this.query }).then(response => {
            //         const data = response.content
            //         this.list = data.list
            //         this.total = data.total
            //         this.checkStatus = data.checkStatus
            //         this.listLoading = false
            //     })
            // },

            importBtn() {
                document.getElementById('import-order').click()
            },

            importStart(e) {
                    this.$message('上传中...')
                    
                    // let file = e.target.files[0]
                    // let param = new FormData() //创建form对象
                    // param.append('photo', file) //通过append向form对象添加数据
                    // document.getElementById('import-order').value = ''

                    // // 上传url, 测试加上域名 https://salesv2-ccw-test.colourlife.com
                    // // 参数600：控制上传后图片宽度 
                    // let url = 'http://salesv2-ccw-local.colourlife.com/upload/image/600'

                    // axios.post(url, param).then(response=>{
                    //     let res = response.data
                    //     if(res.code === 0) {
                    //         this.imgSrc = res.content.ossPath
                    //         this.imgPath = res.content.photoPath
                    //     } else {
                    //         this.$message(res.message)
                    //     }
                    // }).catch(err => {
                    //     console.log(err)
                    // });

                    // 参数600：控制上传后图片宽度 
                    let url = 'http://salesv2-ccw-local.colourlife.com/upload/image/600'

                    let file = e.target.files[0]
                    sharp(file)
                    .resize({ width: 600 })
                    .toBuffer()
                    .then(data => {
                        axios.post(url, {'photo': data}).then(response=>{
                            let res = response.data
                            if(res.code === 0) {
                                this.imgSrc = res.content.ossPath
                                this.imgPath = res.content.photoPath
                            } else {
                                this.$message(res.message)
                            }
                        }).catch(err => {
                            console.log(err)
                        });
                    });
                    
            },

            
            
        }
    }
</script>

<style lang="css">
.fileinput {display: none;}

</style>