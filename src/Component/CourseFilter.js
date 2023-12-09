import React from 'react';
import {Form, Button, Checkbox} from 'semantic-ui-react';

class CourseFilter extends React.Component {
    state = {activeItem: 'home'}

    handleItemClick = (e, {name}) => this.setState({activeItem: name});

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

        return (
            <Form>
                <Form.Group widths='equal'>
                    <Form.Input
                        fluid
                        id='form-subcomponent-shorthand-input-first-name'
                        label='课程名称'
                        placeholder='课程名称'
                    />
                    <Form.Select
                        fluid
                        id='form-subcomponent-shorthand-input-last-name'
                        label='学分'
                        placeholder='学分'
                        options={creditOptions}
                        clearable
                    />
                    <Form.Select
                        fluid
                        id='form-subcomponent-shorthand-input-last-name'
                        label='开课年级'
                        placeholder='开课年级'
                        options={termOptions}
                        clearable
                    />
                    <Form.Select
                        fluid
                        id='form-subcomponent-shorthand-input-last-name'
                        label='专业'
                        placeholder='专业'
                        options={majorOptions}
                        clearable
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
                        />
                    </Form.Group>
                </Form.Group>
            </Form>
        );
    }
}

export default CourseFilter;
