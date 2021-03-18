import React from "react";
import { Comment } from "semantic-ui-react";

const ReplyItem = ({ reply }) => {
  return (
    <Comment>
      <Comment.Avatar src={reply.user.avatar} />
      <Comment.Content>
        <Comment.Author as="a">{reply.user.name}</Comment.Author>
        <Comment.Metadata>
          <div>just now</div>
        </Comment.Metadata>
        <Comment.Text>{reply.text}</Comment.Text>
      </Comment.Content>
    </Comment>
  );
};

export default ReplyItem;
