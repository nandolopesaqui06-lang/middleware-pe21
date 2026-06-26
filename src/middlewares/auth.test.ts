import { describe, expect, it, jest } from '@jest/globals';
import type { NextFunction, Request, Response } from 'express';
import { requireApiKey } from './auth.js';

describe('requireApiKey', () => {
  it('responde 401 cuando falta x-api-key', () => {
    const req = {
      headers: {}
    } as unknown as Request;

    const json = jest.fn();
    const status = jest.fn().mockReturnValue({ json });
    const res = {
      status,
      json
    } as unknown as Response;

    const next = jest.fn() as NextFunction;

    requireApiKey(req, res, next);

    expect(status).toHaveBeenCalledWith(401);
    expect(json).toHaveBeenCalledWith({ error: 'API key inválida o ausente' });
    expect(next).not.toHaveBeenCalled();
  });

  it('responde 401 cuando la clave es incorrecta', () => {
    const req = {
      headers: {
        'x-api-key': 'incorrecta'
      }
    } as unknown as Request;

    const json = jest.fn();
    const status = jest.fn().mockReturnValue({ json });
    const res = {
      status,
      json
    } as unknown as Response;

    const next = jest.fn() as NextFunction;

    requireApiKey(req, res, next);

    expect(status).toHaveBeenCalledWith(401);
    expect(json).toHaveBeenCalledWith({ error: 'API key inválida o ausente' });
    expect(next).not.toHaveBeenCalled();
  });

  it('invoca next() cuando la clave es válida', () => {
    const req = {
      headers: {
        'x-api-key': 'secreto-demo'
      }
    } as unknown as Request;

    const json = jest.fn();
    const status = jest.fn().mockReturnValue({ json });
    const res = {
      status,
      json
    } as unknown as Response;

    const next = jest.fn() as NextFunction;

    requireApiKey(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(status).not.toHaveBeenCalled();
    expect(json).not.toHaveBeenCalled();
  });
});