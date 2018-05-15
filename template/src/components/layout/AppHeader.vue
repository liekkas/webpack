<template>
  <div class="app-header">
    <div class="header-left app-center" @click="$router.push('/')">
      <img src="/static/logo.png">
      <div>{{$t('projectName')}}</div>
    </div>
    
    <div class="header-menu">
      <div class="header-menu-item" 
           :class="{'header-menu-item-selected': activeMenu === item.name}"
           v-for="item in appMenus" :key="item.name" @click="letsgo(item)"
           v-if="isAdmin || authMenus.indexOf(item.name) > -1">
        <Icon :type="item.icon"></Icon>
        {{ item.label }}
      </div>
    </div>

    <div class="header-right app-center">
       <Menu mode="horizontal" theme="dark" active-name="1" @on-select="onMenuChanged">
          <Submenu name="3">
              <template slot="title">
                  <Avatar class="avatar">{{personName.split('')[0]}}</Avatar>&nbsp;&nbsp;
              </template>
              <MenuGroup title="使用">
                  <MenuItem name="use">个人中心</MenuItem>
              </MenuGroup>
              <MenuGroup title="其它">
                  <MenuItem name="logout">退出</MenuItem>
              </MenuGroup>
          </Submenu>
          <Submenu name="4">
              <template slot="title">
                  <!-- <Icon type="stats-bars"></Icon> -->
                  工单
              </template>
              <MenuItem name="myOrder">我的工单</MenuItem>
              <MenuItem name="addOrder">提交工单</MenuItem>
          </Submenu>
      </Menu>

      <div class="header-toolbar app-center">
        <div class="header-icon app-center" 
             :class="{'header-icon-selected': showType === 'msg'}"
             @click="toggleSlidePanel('msg')">
          <Badge count="12">
            <Icon type="ios-bell" size="24"></Icon>
          </Badge>
        </div>
        <div class="header-icon app-center" 
             :class="{'header-icon-selected': showType === 'history'}"
             @click="toggleSlidePanel('history')">
          <Icon type="android-time" size="22"></Icon>
        </div>
        <div class="header-icon app-center" 
             :class="{'header-icon-selected': showType === 'help'}"
             @click="toggleSlidePanel('help')">
          <Icon type="help-circled" size="22"></Icon>
        </div>
        
      </div>
    </div>
    <!-- <Button @click="logout">退出</Button> -->
  </div>
</template>

<script>
export default {
  props: ['showType'],
  computed: {
    appMenus() {
      return this.$store.getters.appMenus
    },
    authMenus() {
      return this.$store.getters.authMenus
    },
    isAdmin() {
      return this.$store.getters.isAdmin
    },
    personName() {
      return this.$store.getters.user ? this.$store.getters.user.personName : ''
    },
    activeMenu() {
      return this.$route.path.split('/')[1]
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    },
    toggleSlidePanel(v) {
      this.$emit('show-panel', v)
    },
    letsgo(v) {
      this.$router.push({name: v.name})
    },
    onMenuChanged(v) {
      if(v === 'logout') {
        this.$store.dispatch('logout')
      } else {
        this.$router.push('/'+v)
      }
    },
  },
}
</script>

<style lang="less">
  @import '~@/styles/theme';
  .header-left {
    cursor: pointer;
    img {
      height: 36px;
    }
    div {
      font-size: 18px;
      font-style: italic;
      margin: 0 4px;
    }
    flex-shrink: 0; //禁止压缩
  }

  .header-menu {
    height: 40px;
    margin: 10px 0 10px 16px;
    padding: 10px 24px;
    font-size: 15px;
    width: 100%;
    // background-color: azure;
    border-left: 1px solid #000;     
    border-right: 1px solid #000; 
    display: flex;
    align-items: baseline;
    user-select: none;
    &-item {
      margin: 0 12px;
      &:hover {
        cursor: pointer;
        color: fade(@primary-color,90%);
      }
    }
    &-item-selected {
      color: @primary-color;
    }
  }

  .header-right {
    font-size: 18px;
    flex-shrink: 0;
  }

  .dropdown-cell {
    padding: 0 12px;
    height: @header-height;
    &:hover {
      background-color: @primary-color;
    }
  }

  .header-toolbar {
    // height: 40px;
    // margin: 10px 16px 10px 0;
    // margin-right: 16px;
    color: #ddd;
    padding: 10px 14px;
    border-left: 1px solid #000;    
    // background-color: aquamarine; 
  }

  .avatar {
    color: @primary-color;
    background-color: #ddd;
  }

  .header-icon {
    width: 30px;
    height: 30px;
    margin: 0 4px;
    &:hover {
      cursor: pointer;
      background-color: fade(@primary-color,90%);
      border-radius: 30px;
    }
    &-selected {
      background-color: @primary-color;
      border-radius: 30px;
    }
  }
</style>

