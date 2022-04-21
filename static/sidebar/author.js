'use strict';

const {Card, Icon, Image, Button} = semanticUIReact;

class Author extends React.Component {
    hide() {
        $('#author').hide();
    }

    render() {

        const linkStyle = {
            'text-align': 'center',
        };

        return (
            <Card>
                <Image src='/img/author.png' wrapped ui={false}/>
                <Card.Content>
                    <Card.Header>Hobee Liu (Author)</Card.Header>
                    <Card.Meta>
                        <span className='date'>Senior student at BUAA</span>
                    </Card.Meta>
                    <Card.Description>
                        Hobee Liu is an undergraduate student in School of economics and management of Beihang University, majoring in information system and information management.
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <p style={linkStyle}>
                        <a href='mailto:lzqpublic@163.com'><Icon name='mail'/></a>
                        <a><Icon name='facebook'/></a>
                        <a><Icon name='telegram'/></a>
                        <a><Icon name='twitter'/></a>
                        <a><Icon name='linkedin'/></a>
                        <a href='https://github.com/HoBeedzc'><Icon name='github'/></a>
                    </p>
                    <div className='ui two buttons'>
                        <Button basic color='green' onClick={() => {window.location.href="http://zequn.top/"}}>
                            More info
                        </Button>
                        <Button basic color='red' onClick={() => this.hide()}>
                            Hide it
                        </Button>
                    </div>
                </Card.Content>
            </Card>
        );
    }
}

ReactDOM.render(
    <Author/>,
    document.getElementById('author')
);