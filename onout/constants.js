import env from 'dotenv';

const { parsed } = env.config();

export default {
  accessCodePaymentLink: ACCESS_CODE_PAYMENT_LINK,
  accessCode: ACCESS_CODE,
};
