<style scoped lang="less">
    @import "../assets/styles/main/login.less";
</style>


<template>
    <div style="width: 100%">
        <div class="login">
            <div class="login-box" >
                <div class="login-title">
                    <i class="fa fa-user-circle-o" aria-hidden="true" style="font-size: 20px;margin-right: 5px"></i>
                    <span>{{this.$store.state.main.name}}</span>

                </div>
                <div class="login-body" >
                    <div class="login-form">
                    <div class="login-item">
                        <el-input placeholder="请输入用户名" v-model="username"  size="medium">
                            <template slot="prepend">用户名</template>
                        </el-input>
                    </div>
                    <div class="login-item">
                        <el-input placeholder="请输入用户名" v-model="password"    size="medium" type="password">
                            <template slot="prepend">密&nbsp;&nbsp;&nbsp;码</template>
                        </el-input>
                    </div>


                    </div>

                    <div class="login-btn">
                        <el-button @click="login" :loading="load" type="primary" style="width: 100%" size="default" >{{logintext}}</el-button>

                    </div>

                </div>


            </div>


        </div>
        <div id="indexLizi"></div>
    </div>
</template>

<script>
    import THREE from '../libs/three/three';
    import request from "../libs/request"
    export default {
        name: "Login",
        data(){
            return {
                username:"system",
                password:"gy7210",
                load:false,
                logintext:"登 录",

            }
        },
        directives: {
            focus: {
                update: function (el, {value}) {
                    if (value) {
                        el.focus()
                    }
                }
            }
        },
        mounted()
        {
            this.liziInit();
            // this.checkLogin();

        },


        methods: {
            // checkLogin() {
            //     this.$LPspin.show("系统正在初始化...")
            //     if (!this.$store.state.main.token) {
            //
            //         var token = localStorage.getItem("token");
            //         if (token) {
            //             this.$store.dispatch("main/setMainData", {token:token})
            //             this.inited();
            //         } else{
            //             this.$request.get(this.$Api.getToken,{}).then((response)=>{
            //                 if(response.status==100)
            //                 {
            //                     this.$store.dispatch("main/setMainData", {token:response.data})
            //                     this.inited();
            //                 }else{
            //                     this.$message.error(response.msg);
            //                     this.$LPspin.hide();
            //                 }
            //
            //             })
            //         }
            //     }
            // },
            // inited()
            // {
            //     setTimeout(()=>{
            //         this.$store.state.main.isInited=true;
            //         this.$LPspin.hide();
            //     },100)
            // },
            liziInit() {
                var SCREEN_WIDTH = window.innerWidth;
                var SCREEN_HEIGHT = window.innerHeight;

                var SEPARATION = 90;
                var AMOUNTX = 50;
                var AMOUNTY = 50;

                var container;

                var particles, particle;
                var count;

                var camera;
                var scene;
                var renderer;

                var mouseX = 0;
                var mouseY = 0;

                var windowHalfX = window.innerWidth / 2;
                var windowHalfY = window.innerHeight / 2;

                init();
                this.interval = setInterval(loop, 1000 / 60);

                function init() {

                    container = document.createElement('div');
                    container.style.position = 'relative';
                    container.style.top = '200px';
                    document.getElementById('indexLizi').appendChild(container);

                    camera = new THREE.Camera(75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000);
                    camera.position.z = 1000;

                    scene = new THREE.Scene();

                    renderer = new THREE.CanvasRenderer();
                    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

                    particles = new Array();

                    var i = 0;
                    var material = new THREE.ParticleCircleMaterial(0x097bdb, 1);

                    for (var ix = 0; ix < AMOUNTX; ix++) {

                        for (var iy = 0; iy < AMOUNTY; iy++) {

                            particle = particles[i++] = new THREE.Particle(material);
                            particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2);
                            particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2);
                            scene.add(particle);
                        }
                    }

                    count = 0;

                    container.appendChild(renderer.domElement);

                    document.addEventListener('mousemove', onDocumentMouseMove, false);
//                    document.addEventListener( 'touchmove', onDocumentTouchMove, false );
                }

                function onDocumentMouseMove(event) {

                    mouseX = event.clientX - windowHalfX;
                    mouseY = event.clientY - windowHalfY;

                }

                function onDocumentTouchMove(event) {

                    if (event.touches.length == 1) {

                        event.preventDefault();

                        mouseX = event.touches[0].pageX - windowHalfX;
                        mouseY = event.touches[0].pageY - windowHalfY;

                    }
                }

                function loop() {
                    camera.position.x += (mouseX - camera.position.x) * .05;
//                    camera.position.y += ( - mouseY - camera.position.y ) * .05;
                    camera.position.y = 364;

                    var i = 0;

                    for (var ix = 0; ix < AMOUNTX; ix++) {

                        for (var iy = 0; iy < AMOUNTY; iy++) {

                            particle = particles[i++];
                            particle.position.y = (Math.sin((ix + count) * 0.3) * 50) + (Math.sin((iy + count) * 0.5) * 50);
                            particle.scale.x = particle.scale.y = (Math.sin((ix + count) * 0.3) + 1) * 2 + (Math.sin((iy + count) * 0.5) + 1) * 2;

                        }
                    }

                    renderer.render(scene, camera);

                    count += 0.1;
                }
            },
            setloginstatus()
            {
                if(!this.load){
                    this.logintext="正在登录";
                    this.load=true;
                }else{
                    this.logintext="登 录";
                    this.load=false;
                }

            },
            login()
            {

                this.setloginstatus();

                if(!this.username)
                {
                    this.$message.error('请填写用户名');
                    this.setloginstatus();
                    return false;
                }
                if(!this.password)
                {
                    this.$message.error('请填写密码');
                    this.setloginstatus();
                    return false;
                }
                var databody={
                    code:this.username,
                    pass:this.password,
                    access_token:this.$store.state.main.token
                }
                this.$post(this.$Api.login,databody).then((response)=>{

                    if(response.status==100)
                    {
                       this.$store.dispatch("main/setMainData",{userInfo:response.data})
                        setTimeout(()=>{
                            this.$LPspin.hide();
                            this.$router.push("/")
                        },100)

                    }else if(response.status==101){
                       this.resetToken();
                       this.$message.show("登陆失败，请重试")


                    }else{
                        this.$message.error(response.message);
                      //  this.changecode();
                        this.setloginstatus();

                    }
                }).catch((e)=>{
                    this.$message.error('网络连接失败。');
                    this.setloginstatus();
                })



            },
            resetToken()
            {
                this.$store.state.main.token=null;
                localStorage.removeItem("token");
                this.checkLogin();
            },
            changecode()
            {
                request.get(this.$Api.captcha+"&refresh=1").then((response)=>{
                    this.codeimg=this.$Api.domain+response.data.url
                })

            }

        },
        beforeDestroy() {
            if (this.interval) clearInterval(this.interval);
        }
    }
</script>
