import { useForm, Controller } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
  InputAdornment,
  FormLabel,
  FormControl,
} from '@material-ui/core';
import { useFormStyles } from '../styles';
import TitleIcon from '@material-ui/icons/Title';
import SubjectIcon from '@material-ui/icons/Subject';
import { selectLoadingState } from '../redux/slices/loadingSlice';
import { addBug, editBug } from '../controllers/bugs';

const validationSchema = yup.object({
  name: yup
    .string()
    .required('Required')
    .min(3, 'Must be at least 3 characters')
    .max(60, 'Must be at most 60 characters'),

  description: yup.string().required('Required'),
});

interface BugFormProps {
  closeDialog?: () => void;
  projectId: string;
  isEditMode: boolean;
  currentData?: any;
  bugId?: string;
}

const BugForm: React.FC<BugFormProps> = ({
  closeDialog,
  isEditMode,
  projectId,
  currentData,
  bugId,
}) => {
  const classes = useFormStyles();
  const dispatch = useDispatch();
  const { register, control, handleSubmit, errors } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: currentData?.name || '',
      description: currentData?.description || '',
      priority: currentData?.priority || 'low',
    },
  });

  const loading = useSelector(selectLoadingState);

  const handleCreateBug = (data: any) => {
    data.status = "Open";
    dispatch(addBug(projectId, data, closeDialog));
  };

  const handleUpdateBug = (data: any) => {
    dispatch(editBug(projectId, bugId as string, data, closeDialog));
  };

  return (
    <form
      onSubmit={handleSubmit(isEditMode ? handleUpdateBug : handleCreateBug)}
    >
      <TextField
        inputRef={register}
        name="name"
        required
        fullWidth
        type="text"
        label="Bug Title"
        variant="outlined"
        error={'name' in errors}
        helperText={'name' in errors ? errors.name?.message : ''}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <TitleIcon color="primary" />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        className={classes.fieldMargin}
        multiline
        rows={1}
        rowsMax={4}
        inputRef={register}
        name="description"
        required
        fullWidth
        type="text"
        label="Description"
        variant="outlined"
        error={'description' in errors}
        helperText={'description' in errors ? errors.description?.message : ''}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SubjectIcon color="primary" />
            </InputAdornment>
          ),
        }}
      />
      <Controller
        control={control}
        name="priority"
        as={
          <FormControl className={classes.radioGroupForm}>
            <RadioGroup row defaultValue="low" className={classes.radioGroup}>
              <FormLabel className={classes.radioGroupLabel}>
                Priority:
              </FormLabel>
              <div className={classes.formControlLabels}>
                <FormControlLabel
                  value="Low"
                  control={<Radio color="primary" />}
                  label="Low"
                />
                <FormControlLabel
                  value="Medium"
                  control={<Radio color="primary" />}
                  label="Medium"
                />
                <FormControlLabel
                  value="High"
                  control={<Radio color="primary" />}
                  label="High"
                />
              </div>
            </RadioGroup>
          </FormControl>
        }
      />
      <Button
        size="large"
        color="primary"
        variant="contained"
        fullWidth
        className={classes.submitBtn}
        type="submit"
        disabled={loading.isLoading}
      >
        {isEditMode ? 'Update Bug' : 'Create New Bug'}
      </Button>
    </form>
  );
};

export default BugForm;
