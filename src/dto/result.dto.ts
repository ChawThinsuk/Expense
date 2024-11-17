export interface ServiceResultDTO {
    message: string;
    results: string;
}
export interface CdnResultDTO {
    success: boolean
    message: string;
    cdnUrl?: string;
    publicId?: string
}  

export interface TransactionResultDTO {
    account_name: string;
    category_name: string;
    amount: number;
    date: Date;
    comment: string;
    slip_image_url: string;
    transaction_type: string;
}
  
  export interface TransactionResponseDTO {
    message: string;
    results: TransactionResultDTO[];
    pagination: PaginationDTO
  }
  export interface PaginationDTO {
    totalCount: number
    totalPages: number
    currentPage: number,
    pageSize: number
  }
  export interface TransactionSummaryResultDTO {
    total_income: number;
    total_expense: number
}
  
  export interface TransactionSummaryResponseDTO {
    message: string;
    results: TransactionSummaryResultDTO;
  }