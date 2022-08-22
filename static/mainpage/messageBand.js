"use strict";

const {Message, Step, Progress, Segment} = semanticUIReact;

class disclaimers extends React.Component {

}

class noticeMessage extends React.Component {

}

class useGuide extends React.Component {

}

class StepBar extends React.Component {
    render() {
        return (
            <Segment>
                <Step.Group widths='equal'>
                    <Step completed>
                        <Icon name='truck'/>
                        <Step.Content>
                            <Step.Title>Shipping</Step.Title>
                            <Step.Description>Choose your shipping options</Step.Description>
                        </Step.Content>
                    </Step>

                    <Step active>
                        <Icon name='payment'/>
                        <Step.Content>
                            <Step.Title>Billing</Step.Title>
                            <Step.Description>Enter billing information</Step.Description>
                        </Step.Content>
                    </Step>

                    <Step disabled>
                        <Icon name='info'/>
                        <Step.Content>
                            <Step.Title>Confirm Order</Step.Title>
                        </Step.Content>
                    </Step>

                    <Step disabled>
                        <Icon name='info'/>
                        <Step.Content>
                            <Step.Title>Confirm Order</Step.Title>
                        </Step.Content>
                    </Step>
                </Step.Group>
                <Progress percent='1' indicating/>
            </Segment>
        )
    }
}

class MessageBand extends React.Component {
    render() {
        return (
            <StepBar/>
        );
    }
}

ReactDOM.render(
    <MessageBand/>,
    document.getElementById('message-band')
);