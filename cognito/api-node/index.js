const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post('/token', (req, res) => {
  const clientId = process.env.CLIENT_ID;
  const redirectUri = encodeURIComponent('http://localhost:8080/callback');
  const options = {
    url: `${process.env.COGNITO_URL}/oauth2/token?grant_type=authorization_code&client_id=${clientId}&code=${req.body.code}&redirect_uri=${redirectUri}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    // auth: {
    //   user: 'your_client_id',
    //   pass: 'your_client_secret'
    // }손배
  };

  axios(options).then(function (response) {
    if (response.status == 200) {
      const data = response.data;

      console.log(data)
      res.cookie('refreshToken', data.refresh_token, { httpOnly: true });
      // 액세스 토큰과 리프레시 토큰을 저장
      // 실제 서비스에서는 사용자 식별 정보와 함께 안전하게 저장되어야 합니다.  
      res.json({
        accessToken: data.access_token,
        redirectUrl: 'http://localhost:8080/dashboard',
        message: 'Tokens are set in cookies, session storage',
      });

    } else {
      res.json({ error: 'Failed to get tokens.' });
    }
  })
    .catch(function (error) {
      console.log(error);
    });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});