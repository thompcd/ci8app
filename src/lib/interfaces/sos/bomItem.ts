import type { Item } from "./item";

export type BomItem = 
{
    bomItemId: number, 
    hours: number,
    error: Error, 
    item: Item 
}