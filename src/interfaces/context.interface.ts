import { Request, Response } from 'express';

import { User } from '../schemas/user.schema';

export interface Context {
	req: Request;
	res: Response;
	user: User | null;
}

export default Context;
