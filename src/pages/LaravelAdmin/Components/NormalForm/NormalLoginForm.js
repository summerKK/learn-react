import { Button, Checkbox, Form, Icon, Input } from 'antd'
import React from 'react'
import styles from './index.less'


@Form.create()
class NormalLoginForm extends React.PureComponent {

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
      }
    })
  }

  render() {

    const { getFieldDecorator } = this.props.form

    return (
      <div>
        <Form onSubmit={this.handleSubmit} className={styles.loginForm}>
          <Form.Item>
            {
              getFieldDecorator('userName', {
                rules: [{ required: true, message: '请输入姓名' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>} placeholder="username"/>,
              )
            }
          </Form.Item>
          <Form.Item>
            {
              getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>} placeholder="password"/>,
              )
            }
          </Form.Item>
          <Form.Item>
            {
              getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>Remember me</Checkbox>,
              )
            }
            <a className={styles.loginFormForgot} href="">Forgot password</a>
            <Button htmlType="submit" type="primary" className={styles.loginFormButton}>
              Login
            </Button>
            Or <a href="">register now!</a>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default NormalLoginForm
