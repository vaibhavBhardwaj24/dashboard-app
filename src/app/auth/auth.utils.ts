export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false;
  return Boolean(localStorage.getItem("token"));
};

import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";

export const requireAuth = <P extends Record<string, unknown>>(
  gssp: GetServerSideProps<P>
): GetServerSideProps<P> => {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    return await gssp(context);
  };
};
