import React from "react";
import Select from "react-select";
import ArrowIcon from "@/assets/icons/ArrowDropDown.svg?react";

type Option = {
    label: string;
    value: string;
};

type SelectInputProps = {
    label?: string;
    value?: Option | null;
    options: Option[];
    placeholder?: string;
    onChange: (option: Option | null) => void;
};

const SelectInput: React.FC<SelectInputProps> = ({
                                                            label,
                                                            value,
                                                            options,
                                                            placeholder = "Выберите...",
                                                            onChange,
                                                        }) => {
    return (
        <div className="selectInput">
            {label && <label className="selectInput__label">{label}</label>}

            <Select
                classNamePrefix="selectInput"
                value={value}
                onChange={onChange}
                options={options}
                placeholder={placeholder}
                components={{
                    DropdownIndicator: () => (
                        <div className="selectInput__icon">
                            <ArrowIcon />
                        </div>
                    ),
                    IndicatorSeparator: () => null,
                }}
            />
        </div>
    );
};

export { SelectInput };