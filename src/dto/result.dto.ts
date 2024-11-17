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
export interface CategoryResultsDTO {
    category_id:number
    user_id:number
    category_name:string
  }
  export interface CategoryResponseDTO {
    message: string;
    results: CategoryResultsDTO[];
  }
  export interface AccountResultsDTO {
    account_id:number
    user_id:number
    account_name:string
  }
  export interface AccountResponseDTO {
    message: string;
    results: AccountResultsDTO[];
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

