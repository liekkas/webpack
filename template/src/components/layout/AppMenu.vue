<template>
  <div :class="appMenuClass" id="root">
    <div class="toggle-bar" @click="toggle">
      <Icon v-if="isCollapsed" type="chevron-right" size="14"></Icon>
      <Icon v-else type="chevron-left" size="14"></Icon>
    </div>
    
    <div v-for="menu in value" v-if="isAdmin || authMenus.indexOf(menu.name) > -1" :key="menu.name">
      <div id="menu" class="list-menu-father" :class="{'active':menu.name===activeMenu}">
        <template v-if="!menu.children">
          <a v-if="!isCollapsed" class="menu-father" @click="onMenuChanged(menu.name)">
            <span class="icon-menu">
              <Icon :type="menu.icon" size="18"></Icon>
            </span>
            <span class="text-menu text-omit">\{{menu.label}}</span>
          </a>
          <Tooltip v-else :content="menu.label" placement="right">
            <a class="menu-father" @click="onMenuChanged(menu.name)">
              <span class="icon-menu">
                <Icon :type="menu.icon" size="18"></Icon>
              </span>
            </a>
          </Tooltip>
        </template>
        <template v-else>
          <a v-if="!isCollapsed" class="menu-father" @click="childrenShow(menu.name)">
            <span class="icon-menu">
              <Icon :type="menu.icon" size="18"></Icon>  
            </span>
            <span class="text-menu text-omit">
              \{{menu.label}}<Icon v-if="menu.isShowChildren" type="arrow-down-b"></Icon><Icon v-else type="arrow-right-b"></Icon>
            </span>
          </a>
          <Tooltip v-else :content="menu.label" placement="right">
            <a class="menu-father" @click="childrenShow(menu.name)">
              <span class="icon-menu">
                <Icon :type="menu.icon" size="18"></Icon>
              </span>
            </a>
          </Tooltip>
        </template>
      </div>
      <div v-for="child in menu.children" v-if="isAdmin || authMenus.indexOf(child.name) > -1" :key="child.name">
        <div id="subMenu" class="list-menu-children" :class="{'active':child.name===activeMenu}" v-show="menu.isShowChildren">
          <a v-if="!isCollapsed" class="menu-child" @click="onMenuChanged(child.name)">
            <span class="icon-menu">
              <Icon :type="child.icon" size="18"></Icon>
            </span>
            <span class="text-menu text-omit">\{{child.label}}</span>
          </a>
          <Tooltip v-else :content="child.label" placement="right">
            <a class="menu-child" @click="onMenuChanged(child.name)">
              <span class="icon-menu">
                <Icon :type="child.icon" size="18"></Icon>
              </span>
            </a>
          </Tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import Cookie from 'js-cookie'
    export default {
    props: ['value','module'],
    mounted () {
      this.value.forEach(v => {
        if(v.children && v.children.length > 0) {
          this.$set(v, 'isShowChildren', false)
          if(this.paths.indexOf(v.name) > -1) {
            this.$set(v, 'isShowChildren', true)
          }
        }
      })
    },
    data() {
      return{
        isCollapsed: Cookie.get('isCollapsed') || false,
        activeMenu: this.$route.name
      }
    },
    computed: {
      authMenus() {
        return this.$store.getters.authMenus
      },
      isAdmin() {
        return this.$store.getters.isAdmin
      },
      paths() {
        return this.$route.path.split('/')
      },
      appMenuClass() {
        return this.isCollapsed ? 'appMenu' : 'appMenuHover'
      }
    },
    watch: {

    },
    methods: {
      toggle() {
        this.isCollapsed = !this.isCollapsed
        Cookie.set('isCollapsed', this.isCollapsed ? 1 : '')
        this.$emit('toggle', this.isCollapsed)
        
        // anime({
        //   targets: ['#root', '#menu', '#subMenu'],
        //   width: this.isCollapsed ? 60 : 180,
        //   duration: 250,
        //   easing: 'linear'
        // });
      },
      
      childrenShow(name) {
        _.filter(this.value, v => v.children && v.children.length > 0)
          .forEach(v => {
            if(v.name === name) {
              v.isShowChildren = !v.isShowChildren
            } else {
              v.isShowChildren = this.paths.indexOf(v.name) > -1
            }
          })
      },
      onMenuChanged: function (v) {
        this.$router.push({name: v})
        // this.$router.push('/'+this.module+'/'+v);
      },
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/styles/theme.less";

  .list-menu-father {
    background-color: #42485B;
    color: #FFF;
    height: 44px;
    line-height: 25px;
    font-size:13px;
    padding: 8px 0px 8px 0px;
    margin: 0;
    padding: 0;
    width: 60px;
    // transition: all 0.3s;
  }
  .list-menu-father:hover {
    background-color: fade(@primary-color,70%);
    color: #FFF;
    height: 44px;
    line-height: 25px;
    font-size:13px;
    padding: 8px 0px 8px 0px;
    margin: 0;
    padding: 0;
  }
  .list-menu-children{
    color: #FFF;
    width: 60px;
    height: 44px;
    line-height: 25px;
    font-size:13px;
    padding: 8px 0px 8px 0px;
    margin: 0;
    padding: 0;
    // transition: all 0.3s;
  }
  .list-menu-children:hover{
    background-color: fade(@primary-color,65%);
    color: #FFF;
    height: 44px;
    line-height: 25px;
    font-size:13px;
    padding: 8px 0px 8px 0px;
    margin: 0;
    padding: 0;
  }
  .active{
    color: #ff000e;
    background-color: fade(@primary-color,90%);
  }
  .active:hover{
    background-color: @primary-color;
  }
  .menu-father {
    color: #ddd;
    width: 100%;
    height: 44px;
    display: flex;
    justify-content: space-between;
    margin: 0;
    user-select: none;
  }
  .menu-child {
    color: #eee;
    width: 100%;
    height: 44px;
    display: flex;
    justify-content: space-between;
    margin: 0;
    user-select: none;
  }
  .icon-menu{
    /*margin-top:13px;*/
    width: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 14px;
      margin-top: 1px;
    }
  }
  .text-menu{
    margin-top:10px;
    width: 130px;
  }
  // .appMenu{
  //   height: 100%;
  // }
  .appMenu {
    // position: fixed;
    background-color: @slide-menu-bg;
    height: 100%;
    z-index: 1000;
    width: @collapsed-menu-width;
    // transition: all 0.3s;
  }
  .appMenuHover{
    // position: fixed;
    background-color: @slide-menu-bg;
    height: 100%;
    z-index: 1000;
    // transition: all 0.3s;
     width: @normal-menu-width;
      .text-menu{
        position:relative;
        white-space:nowrap;
        display: block;
        .ivu-icon {
          position:absolute;
          left:75%;
          top:6px;
        }
      }
      .list-menu-father{
        width: @normal-menu-width;
      }
      .list-menu-children{
        width: @normal-menu-width;
      }
  }
  .toggle-bar {
    height: 30px;
    width: 100%;
    background: #4a5064;
    color: #aeb9c2;
    text-align: center;
    line-height: 30px!important;
    font-size: 12px;
    user-select: none;
    cursor: pointer;
  }
</style>
