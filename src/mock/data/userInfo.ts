import Mock, { Random } from 'mockjs';
import {MockMethod} from 'vite-plugin-mock'
const list:any = [];
const tagList:any = []
const ItemList: ItemList = []
for (let i = 0; i < 20; i++) {
    list.push({
        uerId: Random.id(),
        email: Random.email(),
        tags: [{
            tagId: Random.id(),
            // kind: @RegExp(/expenditure|income/),
            kind: Mock.mock({'regexp':/expenditure|income/}),
            sign: Random.image(),
            name: Random.cword(1,3),
        }],
        Items: [{
            ItemId: Random.id(),
            kind: Mock.mock({'regexp':/expenditure|income/}),
            tag: {
                tagId: Random.id(),
                kind: Mock.mock({'regexp':/expenditure|income/}),
                sign: Random.image(),
                name: Random.cword(1,3)
            },
            amount: Random.natural(1,500),
            time: Random.datetime()
        }]
    })
}
for (let i = 0; i < 20; i++) {
    ItemList.push({
        id: Random.id(),
        kind: Mock.mock({'regexp':/expenditure|income/}),
        tag: {
            id: Random.id(),
            kind: Mock.mock({'regexp':/expenditure|income/}),
            sign: Random.image(),
            name: Random.cword(1,3)
        },
        amount: Random.natural(1,500),
        time: Random.datetime()
        
    })
}
export default {
    // 登录
    session: () => {
        return {
            id: Random.id(),
            email: Random.email(),
            token: Random.word(),
            codeSign: 0,
        }
    },
    // 查
    getList: () => {
        return {
           total: list.length,
           list: list
        }
    },
    getItemList:() => {
        return [200, {
            total: ItemList.length,
            ItemList: ItemList
        }]
    },
    // 增
    create: () => ({
        result: true,
        data: 'success'
    }),
    // 改
    update: () => ({
        result: true,
        data: 'success'
    })
}