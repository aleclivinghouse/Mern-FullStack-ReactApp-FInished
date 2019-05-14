import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
// import uuid from "uuid/v4";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";
import PropTypes from 'prop-types';
import Spinner from "./common/Spinner";

class ShoppingList extends Component {

  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = (id) => {
    this.props.deleteItem(id);
  }
  render() {
    let itemContent;
    const { items, loading } = this.props.item;

    if(loading === true) {
      itemContent = <Spinner />
    } else {
      itemContent = 
      <TransitionGroup className="shopping-list">
      {/* Iterate through the state: */}
      {items.map(({ _id, name }) => (
        <CSSTransition key={_id} timeout={500} classNames="fade">
          <ListGroupItem>
            <Button className="remove-btn"
              color="danger"
              size="sm"
              onClick={this.onDeleteClick.bind(this, _id)}> &times; </Button>
            {name}
          </ListGroupItem>
        </CSSTransition>
      ))}
    </TransitionGroup>
    }
    return (
      <Container>
        <ListGroup>
          {itemContent}
        </ListGroup>
      </Container>
    )
  }
}

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  item: state.item
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);