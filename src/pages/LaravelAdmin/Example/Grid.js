import {Component} from "react"
import {Affix, Button, Col, Row} from "antd"
import styles from "./Grid.less"


export default class Grid extends Component {
  render() {
    return (
      <div className={styles.gutterExample}>
        <Row type="flex" justify="start">
          <Col span={4} className={styles.gutterRow}>col-4</Col>
          <Col span={4}>col-4</Col>
          <Col span={4}>col-4</Col>
          <Col span={4}>col-4</Col>
        </Row>

        <Affix offsetTop={120} onChange={affixed => console.log(affixed)}>
          <Button>120px to affix top</Button>
        </Affix>,
      </div>
    )
  }
}
