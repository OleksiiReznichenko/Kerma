export default interface Question {
    id: string;
    title: string;
    text: string;
    isButton: boolean;
    buttonText?: string | null;
    buttonLink?: string | null;
}