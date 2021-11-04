import { ChecklistItem } from "./checklist-item.model";

export class ChecklistDataEntry {
	id: number;
	checkedItems: number[];
	scheduleId: number;
	userId: string;
	date: Date;
	checklist: ChecklistItem[];
}
