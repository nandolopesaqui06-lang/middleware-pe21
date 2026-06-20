import { EventEmitter } from 'node:events';
import { afterEach, describe, expect, it, jest } from '@jest/globals';
import type { NextFunction, Request, Response } from 'express';
import { requestLogger } from './logger';

describe('requestLogger', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('invoca next() al recibir una petición', () => {
    const req = {
      method: 'GET',
      path: '/inscripciones'
    } as Request;

    const res = new EventEmitter() as Response;
    res.statusCode = 200;

    const next = jest.fn() as NextFunction;

    requestLogger(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
  });

  it('registra el método y la ruta correctamente', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined);

    const req = {
      method: 'POST',
      path: '/api/v1/inscripciones'
    } as Request;

    const res = new EventEmitter() as Response;
    res.statusCode = 201;

    const next = jest.fn() as NextFunction;

    requestLogger(req, res, next);
    res.emit('finish');

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('POST /api/v1/inscripciones'));
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('-> 201'));
  });
});