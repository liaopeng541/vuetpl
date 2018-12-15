<template>
    <el-upload
            class="lpupimgs"
            :action="action"
            :multiple="true"
            list-type="picture-card"
            :on-success="success"
            :file-list="fileList"
            :on-remove="change"
            :before-upload="beforeAvatarUpload"
            :data="{access_token:this.$store.state.main.token}"
    >

        <i  class="el-icon-plus"></i>
    </el-upload>

    
</template>

<script>
    export default {
        name: "LPups",
        computed:{
            fileList:{
                get:function () {
                    return this.value
                },
                set:function (val) {
                    this.$emit('input',val)
                }
            }

        },
        props:{
            action:{
                type:String,
                default:'http://wms.173wt.com/api/upload_file'
            },
            value:{
                type:Array,
                default:[]
            }
        },
        model:{
            prop: 'value',
            event: 'input'
        },
        methods:{
            changfile(fileList)
            {
                console.log(fileList)
                var filearr=[];
              fileList && fileList.map((item)=>{
                  if(item.url)
                  {
                      filearr.push(item)
                  }else if(item.response)
                  {
                      filearr.push({name:item.name,url:item.response.data,status:item.status})
                  }

              });
              this.fileList=_.cloneDeep(filearr);
            },
            change(file,fileList)
            {
                this.changfile(fileList)
            },
            success(response, file, fileList)
            {
                this.changfile(fileList)
            },
            filepre(event)
            {
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
                return isJPG && isLt2M;
            },
        }
    }
</script>

<style scoped>
    @import "../../assets/styles/subpage.less";
</style>