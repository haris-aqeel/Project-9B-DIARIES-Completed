export interface Diary{

    id: string;
    userId: string;
    entryIds: string[];
    title: string;
    updatedAt: string;
    createdAt: string;
    type: "private" | "public"

}