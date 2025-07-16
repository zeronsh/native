import { auth } from '$auth';

const handler = auth.handler;

export { handler as GET, handler as POST };
