import React from 'react';
import {Segment, Image, Header} from 'semantic-ui-react';

class BrandInfo extends React.Component {
    render() {
        return (
            <Segment>
                <Image src={process.env.PUBLIC_URL + '/img/count.png'} size='medium' circular/>
                <Header as='h6' textAlign='center'> CreditCount by Hobee <br/> Version Beta V1.2.0 </Header>
            </Segment>
        );
    }
}

class ThanksAndCopyrightInfo extends React.Component {
    render() {

        const textStyle = {
            'text-align': 'center',
        };

        return (
            <Segment>
                <p style={textStyle}>
                    Rendered by <a href="https://reactjs.org/"> React.js </a>.<br/>
                    Layout by <a href="https://react.semantic-ui.com/elements/segment/"> Semantic UI </a>.<br/>
                    Powered by Github Pages.<br/>
                    Thanks to <a href="https://www.iconfont.cn/"> Alibaba Iconfront </a>.</p>
                <Header as='h6' textAlign='center'> (C)copyright 2021-2023 Hobee. <br/> All Rights Reserved.</Header>
            </Segment>
        );
    }
}

class Copyright extends React.Component {
    render() {
        return (
            <Segment.Group>
                <BrandInfo/>
                <ThanksAndCopyrightInfo/>
            </Segment.Group>
        );
    }
}

export default Copyright;