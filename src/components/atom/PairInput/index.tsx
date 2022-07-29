import { NextPage } from 'next';
import { ChangeEvent, useCallback } from 'react';
import Input from '../Input';
import Label from '../Label';
import PropsType, { EventProps, OtherProps, TextProps } from '../propsType';
import { InputLayout, PairInputLayout } from './style';

const labelStyle = {
  size: '17px',
  align: 'left',
};

function packDataToElement(name: string, value: string) {
  return { target: { value: { name, value } } };
}

function packDeleteCommand(secret: string) {
  return { target: { value: { secret } } };
}

type ValueType = {
  name?: string;
  value?: string;
};
type OnChangeType = (e: object) => void;

const PairInput: NextPage<PropsType> = ({
  textProps,
  eventProps,
  otherProps,
}) => {
  const { wording, subWording } = textProps as TextProps;
  const { enableDelete } = eventProps as EventProps;
  const onChange = eventProps?.onChange as OnChangeType;
  const { objValue } = otherProps as OtherProps;
  const { name, value } = objValue as ValueType;

  const nameWording = subWording ? subWording[0] : '';
  const valueWording = subWording ? subWording[1] : '';

  const handleTitleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(packDataToElement(e.target.value, value || ''));
    },
    [onChange, value]
  );
  const handleValueChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(packDataToElement(name || '', e.target.value));
    },
    [onChange, name]
  );
  const handleDelete = useCallback(() => {
    // avoid delete the non-spawnable input & anti destroy form by user
    onChange(packDeleteCommand('/!delete_this_input'));
  }, [onChange]);

  return (
    <>
      <Label
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...labelStyle}
        textProps={{
          value: wording,
        }}
        eventProps={{
          onDelete: handleDelete,
          enableDelete,
        }}
      />
      <PairInputLayout>
        <InputLayout>
          <Input
            textProps={{
              value: name,
              wording: nameWording,
            }}
            eventProps={{
              onChange: handleTitleChange,
            }}
          />
        </InputLayout>
        <InputLayout>
          <Input
            textProps={{
              value,
              wording: valueWording,
            }}
            eventProps={{
              onChange: handleValueChange,
            }}
          />
        </InputLayout>
      </PairInputLayout>
    </>
  );
};

export default PairInput;
