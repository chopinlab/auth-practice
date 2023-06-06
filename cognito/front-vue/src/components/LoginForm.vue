<template>
  <div>
    <button @click="login">Login</button>
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      // 로그인 페이지로 리다이렉트
      const clientId = process.env.VUE_APP_CLIENT_ID;
      const redirectUri = encodeURIComponent('http://localhost:8080/callback');
      const responseType = 'code';
      // const scope = encodeURIComponent('aws.cognito.signin.user.admin email openid phone');
      const scope = encodeURIComponent('email openid phone');
      const cognitoAuthUrl = `${process.env.VUE_APP_COGNITO_URL}/login?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
      
      window.location.href = cognitoAuthUrl;
    }
  }
};
</script>




<!-- <template>
    <div>
      <form @submit.prevent="submitForm">
        <label for="id">ID:</label>
        <input type="text" id="id" v-model="id">
  
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password">
  
        <button @click="submit">Submit</button>
      </form>
    </div>
  </template>
  
  <script>

  import axios from 'axios';
  import router from '../router/index.js'; // Import your Vue Router instance.


  export default {
    data() {
      return {
        id: '',
        password: '',
      };
    },
    methods: {
        async submit() {
            try {
            const response = await axios.post('http://localhost:3000/login', {
                userId: this.id,
                password: this.password,
            });

            console.log(response)
            sessionStorage.setItem('accessToken', response.data.accessToken);
            
            // 로그인 성공시 처리 코드 작성
            // response.data에 서버로부터 받은 데이터가 들어있음.
            router.push('/dashboard')
            
            } catch (error) {
            // 로그인 실패시 처리 코드 작성
            // error.message에 에러 메시지가 들어있음.
            }
        },
    },
  };
  </script> -->