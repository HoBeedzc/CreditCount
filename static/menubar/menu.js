'use strict';

const {Menu, Input} = semanticUIReact;

class MenuBar extends React.Component {

    state = {activeItem: 'home'}

    handleItemClick() {
        window.open("/")
    }

    render() {

        const divStyle = {
            'z-index': '100',
            'background-color': '#13227a',
            'color': '#FFF',
        }

        const aStyle = {
            'color': '#FFF',
        }

        const {activeItem} = this.state

        return (
            <Menu className="fixed borderless" style={divStyle} secondary>
                <Menu.Item
                    name=' CreditCount by Hobee '
                    style={aStyle}
                    active={activeItem === 'CreditCount by Hobee'}
                    onClick={() => this.handleItemClick()}
                />
                <Menu.Item
                    name=' BUAA SEM 本科一般专业课学分核算 '
                    style={aStyle}
                    active={activeItem === 'BUAA SEM 本科一般专业课学分核算'}
                    onClick={() => this.handleItemClick()}
                />
                <Menu.Item
                    name=' 满25分即可 '
                    style={aStyle}
                    active={activeItem === ' 满25分即可 '}
                    onClick={() => this.handleItemClick()}
                />
                <Menu.Item
                    name=' 愿大家都能顺利毕业 '
                    style={aStyle}
                    active={activeItem === ' 愿大家都能顺利毕业 '}
                    onClick={() => this.handleItemClick()}
                />
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Input icon='search' placeholder='Search...'/>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        );
    }
}

ReactDOM.render(
    <MenuBar/>,
    document.getElementById('menu')
);