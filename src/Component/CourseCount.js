import React from "react";
import { Segment, Header, Icon, Divider, List, Label } from "semantic-ui-react";

function CourseCount() {
  return (
    <Segment>
      <Header as="h2">
        <Icon name="archive" />
        <Header.Content>
          您已共选 <span class="cc-credit-total"> 0 </span> 学分
          <Header.Subheader>
            还需再选 <span class="cc-credit-remain"> 0 </span> 学分
          </Header.Subheader>
        </Header.Content>
      </Header>
      <Divider horizontal> 学分明细 </Divider>
      <p>以下会列出您的学分明细，请认真核对</p>
      <List bulleted>
        <List.Item>
          本专业核专 <span class="cc-credit-core-major"> 0 </span> 分（不计入）
        </List.Item>
        <List.Item>
          有效有共计 <span class="cc-credit-total"> 0 </span> 分
          <List.List>
            <List.Item>
              其他专业核专 <span class="cc-credit-core-other"> 0 </span> 分
            </List.Item>
            <List.Item>
              一般专业 <span class="cc-credit-general"> 0 </span> 分
            </List.Item>
          </List.List>
        </List.Item>
        <List.Item>
          剩余应选 <span class="cc-credit-remain"> 0 </span> 分
        </List.Item>
      </List>
      <Divider horizontal> 课程明细 </Divider>
      <p>以下会列出您选择的课程，请认真核对</p>
      <List divided selection celled>
        <List.Item>
          <List.Icon name="book" size="large" verticalAlign="middle" />
          <List.Content>
            <List.Header>
              <span class="cc-course-name">示例课程 / 核心专业</span>
            </List.Header>
            <List.Description style={{ padding: "0.1em 0 0 0" }}>
              <Label color='red'>
                学分
                <Label.Detail>2</Label.Detail>
              </Label>
              <Label color='teal'>大三</Label>
              <Label color='yellow'>
                学期
                <Label.Detail>秋</Label.Detail>
              </Label>
            </List.Description>
          </List.Content>
        </List.Item>
      </List>
    </Segment>
  );
}

export default CourseCount;
