const {Grid, Button, Segment, Divider, Header, Icon, List} = semanticUIReact

class Square extends React.Component {
    getColor() {
        let color = 'gery';
        if (this.props.value) {
            color = 'blue';
        }
        if (this.props.isFull) {
            color = 'red'
        }
        if (this.props.isWin) {
            color = 'green'
        }
        return color
    }

    render() {
        const btnStyle = {
            'margin': 0,
            'height': '80px',
            'width': '80px',
            'font-size': '20px',
        }

        return (
            <Button style={btnStyle} basic color={this.getColor()} className="square"
                    onClick={() => this.props.onClick()}>
                {this.props.value}
            </Button>
        );
    }
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square isFull={this.props.isFull} isWin={this.props.isWinArray[i]} value={this.props.squares[i]}
                       onClick={() => this.props.onClick(i)}/>;
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
            'height': '80px',
        }
        const colStyle = {
            'padding-left': '0px',
            'padding-right': '0px',
            'width': '80px',
            'height': '80px',
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
        const [winner, _] = calculateWinner(squares);
        if (winner || squares[i]) {
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

    jumpTo(step,reset=false) {
        this.setState({
            stepNumber: step,
            isNextX: (step % 2) === 0,
        });
        if (step === 0 && reset) {
            this.setState({
                history: [{
                squares: Array(9).fill(null),
            }],
            })
        }
    }

    getFullMove() {
        return (
            <List.Item>
                <List.Content floated='right'>
                    <Button animated='vertical' onClick={() => this.jumpTo(0,true)}>
                        <Button.Content hidden> GO </Button.Content>
                        <Button.Content visible> 重新开始 </Button.Content>
                    </Button>
                </List.Content>
                <List.Content>
                    <List.Header>游戏已结束</List.Header>
                </List.Content>
            </List.Item>
        );
    }

    render() {
        const history = this.state.history;
        const cur = history[this.state.stepNumber];
        const [winner, isWinArray] = calculateWinner(cur.squares);
        const isFull = this.state.stepNumber === 9;
        let status;
        if (winner) {
            status = "游戏结束：" + winner + "获得胜利";
        } else if (isFull) {
            status = "游戏结束：平局";
        } else {
            status = '下个棋子：' + (this.state.isNextX ? 'X' : 'O');
        }

        let moves = history.map((step, move) => {
            const desc = move ? ((move % 2) === 1 ? 'X' : 'O') + ' 放置棋子 ' + move : '游戏开始';
            const btnMsg = move ? "悔棋至此" : "清空棋盘";
            return (
                <List.Item>
                    <List.Content floated='right'>
                        <Button animated='vertical' onClick={() => this.jumpTo(move)}>
                            <Button.Content hidden> GO </Button.Content>
                            <Button.Content visible> {btnMsg} </Button.Content>
                        </Button>
                    </List.Content>
                    <List.Content>
                        <List.Header> {desc} </List.Header>
                    </List.Content>
                </List.Item>
            );
        });

        if (isFull || winner) {
            moves = this.getFullMove();
        }

        return (
            <Segment className="game">
                <Header className="horizontal divider" as='h6'>
                    来玩井字棋
                </Header>
                <Board isFull={isFull} isWinArray={isWinArray} squares={cur.squares}
                       onClick={(i) => this.handleClick(i)}/>
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
    const isWinArray = Array(9).fill(false);
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            for (let j = 0; j < 3; j++) {
                isWinArray[lines[i][j]] = true;
            }
            return [squares[a], isWinArray];
        }
    }
    return [null, isWinArray];
}