
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex');
const TOKEN_EXPIRY = '24h';

interface TokenPayload {
  userId: number;
  email: string;
  role: string;
  [key: string]: any;
}

/**
 * Security service providing authentication and protection functions
 */
export class SecurityService {
  /**
   * Generate a JWT token
   */
  public generateToken(payload: TokenPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
  }

  /**
   * Verify a JWT token
   */
  public verifyToken(token: string): TokenPayload | null {
    try {
      return jwt.verify(token, JWT_SECRET) as TokenPayload;
    } catch (error) {
      return null;
    }
  }

  /**
   * Hash a password using bcrypt-like approach
   */
  public async hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      // Generate a salt
      crypto.randomBytes(16, (err, salt) => {
        if (err) return reject(err);
        
        // Hash the password with the salt
        crypto.pbkdf2(password, salt, 10000, 64, 'sha512', (err, derivedKey) => {
          if (err) return reject(err);
          
          // Format: salt.hash
          resolve(`${salt.toString('hex')}.${derivedKey.toString('hex')}`);
        });
      });
    });
  }

  /**
   * Verify a password against a hash
   */
  public async verifyPassword(password: string, storedHash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const [salt, hash] = storedHash.split('.');
      
      // Hash the input password with the same salt
      crypto.pbkdf2(password, Buffer.from(salt, 'hex'), 10000, 64, 'sha512', (err, derivedKey) => {
        if (err) return reject(err);
        
        // Compare the generated hash with the stored hash
        resolve(derivedKey.toString('hex') === hash);
      });
    });
  }

  /**
   * Generate a secure random token (for password reset, etc.)
   */
  public generateSecureToken(length = 32): string {
    return crypto.randomBytes(length).toString('hex');
  }

  /**
   * Sanitize input to prevent XSS
   */
  public sanitizeInput(input: string): string {
    if (!input) return '';
    
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }

  /**
   * Create a CSRF token
   */
  public generateCsrfToken(): string {
    return crypto.randomBytes(16).toString('hex');
  }

  /**
   * Validate user input using regex patterns
   */
  public validatePattern(input: string, pattern: RegExp): boolean {
    return pattern.test(input);
  }

  /**
   * Validate common input patterns
   */
  public validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return this.validatePattern(email, emailPattern);
  }

  public validatePhone(phone: string): boolean {
    // International phone format
    const phonePattern = /^\+?[0-9]{8,15}$/;
    return this.validatePattern(phone.replace(/\D/g, ''), phonePattern);
  }
}

// Export a singleton instance
export const security = new SecurityService();
