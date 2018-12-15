<template>

    <el-upload
            class="avatar-uploader"
            :action="action"
            :show-file-list="false"
            :on-progress="filepre"
            :on-success="success"
            :before-upload="beforeAvatarUpload"
            :data="{access_token:this.$store.state.main.token}"
    >
        <img v-if="vvv" :src="vvv" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        <el-progress  style="position: absolute;left: 0px;top: 0px;background: #ffffff" :width="100" v-if="show" type="circle" :percentage="progress"></el-progress>
        <el-button v-if="vvv" style="width: 100%" @click.stop="reset" icon="el-icon-delete" type="text">删除</el-button>
    </el-upload>

</template>

<script>
    export default {
        name: "LPup",
        computed:{
            vvv:{
                get:function () {
                    return this.value
                },
                set:function (val) {
                    this.$emit('input',val)
                }
            }
        },
        data(){
          return {
              progress:0,
              show:false
          }
        },
        props:{
            action:{
                type:String,
                default:'http://wtms.173wt.com/api/upload_file'
            },
            value:{
                type:String,
                default:""
            }
        },
        model:{
            prop: 'value',
            event: 'input'
        },
        methods:{
            reset()
            {
              this.vvv=""
            },
            success(res)
            {
                this.vvv=res.data
                this.show=false
            },
            filepre(event)
            {
                this.progress=parseInt(event.percent);
            },
            beforeAvatarUpload(file) {

                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isGIF = file.type === 'image/gif';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG && !isPNG && !isGIF) {
                    this.$message.error('上传头像图片只能是 JPG/PNG/GIF 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return (isJPG||isPNG||isGIF) && isLt2M;
                this.progress=0,
                this.show=true;
            },
        }
    }
</script>

<style scoped>
    @import "../../assets/styles/subpage.less";
</style>