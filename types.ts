
export type AspectRatio = "16:9" | "9:16";

export interface GenerationStatus {
  isGenerating: boolean;
  message: string;
  progress: number;
}

export interface VideoResult {
  url: string;
  aspectRatio: AspectRatio;
}
