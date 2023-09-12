import {
  ChangeEventHandler,
  ComponentPropsWithoutRef,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";

type Props = {
  text?: string;
  onSave: (updatedText: string) => void;
  editing?: boolean;
  placeholder?: string;
} & ComponentPropsWithoutRef<"div">;

const EditableText = ({
  text: initialText = "",
  onSave,
  placeholder = "",
  editing = false,
  ...otherProps
}: Props) => {
  const [isEditing, setIsEditing] = useState(editing);
  const [updatedText, setUpdatedText] = useState(initialText);
  const textUpdateInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) textUpdateInputRef.current?.focus();
    setUpdatedText(initialText);
  }, [initialText, isEditing, textUpdateInputRef]);

  const onTextClick = () => {
    setIsEditing(true);
  };

  const onTextChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUpdatedText(e.target.value);
  };

  const keyUpHandler: KeyboardEventHandler = (e) => {
    if (e.key === "Enter") {
      onSave(updatedText);
    }

    if (e.key === "Enter" || e.key === "Escape") {
      setIsEditing(false);
    }
  };

  const onTextInputBlur = () => {
    onSave(updatedText);
    setIsEditing(false);
  };

  return (
    <span onClick={onTextClick} {...otherProps}>
      {isEditing ? (
        <input
          ref={textUpdateInputRef}
          type="text"
          value={updatedText}
          onChange={onTextChange}
          onKeyUp={keyUpHandler}
          onBlur={onTextInputBlur}
          placeholder={placeholder}
        />
      ) : (
        <span>{initialText}</span>
      )}
    </span>
  );
};

export default EditableText;
