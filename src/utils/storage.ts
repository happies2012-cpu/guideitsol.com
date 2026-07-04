// Local storage wrapper with type safety
class StorageManager {
  private prefix = 'guideitsol_';

  set<T>(key: string, value: T, expiresIn?: number): void {
    try {
      const item = {
        value,
        timestamp: Date.now(),
        expiresIn: expiresIn ? Date.now() + expiresIn : null,
      };
      localStorage.setItem(this.prefix + key, JSON.stringify(item));
    } catch (error) {
      console.error('[v0] Storage set error:', error);
    }
  }

  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(this.prefix + key);
      if (!item) return null;

      const parsed = JSON.parse(item);
      
      // Check expiration
      if (parsed.expiresIn && parsed.expiresIn < Date.now()) {
        this.remove(key);
        return null;
      }

      return parsed.value as T;
    } catch (error) {
      console.error('[v0] Storage get error:', error);
      return null;
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(this.prefix + key);
    } catch (error) {
      console.error('[v0] Storage remove error:', error);
    }
  }

  clear(): void {
    try {
      Object.keys(localStorage)
        .filter((key) => key.startsWith(this.prefix))
        .forEach((key) => localStorage.removeItem(key));
    } catch (error) {
      console.error('[v0] Storage clear error:', error);
    }
  }

  getAll(): Record<string, any> {
    const result: Record<string, any> = {};
    try {
      Object.keys(localStorage)
        .filter((key) => key.startsWith(this.prefix))
        .forEach((key) => {
          const cleanKey = key.replace(this.prefix, '');
          const value = this.get(cleanKey);
          if (value !== null) {
            result[cleanKey] = value;
          }
        });
    } catch (error) {
      console.error('[v0] Storage getAll error:', error);
    }
    return result;
  }
}

// Session storage wrapper
class SessionStorageManager {
  private prefix = 'guideitsol_session_';

  set<T>(key: string, value: T): void {
    try {
      sessionStorage.setItem(this.prefix + key, JSON.stringify(value));
    } catch (error) {
      console.error('[v0] Session storage set error:', error);
    }
  }

  get<T>(key: string): T | null {
    try {
      const item = sessionStorage.getItem(this.prefix + key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('[v0] Session storage get error:', error);
      return null;
    }
  }

  remove(key: string): void {
    try {
      sessionStorage.removeItem(this.prefix + key);
    } catch (error) {
      console.error('[v0] Session storage remove error:', error);
    }
  }

  clear(): void {
    try {
      Object.keys(sessionStorage)
        .filter((key) => key.startsWith(this.prefix))
        .forEach((key) => sessionStorage.removeItem(key));
    } catch (error) {
      console.error('[v0] Session storage clear error:', error);
    }
  }
}

export const storage = new StorageManager();
export const sessionStorage_manager = new SessionStorageManager();
