import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Table, Select, Tooltip, Icon, Button, Upload, Checkbox } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import {
    ChartCard,
    MiniArea,
    MiniBar,
    MiniProgress,
    Field,
    Bar,
    Pie,
    TimelineChart,
} from '@/components/Charts';
import GridContent from '@/components/PageHeaderWrapper/GridContent';

import styles from './Terminal.less';

@connect(({ files, loading }) => ({
    files,
    loading: loading.effects['files/fetchSource', 'files/fetchGrammar']
}))
class Terminal extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'files/fetchSource',
        });

        dispatch({
            type: 'files/fetchGrammar',
        });
    }

    render() {
        const { files, loading } = this.props;
        const { sourceFile, grammarFile } = files;
        
        return (
            <GridContent>

                
                {/* 生成授权 */}
                <Card title={
                    <FormattedMessage
                        id="myapps.detail.terminal.generate"
                        defaultMessage="generate" />
                }
                style={{ marginTop: 24}}
                bordered={false}>
                    <Fragment>
                        <span>上传设备信息：</span>
                        <Upload fileList={[]}>
                            <div className={styles.button_view}>
                                <Button icon="upload">
                                    <FormattedMessage id="myapps.detail.resource.upload" defaultMessage="Upload file" />
                                </Button>
                            </div>
                        </Upload>
                        <div style={{ marginLeft: 100, marginTop: 10, }}>
                            <a onClick={this.toggleForm}>下载导入模板</a>
                        </div>
                        <div style={{ marginLeft: 100, marginTop: 10, }}>
                            <Checkbox onChange={this.onChange}>我已经阅读<a onClick={this.toggleForm}>《离线授权生成说明》</a></Checkbox>
                        </div>
                        <div style={{ marginLeft: 100, marginTop: 10, marginBottom: 20 }}>
                            <Button type="primary" htmlType="submit" >生成授权</Button>
                            <Button htmlType="submit" style={{ marginLeft: 20 }}>下载授权</Button>
                        </div>
                    </Fragment>
                </Card>

                {/* 终端设备 */}
                <Card title={
                    <FormattedMessage
                        id="myapps.detail.terminal.equipment"
                        defaultMessage="terminal equipment" />
                }
                    style={{ marginTop: 24 }}
                    bordered={false}>
                    <Fragment>
                        <span>终端设备信息
                            <Tooltip
                                title={
                                    <FormattedMessage id="myapps.detail.resource.download" defaultMessage="resource download" />
                                }
                            >
                                <Icon type="question-circle" theme="outlined" style={{ marginLeft: 5 }} />
                            </Tooltip>
                            ：
                        </span>
                        <Button type="primary" htmlType="submit" style={{ marginLeft: 20 }}>打包下载</Button>
                    </Fragment>
                </Card>

                {/* 硬件激活码 */}
                <Card title={
                    <FormattedMessage
                        id="myapps.detail.terminal.code"
                        defaultMessage="code" />
                }
                    style={{ marginTop: 24 }}
                    bordered={false}>
                    <Fragment>
                        <span>上传设备信息：</span>
                        <Upload fileList={[]}>
                            <div className={styles.button_view}>
                                <Button icon="upload">
                                    <FormattedMessage id="myapps.detail.resource.upload" defaultMessage="Upload file" />
                                </Button>
                            </div>
                        </Upload>
                        <div style={{ marginLeft: 100, marginTop: 10, }}>
                            <a onClick={this.toggleForm}>下载导入模板</a>
                        </div>
                        <div style={{ marginLeft: 100, marginTop: 10, }}>
                            <Checkbox onChange={this.onChange}>我已经阅读<a onClick={this.toggleForm}>《硬件激活码生成说明》</a></Checkbox>
                        </div>
                        <div style={{ marginLeft: 100, marginTop: 10, marginBottom: 20 }}>
                            <Button type="primary" htmlType="submit" >生成激活码</Button>
                            <Button htmlType="submit" style={{ marginLeft: 20 }}>下载激活码</Button>
                        </div>
                    </Fragment>
                </Card>
            

            
            </GridContent>
        );
    }
}

export default Terminal;
