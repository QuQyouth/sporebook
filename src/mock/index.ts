
import Mock from 'mockjs'
import { MockMethod } from 'vite-plugin-mock';
import UserInfo from './data/userInfo'

// Mock.mock(url, template): 拦截请求地址为url的ajax请求, 并根据数据模板template生成模拟数据

// 登录
Mock.mock('/api/v1/session', 'post', UserInfo.session )

Mock.mock('/api/v1/getUserInfoList', 'get' ,UserInfo.getList); // 查
Mock.mock('/userInfo/create', 'post' ,UserInfo.create); // 增


export default Mock