import { Request, Response, NextFunction } from 'express';
import STATUS_CODES from '../constants';
import config from '../config';


export const apiKeyChecker = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const apiKey = req.headers['api-key'] as string;
	if (apiKey !== config.API_KEY)
		return res
			.status(STATUS_CODES.UNAUTHORIZED)
			.json({ message: 'Unauthorized' });
	next();
};

