import React, { useEffect, useState } from 'react';

import Spacer from 'react-spacer';

import { HiUserCircle } from "react-icons/hi";
import { AiFillHeart } from "react-icons/ai";
import { makeStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";

import uniqid from "uniqid";

const useStyles = makeStyles({
  container: {
    color: "black"
  },
  root: {
    display: "flex",
    flexDirection: "column"
  },
  headerRoot: {
    display: "flex",
    paddingBottom: "0px"
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "0px 0px",
  },
  actionsContainer: {
    padding: "1.25rem"
  },
  avatar: {
    display: "flex",
    paddingTop: "3px",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default function Post(props) {
  const [tags, setTags] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    setTags(props.tags);
  }, [props.tags]);

  return (
    <div className={classes.container}>
      <Card variant="outlined" classes={{root: classes.root}}>
        <CardHeader
          classes={{
            avatar: classes.avatar,
            root: classes.headerRoot
          }}
          avatar={
            <HiUserCircle className={classes.avatar} size="40"/>
          } 
          title={props.author}
        />
        <CardContent
          classes={{
            root: classes.contentContainer
          }}
        >
          <div className="post">
            <h2 style={{color:'black'}}>Reccomendation: {props.artist} - {props.title}</h2>
            <p><a href={props.link}>Track link</a></p>
            <div className={classes.tagDiv}>
              {tags.map(tag => (
                <li key={uniqid()}>{tag}</li>
              ))}
            </div>
          </div>
        </CardContent>
        <CardActions
          classes={{root: classes.actionsContainer}}
        >
          <AiFillHeart size="30px"/>
          <p>{props.likes}</p>
          <Spacer width="32px" />
        </CardActions>
      </Card>
      <Spacer height="20px" />
    </div>
  )
}
