const axios = require('axios');

exports.handler = async (event, context) => {
  console.log(event.events[0]);

  let url = 'https://covid19-japan-web-api.now.sh/api/v1/prefectures';
  // covid-japan-apiへリクエスト
  const res = await axios.get(url);

  let covid_json = res.data;
  console.log('covid_json:', covid_json);

  // LINE応答メッセージのリクエスト情報を定義
  const header = {
    "Content-Type": "application/json",
    // 環境変数からLINEチャネルアクセストークンを取得
    "Authorization": "Bearer " + process.env["LINE_CHANNEL_ACCESS_TOKEN"],
  };

  let message = [];
  if (event.events[0].message.text.includes('コロナ')) {
    if (event.events[0].message.text.includes('神奈川')) {
      message.push({
        "type": "text",
        "text": "感染者数　　：" + covid_json[13]["cases"] + '人\n' +
          "死者数　　　：" + covid_json[13]["deaths"] + '人\n' +
          "ＰＣＲ検査数：" + covid_json[13]["pcr"] + '人\n' +
          "入院者数　　：" + covid_json[13]["hospitalize"] + '人\n' +
          "退院者数　　：" + covid_json[13]["discharge"] + '人'
      });
      console.log(message);
    } else if (event.events[0].message.text.includes('東京')) {
      message.push({
        "type": "text",
        "text": "感染者数　　：" + covid_json[12]["cases"] + '人\n' +
          "死者数　　　：" + covid_json[12]["deaths"] + '人\n' +
          "ＰＣＲ検査数：" + covid_json[12]["pcr"] + '人\n' +
          "入院者数　　：" + covid_json[12]["hospitalize"] + '人\n' +
          "退院者数　　：" + covid_json[12]["discharge"] + '人'
      });
      console.log(message);
    } else if (event.events[0].message.text.includes('埼玉')) {
      message.push({
        "type": "text",
        "text": "感染者数　　：" + covid_json[10]["cases"] + '人\n' +
          "死者数　　　：" + covid_json[10]["deaths"] + '人\n' +
          "ＰＣＲ検査数：" + covid_json[10]["pcr"] + '人\n' +
          "入院者数　　：" + covid_json[10]["hospitalize"] + '人\n' +
          "退院者数　　：" + covid_json[10]["discharge"] + '人'
      });
      console.log(message);
    } else if (event.events[0].message.text.includes('大阪')) {
      message.push({
        "type": "text",
        "text": "感染者数　　：" + covid_json[26]["cases"] + '人\n' +
          "死者数　　　：" + covid_json[26]["deaths"] + '人\n' +
          "ＰＣＲ検査数：" + covid_json[26]["pcr"] + '人\n' +
          "入院者数　　：" + covid_json[26]["hospitalize"] + '人\n' +
          "退院者数　　：" + covid_json[26]["discharge"] + '人'
      });
      console.log(message);
    } else {
      message.push({ "type": "text", "text": "都府県名を入力して" });
      console.log(message);
    }
  } else {
    message.push({ "type": "text", "text": "no data" });
    console.log(message);
  }

  const data_obj = {
    // 応答用トークンとメッセージオブジェクトを設定
    "replyToken": event.events[0]["replyToken"],
    "messages": message
  };

  let line_url = 'https://api.line.me/v2/bot/message/reply';

  const result = await axios.post(line_url, data_obj, {
    //method: 'post',
    //url: 'https://api.line.me/v2/bot/message/reply',
    //data: JSON.stringify(data_obj),
    headers: header
  });
  context.succeed(result);
}; 
