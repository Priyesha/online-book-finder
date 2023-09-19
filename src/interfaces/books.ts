export interface ImageLinks {
    smallThumbnail: string;
    thumbnail: string;
}

export interface VolumeInfo {
    title: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    industryIdentifiers: { type: string; identifier: string }[];
    pageCount: number;
    categories: string[];
    averageRating?: number;
    ratingsCount?: number;
    imageLinks: ImageLinks;
    language: string;
    previewLink: string;
    infoLink: string;
    canonicalVolumeLink: string;
}

export interface SaleInfo {
    country: string;
    saleability: string;
    isEbook: boolean;
    listPrice?: {
        amount: number;
        currencyCode: string;
    };
    retailPrice?: {
        amount: number;
        currencyCode: string;
    };
    buyLink: string;
}

export interface AccessInfo {
    country: string;
    viewability: string;
    embeddable: boolean;
    publicDomain: boolean;
    textToSpeechPermission: string;
    epub: {
        isAvailable: boolean;
        acsTokenLink?: string;
    };
    pdf: {
        isAvailable: boolean;
        acsTokenLink?: string;
    };
    webReaderLink: string;
    accessViewStatus: string;
}

export interface BookDetails {
    id: string;
    selfLink: string;
    volumeInfo: VolumeInfo;
    saleInfo: SaleInfo;
    accessInfo: AccessInfo;
}

export interface BooksResponse {
    kind: string;
    totalItems: number;
    items: BookDetails[];
}