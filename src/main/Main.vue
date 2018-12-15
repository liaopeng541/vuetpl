<template>
    <el-container>
        <el-header>
            <div class="admin-header">
                <div class="top-logo" style="display: flex;align-items: center;justify-content: center">
                    <h1 style="color:rgba(255, 255, 255, 0.85);">
                        {{this.$store.state.main.name}}
                    </h1>
                </div>
                <div class="top-menu">
                    <!--<el-menu-->
                            <!--:default-active="this.$store.state.main.userMenu && this.$store.state.main.userMenu.length>0?this.$store.state.main.userMenu[0].id+'':0+''"-->
                            <!--class="top-menu-list"-->
                            <!--mode="horizontal"-->
                            <!--@select="handleSelectTopMenu"-->
                            <!--background-color="#1366aa"-->
                            <!--text-color="rgba(255, 255, 255, 0.67)"-->
                            <!--active-text-color="#ffffff"-->
                    <!--&gt;-->
                        <!--<el-menu-item v-for="menuItem in this.$store.state.main.userMenu" :index="menuItem.id">-->
                            <!--{{menuItem.title}}-->
                        <!--</el-menu-item>-->

                    <!--</el-menu>-->

                </div>
                <div class="top-tool">
                    <el-dropdown @command="loginOut">
                          <span class="el-dropdown-link user-avatar">
                              <img :src="admin_avatar" style="width: 30px;height: 30px;border-radius: 15px;"/>
                              <span style="margin-left: 5px;">{{this.$store.state.main.userInfo && this.$store.state.main.userInfo.name}}</span>
                              <i class="el-icon-arrow-down el-icon--right"></i>
                          </span>
                        <el-dropdown-menu slot="dropdown" style="width: 120px">
                            <el-dropdown-item command="showrepass">修改密码</el-dropdown-item>
                            <el-dropdown-item command="loginOut">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </el-header>
        <el-container>
            <el-aside style="width: auto;overflow-y:auto;overflow-x: hidden">
                <el-menu text-color="#666666"
                         active-text-color="#333333" class="leftmenu" :collapse="isCollapse"
                         :default-openeds="defaultOpeneds" @select="handleSelectLeftMenu">
                    <div style="width: 100%;overflow: hidden">
                        <div style="padding-left: 20px; color: #ffffff;background: #108ee9;height: 40px;display: flex;align-items: center;"
                             :class="{'menu-pointer':isCollapse}" @click="menuOut">
                            <i :class="{'el-icon-menu':!isCollapse,'el-icon-caret-right':isCollapse}" style="vertical-align: middle;
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;"></i>
                            <span v-if="!isCollapse"
                                  style="flex: 1;padding-left: 20px;white-space: nowrap;overflow: hidden;font-size: 14px">导航菜单</span>

                            <div v-if="!isCollapse" class="sild-b0tn" style="cursor: pointer" @click.stop="menuIn">
                                <i class="el-icon-caret-left" style="vertical-align: middle;
    font-size: 20px;"></i>
                            </div>

                        </div>
                    </div>
                    <LpMenu v-for="navMenu in this.$store.state.main.leftMenu" :navMenus="navMenu"/>
                </el-menu>
            </el-aside>
            <el-main style="overflow: hidden">
                <router-view />
            </el-main>
            <LPModel
                    v-if="repass.show" :center="true" :title="repass.title" icon="save" :onclose="()=>{
          repass.show=false
        }">
                <div style="width: 400px;height: 200px;overflow-y: auto;background: #ffffff;padding-bottom: 50px">
                    <el-form ref="repass" label-width="100px" :inline="true" :model="repass.items"
                             style="margin-bottom: 5px;background: #ffffff;padding: 20px 10px"
                             :rules="repass.rules">


                        <el-form-item label="原密码" prop="oldpass">
                            <el-input type="password" style="width: 200px"
                                      v-model="repass.items.oldpass"
                                      placeholder="系统自动生成"></el-input>
                        </el-form-item>
                        <el-form-item label="新密码" prop="newpass">
                            <el-input type="password" style="width: 200px"
                                      v-model="repass.items.newpass"
                                      placeholder="系统自动生成"></el-input>
                        </el-form-item>
                        <el-form-item label="重复新密码" prop="renewpass">
                            <el-input type="password" style="width: 200px"
                                      v-model="repass.items.renewpass"
                                      placeholder="系统自动生成"></el-input>
                        </el-form-item>


                    </el-form>

                    <div style="text-align: center;padding: 10px;position: absolute;left: 0px;bottom: 0px;right: 0px;background: #ffffff;border-top: 1px solid #f0f2f5">
                        <el-button @click="repass.show=false;">取 消</el-button>
                        <el-button type="primary" @click="subrepass('repass')">提 交</el-button>

                    </div>


                </div>

            </LPModel>

        </el-container>

        <el-footer style="height: 30px;line-height: 30px;text-align: center;border-top:1px solid #cccccc">
            <!--<div>-->
            <!--版权所有@湾田-->
            <!--</div>-->
        </el-footer>
    </el-container>
</template>

<script>
    import Home from "./Home"
    import LpMenu from "../components/LpMenu";
    import LPModel from "../components/LPModel";

    export default {
        name: "Main",
        components: {LPModel, LpMenu, Home},


        data() {
            return {
                repass: {
                    show: false,
                    title: "修改管理员密码",
                    items: {
                        oldpass: "",
                        newpass: "",
                        renewpass: "",
                    },
                    rules: {
                        oldpass: [
                            {required: true, message: '请输入原密码'},
                        ],
                        newpass: [
                            {required: true, message: '请输入新密码'},
                        ],
                        renewpass: [
                            {required: true, message: '请再次输入新密码'},
                        ],
                    }
                },
                isCollapse: false,
                tabPaneHeight: document.body.clientHeight - 130,
                timer: null,
                sysdefine: ['nav'],
            }
        },
        computed: {
            activeTab: {
                // get: function () {
                //     return this.$store.state.main.activeTab
                // },
                // set: function (val) {
                //     this.$store.state.main.activeTab = val
                // }
            },
            defaultOpeneds: {
                // get: function () {
                //     var opens = [];
                //     var has = false;
                //     if (this.$store.state.main.leftMenu.length > 0) {
                //         this.$store.state.main.leftMenu.map((item) => {
                //             if (item.sub && item.sub.length > 0 && !has) {
                //                 opens = [item.id];
                //                 has = true;
                //             }
                //         })
                //
                //     }
                //     return opens;
                // }
            },
            admin_avatar: {
                get: function () {
                    if (this.$store.state.main.userInfo && this.$store.state.main.userInfo.head_pic) {
                        var img = this.$Api.upurl + this.$store.state.main.userInfo.head_pic;
                        if (this.$common.CheckImgExists(img)) {
                            return img
                        } else {
                            return require('../assets/images/login/login-bg.png');
                        }
                    } else {
                        return require('../assets/images/login/login-bg.png');
                    }
                }
            }
        },
        mounted() {

            // if (!this.$store.state.main.token) {
            //     var token = localStorage.getItem("token");
            //     if (token) {
            //         this.$store.dispatch("main/setMainData", {token: token})
            //     } else {
            //         this.reLogin();
            //         return;
            //     }
            // }
            // if (!this.$store.state.main.userInfo) {
            //     //  localStorage.removeItem("userInfo")
            //     var userInfo = localStorage.getItem("userInfo");
            //     if (userInfo) {
            //         userInfo = JSON.parse(userInfo)
            //         this.$store.dispatch("main/setMainData", {userInfo: userInfo})
            //     } else {
            //         this.reLogin();
            //         return;
            //     }
            // }
            //
            // setTimeout(() => {
            //     this.fetchData();
            // }, 80)

            window.onresize = () => {
                if (this.timer) {
                    clearTimeout(this.timer)
                }
                this.timer = setTimeout(() => {
                    this.tabPaneHeight = document.body.clientHeight - 130;
                }, 50)
            }
        },
        methods: {
            subrepass(formName)
            {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.repass.items.access_token=this.$store.state.main.token;

                        this.$post(this.$Api.repass, this.repass.items).then((response) => {
                            if (response.status == 100) {
                                this.$message.success(response.msg)
                                this.repass.show=false;
                            } else if (response.status == 109) {
                                this.$store.dispatch("main/reLogin", this);
                            } else {
                                this.$LPspin.hide();
                                this.$message.error(response.msg)
                            }
                        }).catch((e) => {
                            this.$LPspin.hide();
                            this.$message.error("网络访问失败，请重试")
                        })



                    } else {
                        this.$message.error("请按要求填写后提交")
                        return false;
                    }
                });


            },
            fetchData() {
                var databody = {
                    "access_token": this.$store.state.main.token
                }
                this.$get(this.$Api.getUserMenu, databody).then((response) => {
                    this.$LPspin.hide();
                    if (response.status == 109) {
                        this.$message.error("请重新登陆");
                        this.reLogin();
                        return;

                    }
                    if (response.status == 100) {
                        response.data.userMenu = this.setpath(response.data)
                        var leftMenu = [];
                        if (response.data && response.data.length > 0 && response.data[0].children) {
                            leftMenu = response.data[0].children;
                        }
                        this.$store.dispatch("main/setMainData", {userMenu: response.data, leftMenu: leftMenu})
                    } else {
                        this.$message({
                            showClose: true,
                            message: data.message,
                            type: 'error'
                        })
                    }

                }).catch((e) => {
                    this.$LPspin.hide();
                    this.$message.error('网络连接失败。');
                })


            },
            setpath(menu, path = null) {
                menu && menu.map((item, i) => {
                    if (path) {
                        menu[i]['path'] = path.concat([item.title]);
                    } else {
                        menu[i]['path'] = [item.title]
                    }
                    if (item.children) {
                        menu[i]['children'] = this.setpath(item.children, menu[i]['path'])
                    }
                })

                return menu;

            },
            removeTab(key) {
                this.$store.state.main.openTabs.map((item, i) => {
                    if (item.index == key) {
                        var next = this.$store.state.main.openTabs[i + 1] || this.$store.state.main.openTabs[i - 1];
                        this.$store.state.main.activeTab = next.index;
                        this.$store.state.main.openTabs.splice(i, 1);
                    }
                })
            },
            loginOut(command) {
                if (command == "loginOut") {
                    this.reLogin();
                }
                if (command == "showrepass") {
                    this.showrepass();
                }

            },
            showrepass() {
                this.repass.show = true
            },
            reLogin() {
                localStorage.removeItem("token");
                this.$store.state.main.token = null;
                this.$router.push("/login")
            },
            closeAll() {
                this.$store.state.main.activeTab = "-1";
                this.$store.state.main.openTabs.splice(1, this.$store.state.main.openTabs.length - 1)
            },
            // checkLogin() {
            //     if (!this.$store.state.main.token) {
            //         var token = localStorage.getItem("token");
            //         if (token) {
            //             this.$store.dispatch("main/setMainData", {token:token})
            //         } else {
            //             this.$router.push("/login")
            //         }
            //     }
            // },
            menuIn() {
                this.isCollapse = true
            },
            menuOut() {
                if (this.isCollapse) {
                    this.isCollapse = false
                }
            },
            handleSelectTopMenu(key) {
                this.$store.state.main.userMenu.map((item, i) => {
                    if (item.id == key) {
                        this.$store.state.main.leftMenu = item.children;
                    }
                })

            },
            getComponentName(filepath) {
                return filepath.replace("./", "").replace("/", "_").replace(".vue", "");
            },
            registerComponent(componentFilepath, componentName) {
                // var status = false;
                // var requireComponent = require.context('../subPages', true, /\.vue$/)
                // console.log(componentFilepath)
                // requireComponent.keys().forEach(
                //     (filePath) => {
                //         if (filePath == componentFilepath) {
                //             //注删组件
                //             Vue.component(componentName, requireComponent(filePath).default)
                //             status = true;
                //         }
                //     }
                // )
                // return status;
            },
            urlToFilePath(url) {
                if (url.indexOf("/") == -1) {
                    return this.$common.L_T(url);
                } else {
                    var items = url.split("/")
                    if (this.sysdefine.indexOf(items[2]) != -1) {
                        console.log("需要改名");
                        items[2] = 'LP' + items[2];
                    }
                    return './' + items[1] + '/' + items[2] + ".vue";
                }

            },
            handleSelectLeftMenu(key) {

                // if (this.getTabsPage(key)) {
                //     this.$store.state.main.activeTab = key;
                // } else {
                //     var item = this.getMenuData(key, this.$store.state.main.leftMenu);
                //     if (item.href) {
                //         var componentFilepath = this.urlToFilePath(item.href)
                //         var componentName = this.getComponentName(componentFilepath)
                //         //动态注删组件
                //         if (this.registerComponent(componentFilepath, componentName)) {
                //             var tabpanel = {title: item.title, index: key, component: componentName};
                //
                //             this.$store.state[componentName].breadcrumb = item.path;
                //
                //             this.$store.state.main.openTabs.push(tabpanel)
                //             this.$store.state.main.activeTab = key;
                //         } else {
                //             this.$message({
                //                 message: "《" + item.title + "》功能正开发中，感谢您的关注",
                //                 type: "warning",
                //                 showClose: true
                //             })
                //         }
                //     }
                // }


            },
            getMenuData(key, menu) {
                var re = null;
                menu && menu.map((item) => {
                    if (item.id == key) {
                        re = item;
                        return true;
                    } else {
                        if (item.children) {
                            var t = this.getMenuData(key, item.children);
                            if (t) {
                                re = t;
                            }
                        }
                    }
                })
                return re;
            },
            getTabsPage(key) {
                var page = null;
                this.$store.state.main.openTabs.map((item) => {
                    if (item.index == key) {
                        page = item;
                    }
                })
                return page;
            },


        }
    }
</script>

<style scoped>
    @import "../assets/styles/main/home.less";
</style>