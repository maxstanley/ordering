import React from "react";
import { CircularProgress } from '@material-ui/core';

interface Props {
}

function Loading(props: Props) {

  return (
    <CircularProgress color="secondary" />
  )
}

export default Loading;