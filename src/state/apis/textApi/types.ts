export type Region = 'WEST_OAKLAND' | 'EAST_OAKLAND';

export interface SendTextBody {
  message: string;
  region: Region;
  photo?: string | File;
  feedbackId?: string;
  number?: string;
};


export interface AddPhoneArgs {
  phone: string;
  region: Region
}

export interface GetPhoneNumberResponse {
  number: string;
  id: string;
}

export interface MessageInstance {
  sid: string;
  accountSid: string;
  attributes: string;
  author: string;
  body: string;
  chatServiceSid: string;
  conversationSid: string;
  dateCreated: string;
  dateUpdated: string;
  delivery: any;
}

export type GetTextRecordsArgs = {
  startDate: string
}

export interface TextRecord {
  id: string,
    message: string,
    date: string,
    sender: string,
    region: Region,
    image: string,
}

export interface SendTextResponse {
  message: string;
  region: Region;
  photoUrl?: string;
  number: string;
  sendAt?: string;
};

