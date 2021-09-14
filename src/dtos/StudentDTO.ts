export interface StudentDTO {
  first_name: string;
  last_name: string;
  email: string;
  class_id?: string;
  CPF?: string;
  address?: string;
  CEP?: string;
  password: string;
}

export interface StudentNameDTO {
  name?: string;
}
