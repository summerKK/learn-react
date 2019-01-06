import React, {Component} from 'react';
import {Col, Divider, Row, Table, Tag} from 'antd';
import {connect} from "dva";

// laravelUsers 要对应model里面的namespace
@connect(({laravelUsers, loading}) => ({
  laravelUsers,
  loading: loading.models.laravelUsers
}))
export default class Users extends Component {

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
      payload:{},
    })
  }

  render() {
    const {
      laravelUsers: {data},
      loading,
    } = this.props
    return (
      <React.Fragment>
        <Row>
          <Col>
            <Table dataSource={data.list} columns={this.columns}/>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
