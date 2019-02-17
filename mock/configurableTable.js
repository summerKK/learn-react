import {parse} from "url"

let list = []

const dataSource = [
  {
    name: 'Summer',
    age: 0,
    address: 'New York No. 1 Lake Park',
  },
  {
    name: 'Sunny',
    age: 0,
    address: 'London No. 1 Lake Park',
  },
  {
    name: 'Joe Black',
    age: 0,
    address: 'Sidney No. 1 Lake Park',
  },
]

for (let i = 0; i < 100; i++) {
  let data = {
    id: i,
    ...dataSource[i % dataSource.length],
    age: i + 1,
    description: `My name is John Brown, I am ${i} years old, living in New York No. ${i} Lake Park.`,
  }
  list.push(data)
}

function getList(req, res, u) {
  let url = u
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url
  }

  const params = parse(url, true).query

  let dataSource = list

  // 排序 column_desc|asc
  if (params.sorter) {
    const s = params.sorter.split('_')
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'desc') {
        return next[s[0]] - prev[s[0]]
      }
      return prev[s[0]] - next[s[0]]
    })
  }

  let pageSize = 10
  if (params.pageSize) {
    pageSize = parseInt(params.pageSize)
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
  'GET /api/laravel/configureable-table/list': getList,
}
