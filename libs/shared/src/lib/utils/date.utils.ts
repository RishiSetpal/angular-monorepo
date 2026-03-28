export class DateUtils {
  static formatDate(date: Date | string | null, format = 'DD-MMMM-YYYY'): string {
    if (!date) return '';
    const d = typeof date === 'string' ? new Date(date) : date;
    
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const day = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    
    return format
      .replace('DD', day.toString().padStart(2, '0'))
      .replace('D', day.toString())
      .replace('MMMM', month)
      .replace('MMM', month.substring(0, 3))
      .replace('YYYY', year.toString())
      .replace('YY', year.toString().slice(-2));
  }

  static parseDate(dateString: string): Date | null {
    if (!dateString) return null;
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  }

  static isValidDate(date: any): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }

  static addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  static diffDays(date1: Date, date2: Date): number {
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  static toISOString(date: Date): string {
    return date.toISOString();
  }

  static startOfDay(date: Date): Date {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    return result;
  }

  static endOfDay(date: Date): Date {
    const result = new Date(date);
    result.setHours(23, 59, 59, 999);
    return result;
  }
}
