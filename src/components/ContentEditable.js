"use client";

import { useRef, useState, useEffect } from "react";

export default function ContentEditable({
  className = "",
  onInput,
  value = "",
  placeholder = "",
  prefix = "",
  number = false
}) {
  const [innerText, setInnerText] = useState(`${prefix}${value}`);
  const ref = useRef(null);
  const numberRegex = /^[0-9]*$/;
  const previousValidValue = useRef(value);

  useEffect(() => {
    setInnerText(`${prefix}${value}`);
    previousValidValue.current = value;
  }, [value, prefix]);

  const handleFocus = (event) => {
    if (!ref.current) return;

    setTimeout(() => {
      const element = ref.current;
      const selection = window.getSelection();
      const range = document.createRange();

      const prefixIndex = element.textContent.indexOf(prefix) + prefix.length;
      
      if (element.firstChild && prefixIndex < element.textContent.length) {
        range.setStart(element.firstChild, prefixIndex);
        range.setEnd(element.firstChild, element.textContent.length);
      } else {
        range.selectNodeContents(element);
        range.collapse(false);
      }
      
      selection.removeAllRanges();
      selection.addRange(range);
    }, 0);
  };

  const handleBlur = () => {
    if (!ref.current) return;
    
    const currentValue = ref.current.textContent || "";
    const valueWithoutPrefix = currentValue.startsWith(prefix) 
      ? currentValue.slice(prefix.length) 
      : currentValue;
      
    setInnerText(`${prefix}${valueWithoutPrefix || placeholder}`);
  };

  const handleInput = (event) => {
    if (!ref.current) return;
    
    // Store current cursor position
    const selection = window.getSelection();
    const currentPosition = selection?.anchorOffset || 0;
    
    let newValue = ref.current.textContent || "";
    
    // Remove the prefix if it exists anywhere in the string
    newValue = newValue.replace(new RegExp(prefix.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), '');
    
    if (number && !numberRegex.test(newValue)) {
      event.preventDefault();
      
      // Revert to the previous valid value
      setInnerText(`${prefix}${previousValidValue.current}`);
      
      setTimeout(() => {
        if (!ref.current?.firstChild) return;
        
        const selection = window.getSelection();
        const range = document.createRange();
        
        // Ensure cursor position is after prefix
        const cursorPosition = Math.max(currentPosition, prefix.length);
        
        range.setStart(ref.current.firstChild, cursorPosition);
        range.setEnd(ref.current.firstChild, cursorPosition);
        
        selection.removeAllRanges();
        selection.addRange(range);
      }, 0);
      
      return;
    }
    
    previousValidValue.current = newValue;
    setInnerText(`${prefix}${newValue}`);
    onInput?.(newValue);
    
    // Restore cursor position
    setTimeout(() => {
      if (!ref.current?.firstChild) return;
      
      const selection = window.getSelection();
      const range = document.createRange();
      
      // Ensure cursor position is after prefix
      const cursorPosition = Math.max(currentPosition, prefix.length);
      
      range.setStart(ref.current.firstChild, cursorPosition);
      range.setEnd(ref.current.firstChild, cursorPosition);
      
      selection.removeAllRanges();
      selection.addRange(range);
    }, 0);
  };

  const handleKeyDown = (event) => {
    if (!ref.current) return;

    const currentPosition = window.getSelection()?.anchorOffset || 0;
    
    // Prevent modifying the prefix
    if (currentPosition <= prefix.length && 
        ['Backspace', 'Delete', 'ArrowLeft'].includes(event.key)) {
      event.preventDefault();
      return;
    }

    if (number && !/^[0-9]$/.test(event.key) && 
        !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(event.key)) {
      event.preventDefault();
    }
  };

  return (
    <span
      className={className}
      contentEditable
      onFocus={handleFocus}
      onBlur={handleBlur}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      ref={ref}
      suppressContentEditableWarning={true}
    >
      {innerText}
    </span>
  );
}