
export interface Itask {
    id: string,
    title: string,
    description: string,
    image: string,
    startDate: string | null;
    endDate: string | null;

}

export interface ItaskProps {
    task: Itask,
    onEdit: () => void
    onDelete: () => void
}