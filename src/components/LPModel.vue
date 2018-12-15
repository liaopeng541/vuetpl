<template>

    <div>
        <div v-if="showtask" style="position: fixed;top:0;left: 0;bottom: 0;right: 0;background:rgba(0,0,0,0.2);z-index: 11">

        </div>
        <div ref="toolbox" class="toolbox" :style="{top:this.style.top+'px',left:this.style.left+'px'}">


            <div class="header" @mousedown="holdheader">
                <div style="flex: 1;display: flex;align-items: center;">
                    <Icon v-if="icon" :name="icon" :w="18" :h="18"/>
                    <span style="margin-left: 5px">{{title&&title}}</span>
                </div>
                <div v-if="this.onclose" @click="close" style="width: 25px;text-align: center;cursor: pointer">
                    <i class="el-icon-close"></i>
                </div>

            </div>
            <div class="toolbody">
                <slot></slot>


            </div>

        </div>
    </div>

</template>

<script>
    export default {
        name: "LPModel",
        props: {
            title:{
                type:String,
                default:"设置"
            },
            icon:{
                type:String,
                default:"save"
            },
            center:{
                type:Boolean,
                default:true,
            },
            onclose:{
                type:Function,
                default:()=>{},
            },
            styleName:{
                type:String,
                default:""
            },
            showtask:{
                type:Boolean,
                default:true
            },
        },
        data() {
            return {
                style: {
                    top: 90,
                    left: 2000,
                    maxtop: 0,
                    maxleft: 0,
                    maxright: 2000,
                    maxbottom: 2000,
                    top_cha: 0,
                    left_cha: 0,
                    right_cha: 0,
                    bottom_cha: 0,
                    hold: false,
                },

            }
        },

        mounted() {
            this.setPosition();
        },

        methods: {
            setPosition() {
                if (this.styleName) {
                    this.style = this.$store.state.adminEditor_tools[this.styleName].style;
                }

                var style = {};
                if (this.style.left == 2000) {
                    if (this.center) {
                        console.log('width:'+document.body.clientWidth)
                        console.log('this.$refs.toolbox.clientWidth :'+document.body.clientWidth)
                        style = {
                            left: (document.body.clientWidth / 2) - (this.$refs.toolbox.clientWidth / 2),
                            top: (document.body.clientHeight / 2) - (this.$refs.toolbox.clientHeight / 2),
                        }

                    } else {
                        style = {
                            left: document.body.clientWidth - this.$refs.toolbox.clientWidth - 20,
                            top: (document.body.clientHeight / 2) - (this.$refs.toolbox.clientHeight / 2) + 40,
                        }
                    }
                }

                this.style = Object.assign(this.style, style)
                console.log(this.$refs.toolbox.clientWidth)
            },
            close() {
                if (this.onclose) {
                    this.onclose();
                }
            },
            holdheader(e) {
                var rect = e.currentTarget.getBoundingClientRect();
                var style = {
                    maxright: document.body.clientWidth + this.$refs.toolbox.clientWidth - 40,
                    maxleft: 0 - this.$refs.toolbox.clientWidth + 40,
                    maxbottom: document.body.clientHeight - 40,
                    top_cha: e.clientY - rect.top,
                    left_cha: e.clientX - rect.left,
                    right_cha: e.clientX - rect.right,
                    bottom_cha: e.clientY - rect.bottom,
                    hold: true
                }

                this.style = Object.assign(this.style, style)
                this.$common.addEvent(window, "mousemove", this.movetool)
                this.$common.addEvent(window, "mouseup", this.moveover)
            },
            movetool(e) {
                if (this.style.hold) {
                    if (e.clientX - this.style.left_cha > this.style.maxleft && e.clientX - this.style.right_cha < this.style.maxright) {
                        this.style.left = e.clientX - this.style.left_cha

                    }
                    if (e.clientY - this.style.top_cha > this.style.maxtop && e.clientY - this.style.bottom_cha < this.style.maxbottom) {
                        this.style.top = e.clientY - this.style.top_cha
                    }
                    e.preventDefault();
                    return
                }
            },
            moveover(e) {
                this.$common.removeEvent(window, "mousemove", this.movetool)
                this.$common.removeEvent(window, "mouseup", this.moveover)

            }
        }
    }
</script>

<style scoped>
    .toolbox {
        border-radius: 4px;
        box-shadow: 0 -2px 20px 0 rgba(39, 54, 78, .11);

        position: fixed;
        z-index: 13;
        background: #ffffff;
    }

    .toolbody {
    }

    .header {
        height: 40px;
        padding-left: 10px;
        padding-right: 5px;
        display: flex;
        font-size: 14px;
        justify-content: space-between;
        align-items: center;
        background: #f6f7f8;
        border-bottom: 1px solid #d9d9d9;
        cursor: move;
        display: flex;
    }

</style>