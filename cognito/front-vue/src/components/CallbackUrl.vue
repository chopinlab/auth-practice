<template>
  <div>
    <!-- 인증 코드를 처리한 후 결과를 보여줄 페이지 -->
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      isLoading: true,
      message: '',
    };
  },
  async created() {
    try {
      const code = new URL(window.location.href).searchParams.get('code');
      
      // API 서버로 인증 코드를 보내 access token을 얻는 요청을 보냅니다.
      const response = await axios.post('http://localhost:3000/token', {
        code: code,
      });
      console.log(response)
      // 응답을 받아 세션 저장소에 저장합니다.
      sessionStorage.setItem('accessToken', response.data.accessToken);
      // sessionStorage.setItem('refreshToken', response.data.refreshToken);

      // 결과 메시지를 설정합니다.
      this.message = 'Login Success!';
      // this.$router.push('/dashboard');
      window.location.href = response.data.redirectUrl;

    } catch (error) {
      // 에러 메시지를 설정합니다.
      this.message = `Login Fail: ${error.message}`;
    } finally {
      this.isLoading = false;
    }
  },
};
</script>