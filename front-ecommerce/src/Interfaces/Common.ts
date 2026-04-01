import type { DropdownChangeEvent } from "primereact/dropdown"

export type TFormError<T> = {
    [key in keyof T]?: string
}

export type TValidateForm<Forms> = {
    [K in keyof Forms]?: (value: Forms[K]) => string
}

export type THandleSetFieldProps =
    | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    | DropdownChangeEvent
    | {
          target: {
              name: string
              value: any
          }
      }

export type THandleSetField<T> = T & {
    handleSetField: (event: THandleSetFieldProps) => void
}

export enum ColTypeKey {
  FORM = 4,   
  MODAL = 6,  
  FULL = 12,  
  HALF = 6,  
  SIDEBAR = 3 
}

export interface IPaginationParams {
  page?: number;
  limit?: number;
}

export interface IPaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
