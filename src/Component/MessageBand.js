import React from "react";
import { Message, Step, Progress, Segment, Icon } from "semantic-ui-react";
import { useStatesStore } from "../Utils/States";

class WMS extends React.Component {
  state = { visible: true };

  handleDismiss = (selector) => {
    this.setState({ visible: false });
  };

  render() {
    if (this.state.visible) {
      return (
        <Message id="wms" warning attached onDismiss={this.handleDismiss}>
          <Message.Header>
            在使用网站前，请务必仔细阅读以下内容：
          </Message.Header>
          <ul className="ui list">
            <li>本系统仅用于核算 BUAA SEM 本科生一般专业学分。</li>
            <li>
              本系统由 100% 前端实现，不会收集任何个人隐私数据，请放心使用。
            </li>
            <li>
              建议使用电脑访问本页面，手机访问可能由于缩放比例而导致使用体验不佳。
            </li>
            <li>使用方式：选择专业，勾选已选课程，学分会自动核算。</li>
            <li>
              如有疑问可电子邮件{" "}
              <a href="mailto:support@hobee.me"> support@hobee.me </a>{" "}
              联系作者。
            </li>
            <li>
              本产品依据《经济管理学院本科生培养方案
              2017版》设计，如有出入，可通过上述方式联系开发者。
            </li>
            <li>
              如需增加课程，请编辑：课程名称-学分-开课年级-开课学期-必修专业
              并发送至上述邮箱。
            </li>
            <li>
              如果网站无法正常工作，请尝试清理浏览器缓存/更换浏览器或使用无痕模式打开网页。
            </li>
            <li>
              免责声明：核算结果仅供参考，请务必仔细核对，以免影响您的毕业。
              由此产生的后果由使用者自行承担。
            </li>
          </ul>
        </Message>
      );
    }

    return <div></div>;
  }
}

class IMS extends React.Component {
  state = { visible: true };

  handleDismiss = (selector) => {
    this.setState({ visible: false });
  };

  render() {
    if (this.state.visible) {
      return (
        <Message
          id="ims"
          info
          attached="bottom"
          onDismiss={() => this.handleDismiss("ims")}
        >
          <Message.Header>使用指南：</Message.Header>
          <ul className="ui list">
            <li>选择专业并点击确定</li>
            <li>勾选已经选择过的课程</li>
            <li>学分会自动核算</li>
            <li>在右边栏可查看已选总学分与剩余学分</li>
            <li>筛选功能可快速选出符合条件的课程（课程名不支持模糊搜索）</li>
            <li>勾选仅未选后，筛选结果将只显示未选择的课程</li>
            <li>
              勾选仅看可选后，筛选结果将只显示能够选择的课程（开课年级小于等于所选年级的课程）
            </li>
          </ul>
        </Message>
      );
    }

    return <div></div>;
  }
}

class NoticeMessage extends React.Component {
  render() {
    return (
      <div>
        <WMS />
        <IMS />
      </div>
    );
  }
}

function StepBar() {
  const step = useStatesStore((state) => state.step);
  const processed = (step - 1) * 25;

  return (
    <Segment>
      <Step.Group widths="equal">
        <Step completed={1 < step} active={1 === step} disabled={1 > step}>
          <Icon name="truck" />
          <Step.Content>
            <Step.Title>阅读须知</Step.Title>
            <Step.Description>阅读网站须知与免责声明</Step.Description>
          </Step.Content>
        </Step>

        <Step completed={2 < step} active={2 === step} disabled={2 > step}>
          <Icon name="tachometer alternate" />
          <Step.Content>
            <Step.Title>选择专业</Step.Title>
            <Step.Description>选择预计准出专业与年级</Step.Description>
          </Step.Content>
        </Step>

        <Step completed={3 < step} active={3 === step} disabled={3 > step}>
          <Icon name="calculator" />
          <Step.Content>
            <Step.Title>勾选课程</Step.Title>
            <Step.Description>选择学过的课程</Step.Description>
          </Step.Content>
        </Step>

        <Step completed={4 < step} active={4 === step} disabled={4 > step}>
          <Icon name="info" />
          <Step.Content>
            <Step.Title>查看结果</Step.Title>
            <Step.Description>查看学分核算结果</Step.Description>
          </Step.Content>
        </Step>
      </Step.Group>
      <Progress percent={processed} indicating />
    </Segment>
  );
}

class MessageBand extends React.Component {
  render() {
    const divStyle = {
      "margin-bottom": "1em",
    };

    return (
      <div style={divStyle}>
        <NoticeMessage />
        <StepBar />
        <div>{this.props.data}</div>
      </div>
    );
  }
}

function MessageBandWithCTX() {
  return <MessageBand />;
}

export default MessageBandWithCTX;
