// Güvenlik yardımcı fonksiyonları

/**
 * HTML içeriğini temizler ve güvenli hale getirir
 */
export const sanitizeHtml = (html: string): string => {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
};

/**
 * XSS saldırılarını önlemek için metni temizler
 */
export const sanitizeText = (text: string): string => {
  return text
    .replace(/[<>]/g, '') // < ve > karakterlerini kaldır
    .replace(/javascript:/gi, '') // javascript: protokolünü kaldır
    .replace(/on\w+=/gi, '') // on* event handler'larını kaldır
    .trim();
};

/**
 * E-posta formatını doğrular
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Güçlü şifre kontrolü
 */
export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Şifre en az 8 karakter olmalıdır');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('En az bir büyük harf içermelidir');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('En az bir küçük harf içermelidir');
  }
  
  if (!/\d/.test(password)) {
    errors.push('En az bir rakam içermelidir');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('En az bir özel karakter içermelidir');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * CSRF token oluşturur
 */
export const generateCSRFToken = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

/**
 * Dosya uzantısını kontrol eder
 */
export const validateFileType = (fileName: string, allowedTypes: string[]): boolean => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  return extension ? allowedTypes.includes(extension) : false;
};

/**
 * Dosya boyutunu kontrol eder (MB cinsinden)
 */
export const validateFileSize = (fileSize: number, maxSizeMB: number): boolean => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return fileSize <= maxSizeBytes;
};

/**
 * URL'yi güvenli hale getirir
 */
export const sanitizeUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);
    // Sadece http ve https protokollerine izin ver
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return '';
    }
    return urlObj.toString();
  } catch {
    return '';
  }
};

/**
 * Rate limiting için basit kontrol
 */
export class RateLimiter {
  private attempts: Map<string, { count: number; resetTime: number }> = new Map();
  
  constructor(private maxAttempts: number = 5, private windowMs: number = 15 * 60 * 1000) {}
  
  isAllowed(key: string): boolean {
    const now = Date.now();
    const attempt = this.attempts.get(key);
    
    if (!attempt || now > attempt.resetTime) {
      this.attempts.set(key, { count: 1, resetTime: now + this.windowMs });
      return true;
    }
    
    if (attempt.count >= this.maxAttempts) {
      return false;
    }
    
    attempt.count++;
    return true;
  }
  
  reset(key: string): void {
    this.attempts.delete(key);
  }
} 