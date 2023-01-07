'use strict';

const {Segment, Header, Table, Menu, Icon} = semanticUIReact;

require(['./static/Tools'], function (Tools) {
    Tools.GetFileFromDB.fetch('./db/updateLog.json').then(function (response) {
        let data = JSON.stringify(response);
        console.log(data);
        localStorage.setItem('vi', data);
    }).catch(function (response) {
        console.log(response);
    });
});

class getFileFromDB {
    static fetch(filePath) {
        return new Promise(function (resolve, reject) {
            fetch(filePath).then(function (response) {
                return response.json();
            }).then(function (data) {
                resolve(data);
            }).catch(function (e) {
                reject(e);
                console.log("Oops, error");
            });
        });
    }
}

class VersionInfo extends React.Component {
    render() {
        return (
            <Table.Row>
                <Table.Cell>{this.props.version}</Table.Cell>
                <Table.Cell>{this.props.info}</Table.Cell>
            </Table.Row>
        );
    }
}

class UpdateLog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lastUpdateDate: '2020-11-11',
            curPage: 1,
            maxPage: 1,
            showPageNum: [1],
        }
    }

    handleClickPervBtn() {
        if (this.state.curPage > 1) {
            this.setState({
                curPage: this.state.curPage - 1,
            });
        } else {
            return
        }

        if (this.state.curPage > 2) {
            let showPageTemp;
            switch (this.state.maxPage) {
                case 1:
                    showPageTemp = [1];
                    break;
                case 2:
                    showPageTemp = [1, 2];
                    break;
                default:
                    showPageTemp = [this.state.curPage - 2, this.state.curPage - 1, this.state.curPage];
            }
            this.setState({
                showPageNum: showPageTemp.slice(0, showPageTemp.length),
            })
        } else {
            let showPageTemp;
            switch (this.state.maxPage) {
                case 1:
                    showPageTemp = [1];
                    break;
                case 2:
                    showPageTemp = [1, 2];
                    break;
                default:
                    showPageTemp = [1, 2, 3];
            }
            this.setState({
                showPageNum: showPageTemp.slice(0, showPageTemp.length),
            })
        }
    }

    handleClickNextBtn() {
        if (this.state.curPage < this.state.maxPage) {
            this.setState({
                curPage: this.state.curPage + 1,
            })
        } else {
            return
        }

        if (this.state.curPage < this.state.maxPage - 1) {
            let showPageTemp;
            switch (this.state.maxPage) {
                case 1:
                    showPageTemp = [1];
                    break;
                case 2:
                    showPageTemp = [1, 2];
                    break;
                default:
                    showPageTemp = [this.state.curPage, this.state.curPage + 1, this.state.curPage + 2];
            }
            this.setState({
                showPageNum: showPageTemp.slice(0, showPageTemp.length),
            })
        } else {
            let showPageTemp;
            switch (this.state.maxPage) {
                case 1:
                    showPageTemp = [1];
                    break;
                case 2:
                    showPageTemp = [1, 2];
                    break;
                default:
                    showPageTemp = [this.state.maxPage - 2, this.state.maxPage - 1, this.state.maxPage];
            }
            this.setState({
                showPageNum: showPageTemp.slice(0, showPageTemp.length),
            })
        }
    }

    handleClickPageBtn(page) {
        if (page !== this.state.curPage) {
            this.setState({
                curPage: page,
            });
        }

        if (page === 1) {
            let showPageTemp;
            switch (this.state.maxPage) {
                case 1:
                    showPageTemp = [1];
                    break;
                case 2:
                    showPageTemp = [1, 2];
                    break;
                default:
                    showPageTemp = [1, 2, 3];
            }
            this.setState({
                showPageNum: showPageTemp.slice(0, showPageTemp.length),
            });
        } else if (page === this.state.maxPage) {
            let showPageTemp;
            switch (this.state.maxPage) {
                case 1:
                    showPageTemp = [1];
                    break;
                case 2:
                    showPageTemp = [1, 2];
                    break;
                default:
                    showPageTemp = [page - 2, page - 1, page];
            }
            this.setState({
                showPageNum: showPageTemp.slice(0, showPageTemp.length),
            });
        } else {
            this.setState({
                showPageNum: [page - 1, page, page + 1],
            });
        }
    }

    renderVersionInfo() {

        getFileFromDB.fetch('./db/updateLog.json').then(function (response) {
            data = JSON.stringify(response);
            // console.log(data);
            localStorage.setItem('vi', data);
        }).catch(function (response) {
            console.log(response);
        });

        let data = JSON.parse(localStorage.getItem('vi'));

        if (this.state.lastUpdateDate !== data[0]['date']) {

            let maxPageTemp = data.length % 5 === 0 ? parseInt(data.length / 5) : parseInt(data.length / 5) + 1;
            let showPageTemp;
            switch (maxPageTemp) {
                case 1:
                    showPageTemp = [1];
                    break;
                case 2:
                    showPageTemp = [1, 2];
                    break;
                default:
                    showPageTemp = [1, 2, 3];
            }

            this.setState({
                lastUpdateDate: data[0]['date'],
                maxPage: data.length % 5 === 0 ? parseInt(data.length / 5) : parseInt(data.length / 5) + 1,
                showPageNum: showPageTemp.slice(0, showPageTemp.length),
            });
        }

        let showData = data.slice((this.state.curPage - 1) * 5, this.state.curPage * 5);
        const verInfo = showData.map((item, index) => {
            return <VersionInfo version={item['version']} info={item['info']}/>
        });

        return (
            <Table.Body>
                {verInfo}
            </Table.Body>
        );
    }

    renderPageInfo() {

        const pageInfo = this.state.showPageNum.map((item, index) => {
            return <Menu.Item as='a' active={this.state.curPage === item}
                              onClick={() => this.handleClickPageBtn(item)}>{item}</Menu.Item>
        });

        return (
            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan='3'>
                        <Menu floated='right' pagination>
                            <Menu.Item as='a' icon disabled={this.state.curPage === 1}
                                       onClick={() => this.handleClickPervBtn()}>
                                <Icon name='chevron left'/>
                            </Menu.Item>
                            {pageInfo}
                            <Menu.Item as='a' icon disabled={this.state.curPage === this.state.maxPage}
                                       onClick={() => this.handleClickNextBtn()}>
                                <Icon name='chevron right'/>
                            </Menu.Item>
                        </Menu>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        )
    }

    render() {

        return (
            <Segment>
                <Header className="horizontal divider" as='h6'>
                    更新日志
                </Header>
                最近更新日期: {this.state.lastUpdateDate}
                <Table basic='very' celled collapsing>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>版本</Table.HeaderCell>
                            <Table.HeaderCell>更新内容</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    {this.renderVersionInfo()}
                    {this.renderPageInfo()}
                </Table>
            </Segment>
        );
    }
}

ReactDOM.render(
    <UpdateLog/>,
    document.getElementById('update-log')
);