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

class Course extends React.Component {
    render() {
        return (
            <Table.Row positive>
                <Table.Cell collapsing>
                    <Checkbox slider/>
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
        }
    }

    renderCourseList() {

        let data = JSON.parse(localStorage.getItem('ci'));

        let showData = data.slice((this.state.curPage - 1) * this.state.pageSize, this.state.curPage * this.state.pageSize);
        const courseInfo = showData.map((item, index) => {
            return <Course
                name={item['name']}
                credit={item['credit']}
                grade={item['grade']}
                term={item['term']}
                major={item['major']}
            />
        });

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

        return (
            <Table compact celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>
                            <Label ribbon>
                                已选课程
                                <Label.Detail as='a'>214</Label.Detail>
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
                                />
                                项
                            </span>
                            <Pagination floated='right' defaultActivePage={5} totalPages={10}/>
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