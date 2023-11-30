"use strict";

const {Message, Segment, Form, Button, Modal, Header, Icon, List} = semanticUIReact;

class CourseCheckList extends React.Component {
    render() {
        return (
            <Segment>
                <Header as='h2'>
                    <Icon name='archive'/>
                    <Header.Content>
                        已选 <span class="cc-credit-total">x</span> 有效学分
                        <Header.Subheader> 距离达标还差 <span class="cc-credit-remain">x</span> 学分</Header.Subheader>
                    </Header.Content>
                </Header>
                <Header className="horizontal divider" as='h6'>
                    信息明细
                </Header>
                <List>
                    <List.Item>
                        <List.Icon name='users'/>
                        <List.Content>专业</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='users'/>
                        <List.Content>年级</List.Content>
                    </List.Item>
                </List>
                <Header className="horizontal divider" as='h6'>
                    学分明细
                </Header>
                <List bulleted>
                    <List.Item>本专业核专 <span class="cc-credit-core-major">x</span> 分（不计入）</List.Item>
                    <List.Item>其他专业核专 <span class="cc-credit-core-other">x</span> 分</List.Item>
                    <List.Item>一般专业 <span class="cc-credit-general">x</span> 分</List.Item>
                    <List.Item>有效有共计 <span class="cc-credit-total">x</span> 分</List.Item>
                    <List.Item>剩余应选 <span class="cc-credit-remain">x</span> 分</List.Item>
                </List>
                <Header className="horizontal divider" as='h6'>
                    课程明细
                </Header>
                <List divided relaxed>
                    <List.Item>
                        <List.Icon name='book' size='large' verticalAlign='middle'/>
                        <List.Content>
                            <List.Header>
                                <span className="cc-course-name">示例课程</span>/<span className="cc-course-major">核心专业类</span>
                            </List.Header>
                            <List.Description>
                                <span className="cc-course-credit"> 2学分 </span>/
                                <span className="cc-course-grade"> 大三 </span>/
                                <span className="cc-course-term"> 秋季 </span>
                            </List.Description>
                        </List.Content>
                    </List.Item>
                </List>
            </Segment>
        )
    }
}

ReactDOM.render(
    <CourseCheckList/>,
    document.getElementById('course-check-list')
);