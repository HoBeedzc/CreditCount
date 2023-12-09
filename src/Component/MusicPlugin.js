import React from 'react';
import {Segment} from 'semantic-ui-react';

class MusicPlugin extends React.Component {
    render() {
        return (
            <Segment>
                <iframe
                    title="Music"
                    width='250'
                    height='90'
                    src="//music.163.com/outchain/player?type=2&id=1456673752&auto=1&height=66" />
            </Segment>
        )
    }
}

export default MusicPlugin;