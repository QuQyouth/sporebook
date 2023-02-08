import Mock, { Random } from 'mockjs';
import {MockMethod} from 'vite-plugin-mock'
const list:any = [];
const tagsList:any = []
const ItemList:any = []
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

for (let i = 0; i < 10; i++) {
    tagsList.push({
        id: Random.id(),
        kind: Mock.mock(/expenditure|income/),
        sign: Random.image(),
        name: Mock.mock(/吃饭|购物|交通|住房/),
    })
    
}


// ItemsList
for (let i = 0; i < 20; i++) {
    ItemList.push({
        id: Random.id(),
        kind: Mock.mock(/expenditure|income/),
        name: Mock.mock(/吃饭|购物|交通|住房/),
        amount: Random.natural(1,500).toString(),
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
    getTagsList:()=>{
        return {
            total: tagsList.length,
            tagsList: tagsList
        }
    },
    getItemList:() => {
        return {
            total: ItemList.length,
            ItemList: ItemList
        }
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