import { SaleItemCreate } from "./sale-item-create";
import { SaleItemDetails } from "./sale-item-details";

export interface SaleDetails {
    id: number;
    date: string;
    time: string;
    totalValue: number;
    items: SaleItemDetails[];
}
