// import * as React from 'react';
// import PropTypes from 'prop-types';
// import { useAutocomplete } from '@mui/base/useAutocomplete';
// import CheckIcon from '@mui/icons-material/Check';
// import CloseIcon from '@mui/icons-material/Close';
// import { styled } from '@mui/material/styles';
// import { autocompleteClasses } from '@mui/material/Autocomplete';

// const Root = styled('div')`
//   color: white;
//   font-size: 14px;
// `;

// const Label = styled('label')`
//   padding: 0 0 4px;
//   line-height: 1.5;
//   display: block;
// `;

// const InputWrapper = styled('div')`
//   width: 200px;
//   border: 1px solid #434343;
//   background-color: #141414;
//   border-radius: 4px;
//   padding: 1px;
//   display: flex;
//   flex-wrap: wrap;

//   &:hover {
//     border-color: #177ddc;
//   }

//   &.focused {
//     border-color: #177ddc;
//     box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
//   }

//   & input {
//     background-color: #141414;
//     color: white;
//     height: 30px;
//     box-sizing: border-box;
//     padding: 4px 6px;
//     width: 0;
//     min-width: 30px;
//     flex-grow: 1;
//     border: 0;
//     margin: 0;
//     outline: 0;
//   }
// `;

// function Tag(props) {
//   const { label, onDelete, ...other } = props;
//   return (
//     <div {...other}>
//       <span>{label}</span>
//       <CloseIcon onClick={onDelete} style={{ color: 'white' }} />
//     </div>
//   );
// }

// Tag.propTypes = {
//   label: PropTypes.string.isRequired,
//   onDelete: PropTypes.func.isRequired,
// };

// const StyledTag = styled(Tag)`
//   display: flex;
//   align-items: center;
//   height: 24px;
//   margin: 2px;
//   line-height: 22px;
//   background-color: rgba(255, 255, 255, 0.08);
//   border: 1px solid #303030;
//   border-radius: 2px;
//   box-sizing: content-box;
//   padding: 0 4px 0 10px;
//   outline: 0;
//   overflow: hidden;

//   &:focus {
//     border-color: #177ddc;
//     background-color: #003b57;
//   }

//   & span {
//     overflow: hidden;
//     white-space: nowrap;
//     text-overflow: ellipsis;
//   }

//   & svg {
//     font-size: 12px;
//     cursor: pointer;
//     padding: 4px;
//   }
// `;

// const Listbox = styled('ul')`
//   width: 300px;
//   margin: 2px 0 0;
//   padding: 0;
//   position: absolute;
//   list-style: none;
//   background-color: #141414;
//   overflow: auto;
//   max-height: 250px;
//   border-radius: 4px;
//   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
//   z-index: 1;

//   & li {
//     padding: 5px 12px;
//     display: flex;
//     color: white;

//     & span {
//       flex-grow: 1;
//     }

//     & svg {
//       color: transparent;
//     }
//   }

//   & li[aria-selected='true'] {
//     background-color: #2b2b2b;
//     font-weight: 600;

//     & svg {
//       color: #1890ff;
//     }
//   }

//   & li.${autocompleteClasses.focused} {
//     background-color: #003b57;
//     cursor: pointer;

//     & svg {
//       color: currentColor;
//     }
//   }
// `;

// export default function FilterByModels({ models, modelName, setModelName }) {
//   const {
//     getRootProps,
//     getInputLabelProps,
//     getInputProps,
//     getTagProps,
//     getListboxProps,
//     getOptionProps,
//     groupedOptions,
//     value,
//     focused,
//     setAnchorEl,
//   } = useAutocomplete({
//     id: 'customized-autocomplete',
//     multiple: true,
//     options: models[0],
//     getOptionLabel: (option) => option,
//     value: modelName,
//     onChange: (event, newValue) => {
//       setModelName(newValue);
//     },
//   });

//   return (
//     <Root>
//       <div {...getRootProps()}>
//         <Label {...getInputLabelProps()}>Filter By Models</Label>
//         <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
//           {value.map((option, index) => (
//             <StyledTag key={index} label={option} {...getTagProps({ index })} />
//           ))}
//           <input {...getInputProps()} />
//         </InputWrapper>
//       </div>
//       {groupedOptions.length > 0 ? (
//         <Listbox {...getListboxProps()}>
//           {groupedOptions.map((option, index) => (
//             <li {...getOptionProps({ option, index })} key={index}>
//               <span>{option}</span>
//               <CheckIcon fontSize="small" />
//             </li>
//           ))}
//         </Listbox>
//       ) : null}
//     </Root>
//   );
// }


import * as React from 'react';
import PropTypes from 'prop-types';
import { useAutocomplete } from '@mui/base/useAutocomplete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { autocompleteClasses } from '@mui/material/Autocomplete';

const Root = styled('div')`
  color: white;
  font-size: 14px;
`;

const Label = styled('label')`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`;

const InputWrapper = styled('div')`
  width: 200px;
  border: 1px solid #434343;
  background-color: #141414;
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: #177ddc;
  }

  &.focused {
    border-color: #177ddc;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: #141414;
    color: white;
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`;

function Tag(props) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} style={{ color: 'white' }} />
    </div>
  );
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const StyledTag = styled(Tag)`
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: rgba(255, 255, 255, 0.08);
  border: 1px solid #303030;
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: #177ddc;
    background-color: #003b57;
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`;

const Listbox = styled('ul')`
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: #141414;
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;
    color: white;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: #2b2b2b;
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: #003b57;
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`;

export default function FilterByModels({ models = [], modelName, setModelName }) {
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: 'customized-autocomplete',
    multiple: true,
    options: models[0] || [], // Safe default value
    getOptionLabel: (option) => option,
    value: modelName,
    onChange: (event, newValue) => {
      setModelName(newValue);
    },
  });

  return (
    <Root>
      <div {...getRootProps()}>
        <Label {...getInputLabelProps()}>Filter By Models</Label>
        <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
          {value.map((option, index) => (
            <StyledTag key={index} label={option} {...getTagProps({ index })} />
          ))}
          <input {...getInputProps()} />
        </InputWrapper>
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li {...getOptionProps({ option, index })} key={index}>
              <span>{option}</span>
              <CheckIcon fontSize="small" />
            </li>
          ))}
        </Listbox>
      ) : null}
    </Root>
  );
}
