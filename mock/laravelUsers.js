import {parse} from "url";

let userList = []

const dataSource = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

for (let i = 0; i < 46; i++) {
  userList.push({
    key: i,
    name: `Joe Black  ${i}`,
    age: 32,
    address: `Sidney No. 1 Lake Park ${i}`,
    tags: ['cool', 'teacher'],
  })
}

function getList(req, res, u) {
  let url = u
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url
  }

  const params = parse(url, true).query

  let dataSource = userList

  if (params.sorter) {
    const s = params.sorter.split('_')
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]]
      } else {
        return prev[s[0]] - next[s[0]]
      }
    })
  }

  let pageSize = 10
  if (params.pageSize) {
    pageSize = params.pageSize * 1
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  }

  return res.json(result)
}

export default {
  'GET /api/laravel/users/list': getList,
}
