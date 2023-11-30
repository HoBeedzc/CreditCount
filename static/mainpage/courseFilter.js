'use strict';

const {Form, Button, Checkbox, List} = semanticUIReact;

class CourseFilter extends React.Component {
    state = {
        activeItem: 'home',
        courseName:'',
        creditSelection:'',
        termSelection:'',
        majorSelection:'',
        courseNameFilter:'',
        creditFilter:'',
        termFilter:'',
        majorFilter:''
    }

    handleClick() {
        return 0
    }

    handleChange(name,value) {
        if (this.state[name] !== value) {
            this.setState({
               [name]:value
            });
        }
    }

    handleSubmit() {
        this.setState({
            courseName:'',
            creditSelection:'',
            termSelection:'',
            majorSelection:'',
            courseNameFilter:this.state.courseName,
            creditFilter:this.state.creditSelection,
            termFilter:this.state.termSelection,
            majorFilter:this.state.majorSelection
        });
    }

    render() {

        const subGroupStyle = {
            'flex-direction': 'column',
        };

        const buttonStyle = {
            'width': '100px',
        };

        const creditOptions = [
            {key: 'm', value: 'Below1', text: '1分及以下'},
            {key: 'm', value: 'Below1.5', text: '1.5分及以下'},
            {key: 'm', value: 'Below2', text: '2分及以下'},
            {key: 'm', value: 'Below2.5', text: '2.5分及以下'},
            {key: 'm', value: 'Below3', text: '3分及以下'},
        ]

        const termOptions = [
            {key: 'm', text: '大一', value: 'Freshman'},
            {key: 'f', text: '大二', value: 'Sophomore'},
            {key: 'o', text: '大三', value: 'Junior'},
            {key: 'o', text: '大四', value: 'Senior'},
        ]

        const majorOptions = [
            {key: 'm', text: '信息管理与信息系统', value: 'IS'},
            {key: 'f', text: '工业工程', value: 'IE'},
            {key: 'o', text: '工程管理', value: 'EM'},
            {key: 'm', text: '能源经济', value: 'EE'},
            {key: 'f', text: '经济统计', value: 'ES'},
            {key: 'o', text: '金融工程', value: 'FE'},
            {key: 'o', text: '一般专业', value: 'GS'},
        ]

        const filterMessage = () => '课程名称：' + this.state.courseNameFilter +
            '/ 学分：' + this.state.creditFilter +
            '/ 开课年级：' + this.state.termFilter +
            '/ 专业：' + this.state.majorFilter +
            '/ 仅看未选：' + this.state.majorFilter +
            '/'

        return (
            <Form success onSubmit={() => this.handleSubmit()}>
                <Form.Group widths='equal'>
                    <Form.Input
                        fluid
                        id='form-subcomponent-shorthand-input-first-name'
                        label='课程名称'
                        name='courseName'
                        placeholder='课程名称'
                        value={this.state.courseName}
                        onChange={(e,{name,value}) => this.handleChange(name,value)}
                    />
                    <Form.Select
                        fluid
                        id='form-subcomponent-shorthand-input-last-name'
                        label='学分'
                        name='creditSelection'
                        placeholder='学分'
                        options={creditOptions}
                        clearable
                        value={this.state.creditSelection}
                        onChange={(e,{name,value}) => this.handleChange(name,value)}
                    />
                    <Form.Select
                        fluid
                        id='form-subcomponent-shorthand-input-last-name'
                        label='开课年级'
                        name='termSelection'
                        placeholder='开课年级'
                        options={termOptions}
                        clearable
                        value={this.state.termSelection}
                        onChange={(e,{name,value}) => this.handleChange(name,value)}
                    />
                    <Form.Select
                        fluid
                        id='form-subcomponent-shorthand-input-last-name'
                        label='专业'
                        name='majorSelection'
                        placeholder='专业'
                        options={majorOptions}
                        clearable
                        value={this.state.majorSelection}
                        onChange={(e,{name,value}) => this.handleChange(name,value)}
                    />
                    <Form.Group style={subGroupStyle}>
                        <Form.Field
                            control={Checkbox}
                            label={{children: '仅未选'}}
                        />
                        <Form.Field
                            id='form-button-control-public'
                            control={Button}
                            content='筛选'
                            icon='filter'
                            style={buttonStyle}
                            onClick={() => this.handleClick()}
                        />
                    </Form.Group>
                </Form.Group>
                <Message
                    success
                    header='当前筛选条件：'
                    content={filterMessage}
                />
                <p></p>
            </Form>
        );
    }
}

ReactDOM.render(
    <CourseFilter/>,
    document.getElementById('course-filter')
);
