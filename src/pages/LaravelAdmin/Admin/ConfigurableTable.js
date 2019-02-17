import {Component} from "react"
import {connect} from "dva"
import {Divider, Form, Icon, Radio, Switch} from "antd"
import StandardTable from "@/pages/LaravelAdmin/Components/StandardTable"
import stlyes from "./configureableTable.less"

const FormItem = Form.Item

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
    needTotal: true,
    render: text => <span>{text}岁</span>
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    width: 300,
  },
  {
    title: 'Action',
    key: 'action',
    width: 300,
    render: (text, record) => (
      <span>
        <a href="javascript:;">Action - {record.name}</a>
        <Divider type="vertical"/>
        <a href="javascript:;">Delete</a>
        <Divider type="vertical"/>
        <a href="javascript:;" className="ant-dropdown-link">
          More Actions <Icon type="down"/>
        </a>
      </span>
    )
  },
]

const expandedRowRender = record => <p>{record.description}</p>
const title = () => 'Here is title'
const showHeader = true
const footer = () => 'Here is footer'
const scroll = {y: 240}
const pagination = {position: 'bottom'}


@connect(({configureableTable, loading}) => ({
  configureableTable,
  loading: loading.models.configureableTable,
}))
class ConfigurableTable extends Component {

  state = {
    selectedRows: [],
    bordered: false,
    loading: false,
    pagination,
    size: 'default',
    expandedRowRender,
    rowSelection: {},
    title: undefined,
    showHeader,
    footer,
    scroll,
    hasData: true,
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {dispatch} = this.props
    dispatch({
      type: 'configureableTable/queryList',
      payload: {},
    })
  }

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    })
  }

  handleToggle = prop => (enable) => {
    this.setState({[prop]: enable})
  }

  handleTitleChange = (enable) => {
    this.setState({title: enable ? title : undefined})
  }

  handleHeaderChange = (enable) => {
    this.setState({showHeader: enable ? showHeader : false})
  }

  handleFooterChange = (enable) => {
    this.setState({footer: enable ? footer : undefined})
  }

  handleExpandChange = (enable) => {
    this.setState({expandedRowRender: enable ? expandedRowRender : undefined})
  }

  handleRowSelectionChange = (enable) => {
    this.setState({rowSelection: enable ? {} : undefined})
  }

  handleScollChange = (enable) => {
    this.setState({scroll: enable ? scroll : undefined})
  }

  handleDataChange = (hasData) => {
    this.setState({hasData})
  }

  handleSizeChange = (e) => {
    this.setState({size: e.target.value})
  }

  handlePaginationChange = (e) => {
    const {value} = e.target
    this.setState({
      pagination: value === 'none' ? false : {position: value},
    });
  }

  render() {

    const {
      configureableTable: {data},
      loading,
    } = this.props

    const state = this.state

    return (
      <div>
        <div className={stlyes.componentsTableDemoControlBar}>
          <Form layout="inline">

            <FormItem label="Bordered">
              <Switch checked={state.bordered} onChange={this.handleToggle('bordered')}/>
            </FormItem>

            <FormItem label="loading">
              <Switch checked={state.loading} onChange={this.handleToggle('loading')}/>
            </FormItem>

            <FormItem label="Title">
              <Switch checked={!!state.title} onChange={this.handleTitleChange}/>
            </FormItem>

            <FormItem label="Column Header">
              <Switch checked={!!state.showHeader} onChange={this.handleHeaderChange}/>
            </FormItem>

            <FormItem label="Footer">
              <Switch checked={!!state.footer} onChange={this.handleFooterChange}/>
            </FormItem>

            <FormItem label="Expandable">
              <Switch checked={!!state.expandedRowRender} onChange={this.handleExpandChange}/>
            </FormItem>

            <FormItem label="Checkbox">
              <Switch checked={!!state.rowSelection} onChange={this.handleRowSelectionChange}/>
            </FormItem>

            <FormItem label="Fixed Header">
              <Switch checked={!!state.scroll} onChange={this.handleScollChange}/>
            </FormItem>

            <FormItem label="Has Data">
              <Switch checked={!!state.hasData} onChange={this.handleDataChange}/>
            </FormItem>

            <FormItem label="Size">
              <Radio.Group size="default" value={state.size} onChange={this.handleSizeChange}>
                <Radio.Button value="default">Default</Radio.Button>
                <Radio.Button value="middle">Middle</Radio.Button>
                <Radio.Button value="small">Small</Radio.Button>
              </Radio.Group>
            </FormItem>

            <FormItem label="Pagination">
              <Radio.Group
                value={state.pagination ? state.pagination.position : 'none'}
                onChange={this.handlePaginationChange}
              >
                <Radio.Button value="top">Top</Radio.Button>
                <Radio.Button value="bottom">Bottom</Radio.Button>
                <Radio.Button value="both">Both</Radio.Button>
                <Radio.Button value="none">None</Radio.Button>
              </Radio.Group>
            </FormItem>

          </Form>
        </div>
        <StandardTable
          {...state}
          data={state.hasData ? data : []}
          columns={conlumns}
          selectedRows={state.selectedRows}
          onSelectRow={this.handleSelectRows}
        />
      </div>
    )
  }
}

export default ConfigurableTable
