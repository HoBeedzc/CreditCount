'use strict';

const { Divider, Form, Label } = semanticUIReact;

class CourseFilter extends React.Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        return (
            <Form>
                <Form.Field>
                    <input type='text' placeholder='First name' />
                    <Label pointing>Please enter a value</Label>
                </Form.Field>
                <Divider />

                <Form.Field>
                    <Label pointing='below'>Please enter a value</Label>
                    <input type='text' placeholder='Last Name' />
                </Form.Field>
                <Divider />

                <Form.Field inline>
                    <input type='text' placeholder='Username' />
                    <Label pointing='left'>That name is taken!</Label>
                </Form.Field>
                <Divider />

                <Form.Field inline>
                    <Label pointing='right'>Your password must be 6 characters or more</Label>
                    <input type='password' placeholder='Password' />
                </Form.Field>
            </Form>
        );
    }
}

ReactDOM.render(
    <CourseFilter />,
    document.getElementById('course-filter')
);
