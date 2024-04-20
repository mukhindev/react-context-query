export function joinUrlParts(origin: string, pathname?: string): string {
  if (pathname && !pathname?.startsWith("/")) {
    return pathname;
  }

  if (!pathname) {
    return origin;
  }

  return `${origin}${pathname.replace(/\/{2,}/g, "/")}`;
}
