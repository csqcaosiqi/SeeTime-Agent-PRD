export interface DispatchResult {
  eventId: string;
  event: { subCategory: string; street: string; screenshotUrl: string };
  receiverName: string;
  receiverContact: string;
  receiverUnit: string;
  isAutoMatched: boolean;
}
