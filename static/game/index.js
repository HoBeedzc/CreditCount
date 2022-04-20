const { Grid,Button,Segment,Divider,Header,Icon,List } = semanticUIReact

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    getColor() {
        return this.props.value ? 'blue' : 'gery'
    }

    render() {
        const btnStyle = {
            'margin': 0,
            'height': '80px',
            'width': '80px',
            'font-size': '20px',
        }

        return (
            <Button style={btnStyle} basic color={this.getColor()} className="square" onClick={() => this.props.onClick()}>
                {this.props.value}
            </Button>
        );
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            isNextX: true,
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.isNextX ? 'X' : 'O';
        this.setState({
            squares: squares,
            isNextX: !this.state.isNextX
        });
    }

    renderSquare(i) {
        return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>;
    }

    render() {

        const boardStyle = {
            'flex-direction': 'column',
            'align-content': 'space-around',
            'margin': 0,
        }
        const rowStyle = {
            'padding-top': '0px',
            'padding-bottom': '0px',
            'height':'80px',
        }
        const colStyle = {
            'padding-left': '0px',
            'padding-right': '0px',
            'width':'80px',
            'height':'80px',
        }

        return (
            <Grid style={boardStyle} columns='three'>
                <Grid.Row style={rowStyle}>
                    <Grid.Column style={colStyle}>
                        {this.renderSquare(0)}
                    </Grid.Column>
                    <Grid.Column style={colStyle}>
                        {this.renderSquare(1)}
                    </Grid.Column>
                    <Grid.Column style={colStyle}>
                        {this.renderSquare(2)}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row style={rowStyle}>
                    <Grid.Column style={colStyle}>
                        {this.renderSquare(3)}
                    </Grid.Column>
                    <Grid.Column style={colStyle}>
                        {this.renderSquare(4)}
                    </Grid.Column>
                    <Grid.Column style={colStyle}>
                        {this.renderSquare(5)}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row style={rowStyle}>
                    <Grid.Column style={colStyle}>
                        {this.renderSquare(6)}
                    </Grid.Column>
                    <Grid.Column style={colStyle}>
                        {this.renderSquare(7)}
                    </Grid.Column>
                    <Grid.Column style={colStyle}>
                        {this.renderSquare(8)}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            isNextX: true,
            stepNumber: 0,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const cur = history[history.length - 1];
        const squares = cur.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.isNextX ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            isNextX: !this.state.isNextX,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            isNextX: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const cur = history[this.state.stepNumber];
        const winner = calculateWinner(cur.squares);
        let status;
        if (winner) {
            status = winner + "获得胜利";
        } else {
            status = '下个棋子：' + (this.state.isNextX ? 'X' : 'O');
        }

        const moves = history.map((step, move) => {
            const desc = move ?
                ((move % 2) === 0 ? 'X' : 'O') + ' 放置棋子 ' + move :
                '游戏开始';
            return (
                <List.Item>
                    <List.Content floated='right'>
                    <Button animated='vertical' onClick={() => this.jumpTo(move)}>
                        <Button.Content hidden> GO </Button.Content>
                        <Button.Content visible>
                            悔棋
                        </Button.Content>
                    </Button>
                    </List.Content>
                    <List.Content>
                        <List.Header>{desc}</List.Header>
                    </List.Content>
                </List.Item>
            );
        });

        return (
            <Segment className="game">
                <Header className="horizontal divider" as='h6'>
                    来玩井字棋
                </Header>
                <Board squares={cur.squares} onClick={(i) => this.handleClick(i)}/>
                <Header className="horizontal divider" as='h6'>
                    战况
                </Header>
                <Header as='h6'>{status}</Header>
                <List selection verticalAlign='middle'>{moves}</List>
            </Segment>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game/>,
    document.getElementById('game')
);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}