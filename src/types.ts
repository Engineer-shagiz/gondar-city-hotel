export interface Room {
  id: number;
  name: string;
  price: string;
  size: string;
  guests: string;
  features: string[];
  image_url: string; 
  video_url?: string; // አሁን ከጋለሪ የሚመጣ ቪዲዮም እዚህ ሊንክ ሆኖ ይቀመጣል
  status: 'available' | 'booked' | 'out_of_service';
  bank_details?: string;
  telebirr_details?: string;
  is_event?: boolean; // ለሰፊው የባህል ምሽት መለያ
  description?: string; // ለባህል ምሽቱ ሰፊ ማብራሪያ ጽሑፍ
}