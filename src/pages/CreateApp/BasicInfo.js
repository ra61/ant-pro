import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Icon,
  Checkbox,
  Tooltip,
  Upload 
} from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import UploaderImage from '@/components/UploaderImage';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const FormItem = Form.Item;
const { TextArea } = Input;

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
class BasicInfo extends PureComponent {
  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  render() {
    const { submitting } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderWrapper title='创建应用'>

        <GridContent>
          <Card bordered={false} title="基本信息">
            <Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
              <FormItem {...formItemLayout} label="应用名称" help="中文/英文/数字字符1-20位" >
                {getFieldDecorator('title', {
                  rules: [
                    {
                      required: true,
                      message: '请输入标题',
                    },
                  ],
                })(<Input placeholder="请输入应用名称" />)}
              </FormItem>

              <FormItem {...formItemLayout} label="应用分类" >
                  {getFieldDecorator('type', {
                    rules: [
                      {
                        required: true,
                        message: '请选择应用分类',
                      },
                    ],
                    initialValue: 'a'
                  })(
                  <Radio.Group>
                      <Radio value="a">系统</Radio>
                      <Radio value="b">学习</Radio>
                      <Radio value="c">辅助</Radio>
                      <Radio value="d">其他</Radio>
                    </Radio.Group>
                  )}
              </FormItem>

              <FormItem {...formItemLayout} label="应用描述">
                {getFieldDecorator('goal', {
                  rules: [
                    {
                      message: '请输入应用描述',
                    },
                  ],
                })(
                  <TextArea
                    style={{ minHeight: 32 }}
                    placeholder="请输入应用描述"
                    rows={4}
                  />
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="应用平台" >
                {getFieldDecorator('platform', {
                  rules: [
                    {
                      required: false,
                      message: '请选择应用分类',
                    },
                  ],
                  initialValue: '1'
                })(
                  <Radio.Group >
                    <Radio.Button value="1">安卓</Radio.Button>
                    <Radio.Button value="2">IOS</Radio.Button>
                    <Radio.Button value="3">Java</Radio.Button>
                    <Radio.Button value="4">Linux</Radio.Button>
                    <Radio.Button value="5">Windows</Radio.Button>
                    <Radio.Button value="6">其他</Radio.Button>
                  </Radio.Group>
                )}
              </FormItem>

              <FormItem {...formItemLayout} label={
                <span>
                  选择能力
                  <Tooltip
                    title={
                      <FormattedMessage id="myapps.detail.resource.download" defaultMessage="resource download" />
                    }
                  >
                    <Icon type="question-circle" theme="outlined" style={{marginLeft:5}}/>
                  </Tooltip>
                </span>
              } >
                {getFieldDecorator('ability', {
                  rules: [
                    {
                      required: true,
                      message: '请选择能力',
                    },
                  ],
                  initialValue: '1'
                })(
                  <div>
                    <Checkbox value="1">语音识别</Checkbox>
                    <Checkbox value="2">语音合成</Checkbox>
                    <Checkbox value="3">图像识别</Checkbox>
                    <Checkbox value="4">策划省略</Checkbox>
                  </div>
                )}
              </FormItem>

              {/* <FormItem {...formItemLayout} label="应用图标" help="支持扩展名：.jpg .png">
                {getFieldDecorator('title', {
                  rules: [
                    {
                      message: '请输入标题',
                    },
                  ],
                })(<UploaderImage></UploaderImage>)}
              </FormItem> */}

              <FormItem>
                {getFieldDecorator('protocol')(
                  <div style={{marginLeft:120}}>
                    <Checkbox onChange={this.onChange}>我已接受<a onClick={this.toggleForm}>《灵云开发调试期客户端授权合作协议》</a></Checkbox>
                  </div>
                )}
              </FormItem>
              
              <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                <Button type="primary" htmlType="submit" loading={submitting}>
                  提交
                </Button>
              </FormItem>
            </Form>
          </Card>
        </GridContent>
      </PageHeaderWrapper>

      
    );
  }
}

export default BasicInfo;
