export interface Window {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    title: string;
    element: HTMLElement | null;
    isActive: boolean;
}