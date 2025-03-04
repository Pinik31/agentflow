
import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import { AppError } from "./errorHandler";

export const validate = (schema: AnyZodObject) => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      next(new AppError(400, 'Validation Error'));
    }
};
import { z } from "zod";

/**
 * Validates input data against a Zod schema
 * @param schema The Zod schema to validate against
 * @param data The data to validate
 * @returns Object containing success status, validated data, and any errors
 */
export function validate<T>(schema: z.ZodType<T>, data: unknown): {
  success: boolean;
  data?: T;
  errors?: z.ZodError['errors'];
} {
  try {
    const validData = schema.parse(data);
    return {
      success: true,
      data: validData
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors
      };
    }
    
    // For non-Zod errors, return a generic error
    return {
      success: false,
      errors: [{ 
        path: ["_general"], 
        message: "An unexpected validation error occurred" 
      }]
    };
  }
}

/**
 * Sanitizes a string for safe storage/display
 * @param input The string to sanitize
 * @returns Sanitized string
 */
export function sanitizeString(input: string): string {
  if (!input) return '';
  
  // Replace potentially dangerous characters
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Validates and sanitizes an email address
 * @param email The email to validate
 * @returns Validated and sanitized email or null if invalid
 */
export function validateEmail(email: string): string | null {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email || !emailRegex.test(email)) {
    return null;
  }
  return sanitizeString(email.toLowerCase().trim());
}

/**
 * Validates and sanitizes a phone number
 * @param phone The phone number to validate
 * @returns Validated and sanitized phone or null if invalid
 */
export function validatePhone(phone: string): string | null {
  // Strip non-digits
  const digits = phone.replace(/\D/g, '');
  
  // Check if we have a reasonable number of digits
  if (digits.length < 10 || digits.length > 15) {
    return null;
  }
  
  // Return formatted phone number
  return digits;
}
