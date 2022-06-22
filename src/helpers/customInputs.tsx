import { forwardRef } from 'react';

import NumberFormat, { InputAttributes } from 'react-number-format';

interface ICustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  value: string;
  name: string;
}

export const NumberFormatCustom = forwardRef<NumberFormat<InputAttributes>, ICustomProps>(
  function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator="."
        decimalSeparator=","
        isNumericString
        decimalScale={4}
        allowNegative={false}
      />
    );
  }
);
