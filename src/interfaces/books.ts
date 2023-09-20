export interface ImageLinks {
    smallThumbnail: string;
    thumbnail: string;
    small?: string; 
}

interface ReadingModes {
    text: boolean;
    image: boolean;
}

interface PanelizationSummary {
    containsEpubBubbles: boolean;
    containsImageBubbles: boolean;
}

export interface VolumeInfo {
    title: string;
    subtitle?: string; 
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    industryIdentifiers: { type: string; identifier: string }[];
    readingModes?: ReadingModes; 
    pageCount: number;
    printedPageCount?: number; 
    printType?: string; 
    categories: string[];
    averageRating?: number;
    ratingsCount?: number;
    maturityRating?: string; 
    allowAnonLogging?: boolean; 
    contentVersion?: string; 
    panelizationSummary?: PanelizationSummary; 
    imageLinks: ImageLinks;
    language: string;
    previewLink: string;
    infoLink: string;
    canonicalVolumeLink: string;
}

interface Layer {
    layerId: string;
    volumeAnnotationsVersion: string;
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
    offers?: { 
        finskyOfferType: number;
        listPrice: {
            amountInMicros: number;
            currencyCode: string;
        };
        retailPrice: {
            amountInMicros: number;
            currencyCode: string;
        };
    }[];
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
    };
    webReaderLink: string;
    accessViewStatus: string;
    quoteSharingAllowed?: boolean; 
}

export interface BookDetails {
    kind: string;
    id: string;
    etag?: string; 
    selfLink: string;
    volumeInfo: VolumeInfo;
    layerInfo?: { 
        layers: Layer[];
    };
    saleInfo: SaleInfo;
    accessInfo: AccessInfo;
}

export interface BooksResponse {
    kind: string;
    totalItems: number;
    items: BookDetails[];
}
