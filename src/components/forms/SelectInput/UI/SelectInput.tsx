import React from "react";
import Select, {
    components,
    DropdownIndicatorProps,
    GroupBase,
    StylesConfig,
} from "react-select";
import SelectArrowDown from "@/assets/icons/SelectArrow Down.svg?react";
import SelectArrowUp from "@/assets/icons/SelectArrowUp.svg?react";
import "./index.scss";

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

const selectStyles: StylesConfig<Option, false> = {
    control: (base, state) => ({
        ...base,
        boxShadow: "none",
        borderColor: state.isFocused ? "#B0187A" : "#D0D0D0",
        "&:hover": {
            borderColor: "#B0187A",
        },
    }),

    placeholder: (base) => ({
        ...base,
        fontFamily: "Manroupe, sans-serif",
        fontSize: 20,
        fontWeight: 600,
        color: "#1D1B20",
        lineHeight: "24px",
    }),

    option: (base, state) => ({
        ...base,
        cursor: "pointer",
        backgroundColor: state.isFocused
            ? "#F3B8DA"
            : state.isSelected
                ? "#F8D5EF"
                : "transparent",

        color: state.isFocused ? "#FFFFFF" : "#000000",

        ":active": {
            ...base[":active"],
            backgroundColor: "#B0187A",
        },
    }),
};

// стрелка оставляем как у тебя
const DropdownIndicator = <
    O extends Option,
    IsMulti extends boolean,
    G extends GroupBase<O>
>(
    props: DropdownIndicatorProps<O, IsMulti, G>
) => {
    const { selectProps } = props;
    const isOpen = !!selectProps.menuIsOpen;

    return (
        <components.DropdownIndicator {...props}>
      <span
          style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
          }}
      >
        {isOpen ? <SelectArrowUp /> : <SelectArrowDown />}
      </span>
        </components.DropdownIndicator>
    );
};

const SelectInput: React.FC<SelectInputProps> = ({
                                                     label,
                                                     value,
                                                     options,
                                                     placeholder = "Выберите услугу",
                                                     onChange,
                                                 }) => {
    return (
        <div className="selectInput">
            {label && <label className="selectInput__label">{label}</label>}

            <Select<Option, false>
                classNamePrefix="selectInput"
                value={value || null}
                onChange={onChange}
                options={options}
                placeholder={placeholder}
                components={{
                    DropdownIndicator,
                    IndicatorSeparator: () => null,
                }}
                styles={selectStyles}   // ⬅ ВАЖНО: подключили стили
            />
        </div>
    );
};

export { SelectInput };