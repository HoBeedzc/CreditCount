'use strict';

const {Segment} = semanticUIReact;

class MusicPlugin extends React.Component {
    render() {
        return (
            <Segment>
                <iframe
                    width='250'
                    height='90'
                    src="//music.163.com/outchain/player?type=2&id=1456673752&auto=1&height=66" />
            </Segment>
        )
    }
}

ReactDOM.render(
    <MusicPlugin/>,
    document.getElementById('music-plugin')
);