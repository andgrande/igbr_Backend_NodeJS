export interface ClassTimetableDTO {
  id?: string;
  class_id: string;
  class_status: string;
  students_presence?: {
    id: string;
    name: string;
    present: boolean;
    homework: boolean;
  };
  date?: Date;
}

export interface TimetableStudentDetailDTO {
  students_presence?: {
    id: string;
    name: string;
    present: boolean;
    homework: boolean;
    status?: string;
  };
}
