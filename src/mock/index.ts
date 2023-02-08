
import Mock from 'mockjs'
import { MockMethod } from 'vite-plugin-mock';
import UserInfo from './data/userInfo'

// Mock.mock(url, template): 拦截请求地址为url的ajax请求, 并根据数据模板template生成模拟数据

// 登录
Mock.mock('/api/v1/session', 'post', UserInfo.session )

Mock.mock('/api/v1/getTagsList', 'get' ,UserInfo.getTagsList)
Mock.mock('/api/v1/getItemList', 'get' ,UserInfo.getItemList)

Mock.mock('/api/v1/getUserInfoList', 'get' ,UserInfo.getList); 
Mock.mock('/api/v1/tagCreate', 'post' ,UserInfo.create); 
Mock.mock('/api/v1/ItemCreate', 'post' ,UserInfo.create); 


export default Mock