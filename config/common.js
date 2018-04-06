const baseMerchantUrl = '/invoice-admin-war';
const basePicUrl = '';
const baseFileUrl = '';

const redirect = 'http://passport.test.swiftpass.cn/sppay-passport-war/loginUI?redirect='; //测试环境
// const redirect = 'http://login.swiftpass.cn/sppay-passport-war/loginUI?redirect='; //线上环境

const commonData = {
    baseMerchantUrl,
    basePicUrl,
    baseFileUrl,
    redirect
};

export default commonData;