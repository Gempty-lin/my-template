<template>
<div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157" text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
        <template v-for="item in items">
            <template v-if="item.subs">
                <el-submenu :index="item.index" :key="item.index">
                    <template slot="title">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </template>
                    <template v-for="subItem in item.subs">
                        <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                            <template slot="title">{{ subItem.title }}</template>
                            <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                {{ threeItem.title }}
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item v-else :index="_isMobile() && subItem.index == 'comboforuser'?'/m/comboforuser' :_isMobile() && subItem.index == 'new_room'?'/m/room': subItem.index" :key="subItem.index">
                            {{ subItem.title }}
                        </el-menu-item>
                    </template>
                </el-submenu>
            </template>
            <template v-else>
                <el-menu-item :index="item.index" :key="item.index">
                    <i :class="item.icon"></i>
                    <span slot="title">{{ item.title }}</span>
                </el-menu-item>
            </template>
        </template>
    </el-menu>
</div>
</template>

<script>
import bus from "./bus";
export default {
    data() {
        return {
            collapse: false,
            items: [{
                    icon: "",
                    index: "dashboard",
                    title: "系统首页"
                },
                {
                    icon: "",
                    index: "addrole",
                    title: "系统管理",
                    subs: [{
                            index: "admin_manage",
                            title: "管理员列表"
                        },
                        {
                            index: "addrole",
                            title: "角色列表"
                        },
                        {
                            index: "Node",
                            title: "节点列表"
                        }
                    ]
                },
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace("/", "");
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on("collapse", msg => {
            this.collapse = msg;
        });
        this.userlist();
    },
    methods: {
        _isMobile() {
            let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
            return flag;
        },
        // 请求菜单栏
        userlist() {
            this.axios.post("/system/login/getMenu").then(res => {
                this.items = res.data.Data;
            });
        }
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
    width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}

.sidebar>ul {
    height: 100%;
}
</style>
