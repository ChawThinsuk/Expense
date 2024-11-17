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