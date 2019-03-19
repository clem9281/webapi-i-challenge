import React from 'react';
import {ListGroupItem, ListGroupItemHeading, ListGroupItemText} from "reactstrap";

const User = (props) => {
  console.log(props);
  const {name, bio} = props.user;
    return ( 
     
        <ListGroupItem>
          <ListGroupItemHeading className="mb-3">{name}</ListGroupItemHeading>
          <ListGroupItemText className="mb-1">{bio}</ListGroupItemText>
        </ListGroupItem>
     
  )
}
 
export default User;