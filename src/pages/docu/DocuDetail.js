import React, { PureComponent } from 'react';
import { Anchor } from 'antd';
const { Link } = Anchor;
import styles from './DocuDetail.less';

class DocuDetail extends PureComponent {

    render(){
        return (
            

            <div style={{position:'relative'}}>
                < Anchor getContainer={() => document.getElementById('content')} affix={true} className={styles.anachor}>
                    <Link href="#components-anchor-demo-basic" title="Basic demo" />
                    <Link href="#components-anchor-demo-fixed" title="Fixed demo" />
                    <Link href="#API" title="API">
                        <Link href="#Anchor-Props" title="Anchor Props" />
                        <Link href="#Link-Props" title="Link Props" />
                    </Link>
                </Anchor >
                <div id='content'>
                    <div id='components-anchor-demo-basic'>basic</div>
                    <div id='components-anchor-demo-fixed'>fixed</div>
                    <div id='API'>API</div>
                    <div id='Anchor-Props'>Anchor-Props</div>
                    <div id='Link-Props'>Link-Props</div>
                </div>

            </div>
        )
            
    }
}

export default DocuDetail;
