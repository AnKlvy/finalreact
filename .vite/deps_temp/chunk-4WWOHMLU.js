import {
  require_react_dom
} from "./chunk-SCL3JBSP.js";
import {
  HTMLElementType,
  _extends,
  _objectWithoutPropertiesLoose,
  chainPropTypes,
  clsx_m_default,
  composeClasses,
  createChainedFunction,
  debounce,
  elementAcceptingRef_default,
  exactProp,
  generateUtilityClass,
  generateUtilityClasses,
  getScrollbarSize,
  init_clsx_m,
  init_esm,
  init_extends,
  init_objectWithoutPropertiesLoose,
  integerPropType_default,
  ownerDocument,
  ownerWindow,
  refType_default,
  require_prop_types,
  require_react_is,
  setRef,
  useControlled,
  useEnhancedEffect_default,
  useEventCallback,
  useForkRef,
  useId,
  useIsFocusVisible,
  usePreviousProps_default,
  visuallyHidden_default
} from "./chunk-QOHDQVUI.js";
import {
  require_jsx_runtime
} from "./chunk-G3MLEX4F.js";
import {
  __esm,
  __toESM,
  require_react
} from "./chunk-HCO7BGZI.js";

// node_modules/@mui/base/AutocompleteUnstyled/useAutocomplete.js
function stripDiacritics(string) {
  return typeof string.normalize !== "undefined" ? string.normalize("NFD").replace(/[\u0300-\u036f]/g, "") : string;
}
function createFilterOptions(config = {}) {
  const {
    ignoreAccents = true,
    ignoreCase = true,
    limit,
    matchFrom = "any",
    stringify,
    trim = false
  } = config;
  return (options, {
    inputValue,
    getOptionLabel
  }) => {
    let input = trim ? inputValue.trim() : inputValue;
    if (ignoreCase) {
      input = input.toLowerCase();
    }
    if (ignoreAccents) {
      input = stripDiacritics(input);
    }
    const filteredOptions = !input ? options : options.filter((option) => {
      let candidate = (stringify || getOptionLabel)(option);
      if (ignoreCase) {
        candidate = candidate.toLowerCase();
      }
      if (ignoreAccents) {
        candidate = stripDiacritics(candidate);
      }
      return matchFrom === "start" ? candidate.indexOf(input) === 0 : candidate.indexOf(input) > -1;
    });
    return typeof limit === "number" ? filteredOptions.slice(0, limit) : filteredOptions;
  };
}
function findIndex(array, comp) {
  for (let i = 0; i < array.length; i += 1) {
    if (comp(array[i])) {
      return i;
    }
  }
  return -1;
}
function useAutocomplete(props) {
  const {
    unstable_isActiveElementInListbox = defaultIsActiveElementInListbox,
    unstable_classNamePrefix = "Mui",
    autoComplete = false,
    autoHighlight = false,
    autoSelect = false,
    blurOnSelect = false,
    clearOnBlur = !props.freeSolo,
    clearOnEscape = false,
    componentName = "useAutocomplete",
    defaultValue = props.multiple ? [] : null,
    disableClearable = false,
    disableCloseOnSelect = false,
    disabled: disabledProp,
    disabledItemsFocusable = false,
    disableListWrap = false,
    filterOptions = defaultFilterOptions,
    filterSelectedOptions = false,
    freeSolo = false,
    getOptionDisabled,
    getOptionLabel: getOptionLabelProp = (option) => {
      var _option$label;
      return (_option$label = option.label) != null ? _option$label : option;
    },
    groupBy,
    handleHomeEndKeys = !props.freeSolo,
    id: idProp,
    includeInputInList = false,
    inputValue: inputValueProp,
    isOptionEqualToValue = (option, value2) => option === value2,
    multiple = false,
    onChange,
    onClose,
    onHighlightChange,
    onInputChange,
    onOpen,
    open: openProp,
    openOnFocus = false,
    options,
    readOnly = false,
    selectOnFocus = !props.freeSolo,
    value: valueProp
  } = props;
  const id = useId(idProp);
  let getOptionLabel = getOptionLabelProp;
  getOptionLabel = (option) => {
    const optionLabel = getOptionLabelProp(option);
    if (typeof optionLabel !== "string") {
      if (true) {
        const erroneousReturn = optionLabel === void 0 ? "undefined" : `${typeof optionLabel} (${optionLabel})`;
        console.error(`MUI: The \`getOptionLabel\` method of ${componentName} returned ${erroneousReturn} instead of a string for ${JSON.stringify(option)}.`);
      }
      return String(optionLabel);
    }
    return optionLabel;
  };
  const ignoreFocus = React.useRef(false);
  const firstFocus = React.useRef(true);
  const inputRef = React.useRef(null);
  const listboxRef = React.useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [focusedTag, setFocusedTag] = React.useState(-1);
  const defaultHighlighted = autoHighlight ? 0 : -1;
  const highlightedIndexRef = React.useRef(defaultHighlighted);
  const [value, setValueState] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: componentName
  });
  const [inputValue, setInputValueState] = useControlled({
    controlled: inputValueProp,
    default: "",
    name: componentName,
    state: "inputValue"
  });
  const [focused, setFocused] = React.useState(false);
  const resetInputValue = React.useCallback((event, newValue) => {
    const isOptionSelected = multiple ? value.length < newValue.length : newValue !== null;
    if (!isOptionSelected && !clearOnBlur) {
      return;
    }
    let newInputValue;
    if (multiple) {
      newInputValue = "";
    } else if (newValue == null) {
      newInputValue = "";
    } else {
      const optionLabel = getOptionLabel(newValue);
      newInputValue = typeof optionLabel === "string" ? optionLabel : "";
    }
    if (inputValue === newInputValue) {
      return;
    }
    setInputValueState(newInputValue);
    if (onInputChange) {
      onInputChange(event, newInputValue, "reset");
    }
  }, [getOptionLabel, inputValue, multiple, onInputChange, setInputValueState, clearOnBlur, value]);
  const prevValue = React.useRef();
  React.useEffect(() => {
    const valueChange = value !== prevValue.current;
    prevValue.current = value;
    if (focused && !valueChange) {
      return;
    }
    if (freeSolo && !valueChange) {
      return;
    }
    resetInputValue(null, value);
  }, [value, resetInputValue, focused, prevValue, freeSolo]);
  const [open, setOpenState] = useControlled({
    controlled: openProp,
    default: false,
    name: componentName,
    state: "open"
  });
  const [inputPristine, setInputPristine] = React.useState(true);
  const inputValueIsSelectedValue = !multiple && value != null && inputValue === getOptionLabel(value);
  const popupOpen = open && !readOnly;
  const filteredOptions = popupOpen ? filterOptions(
    options.filter((option) => {
      if (filterSelectedOptions && (multiple ? value : [value]).some((value2) => value2 !== null && isOptionEqualToValue(option, value2))) {
        return false;
      }
      return true;
    }),
    {
      inputValue: inputValueIsSelectedValue && inputPristine ? "" : inputValue,
      getOptionLabel
    }
  ) : [];
  const listboxAvailable = open && filteredOptions.length > 0 && !readOnly;
  if (true) {
    if (value !== null && !freeSolo && options.length > 0) {
      const missingValue = (multiple ? value : [value]).filter((value2) => !options.some((option) => isOptionEqualToValue(option, value2)));
      if (missingValue.length > 0) {
        console.warn([`MUI: The value provided to ${componentName} is invalid.`, `None of the options match with \`${missingValue.length > 1 ? JSON.stringify(missingValue) : JSON.stringify(missingValue[0])}\`.`, "You can use the `isOptionEqualToValue` prop to customize the equality test."].join("\n"));
      }
    }
  }
  const focusTag = useEventCallback((tagToFocus) => {
    if (tagToFocus === -1) {
      inputRef.current.focus();
    } else {
      anchorEl.querySelector(`[data-tag-index="${tagToFocus}"]`).focus();
    }
  });
  React.useEffect(() => {
    if (multiple && focusedTag > value.length - 1) {
      setFocusedTag(-1);
      focusTag(-1);
    }
  }, [value, multiple, focusedTag, focusTag]);
  function validOptionIndex(index, direction) {
    if (!listboxRef.current || index === -1) {
      return -1;
    }
    let nextFocus = index;
    while (true) {
      if (direction === "next" && nextFocus === filteredOptions.length || direction === "previous" && nextFocus === -1) {
        return -1;
      }
      const option = listboxRef.current.querySelector(`[data-option-index="${nextFocus}"]`);
      const nextFocusDisabled = disabledItemsFocusable ? false : !option || option.disabled || option.getAttribute("aria-disabled") === "true";
      if (option && !option.hasAttribute("tabindex") || nextFocusDisabled) {
        nextFocus += direction === "next" ? 1 : -1;
      } else {
        return nextFocus;
      }
    }
  }
  const setHighlightedIndex = useEventCallback(({
    event,
    index,
    reason = "auto"
  }) => {
    highlightedIndexRef.current = index;
    if (index === -1) {
      inputRef.current.removeAttribute("aria-activedescendant");
    } else {
      inputRef.current.setAttribute("aria-activedescendant", `${id}-option-${index}`);
    }
    if (onHighlightChange) {
      onHighlightChange(event, index === -1 ? null : filteredOptions[index], reason);
    }
    if (!listboxRef.current) {
      return;
    }
    const prev = listboxRef.current.querySelector(`[role="option"].${unstable_classNamePrefix}-focused`);
    if (prev) {
      prev.classList.remove(`${unstable_classNamePrefix}-focused`);
      prev.classList.remove(`${unstable_classNamePrefix}-focusVisible`);
    }
    const listboxNode = listboxRef.current.parentElement.querySelector('[role="listbox"]');
    if (!listboxNode) {
      return;
    }
    if (index === -1) {
      listboxNode.scrollTop = 0;
      return;
    }
    const option = listboxRef.current.querySelector(`[data-option-index="${index}"]`);
    if (!option) {
      return;
    }
    option.classList.add(`${unstable_classNamePrefix}-focused`);
    if (reason === "keyboard") {
      option.classList.add(`${unstable_classNamePrefix}-focusVisible`);
    }
    if (listboxNode.scrollHeight > listboxNode.clientHeight && reason !== "mouse") {
      const element = option;
      const scrollBottom = listboxNode.clientHeight + listboxNode.scrollTop;
      const elementBottom = element.offsetTop + element.offsetHeight;
      if (elementBottom > scrollBottom) {
        listboxNode.scrollTop = elementBottom - listboxNode.clientHeight;
      } else if (element.offsetTop - element.offsetHeight * (groupBy ? 1.3 : 0) < listboxNode.scrollTop) {
        listboxNode.scrollTop = element.offsetTop - element.offsetHeight * (groupBy ? 1.3 : 0);
      }
    }
  });
  const changeHighlightedIndex = useEventCallback(({
    event,
    diff,
    direction = "next",
    reason = "auto"
  }) => {
    if (!popupOpen) {
      return;
    }
    const getNextIndex = () => {
      const maxIndex = filteredOptions.length - 1;
      if (diff === "reset") {
        return defaultHighlighted;
      }
      if (diff === "start") {
        return 0;
      }
      if (diff === "end") {
        return maxIndex;
      }
      const newIndex = highlightedIndexRef.current + diff;
      if (newIndex < 0) {
        if (newIndex === -1 && includeInputInList) {
          return -1;
        }
        if (disableListWrap && highlightedIndexRef.current !== -1 || Math.abs(diff) > 1) {
          return 0;
        }
        return maxIndex;
      }
      if (newIndex > maxIndex) {
        if (newIndex === maxIndex + 1 && includeInputInList) {
          return -1;
        }
        if (disableListWrap || Math.abs(diff) > 1) {
          return maxIndex;
        }
        return 0;
      }
      return newIndex;
    };
    const nextIndex = validOptionIndex(getNextIndex(), direction);
    setHighlightedIndex({
      index: nextIndex,
      reason,
      event
    });
    if (autoComplete && diff !== "reset") {
      if (nextIndex === -1) {
        inputRef.current.value = inputValue;
      } else {
        const option = getOptionLabel(filteredOptions[nextIndex]);
        inputRef.current.value = option;
        const index = option.toLowerCase().indexOf(inputValue.toLowerCase());
        if (index === 0 && inputValue.length > 0) {
          inputRef.current.setSelectionRange(inputValue.length, option.length);
        }
      }
    }
  });
  const syncHighlightedIndex = React.useCallback(() => {
    if (!popupOpen) {
      return;
    }
    const valueItem = multiple ? value[0] : value;
    if (filteredOptions.length === 0 || valueItem == null) {
      changeHighlightedIndex({
        diff: "reset"
      });
      return;
    }
    if (!listboxRef.current) {
      return;
    }
    if (valueItem != null) {
      const currentOption = filteredOptions[highlightedIndexRef.current];
      if (multiple && currentOption && findIndex(value, (val) => isOptionEqualToValue(currentOption, val)) !== -1) {
        return;
      }
      const itemIndex = findIndex(filteredOptions, (optionItem) => isOptionEqualToValue(optionItem, valueItem));
      if (itemIndex === -1) {
        changeHighlightedIndex({
          diff: "reset"
        });
      } else {
        setHighlightedIndex({
          index: itemIndex
        });
      }
      return;
    }
    if (highlightedIndexRef.current >= filteredOptions.length - 1) {
      setHighlightedIndex({
        index: filteredOptions.length - 1
      });
      return;
    }
    setHighlightedIndex({
      index: highlightedIndexRef.current
    });
  }, [
    filteredOptions.length,
    multiple ? false : value,
    filterSelectedOptions,
    changeHighlightedIndex,
    setHighlightedIndex,
    popupOpen,
    inputValue,
    multiple
  ]);
  const handleListboxRef = useEventCallback((node) => {
    setRef(listboxRef, node);
    if (!node) {
      return;
    }
    syncHighlightedIndex();
  });
  if (true) {
    React.useEffect(() => {
      if (!inputRef.current || inputRef.current.nodeName !== "INPUT") {
        if (inputRef.current && inputRef.current.nodeName === "TEXTAREA") {
          console.warn([`A textarea element was provided to ${componentName} where input was expected.`, `This is not a supported scenario but it may work under certain conditions.`, `A textarea keyboard navigation may conflict with Autocomplete controls (e.g. enter and arrow keys).`, `Make sure to test keyboard navigation and add custom event handlers if necessary.`].join("\n"));
        } else {
          console.error([`MUI: Unable to find the input element. It was resolved to ${inputRef.current} while an HTMLInputElement was expected.`, `Instead, ${componentName} expects an input element.`, "", componentName === "useAutocomplete" ? "Make sure you have binded getInputProps correctly and that the normal ref/effect resolutions order is guaranteed." : "Make sure you have customized the input component correctly."].join("\n"));
        }
      }
    }, [componentName]);
  }
  React.useEffect(() => {
    syncHighlightedIndex();
  }, [syncHighlightedIndex]);
  const handleOpen = (event) => {
    if (open) {
      return;
    }
    setOpenState(true);
    setInputPristine(true);
    if (onOpen) {
      onOpen(event);
    }
  };
  const handleClose = (event, reason) => {
    if (!open) {
      return;
    }
    setOpenState(false);
    if (onClose) {
      onClose(event, reason);
    }
  };
  const handleValue = (event, newValue, reason, details) => {
    if (multiple) {
      if (value.length === newValue.length && value.every((val, i) => val === newValue[i])) {
        return;
      }
    } else if (value === newValue) {
      return;
    }
    if (onChange) {
      onChange(event, newValue, reason, details);
    }
    setValueState(newValue);
  };
  const isTouch = React.useRef(false);
  const selectNewValue = (event, option, reasonProp = "selectOption", origin = "options") => {
    let reason = reasonProp;
    let newValue = option;
    if (multiple) {
      newValue = Array.isArray(value) ? value.slice() : [];
      if (true) {
        const matches = newValue.filter((val) => isOptionEqualToValue(option, val));
        if (matches.length > 1) {
          console.error([`MUI: The \`isOptionEqualToValue\` method of ${componentName} do not handle the arguments correctly.`, `The component expects a single value to match a given option but found ${matches.length} matches.`].join("\n"));
        }
      }
      const itemIndex = findIndex(newValue, (valueItem) => isOptionEqualToValue(option, valueItem));
      if (itemIndex === -1) {
        newValue.push(option);
      } else if (origin !== "freeSolo") {
        newValue.splice(itemIndex, 1);
        reason = "removeOption";
      }
    }
    resetInputValue(event, newValue);
    handleValue(event, newValue, reason, {
      option
    });
    if (!disableCloseOnSelect && (!event || !event.ctrlKey && !event.metaKey)) {
      handleClose(event, reason);
    }
    if (blurOnSelect === true || blurOnSelect === "touch" && isTouch.current || blurOnSelect === "mouse" && !isTouch.current) {
      inputRef.current.blur();
    }
  };
  function validTagIndex(index, direction) {
    if (index === -1) {
      return -1;
    }
    let nextFocus = index;
    while (true) {
      if (direction === "next" && nextFocus === value.length || direction === "previous" && nextFocus === -1) {
        return -1;
      }
      const option = anchorEl.querySelector(`[data-tag-index="${nextFocus}"]`);
      if (!option || !option.hasAttribute("tabindex") || option.disabled || option.getAttribute("aria-disabled") === "true") {
        nextFocus += direction === "next" ? 1 : -1;
      } else {
        return nextFocus;
      }
    }
  }
  const handleFocusTag = (event, direction) => {
    if (!multiple) {
      return;
    }
    if (inputValue === "") {
      handleClose(event, "toggleInput");
    }
    let nextTag = focusedTag;
    if (focusedTag === -1) {
      if (inputValue === "" && direction === "previous") {
        nextTag = value.length - 1;
      }
    } else {
      nextTag += direction === "next" ? 1 : -1;
      if (nextTag < 0) {
        nextTag = 0;
      }
      if (nextTag === value.length) {
        nextTag = -1;
      }
    }
    nextTag = validTagIndex(nextTag, direction);
    setFocusedTag(nextTag);
    focusTag(nextTag);
  };
  const handleClear = (event) => {
    ignoreFocus.current = true;
    setInputValueState("");
    if (onInputChange) {
      onInputChange(event, "", "clear");
    }
    handleValue(event, multiple ? [] : null, "clear");
  };
  const handleKeyDown2 = (other) => (event) => {
    if (other.onKeyDown) {
      other.onKeyDown(event);
    }
    if (event.defaultMuiPrevented) {
      return;
    }
    if (focusedTag !== -1 && ["ArrowLeft", "ArrowRight"].indexOf(event.key) === -1) {
      setFocusedTag(-1);
      focusTag(-1);
    }
    if (event.which !== 229) {
      switch (event.key) {
        case "Home":
          if (popupOpen && handleHomeEndKeys) {
            event.preventDefault();
            changeHighlightedIndex({
              diff: "start",
              direction: "next",
              reason: "keyboard",
              event
            });
          }
          break;
        case "End":
          if (popupOpen && handleHomeEndKeys) {
            event.preventDefault();
            changeHighlightedIndex({
              diff: "end",
              direction: "previous",
              reason: "keyboard",
              event
            });
          }
          break;
        case "PageUp":
          event.preventDefault();
          changeHighlightedIndex({
            diff: -pageSize,
            direction: "previous",
            reason: "keyboard",
            event
          });
          handleOpen(event);
          break;
        case "PageDown":
          event.preventDefault();
          changeHighlightedIndex({
            diff: pageSize,
            direction: "next",
            reason: "keyboard",
            event
          });
          handleOpen(event);
          break;
        case "ArrowDown":
          event.preventDefault();
          changeHighlightedIndex({
            diff: 1,
            direction: "next",
            reason: "keyboard",
            event
          });
          handleOpen(event);
          break;
        case "ArrowUp":
          event.preventDefault();
          changeHighlightedIndex({
            diff: -1,
            direction: "previous",
            reason: "keyboard",
            event
          });
          handleOpen(event);
          break;
        case "ArrowLeft":
          handleFocusTag(event, "previous");
          break;
        case "ArrowRight":
          handleFocusTag(event, "next");
          break;
        case "Enter":
          if (highlightedIndexRef.current !== -1 && popupOpen) {
            const option = filteredOptions[highlightedIndexRef.current];
            const disabled = getOptionDisabled ? getOptionDisabled(option) : false;
            event.preventDefault();
            if (disabled) {
              return;
            }
            selectNewValue(event, option, "selectOption");
            if (autoComplete) {
              inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length);
            }
          } else if (freeSolo && inputValue !== "" && inputValueIsSelectedValue === false) {
            if (multiple) {
              event.preventDefault();
            }
            selectNewValue(event, inputValue, "createOption", "freeSolo");
          }
          break;
        case "Escape":
          if (popupOpen) {
            event.preventDefault();
            event.stopPropagation();
            handleClose(event, "escape");
          } else if (clearOnEscape && (inputValue !== "" || multiple && value.length > 0)) {
            event.preventDefault();
            event.stopPropagation();
            handleClear(event);
          }
          break;
        case "Backspace":
          if (multiple && !readOnly && inputValue === "" && value.length > 0) {
            const index = focusedTag === -1 ? value.length - 1 : focusedTag;
            const newValue = value.slice();
            newValue.splice(index, 1);
            handleValue(event, newValue, "removeOption", {
              option: value[index]
            });
          }
          break;
        case "Delete":
          if (multiple && !readOnly && inputValue === "" && value.length > 0 && focusedTag !== -1) {
            const index = focusedTag;
            const newValue = value.slice();
            newValue.splice(index, 1);
            handleValue(event, newValue, "removeOption", {
              option: value[index]
            });
          }
          break;
        default:
      }
    }
  };
  const handleFocus = (event) => {
    setFocused(true);
    if (openOnFocus && !ignoreFocus.current) {
      handleOpen(event);
    }
  };
  const handleBlur2 = (event) => {
    if (unstable_isActiveElementInListbox(listboxRef)) {
      inputRef.current.focus();
      return;
    }
    setFocused(false);
    firstFocus.current = true;
    ignoreFocus.current = false;
    if (autoSelect && highlightedIndexRef.current !== -1 && popupOpen) {
      selectNewValue(event, filteredOptions[highlightedIndexRef.current], "blur");
    } else if (autoSelect && freeSolo && inputValue !== "") {
      selectNewValue(event, inputValue, "blur", "freeSolo");
    } else if (clearOnBlur) {
      resetInputValue(event, value);
    }
    handleClose(event, "blur");
  };
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    if (inputValue !== newValue) {
      setInputValueState(newValue);
      setInputPristine(false);
      if (onInputChange) {
        onInputChange(event, newValue, "input");
      }
    }
    if (newValue === "") {
      if (!disableClearable && !multiple) {
        handleValue(event, null, "clear");
      }
    } else {
      handleOpen(event);
    }
  };
  const handleOptionMouseOver = (event) => {
    setHighlightedIndex({
      event,
      index: Number(event.currentTarget.getAttribute("data-option-index")),
      reason: "mouse"
    });
  };
  const handleOptionTouchStart = () => {
    isTouch.current = true;
  };
  const handleOptionClick = (event) => {
    const index = Number(event.currentTarget.getAttribute("data-option-index"));
    selectNewValue(event, filteredOptions[index], "selectOption");
    isTouch.current = false;
  };
  const handleTagDelete = (index) => (event) => {
    const newValue = value.slice();
    newValue.splice(index, 1);
    handleValue(event, newValue, "removeOption", {
      option: value[index]
    });
  };
  const handlePopupIndicator = (event) => {
    if (open) {
      handleClose(event, "toggleInput");
    } else {
      handleOpen(event);
    }
  };
  const handleMouseDown = (event) => {
    if (event.target.getAttribute("id") !== id) {
      event.preventDefault();
    }
  };
  const handleClick = () => {
    inputRef.current.focus();
    if (selectOnFocus && firstFocus.current && inputRef.current.selectionEnd - inputRef.current.selectionStart === 0) {
      inputRef.current.select();
    }
    firstFocus.current = false;
  };
  const handleInputMouseDown = (event) => {
    if (inputValue === "" || !open) {
      handlePopupIndicator(event);
    }
  };
  let dirty = freeSolo && inputValue.length > 0;
  dirty = dirty || (multiple ? value.length > 0 : value !== null);
  let groupedOptions = filteredOptions;
  if (groupBy) {
    const indexBy = /* @__PURE__ */ new Map();
    let warn = false;
    groupedOptions = filteredOptions.reduce((acc, option, index) => {
      const group = groupBy(option);
      if (acc.length > 0 && acc[acc.length - 1].group === group) {
        acc[acc.length - 1].options.push(option);
      } else {
        if (true) {
          if (indexBy.get(group) && !warn) {
            console.warn(`MUI: The options provided combined with the \`groupBy\` method of ${componentName} returns duplicated headers.`, "You can solve the issue by sorting the options with the output of `groupBy`.");
            warn = true;
          }
          indexBy.set(group, true);
        }
        acc.push({
          key: index,
          index,
          group,
          options: [option]
        });
      }
      return acc;
    }, []);
  }
  if (disabledProp && focused) {
    handleBlur2();
  }
  return {
    getRootProps: (other = {}) => _extends({
      "aria-owns": listboxAvailable ? `${id}-listbox` : null
    }, other, {
      onKeyDown: handleKeyDown2(other),
      onMouseDown: handleMouseDown,
      onClick: handleClick
    }),
    getInputLabelProps: () => ({
      id: `${id}-label`,
      htmlFor: id
    }),
    getInputProps: () => ({
      id,
      value: inputValue,
      onBlur: handleBlur2,
      onFocus: handleFocus,
      onChange: handleInputChange,
      onMouseDown: handleInputMouseDown,
      "aria-activedescendant": popupOpen ? "" : null,
      "aria-autocomplete": autoComplete ? "both" : "list",
      "aria-controls": listboxAvailable ? `${id}-listbox` : void 0,
      "aria-expanded": listboxAvailable,
      autoComplete: "off",
      ref: inputRef,
      autoCapitalize: "none",
      spellCheck: "false",
      role: "combobox"
    }),
    getClearProps: () => ({
      tabIndex: -1,
      onClick: handleClear
    }),
    getPopupIndicatorProps: () => ({
      tabIndex: -1,
      onClick: handlePopupIndicator
    }),
    getTagProps: ({
      index
    }) => _extends({
      key: index,
      "data-tag-index": index,
      tabIndex: -1
    }, !readOnly && {
      onDelete: handleTagDelete(index)
    }),
    getListboxProps: () => ({
      role: "listbox",
      id: `${id}-listbox`,
      "aria-labelledby": `${id}-label`,
      ref: handleListboxRef,
      onMouseDown: (event) => {
        event.preventDefault();
      }
    }),
    getOptionProps: ({
      index,
      option
    }) => {
      const selected = (multiple ? value : [value]).some((value2) => value2 != null && isOptionEqualToValue(option, value2));
      const disabled = getOptionDisabled ? getOptionDisabled(option) : false;
      return {
        key: getOptionLabel(option),
        tabIndex: -1,
        role: "option",
        id: `${id}-option-${index}`,
        onMouseOver: handleOptionMouseOver,
        onClick: handleOptionClick,
        onTouchStart: handleOptionTouchStart,
        "data-option-index": index,
        "aria-disabled": disabled,
        "aria-selected": selected
      };
    },
    id,
    inputValue,
    value,
    dirty,
    popupOpen,
    focused: focused || focusedTag !== -1,
    anchorEl,
    setAnchorEl,
    focusedTag,
    groupedOptions
  };
}
var React, defaultFilterOptions, pageSize, defaultIsActiveElementInListbox;
var init_useAutocomplete = __esm({
  "node_modules/@mui/base/AutocompleteUnstyled/useAutocomplete.js"() {
    init_extends();
    React = __toESM(require_react());
    init_esm();
    defaultFilterOptions = createFilterOptions();
    pageSize = 5;
    defaultIsActiveElementInListbox = (listboxRef) => {
      var _listboxRef$current$p;
      return listboxRef.current !== null && ((_listboxRef$current$p = listboxRef.current.parentElement) == null ? void 0 : _listboxRef$current$p.contains(document.activeElement));
    };
  }
});

// node_modules/@mui/base/AutocompleteUnstyled/index.js
var init_AutocompleteUnstyled = __esm({
  "node_modules/@mui/base/AutocompleteUnstyled/index.js"() {
    init_useAutocomplete();
  }
});

// node_modules/@mui/base/composeClasses/index.js
var init_composeClasses = __esm({
  "node_modules/@mui/base/composeClasses/index.js"() {
    init_esm();
  }
});

// node_modules/@mui/base/ClickAwayListener/ClickAwayListener.js
function mapEventPropToEvent(eventProp) {
  return eventProp.substring(2).toLowerCase();
}
function clickedRootScrollbar(event, doc) {
  return doc.documentElement.clientWidth < event.clientX || doc.documentElement.clientHeight < event.clientY;
}
function ClickAwayListener(props) {
  const {
    children,
    disableReactTree = false,
    mouseEvent = "onClick",
    onClickAway,
    touchEvent = "onTouchEnd"
  } = props;
  const movedRef = React2.useRef(false);
  const nodeRef = React2.useRef(null);
  const activatedRef = React2.useRef(false);
  const syntheticEventRef = React2.useRef(false);
  React2.useEffect(() => {
    setTimeout(() => {
      activatedRef.current = true;
    }, 0);
    return () => {
      activatedRef.current = false;
    };
  }, []);
  const handleRef = useForkRef(
    children.ref,
    nodeRef
  );
  const handleClickAway = useEventCallback((event) => {
    const insideReactTree = syntheticEventRef.current;
    syntheticEventRef.current = false;
    const doc = ownerDocument(nodeRef.current);
    if (!activatedRef.current || !nodeRef.current || "clientX" in event && clickedRootScrollbar(event, doc)) {
      return;
    }
    if (movedRef.current) {
      movedRef.current = false;
      return;
    }
    let insideDOM;
    if (event.composedPath) {
      insideDOM = event.composedPath().indexOf(nodeRef.current) > -1;
    } else {
      insideDOM = !doc.documentElement.contains(
        event.target
      ) || nodeRef.current.contains(
        event.target
      );
    }
    if (!insideDOM && (disableReactTree || !insideReactTree)) {
      onClickAway(event);
    }
  });
  const createHandleSynthetic = (handlerName) => (event) => {
    syntheticEventRef.current = true;
    const childrenPropsHandler = children.props[handlerName];
    if (childrenPropsHandler) {
      childrenPropsHandler(event);
    }
  };
  const childrenProps = {
    ref: handleRef
  };
  if (touchEvent !== false) {
    childrenProps[touchEvent] = createHandleSynthetic(touchEvent);
  }
  React2.useEffect(() => {
    if (touchEvent !== false) {
      const mappedTouchEvent = mapEventPropToEvent(touchEvent);
      const doc = ownerDocument(nodeRef.current);
      const handleTouchMove = () => {
        movedRef.current = true;
      };
      doc.addEventListener(mappedTouchEvent, handleClickAway);
      doc.addEventListener("touchmove", handleTouchMove);
      return () => {
        doc.removeEventListener(mappedTouchEvent, handleClickAway);
        doc.removeEventListener("touchmove", handleTouchMove);
      };
    }
    return void 0;
  }, [handleClickAway, touchEvent]);
  if (mouseEvent !== false) {
    childrenProps[mouseEvent] = createHandleSynthetic(mouseEvent);
  }
  React2.useEffect(() => {
    if (mouseEvent !== false) {
      const mappedMouseEvent = mapEventPropToEvent(mouseEvent);
      const doc = ownerDocument(nodeRef.current);
      doc.addEventListener(mappedMouseEvent, handleClickAway);
      return () => {
        doc.removeEventListener(mappedMouseEvent, handleClickAway);
      };
    }
    return void 0;
  }, [handleClickAway, mouseEvent]);
  return (0, import_jsx_runtime.jsx)(React2.Fragment, {
    children: React2.cloneElement(children, childrenProps)
  });
}
var React2, import_prop_types, import_jsx_runtime, ClickAwayListener_default;
var init_ClickAwayListener = __esm({
  "node_modules/@mui/base/ClickAwayListener/ClickAwayListener.js"() {
    React2 = __toESM(require_react());
    import_prop_types = __toESM(require_prop_types());
    init_esm();
    import_jsx_runtime = __toESM(require_jsx_runtime());
    true ? ClickAwayListener.propTypes = {
      children: elementAcceptingRef_default.isRequired,
      disableReactTree: import_prop_types.default.bool,
      mouseEvent: import_prop_types.default.oneOf(["onClick", "onMouseDown", "onMouseUp", "onPointerDown", "onPointerUp", false]),
      onClickAway: import_prop_types.default.func.isRequired,
      touchEvent: import_prop_types.default.oneOf(["onTouchEnd", "onTouchStart", false])
    } : void 0;
    if (true) {
      ClickAwayListener["propTypes"] = exactProp(ClickAwayListener.propTypes);
    }
    ClickAwayListener_default = ClickAwayListener;
  }
});

// node_modules/@mui/base/ClickAwayListener/index.js
var init_ClickAwayListener2 = __esm({
  "node_modules/@mui/base/ClickAwayListener/index.js"() {
    init_ClickAwayListener();
    init_ClickAwayListener();
  }
});

// node_modules/@mui/base/FocusTrap/FocusTrap.js
function getTabIndex(node) {
  const tabindexAttr = parseInt(node.getAttribute("tabindex"), 10);
  if (!Number.isNaN(tabindexAttr)) {
    return tabindexAttr;
  }
  if (node.contentEditable === "true" || (node.nodeName === "AUDIO" || node.nodeName === "VIDEO" || node.nodeName === "DETAILS") && node.getAttribute("tabindex") === null) {
    return 0;
  }
  return node.tabIndex;
}
function isNonTabbableRadio(node) {
  if (node.tagName !== "INPUT" || node.type !== "radio") {
    return false;
  }
  if (!node.name) {
    return false;
  }
  const getRadio = (selector) => node.ownerDocument.querySelector(`input[type="radio"]${selector}`);
  let roving = getRadio(`[name="${node.name}"]:checked`);
  if (!roving) {
    roving = getRadio(`[name="${node.name}"]`);
  }
  return roving !== node;
}
function isNodeMatchingSelectorFocusable(node) {
  if (node.disabled || node.tagName === "INPUT" && node.type === "hidden" || isNonTabbableRadio(node)) {
    return false;
  }
  return true;
}
function defaultGetTabbable(root) {
  const regularTabNodes = [];
  const orderedTabNodes = [];
  Array.from(root.querySelectorAll(candidatesSelector)).forEach((node, i) => {
    const nodeTabIndex = getTabIndex(node);
    if (nodeTabIndex === -1 || !isNodeMatchingSelectorFocusable(node)) {
      return;
    }
    if (nodeTabIndex === 0) {
      regularTabNodes.push(node);
    } else {
      orderedTabNodes.push({
        documentOrder: i,
        tabIndex: nodeTabIndex,
        node
      });
    }
  });
  return orderedTabNodes.sort((a, b) => a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex).map((a) => a.node).concat(regularTabNodes);
}
function defaultIsEnabled() {
  return true;
}
function FocusTrap(props) {
  const {
    children,
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disableRestoreFocus = false,
    getTabbable = defaultGetTabbable,
    isEnabled = defaultIsEnabled,
    open
  } = props;
  const ignoreNextEnforceFocus = React3.useRef();
  const sentinelStart = React3.useRef(null);
  const sentinelEnd = React3.useRef(null);
  const nodeToRestore = React3.useRef(null);
  const reactFocusEventTarget = React3.useRef(null);
  const activated = React3.useRef(false);
  const rootRef = React3.useRef(null);
  const handleRef = useForkRef(children.ref, rootRef);
  const lastKeydown = React3.useRef(null);
  React3.useEffect(() => {
    if (!open || !rootRef.current) {
      return;
    }
    activated.current = !disableAutoFocus;
  }, [disableAutoFocus, open]);
  React3.useEffect(() => {
    if (!open || !rootRef.current) {
      return;
    }
    const doc = ownerDocument(rootRef.current);
    if (!rootRef.current.contains(doc.activeElement)) {
      if (!rootRef.current.hasAttribute("tabIndex")) {
        if (true) {
          console.error(["MUI: The modal content node does not accept focus.", 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join("\n"));
        }
        rootRef.current.setAttribute("tabIndex", -1);
      }
      if (activated.current) {
        rootRef.current.focus();
      }
    }
    return () => {
      if (!disableRestoreFocus) {
        if (nodeToRestore.current && nodeToRestore.current.focus) {
          ignoreNextEnforceFocus.current = true;
          nodeToRestore.current.focus();
        }
        nodeToRestore.current = null;
      }
    };
  }, [open]);
  React3.useEffect(() => {
    if (!open || !rootRef.current) {
      return;
    }
    const doc = ownerDocument(rootRef.current);
    const contain = (nativeEvent) => {
      const {
        current: rootElement
      } = rootRef;
      if (rootElement === null) {
        return;
      }
      if (!doc.hasFocus() || disableEnforceFocus || !isEnabled() || ignoreNextEnforceFocus.current) {
        ignoreNextEnforceFocus.current = false;
        return;
      }
      if (!rootElement.contains(doc.activeElement)) {
        if (nativeEvent && reactFocusEventTarget.current !== nativeEvent.target || doc.activeElement !== reactFocusEventTarget.current) {
          reactFocusEventTarget.current = null;
        } else if (reactFocusEventTarget.current !== null) {
          return;
        }
        if (!activated.current) {
          return;
        }
        let tabbable = [];
        if (doc.activeElement === sentinelStart.current || doc.activeElement === sentinelEnd.current) {
          tabbable = getTabbable(rootRef.current);
        }
        if (tabbable.length > 0) {
          var _lastKeydown$current, _lastKeydown$current2;
          const isShiftTab = Boolean(((_lastKeydown$current = lastKeydown.current) == null ? void 0 : _lastKeydown$current.shiftKey) && ((_lastKeydown$current2 = lastKeydown.current) == null ? void 0 : _lastKeydown$current2.key) === "Tab");
          const focusNext = tabbable[0];
          const focusPrevious = tabbable[tabbable.length - 1];
          if (isShiftTab) {
            focusPrevious.focus();
          } else {
            focusNext.focus();
          }
        } else {
          rootElement.focus();
        }
      }
    };
    const loopFocus = (nativeEvent) => {
      lastKeydown.current = nativeEvent;
      if (disableEnforceFocus || !isEnabled() || nativeEvent.key !== "Tab") {
        return;
      }
      if (doc.activeElement === rootRef.current && nativeEvent.shiftKey) {
        ignoreNextEnforceFocus.current = true;
        sentinelEnd.current.focus();
      }
    };
    doc.addEventListener("focusin", contain);
    doc.addEventListener("keydown", loopFocus, true);
    const interval = setInterval(() => {
      if (doc.activeElement.tagName === "BODY") {
        contain();
      }
    }, 50);
    return () => {
      clearInterval(interval);
      doc.removeEventListener("focusin", contain);
      doc.removeEventListener("keydown", loopFocus, true);
    };
  }, [disableAutoFocus, disableEnforceFocus, disableRestoreFocus, isEnabled, open, getTabbable]);
  const onFocus = (event) => {
    if (nodeToRestore.current === null) {
      nodeToRestore.current = event.relatedTarget;
    }
    activated.current = true;
    reactFocusEventTarget.current = event.target;
    const childrenPropsHandler = children.props.onFocus;
    if (childrenPropsHandler) {
      childrenPropsHandler(event);
    }
  };
  const handleFocusSentinel = (event) => {
    if (nodeToRestore.current === null) {
      nodeToRestore.current = event.relatedTarget;
    }
    activated.current = true;
  };
  return (0, import_jsx_runtime3.jsxs)(React3.Fragment, {
    children: [(0, import_jsx_runtime2.jsx)("div", {
      tabIndex: open ? 0 : -1,
      onFocus: handleFocusSentinel,
      ref: sentinelStart,
      "data-testid": "sentinelStart"
    }), React3.cloneElement(children, {
      ref: handleRef,
      onFocus
    }), (0, import_jsx_runtime2.jsx)("div", {
      tabIndex: open ? 0 : -1,
      onFocus: handleFocusSentinel,
      ref: sentinelEnd,
      "data-testid": "sentinelEnd"
    })]
  });
}
var React3, import_prop_types2, import_jsx_runtime2, import_jsx_runtime3, candidatesSelector, FocusTrap_default;
var init_FocusTrap = __esm({
  "node_modules/@mui/base/FocusTrap/FocusTrap.js"() {
    React3 = __toESM(require_react());
    import_prop_types2 = __toESM(require_prop_types());
    init_esm();
    import_jsx_runtime2 = __toESM(require_jsx_runtime());
    import_jsx_runtime3 = __toESM(require_jsx_runtime());
    candidatesSelector = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
    true ? FocusTrap.propTypes = {
      children: elementAcceptingRef_default,
      disableAutoFocus: import_prop_types2.default.bool,
      disableEnforceFocus: import_prop_types2.default.bool,
      disableRestoreFocus: import_prop_types2.default.bool,
      getTabbable: import_prop_types2.default.func,
      isEnabled: import_prop_types2.default.func,
      open: import_prop_types2.default.bool.isRequired
    } : void 0;
    if (true) {
      FocusTrap["propTypes"] = exactProp(FocusTrap.propTypes);
    }
    FocusTrap_default = FocusTrap;
  }
});

// node_modules/@mui/base/FocusTrap/index.js
var init_FocusTrap2 = __esm({
  "node_modules/@mui/base/FocusTrap/index.js"() {
    init_FocusTrap();
  }
});

// node_modules/@mui/base/Portal/Portal.js
function getContainer(container) {
  return typeof container === "function" ? container() : container;
}
var React4, ReactDOM, import_prop_types3, import_jsx_runtime4, Portal, Portal_default;
var init_Portal = __esm({
  "node_modules/@mui/base/Portal/Portal.js"() {
    React4 = __toESM(require_react());
    ReactDOM = __toESM(require_react_dom());
    import_prop_types3 = __toESM(require_prop_types());
    init_esm();
    import_jsx_runtime4 = __toESM(require_jsx_runtime());
    Portal = React4.forwardRef(function Portal2(props, ref) {
      const {
        children,
        container,
        disablePortal = false
      } = props;
      const [mountNode, setMountNode] = React4.useState(null);
      const handleRef = useForkRef(React4.isValidElement(children) ? children.ref : null, ref);
      useEnhancedEffect_default(() => {
        if (!disablePortal) {
          setMountNode(getContainer(container) || document.body);
        }
      }, [container, disablePortal]);
      useEnhancedEffect_default(() => {
        if (mountNode && !disablePortal) {
          setRef(ref, mountNode);
          return () => {
            setRef(ref, null);
          };
        }
        return void 0;
      }, [ref, mountNode, disablePortal]);
      if (disablePortal) {
        if (React4.isValidElement(children)) {
          return React4.cloneElement(children, {
            ref: handleRef
          });
        }
        return children;
      }
      return (0, import_jsx_runtime4.jsx)(React4.Fragment, {
        children: mountNode ? ReactDOM.createPortal(children, mountNode) : mountNode
      });
    });
    true ? Portal.propTypes = {
      children: import_prop_types3.default.node,
      container: import_prop_types3.default.oneOfType([HTMLElementType, import_prop_types3.default.func]),
      disablePortal: import_prop_types3.default.bool
    } : void 0;
    if (true) {
      Portal["propTypes"] = exactProp(Portal.propTypes);
    }
    Portal_default = Portal;
  }
});

// node_modules/@mui/base/Portal/index.js
var init_Portal2 = __esm({
  "node_modules/@mui/base/Portal/index.js"() {
    init_Portal();
  }
});

// node_modules/@mui/base/ModalUnstyled/ModalManager.js
function isOverflowing(container) {
  const doc = ownerDocument(container);
  if (doc.body === container) {
    return ownerWindow(container).innerWidth > doc.documentElement.clientWidth;
  }
  return container.scrollHeight > container.clientHeight;
}
function ariaHidden(element, show) {
  if (show) {
    element.setAttribute("aria-hidden", "true");
  } else {
    element.removeAttribute("aria-hidden");
  }
}
function getPaddingRight(element) {
  return parseInt(ownerWindow(element).getComputedStyle(element).paddingRight, 10) || 0;
}
function isAriaHiddenForbiddenOnElement(element) {
  const forbiddenTagNames = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"];
  const isForbiddenTagName = forbiddenTagNames.indexOf(element.tagName) !== -1;
  const isInputHidden = element.tagName === "INPUT" && element.getAttribute("type") === "hidden";
  return isForbiddenTagName || isInputHidden;
}
function ariaHiddenSiblings(container, mountElement, currentElement, elementsToExclude, show) {
  const blacklist = [mountElement, currentElement, ...elementsToExclude];
  [].forEach.call(container.children, (element) => {
    const isNotExcludedElement = blacklist.indexOf(element) === -1;
    const isNotForbiddenElement = !isAriaHiddenForbiddenOnElement(element);
    if (isNotExcludedElement && isNotForbiddenElement) {
      ariaHidden(element, show);
    }
  });
}
function findIndexOf(items, callback) {
  let idx = -1;
  items.some((item, index) => {
    if (callback(item)) {
      idx = index;
      return true;
    }
    return false;
  });
  return idx;
}
function handleContainer(containerInfo, props) {
  const restoreStyle = [];
  const container = containerInfo.container;
  if (!props.disableScrollLock) {
    if (isOverflowing(container)) {
      const scrollbarSize = getScrollbarSize(ownerDocument(container));
      restoreStyle.push({
        value: container.style.paddingRight,
        property: "padding-right",
        el: container
      });
      container.style.paddingRight = `${getPaddingRight(container) + scrollbarSize}px`;
      const fixedElements = ownerDocument(container).querySelectorAll(".mui-fixed");
      [].forEach.call(fixedElements, (element) => {
        restoreStyle.push({
          value: element.style.paddingRight,
          property: "padding-right",
          el: element
        });
        element.style.paddingRight = `${getPaddingRight(element) + scrollbarSize}px`;
      });
    }
    let scrollContainer;
    if (container.parentNode instanceof DocumentFragment) {
      scrollContainer = ownerDocument(container).body;
    } else {
      const parent = container.parentElement;
      const containerWindow = ownerWindow(container);
      scrollContainer = (parent == null ? void 0 : parent.nodeName) === "HTML" && containerWindow.getComputedStyle(parent).overflowY === "scroll" ? parent : container;
    }
    restoreStyle.push({
      value: scrollContainer.style.overflow,
      property: "overflow",
      el: scrollContainer
    }, {
      value: scrollContainer.style.overflowX,
      property: "overflow-x",
      el: scrollContainer
    }, {
      value: scrollContainer.style.overflowY,
      property: "overflow-y",
      el: scrollContainer
    });
    scrollContainer.style.overflow = "hidden";
  }
  const restore = () => {
    restoreStyle.forEach(({
      value,
      el,
      property
    }) => {
      if (value) {
        el.style.setProperty(property, value);
      } else {
        el.style.removeProperty(property);
      }
    });
  };
  return restore;
}
function getHiddenSiblings(container) {
  const hiddenSiblings = [];
  [].forEach.call(container.children, (element) => {
    if (element.getAttribute("aria-hidden") === "true") {
      hiddenSiblings.push(element);
    }
  });
  return hiddenSiblings;
}
var ModalManager;
var init_ModalManager = __esm({
  "node_modules/@mui/base/ModalUnstyled/ModalManager.js"() {
    init_esm();
    ModalManager = class {
      constructor() {
        this.containers = void 0;
        this.modals = void 0;
        this.modals = [];
        this.containers = [];
      }
      add(modal, container) {
        let modalIndex = this.modals.indexOf(modal);
        if (modalIndex !== -1) {
          return modalIndex;
        }
        modalIndex = this.modals.length;
        this.modals.push(modal);
        if (modal.modalRef) {
          ariaHidden(modal.modalRef, false);
        }
        const hiddenSiblings = getHiddenSiblings(container);
        ariaHiddenSiblings(container, modal.mount, modal.modalRef, hiddenSiblings, true);
        const containerIndex = findIndexOf(this.containers, (item) => item.container === container);
        if (containerIndex !== -1) {
          this.containers[containerIndex].modals.push(modal);
          return modalIndex;
        }
        this.containers.push({
          modals: [modal],
          container,
          restore: null,
          hiddenSiblings
        });
        return modalIndex;
      }
      mount(modal, props) {
        const containerIndex = findIndexOf(this.containers, (item) => item.modals.indexOf(modal) !== -1);
        const containerInfo = this.containers[containerIndex];
        if (!containerInfo.restore) {
          containerInfo.restore = handleContainer(containerInfo, props);
        }
      }
      remove(modal, ariaHiddenState = true) {
        const modalIndex = this.modals.indexOf(modal);
        if (modalIndex === -1) {
          return modalIndex;
        }
        const containerIndex = findIndexOf(this.containers, (item) => item.modals.indexOf(modal) !== -1);
        const containerInfo = this.containers[containerIndex];
        containerInfo.modals.splice(containerInfo.modals.indexOf(modal), 1);
        this.modals.splice(modalIndex, 1);
        if (containerInfo.modals.length === 0) {
          if (containerInfo.restore) {
            containerInfo.restore();
          }
          if (modal.modalRef) {
            ariaHidden(modal.modalRef, ariaHiddenState);
          }
          ariaHiddenSiblings(containerInfo.container, modal.mount, modal.modalRef, containerInfo.hiddenSiblings, false);
          this.containers.splice(containerIndex, 1);
        } else {
          const nextTop = containerInfo.modals[containerInfo.modals.length - 1];
          if (nextTop.modalRef) {
            ariaHidden(nextTop.modalRef, false);
          }
        }
        return modalIndex;
      }
      isTopModal(modal) {
        return this.modals.length > 0 && this.modals[this.modals.length - 1] === modal;
      }
    };
  }
});

// node_modules/@mui/base/generateUtilityClasses/index.js
var init_generateUtilityClasses = __esm({
  "node_modules/@mui/base/generateUtilityClasses/index.js"() {
    init_esm();
  }
});

// node_modules/@mui/base/generateUtilityClass/index.js
var init_generateUtilityClass = __esm({
  "node_modules/@mui/base/generateUtilityClass/index.js"() {
    init_esm();
  }
});

// node_modules/@mui/base/ModalUnstyled/modalUnstyledClasses.js
function getModalUtilityClass(slot) {
  return generateUtilityClass("MuiModal", slot);
}
var modalUnstyledClasses, modalUnstyledClasses_default;
var init_modalUnstyledClasses = __esm({
  "node_modules/@mui/base/ModalUnstyled/modalUnstyledClasses.js"() {
    init_generateUtilityClasses();
    init_generateUtilityClass();
    modalUnstyledClasses = generateUtilityClasses("MuiModal", ["root", "hidden"]);
    modalUnstyledClasses_default = modalUnstyledClasses;
  }
});

// node_modules/@mui/base/utils/isHostComponent.js
function isHostComponent(element) {
  return typeof element === "string";
}
var isHostComponent_default;
var init_isHostComponent = __esm({
  "node_modules/@mui/base/utils/isHostComponent.js"() {
    isHostComponent_default = isHostComponent;
  }
});

// node_modules/@mui/base/utils/appendOwnerState.js
function appendOwnerState(elementType, otherProps, ownerState) {
  if (elementType === void 0 || isHostComponent_default(elementType)) {
    return otherProps;
  }
  return _extends({}, otherProps, {
    ownerState: _extends({}, otherProps.ownerState, ownerState)
  });
}
var init_appendOwnerState = __esm({
  "node_modules/@mui/base/utils/appendOwnerState.js"() {
    init_extends();
    init_isHostComponent();
  }
});

// node_modules/@mui/base/utils/areArraysEqual.js
function areArraysEqual(array1, array2, itemComparer = (a, b) => a === b) {
  return array1.length === array2.length && array1.every((value, index) => itemComparer(value, array2[index]));
}
var init_areArraysEqual = __esm({
  "node_modules/@mui/base/utils/areArraysEqual.js"() {
  }
});

// node_modules/@mui/base/utils/extractEventHandlers.js
function extractEventHandlers(object, excludeKeys = []) {
  if (object === void 0) {
    return {};
  }
  const result = {};
  Object.keys(object).filter((prop) => prop.match(/^on[A-Z]/) && typeof object[prop] === "function" && !excludeKeys.includes(prop)).forEach((prop) => {
    result[prop] = object[prop];
  });
  return result;
}
var init_extractEventHandlers = __esm({
  "node_modules/@mui/base/utils/extractEventHandlers.js"() {
  }
});

// node_modules/@mui/base/utils/resolveComponentProps.js
function resolveComponentProps(componentProps, ownerState) {
  if (typeof componentProps === "function") {
    return componentProps(ownerState);
  }
  return componentProps;
}
var init_resolveComponentProps = __esm({
  "node_modules/@mui/base/utils/resolveComponentProps.js"() {
  }
});

// node_modules/@mui/base/utils/omitEventHandlers.js
function omitEventHandlers(object) {
  if (object === void 0) {
    return {};
  }
  const result = {};
  Object.keys(object).filter((prop) => !(prop.match(/^on[A-Z]/) && typeof object[prop] === "function")).forEach((prop) => {
    result[prop] = object[prop];
  });
  return result;
}
var init_omitEventHandlers = __esm({
  "node_modules/@mui/base/utils/omitEventHandlers.js"() {
  }
});

// node_modules/@mui/base/utils/mergeSlotProps.js
function mergeSlotProps(parameters) {
  const {
    getSlotProps,
    additionalProps,
    externalSlotProps,
    externalForwardedProps,
    className
  } = parameters;
  if (!getSlotProps) {
    const joinedClasses2 = clsx_m_default(externalForwardedProps == null ? void 0 : externalForwardedProps.className, externalSlotProps == null ? void 0 : externalSlotProps.className, className, additionalProps == null ? void 0 : additionalProps.className);
    const mergedStyle2 = _extends({}, additionalProps == null ? void 0 : additionalProps.style, externalForwardedProps == null ? void 0 : externalForwardedProps.style, externalSlotProps == null ? void 0 : externalSlotProps.style);
    const props2 = _extends({}, additionalProps, externalForwardedProps, externalSlotProps);
    if (joinedClasses2.length > 0) {
      props2.className = joinedClasses2;
    }
    if (Object.keys(mergedStyle2).length > 0) {
      props2.style = mergedStyle2;
    }
    return {
      props: props2,
      internalRef: void 0
    };
  }
  const eventHandlers = extractEventHandlers(_extends({}, externalForwardedProps, externalSlotProps));
  const componentsPropsWithoutEventHandlers = omitEventHandlers(externalSlotProps);
  const otherPropsWithoutEventHandlers = omitEventHandlers(externalForwardedProps);
  const internalSlotProps = getSlotProps(eventHandlers);
  const joinedClasses = clsx_m_default(internalSlotProps == null ? void 0 : internalSlotProps.className, additionalProps == null ? void 0 : additionalProps.className, className, externalForwardedProps == null ? void 0 : externalForwardedProps.className, externalSlotProps == null ? void 0 : externalSlotProps.className);
  const mergedStyle = _extends({}, internalSlotProps == null ? void 0 : internalSlotProps.style, additionalProps == null ? void 0 : additionalProps.style, externalForwardedProps == null ? void 0 : externalForwardedProps.style, externalSlotProps == null ? void 0 : externalSlotProps.style);
  const props = _extends({}, internalSlotProps, additionalProps, otherPropsWithoutEventHandlers, componentsPropsWithoutEventHandlers);
  if (joinedClasses.length > 0) {
    props.className = joinedClasses;
  }
  if (Object.keys(mergedStyle).length > 0) {
    props.style = mergedStyle;
  }
  return {
    props,
    internalRef: internalSlotProps.ref
  };
}
var init_mergeSlotProps = __esm({
  "node_modules/@mui/base/utils/mergeSlotProps.js"() {
    init_extends();
    init_clsx_m();
    init_extractEventHandlers();
    init_omitEventHandlers();
  }
});

// node_modules/@mui/base/utils/useSlotProps.js
function useSlotProps(parameters) {
  var _parameters$additiona;
  const {
    elementType,
    externalSlotProps,
    ownerState
  } = parameters, rest = _objectWithoutPropertiesLoose(parameters, _excluded);
  const resolvedComponentsProps = resolveComponentProps(externalSlotProps, ownerState);
  const {
    props: mergedProps,
    internalRef
  } = mergeSlotProps(_extends({}, rest, {
    externalSlotProps: resolvedComponentsProps
  }));
  const ref = useForkRef(internalRef, resolvedComponentsProps == null ? void 0 : resolvedComponentsProps.ref, (_parameters$additiona = parameters.additionalProps) == null ? void 0 : _parameters$additiona.ref);
  const props = appendOwnerState(elementType, _extends({}, mergedProps, {
    ref
  }), ownerState);
  return props;
}
var _excluded;
var init_useSlotProps = __esm({
  "node_modules/@mui/base/utils/useSlotProps.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    init_esm();
    init_appendOwnerState();
    init_mergeSlotProps();
    init_resolveComponentProps();
    _excluded = ["elementType", "externalSlotProps", "ownerState"];
  }
});

// node_modules/@mui/base/utils/types.js
var init_types = __esm({
  "node_modules/@mui/base/utils/types.js"() {
  }
});

// node_modules/@mui/base/utils/index.js
var init_utils = __esm({
  "node_modules/@mui/base/utils/index.js"() {
    init_appendOwnerState();
    init_areArraysEqual();
    init_extractEventHandlers();
    init_isHostComponent();
    init_resolveComponentProps();
    init_useSlotProps();
    init_mergeSlotProps();
    init_types();
  }
});

// node_modules/@mui/base/ModalUnstyled/ModalUnstyled.js
function getContainer2(container) {
  return typeof container === "function" ? container() : container;
}
function getHasTransition(props) {
  return props.children ? props.children.props.hasOwnProperty("in") : false;
}
var React5, import_prop_types4, import_jsx_runtime5, import_jsx_runtime6, _excluded2, useUtilityClasses, defaultManager, ModalUnstyled, ModalUnstyled_default;
var init_ModalUnstyled = __esm({
  "node_modules/@mui/base/ModalUnstyled/ModalUnstyled.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React5 = __toESM(require_react());
    import_prop_types4 = __toESM(require_prop_types());
    init_esm();
    init_composeClasses();
    init_Portal2();
    init_ModalManager();
    init_FocusTrap2();
    init_modalUnstyledClasses();
    init_utils();
    import_jsx_runtime5 = __toESM(require_jsx_runtime());
    import_jsx_runtime6 = __toESM(require_jsx_runtime());
    _excluded2 = ["children", "classes", "closeAfterTransition", "component", "container", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "manager", "onBackdropClick", "onClose", "onKeyDown", "open", "onTransitionEnter", "onTransitionExited", "slotProps", "slots"];
    useUtilityClasses = (ownerState) => {
      const {
        open,
        exited,
        classes
      } = ownerState;
      const slots = {
        root: ["root", !open && exited && "hidden"]
      };
      return composeClasses(slots, getModalUtilityClass, classes);
    };
    defaultManager = new ModalManager();
    ModalUnstyled = React5.forwardRef(function ModalUnstyled2(props, ref) {
      var _props$ariaHidden, _ref;
      const {
        children,
        classes: classesProp,
        closeAfterTransition = false,
        component,
        container,
        disableAutoFocus = false,
        disableEnforceFocus = false,
        disableEscapeKeyDown = false,
        disablePortal = false,
        disableRestoreFocus = false,
        disableScrollLock = false,
        hideBackdrop = false,
        keepMounted = false,
        manager = defaultManager,
        onBackdropClick,
        onClose,
        onKeyDown,
        open,
        onTransitionEnter,
        onTransitionExited,
        slotProps = {},
        slots = {}
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded2);
      const [exited, setExited] = React5.useState(!open);
      const modal = React5.useRef({});
      const mountNodeRef = React5.useRef(null);
      const modalRef = React5.useRef(null);
      const handleRef = useForkRef(modalRef, ref);
      const hasTransition = getHasTransition(props);
      const ariaHiddenProp = (_props$ariaHidden = props["aria-hidden"]) != null ? _props$ariaHidden : true;
      const getDoc = () => ownerDocument(mountNodeRef.current);
      const getModal = () => {
        modal.current.modalRef = modalRef.current;
        modal.current.mountNode = mountNodeRef.current;
        return modal.current;
      };
      const handleMounted = () => {
        manager.mount(getModal(), {
          disableScrollLock
        });
        modalRef.current.scrollTop = 0;
      };
      const handleOpen = useEventCallback(() => {
        const resolvedContainer = getContainer2(container) || getDoc().body;
        manager.add(getModal(), resolvedContainer);
        if (modalRef.current) {
          handleMounted();
        }
      });
      const isTopModal = React5.useCallback(() => manager.isTopModal(getModal()), [manager]);
      const handlePortalRef = useEventCallback((node) => {
        mountNodeRef.current = node;
        if (!node) {
          return;
        }
        if (open && isTopModal()) {
          handleMounted();
        } else {
          ariaHidden(modalRef.current, ariaHiddenProp);
        }
      });
      const handleClose = React5.useCallback(() => {
        manager.remove(getModal(), ariaHiddenProp);
      }, [manager, ariaHiddenProp]);
      React5.useEffect(() => {
        return () => {
          handleClose();
        };
      }, [handleClose]);
      React5.useEffect(() => {
        if (open) {
          handleOpen();
        } else if (!hasTransition || !closeAfterTransition) {
          handleClose();
        }
      }, [open, handleClose, hasTransition, closeAfterTransition, handleOpen]);
      const ownerState = _extends({}, props, {
        classes: classesProp,
        closeAfterTransition,
        disableAutoFocus,
        disableEnforceFocus,
        disableEscapeKeyDown,
        disablePortal,
        disableRestoreFocus,
        disableScrollLock,
        exited,
        hideBackdrop,
        keepMounted
      });
      const classes = useUtilityClasses(ownerState);
      const handleEnter = () => {
        setExited(false);
        if (onTransitionEnter) {
          onTransitionEnter();
        }
      };
      const handleExited = () => {
        setExited(true);
        if (onTransitionExited) {
          onTransitionExited();
        }
        if (closeAfterTransition) {
          handleClose();
        }
      };
      const handleBackdropClick = (event) => {
        if (event.target !== event.currentTarget) {
          return;
        }
        if (onBackdropClick) {
          onBackdropClick(event);
        }
        if (onClose) {
          onClose(event, "backdropClick");
        }
      };
      const handleKeyDown2 = (event) => {
        if (onKeyDown) {
          onKeyDown(event);
        }
        if (event.key !== "Escape" || !isTopModal()) {
          return;
        }
        if (!disableEscapeKeyDown) {
          event.stopPropagation();
          if (onClose) {
            onClose(event, "escapeKeyDown");
          }
        }
      };
      const childProps = {};
      if (children.props.tabIndex === void 0) {
        childProps.tabIndex = "-1";
      }
      if (hasTransition) {
        childProps.onEnter = createChainedFunction(handleEnter, children.props.onEnter);
        childProps.onExited = createChainedFunction(handleExited, children.props.onExited);
      }
      const Root = (_ref = component != null ? component : slots.root) != null ? _ref : "div";
      const rootProps = useSlotProps({
        elementType: Root,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        additionalProps: {
          ref: handleRef,
          role: "presentation",
          onKeyDown: handleKeyDown2
        },
        className: classes.root,
        ownerState
      });
      const BackdropComponent = slots.backdrop;
      const backdropProps = useSlotProps({
        elementType: BackdropComponent,
        externalSlotProps: slotProps.backdrop,
        additionalProps: {
          "aria-hidden": true,
          onClick: handleBackdropClick,
          open
        },
        className: classes.backdrop,
        ownerState
      });
      if (!keepMounted && !open && (!hasTransition || exited)) {
        return null;
      }
      return (0, import_jsx_runtime5.jsx)(Portal_default, {
        ref: handlePortalRef,
        container,
        disablePortal,
        children: (0, import_jsx_runtime6.jsxs)(Root, _extends({}, rootProps, {
          children: [!hideBackdrop && BackdropComponent ? (0, import_jsx_runtime5.jsx)(BackdropComponent, _extends({}, backdropProps)) : null, (0, import_jsx_runtime5.jsx)(FocusTrap_default, {
            disableEnforceFocus,
            disableAutoFocus,
            disableRestoreFocus,
            isEnabled: isTopModal,
            open,
            children: React5.cloneElement(children, childProps)
          })]
        }))
      });
    });
    true ? ModalUnstyled.propTypes = {
      children: elementAcceptingRef_default.isRequired,
      classes: import_prop_types4.default.object,
      closeAfterTransition: import_prop_types4.default.bool,
      component: import_prop_types4.default.elementType,
      container: import_prop_types4.default.oneOfType([HTMLElementType, import_prop_types4.default.func]),
      disableAutoFocus: import_prop_types4.default.bool,
      disableEnforceFocus: import_prop_types4.default.bool,
      disableEscapeKeyDown: import_prop_types4.default.bool,
      disablePortal: import_prop_types4.default.bool,
      disableRestoreFocus: import_prop_types4.default.bool,
      disableScrollLock: import_prop_types4.default.bool,
      hideBackdrop: import_prop_types4.default.bool,
      keepMounted: import_prop_types4.default.bool,
      onBackdropClick: import_prop_types4.default.func,
      onClose: import_prop_types4.default.func,
      onKeyDown: import_prop_types4.default.func,
      open: import_prop_types4.default.bool.isRequired,
      slotProps: import_prop_types4.default.shape({
        backdrop: import_prop_types4.default.oneOfType([import_prop_types4.default.func, import_prop_types4.default.object]),
        root: import_prop_types4.default.oneOfType([import_prop_types4.default.func, import_prop_types4.default.object])
      }),
      slots: import_prop_types4.default.shape({
        backdrop: import_prop_types4.default.elementType,
        root: import_prop_types4.default.elementType
      })
    } : void 0;
    ModalUnstyled_default = ModalUnstyled;
  }
});

// node_modules/@mui/base/ModalUnstyled/index.js
var init_ModalUnstyled2 = __esm({
  "node_modules/@mui/base/ModalUnstyled/index.js"() {
    init_ModalUnstyled();
    init_ModalManager();
    init_modalUnstyledClasses();
  }
});

// node_modules/@mui/base/NoSsr/NoSsr.js
function NoSsr(props) {
  const {
    children,
    defer = false,
    fallback = null
  } = props;
  const [mountedState, setMountedState] = React6.useState(false);
  useEnhancedEffect_default(() => {
    if (!defer) {
      setMountedState(true);
    }
  }, [defer]);
  React6.useEffect(() => {
    if (defer) {
      setMountedState(true);
    }
  }, [defer]);
  return (0, import_jsx_runtime7.jsx)(React6.Fragment, {
    children: mountedState ? children : fallback
  });
}
var React6, import_prop_types5, import_jsx_runtime7, NoSsr_default;
var init_NoSsr = __esm({
  "node_modules/@mui/base/NoSsr/NoSsr.js"() {
    React6 = __toESM(require_react());
    import_prop_types5 = __toESM(require_prop_types());
    init_esm();
    import_jsx_runtime7 = __toESM(require_jsx_runtime());
    true ? NoSsr.propTypes = {
      children: import_prop_types5.default.node,
      defer: import_prop_types5.default.bool,
      fallback: import_prop_types5.default.node
    } : void 0;
    if (true) {
      NoSsr["propTypes"] = exactProp(NoSsr.propTypes);
    }
    NoSsr_default = NoSsr;
  }
});

// node_modules/@mui/base/NoSsr/NoSsr.types.js
var init_NoSsr_types = __esm({
  "node_modules/@mui/base/NoSsr/NoSsr.types.js"() {
  }
});

// node_modules/@mui/base/NoSsr/index.js
var init_NoSsr2 = __esm({
  "node_modules/@mui/base/NoSsr/index.js"() {
    init_NoSsr();
    init_NoSsr_types();
  }
});

// node_modules/@mui/base/TextareaAutosize/TextareaAutosize.js
function getStyleValue(computedStyle, property) {
  return parseInt(computedStyle[property], 10) || 0;
}
function isEmpty(obj) {
  return obj === void 0 || obj === null || Object.keys(obj).length === 0;
}
var React7, import_prop_types6, import_react_dom, import_jsx_runtime8, import_jsx_runtime9, _excluded3, styles, TextareaAutosize, TextareaAutosize_default;
var init_TextareaAutosize = __esm({
  "node_modules/@mui/base/TextareaAutosize/TextareaAutosize.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React7 = __toESM(require_react());
    import_prop_types6 = __toESM(require_prop_types());
    import_react_dom = __toESM(require_react_dom());
    init_esm();
    import_jsx_runtime8 = __toESM(require_jsx_runtime());
    import_jsx_runtime9 = __toESM(require_jsx_runtime());
    _excluded3 = ["onChange", "maxRows", "minRows", "style", "value"];
    styles = {
      shadow: {
        visibility: "hidden",
        position: "absolute",
        overflow: "hidden",
        height: 0,
        top: 0,
        left: 0,
        transform: "translateZ(0)"
      }
    };
    TextareaAutosize = React7.forwardRef(function TextareaAutosize2(props, ref) {
      const {
        onChange,
        maxRows,
        minRows = 1,
        style,
        value
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded3);
      const {
        current: isControlled
      } = React7.useRef(value != null);
      const inputRef = React7.useRef(null);
      const handleRef = useForkRef(ref, inputRef);
      const shadowRef = React7.useRef(null);
      const renders = React7.useRef(0);
      const [state, setState] = React7.useState({});
      const getUpdatedState = React7.useCallback(() => {
        const input = inputRef.current;
        const containerWindow = ownerWindow(input);
        const computedStyle = containerWindow.getComputedStyle(input);
        if (computedStyle.width === "0px") {
          return {};
        }
        const inputShallow = shadowRef.current;
        inputShallow.style.width = computedStyle.width;
        inputShallow.value = input.value || props.placeholder || "x";
        if (inputShallow.value.slice(-1) === "\n") {
          inputShallow.value += " ";
        }
        const boxSizing = computedStyle["box-sizing"];
        const padding = getStyleValue(computedStyle, "padding-bottom") + getStyleValue(computedStyle, "padding-top");
        const border = getStyleValue(computedStyle, "border-bottom-width") + getStyleValue(computedStyle, "border-top-width");
        const innerHeight = inputShallow.scrollHeight;
        inputShallow.value = "x";
        const singleRowHeight = inputShallow.scrollHeight;
        let outerHeight = innerHeight;
        if (minRows) {
          outerHeight = Math.max(Number(minRows) * singleRowHeight, outerHeight);
        }
        if (maxRows) {
          outerHeight = Math.min(Number(maxRows) * singleRowHeight, outerHeight);
        }
        outerHeight = Math.max(outerHeight, singleRowHeight);
        const outerHeightStyle = outerHeight + (boxSizing === "border-box" ? padding + border : 0);
        const overflow = Math.abs(outerHeight - innerHeight) <= 1;
        return {
          outerHeightStyle,
          overflow
        };
      }, [maxRows, minRows, props.placeholder]);
      const updateState = (prevState, newState) => {
        const {
          outerHeightStyle,
          overflow
        } = newState;
        if (renders.current < 20 && (outerHeightStyle > 0 && Math.abs((prevState.outerHeightStyle || 0) - outerHeightStyle) > 1 || prevState.overflow !== overflow)) {
          renders.current += 1;
          return {
            overflow,
            outerHeightStyle
          };
        }
        if (true) {
          if (renders.current === 20) {
            console.error(["MUI: Too many re-renders. The layout is unstable.", "TextareaAutosize limits the number of renders to prevent an infinite loop."].join("\n"));
          }
        }
        return prevState;
      };
      const syncHeight = React7.useCallback(() => {
        const newState = getUpdatedState();
        if (isEmpty(newState)) {
          return;
        }
        setState((prevState) => {
          return updateState(prevState, newState);
        });
      }, [getUpdatedState]);
      const syncHeightWithFlushSycn = () => {
        const newState = getUpdatedState();
        if (isEmpty(newState)) {
          return;
        }
        (0, import_react_dom.flushSync)(() => {
          setState((prevState) => {
            return updateState(prevState, newState);
          });
        });
      };
      React7.useEffect(() => {
        const handleResize = debounce(() => {
          renders.current = 0;
          if (inputRef.current) {
            syncHeightWithFlushSycn();
          }
        });
        const containerWindow = ownerWindow(inputRef.current);
        containerWindow.addEventListener("resize", handleResize);
        let resizeObserver;
        if (typeof ResizeObserver !== "undefined") {
          resizeObserver = new ResizeObserver(handleResize);
          resizeObserver.observe(inputRef.current);
        }
        return () => {
          handleResize.clear();
          containerWindow.removeEventListener("resize", handleResize);
          if (resizeObserver) {
            resizeObserver.disconnect();
          }
        };
      });
      useEnhancedEffect_default(() => {
        syncHeight();
      });
      React7.useEffect(() => {
        renders.current = 0;
      }, [value]);
      const handleChange = (event) => {
        renders.current = 0;
        if (!isControlled) {
          syncHeight();
        }
        if (onChange) {
          onChange(event);
        }
      };
      return (0, import_jsx_runtime9.jsxs)(React7.Fragment, {
        children: [(0, import_jsx_runtime8.jsx)("textarea", _extends({
          value,
          onChange: handleChange,
          ref: handleRef,
          rows: minRows,
          style: _extends({
            height: state.outerHeightStyle,
            overflow: state.overflow ? "hidden" : null
          }, style)
        }, other)), (0, import_jsx_runtime8.jsx)("textarea", {
          "aria-hidden": true,
          className: props.className,
          readOnly: true,
          ref: shadowRef,
          tabIndex: -1,
          style: _extends({}, styles.shadow, style, {
            padding: 0
          })
        })]
      });
    });
    true ? TextareaAutosize.propTypes = {
      className: import_prop_types6.default.string,
      maxRows: import_prop_types6.default.oneOfType([import_prop_types6.default.number, import_prop_types6.default.string]),
      minRows: import_prop_types6.default.oneOfType([import_prop_types6.default.number, import_prop_types6.default.string]),
      onChange: import_prop_types6.default.func,
      placeholder: import_prop_types6.default.string,
      style: import_prop_types6.default.object,
      value: import_prop_types6.default.oneOfType([import_prop_types6.default.arrayOf(import_prop_types6.default.string), import_prop_types6.default.number, import_prop_types6.default.string])
    } : void 0;
    TextareaAutosize_default = TextareaAutosize;
  }
});

// node_modules/@mui/base/TextareaAutosize/index.js
var init_TextareaAutosize2 = __esm({
  "node_modules/@mui/base/TextareaAutosize/index.js"() {
    init_TextareaAutosize();
  }
});

// node_modules/@mui/base/BadgeUnstyled/useBadge.js
function useBadge(parameters) {
  const {
    badgeContent: badgeContentProp,
    invisible: invisibleProp = false,
    max: maxProp = 99,
    showZero = false
  } = parameters;
  const prevProps = usePreviousProps_default({
    badgeContent: badgeContentProp,
    max: maxProp
  });
  let invisible = invisibleProp;
  if (invisibleProp === false && badgeContentProp === 0 && !showZero) {
    invisible = true;
  }
  const {
    badgeContent,
    max: max2 = maxProp
  } = invisible ? prevProps : parameters;
  const displayValue = badgeContent && Number(badgeContent) > max2 ? `${max2}+` : badgeContent;
  return {
    badgeContent,
    invisible,
    max: max2,
    displayValue
  };
}
var init_useBadge = __esm({
  "node_modules/@mui/base/BadgeUnstyled/useBadge.js"() {
    init_esm();
  }
});

// node_modules/@mui/base/BadgeUnstyled/badgeUnstyledClasses.js
function getBadgeUnstyledUtilityClass(slot) {
  return generateUtilityClass("MuiBadge", slot);
}
var badgeUnstyledClasses;
var init_badgeUnstyledClasses = __esm({
  "node_modules/@mui/base/BadgeUnstyled/badgeUnstyledClasses.js"() {
    init_generateUtilityClasses();
    init_generateUtilityClass();
    badgeUnstyledClasses = generateUtilityClasses("MuiBadge", ["root", "badge", "invisible"]);
  }
});

// node_modules/@mui/base/BadgeUnstyled/BadgeUnstyled.js
var React8, import_prop_types7, import_jsx_runtime10, import_jsx_runtime11, _excluded4, useUtilityClasses2, BadgeUnstyled, BadgeUnstyled_default;
var init_BadgeUnstyled = __esm({
  "node_modules/@mui/base/BadgeUnstyled/BadgeUnstyled.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React8 = __toESM(require_react());
    import_prop_types7 = __toESM(require_prop_types());
    init_composeClasses();
    init_useBadge();
    init_badgeUnstyledClasses();
    init_utils();
    import_jsx_runtime10 = __toESM(require_jsx_runtime());
    import_jsx_runtime11 = __toESM(require_jsx_runtime());
    _excluded4 = ["badgeContent", "component", "children", "invisible", "max", "slotProps", "slots", "showZero"];
    useUtilityClasses2 = (ownerState) => {
      const {
        invisible
      } = ownerState;
      const slots = {
        root: ["root"],
        badge: ["badge", invisible && "invisible"]
      };
      return composeClasses(slots, getBadgeUnstyledUtilityClass, void 0);
    };
    BadgeUnstyled = React8.forwardRef(function BadgeUnstyled2(props, ref) {
      const {
        component,
        children,
        max: maxProp = 99,
        slotProps = {},
        slots = {},
        showZero = false
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded4);
      const {
        badgeContent,
        max: max2,
        displayValue,
        invisible
      } = useBadge(_extends({}, props, {
        max: maxProp
      }));
      const ownerState = _extends({}, props, {
        badgeContent,
        invisible,
        max: max2,
        showZero
      });
      const classes = useUtilityClasses2(ownerState);
      const Root = component || slots.root || "span";
      const rootProps = useSlotProps({
        elementType: Root,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        additionalProps: {
          ref
        },
        ownerState,
        className: classes.root
      });
      const Badge = slots.badge || "span";
      const badgeProps = useSlotProps({
        elementType: Badge,
        externalSlotProps: slotProps.badge,
        ownerState,
        className: classes.badge
      });
      return (0, import_jsx_runtime11.jsxs)(Root, _extends({}, rootProps, {
        children: [children, (0, import_jsx_runtime10.jsx)(Badge, _extends({}, badgeProps, {
          children: displayValue
        }))]
      }));
    });
    true ? BadgeUnstyled.propTypes = {
      badgeContent: import_prop_types7.default.node,
      children: import_prop_types7.default.node,
      component: import_prop_types7.default.elementType,
      invisible: import_prop_types7.default.bool,
      max: import_prop_types7.default.number,
      showZero: import_prop_types7.default.bool,
      slotProps: import_prop_types7.default.shape({
        badge: import_prop_types7.default.oneOfType([import_prop_types7.default.func, import_prop_types7.default.object]),
        root: import_prop_types7.default.oneOfType([import_prop_types7.default.func, import_prop_types7.default.object])
      }),
      slots: import_prop_types7.default.shape({
        badge: import_prop_types7.default.elementType,
        root: import_prop_types7.default.elementType
      })
    } : void 0;
    BadgeUnstyled_default = BadgeUnstyled;
  }
});

// node_modules/@mui/base/BadgeUnstyled/BadgeUnstyled.types.js
var init_BadgeUnstyled_types = __esm({
  "node_modules/@mui/base/BadgeUnstyled/BadgeUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/BadgeUnstyled/index.js
var init_BadgeUnstyled2 = __esm({
  "node_modules/@mui/base/BadgeUnstyled/index.js"() {
    init_BadgeUnstyled();
    init_useBadge();
    init_useBadge();
    init_BadgeUnstyled_types();
    init_badgeUnstyledClasses();
    init_badgeUnstyledClasses();
  }
});

// node_modules/@mui/base/ButtonUnstyled/useButton.js
function useButton(parameters) {
  const {
    disabled = false,
    focusableWhenDisabled,
    href,
    ref: externalRef,
    tabIndex,
    to,
    type
  } = parameters;
  const buttonRef = React9.useRef();
  const [active, setActive] = React9.useState(false);
  const {
    isFocusVisibleRef,
    onFocus: handleFocusVisible,
    onBlur: handleBlurVisible,
    ref: focusVisibleRef
  } = useIsFocusVisible();
  const [focusVisible, setFocusVisible] = React9.useState(false);
  if (disabled && !focusableWhenDisabled && focusVisible) {
    setFocusVisible(false);
  }
  React9.useEffect(() => {
    isFocusVisibleRef.current = focusVisible;
  }, [focusVisible, isFocusVisibleRef]);
  const [hostElementName, setHostElementName] = React9.useState("");
  const createHandleMouseLeave = (otherHandlers) => (event) => {
    var _otherHandlers$onMous;
    if (focusVisible) {
      event.preventDefault();
    }
    (_otherHandlers$onMous = otherHandlers.onMouseLeave) == null ? void 0 : _otherHandlers$onMous.call(otherHandlers, event);
  };
  const createHandleBlur = (otherHandlers) => (event) => {
    var _otherHandlers$onBlur;
    handleBlurVisible(event);
    if (isFocusVisibleRef.current === false) {
      setFocusVisible(false);
    }
    (_otherHandlers$onBlur = otherHandlers.onBlur) == null ? void 0 : _otherHandlers$onBlur.call(otherHandlers, event);
  };
  const createHandleFocus = (otherHandlers) => (event) => {
    var _otherHandlers$onFocu2;
    if (!buttonRef.current) {
      buttonRef.current = event.currentTarget;
    }
    handleFocusVisible(event);
    if (isFocusVisibleRef.current === true) {
      var _otherHandlers$onFocu;
      setFocusVisible(true);
      (_otherHandlers$onFocu = otherHandlers.onFocusVisible) == null ? void 0 : _otherHandlers$onFocu.call(otherHandlers, event);
    }
    (_otherHandlers$onFocu2 = otherHandlers.onFocus) == null ? void 0 : _otherHandlers$onFocu2.call(otherHandlers, event);
  };
  const isNativeButton = () => {
    const button = buttonRef.current;
    return hostElementName === "BUTTON" || hostElementName === "INPUT" && ["button", "submit", "reset"].includes(button == null ? void 0 : button.type) || hostElementName === "A" && (button == null ? void 0 : button.href);
  };
  const createHandleClick = (otherHandlers) => (event) => {
    if (!disabled) {
      var _otherHandlers$onClic;
      (_otherHandlers$onClic = otherHandlers.onClick) == null ? void 0 : _otherHandlers$onClic.call(otherHandlers, event);
    }
  };
  const createHandleMouseDown = (otherHandlers) => (event) => {
    var _otherHandlers$onMous2;
    if (!disabled) {
      setActive(true);
      document.addEventListener("mouseup", () => {
        setActive(false);
      }, {
        once: true
      });
    }
    (_otherHandlers$onMous2 = otherHandlers.onMouseDown) == null ? void 0 : _otherHandlers$onMous2.call(otherHandlers, event);
  };
  const createHandleKeyDown = (otherHandlers) => (event) => {
    var _otherHandlers$onKeyD;
    (_otherHandlers$onKeyD = otherHandlers.onKeyDown) == null ? void 0 : _otherHandlers$onKeyD.call(otherHandlers, event);
    if (event.defaultPrevented) {
      return;
    }
    if (event.target === event.currentTarget && !isNativeButton() && event.key === " ") {
      event.preventDefault();
    }
    if (event.target === event.currentTarget && event.key === " " && !disabled) {
      setActive(true);
    }
    if (event.target === event.currentTarget && !isNativeButton() && event.key === "Enter" && !disabled) {
      var _otherHandlers$onClic2;
      (_otherHandlers$onClic2 = otherHandlers.onClick) == null ? void 0 : _otherHandlers$onClic2.call(otherHandlers, event);
      event.preventDefault();
    }
  };
  const createHandleKeyUp = (otherHandlers) => (event) => {
    var _otherHandlers$onKeyU;
    if (event.target === event.currentTarget) {
      setActive(false);
    }
    (_otherHandlers$onKeyU = otherHandlers.onKeyUp) == null ? void 0 : _otherHandlers$onKeyU.call(otherHandlers, event);
    if (event.target === event.currentTarget && !isNativeButton() && !disabled && event.key === " " && !event.defaultPrevented) {
      var _otherHandlers$onClic3;
      (_otherHandlers$onClic3 = otherHandlers.onClick) == null ? void 0 : _otherHandlers$onClic3.call(otherHandlers, event);
    }
  };
  const updateHostElementName = React9.useCallback((instance) => {
    var _instance$tagName;
    setHostElementName((_instance$tagName = instance == null ? void 0 : instance.tagName) != null ? _instance$tagName : "");
  }, []);
  const handleRef = useForkRef(updateHostElementName, externalRef, focusVisibleRef, buttonRef);
  const buttonProps = {};
  if (hostElementName === "BUTTON") {
    buttonProps.type = type != null ? type : "button";
    if (focusableWhenDisabled) {
      buttonProps["aria-disabled"] = disabled;
    } else {
      buttonProps.disabled = disabled;
    }
  } else if (hostElementName !== "") {
    if (!href && !to) {
      buttonProps.role = "button";
      buttonProps.tabIndex = tabIndex != null ? tabIndex : 0;
    }
    if (disabled) {
      buttonProps["aria-disabled"] = disabled;
      buttonProps.tabIndex = focusableWhenDisabled ? tabIndex != null ? tabIndex : 0 : -1;
    }
  }
  const getRootProps = (otherHandlers = {}) => {
    const propsEventHandlers = extractEventHandlers(parameters);
    const externalEventHandlers = _extends({}, propsEventHandlers, otherHandlers);
    delete externalEventHandlers.onFocusVisible;
    return _extends({
      type
    }, externalEventHandlers, buttonProps, {
      onBlur: createHandleBlur(externalEventHandlers),
      onClick: createHandleClick(externalEventHandlers),
      onFocus: createHandleFocus(externalEventHandlers),
      onKeyDown: createHandleKeyDown(externalEventHandlers),
      onKeyUp: createHandleKeyUp(externalEventHandlers),
      onMouseDown: createHandleMouseDown(externalEventHandlers),
      onMouseLeave: createHandleMouseLeave(externalEventHandlers),
      ref: handleRef
    });
  };
  return {
    getRootProps,
    focusVisible,
    setFocusVisible,
    disabled,
    active
  };
}
var React9;
var init_useButton = __esm({
  "node_modules/@mui/base/ButtonUnstyled/useButton.js"() {
    init_extends();
    React9 = __toESM(require_react());
    init_esm();
    init_extractEventHandlers();
  }
});

// node_modules/@mui/base/ButtonUnstyled/buttonUnstyledClasses.js
function getButtonUnstyledUtilityClass(slot) {
  return generateUtilityClass("MuiButton", slot);
}
var buttonUnstyledClasses;
var init_buttonUnstyledClasses = __esm({
  "node_modules/@mui/base/ButtonUnstyled/buttonUnstyledClasses.js"() {
    init_generateUtilityClass();
    init_generateUtilityClasses();
    buttonUnstyledClasses = generateUtilityClasses("MuiButton", ["root", "active", "disabled", "focusVisible"]);
  }
});

// node_modules/@mui/base/ButtonUnstyled/ButtonUnstyled.js
var React10, import_prop_types8, import_jsx_runtime12, _excluded5, useUtilityClasses3, ButtonUnstyled;
var init_ButtonUnstyled = __esm({
  "node_modules/@mui/base/ButtonUnstyled/ButtonUnstyled.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React10 = __toESM(require_react());
    import_prop_types8 = __toESM(require_prop_types());
    init_composeClasses();
    init_buttonUnstyledClasses();
    init_useButton();
    init_utils();
    import_jsx_runtime12 = __toESM(require_jsx_runtime());
    _excluded5 = ["action", "children", "component", "disabled", "focusableWhenDisabled", "onBlur", "onClick", "onFocus", "onFocusVisible", "onKeyDown", "onKeyUp", "onMouseLeave", "slotProps", "slots"];
    useUtilityClasses3 = (ownerState) => {
      const {
        active,
        disabled,
        focusVisible
      } = ownerState;
      const slots = {
        root: ["root", disabled && "disabled", focusVisible && "focusVisible", active && "active"]
      };
      return composeClasses(slots, getButtonUnstyledUtilityClass, {});
    };
    ButtonUnstyled = React10.forwardRef(function ButtonUnstyled2(props, forwardedRef) {
      var _ref;
      const {
        action,
        children,
        component,
        focusableWhenDisabled = false,
        slotProps = {},
        slots = {}
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded5);
      const buttonRef = React10.useRef();
      const {
        active,
        focusVisible,
        setFocusVisible,
        getRootProps
      } = useButton(_extends({}, props, {
        focusableWhenDisabled
      }));
      React10.useImperativeHandle(action, () => ({
        focusVisible: () => {
          setFocusVisible(true);
          buttonRef.current.focus();
        }
      }), [setFocusVisible]);
      const ownerState = _extends({}, props, {
        active,
        focusableWhenDisabled,
        focusVisible
      });
      const classes = useUtilityClasses3(ownerState);
      const defaultElement = other.href || other.to ? "a" : "button";
      const Root = (_ref = component != null ? component : slots.root) != null ? _ref : defaultElement;
      const rootProps = useSlotProps({
        elementType: Root,
        getSlotProps: getRootProps,
        externalForwardedProps: other,
        externalSlotProps: slotProps.root,
        additionalProps: {
          ref: forwardedRef
        },
        ownerState,
        className: classes.root
      });
      return (0, import_jsx_runtime12.jsx)(Root, _extends({}, rootProps, {
        children
      }));
    });
    true ? ButtonUnstyled.propTypes = {
      action: import_prop_types8.default.oneOfType([import_prop_types8.default.func, import_prop_types8.default.shape({
        current: import_prop_types8.default.shape({
          focusVisible: import_prop_types8.default.func.isRequired
        })
      })]),
      children: import_prop_types8.default.node,
      component: import_prop_types8.default.elementType,
      disabled: import_prop_types8.default.bool,
      focusableWhenDisabled: import_prop_types8.default.bool,
      href: import_prop_types8.default.string,
      onBlur: import_prop_types8.default.func,
      onClick: import_prop_types8.default.func,
      onFocus: import_prop_types8.default.func,
      onFocusVisible: import_prop_types8.default.func,
      onKeyDown: import_prop_types8.default.func,
      onKeyUp: import_prop_types8.default.func,
      onMouseLeave: import_prop_types8.default.func,
      slotProps: import_prop_types8.default.shape({
        root: import_prop_types8.default.oneOfType([import_prop_types8.default.func, import_prop_types8.default.object])
      }),
      slots: import_prop_types8.default.shape({
        root: import_prop_types8.default.elementType
      }),
      to: import_prop_types8.default.string
    } : void 0;
  }
});

// node_modules/@mui/base/ButtonUnstyled/ButtonUnstyled.types.js
var init_ButtonUnstyled_types = __esm({
  "node_modules/@mui/base/ButtonUnstyled/ButtonUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/ButtonUnstyled/useButton.types.js
var init_useButton_types = __esm({
  "node_modules/@mui/base/ButtonUnstyled/useButton.types.js"() {
  }
});

// node_modules/@mui/base/ButtonUnstyled/index.js
var init_ButtonUnstyled2 = __esm({
  "node_modules/@mui/base/ButtonUnstyled/index.js"() {
    init_ButtonUnstyled();
    init_buttonUnstyledClasses();
    init_ButtonUnstyled_types();
    init_useButton();
    init_useButton_types();
  }
});

// node_modules/@mui/base/MenuUnstyled/MenuUnstyledContext.js
var React11, MenuUnstyledContext, MenuUnstyledContext_default;
var init_MenuUnstyledContext = __esm({
  "node_modules/@mui/base/MenuUnstyled/MenuUnstyledContext.js"() {
    React11 = __toESM(require_react());
    MenuUnstyledContext = React11.createContext(null);
    MenuUnstyledContext.displayName = "MenuUnstyledContext";
    MenuUnstyledContext_default = MenuUnstyledContext;
  }
});

// node_modules/@mui/base/ListboxUnstyled/useListbox.types.js
var ActionTypes;
var init_useListbox_types = __esm({
  "node_modules/@mui/base/ListboxUnstyled/useListbox.types.js"() {
    (function(ActionTypes2) {
      ActionTypes2["blur"] = "blur";
      ActionTypes2["focus"] = "focus";
      ActionTypes2["keyDown"] = "keyDown";
      ActionTypes2["optionClick"] = "optionClick";
      ActionTypes2["optionHover"] = "optionHover";
      ActionTypes2["optionsChange"] = "optionsChange";
      ActionTypes2["setValue"] = "setValue";
      ActionTypes2["setHighlight"] = "setHighlight";
      ActionTypes2["textNavigation"] = "textNagivation";
    })(ActionTypes || (ActionTypes = {}));
  }
});

// node_modules/@mui/base/ListboxUnstyled/defaultListboxReducer.js
function findValidOptionToHighlight(index, lookupDirection, options, focusDisabled, isOptionDisabled, wrapAround) {
  if (options.length === 0 || options.every((o, i) => isOptionDisabled(o, i))) {
    return -1;
  }
  let nextFocus = index;
  for (; ; ) {
    if (!wrapAround && lookupDirection === "next" && nextFocus === options.length || !wrapAround && lookupDirection === "previous" && nextFocus === -1) {
      return -1;
    }
    const nextFocusDisabled = focusDisabled ? false : isOptionDisabled(options[nextFocus], nextFocus);
    if (nextFocusDisabled) {
      nextFocus += lookupDirection === "next" ? 1 : -1;
      if (wrapAround) {
        nextFocus = (nextFocus + options.length) % options.length;
      }
    } else {
      return nextFocus;
    }
  }
}
function getNewHighlightedOption(options, previouslyHighlightedOption, diff, lookupDirection, highlightDisabled, isOptionDisabled, wrapAround, optionComparer) {
  var _options$nextIndex;
  const maxIndex = options.length - 1;
  const defaultHighlightedIndex = -1;
  let nextIndexCandidate;
  const previouslyHighlightedIndex = previouslyHighlightedOption == null ? -1 : options.findIndex((option) => optionComparer(option, previouslyHighlightedOption));
  if (diff === "reset") {
    var _options$defaultHighl;
    return defaultHighlightedIndex === -1 ? null : (_options$defaultHighl = options[defaultHighlightedIndex]) != null ? _options$defaultHighl : null;
  }
  if (diff === "start") {
    nextIndexCandidate = 0;
  } else if (diff === "end") {
    nextIndexCandidate = maxIndex;
  } else {
    const newIndex = previouslyHighlightedIndex + diff;
    if (newIndex < 0) {
      if (!wrapAround && previouslyHighlightedIndex !== -1 || Math.abs(diff) > 1) {
        nextIndexCandidate = 0;
      } else {
        nextIndexCandidate = maxIndex;
      }
    } else if (newIndex > maxIndex) {
      if (!wrapAround || Math.abs(diff) > 1) {
        nextIndexCandidate = maxIndex;
      } else {
        nextIndexCandidate = 0;
      }
    } else {
      nextIndexCandidate = newIndex;
    }
  }
  const nextIndex = findValidOptionToHighlight(nextIndexCandidate, lookupDirection, options, highlightDisabled, isOptionDisabled, wrapAround);
  return (_options$nextIndex = options[nextIndex]) != null ? _options$nextIndex : null;
}
function handleOptionSelection(option, state, props) {
  const {
    multiple,
    optionComparer = (o, v) => o === v,
    isOptionDisabled = () => false
  } = props;
  const {
    selectedValue
  } = state;
  const optionIndex = props.options.findIndex((o) => props.optionComparer(option, o));
  if (isOptionDisabled(option, optionIndex)) {
    return state;
  }
  if (multiple) {
    var _ref, _ref2;
    const selectedValues = (_ref = selectedValue) != null ? _ref : [];
    const newSelectedValues = selectedValues.some((sv) => optionComparer(sv, option)) ? selectedValue.filter((v) => !optionComparer(v, option)) : [...(_ref2 = selectedValue) != null ? _ref2 : [], option];
    return {
      selectedValue: newSelectedValues,
      highlightedValue: option
    };
  }
  if (selectedValue != null && optionComparer(option, selectedValue)) {
    return state;
  }
  return {
    selectedValue: option,
    highlightedValue: option
  };
}
function handleKeyDown(event, state, props) {
  const {
    options,
    isOptionDisabled,
    disableListWrap,
    disabledItemsFocusable,
    optionComparer
  } = props;
  const moveHighlight = (diff, direction, wrapAround) => {
    return getNewHighlightedOption(options, state.highlightedValue, diff, direction, disabledItemsFocusable != null ? disabledItemsFocusable : false, isOptionDisabled != null ? isOptionDisabled : () => false, wrapAround, optionComparer);
  };
  switch (event.key) {
    case "Home":
      return _extends({}, state, {
        highlightedValue: moveHighlight("start", "next", false)
      });
    case "End":
      return _extends({}, state, {
        highlightedValue: moveHighlight("end", "previous", false)
      });
    case "PageUp":
      return _extends({}, state, {
        highlightedValue: moveHighlight(-pageSize2, "previous", false)
      });
    case "PageDown":
      return _extends({}, state, {
        highlightedValue: moveHighlight(pageSize2, "next", false)
      });
    case "ArrowUp":
      return _extends({}, state, {
        highlightedValue: moveHighlight(-1, "previous", !(disableListWrap != null ? disableListWrap : false))
      });
    case "ArrowDown":
      return _extends({}, state, {
        highlightedValue: moveHighlight(1, "next", !(disableListWrap != null ? disableListWrap : false))
      });
    case "Enter":
    case " ":
      if (state.highlightedValue === null) {
        return state;
      }
      return handleOptionSelection(state.highlightedValue, state, props);
    default:
      break;
  }
  return state;
}
function handleBlur(state) {
  return _extends({}, state, {
    highlightedValue: null
  });
}
function handleTextNavigation(state, searchString, props) {
  const {
    options,
    isOptionDisabled,
    disableListWrap,
    disabledItemsFocusable,
    optionComparer,
    optionStringifier
  } = props;
  const moveHighlight = (previouslyHighlightedOption) => {
    return getNewHighlightedOption(options, previouslyHighlightedOption, 1, "next", disabledItemsFocusable != null ? disabledItemsFocusable : false, isOptionDisabled != null ? isOptionDisabled : () => false, !(disableListWrap != null ? disableListWrap : false), optionComparer);
  };
  const startWithCurrentOption = searchString.length > 1;
  let nextOption = startWithCurrentOption ? state.highlightedValue : moveHighlight(state.highlightedValue);
  for (let index = 0; index < options.length; index += 1) {
    if (!nextOption || !startWithCurrentOption && state.highlightedValue === nextOption) {
      return state;
    }
    if (textCriteriaMatches(nextOption, searchString, optionStringifier) && (!isOptionDisabled(nextOption, options.indexOf(nextOption)) || disabledItemsFocusable)) {
      return _extends({}, state, {
        highlightedValue: nextOption
      });
    }
    nextOption = moveHighlight(nextOption);
  }
  return state;
}
function handleOptionsChange(options, previousOptions, state, props) {
  var _options$find, _options$find2;
  const {
    multiple,
    optionComparer
  } = props;
  const newHighlightedOption = state.highlightedValue == null ? null : (_options$find = options.find((option) => optionComparer(option, state.highlightedValue))) != null ? _options$find : null;
  if (multiple) {
    var _ref3;
    const selectedValues = (_ref3 = state.selectedValue) != null ? _ref3 : [];
    const newSelectedValues = selectedValues.filter((selectedValue) => options.some((option) => optionComparer(option, selectedValue)));
    return {
      highlightedValue: newHighlightedOption,
      selectedValue: newSelectedValues
    };
  }
  const newSelectedValue = (_options$find2 = options.find((option) => optionComparer(option, state.selectedValue))) != null ? _options$find2 : null;
  return {
    highlightedValue: newHighlightedOption,
    selectedValue: newSelectedValue
  };
}
function defaultListboxReducer(state, action) {
  const {
    type
  } = action;
  switch (type) {
    case ActionTypes.keyDown:
      return handleKeyDown(action.event, state, action.props);
    case ActionTypes.optionClick:
      return handleOptionSelection(action.option, state, action.props);
    case ActionTypes.blur:
      return handleBlur(state);
    case ActionTypes.setValue:
      return _extends({}, state, {
        selectedValue: action.value
      });
    case ActionTypes.setHighlight:
      return _extends({}, state, {
        highlightedValue: action.highlight
      });
    case ActionTypes.textNavigation:
      return handleTextNavigation(state, action.searchString, action.props);
    case ActionTypes.optionsChange:
      return handleOptionsChange(action.options, action.previousOptions, state, action.props);
    default:
      return state;
  }
}
var pageSize2, textCriteriaMatches;
var init_defaultListboxReducer = __esm({
  "node_modules/@mui/base/ListboxUnstyled/defaultListboxReducer.js"() {
    init_extends();
    init_useListbox_types();
    pageSize2 = 5;
    textCriteriaMatches = (nextFocus, searchString, stringifyOption) => {
      var _stringifyOption;
      const text = (_stringifyOption = stringifyOption(nextFocus)) == null ? void 0 : _stringifyOption.trim().toLowerCase();
      if (!text || text.length === 0) {
        return false;
      }
      return text.indexOf(searchString) === 0;
    };
  }
});

// node_modules/@mui/base/ListboxUnstyled/useControllableReducer.js
function getControlledState(internalState, props) {
  if (props.value !== void 0) {
    return _extends({}, internalState, {
      selectedValue: props.value
    });
  }
  return internalState;
}
function areOptionsEqual(option1, option2, optionComparer) {
  if (option1 === option2) {
    return true;
  }
  if (option1 === null || option2 === null) {
    return false;
  }
  return optionComparer(option1, option2);
}
function useStateChangeDetection(nextState, internalPreviousState, propsRef, lastActionRef) {
  React12.useEffect(() => {
    if (!propsRef.current || lastActionRef.current === null) {
      return;
    }
    const previousState = getControlledState(internalPreviousState, propsRef.current);
    const {
      multiple,
      optionComparer
    } = propsRef.current;
    if (multiple) {
      var _previousState$select;
      const previousSelectedValues = (_previousState$select = previousState == null ? void 0 : previousState.selectedValue) != null ? _previousState$select : [];
      const nextSelectedValues = nextState.selectedValue;
      const onChange = propsRef.current.onChange;
      if (!areArraysEqual(nextSelectedValues, previousSelectedValues, optionComparer)) {
        onChange == null ? void 0 : onChange(lastActionRef.current.event, nextSelectedValues);
      }
    } else {
      const previousSelectedValue = previousState == null ? void 0 : previousState.selectedValue;
      const nextSelectedValue = nextState.selectedValue;
      const onChange = propsRef.current.onChange;
      if (!areOptionsEqual(nextSelectedValue, previousSelectedValue, optionComparer)) {
        onChange == null ? void 0 : onChange(lastActionRef.current.event, nextSelectedValue);
      }
    }
    if (!areOptionsEqual(internalPreviousState.highlightedValue, nextState.highlightedValue, propsRef.current.optionComparer)) {
      var _propsRef$current, _propsRef$current$onH;
      (_propsRef$current = propsRef.current) == null ? void 0 : (_propsRef$current$onH = _propsRef$current.onHighlightChange) == null ? void 0 : _propsRef$current$onH.call(_propsRef$current, lastActionRef.current.event, nextState.highlightedValue);
    }
    lastActionRef.current = null;
  }, [nextState.selectedValue, nextState.highlightedValue, internalPreviousState, propsRef, lastActionRef]);
}
function useControllableReducer(internalReducer, externalReducer, props) {
  var _ref;
  const {
    value,
    defaultValue
  } = props;
  const propsRef = React12.useRef(props);
  propsRef.current = props;
  const actionRef = React12.useRef(null);
  const initialSelectedValue = (_ref = value === void 0 ? defaultValue : value) != null ? _ref : props.multiple ? [] : null;
  const initalState = {
    highlightedValue: null,
    selectedValue: initialSelectedValue
  };
  const combinedReducer = React12.useCallback((state, action) => {
    actionRef.current = action;
    if (externalReducer) {
      return externalReducer(getControlledState(state, propsRef.current), action);
    }
    return internalReducer(getControlledState(state, propsRef.current), action);
  }, [externalReducer, internalReducer, propsRef]);
  const [nextState, dispatch] = React12.useReducer(combinedReducer, initalState);
  const previousState = React12.useRef(initalState);
  React12.useEffect(() => {
    previousState.current = nextState;
  }, [previousState, nextState]);
  useStateChangeDetection(nextState, previousState.current, propsRef, actionRef);
  return [getControlledState(nextState, propsRef.current), dispatch];
}
var React12;
var init_useControllableReducer = __esm({
  "node_modules/@mui/base/ListboxUnstyled/useControllableReducer.js"() {
    init_extends();
    React12 = __toESM(require_react());
    init_areArraysEqual();
  }
});

// node_modules/@mui/base/ListboxUnstyled/useListbox.js
function useListbox(props) {
  var _props$optionIdGenera, _options$highlightedI;
  const {
    disabledItemsFocusable = false,
    disableListWrap = false,
    focusManagement = "activeDescendant",
    id: idProp,
    isOptionDisabled = defaultIsOptionDisabled,
    listboxRef: externalListboxRef,
    multiple = false,
    optionComparer = defaultOptionComparer,
    optionStringifier = defaultOptionStringifier,
    options,
    stateReducer: externalReducer
  } = props;
  const id = useId(idProp);
  function defaultIdGenerator(_, index) {
    return `${id}-option-${index}`;
  }
  const optionIdGenerator = (_props$optionIdGenera = props.optionIdGenerator) != null ? _props$optionIdGenera : defaultIdGenerator;
  const propsWithDefaults = _extends({}, props, {
    disabledItemsFocusable,
    disableListWrap,
    focusManagement,
    isOptionDisabled,
    multiple,
    optionComparer,
    optionStringifier
  });
  const listboxRef = React13.useRef(null);
  const handleRef = useForkRef(externalListboxRef, listboxRef);
  const textCriteriaRef = React13.useRef({
    searchString: "",
    lastTime: null
  });
  const [{
    highlightedValue,
    selectedValue
  }, dispatch] = useControllableReducer(defaultListboxReducer, externalReducer, propsWithDefaults);
  const highlightedIndex = React13.useMemo(() => {
    return highlightedValue == null ? -1 : options.findIndex((option) => optionComparer(option, highlightedValue));
  }, [highlightedValue, options, optionComparer]);
  const previousOptions = React13.useRef([]);
  React13.useEffect(() => {
    if (areArraysEqual(previousOptions.current, options, optionComparer)) {
      return;
    }
    dispatch({
      type: ActionTypes.optionsChange,
      event: null,
      options,
      previousOptions: previousOptions.current,
      props: propsWithDefaults
    });
    previousOptions.current = options;
  }, [options, optionComparer, dispatch]);
  const setSelectedValue = React13.useCallback((option) => {
    dispatch({
      type: ActionTypes.setValue,
      event: null,
      value: option
    });
  }, [dispatch]);
  const setHighlightedValue = React13.useCallback((option) => {
    dispatch({
      type: ActionTypes.setHighlight,
      event: null,
      highlight: option
    });
  }, [dispatch]);
  const createHandleOptionClick = (option, other) => (event) => {
    var _other$onClick;
    (_other$onClick = other.onClick) == null ? void 0 : _other$onClick.call(other, event);
    if (event.defaultPrevented) {
      return;
    }
    event.preventDefault();
    dispatch({
      type: ActionTypes.optionClick,
      option,
      event,
      props: propsWithDefaults
    });
  };
  const createHandleOptionPointerOver = (option, other) => (event) => {
    var _other$onMouseOver;
    (_other$onMouseOver = other.onMouseOver) == null ? void 0 : _other$onMouseOver.call(other, event);
    if (event.defaultPrevented) {
      return;
    }
    dispatch({
      type: ActionTypes.optionHover,
      option,
      event,
      props: propsWithDefaults
    });
  };
  const createHandleKeyDown = (other) => (event) => {
    var _other$onKeyDown;
    (_other$onKeyDown = other.onKeyDown) == null ? void 0 : _other$onKeyDown.call(other, event);
    if (event.defaultPrevented) {
      return;
    }
    const keysToPreventDefault = ["ArrowUp", "ArrowDown", "Home", "End", "PageUp", "PageDown"];
    if (focusManagement === "activeDescendant") {
      keysToPreventDefault.push(" ", "Enter");
    }
    if (keysToPreventDefault.includes(event.key)) {
      event.preventDefault();
    }
    dispatch({
      type: ActionTypes.keyDown,
      event,
      props: propsWithDefaults
    });
    if (event.key.length === 1 && event.key !== " ") {
      const textCriteria = textCriteriaRef.current;
      const lowerKey = event.key.toLowerCase();
      const currentTime = performance.now();
      if (textCriteria.searchString.length > 0 && textCriteria.lastTime && currentTime - textCriteria.lastTime > TEXT_NAVIGATION_RESET_TIMEOUT) {
        textCriteria.searchString = lowerKey;
      } else if (textCriteria.searchString.length !== 1 || lowerKey !== textCriteria.searchString) {
        textCriteria.searchString += lowerKey;
      }
      textCriteria.lastTime = currentTime;
      dispatch({
        type: ActionTypes.textNavigation,
        event,
        searchString: textCriteria.searchString,
        props: propsWithDefaults
      });
    }
  };
  const createHandleBlur = (other) => (event) => {
    var _other$onBlur, _listboxRef$current;
    (_other$onBlur = other.onBlur) == null ? void 0 : _other$onBlur.call(other, event);
    if (event.defaultPrevented) {
      return;
    }
    if ((_listboxRef$current = listboxRef.current) != null && _listboxRef$current.contains(document.activeElement)) {
      return;
    }
    dispatch({
      type: ActionTypes.blur,
      event,
      props: propsWithDefaults
    });
  };
  const getRootProps = (otherHandlers = {}) => {
    return _extends({}, otherHandlers, {
      "aria-activedescendant": focusManagement === "activeDescendant" && highlightedValue != null ? optionIdGenerator(highlightedValue, highlightedIndex) : void 0,
      id,
      onBlur: createHandleBlur(otherHandlers),
      onKeyDown: createHandleKeyDown(otherHandlers),
      role: "listbox",
      tabIndex: focusManagement === "DOM" ? -1 : 0,
      ref: handleRef
    });
  };
  const getOptionState = (option) => {
    let selected;
    const index = options.findIndex((opt) => optionComparer(opt, option));
    if (multiple) {
      var _ref;
      selected = ((_ref = selectedValue) != null ? _ref : []).some((value) => value != null && optionComparer(option, value));
    } else {
      selected = optionComparer(option, selectedValue);
    }
    const disabled = isOptionDisabled(option, index);
    return {
      selected,
      disabled,
      highlighted: highlightedIndex === index
    };
  };
  const getOptionTabIndex = (optionState) => {
    if (focusManagement === "activeDescendant") {
      return void 0;
    }
    if (!optionState.highlighted) {
      return -1;
    }
    if (optionState.disabled && !disabledItemsFocusable) {
      return -1;
    }
    return 0;
  };
  const getOptionProps = (option, otherHandlers = {}) => {
    const optionState = getOptionState(option);
    const index = options.findIndex((opt) => optionComparer(opt, option));
    return _extends({}, otherHandlers, {
      "aria-disabled": optionState.disabled || void 0,
      "aria-selected": optionState.selected,
      id: optionIdGenerator(option, index),
      onClick: createHandleOptionClick(option, otherHandlers),
      onPointerOver: createHandleOptionPointerOver(option, otherHandlers),
      role: "option",
      tabIndex: getOptionTabIndex(optionState)
    });
  };
  React13.useDebugValue({
    highlightedOption: options[highlightedIndex],
    selectedOption: selectedValue
  });
  return {
    getRootProps,
    getOptionProps,
    getOptionState,
    highlightedOption: (_options$highlightedI = options[highlightedIndex]) != null ? _options$highlightedI : null,
    selectedOption: selectedValue,
    setSelectedValue,
    setHighlightedValue
  };
}
var React13, TEXT_NAVIGATION_RESET_TIMEOUT, defaultOptionComparer, defaultIsOptionDisabled, defaultOptionStringifier;
var init_useListbox = __esm({
  "node_modules/@mui/base/ListboxUnstyled/useListbox.js"() {
    init_extends();
    React13 = __toESM(require_react());
    init_esm();
    init_useListbox_types();
    init_defaultListboxReducer();
    init_useControllableReducer();
    init_areArraysEqual();
    TEXT_NAVIGATION_RESET_TIMEOUT = 500;
    defaultOptionComparer = (optionA, optionB) => optionA === optionB;
    defaultIsOptionDisabled = () => false;
    defaultOptionStringifier = (option) => typeof option === "string" ? option : String(option);
  }
});

// node_modules/@mui/base/ListboxUnstyled/index.js
var init_ListboxUnstyled = __esm({
  "node_modules/@mui/base/ListboxUnstyled/index.js"() {
    init_useListbox();
    init_defaultListboxReducer();
    init_useListbox_types();
  }
});

// node_modules/@mui/base/MenuUnstyled/useMenu.js
function stateReducer(state, action) {
  if (action.type === ActionTypes.blur || action.type === ActionTypes.optionHover || action.type === ActionTypes.setValue) {
    return state;
  }
  const newState = defaultListboxReducer(state, action);
  if (action.type !== ActionTypes.setHighlight && newState.highlightedValue === null && action.props.options.length > 0) {
    return _extends({}, newState, {
      highlightedValue: action.props.options[0]
    });
  }
  return newState;
}
function useMenu(parameters = {}) {
  const {
    listboxRef: listboxRefProp,
    open = false,
    onClose,
    listboxId
  } = parameters;
  const [menuItems, setMenuItems] = React14.useState({});
  const listboxRef = React14.useRef(null);
  const handleRef = useForkRef(listboxRef, listboxRefProp);
  const registerItem = React14.useCallback((id, metadata) => {
    setMenuItems((previousState) => {
      const newState = _extends({}, previousState);
      newState[id] = metadata;
      return newState;
    });
  }, []);
  const unregisterItem = React14.useCallback((id) => {
    setMenuItems((previousState) => {
      const newState = _extends({}, previousState);
      delete newState[id];
      return newState;
    });
  }, []);
  const {
    getOptionState,
    getOptionProps,
    getRootProps,
    highlightedOption,
    setHighlightedValue: setListboxHighlight
  } = useListbox({
    options: Object.keys(menuItems),
    optionStringifier: (id) => {
      var _menuItems$id$ref$cur;
      return menuItems[id].label || ((_menuItems$id$ref$cur = menuItems[id].ref.current) == null ? void 0 : _menuItems$id$ref$cur.innerText);
    },
    isOptionDisabled: (id) => {
      var _menuItems$id;
      return (menuItems == null ? void 0 : (_menuItems$id = menuItems[id]) == null ? void 0 : _menuItems$id.disabled) || false;
    },
    listboxRef: handleRef,
    focusManagement: "DOM",
    id: listboxId,
    stateReducer,
    disabledItemsFocusable: true
  });
  const highlightFirstItem = React14.useCallback(() => {
    if (Object.keys(menuItems).length > 0) {
      setListboxHighlight(menuItems[Object.keys(menuItems)[0]].id);
    }
  }, [menuItems, setListboxHighlight]);
  const highlightLastItem = React14.useCallback(() => {
    if (Object.keys(menuItems).length > 0) {
      setListboxHighlight(menuItems[Object.keys(menuItems)[Object.keys(menuItems).length - 1]].id);
    }
  }, [menuItems, setListboxHighlight]);
  React14.useEffect(() => {
    if (!open) {
      highlightFirstItem();
    }
  }, [open, highlightFirstItem]);
  const createHandleKeyDown = (otherHandlers) => (e) => {
    var _otherHandlers$onKeyD;
    (_otherHandlers$onKeyD = otherHandlers.onKeyDown) == null ? void 0 : _otherHandlers$onKeyD.call(otherHandlers, e);
    if (e.defaultPrevented) {
      return;
    }
    if (e.key === "Escape" && open) {
      onClose == null ? void 0 : onClose();
    }
  };
  const createHandleBlur = (otherHandlers) => (e) => {
    var _otherHandlers$onBlur, _listboxRef$current;
    (_otherHandlers$onBlur = otherHandlers.onBlur) == null ? void 0 : _otherHandlers$onBlur.call(otherHandlers, e);
    if (!((_listboxRef$current = listboxRef.current) != null && _listboxRef$current.contains(e.relatedTarget))) {
      onClose == null ? void 0 : onClose();
    }
  };
  React14.useEffect(() => {
    var _listboxRef$current2;
    if ((_listboxRef$current2 = listboxRef.current) != null && _listboxRef$current2.contains(document.activeElement) && highlightedOption !== null) {
      var _menuItems$highlighte, _menuItems$highlighte2;
      menuItems == null ? void 0 : (_menuItems$highlighte = menuItems[highlightedOption]) == null ? void 0 : (_menuItems$highlighte2 = _menuItems$highlighte.ref.current) == null ? void 0 : _menuItems$highlighte2.focus();
    }
  }, [highlightedOption, menuItems]);
  const getListboxProps = (otherHandlers = {}) => {
    const rootProps = getRootProps(_extends({}, otherHandlers, {
      onBlur: createHandleBlur(otherHandlers),
      onKeyDown: createHandleKeyDown(otherHandlers)
    }));
    return _extends({}, otherHandlers, rootProps, {
      role: "menu"
    });
  };
  const getItemState = (id) => {
    const {
      disabled,
      highlighted
    } = getOptionState(id);
    return {
      disabled,
      highlighted
    };
  };
  React14.useDebugValue({
    menuItems,
    highlightedOption
  });
  return {
    registerItem,
    unregisterItem,
    menuItems,
    getListboxProps,
    getItemState,
    getItemProps: getOptionProps,
    highlightedOption,
    highlightFirstItem,
    highlightLastItem
  };
}
var React14;
var init_useMenu = __esm({
  "node_modules/@mui/base/MenuUnstyled/useMenu.js"() {
    init_extends();
    React14 = __toESM(require_react());
    init_esm();
    init_ListboxUnstyled();
  }
});

// node_modules/@popperjs/core/lib/enums.js
var top, bottom, right, left, auto, basePlacements, start, end, clippingParents, viewport, popper, reference, variationPlacements, placements, beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite, modifierPhases;
var init_enums = __esm({
  "node_modules/@popperjs/core/lib/enums.js"() {
    top = "top";
    bottom = "bottom";
    right = "right";
    left = "left";
    auto = "auto";
    basePlacements = [top, bottom, right, left];
    start = "start";
    end = "end";
    clippingParents = "clippingParents";
    viewport = "viewport";
    popper = "popper";
    reference = "reference";
    variationPlacements = basePlacements.reduce(function(acc, placement) {
      return acc.concat([placement + "-" + start, placement + "-" + end]);
    }, []);
    placements = [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
      return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
    }, []);
    beforeRead = "beforeRead";
    read = "read";
    afterRead = "afterRead";
    beforeMain = "beforeMain";
    main = "main";
    afterMain = "afterMain";
    beforeWrite = "beforeWrite";
    write = "write";
    afterWrite = "afterWrite";
    modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
function getNodeName(element) {
  return element ? (element.nodeName || "").toLowerCase() : null;
}
var init_getNodeName = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getNodeName.js"() {
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getWindow.js
function getWindow(node) {
  if (node == null) {
    return window;
  }
  if (node.toString() !== "[object Window]") {
    var ownerDocument2 = node.ownerDocument;
    return ownerDocument2 ? ownerDocument2.defaultView || window : window;
  }
  return node;
}
var init_getWindow = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getWindow.js"() {
  }
});

// node_modules/@popperjs/core/lib/dom-utils/instanceOf.js
function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}
var init_instanceOf = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/instanceOf.js"() {
    init_getWindow();
  }
});

// node_modules/@popperjs/core/lib/modifiers/applyStyles.js
function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function(name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name];
    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    }
    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function(name2) {
      var value = attributes[name2];
      if (value === false) {
        element.removeAttribute(name2);
      } else {
        element.setAttribute(name2, value === true ? "" : value);
      }
    });
  });
}
function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;
  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }
  return function() {
    Object.keys(state.elements).forEach(function(name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
      var style = styleProperties.reduce(function(style2, property) {
        style2[property] = "";
        return style2;
      }, {});
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function(attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
}
var applyStyles_default;
var init_applyStyles = __esm({
  "node_modules/@popperjs/core/lib/modifiers/applyStyles.js"() {
    init_getNodeName();
    init_instanceOf();
    applyStyles_default = {
      name: "applyStyles",
      enabled: true,
      phase: "write",
      fn: applyStyles,
      effect,
      requires: ["computeStyles"]
    };
  }
});

// node_modules/@popperjs/core/lib/utils/getBasePlacement.js
function getBasePlacement(placement) {
  return placement.split("-")[0];
}
var init_getBasePlacement = __esm({
  "node_modules/@popperjs/core/lib/utils/getBasePlacement.js"() {
    init_enums();
  }
});

// node_modules/@popperjs/core/lib/utils/math.js
var max, min, round;
var init_math = __esm({
  "node_modules/@popperjs/core/lib/utils/math.js"() {
    max = Math.max;
    min = Math.min;
    round = Math.round;
  }
});

// node_modules/@popperjs/core/lib/utils/userAgent.js
function getUAString() {
  var uaData = navigator.userAgentData;
  if (uaData != null && uaData.brands) {
    return uaData.brands.map(function(item) {
      return item.brand + "/" + item.version;
    }).join(" ");
  }
  return navigator.userAgent;
}
var init_userAgent = __esm({
  "node_modules/@popperjs/core/lib/utils/userAgent.js"() {
  }
});

// node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js
function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test(getUAString());
}
var init_isLayoutViewport = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js"() {
    init_userAgent();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;
  if (includeScale && isHTMLElement(element)) {
    scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
  }
  var _ref = isElement(element) ? getWindow(element) : window, visualViewport = _ref.visualViewport;
  var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
  var width = clientRect.width / scaleX;
  var height = clientRect.height / scaleY;
  return {
    width,
    height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x,
    y
  };
}
var init_getBoundingClientRect = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js"() {
    init_instanceOf();
    init_math();
    init_getWindow();
    init_isLayoutViewport();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element);
  var width = element.offsetWidth;
  var height = element.offsetHeight;
  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }
  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width,
    height
  };
}
var init_getLayoutRect = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js"() {
    init_getBoundingClientRect();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/contains.js
function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode();
  if (parent.contains(child)) {
    return true;
  } else if (rootNode && isShadowRoot(rootNode)) {
    var next = child;
    do {
      if (next && parent.isSameNode(next)) {
        return true;
      }
      next = next.parentNode || next.host;
    } while (next);
  }
  return false;
}
var init_contains = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/contains.js"() {
    init_instanceOf();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js
function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}
var init_getComputedStyle = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js"() {
    init_getWindow();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/isTableElement.js
function isTableElement(element) {
  return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
}
var init_isTableElement = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/isTableElement.js"() {
    init_getNodeName();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js
function getDocumentElement(element) {
  return ((isElement(element) ? element.ownerDocument : element.document) || window.document).documentElement;
}
var init_getDocumentElement = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js"() {
    init_instanceOf();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
function getParentNode(element) {
  if (getNodeName(element) === "html") {
    return element;
  }
  return element.assignedSlot || element.parentNode || (isShadowRoot(element) ? element.host : null) || getDocumentElement(element);
}
var init_getParentNode = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getParentNode.js"() {
    init_getNodeName();
    init_getDocumentElement();
    init_instanceOf();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || getComputedStyle(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  var isFirefox = /firefox/i.test(getUAString());
  var isIE = /Trident/i.test(getUAString());
  if (isIE && isHTMLElement(element)) {
    var elementCss = getComputedStyle(element);
    if (elementCss.position === "fixed") {
      return null;
    }
  }
  var currentNode = getParentNode(element);
  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }
  while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle(currentNode);
    if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element) {
  var window2 = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle(offsetParent).position === "static")) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}
var init_getOffsetParent = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js"() {
    init_getWindow();
    init_getNodeName();
    init_getComputedStyle();
    init_instanceOf();
    init_isTableElement();
    init_getParentNode();
    init_userAgent();
  }
});

// node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}
var init_getMainAxisFromPlacement = __esm({
  "node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js"() {
  }
});

// node_modules/@popperjs/core/lib/utils/within.js
function within(min2, value, max2) {
  return max(min2, min(value, max2));
}
function withinMaxClamp(min2, value, max2) {
  var v = within(min2, value, max2);
  return v > max2 ? max2 : v;
}
var init_within = __esm({
  "node_modules/@popperjs/core/lib/utils/within.js"() {
    init_math();
  }
});

// node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
var init_getFreshSideObject = __esm({
  "node_modules/@popperjs/core/lib/utils/getFreshSideObject.js"() {
  }
});

// node_modules/@popperjs/core/lib/utils/mergePaddingObject.js
function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}
var init_mergePaddingObject = __esm({
  "node_modules/@popperjs/core/lib/utils/mergePaddingObject.js"() {
    init_getFreshSideObject();
  }
});

// node_modules/@popperjs/core/lib/utils/expandToHashMap.js
function expandToHashMap(value, keys) {
  return keys.reduce(function(hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}
var init_expandToHashMap = __esm({
  "node_modules/@popperjs/core/lib/utils/expandToHashMap.js"() {
  }
});

// node_modules/@popperjs/core/lib/modifiers/arrow.js
function arrow(_ref) {
  var _state$modifiersData$;
  var state = _ref.state, name = _ref.name, options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? "height" : "width";
  if (!arrowElement || !popperOffsets2) {
    return;
  }
  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === "y" ? top : left;
  var maxProp = axis === "y" ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
  var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2;
  var min2 = paddingObject[minProp];
  var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset2 = within(min2, center, max2);
  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
}
function effect2(_ref2) {
  var state = _ref2.state, options = _ref2.options;
  var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
  if (arrowElement == null) {
    return;
  }
  if (typeof arrowElement === "string") {
    arrowElement = state.elements.popper.querySelector(arrowElement);
    if (!arrowElement) {
      return;
    }
  }
  if (true) {
    if (!isHTMLElement(arrowElement)) {
      console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', "To use an SVG arrow, wrap it in an HTMLElement that will be used as", "the arrow."].join(" "));
    }
  }
  if (!contains(state.elements.popper, arrowElement)) {
    if (true) {
      console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', "element."].join(" "));
    }
    return;
  }
  state.elements.arrow = arrowElement;
}
var toPaddingObject, arrow_default;
var init_arrow = __esm({
  "node_modules/@popperjs/core/lib/modifiers/arrow.js"() {
    init_getBasePlacement();
    init_getLayoutRect();
    init_contains();
    init_getOffsetParent();
    init_getMainAxisFromPlacement();
    init_within();
    init_mergePaddingObject();
    init_expandToHashMap();
    init_enums();
    init_instanceOf();
    toPaddingObject = function toPaddingObject2(padding, state) {
      padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
        placement: state.placement
      })) : padding;
      return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
    };
    arrow_default = {
      name: "arrow",
      enabled: true,
      phase: "main",
      fn: arrow,
      effect: effect2,
      requires: ["popperOffsets"],
      requiresIfExists: ["preventOverflow"]
    };
  }
});

// node_modules/@popperjs/core/lib/utils/getVariation.js
function getVariation(placement) {
  return placement.split("-")[1];
}
var init_getVariation = __esm({
  "node_modules/@popperjs/core/lib/utils/getVariation.js"() {
  }
});

// node_modules/@popperjs/core/lib/modifiers/computeStyles.js
function roundOffsetsByDPR(_ref) {
  var x = _ref.x, y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x * dpr) / dpr || 0,
    y: round(y * dpr) / dpr || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === void 0 ? 0 : _offsets$y;
  var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
    x,
    y
  }) : {
    x,
    y
  };
  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty("x");
  var hasY = offsets.hasOwnProperty("y");
  var sideX = left;
  var sideY = top;
  var win = window;
  if (adaptive) {
    var offsetParent = getOffsetParent(popper2);
    var heightProp = "clientHeight";
    var widthProp = "clientWidth";
    if (offsetParent === getWindow(popper2)) {
      offsetParent = getDocumentElement(popper2);
      if (getComputedStyle(offsetParent).position !== "static" && position === "absolute") {
        heightProp = "scrollHeight";
        widthProp = "scrollWidth";
      }
    }
    offsetParent = offsetParent;
    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : offsetParent[heightProp];
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }
    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : offsetParent[widthProp];
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position
  }, adaptive && unsetSides);
  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x,
    y
  }) : {
    x,
    y
  };
  x = _ref4.x;
  y = _ref4.y;
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref5) {
  var state = _ref5.state, options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  if (true) {
    var transitionProperty = getComputedStyle(state.elements.popper).transitionProperty || "";
    if (adaptive && ["transform", "top", "right", "bottom", "left"].some(function(property) {
      return transitionProperty.indexOf(property) >= 0;
    })) {
      console.warn(["Popper: Detected CSS transitions on at least one of the following", 'CSS properties: "transform", "top", "right", "bottom", "left".', "\n\n", 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', "for smooth transitions, or remove these properties from the CSS", "transition declaration on the popper element if only transitioning", "opacity or background-color for example.", "\n\n", "We recommend using the popper element as a wrapper around an inner", "element that can have any CSS property transitioned for animations."].join(" "));
    }
  }
  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration,
    isFixed: state.options.strategy === "fixed"
  };
  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive,
      roundOffsets
    })));
  }
  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: "absolute",
      adaptive: false,
      roundOffsets
    })));
  }
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-placement": state.placement
  });
}
var unsetSides, computeStyles_default;
var init_computeStyles = __esm({
  "node_modules/@popperjs/core/lib/modifiers/computeStyles.js"() {
    init_enums();
    init_getOffsetParent();
    init_getWindow();
    init_getDocumentElement();
    init_getComputedStyle();
    init_getBasePlacement();
    init_getVariation();
    init_math();
    unsetSides = {
      top: "auto",
      right: "auto",
      bottom: "auto",
      left: "auto"
    };
    computeStyles_default = {
      name: "computeStyles",
      enabled: true,
      phase: "beforeWrite",
      fn: computeStyles,
      data: {}
    };
  }
});

// node_modules/@popperjs/core/lib/modifiers/eventListeners.js
function effect3(_ref) {
  var state = _ref.state, instance = _ref.instance, options = _ref.options;
  var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
  var window2 = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
  if (scroll) {
    scrollParents.forEach(function(scrollParent) {
      scrollParent.addEventListener("scroll", instance.update, passive);
    });
  }
  if (resize) {
    window2.addEventListener("resize", instance.update, passive);
  }
  return function() {
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.removeEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.removeEventListener("resize", instance.update, passive);
    }
  };
}
var passive, eventListeners_default;
var init_eventListeners = __esm({
  "node_modules/@popperjs/core/lib/modifiers/eventListeners.js"() {
    init_getWindow();
    passive = {
      passive: true
    };
    eventListeners_default = {
      name: "eventListeners",
      enabled: true,
      phase: "write",
      fn: function fn() {
      },
      effect: effect3,
      data: {}
    };
  }
});

// node_modules/@popperjs/core/lib/utils/getOppositePlacement.js
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function(matched) {
    return hash[matched];
  });
}
var hash;
var init_getOppositePlacement = __esm({
  "node_modules/@popperjs/core/lib/utils/getOppositePlacement.js"() {
    hash = {
      left: "right",
      right: "left",
      bottom: "top",
      top: "bottom"
    };
  }
});

// node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function(matched) {
    return hash2[matched];
  });
}
var hash2;
var init_getOppositeVariationPlacement = __esm({
  "node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js"() {
    hash2 = {
      start: "end",
      end: "start"
    };
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js
function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft,
    scrollTop
  };
}
var init_getWindowScroll = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js"() {
    init_getWindow();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}
var init_getWindowScrollBarX = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js"() {
    init_getBoundingClientRect();
    init_getDocumentElement();
    init_getWindowScroll();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js
function getViewportRect(element, strategy) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    var layoutViewport = isLayoutViewport();
    if (layoutViewport || !layoutViewport && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x + getWindowScrollBarX(element),
    y
  };
}
var init_getViewportRect = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js"() {
    init_getWindow();
    init_getDocumentElement();
    init_getWindowScrollBarX();
    init_isLayoutViewport();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js
function getDocumentRect(element) {
  var _element$ownerDocumen;
  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;
  if (getComputedStyle(body || html).direction === "rtl") {
    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
var init_getDocumentRect = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js"() {
    init_getDocumentElement();
    init_getComputedStyle();
    init_getWindowScrollBarX();
    init_getWindowScroll();
    init_math();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js
function isScrollParent(element) {
  var _getComputedStyle = getComputedStyle(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}
var init_isScrollParent = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js"() {
    init_getComputedStyle();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
function getScrollParent(node) {
  if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
    return node.ownerDocument.body;
  }
  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }
  return getScrollParent(getParentNode(node));
}
var init_getScrollParent = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js"() {
    init_getParentNode();
    init_isScrollParent();
    init_getNodeName();
    init_instanceOf();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
function listScrollParents(element, list) {
  var _element$ownerDocumen;
  if (list === void 0) {
    list = [];
  }
  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : updatedList.concat(listScrollParents(getParentNode(target)));
}
var init_listScrollParents = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js"() {
    init_getScrollParent();
    init_getParentNode();
    init_getWindow();
    init_isScrollParent();
  }
});

// node_modules/@popperjs/core/lib/utils/rectToClientRect.js
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}
var init_rectToClientRect = __esm({
  "node_modules/@popperjs/core/lib/utils/rectToClientRect.js"() {
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
function getInnerBoundingClientRect(element, strategy) {
  var rect = getBoundingClientRect(element, false, strategy === "fixed");
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
function getClientRectFromMixedType(element, clippingParent, strategy) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingParents(element) {
  var clippingParents2 = listScrollParents(getParentNode(element));
  var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
  if (!isElement(clipperElement)) {
    return [];
  }
  return clippingParents2.filter(function(clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
  });
}
function getClippingRect(element, boundary, rootBoundary, strategy) {
  var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
  var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents2[0];
  var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}
var init_getClippingRect = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js"() {
    init_enums();
    init_getViewportRect();
    init_getDocumentRect();
    init_listScrollParents();
    init_getOffsetParent();
    init_getDocumentElement();
    init_getComputedStyle();
    init_instanceOf();
    init_getBoundingClientRect();
    init_getParentNode();
    init_contains();
    init_getNodeName();
    init_rectToClientRect();
    init_math();
  }
});

// node_modules/@popperjs/core/lib/utils/computeOffsets.js
function computeOffsets(_ref) {
  var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference2.x + reference2.width / 2 - element.width / 2;
  var commonY = reference2.y + reference2.height / 2 - element.height / 2;
  var offsets;
  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference2.y - element.height
      };
      break;
    case bottom:
      offsets = {
        x: commonX,
        y: reference2.y + reference2.height
      };
      break;
    case right:
      offsets = {
        x: reference2.x + reference2.width,
        y: commonY
      };
      break;
    case left:
      offsets = {
        x: reference2.x - element.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference2.x,
        y: reference2.y
      };
  }
  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === "y" ? "height" : "width";
    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
        break;
      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
        break;
      default:
    }
  }
  return offsets;
}
var init_computeOffsets = __esm({
  "node_modules/@popperjs/core/lib/utils/computeOffsets.js"() {
    init_getBasePlacement();
    init_getVariation();
    init_getMainAxisFromPlacement();
    init_enums();
  }
});

// node_modules/@popperjs/core/lib/utils/detectOverflow.js
function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$strategy = _options.strategy, strategy = _options$strategy === void 0 ? state.strategy : _options$strategy, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets2 = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: "absolute",
    placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset;
  if (elementContext === popper && offsetData) {
    var offset2 = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function(key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
      overflowOffsets[key] += offset2[axis] * multiply;
    });
  }
  return overflowOffsets;
}
var init_detectOverflow = __esm({
  "node_modules/@popperjs/core/lib/utils/detectOverflow.js"() {
    init_getClippingRect();
    init_getDocumentElement();
    init_getBoundingClientRect();
    init_computeOffsets();
    init_rectToClientRect();
    init_enums();
    init_instanceOf();
    init_mergePaddingObject();
    init_expandToHashMap();
  }
});

// node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js
function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements2 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
    return getVariation(placement2) === variation;
  }) : basePlacements;
  var allowedPlacements = placements2.filter(function(placement2) {
    return allowedAutoPlacements.indexOf(placement2) >= 0;
  });
  if (allowedPlacements.length === 0) {
    allowedPlacements = placements2;
    if (true) {
      console.error(["Popper: The `allowedAutoPlacements` option did not allow any", "placements. Ensure the `placement` option matches the variation", "of the allowed placements.", 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(" "));
    }
  }
  var overflows = allowedPlacements.reduce(function(acc, placement2) {
    acc[placement2] = detectOverflow(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding
    })[getBasePlacement(placement2)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function(a, b) {
    return overflows[a] - overflows[b];
  });
}
var init_computeAutoPlacement = __esm({
  "node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js"() {
    init_getVariation();
    init_enums();
    init_detectOverflow();
    init_getBasePlacement();
  }
});

// node_modules/@popperjs/core/lib/modifiers/flip.js
function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }
  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}
function flip(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  if (state.modifiersData[name]._skip) {
    return;
  }
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
    return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding,
      flipVariations,
      allowedAutoPlacements
    }) : placement2);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = /* @__PURE__ */ new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements2[0];
  for (var i = 0; i < placements2.length; i++) {
    var placement = placements2[i];
    var _basePlacement = getBasePlacement(placement);
    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? "width" : "height";
    var overflow = detectOverflow(state, {
      placement,
      boundary,
      rootBoundary,
      altBoundary,
      padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }
    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];
    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }
    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }
    if (checks.every(function(check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }
    checksMap.set(placement, checks);
  }
  if (makeFallbackChecks) {
    var numberOfChecks = flipVariations ? 3 : 1;
    var _loop = function _loop2(_i2) {
      var fittingPlacement = placements2.find(function(placement2) {
        var checks2 = checksMap.get(placement2);
        if (checks2) {
          return checks2.slice(0, _i2).every(function(check) {
            return check;
          });
        }
      });
      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };
    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);
      if (_ret === "break")
        break;
    }
  }
  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
}
var flip_default;
var init_flip = __esm({
  "node_modules/@popperjs/core/lib/modifiers/flip.js"() {
    init_getOppositePlacement();
    init_getBasePlacement();
    init_getOppositeVariationPlacement();
    init_detectOverflow();
    init_computeAutoPlacement();
    init_enums();
    init_getVariation();
    flip_default = {
      name: "flip",
      enabled: true,
      phase: "main",
      fn: flip,
      requiresIfExists: ["offset"],
      data: {
        _skip: false
      }
    };
  }
});

// node_modules/@popperjs/core/lib/modifiers/hide.js
function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }
  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}
function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function(side) {
    return overflow[side] >= 0;
  });
}
function hide(_ref) {
  var state = _ref.state, name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: "reference"
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets,
    popperEscapeOffsets,
    isReferenceHidden,
    hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-reference-hidden": isReferenceHidden,
    "data-popper-escaped": hasPopperEscaped
  });
}
var hide_default;
var init_hide = __esm({
  "node_modules/@popperjs/core/lib/modifiers/hide.js"() {
    init_enums();
    init_detectOverflow();
    hide_default = {
      name: "hide",
      enabled: true,
      phase: "main",
      requiresIfExists: ["preventOverflow"],
      fn: hide
    };
  }
});

// node_modules/@popperjs/core/lib/modifiers/offset.js
function distanceAndSkiddingToXY(placement, rects, offset2) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
    placement
  })) : offset2, skidding = _ref[0], distance = _ref[1];
  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}
function offset(_ref2) {
  var state = _ref2.state, options = _ref2.options, name = _ref2.name;
  var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function(acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }
  state.modifiersData[name] = data;
}
var offset_default;
var init_offset = __esm({
  "node_modules/@popperjs/core/lib/modifiers/offset.js"() {
    init_getBasePlacement();
    init_enums();
    offset_default = {
      name: "offset",
      enabled: true,
      phase: "main",
      requires: ["popperOffsets"],
      fn: offset
    };
  }
});

// node_modules/@popperjs/core/lib/modifiers/popperOffsets.js
function popperOffsets(_ref) {
  var state = _ref.state, name = _ref.name;
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: "absolute",
    placement: state.placement
  });
}
var popperOffsets_default;
var init_popperOffsets = __esm({
  "node_modules/@popperjs/core/lib/modifiers/popperOffsets.js"() {
    init_computeOffsets();
    popperOffsets_default = {
      name: "popperOffsets",
      enabled: true,
      phase: "read",
      fn: popperOffsets,
      data: {}
    };
  }
});

// node_modules/@popperjs/core/lib/utils/getAltAxis.js
function getAltAxis(axis) {
  return axis === "x" ? "y" : "x";
}
var init_getAltAxis = __esm({
  "node_modules/@popperjs/core/lib/utils/getAltAxis.js"() {
  }
});

// node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
function preventOverflow(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary,
    rootBoundary,
    padding,
    altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };
  if (!popperOffsets2) {
    return;
  }
  if (checkMainAxis) {
    var _offsetModifierState$;
    var mainSide = mainAxis === "y" ? top : left;
    var altSide = mainAxis === "y" ? bottom : right;
    var len = mainAxis === "y" ? "height" : "width";
    var offset2 = popperOffsets2[mainAxis];
    var min2 = offset2 + overflow[mainSide];
    var max2 = offset2 - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide];
    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset2 + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset2 + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? min(min2, tetherMin) : min2, offset2, tether ? max(max2, tetherMax) : max2);
    popperOffsets2[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset2;
  }
  if (checkAltAxis) {
    var _offsetModifierState$2;
    var _mainSide = mainAxis === "x" ? top : left;
    var _altSide = mainAxis === "x" ? bottom : right;
    var _offset = popperOffsets2[altAxis];
    var _len = altAxis === "y" ? "height" : "width";
    var _min = _offset + overflow[_mainSide];
    var _max = _offset - overflow[_altSide];
    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
    popperOffsets2[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }
  state.modifiersData[name] = data;
}
var preventOverflow_default;
var init_preventOverflow = __esm({
  "node_modules/@popperjs/core/lib/modifiers/preventOverflow.js"() {
    init_enums();
    init_getBasePlacement();
    init_getMainAxisFromPlacement();
    init_getAltAxis();
    init_within();
    init_getLayoutRect();
    init_getOffsetParent();
    init_detectOverflow();
    init_getVariation();
    init_getFreshSideObject();
    init_math();
    preventOverflow_default = {
      name: "preventOverflow",
      enabled: true,
      phase: "main",
      fn: preventOverflow,
      requiresIfExists: ["offset"]
    };
  }
});

// node_modules/@popperjs/core/lib/modifiers/index.js
var init_modifiers = __esm({
  "node_modules/@popperjs/core/lib/modifiers/index.js"() {
    init_applyStyles();
    init_arrow();
    init_computeStyles();
    init_eventListeners();
    init_flip();
    init_hide();
    init_offset();
    init_popperOffsets();
    init_preventOverflow();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}
var init_getHTMLElementScroll = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js"() {
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}
var init_getNodeScroll = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js"() {
    init_getWindowScroll();
    init_getWindow();
    init_instanceOf();
    init_getHTMLElementScroll();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round(rect.width) / element.offsetWidth || 1;
  var scaleY = round(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}
var init_getCompositeRect = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js"() {
    init_getBoundingClientRect();
    init_getNodeScroll();
    init_getNodeName();
    init_instanceOf();
    init_getWindowScrollBarX();
    init_getDocumentElement();
    init_isScrollParent();
    init_math();
  }
});

// node_modules/@popperjs/core/lib/utils/orderModifiers.js
function order(modifiers) {
  var map = /* @__PURE__ */ new Map();
  var visited = /* @__PURE__ */ new Set();
  var result = [];
  modifiers.forEach(function(modifier) {
    map.set(modifier.name, modifier);
  });
  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function(dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }
  modifiers.forEach(function(modifier) {
    if (!visited.has(modifier.name)) {
      sort(modifier);
    }
  });
  return result;
}
function orderModifiers(modifiers) {
  var orderedModifiers = order(modifiers);
  return modifierPhases.reduce(function(acc, phase) {
    return acc.concat(orderedModifiers.filter(function(modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}
var init_orderModifiers = __esm({
  "node_modules/@popperjs/core/lib/utils/orderModifiers.js"() {
    init_enums();
  }
});

// node_modules/@popperjs/core/lib/utils/debounce.js
function debounce2(fn2) {
  var pending;
  return function() {
    if (!pending) {
      pending = new Promise(function(resolve) {
        Promise.resolve().then(function() {
          pending = void 0;
          resolve(fn2());
        });
      });
    }
    return pending;
  };
}
var init_debounce = __esm({
  "node_modules/@popperjs/core/lib/utils/debounce.js"() {
  }
});

// node_modules/@popperjs/core/lib/utils/format.js
function format(str) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  return [].concat(args).reduce(function(p, c) {
    return p.replace(/%s/, c);
  }, str);
}
var init_format = __esm({
  "node_modules/@popperjs/core/lib/utils/format.js"() {
  }
});

// node_modules/@popperjs/core/lib/utils/validateModifiers.js
function validateModifiers(modifiers) {
  modifiers.forEach(function(modifier) {
    [].concat(Object.keys(modifier), VALID_PROPERTIES).filter(function(value, index, self) {
      return self.indexOf(value) === index;
    }).forEach(function(key) {
      switch (key) {
        case "name":
          if (typeof modifier.name !== "string") {
            console.error(format(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', '"' + String(modifier.name) + '"'));
          }
          break;
        case "enabled":
          if (typeof modifier.enabled !== "boolean") {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', '"' + String(modifier.enabled) + '"'));
          }
          break;
        case "phase":
          if (modifierPhases.indexOf(modifier.phase) < 0) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + modifierPhases.join(", "), '"' + String(modifier.phase) + '"'));
          }
          break;
        case "fn":
          if (typeof modifier.fn !== "function") {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', '"' + String(modifier.fn) + '"'));
          }
          break;
        case "effect":
          if (modifier.effect != null && typeof modifier.effect !== "function") {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', '"' + String(modifier.fn) + '"'));
          }
          break;
        case "requires":
          if (modifier.requires != null && !Array.isArray(modifier.requires)) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', '"' + String(modifier.requires) + '"'));
          }
          break;
        case "requiresIfExists":
          if (!Array.isArray(modifier.requiresIfExists)) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', '"' + String(modifier.requiresIfExists) + '"'));
          }
          break;
        case "options":
        case "data":
          break;
        default:
          console.error('PopperJS: an invalid property has been provided to the "' + modifier.name + '" modifier, valid properties are ' + VALID_PROPERTIES.map(function(s) {
            return '"' + s + '"';
          }).join(", ") + '; but "' + key + '" was provided.');
      }
      modifier.requires && modifier.requires.forEach(function(requirement) {
        if (modifiers.find(function(mod) {
          return mod.name === requirement;
        }) == null) {
          console.error(format(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
        }
      });
    });
  });
}
var INVALID_MODIFIER_ERROR, MISSING_DEPENDENCY_ERROR, VALID_PROPERTIES;
var init_validateModifiers = __esm({
  "node_modules/@popperjs/core/lib/utils/validateModifiers.js"() {
    init_format();
    init_enums();
    INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
    MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
    VALID_PROPERTIES = ["name", "enabled", "phase", "fn", "effect", "requires", "options"];
  }
});

// node_modules/@popperjs/core/lib/utils/uniqueBy.js
function uniqueBy(arr, fn2) {
  var identifiers = /* @__PURE__ */ new Set();
  return arr.filter(function(item) {
    var identifier = fn2(item);
    if (!identifiers.has(identifier)) {
      identifiers.add(identifier);
      return true;
    }
  });
}
var init_uniqueBy = __esm({
  "node_modules/@popperjs/core/lib/utils/uniqueBy.js"() {
  }
});

// node_modules/@popperjs/core/lib/utils/mergeByName.js
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function(merged2, current) {
    var existing = merged2[current.name];
    merged2[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged2;
  }, {});
  return Object.keys(merged).map(function(key) {
    return merged[key];
  });
}
var init_mergeByName = __esm({
  "node_modules/@popperjs/core/lib/utils/mergeByName.js"() {
  }
});

// node_modules/@popperjs/core/lib/createPopper.js
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function(element) {
    return !(element && typeof element.getBoundingClientRect === "function");
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers3 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper4(reference2, popper2, options) {
    if (options === void 0) {
      options = defaultOptions;
    }
    var state = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference2,
        popper: popper2
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state,
      setOptions: function setOptions(setOptionsAction) {
        var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options2);
        state.scrollParents = {
          reference: isElement(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
          popper: listScrollParents(popper2)
        };
        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers3, state.options.modifiers)));
        state.orderedModifiers = orderedModifiers.filter(function(m) {
          return m.enabled;
        });
        if (true) {
          var modifiers = uniqueBy([].concat(orderedModifiers, state.options.modifiers), function(_ref) {
            var name = _ref.name;
            return name;
          });
          validateModifiers(modifiers);
          if (getBasePlacement(state.options.placement) === auto) {
            var flipModifier = state.orderedModifiers.find(function(_ref2) {
              var name = _ref2.name;
              return name === "flip";
            });
            if (!flipModifier) {
              console.error(['Popper: "auto" placements require the "flip" modifier be', "present and enabled to work."].join(" "));
            }
          }
          var _getComputedStyle = getComputedStyle(popper2), marginTop = _getComputedStyle.marginTop, marginRight = _getComputedStyle.marginRight, marginBottom = _getComputedStyle.marginBottom, marginLeft = _getComputedStyle.marginLeft;
          if ([marginTop, marginRight, marginBottom, marginLeft].some(function(margin) {
            return parseFloat(margin);
          })) {
            console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', "between the popper and its reference element or boundary.", "To replicate margin, use the `offset` modifier, as well as", "the `padding` option in the `preventOverflow` and `flip`", "modifiers."].join(" "));
          }
        }
        runModifierEffects();
        return instance.update();
      },
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
        if (!areValidElements(reference3, popper3)) {
          if (true) {
            console.error(INVALID_ELEMENT_ERROR);
          }
          return;
        }
        state.rects = {
          reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
          popper: getLayoutRect(popper3)
        };
        state.reset = false;
        state.placement = state.options.placement;
        state.orderedModifiers.forEach(function(modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        var __debug_loops__ = 0;
        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (true) {
            __debug_loops__ += 1;
            if (__debug_loops__ > 100) {
              console.error(INFINITE_LOOP_ERROR);
              break;
            }
          }
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }
          var _state$orderedModifie = state.orderedModifiers[index], fn2 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
          if (typeof fn2 === "function") {
            state = fn2({
              state,
              options: _options,
              name,
              instance
            }) || state;
          }
        }
      },
      update: debounce2(function() {
        return new Promise(function(resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference2, popper2)) {
      if (true) {
        console.error(INVALID_ELEMENT_ERROR);
      }
      return instance;
    }
    instance.setOptions(options).then(function(state2) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state2);
      }
    });
    function runModifierEffects() {
      state.orderedModifiers.forEach(function(_ref3) {
        var name = _ref3.name, _ref3$options = _ref3.options, options2 = _ref3$options === void 0 ? {} : _ref3$options, effect4 = _ref3.effect;
        if (typeof effect4 === "function") {
          var cleanupFn = effect4({
            state,
            name,
            instance,
            options: options2
          });
          var noopFn = function noopFn2() {
          };
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function(fn2) {
        return fn2();
      });
      effectCleanupFns = [];
    }
    return instance;
  };
}
var INVALID_ELEMENT_ERROR, INFINITE_LOOP_ERROR, DEFAULT_OPTIONS, createPopper;
var init_createPopper = __esm({
  "node_modules/@popperjs/core/lib/createPopper.js"() {
    init_getCompositeRect();
    init_getLayoutRect();
    init_listScrollParents();
    init_getOffsetParent();
    init_getComputedStyle();
    init_orderModifiers();
    init_debounce();
    init_validateModifiers();
    init_uniqueBy();
    init_getBasePlacement();
    init_mergeByName();
    init_detectOverflow();
    init_instanceOf();
    init_enums();
    INVALID_ELEMENT_ERROR = "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.";
    INFINITE_LOOP_ERROR = "Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.";
    DEFAULT_OPTIONS = {
      placement: "bottom",
      modifiers: [],
      strategy: "absolute"
    };
    createPopper = popperGenerator();
  }
});

// node_modules/@popperjs/core/lib/popper-lite.js
var defaultModifiers, createPopper2;
var init_popper_lite = __esm({
  "node_modules/@popperjs/core/lib/popper-lite.js"() {
    init_createPopper();
    init_eventListeners();
    init_popperOffsets();
    init_computeStyles();
    init_applyStyles();
    defaultModifiers = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default];
    createPopper2 = popperGenerator({
      defaultModifiers
    });
  }
});

// node_modules/@popperjs/core/lib/popper.js
var defaultModifiers2, createPopper3;
var init_popper = __esm({
  "node_modules/@popperjs/core/lib/popper.js"() {
    init_createPopper();
    init_eventListeners();
    init_popperOffsets();
    init_computeStyles();
    init_applyStyles();
    init_offset();
    init_flip();
    init_preventOverflow();
    init_arrow();
    init_hide();
    init_popper_lite();
    init_modifiers();
    defaultModifiers2 = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default, offset_default, flip_default, preventOverflow_default, arrow_default, hide_default];
    createPopper3 = popperGenerator({
      defaultModifiers: defaultModifiers2
    });
  }
});

// node_modules/@popperjs/core/lib/index.js
var init_lib = __esm({
  "node_modules/@popperjs/core/lib/index.js"() {
    init_enums();
    init_modifiers();
    init_createPopper();
    init_popper();
    init_popper_lite();
  }
});

// node_modules/@mui/base/PopperUnstyled/popperUnstyledClasses.js
function getPopperUnstyledUtilityClass(slot) {
  return generateUtilityClass("MuiPopperUnstyled", slot);
}
var popperUnstyledClasses;
var init_popperUnstyledClasses = __esm({
  "node_modules/@mui/base/PopperUnstyled/popperUnstyledClasses.js"() {
    init_generateUtilityClass();
    init_generateUtilityClasses();
    popperUnstyledClasses = generateUtilityClasses("MuiPopperUnstyled", ["root"]);
  }
});

// node_modules/@mui/base/PopperUnstyled/PopperUnstyled.js
function flipPlacement(placement, direction) {
  if (direction === "ltr") {
    return placement;
  }
  switch (placement) {
    case "bottom-end":
      return "bottom-start";
    case "bottom-start":
      return "bottom-end";
    case "top-end":
      return "top-start";
    case "top-start":
      return "top-end";
    default:
      return placement;
  }
}
function resolveAnchorEl(anchorEl) {
  return typeof anchorEl === "function" ? anchorEl() : anchorEl;
}
var React15, import_prop_types9, import_jsx_runtime13, _excluded6, _excluded22, useUtilityClasses4, defaultPopperOptions, PopperTooltip, PopperUnstyled, PopperUnstyled_default;
var init_PopperUnstyled = __esm({
  "node_modules/@mui/base/PopperUnstyled/PopperUnstyled.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React15 = __toESM(require_react());
    init_esm();
    init_lib();
    import_prop_types9 = __toESM(require_prop_types());
    init_composeClasses();
    init_Portal2();
    init_popperUnstyledClasses();
    init_utils();
    import_jsx_runtime13 = __toESM(require_jsx_runtime());
    _excluded6 = ["anchorEl", "children", "component", "direction", "disablePortal", "modifiers", "open", "ownerState", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps"];
    _excluded22 = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition"];
    useUtilityClasses4 = () => {
      const slots = {
        root: ["root"]
      };
      return composeClasses(slots, getPopperUnstyledUtilityClass, {});
    };
    defaultPopperOptions = {};
    PopperTooltip = React15.forwardRef(function PopperTooltip2(props, ref) {
      var _ref;
      const {
        anchorEl,
        children,
        component,
        direction,
        disablePortal,
        modifiers,
        open,
        ownerState,
        placement: initialPlacement,
        popperOptions,
        popperRef: popperRefProp,
        slotProps = {},
        slots = {},
        TransitionProps
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded6);
      const tooltipRef = React15.useRef(null);
      const ownRef = useForkRef(tooltipRef, ref);
      const popperRef = React15.useRef(null);
      const handlePopperRef = useForkRef(popperRef, popperRefProp);
      const handlePopperRefRef = React15.useRef(handlePopperRef);
      useEnhancedEffect_default(() => {
        handlePopperRefRef.current = handlePopperRef;
      }, [handlePopperRef]);
      React15.useImperativeHandle(popperRefProp, () => popperRef.current, []);
      const rtlPlacement = flipPlacement(initialPlacement, direction);
      const [placement, setPlacement] = React15.useState(rtlPlacement);
      const [resolvedAnchorElement, setResolvedAnchorElement] = React15.useState(resolveAnchorEl(anchorEl));
      React15.useEffect(() => {
        if (popperRef.current) {
          popperRef.current.forceUpdate();
        }
      });
      React15.useEffect(() => {
        if (anchorEl) {
          setResolvedAnchorElement(resolveAnchorEl(anchorEl));
        }
      }, [anchorEl]);
      useEnhancedEffect_default(() => {
        if (!resolvedAnchorElement || !open) {
          return void 0;
        }
        const handlePopperUpdate = (data) => {
          setPlacement(data.placement);
        };
        if (true) {
          if (resolvedAnchorElement && resolvedAnchorElement.nodeType === 1) {
            const box = resolvedAnchorElement.getBoundingClientRect();
            if (box.top === 0 && box.left === 0 && box.right === 0 && box.bottom === 0) {
              console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join("\n"));
            }
          }
        }
        let popperModifiers = [{
          name: "preventOverflow",
          options: {
            altBoundary: disablePortal
          }
        }, {
          name: "flip",
          options: {
            altBoundary: disablePortal
          }
        }, {
          name: "onUpdate",
          enabled: true,
          phase: "afterWrite",
          fn: ({
            state
          }) => {
            handlePopperUpdate(state);
          }
        }];
        if (modifiers != null) {
          popperModifiers = popperModifiers.concat(modifiers);
        }
        if (popperOptions && popperOptions.modifiers != null) {
          popperModifiers = popperModifiers.concat(popperOptions.modifiers);
        }
        const popper2 = createPopper3(resolvedAnchorElement, tooltipRef.current, _extends({
          placement: rtlPlacement
        }, popperOptions, {
          modifiers: popperModifiers
        }));
        handlePopperRefRef.current(popper2);
        return () => {
          popper2.destroy();
          handlePopperRefRef.current(null);
        };
      }, [resolvedAnchorElement, disablePortal, modifiers, open, popperOptions, rtlPlacement]);
      const childProps = {
        placement
      };
      if (TransitionProps !== null) {
        childProps.TransitionProps = TransitionProps;
      }
      const classes = useUtilityClasses4();
      const Root = (_ref = component != null ? component : slots.root) != null ? _ref : "div";
      const rootProps = useSlotProps({
        elementType: Root,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        additionalProps: {
          role: "tooltip",
          ref: ownRef
        },
        ownerState: _extends({}, props, ownerState),
        className: classes.root
      });
      return (0, import_jsx_runtime13.jsx)(Root, _extends({}, rootProps, {
        children: typeof children === "function" ? children(childProps) : children
      }));
    });
    PopperUnstyled = React15.forwardRef(function PopperUnstyled2(props, ref) {
      const {
        anchorEl,
        children,
        container: containerProp,
        direction = "ltr",
        disablePortal = false,
        keepMounted = false,
        modifiers,
        open,
        placement = "bottom",
        popperOptions = defaultPopperOptions,
        popperRef,
        style,
        transition = false
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded22);
      const [exited, setExited] = React15.useState(true);
      const handleEnter = () => {
        setExited(false);
      };
      const handleExited = () => {
        setExited(true);
      };
      if (!keepMounted && !open && (!transition || exited)) {
        return null;
      }
      const container = containerProp || (anchorEl ? ownerDocument(resolveAnchorEl(anchorEl)).body : void 0);
      return (0, import_jsx_runtime13.jsx)(Portal_default, {
        disablePortal,
        container,
        children: (0, import_jsx_runtime13.jsx)(PopperTooltip, _extends({
          anchorEl,
          direction,
          disablePortal,
          modifiers,
          ref,
          open: transition ? !exited : open,
          placement,
          popperOptions,
          popperRef
        }, other, {
          style: _extends({
            position: "fixed",
            top: 0,
            left: 0,
            display: !open && keepMounted && (!transition || exited) ? "none" : null
          }, style),
          TransitionProps: transition ? {
            in: open,
            onEnter: handleEnter,
            onExited: handleExited
          } : null,
          children
        }))
      });
    });
    true ? PopperUnstyled.propTypes = {
      anchorEl: chainPropTypes(import_prop_types9.default.oneOfType([HTMLElementType, import_prop_types9.default.object, import_prop_types9.default.func]), (props) => {
        if (props.open) {
          const resolvedAnchorEl = resolveAnchorEl(props.anchorEl);
          if (resolvedAnchorEl && resolvedAnchorEl.nodeType === 1) {
            const box = resolvedAnchorEl.getBoundingClientRect();
            if (box.top === 0 && box.left === 0 && box.right === 0 && box.bottom === 0) {
              return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join("\n"));
            }
          } else if (!resolvedAnchorEl || typeof resolvedAnchorEl.getBoundingClientRect !== "function" || resolvedAnchorEl.contextElement != null && resolvedAnchorEl.contextElement.nodeType !== 1) {
            return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "It should be an HTML element instance or a virtualElement ", "(https://popper.js.org/docs/v2/virtual-elements/)."].join("\n"));
          }
        }
        return null;
      }),
      children: import_prop_types9.default.oneOfType([import_prop_types9.default.node, import_prop_types9.default.func]),
      container: import_prop_types9.default.oneOfType([HTMLElementType, import_prop_types9.default.func]),
      direction: import_prop_types9.default.oneOf(["ltr", "rtl"]),
      disablePortal: import_prop_types9.default.bool,
      keepMounted: import_prop_types9.default.bool,
      modifiers: import_prop_types9.default.arrayOf(import_prop_types9.default.shape({
        data: import_prop_types9.default.object,
        effect: import_prop_types9.default.func,
        enabled: import_prop_types9.default.bool,
        fn: import_prop_types9.default.func,
        name: import_prop_types9.default.any,
        options: import_prop_types9.default.object,
        phase: import_prop_types9.default.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
        requires: import_prop_types9.default.arrayOf(import_prop_types9.default.string),
        requiresIfExists: import_prop_types9.default.arrayOf(import_prop_types9.default.string)
      })),
      open: import_prop_types9.default.bool.isRequired,
      placement: import_prop_types9.default.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
      popperOptions: import_prop_types9.default.shape({
        modifiers: import_prop_types9.default.array,
        onFirstUpdate: import_prop_types9.default.func,
        placement: import_prop_types9.default.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
        strategy: import_prop_types9.default.oneOf(["absolute", "fixed"])
      }),
      popperRef: refType_default,
      slotProps: import_prop_types9.default.shape({
        root: import_prop_types9.default.oneOfType([import_prop_types9.default.func, import_prop_types9.default.object])
      }),
      slots: import_prop_types9.default.shape({
        root: import_prop_types9.default.elementType
      }),
      style: import_prop_types9.default.object,
      transition: import_prop_types9.default.bool
    } : void 0;
    PopperUnstyled_default = PopperUnstyled;
  }
});

// node_modules/@mui/base/PopperUnstyled/index.js
var init_PopperUnstyled2 = __esm({
  "node_modules/@mui/base/PopperUnstyled/index.js"() {
    init_PopperUnstyled();
    init_popperUnstyledClasses();
    init_popperUnstyledClasses();
  }
});

// node_modules/@mui/base/MenuUnstyled/menuUnstyledClasses.js
function getMenuUnstyledUtilityClass(slot) {
  return generateUtilityClass("MuiMenu", slot);
}
var menuUnstyledClasses;
var init_menuUnstyledClasses = __esm({
  "node_modules/@mui/base/MenuUnstyled/menuUnstyledClasses.js"() {
    init_generateUtilityClass();
    init_generateUtilityClasses();
    menuUnstyledClasses = generateUtilityClasses("MuiMenu", ["root", "listbox", "expanded"]);
  }
});

// node_modules/@mui/base/MenuUnstyled/MenuUnstyled.js
function getUtilityClasses(ownerState) {
  const {
    open
  } = ownerState;
  const slots = {
    root: ["root", open && "expanded"],
    listbox: ["listbox", open && "expanded"]
  };
  return composeClasses(slots, getMenuUnstyledUtilityClass, {});
}
var React16, import_prop_types10, import_jsx_runtime14, _excluded7, MenuUnstyled;
var init_MenuUnstyled = __esm({
  "node_modules/@mui/base/MenuUnstyled/MenuUnstyled.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React16 = __toESM(require_react());
    import_prop_types10 = __toESM(require_prop_types());
    init_esm();
    init_MenuUnstyledContext();
    init_menuUnstyledClasses();
    init_useMenu();
    init_composeClasses();
    init_PopperUnstyled2();
    init_useSlotProps();
    import_jsx_runtime14 = __toESM(require_jsx_runtime());
    _excluded7 = ["actions", "anchorEl", "children", "component", "keepMounted", "listboxId", "onClose", "open", "slotProps", "slots"];
    MenuUnstyled = React16.forwardRef(function MenuUnstyled2(props, forwardedRef) {
      var _ref, _slots$listbox;
      const {
        actions,
        anchorEl,
        children,
        component,
        keepMounted = false,
        listboxId,
        onClose,
        open = false,
        slotProps = {},
        slots = {}
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded7);
      const {
        registerItem,
        unregisterItem,
        getListboxProps,
        getItemProps,
        getItemState,
        highlightFirstItem,
        highlightLastItem
      } = useMenu({
        open,
        onClose,
        listboxId
      });
      React16.useImperativeHandle(actions, () => ({
        highlightFirstItem,
        highlightLastItem
      }), [highlightFirstItem, highlightLastItem]);
      const ownerState = _extends({}, props, {
        open
      });
      const classes = getUtilityClasses(ownerState);
      const Root = (_ref = component != null ? component : slots.root) != null ? _ref : PopperUnstyled_default;
      const rootProps = useSlotProps({
        elementType: Root,
        externalForwardedProps: other,
        externalSlotProps: slotProps.root,
        additionalProps: {
          anchorEl,
          open,
          keepMounted,
          role: void 0,
          ref: forwardedRef
        },
        className: classes.root,
        ownerState
      });
      const Listbox = (_slots$listbox = slots.listbox) != null ? _slots$listbox : "ul";
      const listboxProps = useSlotProps({
        elementType: Listbox,
        getSlotProps: getListboxProps,
        externalSlotProps: slotProps.listbox,
        ownerState,
        className: classes.listbox
      });
      const contextValue = React16.useMemo(() => ({
        registerItem,
        unregisterItem,
        getItemState,
        getItemProps,
        open
      }), [getItemProps, getItemState, open, registerItem, unregisterItem]);
      return (0, import_jsx_runtime14.jsx)(Root, _extends({}, rootProps, {
        children: (0, import_jsx_runtime14.jsx)(Listbox, _extends({}, listboxProps, {
          children: (0, import_jsx_runtime14.jsx)(MenuUnstyledContext_default.Provider, {
            value: contextValue,
            children
          })
        }))
      }));
    });
    true ? MenuUnstyled.propTypes = {
      actions: refType_default,
      anchorEl: import_prop_types10.default.oneOfType([HTMLElementType, import_prop_types10.default.object, import_prop_types10.default.func]),
      children: import_prop_types10.default.node,
      component: import_prop_types10.default.elementType,
      keepMounted: import_prop_types10.default.bool,
      listboxId: import_prop_types10.default.string,
      onClose: import_prop_types10.default.func,
      open: import_prop_types10.default.bool,
      slotProps: import_prop_types10.default.shape({
        listbox: import_prop_types10.default.oneOfType([import_prop_types10.default.func, import_prop_types10.default.object]),
        root: import_prop_types10.default.oneOfType([import_prop_types10.default.func, import_prop_types10.default.object])
      }),
      slots: import_prop_types10.default.shape({
        listbox: import_prop_types10.default.elementType,
        root: import_prop_types10.default.elementType
      })
    } : void 0;
  }
});

// node_modules/@mui/base/MenuUnstyled/MenuUnstyled.types.js
var init_MenuUnstyled_types = __esm({
  "node_modules/@mui/base/MenuUnstyled/MenuUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/MenuUnstyled/useMenu.types.js
var init_useMenu_types = __esm({
  "node_modules/@mui/base/MenuUnstyled/useMenu.types.js"() {
  }
});

// node_modules/@mui/base/MenuUnstyled/index.js
var init_MenuUnstyled2 = __esm({
  "node_modules/@mui/base/MenuUnstyled/index.js"() {
    init_MenuUnstyled();
    init_MenuUnstyledContext();
    init_MenuUnstyledContext();
    init_menuUnstyledClasses();
    init_menuUnstyledClasses();
    init_MenuUnstyled_types();
    init_useMenu();
    init_useMenu_types();
  }
});

// node_modules/@mui/base/MenuItemUnstyled/useMenuItem.js
function useMenuItem(props) {
  var _itemState$disabled;
  const {
    disabled = false,
    ref,
    label
  } = props;
  const id = useId();
  const menuContext = React17.useContext(MenuUnstyledContext_default);
  const itemRef = React17.useRef(null);
  const handleRef = useForkRef(itemRef, ref);
  if (menuContext === null) {
    throw new Error("MenuItemUnstyled must be used within a MenuUnstyled");
  }
  const {
    registerItem,
    unregisterItem,
    open
  } = menuContext;
  React17.useEffect(() => {
    if (id === void 0) {
      return void 0;
    }
    registerItem(id, {
      disabled,
      id,
      ref: itemRef,
      label
    });
    return () => unregisterItem(id);
  }, [id, registerItem, unregisterItem, disabled, ref, label]);
  const {
    getRootProps: getButtonProps,
    focusVisible
  } = useButton({
    disabled,
    focusableWhenDisabled: true,
    ref: handleRef
  });
  const [focusRequested, requestFocus] = React17.useState(false);
  const focusIfRequested = React17.useCallback(() => {
    if (focusRequested && itemRef.current != null) {
      itemRef.current.focus();
      requestFocus(false);
    }
  }, [focusRequested]);
  React17.useEffect(() => {
    focusIfRequested();
  });
  React17.useDebugValue({
    id,
    disabled,
    label
  });
  const itemState = menuContext.getItemState(id != null ? id : "");
  const {
    highlighted
  } = itemState != null ? itemState : {
    highlighted: false
  };
  React17.useEffect(() => {
    requestFocus(highlighted && open);
  }, [highlighted, open]);
  if (id === void 0) {
    return {
      getRootProps: (other) => _extends({}, other, getButtonProps(other), {
        role: "menuitem"
      }),
      disabled: false,
      focusVisible
    };
  }
  return {
    getRootProps: (other) => {
      const optionProps = menuContext.getItemProps(id, other);
      return _extends({}, other, getButtonProps(other), {
        tabIndex: optionProps.tabIndex,
        id: optionProps.id,
        role: "menuitem"
      });
    },
    disabled: (_itemState$disabled = itemState == null ? void 0 : itemState.disabled) != null ? _itemState$disabled : false,
    focusVisible
  };
}
var React17;
var init_useMenuItem = __esm({
  "node_modules/@mui/base/MenuItemUnstyled/useMenuItem.js"() {
    init_extends();
    React17 = __toESM(require_react());
    init_esm();
    init_MenuUnstyled2();
    init_ButtonUnstyled2();
  }
});

// node_modules/@mui/base/MenuItemUnstyled/menuItemUnstyledClasses.js
function getMenuItemUnstyledUtilityClass(slot) {
  return generateUtilityClass("MuiMenuItem", slot);
}
var menuItemUnstyledClasses;
var init_menuItemUnstyledClasses = __esm({
  "node_modules/@mui/base/MenuItemUnstyled/menuItemUnstyledClasses.js"() {
    init_generateUtilityClass();
    init_generateUtilityClasses();
    menuItemUnstyledClasses = generateUtilityClasses("MuiMenuItem", ["root", "disabled", "focusVisible"]);
  }
});

// node_modules/@mui/base/MenuItemUnstyled/MenuItemUnstyled.js
function getUtilityClasses2(ownerState) {
  const {
    disabled,
    focusVisible
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", focusVisible && "focusVisible"]
  };
  return composeClasses(slots, getMenuItemUnstyledUtilityClass, {});
}
var React18, import_prop_types11, import_jsx_runtime15, _excluded8, MenuItemUnstyled;
var init_MenuItemUnstyled = __esm({
  "node_modules/@mui/base/MenuItemUnstyled/MenuItemUnstyled.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React18 = __toESM(require_react());
    import_prop_types11 = __toESM(require_prop_types());
    init_menuItemUnstyledClasses();
    init_useMenuItem();
    init_composeClasses();
    init_useSlotProps();
    import_jsx_runtime15 = __toESM(require_jsx_runtime());
    _excluded8 = ["children", "disabled", "component", "label", "slotProps", "slots"];
    MenuItemUnstyled = React18.forwardRef(function MenuItemUnstyled2(props, ref) {
      var _ref;
      const {
        children,
        disabled: disabledProp = false,
        component,
        label,
        slotProps = {},
        slots = {}
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded8);
      const {
        getRootProps,
        disabled,
        focusVisible
      } = useMenuItem({
        disabled: disabledProp,
        ref,
        label
      });
      const ownerState = _extends({}, props, {
        disabled,
        focusVisible
      });
      const classes = getUtilityClasses2(ownerState);
      const Root = (_ref = component != null ? component : slots.root) != null ? _ref : "li";
      const rootProps = useSlotProps({
        elementType: Root,
        getSlotProps: getRootProps,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        className: classes.root,
        ownerState
      });
      return (0, import_jsx_runtime15.jsx)(Root, _extends({}, rootProps, {
        children
      }));
    });
    true ? MenuItemUnstyled.propTypes = {
      children: import_prop_types11.default.node,
      component: import_prop_types11.default.elementType,
      disabled: import_prop_types11.default.bool,
      label: import_prop_types11.default.string,
      slotProps: import_prop_types11.default.shape({
        root: import_prop_types11.default.oneOfType([import_prop_types11.default.func, import_prop_types11.default.object])
      }),
      slots: import_prop_types11.default.shape({
        root: import_prop_types11.default.elementType
      })
    } : void 0;
  }
});

// node_modules/@mui/base/MenuItemUnstyled/MenuItemUnstyled.types.js
var init_MenuItemUnstyled_types = __esm({
  "node_modules/@mui/base/MenuItemUnstyled/MenuItemUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/MenuItemUnstyled/useMenuItem.types.js
var init_useMenuItem_types = __esm({
  "node_modules/@mui/base/MenuItemUnstyled/useMenuItem.types.js"() {
  }
});

// node_modules/@mui/base/MenuItemUnstyled/index.js
var init_MenuItemUnstyled2 = __esm({
  "node_modules/@mui/base/MenuItemUnstyled/index.js"() {
    init_MenuItemUnstyled();
    init_MenuItemUnstyled_types();
    init_menuItemUnstyledClasses();
    init_menuItemUnstyledClasses();
    init_useMenuItem();
    init_useMenuItem_types();
  }
});

// node_modules/@mui/base/SelectUnstyled/useSelect.types.js
function isOptionGroup(child) {
  return !!child.options;
}
var init_useSelect_types = __esm({
  "node_modules/@mui/base/SelectUnstyled/useSelect.types.js"() {
  }
});

// node_modules/@mui/base/SelectUnstyled/utils.js
function getOptionsFromChildren(children) {
  if (children == null) {
    return [];
  }
  const selectChildren = [];
  React19.Children.forEach(children, (node) => {
    var _props, _props2, _element$props$disabl2;
    const nodeChildren = node == null ? void 0 : (_props = node.props) == null ? void 0 : _props.children;
    if ((node == null ? void 0 : (_props2 = node.props) == null ? void 0 : _props2.value) === void 0) {
      if (nodeChildren != null) {
        var _element$props$disabl;
        const element2 = node;
        const group = {
          options: getOptionsFromChildren(nodeChildren),
          label: element2.props.label,
          disabled: (_element$props$disabl = element2.props.disabled) != null ? _element$props$disabl : false
        };
        selectChildren.push(group);
      }
      return;
    }
    const element = node;
    const option = {
      value: element.props.value,
      label: element.props.label || element.props.children,
      disabled: (_element$props$disabl2 = element.props.disabled) != null ? _element$props$disabl2 : false
    };
    selectChildren.push(option);
  });
  return selectChildren != null ? selectChildren : [];
}
function flattenOptionGroups(groupedOptions, isGroupDisabled = false) {
  let flatOptions = [];
  groupedOptions.forEach((optionOrGroup) => {
    if (isOptionGroup(optionOrGroup)) {
      flatOptions = flatOptions.concat(flattenOptionGroups(optionOrGroup.options, optionOrGroup.disabled));
    } else {
      flatOptions.push(_extends({}, optionOrGroup, {
        disabled: isGroupDisabled || optionOrGroup.disabled
      }));
    }
  });
  return flatOptions;
}
var React19;
var init_utils2 = __esm({
  "node_modules/@mui/base/SelectUnstyled/utils.js"() {
    init_extends();
    React19 = __toESM(require_react());
    init_useSelect_types();
  }
});

// node_modules/@mui/base/SelectUnstyled/defaultOptionStringifier.js
var defaultOptionStringifier2, defaultOptionStringifier_default;
var init_defaultOptionStringifier = __esm({
  "node_modules/@mui/base/SelectUnstyled/defaultOptionStringifier.js"() {
    defaultOptionStringifier2 = (option) => {
      const {
        label,
        value
      } = option;
      if (typeof label === "string") {
        return label;
      }
      if (typeof value === "string") {
        return value;
      }
      return String(option);
    };
    defaultOptionStringifier_default = defaultOptionStringifier2;
  }
});

// node_modules/@mui/base/SelectUnstyled/useSelect.js
function useSelect(props) {
  const {
    buttonRef: buttonRefProp,
    defaultValue,
    disabled = false,
    listboxId: listboxIdProp,
    listboxRef: listboxRefProp,
    multiple = false,
    onChange,
    onOpenChange,
    open = false,
    options,
    optionStringifier = defaultOptionStringifier_default,
    value: valueProp
  } = props;
  const buttonRef = React20.useRef(null);
  const handleButtonRef = useForkRef(buttonRefProp, buttonRef);
  const listboxRef = React20.useRef(null);
  const listboxId = useId(listboxIdProp);
  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: "SelectUnstyled",
    state: "value"
  });
  const ignoreEnterKeyUp = React20.useRef(false);
  const ignoreClick = React20.useRef(false);
  const [listboxFocusRequested, requestListboxFocus] = React20.useState(false);
  const focusListboxIfRequested = React20.useCallback(() => {
    if (listboxFocusRequested && listboxRef.current != null) {
      listboxRef.current.focus();
      requestListboxFocus(false);
    }
  }, [listboxFocusRequested]);
  const handleListboxRef = useForkRef(listboxRefProp, listboxRef, focusListboxIfRequested);
  React20.useEffect(() => {
    focusListboxIfRequested();
  }, [focusListboxIfRequested]);
  React20.useEffect(() => {
    requestListboxFocus(open);
  }, [open]);
  const createHandleMouseDown = (otherHandlers) => (event) => {
    var _otherHandlers$onMous;
    otherHandlers == null ? void 0 : (_otherHandlers$onMous = otherHandlers.onMouseDown) == null ? void 0 : _otherHandlers$onMous.call(otherHandlers, event);
    if (!event.defaultPrevented && open) {
      ignoreClick.current = true;
    }
  };
  const createHandleButtonClick = (otherHandlers) => (event) => {
    var _otherHandlers$onClic;
    otherHandlers == null ? void 0 : (_otherHandlers$onClic = otherHandlers.onClick) == null ? void 0 : _otherHandlers$onClic.call(otherHandlers, event);
    if (!event.defaultPrevented && !ignoreClick.current) {
      onOpenChange == null ? void 0 : onOpenChange(!open);
    }
    ignoreClick.current = false;
  };
  const createHandleButtonKeyDown = (otherHandlers) => (event) => {
    var _otherHandlers$onKeyD;
    otherHandlers == null ? void 0 : (_otherHandlers$onKeyD = otherHandlers.onKeyDown) == null ? void 0 : _otherHandlers$onKeyD.call(otherHandlers, event);
    if (event.defaultPrevented) {
      return;
    }
    if (event.key === "Enter") {
      ignoreEnterKeyUp.current = true;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      onOpenChange == null ? void 0 : onOpenChange(true);
    }
  };
  const createHandleListboxKeyUp = (otherHandlers) => (event) => {
    var _otherHandlers$onKeyU;
    otherHandlers == null ? void 0 : (_otherHandlers$onKeyU = otherHandlers.onKeyUp) == null ? void 0 : _otherHandlers$onKeyU.call(otherHandlers, event);
    if (event.defaultPrevented) {
      return;
    }
    const closingKeys = multiple ? ["Escape"] : ["Escape", "Enter", " "];
    if (open && !ignoreEnterKeyUp.current && closingKeys.includes(event.key)) {
      var _buttonRef$current;
      buttonRef == null ? void 0 : (_buttonRef$current = buttonRef.current) == null ? void 0 : _buttonRef$current.focus();
    }
    ignoreEnterKeyUp.current = false;
  };
  const createHandleListboxItemClick = (otherHandlers) => (event) => {
    var _otherHandlers$onClic2;
    otherHandlers == null ? void 0 : (_otherHandlers$onClic2 = otherHandlers.onClick) == null ? void 0 : _otherHandlers$onClic2.call(otherHandlers, event);
    if (event.defaultPrevented) {
      return;
    }
    if (!multiple) {
      onOpenChange == null ? void 0 : onOpenChange(false);
    }
  };
  const createHandleListboxBlur = (otherHandlers) => (event) => {
    var _otherHandlers$onBlur;
    otherHandlers == null ? void 0 : (_otherHandlers$onBlur = otherHandlers.onBlur) == null ? void 0 : _otherHandlers$onBlur.call(otherHandlers, event);
    if (!event.defaultPrevented) {
      onOpenChange == null ? void 0 : onOpenChange(false);
    }
  };
  const listboxReducer = (state, action) => {
    const newState = defaultListboxReducer(state, action);
    if (action.type === ActionTypes.keyDown && !open && (action.event.key === "ArrowUp" || action.event.key === "ArrowDown")) {
      return _extends({}, newState, {
        selectedValue: newState.highlightedValue
      });
    }
    if (action.type === ActionTypes.blur || action.type === ActionTypes.setValue || action.type === ActionTypes.optionsChange) {
      return _extends({}, newState, {
        highlightedValue: newState.selectedValue
      });
    }
    return newState;
  };
  const {
    getRootProps: getButtonRootProps,
    active: buttonActive,
    focusVisible: buttonFocusVisible
  } = useButton({
    disabled,
    ref: handleButtonRef
  });
  const selectedOption = React20.useMemo(() => {
    var _props$options$find;
    return props.multiple ? props.options.filter((o) => value.includes(o.value)) : (_props$options$find = props.options.find((o) => o.value === value)) != null ? _props$options$find : null;
  }, [props.multiple, props.options, value]);
  let useListboxParameters;
  if (props.multiple) {
    const onChangeMultiple = onChange;
    useListboxParameters = {
      id: listboxId,
      isOptionDisabled: (o) => {
        var _o$disabled;
        return (_o$disabled = o == null ? void 0 : o.disabled) != null ? _o$disabled : false;
      },
      optionComparer: (o, v) => (o == null ? void 0 : o.value) === (v == null ? void 0 : v.value),
      listboxRef: handleListboxRef,
      multiple: true,
      onChange: (e, newOptions) => {
        const newValues = newOptions.map((o) => o.value);
        setValue(newValues);
        onChangeMultiple == null ? void 0 : onChangeMultiple(e, newValues);
      },
      options,
      optionStringifier,
      value: selectedOption
    };
  } else {
    const onChangeSingle = onChange;
    useListboxParameters = {
      id: listboxId,
      isOptionDisabled: (o) => {
        var _o$disabled2;
        return (_o$disabled2 = o == null ? void 0 : o.disabled) != null ? _o$disabled2 : false;
      },
      optionComparer: (o, v) => (o == null ? void 0 : o.value) === (v == null ? void 0 : v.value),
      listboxRef: handleListboxRef,
      multiple: false,
      onChange: (e, option) => {
        var _option$value, _option$value2;
        setValue((_option$value = option == null ? void 0 : option.value) != null ? _option$value : null);
        onChangeSingle == null ? void 0 : onChangeSingle(e, (_option$value2 = option == null ? void 0 : option.value) != null ? _option$value2 : null);
      },
      options,
      optionStringifier,
      stateReducer: listboxReducer,
      value: selectedOption
    };
  }
  const {
    getRootProps: getListboxRootProps,
    getOptionProps: getListboxOptionProps,
    getOptionState,
    highlightedOption,
    selectedOption: listboxSelectedOption
  } = useListbox(useListboxParameters);
  const getButtonProps = (otherHandlers = {}) => {
    return _extends({}, getButtonRootProps(_extends({}, otherHandlers, {
      onClick: createHandleButtonClick(otherHandlers),
      onMouseDown: createHandleMouseDown(otherHandlers),
      onKeyDown: createHandleButtonKeyDown(otherHandlers)
    })), {
      role: "combobox",
      "aria-expanded": open,
      "aria-haspopup": "listbox",
      "aria-controls": listboxId
    });
  };
  const getListboxProps = (otherHandlers = {}) => getListboxRootProps(_extends({}, otherHandlers, {
    onBlur: createHandleListboxBlur(otherHandlers),
    onKeyUp: createHandleListboxKeyUp(otherHandlers)
  }));
  const getOptionProps = (option, otherHandlers = {}) => {
    return getListboxOptionProps(option, _extends({}, otherHandlers, {
      onClick: createHandleListboxItemClick(otherHandlers)
    }));
  };
  React20.useDebugValue({
    selectedOption: listboxSelectedOption,
    highlightedOption,
    open
  });
  return {
    buttonActive,
    buttonFocusVisible,
    disabled,
    getButtonProps,
    getListboxProps,
    getOptionProps,
    getOptionState,
    open,
    value
  };
}
var React20, useSelect_default;
var init_useSelect = __esm({
  "node_modules/@mui/base/SelectUnstyled/useSelect.js"() {
    init_extends();
    React20 = __toESM(require_react());
    init_esm();
    init_ButtonUnstyled2();
    init_ListboxUnstyled();
    init_defaultOptionStringifier();
    useSelect_default = useSelect;
  }
});

// node_modules/@mui/base/SelectUnstyled/SelectUnstyledContext.js
var React21, SelectUnstyledContext;
var init_SelectUnstyledContext = __esm({
  "node_modules/@mui/base/SelectUnstyled/SelectUnstyledContext.js"() {
    React21 = __toESM(require_react());
    SelectUnstyledContext = React21.createContext(void 0);
  }
});

// node_modules/@mui/base/SelectUnstyled/selectUnstyledClasses.js
function getSelectUnstyledUtilityClass(slot) {
  return generateUtilityClass("MuiSelect", slot);
}
var selectUnstyledClasses;
var init_selectUnstyledClasses = __esm({
  "node_modules/@mui/base/SelectUnstyled/selectUnstyledClasses.js"() {
    init_generateUtilityClass();
    init_generateUtilityClasses();
    selectUnstyledClasses = generateUtilityClasses("MuiSelect", ["root", "button", "listbox", "popper", "active", "expanded", "disabled", "focusVisible"]);
  }
});

// node_modules/@mui/base/SelectUnstyled/SelectUnstyled.js
function defaultRenderSingleValue(selectedOption) {
  var _selectedOption$label;
  return (_selectedOption$label = selectedOption == null ? void 0 : selectedOption.label) != null ? _selectedOption$label : "";
}
function defaultFormValueProvider(selectedOption) {
  if ((selectedOption == null ? void 0 : selectedOption.value) == null) {
    return "";
  }
  if (typeof selectedOption.value === "string" || typeof selectedOption.value === "number") {
    return selectedOption.value;
  }
  return JSON.stringify(selectedOption.value);
}
function useUtilityClasses5(ownerState) {
  const {
    active,
    disabled,
    open,
    focusVisible
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", focusVisible && "focusVisible", active && "active", open && "expanded"],
    listbox: ["listbox", disabled && "disabled"],
    popper: ["popper"]
  };
  return composeClasses(slots, getSelectUnstyledUtilityClass, {});
}
var React22, import_prop_types12, import_jsx_runtime16, import_jsx_runtime17, _excluded9, SelectUnstyled;
var init_SelectUnstyled = __esm({
  "node_modules/@mui/base/SelectUnstyled/SelectUnstyled.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React22 = __toESM(require_react());
    import_prop_types12 = __toESM(require_prop_types());
    init_esm();
    init_utils2();
    init_useSelect();
    init_utils();
    init_PopperUnstyled2();
    init_SelectUnstyledContext();
    init_composeClasses();
    init_selectUnstyledClasses();
    init_defaultOptionStringifier();
    import_jsx_runtime16 = __toESM(require_jsx_runtime());
    import_jsx_runtime17 = __toESM(require_jsx_runtime());
    _excluded9 = ["autoFocus", "children", "component", "defaultValue", "defaultListboxOpen", "disabled", "getSerializedValue", "listboxId", "listboxOpen", "name", "onChange", "onListboxOpenChange", "optionStringifier", "renderValue", "slotProps", "slots", "value"];
    SelectUnstyled = React22.forwardRef(function SelectUnstyled2(props, forwardedRef) {
      var _ref, _slots$listbox, _slots$popper;
      const {
        autoFocus,
        children,
        component,
        defaultValue,
        defaultListboxOpen = false,
        disabled: disabledProp,
        getSerializedValue = defaultFormValueProvider,
        listboxId,
        listboxOpen: listboxOpenProp,
        name,
        onChange,
        onListboxOpenChange,
        optionStringifier = defaultOptionStringifier_default,
        renderValue: renderValueProp,
        slotProps = {},
        slots = {},
        value: valueProp
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded9);
      const renderValue = renderValueProp != null ? renderValueProp : defaultRenderSingleValue;
      const [groupedOptions, setGroupedOptions] = React22.useState([]);
      const options = React22.useMemo(() => flattenOptionGroups(groupedOptions), [groupedOptions]);
      const [listboxOpen, setListboxOpen] = useControlled({
        controlled: listboxOpenProp,
        default: defaultListboxOpen,
        name: "SelectUnstyled",
        state: "listboxOpen"
      });
      React22.useEffect(() => {
        setGroupedOptions(getOptionsFromChildren(children));
      }, [children]);
      const [buttonDefined, setButtonDefined] = React22.useState(false);
      const buttonRef = React22.useRef(null);
      const listboxRef = React22.useRef(null);
      const Button = (_ref = component != null ? component : slots.root) != null ? _ref : "button";
      const ListboxRoot = (_slots$listbox = slots.listbox) != null ? _slots$listbox : "ul";
      const Popper = (_slots$popper = slots.popper) != null ? _slots$popper : PopperUnstyled_default;
      const handleButtonRefChange = React22.useCallback((element) => {
        setButtonDefined(element != null);
      }, []);
      const handleButtonRef = useForkRef(forwardedRef, buttonRef, handleButtonRefChange);
      React22.useEffect(() => {
        if (autoFocus) {
          buttonRef.current.focus();
        }
      }, [autoFocus]);
      const handleOpenChange = (isOpen) => {
        setListboxOpen(isOpen);
        onListboxOpenChange == null ? void 0 : onListboxOpenChange(isOpen);
      };
      const {
        buttonActive,
        buttonFocusVisible,
        disabled,
        getButtonProps,
        getListboxProps,
        getOptionProps,
        getOptionState,
        value
      } = useSelect_default({
        buttonRef: handleButtonRef,
        defaultValue,
        disabled: disabledProp,
        listboxId,
        multiple: false,
        onChange,
        onOpenChange: handleOpenChange,
        open: listboxOpen,
        options,
        optionStringifier,
        value: valueProp
      });
      const ownerState = _extends({}, props, {
        active: buttonActive,
        defaultListboxOpen,
        disabled,
        focusVisible: buttonFocusVisible,
        open: listboxOpen,
        renderValue,
        value
      });
      const classes = useUtilityClasses5(ownerState);
      const selectedOption = React22.useMemo(() => {
        var _options$find;
        return (_options$find = options.find((o) => value === o.value)) != null ? _options$find : null;
      }, [options, value]);
      const buttonProps = useSlotProps({
        elementType: Button,
        getSlotProps: getButtonProps,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        ownerState,
        className: classes.root
      });
      const listboxProps = useSlotProps({
        elementType: ListboxRoot,
        getSlotProps: getListboxProps,
        externalSlotProps: slotProps.listbox,
        additionalProps: {
          ref: listboxRef
        },
        ownerState,
        className: classes.listbox
      });
      const popperProps = useSlotProps({
        elementType: Popper,
        externalSlotProps: slotProps.popper,
        additionalProps: {
          anchorEl: buttonRef.current,
          disablePortal: true,
          open: listboxOpen,
          placement: "bottom-start",
          role: void 0
        },
        ownerState,
        className: classes.popper
      });
      const context = React22.useMemo(() => ({
        getOptionProps,
        getOptionState,
        listboxRef
      }), [getOptionProps, getOptionState]);
      return (0, import_jsx_runtime17.jsxs)(React22.Fragment, {
        children: [(0, import_jsx_runtime16.jsx)(Button, _extends({}, buttonProps, {
          children: renderValue(selectedOption)
        })), buttonDefined && (0, import_jsx_runtime16.jsx)(Popper, _extends({}, popperProps, {
          children: (0, import_jsx_runtime16.jsx)(ListboxRoot, _extends({}, listboxProps, {
            children: (0, import_jsx_runtime16.jsx)(SelectUnstyledContext.Provider, {
              value: context,
              children
            })
          }))
        })), name && (0, import_jsx_runtime16.jsx)("input", {
          type: "hidden",
          name,
          value: getSerializedValue(selectedOption)
        })]
      });
    });
    true ? SelectUnstyled.propTypes = {
      autoFocus: import_prop_types12.default.bool,
      children: import_prop_types12.default.node,
      component: import_prop_types12.default.elementType,
      defaultListboxOpen: import_prop_types12.default.bool,
      defaultValue: import_prop_types12.default.any,
      disabled: import_prop_types12.default.bool,
      getSerializedValue: import_prop_types12.default.func,
      listboxId: import_prop_types12.default.string,
      listboxOpen: import_prop_types12.default.bool,
      name: import_prop_types12.default.string,
      onChange: import_prop_types12.default.func,
      onListboxOpenChange: import_prop_types12.default.func,
      optionStringifier: import_prop_types12.default.func,
      renderValue: import_prop_types12.default.func,
      slotProps: import_prop_types12.default.shape({
        listbox: import_prop_types12.default.oneOfType([import_prop_types12.default.func, import_prop_types12.default.object]),
        popper: import_prop_types12.default.oneOfType([import_prop_types12.default.func, import_prop_types12.default.object]),
        root: import_prop_types12.default.oneOfType([import_prop_types12.default.func, import_prop_types12.default.object])
      }),
      slots: import_prop_types12.default.shape({
        listbox: import_prop_types12.default.elementType,
        popper: import_prop_types12.default.elementType,
        root: import_prop_types12.default.elementType
      }),
      value: import_prop_types12.default.any
    } : void 0;
  }
});

// node_modules/@mui/base/SelectUnstyled/SelectUnstyled.types.js
var init_SelectUnstyled_types = __esm({
  "node_modules/@mui/base/SelectUnstyled/SelectUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/SelectUnstyled/index.js
var init_SelectUnstyled2 = __esm({
  "node_modules/@mui/base/SelectUnstyled/index.js"() {
    init_SelectUnstyled();
    init_SelectUnstyledContext();
    init_selectUnstyledClasses();
    init_selectUnstyledClasses();
    init_SelectUnstyled_types();
    init_useSelect();
    init_useSelect_types();
    init_utils2();
  }
});

// node_modules/@mui/base/SliderUnstyled/sliderUnstyledClasses.js
function getSliderUtilityClass(slot) {
  return generateUtilityClass("MuiSlider", slot);
}
var sliderUnstyledClasses, sliderUnstyledClasses_default;
var init_sliderUnstyledClasses = __esm({
  "node_modules/@mui/base/SliderUnstyled/sliderUnstyledClasses.js"() {
    init_generateUtilityClasses();
    init_generateUtilityClass();
    sliderUnstyledClasses = generateUtilityClasses("MuiSlider", ["root", "active", "focusVisible", "disabled", "dragging", "marked", "vertical", "trackInverted", "trackFalse", "rail", "track", "mark", "markActive", "markLabel", "markLabelActive", "thumb", "valueLabel", "valueLabelOpen", "valueLabelCircle", "valueLabelLabel"]);
    sliderUnstyledClasses_default = sliderUnstyledClasses;
  }
});

// node_modules/@mui/base/SliderUnstyled/SliderValueLabelUnstyled.js
function SliderValueLabelUnstyled(props) {
  const {
    children,
    className,
    value
  } = props;
  const classes = useValueLabelClasses(props);
  return React23.cloneElement(children, {
    className: clsx_m_default(children.props.className)
  }, (0, import_jsx_runtime19.jsxs)(React23.Fragment, {
    children: [children.props.children, (0, import_jsx_runtime18.jsx)("span", {
      className: clsx_m_default(classes.offset, className),
      "aria-hidden": true,
      children: (0, import_jsx_runtime18.jsx)("span", {
        className: classes.circle,
        children: (0, import_jsx_runtime18.jsx)("span", {
          className: classes.label,
          children: value
        })
      })
    })]
  }));
}
var React23, import_prop_types13, import_jsx_runtime18, import_jsx_runtime19, useValueLabelClasses;
var init_SliderValueLabelUnstyled = __esm({
  "node_modules/@mui/base/SliderUnstyled/SliderValueLabelUnstyled.js"() {
    React23 = __toESM(require_react());
    import_prop_types13 = __toESM(require_prop_types());
    init_clsx_m();
    init_sliderUnstyledClasses();
    import_jsx_runtime18 = __toESM(require_jsx_runtime());
    import_jsx_runtime19 = __toESM(require_jsx_runtime());
    useValueLabelClasses = (props) => {
      const {
        open
      } = props;
      const utilityClasses = {
        offset: clsx_m_default(open && sliderUnstyledClasses_default.valueLabelOpen),
        circle: sliderUnstyledClasses_default.valueLabelCircle,
        label: sliderUnstyledClasses_default.valueLabelLabel
      };
      return utilityClasses;
    };
    true ? SliderValueLabelUnstyled.propTypes = {
      children: import_prop_types13.default.element.isRequired,
      className: import_prop_types13.default.string,
      theme: import_prop_types13.default.any,
      value: import_prop_types13.default.node
    } : void 0;
  }
});

// node_modules/@mui/base/SliderUnstyled/useSlider.js
function asc(a, b) {
  return a - b;
}
function clamp(value, min2, max2) {
  if (value == null) {
    return min2;
  }
  return Math.min(Math.max(min2, value), max2);
}
function findClosest(values, currentValue) {
  var _values$reduce;
  const {
    index: closestIndex
  } = (_values$reduce = values.reduce((acc, value, index) => {
    const distance = Math.abs(currentValue - value);
    if (acc === null || distance < acc.distance || distance === acc.distance) {
      return {
        distance,
        index
      };
    }
    return acc;
  }, null)) != null ? _values$reduce : {};
  return closestIndex;
}
function trackFinger(event, touchId) {
  if (touchId.current !== void 0 && event.changedTouches) {
    const touchEvent = event;
    for (let i = 0; i < touchEvent.changedTouches.length; i += 1) {
      const touch = touchEvent.changedTouches[i];
      if (touch.identifier === touchId.current) {
        return {
          x: touch.clientX,
          y: touch.clientY
        };
      }
    }
    return false;
  }
  return {
    x: event.clientX,
    y: event.clientY
  };
}
function valueToPercent(value, min2, max2) {
  return (value - min2) * 100 / (max2 - min2);
}
function percentToValue(percent, min2, max2) {
  return (max2 - min2) * percent + min2;
}
function getDecimalPrecision(num) {
  if (Math.abs(num) < 1) {
    const parts = num.toExponential().split("e-");
    const matissaDecimalPart = parts[0].split(".")[1];
    return (matissaDecimalPart ? matissaDecimalPart.length : 0) + parseInt(parts[1], 10);
  }
  const decimalPart = num.toString().split(".")[1];
  return decimalPart ? decimalPart.length : 0;
}
function roundValueToStep(value, step, min2) {
  const nearest = Math.round((value - min2) / step) * step + min2;
  return Number(nearest.toFixed(getDecimalPrecision(step)));
}
function setValueIndex({
  values,
  newValue,
  index
}) {
  const output = values.slice();
  output[index] = newValue;
  return output.sort(asc);
}
function focusThumb({
  sliderRef,
  activeIndex,
  setActive
}) {
  var _sliderRef$current, _doc$activeElement;
  const doc = ownerDocument(sliderRef.current);
  if (!((_sliderRef$current = sliderRef.current) != null && _sliderRef$current.contains(doc.activeElement)) || Number(doc == null ? void 0 : (_doc$activeElement = doc.activeElement) == null ? void 0 : _doc$activeElement.getAttribute("data-index")) !== activeIndex) {
    var _sliderRef$current2;
    (_sliderRef$current2 = sliderRef.current) == null ? void 0 : _sliderRef$current2.querySelector(`[type="range"][data-index="${activeIndex}"]`).focus();
  }
  if (setActive) {
    setActive(activeIndex);
  }
}
function doesSupportTouchActionNone() {
  if (cachedSupportsTouchActionNone === void 0) {
    if (typeof CSS !== "undefined" && typeof CSS.supports === "function") {
      cachedSupportsTouchActionNone = CSS.supports("touch-action", "none");
    } else {
      cachedSupportsTouchActionNone = true;
    }
  }
  return cachedSupportsTouchActionNone;
}
function useSlider(parameters) {
  const {
    "aria-labelledby": ariaLabelledby,
    defaultValue,
    disabled = false,
    disableSwap = false,
    isRtl = false,
    marks: marksProp = false,
    max: max2 = 100,
    min: min2 = 0,
    name,
    onChange,
    onChangeCommitted,
    orientation = "horizontal",
    ref,
    scale = Identity,
    step = 1,
    tabIndex,
    value: valueProp
  } = parameters;
  const touchId = React24.useRef();
  const [active, setActive] = React24.useState(-1);
  const [open, setOpen] = React24.useState(-1);
  const [dragging, setDragging] = React24.useState(false);
  const moveCount = React24.useRef(0);
  const [valueDerived, setValueState] = useControlled({
    controlled: valueProp,
    default: defaultValue != null ? defaultValue : min2,
    name: "Slider"
  });
  const handleChange = onChange && ((event, value, thumbIndex) => {
    const nativeEvent = event.nativeEvent || event;
    const clonedEvent = new nativeEvent.constructor(nativeEvent.type, nativeEvent);
    Object.defineProperty(clonedEvent, "target", {
      writable: true,
      value: {
        value,
        name
      }
    });
    onChange(clonedEvent, value, thumbIndex);
  });
  const range = Array.isArray(valueDerived);
  let values = range ? valueDerived.slice().sort(asc) : [valueDerived];
  values = values.map((value) => clamp(value, min2, max2));
  const marks = marksProp === true && step !== null ? [...Array(Math.floor((max2 - min2) / step) + 1)].map((_, index) => ({
    value: min2 + step * index
  })) : marksProp || [];
  const marksValues = marks.map((mark) => mark.value);
  const {
    isFocusVisibleRef,
    onBlur: handleBlurVisible,
    onFocus: handleFocusVisible,
    ref: focusVisibleRef
  } = useIsFocusVisible();
  const [focusedThumbIndex, setFocusedThumbIndex] = React24.useState(-1);
  const sliderRef = React24.useRef();
  const handleFocusRef = useForkRef(focusVisibleRef, sliderRef);
  const handleRef = useForkRef(ref, handleFocusRef);
  const createHandleHiddenInputFocus = (otherHandlers) => (event) => {
    var _otherHandlers$onFocu;
    const index = Number(event.currentTarget.getAttribute("data-index"));
    handleFocusVisible(event);
    if (isFocusVisibleRef.current === true) {
      setFocusedThumbIndex(index);
    }
    setOpen(index);
    otherHandlers == null ? void 0 : (_otherHandlers$onFocu = otherHandlers.onFocus) == null ? void 0 : _otherHandlers$onFocu.call(otherHandlers, event);
  };
  const createHandleHiddenInputBlur = (otherHandlers) => (event) => {
    var _otherHandlers$onBlur;
    handleBlurVisible(event);
    if (isFocusVisibleRef.current === false) {
      setFocusedThumbIndex(-1);
    }
    setOpen(-1);
    otherHandlers == null ? void 0 : (_otherHandlers$onBlur = otherHandlers.onBlur) == null ? void 0 : _otherHandlers$onBlur.call(otherHandlers, event);
  };
  useEnhancedEffect_default(() => {
    if (disabled && sliderRef.current.contains(document.activeElement)) {
      var _document$activeEleme;
      (_document$activeEleme = document.activeElement) == null ? void 0 : _document$activeEleme.blur();
    }
  }, [disabled]);
  if (disabled && active !== -1) {
    setActive(-1);
  }
  if (disabled && focusedThumbIndex !== -1) {
    setFocusedThumbIndex(-1);
  }
  const createHandleHiddenInputChange = (otherHandlers) => (event) => {
    var _otherHandlers$onChan;
    (_otherHandlers$onChan = otherHandlers.onChange) == null ? void 0 : _otherHandlers$onChan.call(otherHandlers, event);
    const index = Number(event.currentTarget.getAttribute("data-index"));
    const value = values[index];
    const marksIndex = marksValues.indexOf(value);
    let newValue = event.target.valueAsNumber;
    if (marks && step == null) {
      newValue = newValue < value ? marksValues[marksIndex - 1] : marksValues[marksIndex + 1];
    }
    newValue = clamp(newValue, min2, max2);
    if (marks && step == null) {
      const currentMarkIndex = marksValues.indexOf(values[index]);
      newValue = newValue < values[index] ? marksValues[currentMarkIndex - 1] : marksValues[currentMarkIndex + 1];
    }
    if (range) {
      if (disableSwap) {
        newValue = clamp(newValue, values[index - 1] || -Infinity, values[index + 1] || Infinity);
      }
      const previousValue = newValue;
      newValue = setValueIndex({
        values,
        newValue,
        index
      });
      let activeIndex = index;
      if (!disableSwap) {
        activeIndex = newValue.indexOf(previousValue);
      }
      focusThumb({
        sliderRef,
        activeIndex
      });
    }
    setValueState(newValue);
    setFocusedThumbIndex(index);
    if (handleChange) {
      handleChange(event, newValue, index);
    }
    if (onChangeCommitted) {
      onChangeCommitted(event, newValue);
    }
  };
  const previousIndex = React24.useRef();
  let axis = orientation;
  if (isRtl && orientation === "horizontal") {
    axis += "-reverse";
  }
  const getFingerNewValue = ({
    finger,
    move = false
  }) => {
    const {
      current: slider
    } = sliderRef;
    const {
      width,
      height,
      bottom: bottom2,
      left: left2
    } = slider.getBoundingClientRect();
    let percent;
    if (axis.indexOf("vertical") === 0) {
      percent = (bottom2 - finger.y) / height;
    } else {
      percent = (finger.x - left2) / width;
    }
    if (axis.indexOf("-reverse") !== -1) {
      percent = 1 - percent;
    }
    let newValue;
    newValue = percentToValue(percent, min2, max2);
    if (step) {
      newValue = roundValueToStep(newValue, step, min2);
    } else {
      const closestIndex = findClosest(marksValues, newValue);
      newValue = marksValues[closestIndex];
    }
    newValue = clamp(newValue, min2, max2);
    let activeIndex = 0;
    if (range) {
      if (!move) {
        activeIndex = findClosest(values, newValue);
      } else {
        activeIndex = previousIndex.current;
      }
      if (disableSwap) {
        newValue = clamp(newValue, values[activeIndex - 1] || -Infinity, values[activeIndex + 1] || Infinity);
      }
      const previousValue = newValue;
      newValue = setValueIndex({
        values,
        newValue,
        index: activeIndex
      });
      if (!(disableSwap && move)) {
        activeIndex = newValue.indexOf(previousValue);
        previousIndex.current = activeIndex;
      }
    }
    return {
      newValue,
      activeIndex
    };
  };
  const handleTouchMove = useEventCallback((nativeEvent) => {
    const finger = trackFinger(nativeEvent, touchId);
    if (!finger) {
      return;
    }
    moveCount.current += 1;
    if (nativeEvent.type === "mousemove" && nativeEvent.buttons === 0) {
      handleTouchEnd(nativeEvent);
      return;
    }
    const {
      newValue,
      activeIndex
    } = getFingerNewValue({
      finger,
      move: true
    });
    focusThumb({
      sliderRef,
      activeIndex,
      setActive
    });
    setValueState(newValue);
    if (!dragging && moveCount.current > INTENTIONAL_DRAG_COUNT_THRESHOLD) {
      setDragging(true);
    }
    if (handleChange && newValue !== valueDerived) {
      handleChange(nativeEvent, newValue, activeIndex);
    }
  });
  const handleTouchEnd = useEventCallback((nativeEvent) => {
    const finger = trackFinger(nativeEvent, touchId);
    setDragging(false);
    if (!finger) {
      return;
    }
    const {
      newValue
    } = getFingerNewValue({
      finger,
      move: true
    });
    setActive(-1);
    if (nativeEvent.type === "touchend") {
      setOpen(-1);
    }
    if (onChangeCommitted) {
      onChangeCommitted(nativeEvent, newValue);
    }
    touchId.current = void 0;
    stopListening();
  });
  const handleTouchStart = useEventCallback((nativeEvent) => {
    if (disabled) {
      return;
    }
    if (!doesSupportTouchActionNone()) {
      nativeEvent.preventDefault();
    }
    const touch = nativeEvent.changedTouches[0];
    if (touch != null) {
      touchId.current = touch.identifier;
    }
    const finger = trackFinger(nativeEvent, touchId);
    if (finger !== false) {
      const {
        newValue,
        activeIndex
      } = getFingerNewValue({
        finger
      });
      focusThumb({
        sliderRef,
        activeIndex,
        setActive
      });
      setValueState(newValue);
      if (handleChange) {
        handleChange(nativeEvent, newValue, activeIndex);
      }
    }
    moveCount.current = 0;
    const doc = ownerDocument(sliderRef.current);
    doc.addEventListener("touchmove", handleTouchMove);
    doc.addEventListener("touchend", handleTouchEnd);
  });
  const stopListening = React24.useCallback(() => {
    const doc = ownerDocument(sliderRef.current);
    doc.removeEventListener("mousemove", handleTouchMove);
    doc.removeEventListener("mouseup", handleTouchEnd);
    doc.removeEventListener("touchmove", handleTouchMove);
    doc.removeEventListener("touchend", handleTouchEnd);
  }, [handleTouchEnd, handleTouchMove]);
  React24.useEffect(() => {
    const {
      current: slider
    } = sliderRef;
    slider.addEventListener("touchstart", handleTouchStart, {
      passive: doesSupportTouchActionNone()
    });
    return () => {
      slider.removeEventListener("touchstart", handleTouchStart, {
        passive: doesSupportTouchActionNone()
      });
      stopListening();
    };
  }, [stopListening, handleTouchStart]);
  React24.useEffect(() => {
    if (disabled) {
      stopListening();
    }
  }, [disabled, stopListening]);
  const createHandleMouseDown = (otherHandlers) => (event) => {
    var _otherHandlers$onMous;
    (_otherHandlers$onMous = otherHandlers.onMouseDown) == null ? void 0 : _otherHandlers$onMous.call(otherHandlers, event);
    if (disabled) {
      return;
    }
    if (event.defaultPrevented) {
      return;
    }
    if (event.button !== 0) {
      return;
    }
    event.preventDefault();
    const finger = trackFinger(event, touchId);
    if (finger !== false) {
      const {
        newValue,
        activeIndex
      } = getFingerNewValue({
        finger
      });
      focusThumb({
        sliderRef,
        activeIndex,
        setActive
      });
      setValueState(newValue);
      if (handleChange) {
        handleChange(event, newValue, activeIndex);
      }
    }
    moveCount.current = 0;
    const doc = ownerDocument(sliderRef.current);
    doc.addEventListener("mousemove", handleTouchMove);
    doc.addEventListener("mouseup", handleTouchEnd);
  };
  const trackOffset = valueToPercent(range ? values[0] : min2, min2, max2);
  const trackLeap = valueToPercent(values[values.length - 1], min2, max2) - trackOffset;
  const getRootProps = (otherHandlers = {}) => {
    const ownEventHandlers = {
      onMouseDown: createHandleMouseDown(otherHandlers || {})
    };
    const mergedEventHandlers = _extends({}, otherHandlers, ownEventHandlers);
    return _extends({
      ref: handleRef
    }, mergedEventHandlers);
  };
  const createHandleMouseOver = (otherHandlers) => (event) => {
    var _otherHandlers$onMous2;
    (_otherHandlers$onMous2 = otherHandlers.onMouseOver) == null ? void 0 : _otherHandlers$onMous2.call(otherHandlers, event);
    const index = Number(event.currentTarget.getAttribute("data-index"));
    setOpen(index);
  };
  const createHandleMouseLeave = (otherHandlers) => (event) => {
    var _otherHandlers$onMous3;
    (_otherHandlers$onMous3 = otherHandlers.onMouseLeave) == null ? void 0 : _otherHandlers$onMous3.call(otherHandlers, event);
    setOpen(-1);
  };
  const getThumbProps = (otherHandlers = {}) => {
    const ownEventHandlers = {
      onMouseOver: createHandleMouseOver(otherHandlers || {}),
      onMouseLeave: createHandleMouseLeave(otherHandlers || {})
    };
    return _extends({}, otherHandlers, ownEventHandlers);
  };
  const getHiddenInputProps = (otherHandlers = {}) => {
    var _parameters$step;
    const ownEventHandlers = {
      onChange: createHandleHiddenInputChange(otherHandlers || {}),
      onFocus: createHandleHiddenInputFocus(otherHandlers || {}),
      onBlur: createHandleHiddenInputBlur(otherHandlers || {})
    };
    const mergedEventHandlers = _extends({}, otherHandlers, ownEventHandlers);
    return _extends({
      tabIndex,
      "aria-labelledby": ariaLabelledby,
      "aria-orientation": orientation,
      "aria-valuemax": scale(max2),
      "aria-valuemin": scale(min2),
      name,
      type: "range",
      min: parameters.min,
      max: parameters.max,
      step: (_parameters$step = parameters.step) != null ? _parameters$step : void 0,
      disabled
    }, mergedEventHandlers, {
      style: _extends({}, visuallyHidden_default, {
        direction: isRtl ? "rtl" : "ltr",
        width: "100%",
        height: "100%"
      })
    });
  };
  return {
    active,
    axis,
    axisProps,
    dragging,
    focusedThumbIndex,
    getHiddenInputProps,
    getRootProps,
    getThumbProps,
    marks,
    open,
    range,
    trackLeap,
    trackOffset,
    values
  };
}
var React24, INTENTIONAL_DRAG_COUNT_THRESHOLD, axisProps, Identity, cachedSupportsTouchActionNone;
var init_useSlider = __esm({
  "node_modules/@mui/base/SliderUnstyled/useSlider.js"() {
    init_extends();
    React24 = __toESM(require_react());
    init_esm();
    INTENTIONAL_DRAG_COUNT_THRESHOLD = 2;
    axisProps = {
      horizontal: {
        offset: (percent) => ({
          left: `${percent}%`
        }),
        leap: (percent) => ({
          width: `${percent}%`
        })
      },
      "horizontal-reverse": {
        offset: (percent) => ({
          right: `${percent}%`
        }),
        leap: (percent) => ({
          width: `${percent}%`
        })
      },
      vertical: {
        offset: (percent) => ({
          bottom: `${percent}%`
        }),
        leap: (percent) => ({
          height: `${percent}%`
        })
      }
    };
    Identity = (x) => x;
  }
});

// node_modules/@mui/base/SliderUnstyled/SliderUnstyled.js
var React25, import_prop_types14, import_jsx_runtime20, import_jsx_runtime21, _excluded10, Identity2, useUtilityClasses6, Forward, SliderUnstyled, SliderUnstyled_default;
var init_SliderUnstyled = __esm({
  "node_modules/@mui/base/SliderUnstyled/SliderUnstyled.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React25 = __toESM(require_react());
    import_prop_types14 = __toESM(require_prop_types());
    init_clsx_m();
    init_esm();
    init_isHostComponent();
    init_composeClasses();
    init_sliderUnstyledClasses();
    init_SliderValueLabelUnstyled();
    init_useSlider();
    init_useSlotProps();
    import_jsx_runtime20 = __toESM(require_jsx_runtime());
    import_jsx_runtime21 = __toESM(require_jsx_runtime());
    _excluded10 = ["aria-label", "aria-valuetext", "aria-labelledby", "className", "component", "classes", "disableSwap", "disabled", "getAriaLabel", "getAriaValueText", "marks", "max", "min", "name", "onChange", "onChangeCommitted", "orientation", "scale", "step", "tabIndex", "track", "value", "valueLabelDisplay", "valueLabelFormat", "isRtl", "slotProps", "slots"];
    Identity2 = (x) => x;
    useUtilityClasses6 = (ownerState) => {
      const {
        disabled,
        dragging,
        marked,
        orientation,
        track,
        classes
      } = ownerState;
      const slots = {
        root: ["root", disabled && "disabled", dragging && "dragging", marked && "marked", orientation === "vertical" && "vertical", track === "inverted" && "trackInverted", track === false && "trackFalse"],
        rail: ["rail"],
        track: ["track"],
        mark: ["mark"],
        markActive: ["markActive"],
        markLabel: ["markLabel"],
        markLabelActive: ["markLabelActive"],
        valueLabel: ["valueLabel"],
        thumb: ["thumb", disabled && "disabled"],
        active: ["active"],
        disabled: ["disabled"],
        focusVisible: ["focusVisible"]
      };
      return composeClasses(slots, getSliderUtilityClass, classes);
    };
    Forward = ({
      children
    }) => children;
    SliderUnstyled = React25.forwardRef(function SliderUnstyled2(props, ref) {
      var _ref, _slots$rail, _slots$track, _slots$thumb, _slots$valueLabel, _slots$mark, _slots$markLabel;
      const {
        "aria-label": ariaLabel,
        "aria-valuetext": ariaValuetext,
        "aria-labelledby": ariaLabelledby,
        className,
        component,
        classes: classesProp,
        disableSwap = false,
        disabled = false,
        getAriaLabel,
        getAriaValueText,
        marks: marksProp = false,
        max: max2 = 100,
        min: min2 = 0,
        orientation = "horizontal",
        scale = Identity2,
        step = 1,
        track = "normal",
        valueLabelDisplay = "off",
        valueLabelFormat = Identity2,
        isRtl = false,
        slotProps = {},
        slots = {}
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded10);
      const ownerState = _extends({}, props, {
        marks: marksProp,
        classes: classesProp,
        disabled,
        isRtl,
        max: max2,
        min: min2,
        orientation,
        scale,
        step,
        track,
        valueLabelDisplay,
        valueLabelFormat
      });
      const {
        axisProps: axisProps2,
        getRootProps,
        getHiddenInputProps,
        getThumbProps,
        open,
        active,
        axis,
        range,
        focusedThumbIndex,
        dragging,
        marks,
        values,
        trackOffset,
        trackLeap
      } = useSlider(_extends({}, ownerState, {
        ref
      }));
      ownerState.marked = marks.length > 0 && marks.some((mark) => mark.label);
      ownerState.dragging = dragging;
      ownerState.focusedThumbIndex = focusedThumbIndex;
      const classes = useUtilityClasses6(ownerState);
      const Root = (_ref = component != null ? component : slots.root) != null ? _ref : "span";
      const rootProps = useSlotProps({
        elementType: Root,
        getSlotProps: getRootProps,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        ownerState,
        className: [classes.root, className]
      });
      const Rail = (_slots$rail = slots.rail) != null ? _slots$rail : "span";
      const railProps = useSlotProps({
        elementType: Rail,
        externalSlotProps: slotProps.rail,
        ownerState,
        className: classes.rail
      });
      const Track = (_slots$track = slots.track) != null ? _slots$track : "span";
      const trackProps = useSlotProps({
        elementType: Track,
        externalSlotProps: slotProps.track,
        additionalProps: {
          style: _extends({}, axisProps2[axis].offset(trackOffset), axisProps2[axis].leap(trackLeap))
        },
        ownerState,
        className: classes.track
      });
      const Thumb = (_slots$thumb = slots.thumb) != null ? _slots$thumb : "span";
      const thumbProps = useSlotProps({
        elementType: Thumb,
        getSlotProps: getThumbProps,
        externalSlotProps: slotProps.thumb,
        ownerState
      });
      const ValueLabel = (_slots$valueLabel = slots.valueLabel) != null ? _slots$valueLabel : SliderValueLabelUnstyled;
      const valueLabelProps = useSlotProps({
        elementType: ValueLabel,
        externalSlotProps: slotProps.valueLabel,
        ownerState
      });
      const Mark = (_slots$mark = slots.mark) != null ? _slots$mark : "span";
      const markProps = useSlotProps({
        elementType: Mark,
        externalSlotProps: slotProps.mark,
        ownerState,
        className: classes.mark
      });
      const MarkLabel = (_slots$markLabel = slots.markLabel) != null ? _slots$markLabel : "span";
      const markLabelProps = useSlotProps({
        elementType: MarkLabel,
        externalSlotProps: slotProps.markLabel,
        ownerState
      });
      const Input = slots.input || "input";
      const inputProps = useSlotProps({
        elementType: Input,
        getSlotProps: getHiddenInputProps,
        externalSlotProps: slotProps.input,
        ownerState
      });
      return (0, import_jsx_runtime21.jsxs)(Root, _extends({}, rootProps, {
        children: [(0, import_jsx_runtime20.jsx)(Rail, _extends({}, railProps)), (0, import_jsx_runtime20.jsx)(Track, _extends({}, trackProps)), marks.filter((mark) => mark.value >= min2 && mark.value <= max2).map((mark, index) => {
          const percent = valueToPercent(mark.value, min2, max2);
          const style = axisProps2[axis].offset(percent);
          let markActive;
          if (track === false) {
            markActive = values.indexOf(mark.value) !== -1;
          } else {
            markActive = track === "normal" && (range ? mark.value >= values[0] && mark.value <= values[values.length - 1] : mark.value <= values[0]) || track === "inverted" && (range ? mark.value <= values[0] || mark.value >= values[values.length - 1] : mark.value >= values[0]);
          }
          return (0, import_jsx_runtime21.jsxs)(React25.Fragment, {
            children: [(0, import_jsx_runtime20.jsx)(Mark, _extends({
              "data-index": index
            }, markProps, !isHostComponent_default(Mark) && {
              markActive
            }, {
              style: _extends({}, style, markProps.style),
              className: clsx_m_default(markProps.className, markActive && classes.markActive)
            })), mark.label != null ? (0, import_jsx_runtime20.jsx)(MarkLabel, _extends({
              "aria-hidden": true,
              "data-index": index
            }, markLabelProps, !isHostComponent_default(MarkLabel) && {
              markLabelActive: markActive
            }, {
              style: _extends({}, style, markLabelProps.style),
              className: clsx_m_default(classes.markLabel, markLabelProps.className, markActive && classes.markLabelActive),
              children: mark.label
            })) : null]
          }, index);
        }), values.map((value, index) => {
          const percent = valueToPercent(value, min2, max2);
          const style = axisProps2[axis].offset(percent);
          const ValueLabelComponent = valueLabelDisplay === "off" ? Forward : ValueLabel;
          return (0, import_jsx_runtime20.jsx)(React25.Fragment, {
            children: (0, import_jsx_runtime20.jsx)(ValueLabelComponent, _extends({}, !isHostComponent_default(ValueLabelComponent) && {
              valueLabelFormat,
              valueLabelDisplay,
              value: typeof valueLabelFormat === "function" ? valueLabelFormat(scale(value), index) : valueLabelFormat,
              index,
              open: open === index || active === index || valueLabelDisplay === "on",
              disabled
            }, valueLabelProps, {
              className: clsx_m_default(classes.valueLabel, valueLabelProps.className),
              children: (0, import_jsx_runtime20.jsx)(Thumb, _extends({
                "data-index": index,
                "data-focusvisible": focusedThumbIndex === index
              }, thumbProps, {
                className: clsx_m_default(classes.thumb, thumbProps.className, active === index && classes.active, focusedThumbIndex === index && classes.focusVisible),
                style: _extends({}, style, {
                  pointerEvents: disableSwap && active !== index ? "none" : void 0
                }, thumbProps.style),
                children: (0, import_jsx_runtime20.jsx)(Input, _extends({
                  "data-index": index,
                  "aria-label": getAriaLabel ? getAriaLabel(index) : ariaLabel,
                  "aria-valuenow": scale(value),
                  "aria-labelledby": ariaLabelledby,
                  "aria-valuetext": getAriaValueText ? getAriaValueText(scale(value), index) : ariaValuetext,
                  value: values[index]
                }, inputProps))
              }))
            }))
          }, index);
        })]
      }));
    });
    true ? SliderUnstyled.propTypes = {
      "aria-label": chainPropTypes(import_prop_types14.default.string, (props) => {
        const range = Array.isArray(props.value || props.defaultValue);
        if (range && props["aria-label"] != null) {
          return new Error("MUI: You need to use the `getAriaLabel` prop instead of `aria-label` when using a range slider.");
        }
        return null;
      }),
      "aria-labelledby": import_prop_types14.default.string,
      "aria-valuetext": chainPropTypes(import_prop_types14.default.string, (props) => {
        const range = Array.isArray(props.value || props.defaultValue);
        if (range && props["aria-valuetext"] != null) {
          return new Error("MUI: You need to use the `getAriaValueText` prop instead of `aria-valuetext` when using a range slider.");
        }
        return null;
      }),
      children: import_prop_types14.default.node,
      classes: import_prop_types14.default.object,
      className: import_prop_types14.default.string,
      component: import_prop_types14.default.elementType,
      defaultValue: import_prop_types14.default.oneOfType([import_prop_types14.default.arrayOf(import_prop_types14.default.number), import_prop_types14.default.number]),
      disabled: import_prop_types14.default.bool,
      disableSwap: import_prop_types14.default.bool,
      getAriaLabel: import_prop_types14.default.func,
      getAriaValueText: import_prop_types14.default.func,
      isRtl: import_prop_types14.default.bool,
      marks: import_prop_types14.default.oneOfType([import_prop_types14.default.arrayOf(import_prop_types14.default.shape({
        label: import_prop_types14.default.node,
        value: import_prop_types14.default.number.isRequired
      })), import_prop_types14.default.bool]),
      max: import_prop_types14.default.number,
      min: import_prop_types14.default.number,
      name: import_prop_types14.default.string,
      onChange: import_prop_types14.default.func,
      onChangeCommitted: import_prop_types14.default.func,
      orientation: import_prop_types14.default.oneOf(["horizontal", "vertical"]),
      scale: import_prop_types14.default.func,
      slotProps: import_prop_types14.default.shape({
        input: import_prop_types14.default.oneOfType([import_prop_types14.default.func, import_prop_types14.default.object]),
        mark: import_prop_types14.default.oneOfType([import_prop_types14.default.func, import_prop_types14.default.object]),
        markLabel: import_prop_types14.default.oneOfType([import_prop_types14.default.func, import_prop_types14.default.object]),
        rail: import_prop_types14.default.oneOfType([import_prop_types14.default.func, import_prop_types14.default.object]),
        root: import_prop_types14.default.oneOfType([import_prop_types14.default.func, import_prop_types14.default.object]),
        thumb: import_prop_types14.default.oneOfType([import_prop_types14.default.func, import_prop_types14.default.object]),
        track: import_prop_types14.default.oneOfType([import_prop_types14.default.func, import_prop_types14.default.object]),
        valueLabel: import_prop_types14.default.oneOfType([import_prop_types14.default.func, import_prop_types14.default.shape({
          children: import_prop_types14.default.element,
          className: import_prop_types14.default.string,
          open: import_prop_types14.default.bool,
          style: import_prop_types14.default.object,
          value: import_prop_types14.default.number,
          valueLabelDisplay: import_prop_types14.default.oneOf(["auto", "off", "on"])
        })])
      }),
      slots: import_prop_types14.default.shape({
        input: import_prop_types14.default.elementType,
        mark: import_prop_types14.default.elementType,
        markLabel: import_prop_types14.default.elementType,
        rail: import_prop_types14.default.elementType,
        root: import_prop_types14.default.elementType,
        thumb: import_prop_types14.default.elementType,
        track: import_prop_types14.default.elementType,
        valueLabel: import_prop_types14.default.elementType
      }),
      step: import_prop_types14.default.number,
      tabIndex: import_prop_types14.default.number,
      track: import_prop_types14.default.oneOf(["inverted", "normal", false]),
      value: import_prop_types14.default.oneOfType([import_prop_types14.default.arrayOf(import_prop_types14.default.number), import_prop_types14.default.number]),
      valueLabelDisplay: import_prop_types14.default.oneOf(["auto", "off", "on"]),
      valueLabelFormat: import_prop_types14.default.oneOfType([import_prop_types14.default.func, import_prop_types14.default.string])
    } : void 0;
    SliderUnstyled_default = SliderUnstyled;
  }
});

// node_modules/@mui/base/SliderUnstyled/index.js
var init_SliderUnstyled2 = __esm({
  "node_modules/@mui/base/SliderUnstyled/index.js"() {
    init_SliderUnstyled();
    init_SliderValueLabelUnstyled();
    init_sliderUnstyledClasses();
    init_useSlider();
    init_sliderUnstyledClasses();
  }
});

// node_modules/@mui/base/SwitchUnstyled/useSwitch.js
function useSwitch(props) {
  const {
    checked: checkedProp,
    defaultChecked,
    disabled,
    onBlur,
    onChange,
    onFocus,
    onFocusVisible,
    readOnly,
    required
  } = props;
  const [checked, setCheckedState] = useControlled({
    controlled: checkedProp,
    default: Boolean(defaultChecked),
    name: "Switch",
    state: "checked"
  });
  const createHandleInputChange = (otherProps) => (event) => {
    var _otherProps$onChange;
    if (event.nativeEvent.defaultPrevented) {
      return;
    }
    setCheckedState(event.target.checked);
    onChange == null ? void 0 : onChange(event);
    (_otherProps$onChange = otherProps.onChange) == null ? void 0 : _otherProps$onChange.call(otherProps, event);
  };
  const {
    isFocusVisibleRef,
    onBlur: handleBlurVisible,
    onFocus: handleFocusVisible,
    ref: focusVisibleRef
  } = useIsFocusVisible();
  const [focusVisible, setFocusVisible] = React26.useState(false);
  if (disabled && focusVisible) {
    setFocusVisible(false);
  }
  React26.useEffect(() => {
    isFocusVisibleRef.current = focusVisible;
  }, [focusVisible, isFocusVisibleRef]);
  const inputRef = React26.useRef(null);
  const createHandleFocus = (otherProps) => (event) => {
    var _otherProps$onFocus;
    if (!inputRef.current) {
      inputRef.current = event.currentTarget;
    }
    handleFocusVisible(event);
    if (isFocusVisibleRef.current === true) {
      setFocusVisible(true);
      onFocusVisible == null ? void 0 : onFocusVisible(event);
    }
    onFocus == null ? void 0 : onFocus(event);
    (_otherProps$onFocus = otherProps.onFocus) == null ? void 0 : _otherProps$onFocus.call(otherProps, event);
  };
  const createHandleBlur = (otherProps) => (event) => {
    var _otherProps$onBlur;
    handleBlurVisible(event);
    if (isFocusVisibleRef.current === false) {
      setFocusVisible(false);
    }
    onBlur == null ? void 0 : onBlur(event);
    (_otherProps$onBlur = otherProps.onBlur) == null ? void 0 : _otherProps$onBlur.call(otherProps, event);
  };
  const handleRefChange = useForkRef(focusVisibleRef, inputRef);
  const getInputProps = (otherProps = {}) => _extends({
    checked: checkedProp,
    defaultChecked,
    disabled,
    readOnly,
    ref: handleRefChange,
    required,
    type: "checkbox"
  }, otherProps, {
    onChange: createHandleInputChange(otherProps),
    onFocus: createHandleFocus(otherProps),
    onBlur: createHandleBlur(otherProps)
  });
  return {
    checked,
    disabled: Boolean(disabled),
    focusVisible,
    getInputProps,
    readOnly: Boolean(readOnly)
  };
}
var React26;
var init_useSwitch = __esm({
  "node_modules/@mui/base/SwitchUnstyled/useSwitch.js"() {
    init_extends();
    React26 = __toESM(require_react());
    init_esm();
  }
});

// node_modules/@mui/base/SwitchUnstyled/switchUnstyledClasses.js
function getSwitchUnstyledUtilityClass(slot) {
  return generateUtilityClass("MuiSwitch", slot);
}
var switchUnstyledClasses;
var init_switchUnstyledClasses = __esm({
  "node_modules/@mui/base/SwitchUnstyled/switchUnstyledClasses.js"() {
    init_generateUtilityClass();
    init_generateUtilityClasses();
    switchUnstyledClasses = generateUtilityClasses("MuiSwitch", ["root", "input", "track", "thumb", "checked", "disabled", "focusVisible", "readOnly"]);
  }
});

// node_modules/@mui/base/SwitchUnstyled/SwitchUnstyled.js
var React27, import_prop_types15, import_jsx_runtime22, import_jsx_runtime23, _excluded11, useUtilityClasses7, SwitchUnstyled;
var init_SwitchUnstyled = __esm({
  "node_modules/@mui/base/SwitchUnstyled/SwitchUnstyled.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React27 = __toESM(require_react());
    import_prop_types15 = __toESM(require_prop_types());
    init_composeClasses();
    init_useSwitch();
    init_switchUnstyledClasses();
    init_utils();
    import_jsx_runtime22 = __toESM(require_jsx_runtime());
    import_jsx_runtime23 = __toESM(require_jsx_runtime());
    _excluded11 = ["checked", "component", "defaultChecked", "disabled", "onBlur", "onChange", "onFocus", "onFocusVisible", "readOnly", "required", "slotProps", "slots"];
    useUtilityClasses7 = (ownerState) => {
      const {
        checked,
        disabled,
        focusVisible,
        readOnly
      } = ownerState;
      const slots = {
        root: ["root", checked && "checked", disabled && "disabled", focusVisible && "focusVisible", readOnly && "readOnly"],
        thumb: ["thumb"],
        input: ["input"],
        track: ["track"]
      };
      return composeClasses(slots, getSwitchUnstyledUtilityClass, {});
    };
    SwitchUnstyled = React27.forwardRef(function SwitchUnstyled2(props, ref) {
      var _ref, _slots$thumb, _slots$input, _slots$track;
      const {
        checked: checkedProp,
        component,
        defaultChecked,
        disabled: disabledProp,
        onBlur,
        onChange,
        onFocus,
        onFocusVisible,
        readOnly: readOnlyProp,
        slotProps = {},
        slots = {}
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded11);
      const useSwitchProps = {
        checked: checkedProp,
        defaultChecked,
        disabled: disabledProp,
        onBlur,
        onChange,
        onFocus,
        onFocusVisible,
        readOnly: readOnlyProp
      };
      const {
        getInputProps,
        checked,
        disabled,
        focusVisible,
        readOnly
      } = useSwitch(useSwitchProps);
      const ownerState = _extends({}, props, {
        checked,
        disabled,
        focusVisible,
        readOnly
      });
      const classes = useUtilityClasses7(ownerState);
      const Root = (_ref = component != null ? component : slots.root) != null ? _ref : "span";
      const rootProps = useSlotProps({
        elementType: Root,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        additionalProps: {
          ref
        },
        ownerState,
        className: classes.root
      });
      const Thumb = (_slots$thumb = slots.thumb) != null ? _slots$thumb : "span";
      const thumbProps = useSlotProps({
        elementType: Thumb,
        externalSlotProps: slotProps.thumb,
        ownerState,
        className: classes.thumb
      });
      const Input = (_slots$input = slots.input) != null ? _slots$input : "input";
      const inputProps = useSlotProps({
        elementType: Input,
        getSlotProps: getInputProps,
        externalSlotProps: slotProps.input,
        ownerState,
        className: classes.input
      });
      const Track = slots.track === null ? () => null : (_slots$track = slots.track) != null ? _slots$track : "span";
      const trackProps = useSlotProps({
        elementType: Track,
        externalSlotProps: slotProps.track,
        ownerState,
        className: classes.track
      });
      return (0, import_jsx_runtime23.jsxs)(Root, _extends({}, rootProps, {
        children: [(0, import_jsx_runtime22.jsx)(Track, _extends({}, trackProps)), (0, import_jsx_runtime22.jsx)(Thumb, _extends({}, thumbProps)), (0, import_jsx_runtime22.jsx)(Input, _extends({}, inputProps))]
      }));
    });
    true ? SwitchUnstyled.propTypes = {
      checked: import_prop_types15.default.bool,
      children: import_prop_types15.default.node,
      component: import_prop_types15.default.elementType,
      defaultChecked: import_prop_types15.default.bool,
      disabled: import_prop_types15.default.bool,
      onBlur: import_prop_types15.default.func,
      onChange: import_prop_types15.default.func,
      onFocus: import_prop_types15.default.func,
      onFocusVisible: import_prop_types15.default.func,
      readOnly: import_prop_types15.default.bool,
      required: import_prop_types15.default.bool,
      slotProps: import_prop_types15.default.shape({
        input: import_prop_types15.default.oneOfType([import_prop_types15.default.func, import_prop_types15.default.object]),
        root: import_prop_types15.default.oneOfType([import_prop_types15.default.func, import_prop_types15.default.object]),
        thumb: import_prop_types15.default.oneOfType([import_prop_types15.default.func, import_prop_types15.default.object]),
        track: import_prop_types15.default.oneOfType([import_prop_types15.default.func, import_prop_types15.default.object])
      }),
      slots: import_prop_types15.default.shape({
        input: import_prop_types15.default.elementType,
        root: import_prop_types15.default.elementType,
        thumb: import_prop_types15.default.elementType,
        track: import_prop_types15.default.oneOfType([import_prop_types15.default.elementType, import_prop_types15.default.oneOf([null])])
      })
    } : void 0;
  }
});

// node_modules/@mui/base/SwitchUnstyled/SwitchUnstyled.types.js
var init_SwitchUnstyled_types = __esm({
  "node_modules/@mui/base/SwitchUnstyled/SwitchUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/SwitchUnstyled/useSwitch.types.js
var init_useSwitch_types = __esm({
  "node_modules/@mui/base/SwitchUnstyled/useSwitch.types.js"() {
  }
});

// node_modules/@mui/base/SwitchUnstyled/index.js
var init_SwitchUnstyled2 = __esm({
  "node_modules/@mui/base/SwitchUnstyled/index.js"() {
    init_SwitchUnstyled();
    init_SwitchUnstyled_types();
    init_useSwitch();
    init_useSwitch_types();
    init_switchUnstyledClasses();
    init_switchUnstyledClasses();
  }
});

// node_modules/@mui/base/TabsUnstyled/useTabs.js
var React28, useTabs, useTabs_default;
var init_useTabs = __esm({
  "node_modules/@mui/base/TabsUnstyled/useTabs.js"() {
    React28 = __toESM(require_react());
    init_esm();
    useTabs = (parameters) => {
      const {
        value: valueProp,
        defaultValue,
        onChange,
        orientation,
        direction,
        selectionFollowsFocus
      } = parameters;
      const [value, setValue] = useControlled({
        controlled: valueProp,
        default: defaultValue,
        name: "Tabs",
        state: "value"
      });
      const idPrefix = useId();
      const onSelected = React28.useCallback((e, newValue) => {
        setValue(newValue);
        if (onChange) {
          onChange(e, newValue);
        }
      }, [onChange, setValue]);
      const tabsContextValue = React28.useMemo(() => {
        return {
          idPrefix,
          value,
          onSelected,
          orientation,
          direction,
          selectionFollowsFocus
        };
      }, [idPrefix, value, onSelected, orientation, direction, selectionFollowsFocus]);
      return {
        tabsContextValue
      };
    };
    useTabs_default = useTabs;
  }
});

// node_modules/@mui/base/TabsUnstyled/TabsContext.js
function useTabContext() {
  return React29.useContext(Context);
}
function getPanelId(context, value) {
  const {
    idPrefix
  } = context;
  if (idPrefix === null) {
    return null;
  }
  return `${context.idPrefix}-P-${value}`;
}
function getTabId(context, value) {
  const {
    idPrefix
  } = context;
  if (idPrefix === null) {
    return null;
  }
  return `${context.idPrefix}-T-${value}`;
}
var React29, Context, TabsContext_default;
var init_TabsContext = __esm({
  "node_modules/@mui/base/TabsUnstyled/TabsContext.js"() {
    React29 = __toESM(require_react());
    Context = React29.createContext(null);
    if (true) {
      Context.displayName = "TabsContext";
    }
    TabsContext_default = Context;
  }
});

// node_modules/@mui/base/TabsUnstyled/tabsUnstyledClasses.js
function getTabsUnstyledUtilityClass(slot) {
  return generateUtilityClass("MuiTabs", slot);
}
var tabsUnstyledClasses;
var init_tabsUnstyledClasses = __esm({
  "node_modules/@mui/base/TabsUnstyled/tabsUnstyledClasses.js"() {
    init_generateUtilityClass();
    init_generateUtilityClasses();
    tabsUnstyledClasses = generateUtilityClasses("MuiTabs", ["root", "horizontal", "vertical"]);
  }
});

// node_modules/@mui/base/TabsUnstyled/TabsUnstyled.js
var React30, import_prop_types16, import_jsx_runtime24, _excluded12, useUtilityClasses8, TabsUnstyled;
var init_TabsUnstyled = __esm({
  "node_modules/@mui/base/TabsUnstyled/TabsUnstyled.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React30 = __toESM(require_react());
    import_prop_types16 = __toESM(require_prop_types());
    init_utils();
    init_composeClasses();
    init_tabsUnstyledClasses();
    init_useTabs();
    init_TabsContext();
    import_jsx_runtime24 = __toESM(require_jsx_runtime());
    _excluded12 = ["children", "value", "defaultValue", "orientation", "direction", "component", "onChange", "selectionFollowsFocus", "slotProps", "slots"];
    useUtilityClasses8 = (ownerState) => {
      const {
        orientation
      } = ownerState;
      const slots = {
        root: ["root", orientation]
      };
      return composeClasses(slots, getTabsUnstyledUtilityClass, {});
    };
    TabsUnstyled = React30.forwardRef((props, ref) => {
      var _ref;
      const {
        children,
        orientation = "horizontal",
        direction = "ltr",
        component,
        slotProps = {},
        slots = {}
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded12);
      const {
        tabsContextValue
      } = useTabs_default(props);
      const ownerState = _extends({}, props, {
        orientation,
        direction
      });
      const classes = useUtilityClasses8(ownerState);
      const TabsRoot = (_ref = component != null ? component : slots.root) != null ? _ref : "div";
      const tabsRootProps = useSlotProps({
        elementType: TabsRoot,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        additionalProps: {
          ref
        },
        ownerState,
        className: classes.root
      });
      return (0, import_jsx_runtime24.jsx)(TabsRoot, _extends({}, tabsRootProps, {
        children: (0, import_jsx_runtime24.jsx)(TabsContext_default.Provider, {
          value: tabsContextValue,
          children
        })
      }));
    });
    true ? TabsUnstyled.propTypes = {
      children: import_prop_types16.default.node,
      component: import_prop_types16.default.elementType,
      defaultValue: import_prop_types16.default.oneOfType([import_prop_types16.default.oneOf([false]), import_prop_types16.default.number, import_prop_types16.default.string]),
      direction: import_prop_types16.default.oneOf(["ltr", "rtl"]),
      onChange: import_prop_types16.default.func,
      orientation: import_prop_types16.default.oneOf(["horizontal", "vertical"]),
      selectionFollowsFocus: import_prop_types16.default.bool,
      slotProps: import_prop_types16.default.shape({
        root: import_prop_types16.default.oneOfType([import_prop_types16.default.func, import_prop_types16.default.object])
      }),
      slots: import_prop_types16.default.shape({
        root: import_prop_types16.default.elementType
      }),
      value: import_prop_types16.default.oneOfType([import_prop_types16.default.oneOf([false]), import_prop_types16.default.number, import_prop_types16.default.string])
    } : void 0;
  }
});

// node_modules/@mui/base/TabsUnstyled/TabsUnstyled.types.js
var init_TabsUnstyled_types = __esm({
  "node_modules/@mui/base/TabsUnstyled/TabsUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/TabsUnstyled/index.js
var init_TabsUnstyled2 = __esm({
  "node_modules/@mui/base/TabsUnstyled/index.js"() {
    init_TabsUnstyled();
    init_TabsContext();
    init_TabsContext();
    init_tabsUnstyledClasses();
    init_tabsUnstyledClasses();
    init_TabsUnstyled_types();
    init_useTabs();
    init_useTabs();
  }
});

// node_modules/@mui/base/TabPanelUnstyled/useTabPanel.js
var useTabPanel, useTabPanel_default;
var init_useTabPanel = __esm({
  "node_modules/@mui/base/TabPanelUnstyled/useTabPanel.js"() {
    init_TabsUnstyled2();
    useTabPanel = (parameters) => {
      const {
        value
      } = parameters;
      const context = useTabContext();
      if (context === null) {
        throw new Error("No TabContext provided");
      }
      const hidden = value !== context.value;
      const id = getPanelId(context, value);
      const tabId = getTabId(context, value);
      const getRootProps = () => {
        return {
          "aria-labelledby": tabId != null ? tabId : void 0,
          hidden,
          id: id != null ? id : void 0
        };
      };
      return {
        hidden,
        getRootProps
      };
    };
    useTabPanel_default = useTabPanel;
  }
});

// node_modules/@mui/base/TabPanelUnstyled/tabPanelUnstyledClasses.js
function getTabPanelUnstyledUtilityClass(slot) {
  return generateUtilityClass("MuiTabPanel", slot);
}
var tabPanelUnstyledClasses;
var init_tabPanelUnstyledClasses = __esm({
  "node_modules/@mui/base/TabPanelUnstyled/tabPanelUnstyledClasses.js"() {
    init_generateUtilityClass();
    init_generateUtilityClasses();
    tabPanelUnstyledClasses = generateUtilityClasses("MuiTabPanel", ["root", "hidden"]);
  }
});

// node_modules/@mui/base/TabPanelUnstyled/TabPanelUnstyled.js
var React31, import_prop_types17, import_jsx_runtime25, _excluded13, useUtilityClasses9, TabPanelUnstyled;
var init_TabPanelUnstyled = __esm({
  "node_modules/@mui/base/TabPanelUnstyled/TabPanelUnstyled.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React31 = __toESM(require_react());
    import_prop_types17 = __toESM(require_prop_types());
    init_utils();
    init_composeClasses();
    init_tabPanelUnstyledClasses();
    init_useTabPanel();
    import_jsx_runtime25 = __toESM(require_jsx_runtime());
    _excluded13 = ["children", "component", "value", "slotProps", "slots"];
    useUtilityClasses9 = (ownerState) => {
      const {
        hidden
      } = ownerState;
      const slots = {
        root: ["root", hidden && "hidden"]
      };
      return composeClasses(slots, getTabPanelUnstyledUtilityClass, {});
    };
    TabPanelUnstyled = React31.forwardRef(function TabPanelUnstyled2(props, ref) {
      var _ref;
      const {
        children,
        component,
        slotProps = {},
        slots = {}
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded13);
      const {
        hidden,
        getRootProps
      } = useTabPanel_default(props);
      const ownerState = _extends({}, props, {
        hidden
      });
      const classes = useUtilityClasses9(ownerState);
      const TabPanelRoot = (_ref = component != null ? component : slots.root) != null ? _ref : "div";
      const tabPanelRootProps = useSlotProps({
        elementType: TabPanelRoot,
        getSlotProps: getRootProps,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        additionalProps: {
          role: "tabpanel",
          ref
        },
        ownerState,
        className: classes.root
      });
      return (0, import_jsx_runtime25.jsx)(TabPanelRoot, _extends({}, tabPanelRootProps, {
        children: !hidden && children
      }));
    });
    true ? TabPanelUnstyled.propTypes = {
      children: import_prop_types17.default.node,
      component: import_prop_types17.default.elementType,
      slotProps: import_prop_types17.default.shape({
        root: import_prop_types17.default.oneOfType([import_prop_types17.default.func, import_prop_types17.default.object])
      }),
      slots: import_prop_types17.default.shape({
        root: import_prop_types17.default.elementType
      }),
      value: import_prop_types17.default.oneOfType([import_prop_types17.default.number, import_prop_types17.default.string]).isRequired
    } : void 0;
  }
});

// node_modules/@mui/base/TabPanelUnstyled/TabPanelUnstyled.types.js
var init_TabPanelUnstyled_types = __esm({
  "node_modules/@mui/base/TabPanelUnstyled/TabPanelUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/TabPanelUnstyled/index.js
var init_TabPanelUnstyled2 = __esm({
  "node_modules/@mui/base/TabPanelUnstyled/index.js"() {
    init_TabPanelUnstyled();
    init_TabPanelUnstyled_types();
    init_tabPanelUnstyledClasses();
    init_tabPanelUnstyledClasses();
    init_useTabPanel();
  }
});

// node_modules/@mui/base/TabsListUnstyled/useTabsList.js
var React32, import_react_is, nextItem, previousItem, moveFocus, useTabsList, useTabsList_default;
var init_useTabsList = __esm({
  "node_modules/@mui/base/TabsListUnstyled/useTabsList.js"() {
    init_extends();
    React32 = __toESM(require_react());
    init_esm();
    import_react_is = __toESM(require_react_is());
    init_TabsUnstyled2();
    init_extractEventHandlers();
    nextItem = (list, item) => {
      if (!list) {
        return null;
      }
      if (list === item) {
        return list.firstChild;
      }
      if (item && item.nextElementSibling) {
        return item.nextElementSibling;
      }
      return list.firstChild;
    };
    previousItem = (list, item) => {
      if (!list) {
        return null;
      }
      if (list === item) {
        return list.lastChild;
      }
      if (item && item.previousElementSibling) {
        return item.previousElementSibling;
      }
      return list.lastChild;
    };
    moveFocus = (list, currentFocus, traversalFunction) => {
      let wrappedOnce = false;
      let nextFocus = traversalFunction(list, currentFocus);
      while (list && nextFocus) {
        if (nextFocus === list.firstChild) {
          if (wrappedOnce) {
            return;
          }
          wrappedOnce = true;
        }
        const nextFocusDisabled = nextFocus.disabled || nextFocus.getAttribute("aria-disabled") === "true";
        if (!nextFocus.hasAttribute("tabindex") || nextFocusDisabled) {
          nextFocus = traversalFunction(list, nextFocus);
        } else {
          nextFocus.focus();
          return;
        }
      }
    };
    useTabsList = (parameters) => {
      const {
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledBy,
        children,
        ref
      } = parameters;
      const tabsListRef = React32.createRef();
      const handleRef = useForkRef(tabsListRef, ref);
      const context = useTabContext();
      if (context === null) {
        throw new Error("No TabContext provided");
      }
      const {
        value,
        orientation = "horizontal",
        direction = "ltr"
      } = context;
      const isRtl = direction === "rtl";
      const handleKeyDown2 = (event) => {
        const list = tabsListRef.current;
        const currentFocus = ownerDocument(list).activeElement;
        const role = currentFocus == null ? void 0 : currentFocus.getAttribute("role");
        if (role !== "tab") {
          return;
        }
        let previousItemKey = orientation === "horizontal" ? "ArrowLeft" : "ArrowUp";
        let nextItemKey = orientation === "horizontal" ? "ArrowRight" : "ArrowDown";
        if (orientation === "horizontal" && isRtl) {
          previousItemKey = "ArrowRight";
          nextItemKey = "ArrowLeft";
        }
        switch (event.key) {
          case previousItemKey:
            event.preventDefault();
            moveFocus(list, currentFocus, previousItem);
            break;
          case nextItemKey:
            event.preventDefault();
            moveFocus(list, currentFocus, nextItem);
            break;
          case "Home":
            event.preventDefault();
            moveFocus(list, null, nextItem);
            break;
          case "End":
            event.preventDefault();
            moveFocus(list, null, previousItem);
            break;
          default:
            break;
        }
      };
      const createHandleKeyDown = (otherHandlers) => (event) => {
        var _otherHandlers$onKeyD;
        handleKeyDown2(event);
        (_otherHandlers$onKeyD = otherHandlers.onKeyDown) == null ? void 0 : _otherHandlers$onKeyD.call(otherHandlers, event);
      };
      const getRootProps = (otherHandlers = {}) => {
        const propsEventHandlers = extractEventHandlers(parameters);
        const externalEventHandlers = _extends({}, propsEventHandlers, otherHandlers);
        const ownEventHandlers = {
          onKeyDown: createHandleKeyDown(externalEventHandlers)
        };
        const mergedEventHandlers = _extends({}, externalEventHandlers, ownEventHandlers);
        return _extends({
          "aria-label": ariaLabel,
          "aria-labelledby": ariaLabelledBy,
          "aria-orientation": orientation === "vertical" ? "vertical" : void 0,
          role: "tablist",
          ref: handleRef
        }, mergedEventHandlers);
      };
      const processChildren = React32.useCallback(() => {
        const valueToIndex = /* @__PURE__ */ new Map();
        let childIndex = 0;
        const processedChildren = React32.Children.map(children, (child) => {
          if (!React32.isValidElement(child)) {
            return null;
          }
          if (true) {
            if ((0, import_react_is.isFragment)(child)) {
              console.error(["MUI: The Tabs component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join("\n"));
            }
          }
          const childValue = child.props.value === void 0 ? childIndex : child.props.value;
          valueToIndex.set(childValue, childIndex);
          childIndex += 1;
          return React32.cloneElement(child, _extends({
            value: childValue
          }, childIndex === 1 && value === false && !child.props.tabIndex || value === childValue ? {
            tabIndex: 0
          } : {
            tabIndex: -1
          }));
        });
        return processedChildren;
      }, [children, value]);
      return {
        isRtl,
        orientation,
        value,
        processChildren,
        getRootProps
      };
    };
    useTabsList_default = useTabsList;
  }
});

// node_modules/@mui/base/TabsListUnstyled/tabsListUnstyledClasses.js
function getTabsListUnstyledUtilityClass(slot) {
  return generateUtilityClass("MuiTabsList", slot);
}
var tabsListUnstyledClasses;
var init_tabsListUnstyledClasses = __esm({
  "node_modules/@mui/base/TabsListUnstyled/tabsListUnstyledClasses.js"() {
    init_generateUtilityClass();
    init_generateUtilityClasses();
    tabsListUnstyledClasses = generateUtilityClasses("MuiTabsList", ["root", "horizontal", "vertical"]);
  }
});

// node_modules/@mui/base/TabsListUnstyled/TabsListUnstyled.js
var React33, import_prop_types18, import_jsx_runtime26, _excluded14, useUtilityClasses10, TabsListUnstyled;
var init_TabsListUnstyled = __esm({
  "node_modules/@mui/base/TabsListUnstyled/TabsListUnstyled.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React33 = __toESM(require_react());
    import_prop_types18 = __toESM(require_prop_types());
    init_composeClasses();
    init_utils();
    init_tabsListUnstyledClasses();
    init_useTabsList();
    import_jsx_runtime26 = __toESM(require_jsx_runtime());
    _excluded14 = ["children", "component", "slotProps", "slots"];
    useUtilityClasses10 = (ownerState) => {
      const {
        orientation
      } = ownerState;
      const slots = {
        root: ["root", orientation]
      };
      return composeClasses(slots, getTabsListUnstyledUtilityClass, {});
    };
    TabsListUnstyled = React33.forwardRef((props, ref) => {
      var _ref;
      const {
        component,
        slotProps = {},
        slots = {}
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded14);
      const {
        isRtl,
        orientation,
        getRootProps,
        processChildren
      } = useTabsList_default(_extends({}, props, {
        ref
      }));
      const ownerState = _extends({}, props, {
        isRtl,
        orientation
      });
      const classes = useUtilityClasses10(ownerState);
      const TabsListRoot = (_ref = component != null ? component : slots.root) != null ? _ref : "div";
      const tabsListRootProps = useSlotProps({
        elementType: TabsListRoot,
        getSlotProps: getRootProps,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        ownerState,
        className: classes.root
      });
      const processedChildren = processChildren();
      return (0, import_jsx_runtime26.jsx)(TabsListRoot, _extends({}, tabsListRootProps, {
        children: processedChildren
      }));
    });
    true ? TabsListUnstyled.propTypes = {
      children: import_prop_types18.default.node,
      component: import_prop_types18.default.elementType,
      slotProps: import_prop_types18.default.shape({
        root: import_prop_types18.default.oneOfType([import_prop_types18.default.func, import_prop_types18.default.object])
      }),
      slots: import_prop_types18.default.shape({
        root: import_prop_types18.default.elementType
      })
    } : void 0;
  }
});

// node_modules/@mui/base/TabsListUnstyled/TabsListUnstyled.types.js
var init_TabsListUnstyled_types = __esm({
  "node_modules/@mui/base/TabsListUnstyled/TabsListUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/TabsListUnstyled/useTabsList.types.js
var init_useTabsList_types = __esm({
  "node_modules/@mui/base/TabsListUnstyled/useTabsList.types.js"() {
  }
});

// node_modules/@mui/base/TabsListUnstyled/index.js
var init_TabsListUnstyled2 = __esm({
  "node_modules/@mui/base/TabsListUnstyled/index.js"() {
    init_TabsListUnstyled();
    init_TabsListUnstyled_types();
    init_tabsListUnstyledClasses();
    init_tabsListUnstyledClasses();
    init_useTabsList();
    init_useTabsList_types();
  }
});

// node_modules/@mui/base/TabUnstyled/useTab.js
var _excluded15, useTab, useTab_default;
var init_useTab = __esm({
  "node_modules/@mui/base/TabUnstyled/useTab.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    init_TabsUnstyled2();
    init_ButtonUnstyled2();
    _excluded15 = ["getRootProps"];
    useTab = (parameters) => {
      var _getPanelId, _getTabId;
      const {
        value: valueProp,
        onChange,
        onClick,
        onFocus
      } = parameters;
      const _useButton = useButton(parameters), {
        getRootProps: getRootPropsButton
      } = _useButton, otherButtonProps = _objectWithoutPropertiesLoose(_useButton, _excluded15);
      const context = useTabContext();
      if (context === null) {
        throw new Error("No TabContext provided");
      }
      const value = valueProp != null ? valueProp : 0;
      const selected = context.value === value;
      const selectionFollowsFocus = context.selectionFollowsFocus;
      const a11yAttributes = {
        role: "tab",
        "aria-controls": (_getPanelId = getPanelId(context, value)) != null ? _getPanelId : void 0,
        id: (_getTabId = getTabId(context, value)) != null ? _getTabId : void 0,
        "aria-selected": selected,
        disabled: otherButtonProps.disabled
      };
      const createHandleFocus = (otherHandlers) => (event) => {
        var _otherHandlers$onFocu;
        (_otherHandlers$onFocu = otherHandlers.onFocus) == null ? void 0 : _otherHandlers$onFocu.call(otherHandlers, event);
        if (event.defaultPrevented) {
          return;
        }
        if (selectionFollowsFocus && !selected) {
          if (onChange) {
            onChange(event, value);
          }
          context.onSelected(event, value);
        }
        if (onFocus) {
          onFocus(event);
        }
      };
      const createHandleClick = (otherHandlers) => (event) => {
        var _otherHandlers$onClic;
        (_otherHandlers$onClic = otherHandlers.onClick) == null ? void 0 : _otherHandlers$onClic.call(otherHandlers, event);
        if (event.defaultPrevented) {
          return;
        }
        if (!selected) {
          if (onChange) {
            onChange(event, value);
          }
          context.onSelected(event, value);
        }
        if (onClick) {
          onClick(event);
        }
      };
      const getRootProps = (otherHandlers = {}) => {
        const buttonResolvedProps = getRootPropsButton(_extends({}, otherHandlers, {
          onClick: createHandleClick(otherHandlers),
          onFocus: createHandleFocus(otherHandlers)
        }));
        return _extends({}, buttonResolvedProps, a11yAttributes);
      };
      return _extends({
        getRootProps
      }, otherButtonProps, {
        selected
      });
    };
    useTab_default = useTab;
  }
});

// node_modules/@mui/base/TabUnstyled/tabUnstyledClasses.js
function getTabUnstyledUtilityClass(slot) {
  return generateUtilityClass("MuiTab", slot);
}
var tabUnstyledClasses;
var init_tabUnstyledClasses = __esm({
  "node_modules/@mui/base/TabUnstyled/tabUnstyledClasses.js"() {
    init_generateUtilityClass();
    init_generateUtilityClasses();
    tabUnstyledClasses = generateUtilityClasses("MuiTab", ["root", "selected", "disabled"]);
  }
});

// node_modules/@mui/base/TabUnstyled/TabUnstyled.js
var React34, import_prop_types19, import_jsx_runtime27, _excluded16, useUtilityClasses11, TabUnstyled;
var init_TabUnstyled = __esm({
  "node_modules/@mui/base/TabUnstyled/TabUnstyled.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React34 = __toESM(require_react());
    import_prop_types19 = __toESM(require_prop_types());
    init_esm();
    init_composeClasses();
    init_tabUnstyledClasses();
    init_useTab();
    init_utils();
    import_jsx_runtime27 = __toESM(require_jsx_runtime());
    _excluded16 = ["action", "children", "value", "disabled", "onChange", "onClick", "onFocus", "component", "slotProps", "slots"];
    useUtilityClasses11 = (ownerState) => {
      const {
        selected,
        disabled
      } = ownerState;
      const slots = {
        root: ["root", selected && "selected", disabled && "disabled"]
      };
      return composeClasses(slots, getTabUnstyledUtilityClass, {});
    };
    TabUnstyled = React34.forwardRef(function TabUnstyled2(props, ref) {
      var _ref;
      const {
        action,
        children,
        disabled = false,
        component,
        slotProps = {},
        slots = {}
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded16);
      const tabRef = React34.useRef();
      const handleRef = useForkRef(tabRef, ref);
      const {
        active,
        focusVisible,
        setFocusVisible,
        selected,
        getRootProps
      } = useTab_default(_extends({}, props, {
        ref: handleRef
      }));
      React34.useImperativeHandle(action, () => ({
        focusVisible: () => {
          setFocusVisible(true);
          tabRef.current.focus();
        }
      }), [setFocusVisible]);
      const ownerState = _extends({}, props, {
        active,
        focusVisible,
        disabled,
        selected
      });
      const classes = useUtilityClasses11(ownerState);
      const TabRoot = (_ref = component != null ? component : slots.root) != null ? _ref : "button";
      const tabRootProps = useSlotProps({
        elementType: TabRoot,
        getSlotProps: getRootProps,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        additionalProps: {
          ref
        },
        ownerState,
        className: classes.root
      });
      return (0, import_jsx_runtime27.jsx)(TabRoot, _extends({}, tabRootProps, {
        children
      }));
    });
    true ? TabUnstyled.propTypes = {
      action: import_prop_types19.default.oneOfType([import_prop_types19.default.func, import_prop_types19.default.shape({
        current: import_prop_types19.default.shape({
          focusVisible: import_prop_types19.default.func.isRequired
        })
      })]),
      children: import_prop_types19.default.node,
      component: import_prop_types19.default.elementType,
      disabled: import_prop_types19.default.bool,
      onChange: import_prop_types19.default.func,
      onClick: import_prop_types19.default.func,
      onFocus: import_prop_types19.default.func,
      slotProps: import_prop_types19.default.shape({
        root: import_prop_types19.default.oneOfType([import_prop_types19.default.func, import_prop_types19.default.object])
      }),
      slots: import_prop_types19.default.shape({
        root: import_prop_types19.default.elementType
      }),
      value: import_prop_types19.default.oneOfType([import_prop_types19.default.number, import_prop_types19.default.string])
    } : void 0;
  }
});

// node_modules/@mui/base/TabUnstyled/TabUnstyled.types.js
var init_TabUnstyled_types = __esm({
  "node_modules/@mui/base/TabUnstyled/TabUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/TabUnstyled/useTab.types.js
var init_useTab_types = __esm({
  "node_modules/@mui/base/TabUnstyled/useTab.types.js"() {
  }
});

// node_modules/@mui/base/TabUnstyled/index.js
var init_TabUnstyled2 = __esm({
  "node_modules/@mui/base/TabUnstyled/index.js"() {
    init_TabUnstyled();
    init_TabUnstyled_types();
    init_tabUnstyledClasses();
    init_tabUnstyledClasses();
    init_useTab();
    init_useTab_types();
  }
});

// node_modules/@mui/base/FormControlUnstyled/FormControlUnstyledContext.js
var React35, FormControlUnstyledContext, FormControlUnstyledContext_default;
var init_FormControlUnstyledContext = __esm({
  "node_modules/@mui/base/FormControlUnstyled/FormControlUnstyledContext.js"() {
    React35 = __toESM(require_react());
    FormControlUnstyledContext = React35.createContext(void 0);
    if (true) {
      FormControlUnstyledContext.displayName = "FormControlUnstyledContext";
    }
    FormControlUnstyledContext_default = FormControlUnstyledContext;
  }
});

// node_modules/@mui/base/FormControlUnstyled/formControlUnstyledClasses.js
function getFormControlUnstyledUtilityClass(slot) {
  return generateUtilityClass("MuiFormControl", slot);
}
var formControlUnstyledClasses;
var init_formControlUnstyledClasses = __esm({
  "node_modules/@mui/base/FormControlUnstyled/formControlUnstyledClasses.js"() {
    init_generateUtilityClass();
    init_generateUtilityClasses();
    formControlUnstyledClasses = generateUtilityClasses("MuiFormControl", ["root", "disabled", "error", "filled", "focused", "required"]);
  }
});

// node_modules/@mui/base/FormControlUnstyled/FormControlUnstyled.js
function hasValue(value) {
  return value != null && !(Array.isArray(value) && value.length === 0) && value !== "";
}
function useUtilityClasses12(ownerState) {
  const {
    disabled,
    error,
    filled,
    focused,
    required
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", focused && "focused", error && "error", filled && "filled", required && "required"]
  };
  return composeClasses(slots, getFormControlUnstyledUtilityClass, {});
}
var React36, import_prop_types20, import_jsx_runtime28, _excluded17, FormControlUnstyled;
var init_FormControlUnstyled = __esm({
  "node_modules/@mui/base/FormControlUnstyled/FormControlUnstyled.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React36 = __toESM(require_react());
    import_prop_types20 = __toESM(require_prop_types());
    init_esm();
    init_FormControlUnstyledContext();
    init_formControlUnstyledClasses();
    init_utils();
    init_composeClasses();
    import_jsx_runtime28 = __toESM(require_jsx_runtime());
    _excluded17 = ["defaultValue", "children", "component", "disabled", "error", "onChange", "required", "slotProps", "slots", "value"];
    FormControlUnstyled = React36.forwardRef(function FormControlUnstyled2(props, ref) {
      var _ref;
      const {
        defaultValue,
        children,
        component,
        disabled = false,
        error = false,
        onChange,
        required = false,
        slotProps = {},
        slots = {},
        value: incomingValue
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded17);
      const [value, setValue] = useControlled({
        controlled: incomingValue,
        default: defaultValue,
        name: "FormControl",
        state: "value"
      });
      const filled = hasValue(value);
      const [focusedState, setFocused] = React36.useState(false);
      const focused = focusedState && !disabled;
      React36.useEffect(() => setFocused((isFocused) => disabled ? false : isFocused), [disabled]);
      const ownerState = _extends({}, props, {
        disabled,
        error,
        filled,
        focused,
        required
      });
      const childContext = React36.useMemo(() => {
        return {
          disabled,
          error,
          filled,
          focused,
          onBlur: () => {
            setFocused(false);
          },
          onChange: (event) => {
            setValue(event.target.value);
            onChange == null ? void 0 : onChange(event);
          },
          onFocus: () => {
            setFocused(true);
          },
          required,
          value: value != null ? value : ""
        };
      }, [disabled, error, filled, focused, onChange, required, setValue, value]);
      const classes = useUtilityClasses12(ownerState);
      const renderChildren = () => {
        if (typeof children === "function") {
          return children(childContext);
        }
        return children;
      };
      const Root = (_ref = component != null ? component : slots.root) != null ? _ref : "div";
      const rootProps = useSlotProps({
        elementType: Root,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        additionalProps: {
          ref,
          children: renderChildren()
        },
        ownerState,
        className: classes.root
      });
      return (0, import_jsx_runtime28.jsx)(FormControlUnstyledContext_default.Provider, {
        value: childContext,
        children: (0, import_jsx_runtime28.jsx)(Root, _extends({}, rootProps))
      });
    });
    true ? FormControlUnstyled.propTypes = {
      children: import_prop_types20.default.oneOfType([import_prop_types20.default.node, import_prop_types20.default.func]),
      component: import_prop_types20.default.elementType,
      defaultValue: import_prop_types20.default.any,
      disabled: import_prop_types20.default.bool,
      error: import_prop_types20.default.bool,
      onChange: import_prop_types20.default.func,
      required: import_prop_types20.default.bool,
      slotProps: import_prop_types20.default.shape({
        root: import_prop_types20.default.oneOfType([import_prop_types20.default.func, import_prop_types20.default.object])
      }),
      slots: import_prop_types20.default.shape({
        root: import_prop_types20.default.elementType
      }),
      value: import_prop_types20.default.any
    } : void 0;
  }
});

// node_modules/@mui/base/FormControlUnstyled/useFormControlUnstyledContext.js
function useFormControlUnstyledContext() {
  return React37.useContext(FormControlUnstyledContext_default);
}
var React37;
var init_useFormControlUnstyledContext = __esm({
  "node_modules/@mui/base/FormControlUnstyled/useFormControlUnstyledContext.js"() {
    React37 = __toESM(require_react());
    init_FormControlUnstyledContext();
  }
});

// node_modules/@mui/base/FormControlUnstyled/index.js
var init_FormControlUnstyled2 = __esm({
  "node_modules/@mui/base/FormControlUnstyled/index.js"() {
    init_FormControlUnstyled();
    init_FormControlUnstyledContext();
    init_formControlUnstyledClasses();
    init_formControlUnstyledClasses();
    init_useFormControlUnstyledContext();
  }
});

// node_modules/@mui/base/InputUnstyled/inputUnstyledClasses.js
var inputUnstyledClasses, inputUnstyledClasses_default;
var init_inputUnstyledClasses = __esm({
  "node_modules/@mui/base/InputUnstyled/inputUnstyledClasses.js"() {
    init_generateUtilityClass();
    init_generateUtilityClasses();
    inputUnstyledClasses = generateUtilityClasses("MuiInput", ["root", "formControl", "focused", "disabled", "error", "multiline", "input", "inputMultiline", "inputTypeSearch", "adornedStart", "adornedEnd"]);
    inputUnstyledClasses_default = inputUnstyledClasses;
  }
});

// node_modules/@mui/base/InputUnstyled/useInput.js
function useInput(parameters) {
  const {
    defaultValue: defaultValueProp,
    disabled: disabledProp = false,
    error: errorProp = false,
    onBlur,
    onChange,
    onFocus,
    required: requiredProp = false,
    value: valueProp
  } = parameters;
  const formControlContext = useFormControlUnstyledContext();
  let defaultValue;
  let disabled;
  let error;
  let required;
  let value;
  if (formControlContext) {
    var _formControlContext$d, _formControlContext$e, _formControlContext$r;
    defaultValue = void 0;
    disabled = (_formControlContext$d = formControlContext.disabled) != null ? _formControlContext$d : false;
    error = (_formControlContext$e = formControlContext.error) != null ? _formControlContext$e : false;
    required = (_formControlContext$r = formControlContext.required) != null ? _formControlContext$r : false;
    value = formControlContext.value;
    if (true) {
      const definedLocalProps = ["defaultValue", "disabled", "error", "required", "value"].filter((prop) => parameters[prop] !== void 0);
      if (definedLocalProps.length > 0) {
        console.warn(["MUI: You have set props on an input that is inside a FormControlUnstyled.", "Set these props on a FormControlUnstyled instead. Otherwise they will be ignored.", `Ignored props: ${definedLocalProps.join(", ")}`].join("\n"));
      }
    }
  } else {
    defaultValue = defaultValueProp;
    disabled = disabledProp;
    error = errorProp;
    required = requiredProp;
    value = valueProp;
  }
  const {
    current: isControlled
  } = React38.useRef(value != null);
  const handleInputRefWarning = React38.useCallback((instance) => {
    if (true) {
      if (instance && instance.nodeName !== "INPUT" && !instance.focus) {
        console.error(["MUI: You have provided a `slots.input` to the input component", "that does not correctly handle the `ref` prop.", "Make sure the `ref` prop is called with a HTMLInputElement."].join("\n"));
      }
    }
  }, []);
  const inputRef = React38.useRef(null);
  const handleInputRef = useForkRef(inputRef, handleInputRefWarning);
  const [focused, setFocused] = React38.useState(false);
  React38.useEffect(() => {
    if (!formControlContext && disabled && focused) {
      setFocused(false);
      onBlur == null ? void 0 : onBlur();
    }
  }, [formControlContext, disabled, focused, onBlur]);
  const handleFocus = (otherHandlers) => (event) => {
    var _otherHandlers$onFocu;
    if (formControlContext != null && formControlContext.disabled) {
      event.stopPropagation();
      return;
    }
    (_otherHandlers$onFocu = otherHandlers.onFocus) == null ? void 0 : _otherHandlers$onFocu.call(otherHandlers, event);
    if (formControlContext && formControlContext.onFocus) {
      var _formControlContext$o;
      formControlContext == null ? void 0 : (_formControlContext$o = formControlContext.onFocus) == null ? void 0 : _formControlContext$o.call(formControlContext);
    } else {
      setFocused(true);
    }
  };
  const handleBlur2 = (otherHandlers) => (event) => {
    var _otherHandlers$onBlur;
    (_otherHandlers$onBlur = otherHandlers.onBlur) == null ? void 0 : _otherHandlers$onBlur.call(otherHandlers, event);
    if (formControlContext && formControlContext.onBlur) {
      formControlContext.onBlur();
    } else {
      setFocused(false);
    }
  };
  const handleChange = (otherHandlers) => (event, ...args) => {
    var _formControlContext$o2, _otherHandlers$onChan;
    if (!isControlled) {
      const element = event.target || inputRef.current;
      if (element == null) {
        throw new Error(true ? `MUI: Expected valid input target. Did you use a custom \`slots.input\` and forget to forward refs? See https://mui.com/r/input-component-ref-interface for more info.` : formatMuiErrorMessage(17));
      }
    }
    formControlContext == null ? void 0 : (_formControlContext$o2 = formControlContext.onChange) == null ? void 0 : _formControlContext$o2.call(formControlContext, event);
    (_otherHandlers$onChan = otherHandlers.onChange) == null ? void 0 : _otherHandlers$onChan.call(otherHandlers, event, ...args);
  };
  const handleClick = (otherHandlers) => (event) => {
    var _otherHandlers$onClic;
    if (inputRef.current && event.currentTarget === event.target) {
      inputRef.current.focus();
    }
    (_otherHandlers$onClic = otherHandlers.onClick) == null ? void 0 : _otherHandlers$onClic.call(otherHandlers, event);
  };
  const getRootProps = (externalProps = {}) => {
    const propsEventHandlers = extractEventHandlers(parameters, ["onBlur", "onChange", "onFocus"]);
    const externalEventHandlers = _extends({}, propsEventHandlers, extractEventHandlers(externalProps));
    return _extends({}, externalProps, externalEventHandlers, {
      onClick: handleClick(externalEventHandlers)
    });
  };
  const getInputProps = (externalProps = {}) => {
    const propsEventHandlers = {
      onBlur,
      onChange,
      onFocus
    };
    const externalEventHandlers = _extends({}, propsEventHandlers, extractEventHandlers(externalProps));
    const mergedEventHandlers = _extends({}, externalProps, externalEventHandlers, {
      onBlur: handleBlur2(externalEventHandlers),
      onChange: handleChange(externalEventHandlers),
      onFocus: handleFocus(externalEventHandlers)
    });
    return _extends({}, mergedEventHandlers, {
      "aria-invalid": error || void 0,
      defaultValue,
      ref: handleInputRef,
      value,
      required,
      disabled
    });
  };
  return {
    disabled,
    error,
    focused,
    formControlContext,
    getInputProps,
    getRootProps,
    required,
    value
  };
}
var React38;
var init_useInput = __esm({
  "node_modules/@mui/base/InputUnstyled/useInput.js"() {
    init_extends();
    init_esm();
    React38 = __toESM(require_react());
    init_esm();
    init_FormControlUnstyled2();
    init_extractEventHandlers();
  }
});

// node_modules/@mui/base/InputUnstyled/InputUnstyled.js
var React39, import_prop_types21, import_jsx_runtime29, import_jsx_runtime30, _excluded18, InputUnstyled;
var init_InputUnstyled = __esm({
  "node_modules/@mui/base/InputUnstyled/InputUnstyled.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React39 = __toESM(require_react());
    import_prop_types21 = __toESM(require_prop_types());
    init_isHostComponent();
    init_inputUnstyledClasses();
    init_useInput();
    init_utils();
    import_jsx_runtime29 = __toESM(require_jsx_runtime());
    import_jsx_runtime30 = __toESM(require_jsx_runtime());
    _excluded18 = ["aria-describedby", "aria-label", "aria-labelledby", "autoComplete", "autoFocus", "className", "component", "defaultValue", "disabled", "endAdornment", "error", "id", "multiline", "name", "onClick", "onChange", "onKeyDown", "onKeyUp", "onFocus", "onBlur", "placeholder", "readOnly", "required", "startAdornment", "value", "type", "rows", "slotProps", "slots", "minRows", "maxRows"];
    InputUnstyled = React39.forwardRef(function InputUnstyled2(props, forwardedRef) {
      var _ref, _slots$textarea, _slots$input;
      const {
        "aria-describedby": ariaDescribedby,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledby,
        autoComplete,
        autoFocus,
        className,
        component,
        defaultValue,
        disabled,
        endAdornment,
        error,
        id,
        multiline = false,
        name,
        onClick,
        onChange,
        onKeyDown,
        onKeyUp,
        onFocus,
        onBlur,
        placeholder,
        readOnly,
        required,
        startAdornment,
        value,
        type: typeProp,
        rows,
        slotProps = {},
        slots = {},
        minRows,
        maxRows
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded18);
      const {
        getRootProps,
        getInputProps,
        focused,
        formControlContext,
        error: errorState,
        disabled: disabledState
      } = useInput({
        disabled,
        defaultValue,
        error,
        onBlur,
        onClick,
        onChange,
        onFocus,
        required,
        value
      });
      const type = !multiline ? typeProp != null ? typeProp : "text" : void 0;
      const ownerState = _extends({}, props, {
        disabled: disabledState,
        error: errorState,
        focused,
        formControlContext,
        multiline,
        type
      });
      const rootStateClasses = {
        [inputUnstyledClasses_default.disabled]: disabledState,
        [inputUnstyledClasses_default.error]: errorState,
        [inputUnstyledClasses_default.focused]: focused,
        [inputUnstyledClasses_default.formControl]: Boolean(formControlContext),
        [inputUnstyledClasses_default.multiline]: multiline,
        [inputUnstyledClasses_default.adornedStart]: Boolean(startAdornment),
        [inputUnstyledClasses_default.adornedEnd]: Boolean(endAdornment)
      };
      const inputStateClasses = {
        [inputUnstyledClasses_default.disabled]: disabledState,
        [inputUnstyledClasses_default.multiline]: multiline
      };
      const propsToForward = {
        "aria-describedby": ariaDescribedby,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledby,
        autoComplete,
        autoFocus,
        id,
        onKeyDown,
        onKeyUp,
        name,
        placeholder,
        readOnly,
        type
      };
      const Root = (_ref = component != null ? component : slots.root) != null ? _ref : "div";
      const rootProps = useSlotProps({
        elementType: Root,
        getSlotProps: getRootProps,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        additionalProps: {
          ref: forwardedRef
        },
        ownerState,
        className: [inputUnstyledClasses_default.root, rootStateClasses, className]
      });
      const Input = multiline ? (_slots$textarea = slots.textarea) != null ? _slots$textarea : "textarea" : (_slots$input = slots.input) != null ? _slots$input : "input";
      const inputProps = useSlotProps({
        elementType: Input,
        getSlotProps: (otherHandlers) => getInputProps(_extends({}, otherHandlers, propsToForward)),
        externalSlotProps: slotProps.input,
        additionalProps: _extends({
          rows: multiline ? rows : void 0
        }, multiline && !isHostComponent_default(Input) && {
          minRows: rows || minRows,
          maxRows: rows || maxRows
        }),
        ownerState,
        className: [inputUnstyledClasses_default.input, inputStateClasses]
      });
      if (true) {
        if (multiline) {
          if (rows) {
            if (minRows || maxRows) {
              console.warn("MUI: You can not use the `minRows` or `maxRows` props when the input `rows` prop is set.");
            }
          }
        }
      }
      return (0, import_jsx_runtime30.jsxs)(Root, _extends({}, rootProps, {
        children: [startAdornment, (0, import_jsx_runtime29.jsx)(Input, _extends({}, inputProps)), endAdornment]
      }));
    });
    true ? InputUnstyled.propTypes = {
      "aria-describedby": import_prop_types21.default.string,
      "aria-label": import_prop_types21.default.string,
      "aria-labelledby": import_prop_types21.default.string,
      autoComplete: import_prop_types21.default.string,
      autoFocus: import_prop_types21.default.bool,
      children: import_prop_types21.default.node,
      className: import_prop_types21.default.string,
      component: import_prop_types21.default.elementType,
      defaultValue: import_prop_types21.default.any,
      disabled: import_prop_types21.default.bool,
      endAdornment: import_prop_types21.default.node,
      error: import_prop_types21.default.bool,
      id: import_prop_types21.default.string,
      maxRows: import_prop_types21.default.number,
      minRows: import_prop_types21.default.number,
      multiline: import_prop_types21.default.bool,
      name: import_prop_types21.default.string,
      onBlur: import_prop_types21.default.func,
      onChange: import_prop_types21.default.func,
      onClick: import_prop_types21.default.func,
      onFocus: import_prop_types21.default.func,
      onKeyDown: import_prop_types21.default.func,
      onKeyUp: import_prop_types21.default.func,
      placeholder: import_prop_types21.default.string,
      readOnly: import_prop_types21.default.bool,
      required: import_prop_types21.default.bool,
      rows: import_prop_types21.default.number,
      slotProps: import_prop_types21.default.shape({
        input: import_prop_types21.default.oneOfType([import_prop_types21.default.func, import_prop_types21.default.object]),
        root: import_prop_types21.default.oneOfType([import_prop_types21.default.func, import_prop_types21.default.object])
      }),
      slots: import_prop_types21.default.shape({
        input: import_prop_types21.default.elementType,
        root: import_prop_types21.default.elementType,
        textarea: import_prop_types21.default.elementType
      }),
      startAdornment: import_prop_types21.default.node,
      type: import_prop_types21.default.oneOf(["button", "checkbox", "color", "date", "datetime-local", "email", "file", "hidden", "image", "month", "number", "password", "radio", "range", "reset", "search", "submit", "tel", "text", "time", "url", "week"]),
      value: import_prop_types21.default.any
    } : void 0;
  }
});

// node_modules/@mui/base/InputUnstyled/InputUnstyled.types.js
var init_InputUnstyled_types = __esm({
  "node_modules/@mui/base/InputUnstyled/InputUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/InputUnstyled/useInput.types.js
var init_useInput_types = __esm({
  "node_modules/@mui/base/InputUnstyled/useInput.types.js"() {
  }
});

// node_modules/@mui/base/InputUnstyled/index.js
var init_InputUnstyled2 = __esm({
  "node_modules/@mui/base/InputUnstyled/index.js"() {
    init_InputUnstyled();
    init_InputUnstyled_types();
    init_useInput();
    init_useInput_types();
    init_inputUnstyledClasses();
    init_inputUnstyledClasses();
  }
});

// node_modules/@mui/base/MultiSelectUnstyled/MultiSelectUnstyled.js
function defaultRenderMultipleValues(selectedOptions) {
  return (0, import_jsx_runtime31.jsx)(React40.Fragment, {
    children: selectedOptions.map((o) => o.label).join(", ")
  });
}
function defaultFormValueProvider2(selectedOptions) {
  if (selectedOptions.length === 0) {
    return "";
  }
  if (selectedOptions.every((o) => typeof o.value === "string" || typeof o.value === "number" || typeof o.value === "boolean")) {
    return selectedOptions.map((o) => String(o.value));
  }
  return JSON.stringify(selectedOptions.map((o) => o.value));
}
function useUtilityClasses13(ownerState) {
  const {
    active,
    disabled,
    open,
    focusVisible
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", focusVisible && "focusVisible", active && "active", open && "expanded"],
    listbox: ["listbox", disabled && "disabled"],
    popper: ["popper"]
  };
  return composeClasses(slots, getSelectUnstyledUtilityClass, {});
}
var React40, import_prop_types22, import_jsx_runtime31, import_jsx_runtime32, _excluded19, MultiSelectUnstyled;
var init_MultiSelectUnstyled = __esm({
  "node_modules/@mui/base/MultiSelectUnstyled/MultiSelectUnstyled.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React40 = __toESM(require_react());
    import_prop_types22 = __toESM(require_prop_types());
    init_esm();
    init_utils2();
    init_useSelect();
    init_utils();
    init_PopperUnstyled2();
    init_SelectUnstyledContext();
    init_composeClasses();
    init_selectUnstyledClasses();
    init_defaultOptionStringifier();
    import_jsx_runtime31 = __toESM(require_jsx_runtime());
    import_jsx_runtime32 = __toESM(require_jsx_runtime());
    _excluded19 = ["autoFocus", "children", "component", "defaultListboxOpen", "defaultValue", "disabled", "getSerializedValue", "listboxId", "listboxOpen", "name", "onChange", "onListboxOpenChange", "optionStringifier", "renderValue", "slotProps", "slots", "value"];
    MultiSelectUnstyled = React40.forwardRef(function MultiSelectUnstyled2(props, forwardedRef) {
      var _ref, _slots$listbox, _slots$popper;
      const {
        autoFocus,
        children,
        component,
        defaultListboxOpen = false,
        defaultValue = [],
        disabled: disabledProp,
        getSerializedValue = defaultFormValueProvider2,
        listboxId,
        listboxOpen: listboxOpenProp,
        name,
        onChange,
        onListboxOpenChange,
        optionStringifier = defaultOptionStringifier_default,
        renderValue: renderValueProp,
        slotProps = {},
        slots = {},
        value: valueProp
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded19);
      const renderValue = renderValueProp != null ? renderValueProp : defaultRenderMultipleValues;
      const [groupedOptions, setGroupedOptions] = React40.useState([]);
      const options = React40.useMemo(() => flattenOptionGroups(groupedOptions), [groupedOptions]);
      const [listboxOpen, setListboxOpen] = useControlled({
        controlled: listboxOpenProp,
        default: defaultListboxOpen,
        name: "MultiSelectUnstyled",
        state: "listboxOpen"
      });
      React40.useEffect(() => {
        setGroupedOptions(getOptionsFromChildren(children));
      }, [children]);
      const [buttonDefined, setButtonDefined] = React40.useState(false);
      const buttonRef = React40.useRef(null);
      const listboxRef = React40.useRef(null);
      const Button = (_ref = component != null ? component : slots.root) != null ? _ref : "button";
      const ListboxRoot = (_slots$listbox = slots.listbox) != null ? _slots$listbox : "ul";
      const Popper = (_slots$popper = slots.popper) != null ? _slots$popper : PopperUnstyled_default;
      const handleButtonRefChange = React40.useCallback((element) => {
        setButtonDefined(element != null);
      }, []);
      const handleButtonRef = useForkRef(forwardedRef, buttonRef, handleButtonRefChange);
      React40.useEffect(() => {
        if (autoFocus) {
          buttonRef.current.focus();
        }
      }, [autoFocus]);
      const handleOpenChange = (isOpen) => {
        setListboxOpen(isOpen);
        onListboxOpenChange == null ? void 0 : onListboxOpenChange(isOpen);
      };
      const {
        buttonActive,
        buttonFocusVisible,
        disabled,
        getButtonProps,
        getListboxProps,
        getOptionProps,
        getOptionState,
        value
      } = useSelect_default({
        buttonRef: handleButtonRef,
        defaultValue,
        disabled: disabledProp,
        listboxId,
        multiple: true,
        onChange,
        onOpenChange: handleOpenChange,
        open: listboxOpen,
        options,
        optionStringifier,
        value: valueProp
      });
      const ownerState = _extends({}, props, {
        active: buttonActive,
        defaultListboxOpen,
        disabled,
        focusVisible: buttonFocusVisible,
        open: listboxOpen,
        renderValue,
        value
      });
      const classes = useUtilityClasses13(ownerState);
      const selectedOptions = React40.useMemo(() => {
        if (value == null) {
          return [];
        }
        return options.filter((o) => value.includes(o.value));
      }, [options, value]);
      const buttonProps = useSlotProps({
        elementType: Button,
        getSlotProps: getButtonProps,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        ownerState,
        className: classes.root
      });
      const listboxProps = useSlotProps({
        elementType: ListboxRoot,
        getSlotProps: getListboxProps,
        externalSlotProps: slotProps.listbox,
        additionalProps: {
          ref: listboxRef
        },
        ownerState,
        className: classes.listbox
      });
      const popperProps = useSlotProps({
        elementType: Popper,
        externalSlotProps: slotProps.popper,
        additionalProps: {
          anchorEl: buttonRef.current,
          disablePortal: true,
          open: listboxOpen,
          placement: "bottom-start",
          role: void 0
        },
        ownerState,
        className: classes.popper
      });
      const context = React40.useMemo(() => ({
        getOptionProps,
        getOptionState,
        listboxRef
      }), [getOptionProps, getOptionState]);
      return (0, import_jsx_runtime32.jsxs)(React40.Fragment, {
        children: [(0, import_jsx_runtime31.jsx)(Button, _extends({}, buttonProps, {
          children: renderValue(selectedOptions)
        })), buttonDefined && (0, import_jsx_runtime31.jsx)(Popper, _extends({}, popperProps, {
          children: (0, import_jsx_runtime31.jsx)(ListboxRoot, _extends({}, listboxProps, {
            children: (0, import_jsx_runtime31.jsx)(SelectUnstyledContext.Provider, {
              value: context,
              children
            })
          }))
        })), name && (0, import_jsx_runtime31.jsx)("input", {
          type: "hidden",
          name,
          value: getSerializedValue(selectedOptions)
        })]
      });
    });
    true ? MultiSelectUnstyled.propTypes = {
      autoFocus: import_prop_types22.default.bool,
      children: import_prop_types22.default.node,
      component: import_prop_types22.default.elementType,
      defaultListboxOpen: import_prop_types22.default.bool,
      defaultValue: import_prop_types22.default.array,
      disabled: import_prop_types22.default.bool,
      getSerializedValue: import_prop_types22.default.func,
      listboxId: import_prop_types22.default.string,
      listboxOpen: import_prop_types22.default.bool,
      name: import_prop_types22.default.string,
      onChange: import_prop_types22.default.func,
      onListboxOpenChange: import_prop_types22.default.func,
      optionStringifier: import_prop_types22.default.func,
      renderValue: import_prop_types22.default.func,
      slotProps: import_prop_types22.default.shape({
        listbox: import_prop_types22.default.oneOfType([import_prop_types22.default.func, import_prop_types22.default.object]),
        popper: import_prop_types22.default.oneOfType([import_prop_types22.default.func, import_prop_types22.default.object]),
        root: import_prop_types22.default.oneOfType([import_prop_types22.default.func, import_prop_types22.default.object])
      }),
      slots: import_prop_types22.default.shape({
        listbox: import_prop_types22.default.elementType,
        popper: import_prop_types22.default.elementType,
        root: import_prop_types22.default.elementType
      }),
      value: import_prop_types22.default.array
    } : void 0;
  }
});

// node_modules/@mui/base/MultiSelectUnstyled/MultiSelectUnstyled.types.js
var init_MultiSelectUnstyled_types = __esm({
  "node_modules/@mui/base/MultiSelectUnstyled/MultiSelectUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/MultiSelectUnstyled/index.js
var init_MultiSelectUnstyled2 = __esm({
  "node_modules/@mui/base/MultiSelectUnstyled/index.js"() {
    init_MultiSelectUnstyled();
    init_MultiSelectUnstyled_types();
  }
});

// node_modules/@mui/base/OptionGroupUnstyled/optionGroupUnstyledClasses.js
function getOptionGroupUnstyledUtilityClass(slot) {
  return generateUtilityClass("MuiOptionGroup", slot);
}
var optionGroupUnstyledClasses;
var init_optionGroupUnstyledClasses = __esm({
  "node_modules/@mui/base/OptionGroupUnstyled/optionGroupUnstyledClasses.js"() {
    init_generateUtilityClass();
    init_generateUtilityClasses();
    optionGroupUnstyledClasses = generateUtilityClasses("MuiOptionGroup", ["root", "label", "list"]);
  }
});

// node_modules/@mui/base/OptionGroupUnstyled/OptionGroupUnstyled.js
function useUtilityClasses14(disabled) {
  const slots = {
    root: ["root", disabled && "disabled"],
    label: ["label"],
    list: ["list"]
  };
  return composeClasses(slots, getOptionGroupUnstyledUtilityClass, {});
}
var React41, import_prop_types23, import_jsx_runtime33, import_jsx_runtime34, _excluded20, OptionGroupUnstyled;
var init_OptionGroupUnstyled = __esm({
  "node_modules/@mui/base/OptionGroupUnstyled/OptionGroupUnstyled.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React41 = __toESM(require_react());
    import_prop_types23 = __toESM(require_prop_types());
    init_composeClasses();
    init_optionGroupUnstyledClasses();
    init_utils();
    import_jsx_runtime33 = __toESM(require_jsx_runtime());
    import_jsx_runtime34 = __toESM(require_jsx_runtime());
    _excluded20 = ["component", "disabled", "slotProps", "slots"];
    OptionGroupUnstyled = React41.forwardRef(function OptionGroupUnstyled2(props, ref) {
      const {
        component,
        disabled = false,
        slotProps = {},
        slots = {}
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded20);
      const Root = component || (slots == null ? void 0 : slots.root) || "li";
      const Label = (slots == null ? void 0 : slots.label) || "span";
      const List = (slots == null ? void 0 : slots.list) || "ul";
      const classes = useUtilityClasses14(disabled);
      const rootProps = useSlotProps({
        elementType: Root,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        additionalProps: {
          ref
        },
        ownerState: props,
        className: classes.root
      });
      const labelProps = useSlotProps({
        elementType: Label,
        externalSlotProps: slotProps.label,
        ownerState: props,
        className: classes.label
      });
      const listProps = useSlotProps({
        elementType: List,
        externalSlotProps: slotProps.list,
        ownerState: props,
        className: classes.list
      });
      return (0, import_jsx_runtime34.jsxs)(Root, _extends({}, rootProps, {
        children: [(0, import_jsx_runtime33.jsx)(Label, _extends({}, labelProps, {
          children: props.label
        })), (0, import_jsx_runtime33.jsx)(List, _extends({}, listProps, {
          children: props.children
        }))]
      }));
    });
    true ? OptionGroupUnstyled.propTypes = {
      children: import_prop_types23.default.node,
      component: import_prop_types23.default.elementType,
      disabled: import_prop_types23.default.bool,
      label: import_prop_types23.default.node,
      slotProps: import_prop_types23.default.shape({
        label: import_prop_types23.default.oneOfType([import_prop_types23.default.func, import_prop_types23.default.object]),
        list: import_prop_types23.default.oneOfType([import_prop_types23.default.func, import_prop_types23.default.object]),
        root: import_prop_types23.default.oneOfType([import_prop_types23.default.func, import_prop_types23.default.object])
      }),
      slots: import_prop_types23.default.shape({
        label: import_prop_types23.default.elementType,
        list: import_prop_types23.default.elementType,
        root: import_prop_types23.default.elementType
      })
    } : void 0;
  }
});

// node_modules/@mui/base/OptionGroupUnstyled/OptionGroupUnstyled.types.js
var init_OptionGroupUnstyled_types = __esm({
  "node_modules/@mui/base/OptionGroupUnstyled/OptionGroupUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/OptionGroupUnstyled/index.js
var init_OptionGroupUnstyled2 = __esm({
  "node_modules/@mui/base/OptionGroupUnstyled/index.js"() {
    init_OptionGroupUnstyled();
    init_OptionGroupUnstyled_types();
    init_optionGroupUnstyledClasses();
    init_optionGroupUnstyledClasses();
  }
});

// node_modules/@mui/base/OptionUnstyled/optionUnstyledClasses.js
function getOptionUnstyledUtilityClass(slot) {
  return generateUtilityClass("MuiOption", slot);
}
var optionUnstyledClasses;
var init_optionUnstyledClasses = __esm({
  "node_modules/@mui/base/OptionUnstyled/optionUnstyledClasses.js"() {
    init_generateUtilityClass();
    init_generateUtilityClasses();
    optionUnstyledClasses = generateUtilityClasses("MuiOption", ["root", "disabled", "selected", "highlighted"]);
  }
});

// node_modules/@mui/base/OptionUnstyled/OptionUnstyled.js
function useUtilityClasses15(ownerState) {
  const {
    disabled,
    highlighted,
    selected
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", highlighted && "highlighted", selected && "selected"]
  };
  return composeClasses(slots, getOptionUnstyledUtilityClass, {});
}
var React42, import_prop_types24, import_jsx_runtime35, _excluded21, OptionUnstyled, OptionUnstyled_default;
var init_OptionUnstyled = __esm({
  "node_modules/@mui/base/OptionUnstyled/OptionUnstyled.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React42 = __toESM(require_react());
    import_prop_types24 = __toESM(require_prop_types());
    init_esm();
    init_composeClasses();
    init_SelectUnstyledContext();
    init_optionUnstyledClasses();
    init_utils();
    import_jsx_runtime35 = __toESM(require_jsx_runtime());
    _excluded21 = ["children", "component", "disabled", "label", "slotProps", "slots", "value"];
    OptionUnstyled = React42.forwardRef(function OptionUnstyled2(props, ref) {
      const {
        children,
        component,
        disabled,
        label,
        slotProps = {},
        slots = {},
        value
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded21);
      const selectContext = React42.useContext(SelectUnstyledContext);
      if (!selectContext) {
        throw new Error("OptionUnstyled must be used within a SelectUnstyled");
      }
      const Root = component || slots.root || "li";
      const selectOption = {
        value,
        label: label || children,
        disabled
      };
      const optionState = selectContext.getOptionState(selectOption);
      const optionProps = selectContext.getOptionProps(selectOption);
      const listboxRef = selectContext.listboxRef;
      const ownerState = _extends({}, props, optionState);
      const optionRef = React42.useRef(null);
      const handleRef = useForkRef(ref, optionRef);
      React42.useEffect(() => {
        if (optionState.highlighted) {
          if (!listboxRef.current || !optionRef.current) {
            return;
          }
          const listboxClientRect = listboxRef.current.getBoundingClientRect();
          const optionClientRect = optionRef.current.getBoundingClientRect();
          if (optionClientRect.top < listboxClientRect.top) {
            listboxRef.current.scrollTop -= listboxClientRect.top - optionClientRect.top;
          } else if (optionClientRect.bottom > listboxClientRect.bottom) {
            listboxRef.current.scrollTop += optionClientRect.bottom - listboxClientRect.bottom;
          }
        }
      }, [optionState.highlighted, listboxRef]);
      const classes = useUtilityClasses15(ownerState);
      const rootProps = useSlotProps({
        elementType: Root,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        additionalProps: _extends({}, optionProps, {
          ref: handleRef
        }),
        className: classes.root,
        ownerState
      });
      return (0, import_jsx_runtime35.jsx)(Root, _extends({}, rootProps, {
        children
      }));
    });
    true ? OptionUnstyled.propTypes = {
      children: import_prop_types24.default.node,
      component: import_prop_types24.default.elementType,
      disabled: import_prop_types24.default.bool,
      label: import_prop_types24.default.string,
      slotProps: import_prop_types24.default.shape({
        root: import_prop_types24.default.oneOfType([import_prop_types24.default.func, import_prop_types24.default.object])
      }),
      slots: import_prop_types24.default.shape({
        root: import_prop_types24.default.elementType
      }),
      value: import_prop_types24.default.any.isRequired
    } : void 0;
    OptionUnstyled_default = React42.memo(OptionUnstyled);
  }
});

// node_modules/@mui/base/OptionUnstyled/OptionUnstyled.types.js
var init_OptionUnstyled_types = __esm({
  "node_modules/@mui/base/OptionUnstyled/OptionUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/OptionUnstyled/index.js
var init_OptionUnstyled2 = __esm({
  "node_modules/@mui/base/OptionUnstyled/index.js"() {
    init_OptionUnstyled();
    init_OptionUnstyled_types();
    init_optionUnstyledClasses();
    init_optionUnstyledClasses();
  }
});

// node_modules/@mui/base/SnackbarUnstyled/snackbarUnstyledClasses.js
function getSnackbarUnstyledUtilityClass(slot) {
  return generateUtilityClass("MuiSnackbar", slot);
}
var snackbarUnstyledClasses;
var init_snackbarUnstyledClasses = __esm({
  "node_modules/@mui/base/SnackbarUnstyled/snackbarUnstyledClasses.js"() {
    init_generateUtilityClass();
    init_generateUtilityClasses();
    snackbarUnstyledClasses = generateUtilityClasses("MuiSnackbar", ["root"]);
  }
});

// node_modules/@mui/base/SnackbarUnstyled/useSnackbar.js
function useSnackbar(parameters) {
  const {
    autoHideDuration = null,
    disableWindowBlurListener = false,
    onClose,
    open,
    ref,
    resumeHideDuration
  } = parameters;
  const timerAutoHide = React43.useRef();
  React43.useEffect(() => {
    if (!open) {
      return void 0;
    }
    function handleKeyDown2(nativeEvent) {
      if (!nativeEvent.defaultPrevented) {
        if (nativeEvent.key === "Escape" || nativeEvent.key === "Esc") {
          onClose == null ? void 0 : onClose(nativeEvent, "escapeKeyDown");
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown2);
    return () => {
      document.removeEventListener("keydown", handleKeyDown2);
    };
  }, [open, onClose]);
  const handleClose = useEventCallback((event, reason) => {
    onClose == null ? void 0 : onClose(event, reason);
  });
  const setAutoHideTimer = useEventCallback((autoHideDurationParam) => {
    if (!onClose || autoHideDurationParam == null) {
      return;
    }
    clearTimeout(timerAutoHide.current);
    timerAutoHide.current = setTimeout(() => {
      handleClose(null, "timeout");
    }, autoHideDurationParam);
  });
  React43.useEffect(() => {
    if (open) {
      setAutoHideTimer(autoHideDuration);
    }
    return () => {
      clearTimeout(timerAutoHide.current);
    };
  }, [open, autoHideDuration, setAutoHideTimer]);
  const handleClickAway = (event) => {
    onClose == null ? void 0 : onClose(event, "clickaway");
  };
  const handlePause = () => {
    clearTimeout(timerAutoHide.current);
  };
  const handleResume = React43.useCallback(() => {
    if (autoHideDuration != null) {
      setAutoHideTimer(resumeHideDuration != null ? resumeHideDuration : autoHideDuration * 0.5);
    }
  }, [autoHideDuration, resumeHideDuration, setAutoHideTimer]);
  const createHandleBlur = (otherHandlers) => (event) => {
    const onBlurCallback = otherHandlers.onBlur;
    onBlurCallback == null ? void 0 : onBlurCallback(event);
    handleResume();
  };
  const createHandleFocus = (otherHandlers) => (event) => {
    const onFocusCallback = otherHandlers.onFocus;
    onFocusCallback == null ? void 0 : onFocusCallback(event);
    handlePause();
  };
  const createMouseEnter = (otherHandlers) => (event) => {
    const onMouseEnterCallback = otherHandlers.onMouseEnter;
    onMouseEnterCallback == null ? void 0 : onMouseEnterCallback(event);
    handlePause();
  };
  const createMouseLeave = (otherHandlers) => (event) => {
    const onMouseLeaveCallback = otherHandlers.onMouseLeave;
    onMouseLeaveCallback == null ? void 0 : onMouseLeaveCallback(event);
    handleResume();
  };
  React43.useEffect(() => {
    if (!disableWindowBlurListener && open) {
      window.addEventListener("focus", handleResume);
      window.addEventListener("blur", handlePause);
      return () => {
        window.removeEventListener("focus", handleResume);
        window.removeEventListener("blur", handlePause);
      };
    }
    return void 0;
  }, [disableWindowBlurListener, handleResume, open]);
  const getRootProps = (otherHandlers = {}) => {
    const propsEventHandlers = extractEventHandlers(parameters);
    const externalEventHandlers = _extends({}, propsEventHandlers, otherHandlers);
    return _extends({
      ref,
      role: "presentation"
    }, externalEventHandlers, {
      onBlur: createHandleBlur(externalEventHandlers),
      onFocus: createHandleFocus(externalEventHandlers),
      onMouseEnter: createMouseEnter(externalEventHandlers),
      onMouseLeave: createMouseLeave(externalEventHandlers)
    });
  };
  return {
    getRootProps,
    onClickAway: handleClickAway
  };
}
var React43;
var init_useSnackbar = __esm({
  "node_modules/@mui/base/SnackbarUnstyled/useSnackbar.js"() {
    init_extends();
    React43 = __toESM(require_react());
    init_esm();
    init_extractEventHandlers();
  }
});

// node_modules/@mui/base/SnackbarUnstyled/SnackbarUnstyled.js
var React44, import_prop_types25, import_jsx_runtime36, _excluded23, useUtilityClasses16, SnackbarUnstyled;
var init_SnackbarUnstyled = __esm({
  "node_modules/@mui/base/SnackbarUnstyled/SnackbarUnstyled.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React44 = __toESM(require_react());
    import_prop_types25 = __toESM(require_prop_types());
    init_ClickAwayListener2();
    init_composeClasses();
    init_snackbarUnstyledClasses();
    init_useSnackbar();
    init_utils();
    import_jsx_runtime36 = __toESM(require_jsx_runtime());
    _excluded23 = ["autoHideDuration", "children", "component", "disableWindowBlurListener", "exited", "onBlur", "onClose", "onFocus", "onMouseEnter", "onMouseLeave", "open", "resumeHideDuration", "slotProps", "slots"];
    useUtilityClasses16 = () => {
      const slots = {
        root: ["root"]
      };
      return composeClasses(slots, getSnackbarUnstyledUtilityClass, void 0);
    };
    SnackbarUnstyled = React44.forwardRef(function SnackbarUnstyled2(props, ref) {
      const {
        autoHideDuration = null,
        children,
        component,
        disableWindowBlurListener = false,
        exited = true,
        onClose,
        open,
        resumeHideDuration,
        slotProps = {},
        slots = {}
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded23);
      const classes = useUtilityClasses16();
      const {
        getRootProps,
        onClickAway
      } = useSnackbar(_extends({}, props, {
        autoHideDuration,
        disableWindowBlurListener,
        onClose,
        open,
        resumeHideDuration,
        ref
      }));
      const ownerState = props;
      const Root = component || slots.root || "div";
      const rootProps = useSlotProps({
        elementType: Root,
        getSlotProps: getRootProps,
        externalForwardedProps: other,
        externalSlotProps: slotProps.root,
        additionalProps: {
          ref
        },
        ownerState,
        className: classes.root
      });
      const clickAwayListenerProps = useSlotProps({
        elementType: ClickAwayListener_default,
        externalSlotProps: slotProps.clickAwayListener,
        additionalProps: {
          onClickAway
        },
        ownerState
      });
      delete clickAwayListenerProps.ownerState;
      if (!open && exited) {
        return null;
      }
      return (0, import_jsx_runtime36.jsx)(ClickAwayListener_default, _extends({}, clickAwayListenerProps, {
        children: (0, import_jsx_runtime36.jsx)(Root, _extends({}, rootProps, {
          children
        }))
      }));
    });
    true ? SnackbarUnstyled.propTypes = {
      autoHideDuration: import_prop_types25.default.number,
      children: import_prop_types25.default.node,
      component: import_prop_types25.default.elementType,
      disableWindowBlurListener: import_prop_types25.default.bool,
      exited: import_prop_types25.default.bool,
      onBlur: import_prop_types25.default.func,
      onClose: import_prop_types25.default.func,
      onFocus: import_prop_types25.default.func,
      onMouseEnter: import_prop_types25.default.func,
      onMouseLeave: import_prop_types25.default.func,
      open: import_prop_types25.default.bool,
      resumeHideDuration: import_prop_types25.default.number,
      slotProps: import_prop_types25.default.shape({
        clickAwayListener: import_prop_types25.default.oneOfType([import_prop_types25.default.func, import_prop_types25.default.shape({
          children: import_prop_types25.default.element.isRequired,
          disableReactTree: import_prop_types25.default.bool,
          mouseEvent: import_prop_types25.default.oneOf(["onClick", "onMouseDown", "onMouseUp", "onPointerDown", "onPointerUp", false]),
          onClickAway: import_prop_types25.default.func,
          touchEvent: import_prop_types25.default.oneOf(["onTouchEnd", "onTouchStart", false])
        })]),
        root: import_prop_types25.default.oneOfType([import_prop_types25.default.func, import_prop_types25.default.object])
      }),
      slots: import_prop_types25.default.shape({
        root: import_prop_types25.default.elementType
      })
    } : void 0;
  }
});

// node_modules/@mui/base/SnackbarUnstyled/SnackbarUnstyled.types.js
var init_SnackbarUnstyled_types = __esm({
  "node_modules/@mui/base/SnackbarUnstyled/SnackbarUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/SnackbarUnstyled/useSnackbar.types.js
var init_useSnackbar_types = __esm({
  "node_modules/@mui/base/SnackbarUnstyled/useSnackbar.types.js"() {
  }
});

// node_modules/@mui/base/SnackbarUnstyled/index.js
var init_SnackbarUnstyled2 = __esm({
  "node_modules/@mui/base/SnackbarUnstyled/index.js"() {
    init_SnackbarUnstyled();
    init_SnackbarUnstyled_types();
    init_snackbarUnstyledClasses();
    init_snackbarUnstyledClasses();
    init_useSnackbar();
    init_useSnackbar_types();
  }
});

// node_modules/@mui/base/TablePaginationUnstyled/TablePaginationActionsUnstyled.js
function LastPageIconDefault() {
  return _span || (_span = (0, import_jsx_runtime37.jsx)("span", {
    children: "⇾|"
  }));
}
function FirstPageIconDefault() {
  return _span2 || (_span2 = (0, import_jsx_runtime37.jsx)("span", {
    children: "|⇽"
  }));
}
function NextPageIconDefault() {
  return _span3 || (_span3 = (0, import_jsx_runtime37.jsx)("span", {
    children: "⇾"
  }));
}
function BackPageIconDefault() {
  return _span4 || (_span4 = (0, import_jsx_runtime37.jsx)("span", {
    children: "⇽"
  }));
}
function defaultGetAriaLabel(type) {
  return `Go to ${type} page`;
}
var React45, import_jsx_runtime37, import_jsx_runtime38, _excluded24, _span, _span2, _span3, _span4, TablePaginationActionsUnstyled, TablePaginationActionsUnstyled_default;
var init_TablePaginationActionsUnstyled = __esm({
  "node_modules/@mui/base/TablePaginationUnstyled/TablePaginationActionsUnstyled.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React45 = __toESM(require_react());
    init_utils();
    import_jsx_runtime37 = __toESM(require_jsx_runtime());
    import_jsx_runtime38 = __toESM(require_jsx_runtime());
    _excluded24 = ["component", "count", "getItemAriaLabel", "onPageChange", "page", "rowsPerPage", "showFirstButton", "showLastButton", "direction", "ownerState", "slotProps", "slots"];
    TablePaginationActionsUnstyled = React45.forwardRef(function TablePaginationActionsUnstyled2(props, ref) {
      var _ref, _slots$root, _slots$firstButton, _slots$lastButton, _slots$nextButton, _slots$backButton, _slots$lastPageIcon, _slots$firstPageIcon, _slots$nextPageIcon, _slots$backPageIcon;
      const {
        component,
        count,
        getItemAriaLabel = defaultGetAriaLabel,
        onPageChange,
        page,
        rowsPerPage,
        showFirstButton = false,
        showLastButton = false,
        direction,
        slotProps = {},
        slots = {}
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded24);
      const ownerState = props;
      const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
      };
      const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
      };
      const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
      };
      const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
      };
      const Root = (_ref = (_slots$root = slots.root) != null ? _slots$root : component) != null ? _ref : "div";
      const rootProps = useSlotProps({
        elementType: Root,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        additionalProps: {
          ref
        },
        ownerState
      });
      const FirstButton = (_slots$firstButton = slots.firstButton) != null ? _slots$firstButton : "button";
      const firstButtonProps = useSlotProps({
        elementType: FirstButton,
        externalSlotProps: slotProps.firstButton,
        additionalProps: {
          onClick: handleFirstPageButtonClick,
          disabled: page === 0,
          "aria-label": getItemAriaLabel("first", page),
          title: getItemAriaLabel("first", page)
        },
        ownerState
      });
      const LastButton = (_slots$lastButton = slots.lastButton) != null ? _slots$lastButton : "button";
      const lastButtonProps = useSlotProps({
        elementType: LastButton,
        externalSlotProps: slotProps.lastButton,
        additionalProps: {
          onClick: handleLastPageButtonClick,
          disabled: page >= Math.ceil(count / rowsPerPage) - 1,
          "aria-label": getItemAriaLabel("last", page),
          title: getItemAriaLabel("last", page)
        },
        ownerState
      });
      const NextButton = (_slots$nextButton = slots.nextButton) != null ? _slots$nextButton : "button";
      const nextButtonProps = useSlotProps({
        elementType: NextButton,
        externalSlotProps: slotProps.nextButton,
        additionalProps: {
          onClick: handleNextButtonClick,
          disabled: count !== -1 ? page >= Math.ceil(count / rowsPerPage) - 1 : false,
          "aria-label": getItemAriaLabel("next", page),
          title: getItemAriaLabel("next", page)
        },
        ownerState
      });
      const BackButton = (_slots$backButton = slots.backButton) != null ? _slots$backButton : "button";
      const backButtonProps = useSlotProps({
        elementType: BackButton,
        externalSlotProps: slotProps.backButton,
        additionalProps: {
          onClick: handleBackButtonClick,
          disabled: page === 0,
          "aria-label": getItemAriaLabel("previous", page),
          title: getItemAriaLabel("previous", page)
        },
        ownerState
      });
      const LastPageIcon = (_slots$lastPageIcon = slots.lastPageIcon) != null ? _slots$lastPageIcon : LastPageIconDefault;
      const FirstPageIcon = (_slots$firstPageIcon = slots.firstPageIcon) != null ? _slots$firstPageIcon : FirstPageIconDefault;
      const NextPageIcon = (_slots$nextPageIcon = slots.nextPageIcon) != null ? _slots$nextPageIcon : NextPageIconDefault;
      const BackPageIcon = (_slots$backPageIcon = slots.backPageIcon) != null ? _slots$backPageIcon : BackPageIconDefault;
      return (0, import_jsx_runtime38.jsxs)(Root, _extends({}, rootProps, {
        children: [showFirstButton && (0, import_jsx_runtime37.jsx)(FirstButton, _extends({}, firstButtonProps, {
          children: direction === "rtl" ? (0, import_jsx_runtime37.jsx)(LastPageIcon, {}) : (0, import_jsx_runtime37.jsx)(FirstPageIcon, {})
        })), (0, import_jsx_runtime37.jsx)(BackButton, _extends({}, backButtonProps, {
          children: direction === "rtl" ? (0, import_jsx_runtime37.jsx)(NextPageIcon, {}) : (0, import_jsx_runtime37.jsx)(BackPageIcon, {})
        })), (0, import_jsx_runtime37.jsx)(NextButton, _extends({}, nextButtonProps, {
          children: direction === "rtl" ? (0, import_jsx_runtime37.jsx)(BackPageIcon, {}) : (0, import_jsx_runtime37.jsx)(NextPageIcon, {})
        })), showLastButton && (0, import_jsx_runtime37.jsx)(LastButton, _extends({}, lastButtonProps, {
          children: direction === "rtl" ? (0, import_jsx_runtime37.jsx)(FirstPageIcon, {}) : (0, import_jsx_runtime37.jsx)(LastPageIcon, {})
        }))]
      }));
    });
    TablePaginationActionsUnstyled_default = TablePaginationActionsUnstyled;
  }
});

// node_modules/@mui/base/TablePaginationUnstyled/tablePaginationUnstyledClasses.js
function getTablePaginationUnstyledUtilityClass(slot) {
  return generateUtilityClass("MuiTablePagination", slot);
}
var tablePaginationUnstyledClasses;
var init_tablePaginationUnstyledClasses = __esm({
  "node_modules/@mui/base/TablePaginationUnstyled/tablePaginationUnstyledClasses.js"() {
    init_generateUtilityClass();
    init_generateUtilityClasses();
    tablePaginationUnstyledClasses = generateUtilityClasses("MuiTablePagination", ["root", "toolbar", "spacer", "selectLabel", "selectRoot", "select", "selectIcon", "input", "menuItem", "displayedRows", "actions"]);
  }
});

// node_modules/@mui/base/TablePaginationUnstyled/TablePaginationUnstyled.js
function defaultLabelDisplayedRows({
  from,
  to,
  count
}) {
  return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
}
function defaultGetAriaLabel2(type) {
  return `Go to ${type} page`;
}
var React46, import_prop_types26, import_jsx_runtime39, import_react, import_jsx_runtime40, _excluded25, useUtilityClasses17, TablePaginationUnstyled;
var init_TablePaginationUnstyled = __esm({
  "node_modules/@mui/base/TablePaginationUnstyled/TablePaginationUnstyled.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React46 = __toESM(require_react());
    import_prop_types26 = __toESM(require_prop_types());
    init_esm();
    init_utils();
    init_composeClasses();
    init_isHostComponent();
    init_TablePaginationActionsUnstyled();
    init_tablePaginationUnstyledClasses();
    import_jsx_runtime39 = __toESM(require_jsx_runtime());
    import_react = __toESM(require_react());
    import_jsx_runtime40 = __toESM(require_jsx_runtime());
    _excluded25 = ["component", "colSpan", "count", "getItemAriaLabel", "labelDisplayedRows", "labelId", "labelRowsPerPage", "onPageChange", "onRowsPerPageChange", "page", "rowsPerPage", "rowsPerPageOptions", "selectId", "slotProps", "slots"];
    useUtilityClasses17 = () => {
      const slots = {
        root: ["root"],
        toolbar: ["toolbar"],
        spacer: ["spacer"],
        selectLabel: ["selectLabel"],
        select: ["select"],
        input: ["input"],
        selectIcon: ["selectIcon"],
        menuItem: ["menuItem"],
        displayedRows: ["displayedRows"],
        actions: ["actions"]
      };
      return composeClasses(slots, getTablePaginationUnstyledUtilityClass, {});
    };
    TablePaginationUnstyled = React46.forwardRef(function TablePaginationUnstyled2(props, ref) {
      var _ref, _slots$select, _slots$actions, _slots$menuItem, _slots$selectLabel, _slots$displayedRows, _slots$toolbar, _slots$spacer;
      const {
        component,
        colSpan: colSpanProp,
        count,
        getItemAriaLabel = defaultGetAriaLabel2,
        labelDisplayedRows = defaultLabelDisplayedRows,
        labelId: labelIdProp,
        labelRowsPerPage = "Rows per page:",
        onPageChange,
        onRowsPerPageChange,
        page,
        rowsPerPage,
        rowsPerPageOptions = [10, 25, 50, 100],
        selectId: selectIdProp,
        slotProps = {},
        slots = {}
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded25);
      const ownerState = props;
      const classes = useUtilityClasses17();
      let colSpan;
      if (!component || component === "td" || !isHostComponent_default(component)) {
        colSpan = colSpanProp || 1e3;
      }
      const getLabelDisplayedRowsTo = () => {
        if (count === -1) {
          return (page + 1) * rowsPerPage;
        }
        return rowsPerPage === -1 ? count : Math.min(count, (page + 1) * rowsPerPage);
      };
      const selectId = useId(selectIdProp);
      const labelId = useId(labelIdProp);
      const Root = (_ref = component != null ? component : slots.root) != null ? _ref : "td";
      const rootProps = useSlotProps({
        elementType: Root,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        additionalProps: {
          colSpan,
          ref
        },
        ownerState,
        className: classes.root
      });
      const Select = (_slots$select = slots.select) != null ? _slots$select : "select";
      const selectProps = useSlotProps({
        elementType: Select,
        externalSlotProps: slotProps.select,
        additionalProps: {
          value: rowsPerPage,
          id: selectId,
          onChange: (e) => onRowsPerPageChange && onRowsPerPageChange(e),
          "aria-label": rowsPerPage.toString(),
          "aria-labelledby": [labelId, selectId].filter(Boolean).join(" ") || void 0
        },
        ownerState,
        className: classes.select
      });
      const Actions = (_slots$actions = slots.actions) != null ? _slots$actions : TablePaginationActionsUnstyled_default;
      const actionsProps = useSlotProps({
        elementType: Actions,
        externalSlotProps: slotProps.actions,
        additionalProps: {
          page,
          rowsPerPage,
          count,
          onPageChange,
          getItemAriaLabel
        },
        ownerState,
        className: classes.actions
      });
      const MenuItem = (_slots$menuItem = slots.menuItem) != null ? _slots$menuItem : "option";
      const menuItemProps = useSlotProps({
        elementType: MenuItem,
        externalSlotProps: slotProps.menuItem,
        additionalProps: {
          value: void 0
        },
        ownerState,
        className: classes.menuItem
      });
      const SelectLabel = (_slots$selectLabel = slots.selectLabel) != null ? _slots$selectLabel : "p";
      const selectLabelProps = useSlotProps({
        elementType: SelectLabel,
        externalSlotProps: slotProps.selectLabel,
        additionalProps: {
          id: labelId
        },
        ownerState,
        className: classes.selectLabel
      });
      const DisplayedRows = (_slots$displayedRows = slots.displayedRows) != null ? _slots$displayedRows : "p";
      const displayedRowsProps = useSlotProps({
        elementType: DisplayedRows,
        externalSlotProps: slotProps.displayedRows,
        ownerState,
        className: classes.displayedRows
      });
      const Toolbar = (_slots$toolbar = slots.toolbar) != null ? _slots$toolbar : "div";
      const toolbarProps = useSlotProps({
        elementType: Toolbar,
        externalSlotProps: slotProps.toolbar,
        ownerState,
        className: classes.toolbar
      });
      const Spacer = (_slots$spacer = slots.spacer) != null ? _slots$spacer : "div";
      const spacerProps = useSlotProps({
        elementType: Spacer,
        externalSlotProps: slotProps.spacer,
        ownerState,
        className: classes.spacer
      });
      return (0, import_jsx_runtime39.jsx)(Root, _extends({}, rootProps, {
        children: (0, import_jsx_runtime40.jsxs)(Toolbar, _extends({}, toolbarProps, {
          children: [(0, import_jsx_runtime39.jsx)(Spacer, _extends({}, spacerProps)), rowsPerPageOptions.length > 1 && (0, import_jsx_runtime39.jsx)(SelectLabel, _extends({}, selectLabelProps, {
            children: labelRowsPerPage
          })), rowsPerPageOptions.length > 1 && (0, import_jsx_runtime39.jsx)(Select, _extends({}, selectProps, {
            children: rowsPerPageOptions.map((rowsPerPageOption) => (0, import_react.createElement)(MenuItem, _extends({}, menuItemProps, {
              key: typeof rowsPerPageOption !== "number" && rowsPerPageOption.label ? rowsPerPageOption.label : rowsPerPageOption,
              value: typeof rowsPerPageOption !== "number" && rowsPerPageOption.value ? rowsPerPageOption.value : rowsPerPageOption
            }), typeof rowsPerPageOption !== "number" && rowsPerPageOption.label ? rowsPerPageOption.label : rowsPerPageOption))
          })), (0, import_jsx_runtime39.jsx)(DisplayedRows, _extends({}, displayedRowsProps, {
            children: labelDisplayedRows({
              from: count === 0 ? 0 : page * rowsPerPage + 1,
              to: getLabelDisplayedRowsTo(),
              count: count === -1 ? -1 : count,
              page
            })
          })), (0, import_jsx_runtime39.jsx)(Actions, _extends({}, actionsProps))]
        }))
      }));
    });
    true ? TablePaginationUnstyled.propTypes = {
      children: import_prop_types26.default.node,
      colSpan: import_prop_types26.default.number,
      component: import_prop_types26.default.elementType,
      count: import_prop_types26.default.number.isRequired,
      getItemAriaLabel: import_prop_types26.default.func,
      labelDisplayedRows: import_prop_types26.default.func,
      labelId: import_prop_types26.default.string,
      labelRowsPerPage: import_prop_types26.default.node,
      onPageChange: import_prop_types26.default.func.isRequired,
      onRowsPerPageChange: import_prop_types26.default.func,
      page: chainPropTypes(integerPropType_default.isRequired, (props) => {
        const {
          count,
          page,
          rowsPerPage
        } = props;
        if (count === -1) {
          return null;
        }
        const newLastPage = Math.max(0, Math.ceil(count / rowsPerPage) - 1);
        if (page < 0 || page > newLastPage) {
          return new Error(`MUI: The page prop of a TablePaginationUnstyled is out of range (0 to ${newLastPage}, but page is ${page}).`);
        }
        return null;
      }),
      rowsPerPage: integerPropType_default.isRequired,
      rowsPerPageOptions: import_prop_types26.default.arrayOf(import_prop_types26.default.oneOfType([import_prop_types26.default.number, import_prop_types26.default.shape({
        label: import_prop_types26.default.string.isRequired,
        value: import_prop_types26.default.number.isRequired
      })]).isRequired),
      selectId: import_prop_types26.default.string,
      slotProps: import_prop_types26.default.shape({
        actions: import_prop_types26.default.oneOfType([import_prop_types26.default.func, import_prop_types26.default.object]),
        displayedRows: import_prop_types26.default.oneOfType([import_prop_types26.default.func, import_prop_types26.default.object]),
        menuItem: import_prop_types26.default.oneOfType([import_prop_types26.default.func, import_prop_types26.default.object]),
        root: import_prop_types26.default.oneOfType([import_prop_types26.default.func, import_prop_types26.default.object]),
        select: import_prop_types26.default.oneOfType([import_prop_types26.default.func, import_prop_types26.default.object]),
        selectLabel: import_prop_types26.default.oneOfType([import_prop_types26.default.func, import_prop_types26.default.object]),
        spacer: import_prop_types26.default.oneOfType([import_prop_types26.default.func, import_prop_types26.default.object]),
        toolbar: import_prop_types26.default.oneOfType([import_prop_types26.default.func, import_prop_types26.default.object])
      }),
      slots: import_prop_types26.default.shape({
        actions: import_prop_types26.default.elementType,
        displayedRows: import_prop_types26.default.elementType,
        menuItem: import_prop_types26.default.elementType,
        root: import_prop_types26.default.elementType,
        select: import_prop_types26.default.elementType,
        selectLabel: import_prop_types26.default.elementType,
        spacer: import_prop_types26.default.elementType,
        toolbar: import_prop_types26.default.elementType
      })
    } : void 0;
  }
});

// node_modules/@mui/base/TablePaginationUnstyled/TablePaginationUnstyled.types.js
var init_TablePaginationUnstyled_types = __esm({
  "node_modules/@mui/base/TablePaginationUnstyled/TablePaginationUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/TablePaginationUnstyled/TablePaginationActionsUnstyled.types.js
var init_TablePaginationActionsUnstyled_types = __esm({
  "node_modules/@mui/base/TablePaginationUnstyled/TablePaginationActionsUnstyled.types.js"() {
  }
});

// node_modules/@mui/base/TablePaginationUnstyled/index.js
var init_TablePaginationUnstyled2 = __esm({
  "node_modules/@mui/base/TablePaginationUnstyled/index.js"() {
    init_TablePaginationUnstyled();
    init_TablePaginationUnstyled_types();
    init_TablePaginationActionsUnstyled();
    init_TablePaginationActionsUnstyled_types();
    init_tablePaginationUnstyledClasses();
    init_tablePaginationUnstyledClasses();
  }
});

// node_modules/@mui/base/index.js
var init_base = __esm({
  "node_modules/@mui/base/index.js"() {
    init_utils();
    init_AutocompleteUnstyled();
    init_BadgeUnstyled2();
    init_BadgeUnstyled2();
    init_ButtonUnstyled2();
    init_ButtonUnstyled2();
    init_ClickAwayListener2();
    init_composeClasses();
    init_FocusTrap2();
    init_FormControlUnstyled2();
    init_FormControlUnstyled2();
    init_InputUnstyled2();
    init_InputUnstyled2();
    init_ListboxUnstyled();
    init_MenuUnstyled2();
    init_MenuUnstyled2();
    init_MenuItemUnstyled2();
    init_MenuItemUnstyled2();
    init_ModalUnstyled2();
    init_ModalUnstyled2();
    init_MultiSelectUnstyled2();
    init_MultiSelectUnstyled2();
    init_NoSsr2();
    init_OptionGroupUnstyled2();
    init_OptionGroupUnstyled2();
    init_OptionUnstyled2();
    init_OptionUnstyled2();
    init_PopperUnstyled2();
    init_Portal2();
    init_SelectUnstyled2();
    init_SelectUnstyled2();
    init_SliderUnstyled2();
    init_SliderUnstyled2();
    init_SnackbarUnstyled2();
    init_SnackbarUnstyled2();
    init_SwitchUnstyled2();
    init_SwitchUnstyled2();
    init_TablePaginationUnstyled2();
    init_TablePaginationUnstyled2();
    init_TabPanelUnstyled2();
    init_TabPanelUnstyled2();
    init_TabsListUnstyled2();
    init_TabsListUnstyled2();
    init_TabsUnstyled2();
    init_TabsUnstyled2();
    init_TabUnstyled2();
    init_TabUnstyled2();
    init_TextareaAutosize2();
  }
});

export {
  isHostComponent_default,
  appendOwnerState,
  resolveComponentProps,
  mergeSlotProps,
  useSlotProps,
  init_utils,
  createFilterOptions,
  useAutocomplete,
  init_AutocompleteUnstyled,
  init_composeClasses,
  BadgeUnstyled_default,
  init_BadgeUnstyled2 as init_BadgeUnstyled,
  useButton,
  init_ButtonUnstyled2 as init_ButtonUnstyled,
  ClickAwayListener_default,
  init_ClickAwayListener2 as init_ClickAwayListener,
  FocusTrap_default,
  init_FocusTrap2 as init_FocusTrap,
  useInput,
  init_InputUnstyled2 as init_InputUnstyled,
  MenuUnstyledContext_default,
  useMenu,
  Portal_default,
  init_Portal2 as init_Portal,
  PopperUnstyled_default,
  init_PopperUnstyled2 as init_PopperUnstyled,
  init_MenuUnstyled2 as init_MenuUnstyled,
  useMenuItem,
  init_MenuItemUnstyled2 as init_MenuItemUnstyled,
  ModalManager,
  getModalUtilityClass,
  modalUnstyledClasses_default,
  ModalUnstyled_default,
  init_ModalUnstyled2 as init_ModalUnstyled,
  getOptionsFromChildren,
  flattenOptionGroups,
  useSelect_default,
  SelectUnstyledContext,
  NoSsr_default,
  init_NoSsr2 as init_NoSsr,
  init_SelectUnstyled2 as init_SelectUnstyled,
  getSliderUtilityClass,
  sliderUnstyledClasses_default,
  SliderValueLabelUnstyled,
  useSlider,
  SliderUnstyled_default,
  init_SliderUnstyled2 as init_SliderUnstyled,
  useSwitch,
  init_SwitchUnstyled2 as init_SwitchUnstyled,
  useTabs_default,
  useTabContext,
  TabsContext_default,
  init_TabsUnstyled2 as init_TabsUnstyled,
  useTabPanel_default,
  init_TabPanelUnstyled2 as init_TabPanelUnstyled,
  useTabsList_default,
  init_TabsListUnstyled2 as init_TabsListUnstyled,
  useTab_default,
  init_TabUnstyled2 as init_TabUnstyled,
  TextareaAutosize_default,
  init_TextareaAutosize2 as init_TextareaAutosize,
  init_base
};
/*! Bundled license information:

@mui/base/index.js:
  (** @license MUI v5.0.0-alpha.111
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=chunk-4WWOHMLU.js.map
