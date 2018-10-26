import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}


export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function fakeAccountLogin(params) {
  
  let body = new FormData();

  body.append("userName", params.userName);
  body.append("password", params.password);
  body.append("remember", "on");

  return request('/api2/dev/Appdeveloper/doAjaxLogin', {
    method: 'POST',
    body: body,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}


// sino API

export async function queryPanelData() {
  return request('/api/dashboard/panelData');
}

export async function queryRankingData(params) {
  console.log(params)
  return request('/api2/dev/statistics/getAppRanking', {
      method: 'POST',
      body: params,
    });
}

export async function queryDailyStatisticData() {
  return request('/api2/dev/statistics/getDailyStatistic');
}

export async function queryAbilityStatisticData() {
  return request('/api2/dev/statistics/getAbilityStatistic');
}

export async function queryPhpData() {
  let result = request('/api2/dev/statistics/getAppWarningInfo');
  console.log(result)
  return result;
}

export async function mockLogin() {

  let params = new FormData();

  params.append("account", "15912341234");
  params.append("password", "111111aa");
  params.append("remember", "on");

  let result = request('/api2/dev/appdeveloper/doLogin', {
    method: 'POST',
    body: params
  });

  // /dev/appdeveloper/doLogin
  // account: 15912341234
  // password: 111111aa
  // remember: on

  return result;
}



// 应用列表
export async function queryAppList() {
  return request('/api/app/list');
}

export async function queryAppListPagination(params) {
  console.log(params)
  return request('/api/app/list');
}

// 概况
export async function querySituationAllData() {
  return request('/api/situation/allData');
}

export async function querySituationApp(params) {
  return request(`/api/situation/app?id=${params}`);
}

export async function querySituationCalledData() {
  return request('/api/situation/calledData');
}

// sdk
export async function querySDKList() {
  return request('/api/sdk/list');
}

export async function querySDKInfo() {
  return request('/api/sdk/info');
}

// 文档中心
export async function queryFileCenterList() {
  return request(`/api/fileCenter/list`);
}

export async function queryNoticeList(params) {
  
  let body = new FormData();
  body.append("pageSize", params.pageSize);

  return request('/api2/dev/document/getNoticeList', {
    method: 'POST',
    body: body
  });
}

// 意见反馈
export async function queryFeedbackList() {
  return request('/api/feedback/list');
}

export async function queryFeedbackDetail() {
  return request('/api/feedback/detail');
}

// 应用详情-资源文件
export async function querySourceFile() {
  return request('/api/source/file');
}

export async function queryGrammarFile() {
  return request('/api/grammar/file');
}