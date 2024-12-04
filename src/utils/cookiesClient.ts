class CookieClient {
  /**
   * Set a cookie with optional expiration
   *
   * @param {string} name - Cookie name
   * @param {string} value - Cookie value
   * @param {number} days - Number of days until the cookie expires
   */
  public set = (name: string, value: string, days?: number): void => {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = `; expires=${date.toUTCString()}`;
    }

    const encodedValue = encodeURIComponent(value || '');
    document.cookie = `${name}=${encodedValue}${expires}; path=/; SameSite=Strict`;
  };

  /**
   * Retrieve the value of a cookie
   *
   * @param {string} name - Cookie name to retrieve
   * @return {string | null} The cookie value or null if not found
   */
  public get = (name: string): string | null => {
    const nameEQ = `${name}=`;
    const cookies = document.cookie.split(';');

    for (const cookie of cookies) {
      const trimmedCookie = cookie.trim();
      if (trimmedCookie.startsWith(nameEQ)) {
        return decodeURIComponent(trimmedCookie.substring(nameEQ.length));
      }
    }
    return null;
  };

  /**
   * Delete a specific cookie
   *
   * @param {string} name - Cookie name to delete
   */
  public del = (name: string): void => {
    document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Strict`;
  };
}

const cookieClient = new CookieClient();

export default cookieClient;
