import { Textarea } from '@rebass/forms';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Send } from 'react-feather';
import { Box, Flex } from 'rebass/styled-components';
// import { dropEmoji } from '../../lib/emoji';
// import EmojiPicker from 'emoji-picker-react';
// import OutsideClickHandler from 'react-outside-click-handler';
import styled from 'styled-components';
// const PickerWrap = styled.div`
//   position: absolute;
//   right: 10px;
//   top: 45px;
//   z-index: 999999999999999999;
// `;
const Wrapper = styled(Box)`
  width: 100%;
  position: relative;
  border: ${props => props.theme.colors.border};
  border-radius: 4px;
`;
const SocialTextDiv = styled(Flex)`
  position: relative;
  width: 100%;
  align-items: center;
`;
// const EmojiPickerTrigger = styled(Box)`
//   cursor: pointer;
//   &:hover {
//     svg {
//       stroke: ${props => props.theme.colors.primary}
//     }
//   }
// `;

const SocialTextArea = styled(Textarea)`
  height: 60px;
  border-radius: 4px;
  border: 0px solid ${props => props.theme.colors.light} !important;
  resize: none;
  flex: 1;
  font-size: 16px !important;
  &:focus {
    outline: none;
  }
  font-family: 'Open Sans', sans-serif !important;
`;

const SocialActions = styled(Flex)`
  // width: 70px;
`;

export interface Props {
  submit(text: string): void;
  defaultValue?: string;
  keepTextOnSubmit?: boolean;
  placeholder?: string;
}
export const SocialText: React.FC<Props> = ({
  submit,
  defaultValue = '',
  keepTextOnSubmit = false,
  placeholder = ''
}) => {
  const ref = useRef<any>(null);
  const [text, setText] = useState(defaultValue);
  // const [isEmojiOpen, setEmojiOpen] = useState(false);
  // const toggleEmoji = useCallback(() => setEmojiOpen(!isEmojiOpen), [
  //   isEmojiOpen
  // ]);
  // const addEmoji = React.useCallback(
  //   (code, obj) => {
  //     // console.log(code, obj);
  //     if (!ref.current) {
  //       return;
  //     }
  //     const textarea = ref.current as HTMLTextAreaElement;
  //     const selectionStart = textarea.selectionStart;
  //     // const selectionEnd = textarea.selectionEnd
  //     const offset = dropEmoji(textarea, obj.emoji);
  //     const pos = selectionStart + offset;
  //     textarea.focus();
  //     // console.log([selectionStart,selectionEnd], offset, pos, [textarea.selectionStart, textarea.selectionEnd] )
  //     textarea.selectionEnd = pos;
  //   },
  //   [ref.current]
  // );
  const handleSubmit = useCallback(() => {
    if (!text) {
      return;
    }
    submit(text);
    if (!keepTextOnSubmit) {
      setText('');
    }
  }, [text]);
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    ref.current.value = text;
  }, [text]);
  const onChange = useCallback(() => {
    if (!ref.current) {
      return;
    }
    const txt = ref.current.value;
    setText(txt);
  }, [ref.current, setText]);
  return (
    <Wrapper>
      <SocialTextDiv>
        <SocialTextArea
          placeholder={placeholder}
          ref={ref}
          defaultValue={defaultValue}
          onInput={onChange}
        />
        <SocialActions mr={3}>
          {/* <EmojiPickerTrigger onClick={toggleEmoji}>
            <Smile color={'rgba(0,0,0,.4)'} size="24" />
          </EmojiPickerTrigger> */}
          <Box
            style={{ cursor: text ? 'pointer' : 'default' }}
            ml={3}
            onClick={handleSubmit}
          >
            <Send
              color={text ? 'rgba(0,0,0,.4)' : 'rgba(0,0,0,.1)'}
              size="24"
            />
          </Box>
        </SocialActions>
        {/* {isEmojiOpen && (
          <OutsideClickHandler onOutsideClick={toggleEmoji}>
            <PickerWrap>
              <EmojiPicker preload onEmojiClick={addEmoji} />
            </PickerWrap>
          </OutsideClickHandler>
        )} */}
      </SocialTextDiv>
    </Wrapper>
  );
};
export default SocialText;
