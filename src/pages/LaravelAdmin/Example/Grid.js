import { Button, Col, DatePicker, Form, Icon, Input, Row } from 'antd'
import React from 'react'
import styles from './Grid.less'
import NormalLoginForm from '@/pages/LaravelAdmin/Components/NormalForm/NormalLoginForm'

const { RangePicker } = DatePicker
const FormItem = Form.Item

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(filed => fieldsError[filed])
}

@Form.create()
export default class Grid extends React.Component {

  componentDidMount() {
    this.props.form.validateFields()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form:', values)
      }
    })
  }

  render() {

    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
    } = this.props.form

    const userNameError = isFieldTouched('userName') && getFieldError('userName')
    const passwordError = isFieldTouched('password') && getFieldError('password')

    return (
      <div className={styles.gutterExample}>
        <Row>
          <Col span={12}>
            <RangePicker format="DD/MM/YYYY" showTime/>
          </Col>
        </Row>

        <Row>
          <Col span={16}>
            <Form layout="inline" onSubmit={this.handleSubmit}>
              <FormItem
                validateStatus={userNameError ? 'error' : 'success'}
                help={userNameError || ''}
              >
                {
                  getFieldDecorator('userName', {
                    rules: [{ required: true, message: 'Please input you username!' }],
                  })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>} placeholder="username"/>,
                  )
                }
              </FormItem>
              <FormItem
                validateStatus={passwordError ? 'error' : 'success'}
                help={passwordError || ''}
              >
                {
                  getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input you password!' }],
                  })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>} placeholder="password"/>,
                  )
                }
              </FormItem>
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={hasErrors(getFieldsError())}
                >
                  Log in
                </Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <NormalLoginForm/>
          </Col>
        </Row>
      </div>
    )
  }
}
