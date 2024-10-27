const AUTH_SESSION_KEY = 'authenticated';

export async function getAuthSession(
  request: Request
): Promise<AuthSession | null | undefined> {
  const session = await getSession(request);
  return session.get(AUTH_SESSION_KEY);
}

export interface AuthSession {
  userId: string;
  email: string;
}

import type { Session } from '@remix-run/node';
import { createCookieSessionStorage, redirect } from '@remix-run/node';

const SESSION_MAX_AGE = 8 * 60 * 60; // 8 hours (one shift);

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '__session',
    httpOnly: true,
    maxAge: SESSION_MAX_AGE,
    path: '/',
    sameSite: 'lax',
    secrets: ['test'],
    secure: process.env.NODE_ENV === 'production',
  },
});

export function getSession(request: Request) {
  const cookie = request.headers.get('Cookie');
  return sessionStorage.getSession(cookie);
}

export async function destroySession(request: Request, redirectTo = '') {
  const session = await getSession(request);

  return redirect('', {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session),
    },
  });
}

export type CommitSessionParams = {
  session: Session;
};

export type RedirectWithSessionParams = {
  redirectUrl: string;
} & CommitSessionParams;

/**
 * If this method is thrown it needs to be awaited, otherwise it can just be returned
 * @param redirectUrl Redirect url
 * @param session Session
 * @returns Returns redirect response with session cookie
 */
export async function redirectWithSession({
  redirectUrl,
  session,
}: RedirectWithSessionParams) {
  return redirect(redirectUrl, {
    headers: {
      'Set-Cookie': await commitSession({ session }),
    },
  });
}

export function commitSession({ session }: CommitSessionParams) {
  return sessionStorage.commitSession(session, {
    maxAge: SESSION_MAX_AGE,
  });
}