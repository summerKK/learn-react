import { Fragment, PureComponent } from 'react'
import { Alert, Table } from 'antd'
import styles from './index.less'

function initTotalList(columns) {
  const totalList = []
  columns.forEach(column => {
    if (column.needTotal) {
      totalList.push({...column, total: 0})
    }
  })

  return totalList
}

class StandardTable extends PureComponent {
  constructor(props) {
    super(props)
    const {columns} = this.props
    const needTotalList = initTotalList(columns)

    this.state = {
      selectedRowKeys: [],
      needTotalList,
    }
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.selectedRows.length === 0) {
      const needTotalList = initTotalList(nextProps.columns)
      return {
        selectedRowKeys: [],
        needTotalList
      }
    }

    return null
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    let {needTotalList} = this.state
    needTotalList = needTotalList.map(item => ({
      ...item,
      total: selectedRows.reduce((sum, val) => sum + parseInt(val[item.dataIndex], 10), 0),
    }))
    const {onSelectRow} = this.props
    if (onSelectRow) {
      onSelectRow(selectedRowKeys)
    }

    this.setState({selectedRowKeys, needTotalList})
  }

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], [])
  }

  handleTableChange = (pagination, filters, sorter) => {
    const { onChange } = this.props
    if (onChange) {
      onChange(pagination, filters, sorter)
    }
  }

  render() {
    const {selectedRowKeys, needTotalList} = this.state
    const {data = {}, rowKey, ...reset} = this.props
    const {list = [], pagination} = data

    // 避免筛选框失效
    if (reset.rowSelection && Object.keys(reset.rowSelection).length === 0) {
      delete reset.rowSelection
    }

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination
    }

    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      })
    }

    return (
      <div className={styles.standardTable}>
        <div className={styles.tableAlert}>
          <Alert
            message={
              <Fragment>
                已选择 <a style={{fontWeight: 600}}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
                {needTotalList.map(item => (
                  <span style={{marginLeft: 8}} key={item.dataIndex}>
                    {item.title}
                    总计&nbsp;
                    <span style={{fontWeight: 600}}>
                      {item.render ? item.render(item.total) : item.total}
                    </span>
                  </span>
                ))}
                <a onClick={this.cleanSelectedKeys} style={{marginLeft: 24}}>清空</a>
              </Fragment>
            }
            type="info"
            showIcon
          />
        </div>
        <Table
          rowKey={rowKey || 'key'}
          rowSelection={rowSelection}
          dataSource={list}
          pagination={paginationProps}
          onChange={this.handleTableChange}
          {...reset}
        />
      </div>
    )
  }
}

export default StandardTable
