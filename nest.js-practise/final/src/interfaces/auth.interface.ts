import { NextFunction, Request, Response } from 'express';
import { User } from 'src/user/user.schema';

export interface IRequest extends Request {
  user?: User;
  token?: string;
}

export interface IResponse extends Response {}
export interface INext extends NextFunction {}
