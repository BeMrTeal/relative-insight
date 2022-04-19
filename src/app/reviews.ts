export interface Reviews {
  "id": number;
  "body": string;
  "score": number;
  "likes": number;
  "sentiment_tag": string;
  "sentiment_score": number;
  "submitted": Date;
  "game_id": number;
  "game_name": string;
}
