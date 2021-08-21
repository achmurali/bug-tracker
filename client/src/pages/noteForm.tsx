import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button, InputAdornment } from '@material-ui/core';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  addNote,
  updateNote
} from '../controllers/notes';
import { useFormStyles } from '../styles';
import CommentIcon from '@material-ui/icons/Comment';
import { selectLoadingState } from '../redux/slices/loadingSlice';

const validationSchema = yup.object({
  body: yup.string().required('Required'),
});

interface NoteFormProps {
  closeDialog?: () => void;
  projectId: string;
  bugId: string;
  isEditMode: boolean;
  currentBody?: string;
  noteId?: string;
}

const NoteForm: React.FC<NoteFormProps> = ({
  closeDialog,
  isEditMode,
  projectId,
  bugId,
  currentBody,
  noteId,
}) => {
  const classes = useFormStyles();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoadingState);
  const { register, handleSubmit, errors } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      body: currentBody || '',
    },
  });

  const handleCreateNote = ({ body }: { body: string }) => {
    dispatch(addNote(projectId, bugId, body, closeDialog));
  };

  const handleUpdateNote = ({ body }: { body: string }) => {
    dispatch(updateNote(projectId, bugId, noteId! , body, closeDialog));
  };

  return (
    <form
      onSubmit={handleSubmit(isEditMode ? handleUpdateNote : handleCreateNote)}
    >
      <TextField
        multiline
        rows={1}
        rowsMax={4}
        inputRef={register}
        name="body"
        placeholder="Type a note..."
        required
        fullWidth
        type="text"
        label="Note"
        variant="outlined"
        error={'body' in errors}
        helperText={'body' in errors ? errors.body?.message : ''}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CommentIcon color="primary" />
            </InputAdornment>
          ),
        }}
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
        {isEditMode ? 'Update Note' : 'Submit Note'}
      </Button>
    </form>
  );
};

export default NoteForm;
