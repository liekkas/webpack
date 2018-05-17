<template>
  <div class="login" id="login">
    <canvas id="canvas" class="canvas"></canvas>
    <div class="login-box">
      <div class="login-title">
        <img src="/static/logo.png" height="40"/>
        <div>&nbsp;\{{$t('projectName')}}</div>
      </div>

      <form autocomplete="off">
        <div class="formDiv">
          <div class="labelDiv"><Icon type="person"></Icon><label>&nbsp;用户：</label></div>
          <input type="text" id="username" autofocus="true" v-model="formInline.username"
              @keyup.enter="focusMove" @change="usernameVal" ref="username" required/>
          <div class="labelDiv"><Icon type="locked"></Icon><label>&nbsp;密码：</label></div>
          <input type="password" class="pwd" ref="password" v-model="formInline.password" @keyup.enter="handleSubmit('formInline')" @change="passwordVal" required/>
          <Button type="ghost" icon="arrow-right-c" size="large"
            :loading="loginLoading" @click="handleSubmit('formInline')"
            style="margin-left:-44px;margin-bottom:8px; color: white;">
          </Button>
          <div v-if="ruleInline.usernameMsg" class="error-msg" style="bottom: 88px;">
            \{{ruleInline.usernameMsg}}
          </div>
          <div v-if="ruleInline.passwordMsg" class="error-msg" style="bottom: -27px;">
            \{{ruleInline.passwordMsg}}
          </div>
          <div v-if="loginMsg" class="error-msg">
            \{{loginMsg}}
          </div>
        </div>
        <svg viewBox="0 0 320 300">
          <defs>
            <linearGradient
                            inkscape:collect="always"
                            id="linearGradient"
                            x1="13"
                            y1="193.49992"
                            x2="307"
                            y2="193.49992"
                            gradientUnits="userSpaceOnUse">
              <stop
                    style="stop-color:#fff;"
                    offset="0"
                    id="stop876" />
              <stop
                    style="stop-color:#fff;"
                    offset="1"
                    id="stop878" />
            </linearGradient>
          </defs>
          <path d="m 40,120.00016 239.99984,-3.2e-4 c 0,0 24.99263,0.79932 25.00016,35.00016 0.008,34.20084 -25.00016,35 -25.00016,35 h -239.99984 c 0,-0.0205 -25,4.01348 -25,38.5 0,34.48652 25,38.5 25,38.5 h 215 c 0,0 20,-0.99604 20,-25 0,-24.00396 -20,-25 -20,-25 h -190 c 0,0 -20,1.71033 -20,25 0,24.00396 20,25 20,25 h 168.57143" />
        </svg>
      </form>
    </div>
    <div class="copyright">
      <span>\{{$t('copyright')}}</span>
    </div>
  </div>
</template>

<script>
import { canvas } from '@/utils/star'
import { mapState } from 'vuex'
let funny = null
export default {
  data() {
    return {
      formInline: {
        username: '',
        password: ''
      },
      ruleInline: {
        usernameMsg: '',
        passwordMsg: ''
      },
    }
  },
  computed: {
    ...mapState({
      loginLoading: ({app}) => app.loginLoading,
      loginMsg: ({app}) => app.loginMsg,
    })
  },
  mounted() {
    canvas()
    document.querySelector('#username').addEventListener('focus', () => this.animate(0))
    document.querySelector('.pwd').addEventListener('focus', () => this.animate(-336))
  },
  methods: {
    animate(v, duration = 700, easing = 'easeOutQuart') {
      if (funny) funny.pause();
      funny = anime({
        targets: 'path',
        strokeDashoffset: {
          value: v,
          duration,
          easing
        },
        strokeDasharray: {
          value: '240 1386',
          duration,
          easing
        }
      })
    },
    valid(){
      if (this.formInline.username=="") {
        this.ruleInline.usernameMsg = "用户名不能为空！"
        return false;
      }else if (this.formInline.password=="") {
        this.ruleInline.passwordMsg = "密码不能为空！"
        return false;
      }else if (this.formInline.password.length<6&&this.formInline.password.length>0) {
        this.ruleInline.passwordMsg = ""
        this.ruleInline.passwordMsg = "密码长度不能低于6位！"
        return false;
      }else {
        return true;
      }
    },
    handleSubmit(name) {
      //this.$refs[name].validate((valid) => {
        if (this.valid()) {
          this.$store.dispatch('fetchToken', this.formInline)
          } else {
          return;
            //this.$Message.error('请输入正确的用户名或密码!')
          }
    //  })
    },
    usernameVal() {
      this.$store.dispatch('removeMsg',"")
      if (this.formInline.username=="") {
        this.ruleInline.usernameMsg = "用户名不能为空！"
      }else {
        this.ruleInline.usernameMsg = ""
      }
    },
    passwordVal() {
      this.$store.dispatch('removeMsg',"");
      if (this.formInline.password=="") {
        this.ruleInline.passwordMsg = "密码不能为空！"
      }else if (this.formInline.password.length<6&&this.formInline.password.length>0) {
        this.ruleInline.passwordMsg = "密码长度不能低于6位！"
      }else {
        this.ruleInline.passwordMsg = ""
      }
    },
    focusMove() {
      this.$refs.password.focus();
    }
  },
}
</script>

<style lang="less" scoped>
  @import '~@/styles/theme';
  svg {
    position: absolute;
    width: 535px;
    top: -20px;
  }
  path {
    fill: none;
    stroke: url(#linearGradient);;
    stroke-width: 1;
    stroke-dasharray: 240 1386;
  }
  .canvas {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .login-box {
    position: absolute;
    top: 20%;
    width: 100vw;
    min-width: 200px;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .login-title {
    display: flex;
    color: fade(white, 90%);
    align-items: flex-end;
    margin-bottom: 24px;
    font-size: 1.3rem;
    font-style: italic;
    display: flex;
    justify-content: center;
  }

  .copyright {
    display: flex;
    flex-direction: column-reverse;
    padding-bottom: 24px;
    width: 100%;
    text-align: center;
    user-select: none;
  }

  .error-msg {
    font-size: 15px;
    color: @error-color;
    position: absolute;
    width: 80%;
    bottom: -38px;
    display: flex;
    justify-content: flex-start;
  }

  .formDiv input {
    border: 0;
    outline: 0;
    padding-top: 10px;
    width: 80%;
    font-size: 28px;
    line-height: 42px;
    height: 50px;
    background-color:rgba(0,0,0, 0);
    color: fade(white, 90%);
    text-overflow: ellipsis;
    border-bottom: 1px dashed #999;
  }
  .labelDiv {
    width: 80%;
    margin-top: 30px;
    margin-bottom: 13px;
    font-size: 1rem;
    font-weight: 500;
    color: fade(white, 80%);
  }
  .formDiv {
    width: 500px;
    position: relative;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    z-index: 2;
  }
  form{
    display: flex;
    justify-content: center;
  }
</style>

