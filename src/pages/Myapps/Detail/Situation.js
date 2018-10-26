import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import {
  Row,
  Col,
  Icon,
  Card,
  Tooltip
} from 'antd';
import { Bar } from '@/components/Charts';
import ExtraDatePicker from '@/components/ExtraDatePicker';
import DescriptionList from '@/components/DescriptionList';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { getTimeDistance } from '@/utils/utils';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import styles from './Situation.less';

const { Description } = DescriptionList;

@connect(({ situation, loading }) => ({
  situation,
  loading: loading.effects['situation/fetch'],
}))
class Situation extends Component {
  constructor(props) {
    super(props);

    this.params = {
      id: this.props.location.search.split('?')[1]
    }

    this.state = {
      loading: true,
      rangePickerValue: getTimeDistance('year'),
      copied: false,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'situation/fetchApp',
        payload: this.params.id
      });
      this.timeoutId = setTimeout(() => {
        this.setState({
          loading: false,
        });
      }, 600);
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'situation/clear',
    });
    cancelAnimationFrame(this.reqRef);
    clearTimeout(this.timeoutId);
  }

  calledPath = { type: 'situation/called' }

  copyToClipboard = (params) => {
    if (window.clipboardData) {
      window.clipboardData.clearData();
      window.clipboardData.setData("Text", params);
      alert('复制成功！')
    } else {
      alert(params)
    } 
  }

  render() {
    const { situation } = this.props;
    const {
      calledData,
      headerData,
      authpriv
    } = situation;

    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    return (
      <GridContent>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={6} xs={24}>
                <Info title="累计终端" value={headerData.cumulativeTerminal} bordered />
              </Col>
              <Col sm={6} xs={24}>
                <Info title="剩余终端" value={headerData.remainingTerminal} bordered />
              </Col>
              <Col sm={6} xs={24}>
                <Info title="累计点数" value={headerData.cumulativePoints} bordered />
              </Col>
              <Col sm={6} xs={24}>
                <Info title="剩余点数" value={headerData.remainingPoints} />
              </Col>
            </Row>
          </Card>
        </div>
        
        {/* 授权信息 */}

        <Card
          bordered={false}
          bodyStyle={{ padding: 0 }}
          style={{ marginTop: 24 }}
          title={<FormattedMessage
            id="myapps.detail.situation.info"
            defaultMessage="App Ranking" />}
        >
          <div>
            <Row style={{ marginTop: 24 }}>
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <DescriptionList size="large" style={{ marginBottom: 32 }}>
                  <ul className={styles.authInfo}>
                    <li>
                      <Description term="appKey" >
                        <span>{authpriv.appKey}
                          <CopyToClipboard 
                            text={authpriv.appKey}
                            onCopy={() => this.setState({ copied: true })}
                            className={styles.copyToClipboard }
                          >
                            <span>复制</span>
                          </CopyToClipboard>
                        </span>
                      </Description>
                      
                    </li>
                    <li>
                      <Description term="devKey" >
                        <span>{authpriv.devKey}
                          <CopyToClipboard
                            text={authpriv.devKey}
                            onCopy={() => this.setState({ copied: true })}
                            className={styles.copyToClipboard}
                          >
                            <span>复制</span>
                          </CopyToClipboard>
                        </span>
                      </Description>
                    </li>
                    <li>
                      <Description term="调用地址" >
                        <span>{authpriv.address}
                          <CopyToClipboard
                            text={authpriv.address}
                            onCopy={() => this.setState({ copied: true })}
                            className={styles.copyToClipboard}
                          >
                            <span>复制</span>
                          </CopyToClipboard>
                        </span>
                        <span>
                          <Tooltip
                            title={
                              <FormattedMessage id="myapps.detail.resource.download" defaultMessage="resource download" />
                            }
                          >
                            <Icon type="question-circle" theme="outlined" />
                          </Tooltip>
                        </span>
                        
                      </Description>
                    </li>
                    <li>
                      <Description term="应用状态" >
                        <span>{authpriv.status}</span>
                        <span>
                          <Tooltip
                            title={
                              <FormattedMessage id="myapps.detail.resource.download" defaultMessage="resource download" />
                            }
                          >
                            <Icon type="question-circle" theme="outlined" />
                          </Tooltip>
                        </span>
                      </Description>
                    </li>
                  </ul>
                </DescriptionList>
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <DescriptionList size="large" style={{ marginBottom: 32 }}>
                  <ul className={styles.authInfo}>
                    <li>
                      <Description term="授权终端数量" >
                        <span>{authpriv.number}</span>
                      </Description>
                    </li>
                    <li>
                      <Description term="云端每日点数" >
                        <span>{authpriv.points}</span>
                      </Description>
                    </li>
                    <li>
                      <Description term="授权到期时间" >
                        <span>{authpriv.date}</span>
                      </Description>
                    </li>
                    <li>
                      <Description term="授权类型" >
                        <span>{authpriv.type}</span>
                        <span>
                          <Tooltip
                            title={
                              <FormattedMessage id="myapps.detail.resource.download" defaultMessage="resource download" />
                            }
                          >
                            <Icon type="question-circle" theme="outlined" />
                          </Tooltip>
                        </span>
                      </Description>
                    </li>
                  </ul>
                </DescriptionList>
              </Col>
            </Row>
          </div>
        </Card>

        {/* 调用统计 */}
      
        <Card 
          bordered={false} 
          bodyStyle={{ padding: 0 }} 
          style={{ marginTop: 24 }}
          title={<FormattedMessage
            id="myapps.detail.situation.called"
            defaultMessage="App Ranking" />}
          extra={<ExtraDatePicker dispatch={this.props.dispatch} request={this.calledPath}></ExtraDatePicker>}>
          <div className={styles.salesCard}>
            <Row style={{ marginTop: 24 }}>
              <Col xl={24} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesBar}>
                  <Bar
                    height={295}
                    data={calledData}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Card>

      </GridContent>
    );
  }
}

export default Situation;
