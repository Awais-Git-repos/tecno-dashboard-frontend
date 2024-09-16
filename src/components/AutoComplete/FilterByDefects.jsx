// import * as React from 'react';
// import { useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Chip from '@mui/material/Chip';
// import { useAutocomplete } from '@mui/base/useAutocomplete';
// import CheckIcon from '@mui/icons-material/Check';
// import CloseIcon from '@mui/icons-material/Close';
// import { styled } from '@mui/material/styles';
// import { autocompleteClasses } from '@mui/material/Autocomplete';
// import Typography from '@mui/material/Typography'; // Use Typography for the label

// // Styled components for the custom input
// const Root = styled('div')`
//   color: rgba(255, 255, 255, 0.65);
//   font-size: 14px;
// `;

// const InputWrapper = styled('div')`
//   width: 300px;
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
//     color: rgba(255, 255, 255, 0.65);
//     height: 30px;
//     padding: 4px 6px;
//     width: 0;
//     min-width: 30px;
//     flex-grow: 1;
//     border: 0;
//     margin: 0;
//     outline: 0;
//   }
// `;

// const StyledTag = styled(({ label, onDelete, ...other }) => (
//   <div {...other}>
//     <span>{label}</span>
//     <CloseIcon onClick={onDelete} />
//   </div>
// ))`
//   display: flex;
//   align-items: center;
//   height: 24px;
//   margin: 2px;
//   line-height: 22px;
//   background-color: rgba(255, 255, 255, 0.08);
//   border: 1px solid #303030;
//   border-radius: 2px;
//   padding: 0 4px 0 10px;
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

// export default function FilterByDefects({ defect, damageName, setdamageName }) {
//   const [modes, setModes] = React.useState([]);
//   const theme = useTheme();

//   React.useEffect(() => {
//     setModes(defect || []);
//   }, [defect]);

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
//     id: 'damage-chips-autocomplete',
//     multiple: true,
//     options: defect[0],
//     getOptionLabel: (option) => option,
//     onChange: (_, newValue) => setdamageName(newValue),
//     value: damageName,
//   });

//   return (
//     <Root>
//       <div {...getRootProps()}>
//         <Typography {...getInputLabelProps()} style={{ color: '#fff' }}>
//           Filter By Defects
//         </Typography>
//         <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
//           {value.map((option, index) => (
//             <StyledTag key={index} {...getTagProps({ index })} label={option} />
//           ))}
//           <input {...getInputProps()} />
//         </InputWrapper>
//       </div>
//       {groupedOptions.length > 0 ? (
//         <Listbox {...getListboxProps()}>
//           {groupedOptions.map((option, index) => (
//             <li key={index} {...getOptionProps({ option, index })}>
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
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { useAutocomplete } from '@mui/base/useAutocomplete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { autocompleteClasses } from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography'; // Use Typography for the label

// Styled components for the custom input
const Root = styled('div')`
  color: rgba(255, 255, 255, 0.65);
  font-size: 14px;
`;

const InputWrapper = styled('div')`
  width: 300px;
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
    color: rgba(255, 255, 255, 0.65);
    height: 30px;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`;

const StyledTag = styled(({ label, onDelete, ...other }) => (
  <div {...other}>
    <span>{label}</span>
    <CloseIcon onClick={onDelete} />
  </div>
))`
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: rgba(255, 255, 255, 0.08);
  border: 1px solid #303030;
  border-radius: 2px;
  padding: 0 4px 0 10px;
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

export default function FilterByDefects({ defect = [], damageName, setdamageName }) {
  const [modes, setModes] = React.useState([]);
  const theme = useTheme();

  React.useEffect(() => {
    setModes(defect || []);
  }, [defect]);

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
    id: 'damage-chips-autocomplete',
    multiple: true,
    options: defect[0] || [], // Safe default value
    getOptionLabel: (option) => option,
    onChange: (_, newValue) => setdamageName(newValue),
    value: damageName,
  });

  return (
    <Root>
      <div {...getRootProps()}>
        <Typography {...getInputLabelProps()} style={{ color: '#fff' }}>
          Filter By Defects
        </Typography>
        <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
          {value.map((option, index) => (
            <StyledTag key={index} {...getTagProps({ index })} label={option} />
          ))}
          <input {...getInputProps()} />
        </InputWrapper>
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li key={index} {...getOptionProps({ option, index })}>
              <span>{option}</span>
              <CheckIcon fontSize="small" />
            </li>
          ))}
        </Listbox>
      ) : null}
    </Root>
  );
}
