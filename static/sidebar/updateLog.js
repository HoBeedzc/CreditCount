'use strict';

const {Segment, Image, Header, Table, Menu, Icon} = semanticUIReact;

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
            this.setState({
                lastUpdateDate: data[0]['date'],
            });
        }

        let showData = data.slice(0, 5);
        const verInfo = showData.map((item, index) => {
            return <VersionInfo version={item['version']} info={item['info']}/>
        });
        return (
            <Table.Body>
                {verInfo}
            </Table.Body>
        );
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
                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan='3'>
                                <Menu floated='right' pagination>
                                    <Menu.Item as='a' icon>
                                        <Icon name='chevron left'/>
                                    </Menu.Item>
                                    <Menu.Item as='a'>1</Menu.Item>
                                    <Menu.Item as='a'>2</Menu.Item>
                                    <Menu.Item as='a'>3</Menu.Item>
                                    <Menu.Item as='a' icon>
                                        <Icon name='chevron right'/>
                                    </Menu.Item>
                                </Menu>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </Segment>
        );
    }
}

ReactDOM.render(
    <UpdateLog/>
    ,
    document.getElementById('update-log')
);