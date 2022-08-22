"use strict";

const {Message, Segment, Form, Button} = semanticUIReact;

class UserInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAgree: false,
            isOnlySelectable: false,
            term: '',
            major: '',
        }
    }

    handleDismiss = () => {
        $('#info-message').hide();
    }

    handleChange = (e, {name, value}) => {
        this.setState({[name]: value})
    }

    handleCheckboxChange = (name, value) => {
        this.setState({
            [name]: !value,
        })
    }

    handleSubmit() {
        const major = $("#major-selector > div.divider.text").text();
        const grade = $("#grade-selector > div.divider.text").text();
        const params = new URLSearchParams();
        params.set('major', encodeURIComponent(major));       // 设置参数
        params.set('grade', grade);       // 支持 Boolean、Number 等丰富类型
        window.location.href = '/?' + params.toString();
    }

    handleReset() {
        this.setState({
            isAgree: false,
            isOnlySelectable: false,
            term: '',
            major: '',
        })
    }

    render() {

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
            <Segment>
                <Message
                    id="info-message"
                    info
                    onDismiss={this.handleDismiss}
                    header='使用须知'
                    content="更改专业后需点击确认，否则可能导致计算结果不准确。"
                />
                <Form>
                    <Form.Select
                        id='major-selector'
                        fluid
                        label='拟准出专业'
                        placeholder='拟准出专业'
                        name='major'
                        options={majorOptions}
                        value={this.state.major}
                        onChange={this.handleChange}
                    />
                    <Form.Select
                        fluid
                        id='grade-selector'
                        label='年级'
                        placeholder='开课年级'
                        options={termOptions}
                        name='term'
                        value={this.state.term}
                        onChange={this.handleChange}
                    />
                    <Form.Checkbox
                        inline
                        label='仅查看可选课程'
                        name='isOnlySelectable'
                        checked={this.state.isOnlySelectable}
                        onChange={() => this.handleCheckboxChange('isOnlySelectable', this.state.isOnlySelectable)}
                    />
                    <Form.Checkbox
                        inline
                        name='isAgree'
                        label='我同意本网站免责声明'
                        checked={this.state.isAgree}
                        onChange={() => this.handleCheckboxChange('isAgree', this.state.isAgree)}
                        required
                    />
                    <Button
                        color='blue'
                        disabled={!this.state.isAgree}
                        onClick={() => this.handleSubmit()}
                    >确认</Button>
                    <Button
                        color='grey'
                        onClick={() => this.handleReset()}
                    >清空</Button>
                </Form>
            </Segment>
        )
    }
}

ReactDOM.render(
    <UserInfo/>,
    document.getElementById('user-info')
);