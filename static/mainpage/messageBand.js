"use strict";

const {Message, Step, Progress, Segment} = semanticUIReact;


class NoticeMessage extends React.Component {

    handleDismiss = (selector) => {
        $(selector).hide();
    }

    render() {
        return (
            <div>
                <Message id="wms" warning attached onDismiss={() => this.handleDismiss("#wms")}>
                    <Message.Header>在使用网站前，请务必仔细阅读以下内容：</Message.Header>
                    <ul className="ui list">
                        <li>本系统仅用于核算 BUAA SEM 本科生一般专业学分。</li>
                        <li>本系统由 100% 前端实现，不会收集任何个人隐私数据，请放心使用。</li>
                        <li>建议使用电脑访问本页面，手机访问可能由于缩放比例而导致使用体验不佳。</li>
                        <li>使用方式：选择专业，勾选已选课程，学分会自动核算。</li>
                        <li>如有疑问可电子邮件 <a href="mailto:lzqpublic@163.com"> lzqpublic@163.com </a> 联系作者。</li>
                        <li>本产品依据《经济管理学院本科生培养方案 2017版》设计，如有出入，可通过上述方式联系开发者。</li>
                        <li>如需增加课程，请编辑：课程名称-学分-开课年级-开课学期-必修专业 并发送至上述邮箱。</li>
                        <li>如果网站无法正常工作，请尝试清理浏览器缓存/更换浏览器或使用无痕模式打开网页。</li>
                        <li>免责声明：核算结果仅供参考，请务必仔细核对，以免影响您的毕业。 由此产生的后果由使用者自行承担。</li>
                    </ul>
                </Message>
                <Message id="ims" info attached="bottom" onDismiss={() => this.handleDismiss("#ims")}>
                    <Message.Header>使用指南：</Message.Header>
                    <ul className="ui list">
                        <li>选择专业并点击确定</li>
                        <li>勾选已经选择过的课程</li>
                        <li>学分会自动核算</li>
                        <li>在右边栏可查看已选总学分与剩余学分</li>
                    </ul>
                </Message>
            </div>
        )
    }
}

class StepBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeStep: 2,
        }
    }

    render() {

        const processed = (this.state.activeStep - 1) * 25

        return (
            <Segment>
                <Step.Group widths='equal'>
                    <Step
                        completed={1 < this.state.activeStep}
                        active={1 === this.state.activeStep}
                        disabled={1 > this.state.activeStep}
                    >
                        <Icon name='truck'/>
                        <Step.Content>
                            <Step.Title>阅读须知</Step.Title>
                            <Step.Description>阅读网站须知与免责声明</Step.Description>
                        </Step.Content>
                    </Step>

                    <Step
                        completed={2 < this.state.activeStep}
                        active={2 === this.state.activeStep}
                        disabled={2 > this.state.activeStep}
                    >
                        <Icon name='tachometer alternate'/>
                        <Step.Content>
                            <Step.Title>选择专业</Step.Title>
                            <Step.Description>选择预计准出专业与年级</Step.Description>
                        </Step.Content>
                    </Step>

                    <Step
                        completed={3 < this.state.activeStep}
                        active={3 === this.state.activeStep}
                        disabled={3 > this.state.activeStep}
                    >
                        <Icon name='calculator'/>
                        <Step.Content>
                            <Step.Title>勾选课程</Step.Title>
                            <Step.Description>选择学过的课程</Step.Description>
                        </Step.Content>
                    </Step>

                    <Step
                        completed={4 < this.state.activeStep}
                        active={4 === this.state.activeStep}
                        disabled={4 > this.state.activeStep}
                    >
                        <Icon name='info'/>
                        <Step.Content>
                            <Step.Title>查看结果</Step.Title>
                            <Step.Description>查看学分核算结果</Step.Description>
                        </Step.Content>
                    </Step>
                </Step.Group>
                <Progress percent={processed} indicating/>
            </Segment>
        )
    }
}

class MessageBand extends React.Component {
    render() {

        const divStyle = {
            "margin-bottom": "1em",
        }

        return (
            <div style={divStyle}>
                <NoticeMessage/>
                <StepBar/>
            </div>
        );
    }
}

ReactDOM.render(
    <MessageBand/>,
    document.getElementById('message-band')
);