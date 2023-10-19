import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import STATUS_CODES from '../constants';
import config from '../config';
import User from '../models/User';
import Role from '../models/Role';

export const verifyToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const token = req.headers['x-access-token'] as string;
		if (!token)
			return res
				.status(STATUS_CODES.FORBIDDEN)
				.json({ message: 'No token provided' });

		const decoded = jwt.verify(token, config.SECRET) as { id: string } | null;
		req.body.userId = decoded?.id ?? '';
		const user = await User.findById(req.body.userId);
		if (!user)
			return res
				.status(STATUS_CODES.FORBIDDEN)
				.json({ message: 'Unauthorized' });

		next();
	} catch (error) {
		return res
			.status(STATUS_CODES.UNAUTHORIZED)
			.json({ message: 'Unauthorized' });
	}
};

export const IsModerator = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const user = await User.findById(req.body.userId).populate('roles');
	const roles = await Role.find({ _id: { $in: user?.roles } });
	let valid = false;
	roles.forEach((role) => {
		if (role.name === 'moderator') {
			valid = true;
		}
	});
	if (valid) return next();
	res
		.status(STATUS_CODES.FORBIDDEN)
		.json({ message: 'Require Moderator Role' });
};
export const IsAdmin = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
    const user = await User.findById(req.body.userId).populate('roles');
	const roles = await Role.find({ _id: { $in: user?.roles } });
	let valid = false;
	roles.forEach((role) => {
		if (role.name === 'admin') {
			valid = true;
		}
	});
	if (valid) return next();
	res
		.status(STATUS_CODES.FORBIDDEN)
		.json({ message: 'Require admin Role' });
};
