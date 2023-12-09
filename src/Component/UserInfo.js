import React from 'react';
import {Message, Segment, Form, Button, Modal, Icon, Header} from 'semantic-ui-react';
import { useStatesStore } from "../Utils/States";

function setStep(step) {
    useStatesStore.setState({step: step});
}

function setMajor(major) {
    useStatesStore.setState({major: major});
    if (major === '') {
        setStep(2);
    }
    if (major !== '' && useStatesStore.getState().grade !== '') {
        setStep(3);
    }
}

function setGrade(grade) {
    useStatesStore.setState({grade: grade});
    if (grade === '') {
        setStep(2);
    }
    if (grade !== '' && useStatesStore.getState().major !== '') {
        setStep(3);
    }
}

class UserInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAgree: false,
            isOnlySelectable: false,
            term: '',
            major: '',
            isOpen: false,
        }
    }

    handleDismiss = () => {
        document.getElementById('info-message').hidden = true;
    }

    handleChange(name,value) {
        if (this.state[name] !== value) {
            this.setState({
               [name]:value
            });
        }
        if (name === 'term' && value === '') {
            this.setState({
               isOnlySelectable:false
            });
        }
        if (name === 'major') {
            setMajor(value);
        }
        if (name === 'term') {
            setGrade(value);
        }
    }

    handleCheckboxChange = (name, value) => {
        this.setState({
            [name]: !value,
        })

        if (name === 'isAgree' && !value) {
            setStep(2);
        } else if (name === 'isAgree' && value) {
            setStep(1);
        }
    }

    handleReset() {
        this.setState({
            isAgree: false,
            isOnlySelectable: false,
            term: '',
            major: '',
        })
        setMajor('');
        setGrade('');
        setStep(1);
    }

    handleTrigger = (action = false) => {
        this.setState({
            isOpen: !this.state.isOpen,
            isAgree: action,
        })

        if (action) {
            setStep(2);
        }
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

        const disclaimersTrigger = () => {
            return (
                <label>我同意本网站
                    <a href="javascript:void(0)" onClick={this.handleTrigger}>免责声明</a>
                </label>
            )
        }

        return (
            <Segment>
                <Message
                    id="info-message"
                    info
                    onDismiss={this.handleDismiss}
                    header='使用须知'
                    content="使用本网站前，请先阅读并同意本网站免责声明。选择专业和年级后直接勾选已选课程，学分会自动核算。"
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
                        onChange={(e,{name,value}) => this.handleChange(name,value)}
                        disabled={!this.state.isAgree}
                        clearable
                    />
                    <Form.Select
                        fluid
                        id='grade-selector'
                        label='年级'
                        placeholder='年级'
                        options={termOptions}
                        name='term'
                        value={this.state.term}
                        onChange={(e,{name,value}) => this.handleChange(name,value)}
                        disabled={!this.state.isAgree}
                        clearable
                    />
                    <Form.Checkbox
                        inline
                        label='仅查看可选课程'
                        name='isOnlySelectable'
                        disabled={this.state.term === ''}
                        checked={this.state.isOnlySelectable}
                        onChange={() => this.handleCheckboxChange('isOnlySelectable', this.state.isOnlySelectable)}
                    />
                    <Form.Checkbox
                        inline
                        name='isAgree'
                        label={disclaimersTrigger()}
                        checked={this.state.isAgree}
                        onChange={() => this.handleCheckboxChange('isAgree', this.state.isAgree)}
                        required
                    />
                    <Button
                        color='grey'
                        onClick={() => this.handleReset()}
                    >清空选择</Button>
                </Form>

                <Modal
                    basic
                    open={this.state.isOpen}
                    size='large'
                    dimmer='blurring'
                    centered={true}
                >
                    <Header icon>
                        <Icon name='announcement'/>
                        免责声明
                    </Header>
                    <Modal.Content>
                        <p>
                            核算结果仅供参考，请务必仔细核对，以免影响您的毕业。 由此产生的后果由使用者自行承担。 继续使用则代表您同意本声明，如不同意请关闭此页面。
                        </p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button basic color='red' inverted onClick={() => this.handleTrigger(false)}>
                            <Icon name='remove'/> 不同意
                        </Button>
                        <Button color='green' inverted onClick={() => this.handleTrigger(true)}>
                            <Icon name='checkmark'/> 同意
                        </Button>
                    </Modal.Actions>
                </Modal>
            </Segment>
        )
    }
}

function UserInfoWithCTX() {
    return (
        <UserInfo />
    );
}

export default UserInfoWithCTX;