import React from "react";
import {connect} from "react-redux";

class Alert extends React.Component {
    render() {
        return(
            <div className={'alert'}>
                {this.props.alert}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        alert: state.checkers.alert
    }
}

export default connect(mapStateToProps, null)(Alert);