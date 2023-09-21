export const mockBookList = {
    "kind": "books#volumes",
    "totalItems": 986,
    "items": [
      {
        "kind": "books#volume",
        "id": "N2EPywAACAAJ",
        "etag": "oDzRnpR59Ck",
        "selfLink": "https://www.googleapis.com/books/v1/volumes/N2EPywAACAAJ",
        "volumeInfo": {
          "title": "Rich Dad's Cashflow Quadrant",
          "subtitle": "Guide to Financial Freedom",
          "authors": [
            "Robert T. Kiyosaki"
          ],
          "publisher": "Grove Press",
          "publishedDate": "2011",
          "description": "Tired of living paycheck to paycheck? Learn why some people work less but earn more. Pay less in taxes, and learn to make their money work for them. It's simply knowing which quadrant to work from -- and when. The wealthy know that the keys to wealth and financial freedom are found on the right side of the quadrant, through business and investing.",
          "industryIdentifiers": [
            {
              "type": "ISBN_10",
              "identifier": "1612680062"
            },
            {
              "type": "ISBN_13",
              "identifier": "9781612680064"
            }
          ],
          "readingModes": {
            "text": false,
            "image": false
          },
          "pageCount": 374,
          "printType": "BOOK",
          "categories": [
            "Business & Economics"
          ],
          "averageRating": 4,
          "ratingsCount": 14,
          "maturityRating": "NOT_MATURE",
          "allowAnonLogging": false,
          "contentVersion": "preview-1.0.0",
          "panelizationSummary": {
            "containsEpubBubbles": false,
            "containsImageBubbles": false
          },
          "imageLinks": {
            "smallThumbnail": "http://books.google.com/books/content?id=N2EPywAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
            "thumbnail": "http://books.google.com/books/content?id=N2EPywAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
          },
          "language": "en",
          "previewLink": "http://books.google.ae/books?id=N2EPywAACAAJ&dq=richdad&hl=&cd=2&source=gbs_api",
          "infoLink": "http://books.google.ae/books?id=N2EPywAACAAJ&dq=richdad&hl=&source=gbs_api",
          "canonicalVolumeLink": "https://books.google.com/books/about/Rich_Dad_s_Cashflow_Quadrant.html?hl=&id=N2EPywAACAAJ"
        },
        "saleInfo": {
          "country": "AE",
          "saleability": "NOT_FOR_SALE",
          "isEbook": false
        },
        "accessInfo": {
          "country": "AE",
          "viewability": "NO_PAGES",
          "embeddable": false,
          "publicDomain": false,
          "textToSpeechPermission": "ALLOWED",
          "epub": {
            "isAvailable": false
          },
          "pdf": {
            "isAvailable": false
          },
          "webReaderLink": "http://play.google.com/books/reader?id=N2EPywAACAAJ&hl=&source=gbs_api",
          "accessViewStatus": "NONE",
          "quoteSharingAllowed": false
        },
        "searchInfo": {
          "textSnippet": "Outlines a strategy for attaining wealth by looking for business opportunities and investing wisely, rather than seeking security through employment."
        }
      }
    ]
  }

export const mockBookDetails = {
  volumeInfo: {
    title: 'Sample Title',
    authors: ['Author 1', 'Author 2'],
    description: 'Sample description with more than thirty words. This will allow us to test the show more and show less functionality in the component.',
    publishedDate: '2023',
    categories: ['Category 1', 'Category 2'],
    averageRating: 4.5,
    ratingsCount: 150,
    imageLinks: {
      thumbnail: 'sample-thumbnail.jpg'
    }
  }
};