import React, { ChangeEvent } from "react";

interface FormInputProps {
  label: string;              // Le label du champ
  type?: string;              // Le type de l'input (par défaut "text")
  value?: string;             // La valeur par défaut
  isEdit?: boolean;           // Si c'est en mode édition
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;  // Callback pour gérer les changements dans l'input
  className?: string;         // Classes CSS supplémentaires
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type = "text",
  value = "",
  isEdit = false,
  onChange,
  className = "",
}) => {
  return (
    <div className={`col-xxl col-xl-3 col-md-6 ${className}`}>
      <div className="mb-3">
        <label className="form-label">{label}</label>
        <input
          type={type}
          className="form-control"
          defaultValue={isEdit ? value : undefined}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default FormInput;
