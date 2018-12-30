<template>
  <div class="login">
    <el-form ref="form" status-icon :rules="rules" :model="form" label-width="80px">
      <img src="~@/assets/avatar.jpg" alt>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登陆</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'change' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'change' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'change' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    reset() {
      // 重置表单
      this.$refs.form.resetFields()
    },
    login() {
      this.$refs.form.validate(valid => {
        if (!valid) return false
        // 发送ajax请求
        axios({
          method: 'post',
          url: 'http://localhost:8888/api/private/v1/login',
          data: this.form
        }).then(res => {
          console.log(res.data)
          if (res.data.meta.status === 200) {
            this.$message({
              message: '登陆成功',
              type: 'success',
              duration: '1000'
            })
            // 把token存起来
            localStorage.setItem('token', res.data.data.token)
            this.$router.push('/home')
          } else {
            this.$message({
              message: res.data.meta.msg,
              type: 'error'
            })
          }
        })
      })
    }
  }
}
</script>

<style lang="less">
.login {
  width: 100%;
  height: 100%;
  background-color: #2d434c;
  overflow: hidden;

  .el-form {
    width: 400px;
    background-color: #fff;
    margin: 300px auto;
    padding: 75px 40px 15px;
    position: relative;
    border-radius: 10px;

    img {
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      top: -25%;
      border-radius: 50%;
      border: 10px solid #fff;
    }

    .el-button:nth-child(2) {
      margin-left: 100px;
    }
  }
}
</style>
