import {Component} from "react"
import {Divider, Icon} from "antd"

const conlumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 150,
    render: text => <a href="javascript:;">{text}</a>
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: 70,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    width: 300,
    render: (text, record) => {
      <span>
        <a href="javascript:;">Action - {record.name}</a>
        <Divider type="vertical"/>
        <a href="javascript:;">Delete</a>
        <Divider type="vertical"/>
        <a href="javascript:;" className="ant-dropdown-link">
          More Actions <Icon type="down"/>
        </a>
      </span>
    }
  },
]

class ConfigurableTable extends Component {

  render() {
    return (
      <div>
        Hello World
      </div>
    )
  }
}

export default ConfigurableTable
