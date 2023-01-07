'use strict';

const {Table, Checkbox, Button, Pagination, Dropdown, Label} = semanticUIReact;

require(['./static/Tools'], function (Tools) {
    Tools.GetFileFromDB.fetch('./db/course.json').then(function (response) {
        let data = JSON.stringify(response);
        console.log(data);
        localStorage.setItem('ci', data);
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

class Course extends React.Component {
    render() {
        return (
            <Table.Row positive={this.props.isChecked}>
                <Table.Cell collapsing>
                    <Checkbox
                        slider
                        checked={this.props.isChecked}
                        onChange={(e,info) => this.props.onCheckboxChange(info)}
                    />
                </Table.Cell>
                <Table.Cell>{this.props.name}</Table.Cell>
                <Table.Cell>{this.props.credit}</Table.Cell>
                <Table.Cell>{this.props.grade}</Table.Cell>
                <Table.Cell>{this.props.term}</Table.Cell>
                <Table.Cell>{this.props.major}</Table.Cell>
            </Table.Row>
        );
    }
}

class CourseList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            curPage: 1,
            maxPage: 1,
            pageSize: 20,
            checkedNum:0,
        }
    }

    handleCheckCourse(relativeIndex, info) {
        if (this.state.data[relativeIndex].isChecked !== info.checked) {
            if (info.checked) {
                this.setState({
                    checkedNum: this.state.checkedNum + 1,
                });
            } else {
                this.setState({
                    checkedNum: this.state.checkedNum - 1,
                });
            }
        }
        this.state.data[relativeIndex].isChecked = info.checked
    }

    handleDropdownChange(info) {
        console.log(info)
        if (this.state.pageSize !== parseInt(info.value)) {
            this.setState({
                pageSize: parseInt(info.value),
            });
            this.setState({
                maxPage:this.state.dataLength % parseInt(info.value) === 0 ? parseInt(this.state.dataLength / parseInt(info.value)) : parseInt(this.state.dataLength / parseInt(info.value)) + 1,
            });
        }
    }

    handlePaginationChange(info) {
        if (this.state.curPage !== info.activePage) {
            this.setState({
                curPage: info.activePage,
            });
        }
    }

    refreshState(data) {
        if (this.state.maxPage * this.state.pageSize < data.length ) {
            // calculate max page
            this.setState({
                data:data,
                dataLength:data.length,
                maxPage: data.length % this.state.pageSize === 0 ? parseInt(data.length / this.state.pageSize) : parseInt(data.length / this.state.pageSize) + 1,
            });
        }
    }

    renderCourseList() {

        getFileFromDB.fetch('./db/course.json').then(function (response) {
            data = JSON.stringify(response);
            // console.log(data);
            localStorage.setItem('ci', data);
        }).catch(function (response) {
            console.log(response);
        });

        let data = JSON.parse(localStorage.getItem('ci'));
        //add isChecked flag
        for (let i = 0; i < data.length; i++) {
            data[i].isChecked = false
        }

        this.refreshState(data)
        if (this.state.data != null) {
            data = this.state.data
        }

        let courseInfo = data.map((item, index) => {
            return <Course
                isChecked={item['isChecked']}
                name={item['name']}
                credit={item['credit']}
                grade={item['grade']}
                term={item['term']}
                major={item['major']}
                onCheckboxChange={(info) => this.handleCheckCourse(index, info)}
            />
        });

        courseInfo = courseInfo.slice((this.state.curPage - 1) * this.state.pageSize, this.state.curPage * this.state.pageSize);

        return (
            <Table.Body>
                {courseInfo}
            </Table.Body>
        )
    }

    render() {

        const pageOptions = [
            {key: '10', value: '10', text: '10'},
            {key: '20', value: '20', text: '20'},
            {key: '50', value: '50', text: '50'},
            {key: '100', value: '100', text: '100'},
        ]

        const firstItem = {
            disabled: this.state.curPage === 1,
            'aria-label': 'First item',
            content: '«',
        }

        const lastItem = {
            disabled: this.state.curPage === this.state.maxPage,
            'aria-label': 'Last item',
            content: '»',
        }

        const nextItem = {
            disabled: this.state.curPage === this.state.maxPage,
            'aria-label': 'Next item',
            content: '⟩',
        }

        const prevItem = {
            disabled: this.state.curPage === 1,
            'aria-label': 'Previous item',
            content: '⟨',
        }

        return (
            <Table compact celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>
                            <Label ribbon>
                                已选课程
                                <Label.Detail as='a'> {this.state.checkedNum} </Label.Detail>
                            </Label>
                        </Table.HeaderCell>
                        <Table.HeaderCell>课程名称</Table.HeaderCell>
                        <Table.HeaderCell>学分</Table.HeaderCell>
                        <Table.HeaderCell>开课年级</Table.HeaderCell>
                        <Table.HeaderCell>开课学期</Table.HeaderCell>
                        <Table.HeaderCell>必修专业</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                {this.renderCourseList()}
                <Table.Footer fullWidth>
                    <Table.Row>
                        <Table.HeaderCell colSpan='6'>
                            <Button disabled size='small'>
                                清除已选
                            </Button>
                            <span>
                                每页展示{' '}
                                <Dropdown
                                    inline
                                    options={pageOptions}
                                    defaultValue={pageOptions[1].value}
                                    onChange={(e,info) => this.handleDropdownChange(info)}
                                />
                                项
                            </span>
                            <Pagination
                                floated='right'
                                activePage={this.state.curPage}
                                totalPages={this.state.maxPage}
                                onPageChange={(e,info) => this.handlePaginationChange(info)}
                                firstItem = {firstItem}
                                lastItem = {lastItem}
                                nextItem = {nextItem}
                                prevItem = {prevItem}
                            />
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        )
    }
}

ReactDOM.render(
    <CourseList/>,
    document.getElementById('course-list-react')
);