// import { IncomingWebhook } from '@slack/client';

// import { SLACK_WEBHOOK_EXTERNAL_API_ERROR_URL, SLACK_WEBHOOK_SERVER_ERROR_URL } from '@core-constant/src/environment';

// export const serverErrorNotification = ({ exception, errorMessage, errorStack }) => {
//   const webhook = new IncomingWebhook(SLACK_WEBHOOK_SERVER_ERROR_URL);

//   webhook.send({
//     attachments: [
//       {
//         color: 'danger',
//         text: '🚨 서버 에러 🚨',
//         fields: [
//           {
//             title: `에러 메세지 : ${errorMessage}`,
//             value: '```' + JSON.stringify(exception, null, 3) + '```',
//             short: false,
//           },
//           {
//             title: `Stack`,
//             value: '```' + errorStack + '```',
//             short: false,
//           },
//         ],
//         ts: Math.floor(new Date().getTime() / 1000).toString(),
//       },
//     ],
//   });
// };

// export const externalApiErrorNotification = ({ exception, errorMessage, errorStack }) => {
//   const webhook = new IncomingWebhook(SLACK_WEBHOOK_EXTERNAL_API_ERROR_URL);

//   webhook.send({
//     attachments: [
//       {
//         color: 'danger',
//         text: '🚨 외부 API 통신 부분의 서버 에러 🚨',
//         fields: [
//           {
//             title: `에러 메세지: ${errorMessage}`,
//             value: '```' + JSON.stringify(exception, null, 3) + '```',
//             short: false,
//           },
//           {
//             title: `Stack`,
//             value: '```' + errorStack + '```',
//             short: false,
//           },
//         ],
//         ts: Math.floor(new Date().getTime() / 1000).toString(),
//       },
//     ],
//   });
// };
