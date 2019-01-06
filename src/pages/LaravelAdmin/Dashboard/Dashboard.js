import React, {Component} from "react"
import {Col, List, Row} from "antd"

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

export default class Dashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col span={8} style={{bgColor:"white"}}>
            <List
              header={<div>Environment</div>}
              bordered
              dataSource={data}
              renderItem={item => (<List.Item>{item}</List.Item>)}
            />
          </Col>
        </Row>

      </React.Fragment>
    )
  }
}
