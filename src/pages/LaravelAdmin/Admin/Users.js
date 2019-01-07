import React, {Component} from 'react'
import {Button, Col, Divider, Form, Input, Modal, Row, Table, Tag} from 'antd'
import {connect} from "dva"
import stlyes from './User.less'

const FormItem = Form.Item

const CreateForm = Form.create()(props => {
  const {modalVisible, form, handleAdd, handleModalVisible} = props
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return
      form.resetFields()
      handleAdd(fieldsValue)
    })
  }
  return (
    <Modal
      destroyOnClose
      title="新建规则"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="描述">
        {form.getFieldDecorator('desc', {
          rules: [{required: true, message: '请输入至少五个字符的规则描述!', min: 5}],
        })(<Input placeholder="请输入"/>)}
      </FormItem>
    </Modal>
  )
})

// laravelUsers 要对应model里面的 namespace
@connect(({laravelUsers, loading}) => ({
  laravelUsers,
  loading: loading.models.laravelUsers
}))
class Users extends Component {

  state = {
    modalVisible: false,
  }

  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      redner: text => <a href="javascript:;">{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <span>
          {tags.map(tag => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="javascript:;">Invite {record.name}</a>
          <Divider type="vertical"/>
          <a href="javescript:;">Delete</a>
        </span>
      ),
    },
  ];

  componentDidMount() {
    const {dispatch} = this.props
    dispatch({
      type: 'laravelUsers/queryList',
      payload: {},
    })
  }

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    })
  }

  render() {
    const {
      laravelUsers: {data},
      loading,
    } = this.props
    const {modalVisible} = this.state

    const parentMethods = {
      handleAdd: () => (alert('SUCCESS')),
      handleModalVisible: this.handleModalVisible
    }

    return (
      <React.Fragment>
        <div className={stlyes.tableList}>
          <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
            新建
          </Button>
        </div>
        <CreateForm modalVisible={modalVisible} {...parentMethods} />
        <Row>
          <Col>
            <Table dataSource={data.list} columns={this.columns}/>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Users
