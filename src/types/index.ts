export type LanguageType = 'sql' | 'javascript' | 'typescript'

export interface IScript {
    id: string;
    title: string;
    text: string;
    created_at: string;
    updated_at: string;
}
