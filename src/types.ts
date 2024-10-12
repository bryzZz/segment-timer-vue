export interface Segment {
  id: string;
  time: number;
  name?: string;
  progressColor?: "red" | "green" | "blue";
}
