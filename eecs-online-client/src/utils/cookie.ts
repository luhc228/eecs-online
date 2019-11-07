/* eslint-disable @typescript-eslint/no-angle-bracket-type-assertion */
interface CookieOptions {
  path?: string;
  expires?: number;
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: boolean | 'lax' | 'strict';
}

interface Cookies {
  [key: string]: string
}

const cookieUtil = {
  getCookiesObj() {
    const cookies: Cookies = {};
    if (document.cookie) {
      const objects = document.cookie.split(';');
      for (const i in objects) {
        const index = objects[i].indexOf('=');
        const key = objects[i].substr(0, index).trim();
        const value = objects[i].substr(index + 1, objects[i].length);
        cookies[key] = value;
      }
    }
    return cookies;
  },

  setItem(name: string, value: string, opts?: CookieOptions) {
    if (name && value) {
      let cookie = `${name}=${value}`;
      if (opts) {
        if (opts.expires) {
          cookie += `;expires=${opts.expires}`;
        }
        if (opts.maxAge) {
          cookie += `;max-age=${opts.maxAge}`;
        }
        if (opts.path) {
          cookie += `;path=${opts.path}`;
        }
        if (opts.domain) {
          cookie += `;domain=${opts.domain}`;
        }
        if (opts.secure) {
          cookie += `;secure=${opts.secure}`;
        }
      }
      document.cookie = cookie;
      return cookie;
    }
    return '';
  },

  getItem(name: string) {
    return this.getCookiesObj()[name];
  },

  removeItem(name: string) {
    if (this.getCookiesObj()[name]) {
      document.cookie = `${name}=;max-age=0`;
    }
  },

  clear() {
    const cookies = this.getCookiesObj();
    for (const i in cookies) {
      document.cookie = `${cookies[i]}=;max-age=0`;
    }
  },
};


export default cookieUtil;
