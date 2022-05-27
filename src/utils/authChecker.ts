import { AuthChecker } from 'type-graphql';

import Context from '../interfaces/context.interface';

const authChecker: AuthChecker<Context> = ({ context }) => !!context.user;

export default authChecker;
