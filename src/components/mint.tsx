import { PureComponent } from "react";
import { Button } from "react-bootstrap";
import { connect } from 'react-redux';

class Mint extends PureComponent {
    render() {
        return (
            <Button>Mint</Button>
        )
    }
}

const MintContainer = connect(null)(Mint)

export { MintContainer }
