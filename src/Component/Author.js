'use strict';
import React from 'react';
import { Card, Icon, Image, Button } from 'semantic-ui-react';

class Author extends React.Component {
    state = { visible: true }

    hide = () => {
        this.setState({ visible: false });
    }

    render() {

        const linkStyle = {
            'text-align': 'center',
        };

        if (!this.state.visible) {
            return (
                <div></div>
            )
        }

        return (
            <Card>
                <Image src={process.env.PUBLIC_URL + '/img/author.png'} wrapped ui={false} />
                <Card.Content>
                    <Card.Header>Hobee (Author)</Card.Header>
                    <Card.Meta>
                        <span className='date'>Senior student at BUAA</span>
                    </Card.Meta>
                    <Card.Description>
                        Hobee is an undergraduate student in School of economics and management of Beihang University, majoring in information system and information management.
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <p style={linkStyle}>
                        <a href='mailto:support@hobee.me'><Icon name='mail' /></a>
                        <a><Icon name='facebook' /></a>
                        <a><Icon name='telegram' /></a>
                        <a><Icon name='twitter' /></a>
                        <a><Icon name='linkedin' /></a>
                        <a href='https://github.com/HoBeedzc'><Icon name='github' /></a>
                    </p>
                    <div className='ui two buttons'>
                        <Button basic color='green' onClick={() => { window.location.href = "https://hobee.me/" }}>
                            More info
                        </Button>
                        <Button basic color='red' onClick={this.hide}>
                            Hide it
                        </Button>
                    </div>
                </Card.Content>
            </Card>
        );
    }
}

export default Author