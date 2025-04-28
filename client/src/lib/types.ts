export interface Event {
  id: number;
  name: string;
  state: string;
  date: string;
  email: string;
  link: string;
}

export interface Story {
  id: number;
  title: string;
  author: string;
  date: string;
  description: string;
  imageUrl: string;
  sourceLink: string;
}

export interface Chapter {
  id: number;
  name: string;
  location: string;
  email: string;
  socials: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
  volunteerLink: string;
}

export interface SubscribePayload {
  email: string;
}
