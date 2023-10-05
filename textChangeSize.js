import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';

export default function TextChangeSize({ text, color }) {
  const [fontSize, setFontSize] = useState(32); // default font size is 16
  useEffect(() => {
    if (text.length < 20) {
      // if the text is longer than 20 characters, increase the font size
      setFontSize(32);
    } else if (text.length < 22) {
      // otherwise, set the font size back to the default value
      setFontSize(28);
    } else if (text.length < 24) {
      // otherwise, set the font size back to the default value
      setFontSize(26);
    } else if (text.length < 26) {
      // otherwise, set the font size back to the default value
      setFontSize(24);
    } else if (text.length < 28) {
      // otherwise, set the font size back to the default value
      setFontSize(22);
    } else if (text.length < 31) {
      // otherwise, set the font size back to the default value
      setFontSize(20);
    } else if (text.length < 35) {
      // otherwise, set the font size back to the default value
      setFontSize(18);
    } else {
      setFontSize(32);
    }
  }, [text]); // re-run the effect whenever the "text" prop changes

  return (
    <Text style={{ fontSize , color}}>{text}</Text>
  );
}