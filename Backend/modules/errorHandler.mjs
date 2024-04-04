import express from 'express'
import { HttpCodes } from "./httpCodes.mjs";

const errorHandler = ((err, req, res, next) => {
  console.error(err.stack);
  const errorMessage = 'Something went wrong! ' + err;
  res.status(HttpCodes.ServerSideErrorRespons.InternalServerError).send(errorMessage);
});

export default errorHandler
